import { html } from "../web_modules/htm/preact/standalone.module.js";
import History from "./history.js";

const save = (state) =>
  localStorage.setItem("saveGame", encodeURIComponent(JSON.stringify(state)));
const abandonGame = () => window.location.reload();

export default function Menu({ game, gameState, onUndo }) {
  return html`
    <div class="Splash">
      <h1 medium>Downfall</h1>

      <ul class="Options">
        <li>
          <button onclick=${() => save(gameState)}>Save</button>
        </li>
        <li>
          <button onclick=${() => abandonGame()}>Abandon Game</button>
        </li>
      </ul>

      <${History} future=${game.future.list} past=${game.past.list} />
    </div>
  `;
}
