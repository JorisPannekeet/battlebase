import { html } from "../web_modules/htm/preact/standalone.module.js";
import { Card } from "./cards.js";

export default function CardChooser(props) {
  function clickedCard(card) {
    props.didSelectCard(card);
    if (props.isShop) {
      const el = document.getElementById(card.name);
      el.style.pointerEvents = "none";
      el.style.filter = "grayscale(1)";
    }
  }

  return html`
    <article class="RewardsBox">
      <div class="Cards">
        ${props.cards.map(
          (card) =>
            html`<div
              class="CardBox"
              id=${card.name}
              onClick=${() => clickedCard(card)}
            >
              ${Card(card, props.gameState)}
            </div>`
        )}
      </div>
    </article>
  `;
}
