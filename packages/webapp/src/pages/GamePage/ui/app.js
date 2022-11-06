// Third party dependencies
import {
  html,
  Component,
} from "../web_modules/htm/preact/standalone.module.js";
import gsap from "./animations.js";
import { Flip } from "../web_modules/gsap/Flip.js";
// @ts-ignore
//import Flip from 'https://slaytheweb-assets.netlify.app/gsap/Flip.js'

// Game logic
import createNewGame from "../game/new-game.js";
import actions from "../game/actions.js";
import { createCard, getCardRewards } from "../game/cards.js";
import {
  getCurrRoom,
  isCurrRoomCompleted,
  isDungeonCompleted,
  isStageCompleted,
} from "../game/utils-state.js";
import { getEnemiesStats } from "./dungeon-stats.js";
import * as backend from "../game/backend.js";

// UI Components
import Cards from "./cards.js";
import Map from "./map.js";
import { Overlay, OverlayWithButton } from "./overlays.js";
import { Player, Monster } from "./player.js";
import CardChooser from "./card-chooser.js";
import CampfireRoom from "./campfire.js";
import QuestRoom from "./quest.js";
import Menu from "./menu.js";
import StartRoom from "./start-room.js";
import DungeonStats from "./dungeon-stats.js";
import enableDragDrop from "./dragdrop.js";

// Temporary hack to disabled sounds without touching game code.
import realSfx from "./sounds.js";
const sfx = {};
Object.keys(realSfx).forEach((key) => {
  sfx[key] = () => null;
});

const load = () =>
  JSON.parse(decodeURIComponent(localStorage.getItem("saveGame")));

export default class App extends Component {
  constructor() {
    super();
    // Props
    this.base = undefined;
    this.state = {};
    this.game = {};
    this.overlayIndex = 11;
    this.runPosted = false;

    // Scope methods
    this.playCard = this.playCard.bind(this);
    this.handlePlayerReward = this.handlePlayerReward.bind(this);
    this.handleCampfireChoice = this.handleCampfireChoice.bind(this);
    this.goToNextRoom = this.goToNextRoom.bind(this);
    this.selectHero = this.selectHero.bind(this);
    this.selectRelic = this.selectRelic.bind(this);
    this.toggleOverlay = this.toggleOverlay.bind(this);
    this.handleMapMove = this.handleMapMove.bind(this);
    this.handleNextStage = this.handleNextStage.bind(this);
    this.postRun = this.postRun.bind(this);
  }
  componentDidMount() {
    // Set up a new game
    const game = createNewGame();
    this.game = game;
    this.setState(game.state);

    sfx.startGame();

    // If there is a saved game state, use it.
    const savedGameState = localStorage.getItem("saveGame") && load();
    if (savedGameState) {
      this.game.state = savedGameState;
      this.setState(savedGameState, this.dealCards);
    }

    this.enableConsole();
  }
  enableConsole() {
    // Enable a "console" in the browser.
    console.log(`Welcome to the Console. Some examples:
stw.game.state.player.maxHealth = 999; stw.update()
stw.game.enqueue({type: 'drawCards', amount: 2})
stw.update()
stw.dealCards()`);
    // @ts-ignore
    window.stw = {
      game: this.game,
      update: this.update.bind(this),
      createCard,
      dealCards: this.dealCards.bind(this),
      clearStage: this.handleNextStage.bind(this),
      iddqd() {
        // console.log(this.game.state)
        this.game.enqueue({ type: "iddqd" });
        this.update(() => {
          // console.log(this.game.state)
        });
      },
      getRuns() {
        return backend.getRuns();
      },
      postRun() {
        return backend.postRun(this.game);
      },
    };
  }
  update(callback) {
    this.game.dequeue();
    this.setState(this.game.state, callback);
  }
  undo() {
    this.game.undo();
    this.setState(this.game.state, this.dealCards);
  }
  /**
   * Plays a card while juggling DOM animations and set state.
   * @param {string} cardId
   * @param {string} target
   * @param {HTMLElement} cardElement
   */
  playCard(cardId, target, cardElement) {
    // Play the card.
    const card = this.state.hand.find((c) => c.id === cardId);
    const player = document.querySelector(".player-group");
    this.game.enqueue({ type: "playCard", card, target });
    if (card.type === "attack" || card.damage) {
      gsap.from(player, {
        x: 150,
        duration: 0.5,
      });
    }
    if (card.block) {
      console.log("played block card");
      const image = require("./images/skills/block2.gif").default;
      const skillEl = document.getElementById("skill");
      skillEl.src = image;
      setTimeout(() => {
        skillEl.src = "";
      }, 1000);
    }

    const supportsFlip = typeof Flip !== "undefined";
    let flip;

    // For the hand animation later.
    if (supportsFlip) flip = Flip.getState(".Hand .Card");

    // Create a clone on top of the card to animate.
    const clone = cardElement.cloneNode(true);
    this.base.appendChild(clone);
    if (supportsFlip) Flip.fit(clone, cardElement, { absolute: true });

    // Update state and re-enable dragdrop
    this.update(() => {
      enableDragDrop(this.base, this.playCard);

      sfx.playCard({ card, target });

      // Animate cloned card away
      gsap.effects.playCard(clone).then(() => {
        clone.parentNode.removeChild(clone);
      });

      // Reposition hand
      if (supportsFlip) {
        Flip.from(flip, {
          duration: 0.3,
          ease: "power3.inOut",
          absolute: true,
        });
      }
    });
  }
  endTurn() {
    sfx.endTurn();
    const room = getCurrRoom(this.state);

    room.monsters.map((monster, index) => {
      const m = document.querySelector(
        `[data-monster="${index}"]:not(.Target--isDead)`
      );

      gsap.from(m, {
        x: -150,
        duration: 0.5,
        delay: index * 0.2,
      });
    });
    gsap.effects.discardHand(".Hand .Card", {
      onComplete: reallyEndTurn.bind(this),
    });
    function reallyEndTurn() {
      this.game.enqueue({ type: "endTurn" });
      this.update(this.dealCards);
    }
  }
  // Animate the cards in and make sure any new cards are draggable.
  dealCards() {
    gsap.effects.dealCards(".Hand .Card");
    sfx.startTurn();
    enableDragDrop(this.base, this.playCard);
  }
  toggleOverlay(el) {
    if (typeof el === "string") el = this.base.querySelector(el);
    el.toggleAttribute("open");
    el.style.zIndex = this.overlayIndex;
    this.overlayIndex++;
  }
  handleShortcuts(event) {
    const { key } = event;
    const keymap = {
      e: () => this.endTurn(),
      u: () => this.undo(),
      Escape: () => {
        // let openOverlays = this.base.querySelectorAll('.Overlay:not(#Menu)[open]')
        let openOverlays = this.base.querySelectorAll(
          "#Deck[open], #DrawPile[open], #DiscardPile[open], #Map[open]"
        );
        openOverlays.forEach((el) => el.removeAttribute("open"));
        this.toggleOverlay("#Menu");
      },
      d: () => this.toggleOverlay("#Deck"),
      a: () => this.toggleOverlay("#DrawPile"),
      s: () => this.toggleOverlay("#DiscardPile"),
      m: () => this.toggleOverlay("#Map"),
    };
    keymap[key] && keymap[key]();
  }
  handlePlayerReward(choice, card) {
    this.game.enqueue({ type: "addCardToDeck", card });
    this.setState({ didPickCard: card });
    this.update();
  }
  handleNextStage() {
    const stats = getEnemiesStats(this.game.state.dungeon);
    const stageScore =
      stats.encountered + stats.finalHealth + stats.killed + stats.maxHealth;
    this.game.enqueue({ type: "goToNextStage", score: stageScore });
    this.update();
    this.goToNextRoom();
  }
  postRun(acc) {
    const score = this.game.state.scores.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    const stats = getEnemiesStats(this.game.state.dungeon);
    const stageScore =
      stats.encountered + stats.finalHealth + stats.killed + stats.maxHealth;
    const finalScore = score + stageScore;

    backend.postRun(
      JSON.stringify(this.game.state),
      acc.addressShort,
      acc.account.accAddress,
      finalScore
    );
    this.runPosted = true;
  }
  handleCampfireChoice(choice, reward) {
    // Depending on the choice, run an action.
    if (choice === "rest") {
      reward = Math.floor(this.game.state.player.maxHealth * 0.3);
      this.game.enqueue({
        type: "addHealth",
        target: "player",
        amount: reward,
      });
    }
    if (choice === "upgradeCard") {
      this.game.enqueue({ type: "upgradeCard", card: reward });
    }
    if (choice === "removeCard") {
      this.game.enqueue({ type: "removeCard", card: reward });
    }
    // Store the result.
    this.game.enqueue({ type: "makeCampfireChoice", choice, reward });
    // Update twice (because two actions were enqueued)
    this.update(this.update);
    this.goToNextRoom();
  }
  goToNextRoom() {
    console.log("Go to next room, toggling map");
    this.toggleOverlay("#Map");
  }
  selectHero(name) {
    this.game.enqueue({ type: "selectHero", hero: name });
    this.update();
  }
  selectRelic(nft) {
    this.game.enqueue({ type: "selectRelic", relic: nft });
    this.update();
    this.goToNextRoom();
  }
  handleMapMove(move) {
    console.log("Made a move");
    this.toggleOverlay("#Map");
    this.setState({ didPickCard: false });
    this.game.enqueue({ type: "move", move });

    this.update(this.dealCards);
    const room = this.state.dungeon.graph[move.y][move.x].room;

    if (room.type === "monster") {
      const battleStartRelics = this.state.relics.filter(
        (item) => item.type === "battleStart"
      );
      battleStartRelics.map((relic) => {
        console.log("Triggering battleStart relic: ", relic);

        this.game.enqueue({ type: "useRelic", relic: relic });
        this.update();
      });
    }
  }
  render(props, state) {
    if (!state.player) return;
    const isDead = state.player.currentHealth < 1;
    const didWin = isCurrRoomCompleted(state);
    const didWinEntireGame = isDungeonCompleted(state);
    const didWinStage = isStageCompleted(state);
    const room = getCurrRoom(state);
    const noEnergy = !state.player.currentEnergy;
    const nfts = props.nfts;
    // There's a lot here because I did not want to split into too many files.
    return html`
			<div class="App" tabindex="0" onKeyDown=${(e) => this.handleShortcuts(e)}>
				<figure class="App-background" data-room-index=${state.dungeon.y} data-stage=${
      state.stage
    }></div>

				${
          room.type === "start" &&
          html`<${Overlay}
            ><${StartRoom}
              onContinue=${this.goToNextRoom}
              onSelect=${this.selectHero}
              nfts=${nfts}
              selectRelic=${this.selectRelic}
          /><//>`
        }

				${
          isDead &&
          html`<${Overlay}>
            <p center>You are dead.</p>
            <${DungeonStats} state=${state}><//>
            ${nfts.length
              ? html`
                  <div>
                    <button
                      disabled=${this.runPosted}
                      onclick=${() => this.postRun(props.account)}
                    >
                      Post run to leaderboards
                    </button>
                  </div>
                `
              : ""}

            <button onclick=${() => this.props.onLoose()}>Try again?</button>
          <//> `
        }

				${
          didWinEntireGame &&
          html`<${Overlay}>
            <p center>
              <button onclick=${() => this.props.onWin()}>
                You have completed Downfall!
              </button>
            </p>
            <${DungeonStats} state=${state}><//>
            ${nfts.length
              ? html`
                  <div>
                    <button
                      disabled=${this.runPosted}
                      onclick=${() => this.postRun(props.account)}
                    >
                      Post run to leaderboards
                    </button>
                  </div>
                `
              : ""}
          <//> `
        }
        ${
          didWinStage &&
          html`<${Overlay}>
            <h2 center>Stage ${state.stage} Completed!</h2>
            <${DungeonStats} state=${state}><//>
            <p center>
              <button onClick=${() => this.handleNextStage()}>
                Start stage ${state.stage + 1}
              </button>
            </p>
          <//> `
        }

				${
          !didWinEntireGame &&
          !didWinStage &&
          didWin &&
          room.type === "monster" &&
          html`<${Overlay}>
            <h1 center medium>Victory!</h1>
            ${!state.didPickCard
              ? html`
                  <p center>
                    Here is your reward. Pick a card to add to your deck.
                  </p>

                  <${CardChooser}
                    cards=${getCardRewards(3, this.game.state.hero)}
                    didSelectCard=${(card) =>
                      this.handlePlayerReward("addCard", card)}
                  />
                `
              : html`<p center>
                  Added <strong>${state.didPickCard.name}</strong> to your deck.
                </p>`}
            <p center>
              <button onclick=${() => this.goToNextRoom()}>
                Go to next room
              </button>
            </p>
          <//> `
        }

				${
          room.type === "campfire" &&
          html`<${Overlay}>
            <${CampfireRoom}
              gameState=${state}
              onChoose=${this.handleCampfireChoice}
              onContinue=${this.goToNextRoom}
            />
          <//>`
        }
        ${
          room.type === "quest" &&
          html`<${Overlay}>
            <${QuestRoom}
              gameState=${state}
              selectRelic=${this.selectRelic}
              onContinue=${this.goToNextRoom}
              nfts=${nfts}
            />
          <//>`
        }

				<div class="Targets Split">
					<div class="Targets-group player-group">
						<${Player} model=${state.player} hero=${state.hero} name=${state.hero} />
					</div>
					<div class="Targets-group monster-group">
						${
              room.monsters &&
              room.monsters.map((monster, index) => {
                return html`<${Monster}
                  model=${monster}
                  gameState=${state}
                  name=${monster.name}
                  monsterIndex=${index}
                />`;
              })
            }
					</div>
				</div>

				<div class="Split ${noEnergy ? "no-energy" : ""}">
					<div class="EnergyBadge">
							<span class="tooltipped tooltipped-e tooltipped-multiline" aria-label="Cards costs energy and this badge shows how much you have left this turn. Next turn your energy is refilled.">${
                state.player.currentEnergy
              }/${state.player.maxEnergy}</span>
					</div>
					<p class="Actions">
						<button class="EndTurn" onclick=${() => this.endTurn()}>
							<u>E</u>nd turn
						</button>
					</p>
				</div>

				<div class="Hand">
					<${Cards} gameState=${state} type="hand" />
				</div>

				<${OverlayWithButton} id="Menu" topleft>
					<button onClick=${() => this.toggleOverlay("#Menu")}><u>Esc</u>ape</button>
					<div class="Overlay-content">
							<${Menu} gameState=${state} game=${this.game} onUndo=${() => this.undo()} />
					</div>
				<//>

        <div id="relics" class="relics" topleft>
        ${state.relics.map((relic) => {
          return html`
            <span
              class="tooltipped tooltipped-s"
              aria-label=${relic.description}
            >
              <img src=${relic.metadata.imageSize.original} with="20" />
            </span>
          `;
        })}
        </div>

				

             <${OverlayWithButton} id="Map" topright key=${1}>
              <button align-right onClick=${() => this.toggleOverlay("#Map")}>
                <u>M</u>ap
              </button>
              <div class="Overlay-content">
						<${Map} dungeon=${state.dungeon} stage=${state.stage} onMove=${
      this.handleMapMove
    } />
					</div>
            <//>
				

				<${OverlayWithButton} id="Deck" topright topright2>
					<button onClick=${() => this.toggleOverlay("#Deck")}><u>D</u>eck ${
      state.deck.length
    }</button>
					<div class="Overlay-content">
						<${Cards} gameState=${state} type="deck" />
					</div>
				<//>

				<${OverlayWithButton} id="DrawPile" bottomleft>
					<button class="tooltipped tooltipped-ne" aria-label="The cards you'll draw next in random order" onClick=${() =>
            this.toggleOverlay("#DrawPile")}>Dr<u>a</u>w pile ${
      state.drawPile.length
    }</button>
					<div class="Overlay-content">
						<${Cards} gameState=${state} type="drawPile" />
					</div>
				<//>

				<${OverlayWithButton} id="DiscardPile" bottomright>
					<button onClick=${() =>
            this.toggleOverlay(
              "#DiscardPile"
            )} align-right class="tooltipped tooltipped-nw tooltipped-multiline" aria-label="Cards you've already played. Once the draw pile is empty, these cards are shuffled into your draw pile.">Di<u>s</u>card pile ${
      state.discardPile.length
    }</button>
					<div class="Overlay-content">
						<${Cards} gameState=${state} type="discardPile" />
					</div>
				<//>
		</div>
		`;
  }
}
