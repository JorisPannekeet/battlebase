import {
  html,
  Component,
} from "../web_modules/htm/preact/standalone.module.js";

export default class SplashScreen extends Component {
  render(props, state) {
    const c1 = require("./images/cloud1.png").default;
    const c2 = require("./images/cloud2.png").default;
    return html`
      <article class="Splash Splash--fadein">
        <div class="title-container">
          <h1 style="margin-top:8vh">Down<span class="titlep2">fall</span></h1>
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
                Connect wallet
              </button>
            </div>`}
        </div>
        ${props.accountState !== "LOCKED" &&
        html`
				<ul class="Options">
					${
            localStorage.getItem("saveGame")
              ? html`
							<li><button  onClick=${props.onContinue}>Continue Game</button></li>
							<li><button  onClick=${props.onNewGame}>New Game</a></li>
				`
              : html`<li><button onClick=${props.onNewGame}>Play</a></li>`
          }
					<li><a class="Button" onClick=${props.openDecks}>Decks</a></li>
					<li><button onClick=${() =>
            this.setState({
              showTutorial: !state.showTutorial,
            })}>Manual</a></li>
				</ul>`}
        ${state.showTutorial &&
        html`
          <div class="Splash-details Article">
            <p><strong>What's going on?</strong></p>
            <p>Some text about the story...</p>
            <p>
              Every turn you draw 5 cards from your draw pile. Cards cost energy
              to play, and you get 3 energy every turn.
            </p>
            <p>
              Cards can deal damage to monsters, block enemy attacks or make
              them weak or vulnerable. They can heal you and other things.
              You'll figure it out.
            </p>
            <p>Beware, whenever you end your turn, the monsters take turn.</p>
            <p>
              Should you manage to kill the monsters in a room before they end
              you, you'll proceed to the next room. Maybe there will be rewards.
              Can you reach the end?
            </p>
          </div>
        `}
      </article>
      <img class="cloud c1" src="${c1}" />
      <img class="cloud c2" src="${c2}" />
    `;
  }
}
