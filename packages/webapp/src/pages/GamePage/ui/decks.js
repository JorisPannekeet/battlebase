import {
  html,
  Component,
} from "../web_modules/htm/preact/standalone.module.js";
import cards from "../content/cards.js";
import { Card } from "./cards.js";
import { decks as D } from "../content/decks";

export default class Decks extends Component {
  constructor() {
    super();
    this.state = {
      selectedDeck: "defaultDeck",
    };
    this.handleSelectedDeck = this.handleSelectedDeck.bind(this);
  }
  handleSelectedDeck(deck) {
    this.setState({ selectedDeck: deck });
  }
  render(props, state) {
    const deckNames = Object.keys(D);
    //console.log({ state: this.state.selectedDeck });
    return html`
      <article class="Splash Splash--fadein">
        <h1 style="margin-top:8vh">Decks</h1>
        <article class="Splash">
          <p><a onclick=${props.back} class="Button">Back</a></p>
          <div class="decks">
            ${deckNames.map(
              (deck) =>
                html`<button onclick=${() => this.handleSelectedDeck(deck)}>
                  ${deck}
                </button>`
            )}
          </div>
          <h2>${D[this.state.selectedDeck].length} Card Collection</h2>

          <div class="Cards Cards--grid">
            ${D[this.state.selectedDeck].map((card) => Card(card))}
          </div>
        </article>
      </article>
    `;
  }
}
