import {
  html,
  Component,
} from "../web_modules/htm/preact/standalone.module.js";

export default class SplashScreen extends Component {
  render(props, state) {
    const c1 = require("./images/cloud1.png").default;
    const c2 = require("./images/cloud2.png").default;
    return html`
      <div class="c-hud">
        <div class="c-hud__content">
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
                  <button onClick=${() => props.unlockEvent()} class="cybr-btn">
                    Unlock account<span aria-hidden>_</span>
                    <span aria-hidden class="cybr-btn__glitch"
                      >Unlock account_</span
                    >
                    <span aria-hidden class="cybr-btn__tag">R25</span>
                  </button>
                  <p center>
                    Don't worry this is just so your NFT's can be used in-game!
                  </p>
                </div>
              </div>`}
              ${props.accountState === "UN_CONNECT" &&
              html`<p>Wallet not connected</p>
                <div>
                  <button
                    onClick=${() => props.connectEvent()}
                    class="cybr-btn"
                  >
                    Connect Wallet<span aria-hidden>_</span>
                    <span aria-hidden class="cybr-btn__glitch"
                      >Connect Wallet_</span
                    >
                    <span aria-hidden class="cybr-btn__tag">R25</span>
                  </button>
                </div>`}
            </div>
          </article>

          ${props.accountState !== "LOCKED" &&
          html` <ul class="Options">
            ${localStorage.getItem("saveGame")
              ? html`
            <li><button    onClick=${props.onContinue}>Continue Game</button></li>
            <li><button  onClick=${props.onNewGame}>New Game</a></li>
      `
              : html`<li>
                  <button onClick=${props.onNewGame} class="cybr-btn">
                    Play<span aria-hidden>_</span>
                    <span aria-hidden class="cybr-btn__glitch">Play_</span>
                    <span aria-hidden class="cybr-btn__tag">R25</span>
                  </button>
                </li>`}
            <li>
              <button onClick=${props.openDecks} class="cybr-btn cybr-blue">
                Decks<span aria-hidden>_</span>
                <span aria-hidden class="cybr-btn__glitch">Decks_</span>
                <span aria-hidden class="cybr-btn__tag">R25</span>
              </button>
            </li>

            <li></li>
          </ul>`}

          <div class="leaderboard">
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
          </div>
        </div>
        <div class="c-hud__inner"></div>
      </div>
    `;
  }
}
