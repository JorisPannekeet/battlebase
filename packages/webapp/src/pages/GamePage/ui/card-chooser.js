import {
  html,
  Component,
} from "../web_modules/htm/preact/standalone.module.js";
import { Card } from "./cards.js";

export default class CardChooser extends Component {
  clickedCard(card) {
    this.props.didSelectCard(card);
    if (this.props.isShop) {
      const el = document.getElementById(card.name);
      el.style.pointerEvents = "none";
      el.style.filter = "grayscale(1)";
    }
  }
  render(props) {
    return html`
      <article class="RewardsBox">
        <div class="Cards">
          ${props.cards.map(
            (card) =>
              html`<div
                class="CardBox"
                id=${card.name}
                onClick=${() => this.clickedCard(card)}
              >
                ${Card(card, props.gameState)}
              </div>`
          )}
        </div>
      </article>
    `;
  }
}
