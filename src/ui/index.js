import {
  html,
  useState,
} from "../web_modules/htm/preact/standalone.module.js";
import App from "./app.js";
import SplashScreen from "./splash-screen.js";
import WinScreen from "./win-screen.js";
import Decks from "./decks.js";

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
export function SlayTheWeb() {
  const [gameMode, setGameMode] = useState(GameModes.splash);

  // A new game starts from scratch, so any old save is removed first.
  const handleNewGame = () => {
    localStorage.removeItem("saveGame");
    setGameMode(GameModes.gameplay);
  };
  // Continuing keeps the save so the App can pick it up.
  const handleContinue = () => setGameMode(GameModes.gameplay);
  const handleWin = () => setGameMode(GameModes.win);
  const handleLoose = () => setGameMode(GameModes.splash);
  const handleDecks = () => setGameMode(GameModes.decks);

  if (gameMode === GameModes.splash)
    return html`<${SplashScreen}
      onNewGame=${handleNewGame}
      onContinue=${handleContinue}
      openDecks=${handleDecks}
    />`;
  if (gameMode === GameModes.decks)
    return html`<${Decks} back=${handleLoose} />`;
  if (gameMode === GameModes.gameplay)
    return html` <${App} onWin=${handleWin} onLoose=${handleLoose} /> `;
  if (gameMode === GameModes.win)
    return html` <${WinScreen} onNewGame=${handleNewGame} /> `;
}
