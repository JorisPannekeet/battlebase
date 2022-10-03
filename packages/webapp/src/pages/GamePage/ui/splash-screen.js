import {
  html,
  Component,
} from "../web_modules/htm/preact/standalone.module.js";

export default class SplashScreen extends Component {
  render(props, state) {
    return html`
			<article class="Splash Splash--fadein">
				<h1 style="margin-top:8vh">Game name here</h1>
				<h2>Subtitle here</h2>
				<ul class="Options">
					${
            localStorage.getItem("saveGame")
              ? html`
							<li><button autofocus onClick=${props.onContinue}>Continue Game</button></li>
							<li><button autofocus onClick=${props.onNewGame}>New Game</a></li>
				`
              : html`<li><button autofocus onClick=${props.onNewGame}>Play</a></li>`
          }
					<li><a class="Button">Decks</a></li>
					<li><button onClick=${() =>
            this.setState({
              showTutorial: !state.showTutorial,
            })}>Manual</a></li>
				</ul>
				${
          state.showTutorial &&
          html`
            <div class="Splash-details Article">
              <p><strong>What's going on?</strong></p>
              <p>Some text about the story...</p>
              <p>
                Every turn you draw 5 cards from your draw pile. Cards cost
                energy to play, and you get 3 energy every turn.
              </p>
              <p>
                Cards can deal damage to monsters, block enemy attacks or make
                them weak or vulnerable. They can heal you and other things.
                You'll figure it out.
              </p>
              <p>Beware, whenever you end your turn, the monsters take turn.</p>
              <p>
                Should you manage to kill the monsters in a room before they end
                you, you'll proceed to the next room. Maybe there will be
                rewards. Can you reach the end?
              </p>
            </div>
          `
        }
			</article>
		`;
  }
}
