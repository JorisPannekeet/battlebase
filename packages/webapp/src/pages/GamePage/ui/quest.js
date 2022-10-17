import {
  html,
  Component,
} from "../web_modules/htm/preact/standalone.module.js";
import CardChooser from "./card-chooser.js";

export default class QuestRoom extends Component {
  render(props, state) {
    const { gameState } = props;
    const { choice, isChoosingCard } = state;
    let label = "";
    if (choice === "upgradeCard") label = "Choose a card to upgrade";
    if (choice === "removeCard") label = "Choose a card to remove";
    return html`
      <h1 center medium>Event room</h1>
      <p center>
        TODO determine what events we do and what relics you can get.
      </p>

      <p center>
        <button onclick=${() => this.props.onContinue()}>Continue</button>
      </p>
    `;
  }
}
