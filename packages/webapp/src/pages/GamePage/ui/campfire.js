import {
  html,
  Component,
} from "../web_modules/htm/preact/standalone.module.js";
import CardChooser from "./card-chooser.js";

export default class CampfireRoom extends Component {
  rest() {
    this.props.onChoose("rest");
  }
  choose(choice, reward) {
    console.log("clicked");
    this.setState({
      choice,
      reward,
      isChoosingCard: !this.state.isChoosingCard,
    });
    if (reward) {
      this.props.onChoose(choice, reward);
    }
  }
  onSelectCard(card) {
    this.choose(this.state.choice, card);
  }

  render(props, state) {
    const { gameState } = props;
    const { choice, isChoosingCard } = state;
    console.log(state);
    let label = "";
    if (choice === "upgradeCard") label = "Choose a card to upgrade";
    if (choice === "removeCard") label = "Choose a card to remove";
    return html`
      <h1 center medium>Campfire</h1>
      <ul class="Options campfire">
        ${isChoosingCard
          ? html`
              <li>
                <button
                  onclick=${() => this.setState({ isChoosingCard: false })}
                >
                  Cancel
                </button>
              </li>
            `
          : html`
              <li>
                <button onclick=${() => this.rest()}>Rest</button>
              </li>
              <li>
                <button onclick=${() => this.choose("upgradeCard")}>
                  Upgrade card
                </button>
              </li>
              <li>
                <button onclick=${() => this.choose("removeCard")}>
                  Remove card
                </button>
              </li>
            `}
      </ul>
      ${isChoosingCard &&
      html`<br />
        <p center>${label}</p>
        <${CardChooser}
          gameState=${gameState}
          cards=${gameState.deck}
          didSelectCard=${(card) => this.onSelectCard(card)}
        />`}
    `;
  }
}
