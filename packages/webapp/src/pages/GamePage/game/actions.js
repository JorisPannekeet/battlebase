import { produce } from "../web_modules/immer.js";
import { createCard, CardTargets } from "./cards.js";
import { clamp, shuffle } from "./utils.js";
import { getTargets, getCurrRoom } from "./utils-state.js";
import powers from "./powers.js";
import { dungeonWithMap } from "../content/dungeon-encounters.js";
import { conditionsAreValid } from "./conditions.js";
import { heroes } from "../content/heroes.js";
import relics from "../content/relics";

// Without this, immer.js will throw an error if our `state` is modified outside of an action.
// While in theory a good idea, we're not there yet. It is a useful way to spot modifications
// of the game state that should not be there.
// setAutoFreeze(false)

// In Slay the Web, we have one big object with game state.
// Whenever we want to change something, call an "action" from this file.
// Each action takes two arguments: 1) the current state, 2) an object of arguments.

/**
 * @typedef {object} State
 * @prop {number} turn
 * @prop {Array} deck
 * @prop {Array} drawPile
 * @prop {Array} hand
 * @prop {Array} discardPile
 * @prop {Player} player
 * @prop {Object} dungeon
 */

/**
 * @typedef {object} Player
 * @prop {number} currentEnergy
 * @prop {number} maxEnergy
 * @prop {number} currentHealth
 * @prop {number} maxHealth
 * @prop {number} block
 * @prop {Object} powers
 */

/**
 * This is the big object of game state. Everything starts here.
 * @returns {State}
 */
function createNewGame() {
  return {
    turn: 1,
    deck: [],
    drawPile: [],
    hand: [],
    discardPile: [],
    player: {
      maxEnergy: 3,
      currentEnergy: 3,
      maxHealth: 72,
      currentHealth: 72,
      block: 0,
      powers: {},
      ultimateUsed: false,
      usedRelics: [],
      gold: 0,
    },
    hero: heroes[0],
    relics: [],
    selectedDeck: 0,
    dungeon: {},
    stage: 1,
    scores: [],
  };
}

// By default a new game doesn't come with a dungeon. You have to set one explicitly. Look in dungeon-encounters.js for inspiration.
/** @returns {State} */
function setDungeon(state, dungeon) {
  if (!dungeon) dungeon = dungeonWithMap(state);
  state.dungeon = dungeon;
  return state;
  // return produce(state, (draft) => {
  // 	draft.dungeon = dungeon
  // })
}

// Draws a "starter" deck to your discard pile. This will run on hero select.
function addStarterDeck(state, hero) {
  const starterDeck = [];
  hero.starterdeck.map((item) => {
    starterDeck.push(createCard(item));
  });
  return produce(state, (draft) => {
    draft.deck = starterDeck;
    draft.drawPile = shuffle(starterDeck);
  });
}

// Move X cards from deck to hand.
function drawCards(state, options) {
  const amount = options?.amount ? options.amount : 5;
  return produce(state, (draft) => {
    // When there aren't enough cards to draw, we recycle all cards from the discard pile to the draw pile. Should we shuffle?
    if (state.drawPile.length < amount) {
      draft.drawPile = state.drawPile.concat(state.discardPile);
      draft.drawPile = shuffle(draft.drawPile);
      draft.discardPile = [];
    }
    const newCards = draft.drawPile.slice(0, amount);
    // Take the first X cards from deck and add to hand and remove them from the deck.
    draft.hand = draft.hand.concat(newCards);
    for (let i = 0; i < amount; i++) {
      draft.drawPile.shift();
    }
  });
}

// Adds a card (from nowhere) directly to your hand.
function addCardToHand(state, { card }) {
  return produce(state, (draft) => {
    draft.hand.push(card);
  });
}

// Discard a single card from your hand.
function discardCard(state, { card }) {
  return produce(state, (draft) => {
    draft.hand = state.hand.filter((c) => c.id !== card.id);
    draft.discardPile.push(card);
  });
}

// Discard your entire hand.
function discardHand(state) {
  return produce(state, (draft) => {
    draft.hand.forEach((card) => {
      draft.discardPile.push(card);
    });
    draft.hand = [];
  });
}

// Discard a single card from your hand.
function removeCard(state, { card }) {
  return produce(state, (draft) => {
    draft.deck = state.deck.filter((c) => c.id !== card.id);
  });
}

/**
 * Upgrades a card.
 * @param {State} state
 * @param {card} object
 * @returns {State}
 */
function upgradeCard(state, { card }) {
  return produce(state, (draft) => {
    draft.deck.find((c) => c.id === card.id).upgrade();
  });
}

/*Select a hero*/
function selectHero(state, { hero }) {
  const newState = addStarterDeck(state, hero);
  return produce(newState, (draft) => {
    draft.hero = hero;
  });
}

function selectRelic(state, { relic }) {
  const nft = relic;
  const stats = relics.find(
    (item) =>
      item.address === nft.tokenAddress &&
      nft.metadata.base.name.includes(item.matchingData)
  );
  const newRelic = {
    ...stats,
    ...nft,
  };

  return produce(state, (draft) => {
    draft.relics.push(newRelic);
  });
}

/* Clear dungeon and go to next stage */
function goToNextStage(state, { score }) {
  return produce(state, (draft) => {
    if (state.stage <= 9) {
      draft.scores[state.stage] = score;
      draft.stage = state.stage + 1;
      draft.dungeon = dungeonWithMap(draft);
    }
  });
}

function useRelic(state, { relic }) {
  switch (relic.action) {
    case "addBlock":
      return produce(state, (draft) => {
        draft.player.block = state.player.block + relic.value;
      });
    case "addAttack":
      return produce(state, (draft) => {
        draft.player.powers.boost = 8;
      });
    case "addVulnerable":
      return produce(state, (draft) => {
        draft.dungeon.graph[draft.dungeon.y][
          draft.dungeon.x
        ].room.monsters.forEach((monster) => {
          monster.powers["vulnerable"] = relic.value;
        });
      });
    case "addPoison":
      return produce(state, (draft) => {
        draft.dungeon.graph[draft.dungeon.y][
          draft.dungeon.x
        ].room.monsters.forEach((monster) => {
          monster.powers["poison"] = relic.value;
        });
      });
    case "addCard":
      return drawCards(state, { amount: relic.value });
    case "addHealth":
      return addHealth(state, { target: "player", amount: relic.value });
    case "addHealthPercentage":
      const amount = state.player.maxHealth * relic.value;
      return produce(state, (draft) => {
        draft.player.currentHealth = Math.round(amount);
        draft.player.usedRelics.push(relic);
      });
    case "addMaxHealth":
      return produce(state, (draft) => {
        draft.player.maxHealth = draft.player.maxHealth + relic.value;
      });
    case "addEnergy":
      return addEnergyToPlayer(state);
    case "addGold":
      return addGold(state, { gold: relic.value });
    default:
      return;
  }
}

// The funky part of this action is the `target` argument. It needs to be a special type of string:
// Either "player" to target yourself, or "enemyx", where "x" is the index of the monster starting from 0. See utils.js#getTargets
/**
 *
 * @param {State} state
 * @param {object} props
 * @param {object} props.card
 * @param {string=} props.target
 * @returns {State}
 */
function playCard(state, { card, target }) {
  if (!target) target = card.target;
  if (typeof target !== "string")
    throw new Error(`Wrong target to play card: ${target},${card.target}`);
  if (target === "enemy")
    throw new Error('Wrong target, did you mean "enemy0" or "allEnemies"?');
  if (!card) throw new Error("No card to play");
  if (state.player.currentEnergy < card.energy)
    throw new Error("Not enough energy to play card");
  let newState = discardCard(state, { card });
  newState = produce(newState, (draft) => {
    // Use energy
    //TODO: not if target health = 0;

    draft.player.currentEnergy = newState.player.currentEnergy - card.energy;
    // Block is expected to always target the player.
    if (card.block) {
      draft.player.block = newState.player.block + card.block;
    }
  });
  if (card.type === "attack" || card.damage) {
    // This should be refactored, but when you play an attack card that targets all enemies,
    // we prioritize this over the actual enemy where you dropped the card.
    const newTarget =
      card.target === CardTargets.allEnemies ? card.target : target;

    // Determine damage amount and apply relics if needed.
    let amount = card.damage;
    if (newState.player.powers.weak) amount = powers.weak.use(amount);
    if (newState.player.powers.boost) {
      amount = amount + newState.player.powers.boost;
      newState = produce(newState, (draft) => {
        draft.player.powers.boost = 0;
      });
    }
    newState = removeHealth(newState, { target: newTarget, amount });
  }
  if (card.powers) newState = applyCardPowers(newState, { target, card });
  // if (card.use) newState = card.use(newState, {target, card})
  // eslint-disable-next-line react-hooks/rules-of-hooks
  newState = useCardActions(newState, { target, card });
  return newState;
}

/**
 * Runs through a list of actions and return the updated state.
 * Called when the card is played.
 * You CAN overwrite it, just make sure to return a new state.
 * @param {State} state
 * @param {object} props
 * @prop {string} props.target
 * @prop {object} props.card
 * @returns {State}
 */
export function useCardActions(state, { target, card }) {
  if (!card.actions) return state;
  let newState = state;
  card.actions.forEach((action) => {
    // Don't run action if it has an invalid condition.
    if (action.conditions && !conditionsAreValid(action.conditions, state)) {
      return newState;
    }
    // Make sure the action is called with a target.
    if (!action.parameter) action.parameter = {};
    // Prefer the target you dropped the card on.
    action.parameter.target = target;
    action.parameter.card = card;
    // Run the action
    newState = allActions[action.type](newState, action.parameter);
  });
  return newState;
}

/**
 *
 * @param {State} state
 * @param {{target: string, amount: number}} param1
 * @returns {State} new state
 */
function addHealth(state, { target, amount }) {
  return produce(state, (draft) => {
    const targets = getTargets(draft, target);
    targets.forEach((t) => {
      t.currentHealth = clamp(t.currentHealth + amount, 0, t.maxHealth);
    });
  });
}
function addPlayerHealth(state, { amount }) {
  return produce(state, (draft) => {
    draft.player.currentHealth = clamp(
      draft.player.currentHealth + amount,
      0,
      draft.player.maxHealth
    );
  });
}
function addRegenEqualToAllDamage(state, { card }) {
  return produce(state, (draft) => {
    const room = getCurrRoom(state);
    const aliveMonsters = room.monsters.filter((monster) => {
      return monster.currentHealth > 0;
    });
    const { regen = 0 } = state.player.powers;
    const totalDamage = aliveMonsters.length * card.damage;
    draft.player.powers.regen = totalDamage + regen;
  });
}

const removePlayerDebuffs = (state) => {
  return produce(state, (draft) => {
    draft.player.powers.weak = 0;
    draft.player.powers.vulnerable = 0;
    draft.player.powers.poison = 0;
  });
};

const removePlayerPoison = (state) => {
  return produce(state, (draft) => {
    draft.player.powers.poison = 0;
  });
};

function addEnergyToPlayer(state) {
  return produce(state, (draft) => {
    /* draft.player.maxEnergy = draft.player.maxEnergy + 1 */
    draft.player.currentEnergy = draft.player.currentEnergy + 1;
  });
}
const triggerUltimate = (state, { hero }) => {
  let newState = removeHealth(state, {
    target: CardTargets.allEnemies,
    amount: 10,
  });
  newState = produce(newState, (draft) => {
    draft.player.ultimateUsed = true;
  });

  return newState;
};

/**
 * Removes health from a target, respecting vulnerable and block.
 * @param {Object} state
 * @param {Object} props
 * @param {CardTargets} props.target
 * @param {number} props.amount
 * @returns {Object} - new state
 */
const removeHealth = (state, { target, amount }) => {
  const originalAmount = amount;
  return produce(state, (draft) => {
    getTargets(draft, target).forEach((t) => {
      amount = originalAmount;
      if (t.powers.vulnerable && t.powers.vulnerable !== undefined)
        amount = powers.vulnerable.use(amount);

      let amountAfterBlock = t.block ? t.block - amount : 0 - amount;

      if (amountAfterBlock < 0) {
        t.block = 0;
        t.currentHealth = t.currentHealth + amountAfterBlock;
      } else {
        t.block = amountAfterBlock;
      }
    });
  });
};

/**
 * Sets the health of a target
 * @param {Object} state
 * @param {{target: CardTargets, amount: number}} props
 * @returns {State}
 */
const setHealth = (state, { target, amount }) => {
  return produce(state, (draft) => {
    getTargets(draft, target).forEach((t) => {
      t.currentHealth = amount;
    });
  });
};

// Used by playCard. Applies each power on the card to?
function applyCardPowers(state, { card, target }) {
  return produce(state, (draft) => {
    Object.entries(card.powers).forEach(([name, stacks]) => {
      // Add powers that target player.
      if (card.target === CardTargets.player) {
        draft.player.powers[name] = (draft.player.powers[name] || 0) + stacks;
      }

      // Add powers that target all enemies.
      else if (card.target === CardTargets.allEnemies) {
        draft.dungeon.graph[draft.dungeon.y][
          draft.dungeon.x
        ].room.monsters.forEach((monster) => {
          if (monster.currentHealth < 1) return;
          monster.powers[name] = (monster.powers[name] || 0) + stacks;
        });
      }

      // Add powers to a specific enemy.
      else if (target) {
        const index = target.split("enemy")[1];
        const monster =
          draft.dungeon.graph[draft.dungeon.y][draft.dungeon.x].room.monsters[
            index
          ];
        if (monster.currentHealth < 1) return;
        monster.powers[name] = (monster.powers[name] || 0) + stacks;
      }
    });
  });
}
function addPlayerCharge(state, { amount }) {
  return produce(state, (draft) => {
    draft.player.powers.charge = draft.player.powers.charge
      ? draft.player.powers.charge + amount
      : amount;
  });
}

// applying poison state to player
function applyPlayerPoison(state) {
  return produce(state, (draft) => {
    draft.player.powers.poison = draft.player.powers.poison
      ? draft.player.powers.poison + 1
      : 1;
  });
}

// Apply poison damage to target
function applyPoison(state, { target, index }) {
  if (target === "player") {
    return removeHealth(state, {
      target: `player`,
      amount: state.player.powers.poison,
    });
  } else {
    return produce(state, (draft) => {
      getTargets(draft, `enemy${index}`).forEach((t) => {
        if (t.powers.poison && t.currentHealth > 0) {
          t.currentHealth = t.currentHealth - t.powers.poison;
        }
      });
      return draft;
    });
  }
}

function multiplyPoisonStack(state, { target, multiplier }) {
  return produce(state, (draft) => {
    getTargets(draft, target).forEach((t) => {
      if (t.powers.poison) {
        t.powers.poison = t.powers.poison * multiplier;
      }
    });
    return draft;
  });
}

// Helper to decrease all power stacks by one.
function _decreasePowers(powers) {
  Object.entries(powers).forEach(([name, stacks]) => {
    if (stacks > 0 && name !== "poison" && name !== "charge")
      powers[name] = stacks - 1;
  });
}

// Decrease player's power stacks.
function decreasePlayerPowerStacks(state) {
  return produce(state, (draft) => {
    _decreasePowers(draft.player.powers);
  });
}

// Decrease monster's power stacks.
function decreaseMonsterPowerStacks(state) {
  return produce(state, (draft) => {
    getCurrRoom(draft).monsters.forEach((monster) => {
      _decreasePowers(monster.powers);
    });
  });
}

function endTurn(state) {
  let newState = discardHand(state);
  if (state.player.powers.regen) {
    newState = produce(newState, (draft) => {
      let amount = powers.regen.use(newState.player.powers.regen);
      let newHealth;
      // Don't allow regen to go above max health.
      if (newState.player.currentHealth + amount > newState.player.maxHealth) {
        newHealth = newState.player.maxHealth;
      } else {
        newHealth = addHealth(newState, { target: "player", amount }).player
          .currentHealth;
      }
      draft.player.currentHealth = newHealth;
    });
  }
  newState = playMonsterActions(newState);
  newState = decreasePlayerPowerStacks(newState);
  newState = decreaseMonsterPowerStacks(newState);
  newState = newTurn(newState);
  return newState;
}

// Draws new cards, reset energy, remove player block, check powers
function newTurn(state) {
  let newState = drawCards(state);
  return produce(newState, (draft) => {
    draft.turn++;
    draft.player.currentEnergy = 3;
    draft.player.block = 0;
  });
}

function reshuffleAndDraw(state) {
  const nextState = produce(state, (draft) => {
    draft.hand = [];
    draft.discardPile = [];
    draft.drawPile = shuffle(draft.deck);
  });
  return drawCards(nextState);
}

// Run all monster intents in current room.
function playMonsterActions(state) {
  const room = getCurrRoom(state);
  if (!room.monsters) return state;
  // For each monster, take turn, get state, pass to next monster.
  let nextState = state;
  room.monsters.forEach((monster, index) => {
    nextState = takeMonsterTurn(nextState, index);
  });
  return nextState;
}

// Runs the "intent" for a single monster (index) in the current room.
function takeMonsterTurn(state, monsterIndex) {
  return produce(state, (draft) => {
    const room = getCurrRoom(draft);
    const monster = room.monsters[monsterIndex];
    // Reset block at start of turn.
    monster.block = 0;

    // If dead don't do anything..
    if (monster.currentHealth < 1) return;

    // Get current intent.
    const intent = monster.intents[monster.nextIntent || 0];
    if (!intent) return;

    // Increment for next turn..
    if (monster.nextIntent === monster.intents.length - 1) {
      monster.nextIntent = 0;
    } else {
      monster.nextIntent++;
    }

    // Run the intent..
    if (intent.block) {
      // TODO: show block animation;
      monster.block = monster.block + intent.block;
    }

    if (intent.damage) {
      //TODO: show attack animation;
      let amount = intent.damage;
      const dodgeRelics = state.relics.filter(
        (item) => item.action === "addDodge%"
      );

      dodgeRelics.map((relic) => {
        console.log("Triggering dodge relic: ", relic);
        const calc = Math.random() * 100;
        if (calc < 10) {
          amount = "Dodged";
        }
      });
      if (monster.powers.weak) amount = powers.weak.use(amount);
      const updatedPlayer = removeHealth(draft, {
        target: "player",
        amount,
      }).player;
      draft.player.block = updatedPlayer.block;
      draft.player.currentHealth = updatedPlayer.currentHealth;
    }

    if (intent.vulnerable) {
      draft.player.powers.vulnerable =
        (draft.player.powers.vulnerable || 0) + intent.vulnerable + 1;
    }

    if (intent.weak) {
      draft.player.powers.weak =
        (draft.player.powers.weak || 0) + intent.weak + 1;
    }
  });
}

/**
 * @param {State} state
 * @param {{card: object}} param1
 * @returns {State}
 */
function addCardToDeck(state, { card }) {
  return produce(state, (draft) => {
    draft.deck.push(card);
  });
}

function addGold(state, { gold }) {
  return produce(state, (draft) => {
    draft.player.gold += gold;
  });
}
// Records a move on the map.
function move(state, { move }) {
  let nextState = reshuffleAndDraw(state);

  return produce(nextState, (draft) => {
    // Clear temporary powers, energy and block on player.
    draft.player.powers = {};
    draft.player.currentEnergy = 3;
    draft.player.block = 0;
    draft.dungeon.graph[move.y][move.x].didVisit = true;
    draft.dungeon.pathTaken.push({ x: move.x, y: move.y });
    draft.dungeon.x = move.x;
    draft.dungeon.y = move.y;
    draft.turn = 1;
    draft.player.ultimateUsed = false;
    // if (number === state.dungeon.rooms.length - 1) {
    // 	throw new Error('You have reached the end of the dungeon. Congratulations.')
    // }
  });
}

/**
 * Deals damage to a target equal to the current player's block.
 * @param {State} state
 * @param {object} props
 * @param {string} props.target
 * @returns {State}
 */
function dealDamageEqualToBlock(state, { target }) {
  if (state.player.block) {
    const block = state.player.block;
    return removeHealth(state, { target, amount: block });
  }
}

function dealDamageEqualToVulnerable(state, { target }) {
  return produce(state, (draft) => {
    getTargets(draft, target).forEach((t) => {
      if (t.powers.vulnerable) {
        const amount = t.currentHealth - t.powers.vulnerable;
        t.currentHealth = amount;
      }
    });
    return draft;
  });
}
function dealDamageEqualToWeak(state, { target }) {
  return produce(state, (draft) => {
    getTargets(draft, target).forEach((t) => {
      if (t.powers.weak) {
        const amount = t.currentHealth - t.powers.weak;
        t.currentHealth = amount;
      }
    });
    return draft;
  });
}
function dealDamageEqualToPoison(state, { target }) {
  return produce(state, (draft) => {
    getTargets(draft, target).forEach((t) => {
      if (t.powers.poison) {
        const amount = t.currentHealth - t.powers.poison;
        t.currentHealth = amount;
      }
    });
    return draft;
  });
}
function dealDamageEqualToCharge(state, { target, multiplier, allTargets }) {
  if (allTargets) {
    target = "allEnemies";
  }
  return produce(state, (draft) => {
    getTargets(draft, target).forEach((t) => {
      if (state.player.powers.charge) {
        const damage =
          multiplier > 0
            ? state.player.powers.charge * multiplier
            : state.player.powers.charge;
        const amount = t.currentHealth - damage;
        t.currentHealth = amount;
        draft.player.powers.charge = 0;
      }
    });
    return draft;
  });
  // return produce(newState, (draft) => {
  //   resetCharge(draft);
  // });
}

function resetCharge(state) {
  return produce(state, (draft) => {
    draft.player.power.charge = 0;
  });
}

function setGold(state, { amount }) {
  return produce(state, (draft) => {
    draft.player.gold = amount;
  });
}
/**
 * Sets a single power on a specific target
 * @param {State} state
 * @param {Object} props
 * @param {string} props.target
 * @param {string} props.power
 * @param {number} props.amount
 * @returns {State}
 */
function setPower(state, { target, power, amount }) {
  return produce(state, (draft) => {
    getTargets(draft, target).forEach((target) => {
      target.powers[power] = amount;
    });
  });
}

/**
 * Stores a campfire choice on the room (useful for stats and whatnot)
 * @param {State} state
 * @param {object} props
 * @param {object} props.room a dungeon room
 * @param {string} props.choice enum of the campfire choices
 * @param {object} props.reward card
 * @returns {State}
 */
function makeCampfireChoice(state, { choice, reward }) {
  return produce(state, (draft) => {
    const room = getCurrRoom(draft);
    room.choice = choice;
    room.reward = reward;
  });
}

/**
 * Sets the health of all monsters in the dungeon to 1.
 * @param {State} state
 * @returns {State}
 */
function iddqd(state) {
  console.log("iddqd");
  return produce(state, (draft) => {
    draft.dungeon.graph.forEach((floor) => {
      floor.forEach((node) => {
        if (!node.room || !node.room.monsters) return;
        node.room.monsters.forEach((monster) => {
          monster.currentHealth = 0;
        });
      });
    });
  });
}

const allActions = {
  addCardToDeck,
  addCardToHand,
  addEnergyToPlayer,
  addHealth,
  addRegenEqualToAllDamage,
  addStarterDeck,
  applyCardPowers,
  createNewGame,
  dealDamageEqualToBlock,
  dealDamageEqualToVulnerable,
  dealDamageEqualToWeak,
  discardCard,
  discardHand,
  drawCards,
  endTurn,
  iddqd,
  makeCampfireChoice,
  move,
  playCard,
  removeCard,
  removeHealth,
  removePlayerDebuffs,
  reshuffleAndDraw,
  setDungeon,
  setHealth,
  setPower,
  takeMonsterTurn,
  upgradeCard,
  selectHero,
  goToNextStage,
  selectRelic,
  useRelic,
  triggerUltimate,
  applyPoison,
  applyPlayerPoison,
  removePlayerPoison,
  dealDamageEqualToPoison,
  multiplyPoisonStack,
  addGold,
  addPlayerCharge,
  dealDamageEqualToCharge,
  addPlayerHealth,
  setGold,
};

export default allActions;
