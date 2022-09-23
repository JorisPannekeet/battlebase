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
import { createCard, getCardRewards } from "../game/cards.js";
import {
  getCurrRoom,
  isCurrRoomCompleted,
  isDungeonCompleted,
} from "../game/utils-state.js";
import * as backend from "../game/backend.js";

// UI Components
import Cards from "./cards.js";
import Map from "./map.js";
import { Overlay, OverlayWithButton } from "./overlays.js";
import { Player, Monster } from "./player.js";
import CardChooser from "./card-chooser.js";
import CampfireRoom from "./campfire.js";
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
  JSON.parse(decodeURIComponent(window.location.hash.split("#")[1]));

export default class App extends Component {
  constructor() {
    super();
    // Props
    this.base = undefined;
    this.state = {};
    this.game = {};
    this.overlayIndex = 11;

    // Scope methods
    this.playCard = this.playCard.bind(this);
    this.handlePlayerReward = this.handlePlayerReward.bind(this);
    this.handleCampfireChoice = this.handleCampfireChoice.bind(this);
    this.goToNextRoom = this.goToNextRoom.bind(this);
    this.toggleOverlay = this.toggleOverlay.bind(this);
    this.handleMapMove = this.handleMapMove.bind(this);
  }
  componentDidMount() {
    // Set up a new game
    const game = createNewGame();
    this.game = game;
    this.setState(game.state, this.dealCards);

    sfx.startGame();

    // If there is a saved game state, use it.
    const savedGameState = window.location.hash && load();
    if (savedGameState) {
      this.game.state = savedGameState;
      this.setState(savedGameState, this.dealCards);
    }

    this.enableConsole();
  }
  enableConsole() {
    // Enable a "console" in the browser.
    console.log(`Welcome to the Slay The Web Console. Some examples:
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
    this.game.enqueue({ type: "playCard", card, target });

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
  handleMapMove(move) {
    console.log("Made a move");
    this.toggleOverlay("#Map");
    this.setState({ didPickCard: false });
    this.game.enqueue({ type: "move", move });
    this.update(this.dealCards);
  }
  render(props, state) {
    if (!state.player) return;
    const isDead = state.player.currentHealth < 1;
    const didWin = isCurrRoomCompleted(state);
    const didWinEntireGame = isDungeonCompleted(state);
    const room = getCurrRoom(state);
    const noEnergy = !state.player.currentEnergy;

    // There's a lot here because I did not want to split into too many files.
    return html`
			<div class="App" tabindex="0" onKeyDown=${(e) => this.handleShortcuts(e)}>
				<figure class="App-background" data-room-index=${state.dungeon.y}></div>

				${
          room.type === "start DISABLED" &&
          html`<${Overlay}><${StartRoom} onContinue=${this.goToNextRoom} /><//>`
        }

				${
          isDead &&
          html`<${Overlay}>
            <p center>You are dead.</p>
            <${DungeonStats} state=${state}><//>
            <button onclick=${() => this.props.onLoose()}>Try again?</button>
          <//> `
        }

				${
          didWinEntireGame &&
          html`<${Overlay}>
            <p center>
              <button onclick=${() => this.props.onWin()}>You win!</button>
            </p>
            <${DungeonStats} state=${state}><//>
          <//> `
        }

				${
          !didWinEntireGame &&
          didWin &&
          room.type === "monster" &&
          html`<${Overlay}>
            <h1 center medium>Victory. Onwards!</h1>
            ${!state.didPickCard
              ? html`
                  <p center>
                    Here is your reward. Pick a card to add to your deck.
                  </p>

                  <${CardChooser}
                    cards=${getCardRewards(3)}
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

				<div class="Targets Split">
					<div class="Targets-group">
						<${Player} model=${state.player} name="Player" />
					</div>
					<div class="Targets-group">
						${
              room.monsters &&
              room.monsters.map(
                (monster) =>
                  html`<${Monster} model=${monster} gameState=${state} />`
              )
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

				<${OverlayWithButton} id="Map" open topright key=${1}>
					${
            room.type !== "start" &&
            html`<button
              align-right
              onClick=${() => this.toggleOverlay("#Map")}
            >
              <u>M</u>ap
            </button>`
          }
					<div class="Overlay-content">
						<${Map} dungeon=${state.dungeon} onMove=${this.handleMapMove} />
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
