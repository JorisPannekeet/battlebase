import {
  html,
  render,
  Component,
} from "../web_modules/htm/preact/standalone.module.js";
import App from "./app.js";
import SplashScreen from "./splash-screen.js";
import WinScreen from "./win-screen.js";
import Decks from "./decks";

/** @enum {string} */
const GameModes = {
  splash: "splash",
  gameplay: "gameplay",
  win: "win",
  decks: "decks",
};

/**
 * Our root component for the game.
 * Controls what to render.
 */
export class SlayTheWeb extends Component {
  constructor() {
    super();
    this.state = {
      // The game mode to start in.
      gameMode: GameModes.splash,
    };
    this.handleWin = this.handleWin.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);
    this.handleLoose = this.handleLoose.bind(this);
    this.handleDecks = this.handleDecks.bind(this);
  }

  handleNewGame() {
    this.setState({ gameMode: GameModes.gameplay });
    // clearing saved game goes here, if i had one
  }
  handleWin() {
    this.setState({ gameMode: GameModes.win });
  }
  handleLoose() {
    this.setState({ gameMode: GameModes.splash });
  }
  handleDecks() {
    this.setState({ gameMode: GameModes.decks });
  }
  render(props, { gameMode }) {
    if (gameMode === GameModes.splash)
      return html`<${SplashScreen}
        onNewGame=${this.handleNewGame}
        onContinue=${this.handleNewGame}
        openDecks=${this.handleDecks}
        account=${props.connectedAccount}
        connectEvent=${props.connectEvent}
        unlockEvent=${props.unlockEvent}
        accountState=${props.accountState}
      />`;
    if (gameMode === GameModes.decks)
      return html`<${Decks} back=${this.handleLoose} />`;
    if (gameMode === GameModes.gameplay)
      return html`
        <${App}
          onWin=${this.handleWin}
          onLoose=${this.handleLoose}
          nfts=${props.nfts}
        />
      `;
    if (gameMode === GameModes.win)
      return html` <${WinScreen} onNewGame=${this.handleNewGame} /> `;
  }
}
