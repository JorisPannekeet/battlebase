import { IsMobile } from "@loopring-web/loopring-sdk";
import {
  html,
  Component,
} from "../web_modules/htm/preact/standalone.module.js";

export default class SplashScreen extends Component {
  render(props, state) {
    const Menu = () => {
      return html`
        ${props.accountState !== "LOCKED" &&
        html` <ul class="Options ${isMobile && html`mobile`}">
          ${localStorage.getItem("saveGame")
            ? html`
      <li><button    onClick=${props.onContinue}>Continue Game</button></li>
      <li><button  onClick=${props.onNewGame}>New Game</a></li>
`
            : html`<li>
                <button onClick=${props.onNewGame}>Play</button>
              </li>`}
          <li>
            <button onClick=${props.openDecks}>Decks</button>
          </li>
          <li>
            <button onClick=${props.openDecks}>Card Market</button>
          </li>

          <li></li>
        </ul>`}
      `;
    };
    const isMobile = navigator.userAgent.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i
    );
    const c1 = require("./images/cloud1.png").default;
    const c2 = require("./images/cloud2.png").default;
    return html`
      <article class="Splash Splash--fadein">
        <div class="title-container">
          <h1>Down<span class="titlep2">fall</span></h1>
        </div>
        <h2>The NFT Dungeon Crawler Card Game</h2>
        <div>
          ${props.accountState === "ACTIVATED" &&
          html`<p>Wallet ${props.account.addressShort} connected !</p>
            <div>
              <button onClick=${() => props.disconnectEvent()}>
                Disconnect
              </button>
            </div>`}
          ${props.accountState === "LOCKED" &&
          html` <div class="Options">
            <p>Wallet ${props.account.addressShort} connected !</p>
            <div>
              <button onClick=${() => props.unlockEvent()}>
                Unlock account
              </button>
              <p center>
                Don't worry this is just so your NFT's can be used in-game!
              </p>
            </div>
          </div>`}
          ${props.accountState === "UN_CONNECT" &&
          html`<p>Wallet not connected</p>
            <div>
              <button onClick=${() => props.connectEvent()}>
                Connect Wallet
              </button>
            </div>`}
          ${isMobile && html`<${Menu} />`}
        </div>
      </article>
      ${!isMobile && html`<${Menu} />`}
      ${props.runs.length &&
      html` <div class="leaderboard">
        <h2 center>Leaderboard</h2>
        <table class="rwd-table">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
          ${props.runs[0].map(
            (run, index) =>
              html`<tr>
                <td>${index + 1}</td>
                <td>${run.nickname}</td>
                <td>${run.score}</td>
              </tr>`
          )}
        </table>
      </div>`}
    `;
  }
}
