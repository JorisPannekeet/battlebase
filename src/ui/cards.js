import { html } from "../web_modules/htm/preact/standalone.module.js";
import { canPlay } from "../game/conditions.js";

// Renders a list of cards from the gameState prop, e.g. type="hand" or "deck".
export default function Cards(props) {
  const cards = props.gameState[props.type];
  return html`
    <div class="Cards">
      ${cards.map((card, index) => Card(card, props.gameState, index))}
    </div>
  `;
}

export function Card(card, gameState, index) {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  const isDisabled = !canPlay(card, gameState);
  const image = card.image
    ? `/images/cards/allCards/${card.image}`
    : "/images/cards/allCards/placeholder.webp";
  const style = `background:url(${image});background-size:cover;${
    isMobile ? `left:calc(0px + 70px * ${index});` : ""
  }`;

  return html` <article
    class="Card ${card.upgraded ? "upgraded" : ""}"
    data-card-type=${card.type}
    data-card-target=${card.target}
    key=${card.id}
    data-id=${card.id}
    disabled=${isDisabled}
    style=${style}
  >
    ${!card.image &&
    html` <p class="Card-energy EnergyBadge">
        <span>${card.energy}</span>
      </p>
      <h3 class="Card-name">${card.name}</h3>
      <p class="Card-description">${card.description}</p>`}
  </article>`;
}
