import {
  html,
  Component,
} from "../web_modules/htm/preact/standalone.module.js";

export default class SplashScreen extends Component {
  render(props, state) {
    const isMobile = navigator.userAgent.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i
    );
    return html`
      <article class="Splash Splash--fadein">
        <div class="title-container">
          <h1>Down<span class="titlep2">fall</span></h1>
        </div>
        <h2>The Dungeon Crawler Card Game</h2>
      </article>
      <ul class="Options ${isMobile ? "mobile" : ""}">
        ${localStorage.getItem("saveGame")
          ? html`
              <li>
                <button onClick=${props.onContinue}>Continue Game</button>
              </li>
              <li><button onClick=${props.onNewGame}>New Game</button></li>
            `
          : html`<li>
              <button onClick=${props.onNewGame}>Play</button>
            </li>`}
        <li>
          <button onClick=${props.openDecks}>Cards</button>
        </li>
      </ul>
    `;
  }
}
