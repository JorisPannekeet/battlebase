import {
  html,
  useState,
} from "../web_modules/htm/preact/standalone.module.js";
import { Card } from "./cards.js";
import { decks as D } from "../content/decks/index.js";

export default function Decks(props) {
  const [selectedDeck, setSelectedDeck] = useState("defaultDeck");
  const deckNames = Object.keys(D);

  return html`
    <article class="Splash Splash--fadein">
      <h1 style="margin-top:8vh">Decks</h1>
      <article>
        <p><a onclick=${props.back} class="Button">Back</a></p>
        <div class="decks">
          ${deckNames.map(
            (deck) =>
              html`<button onclick=${() => setSelectedDeck(deck)}>
                ${deck}
              </button>`
          )}
        </div>
        <h2>${selectedDeck}</h2>

        <h2>${D[selectedDeck].length} Card Collection</h2>

        <div class="Cards Cards--grid">
          ${D[selectedDeck].map((card) => Card(card))}
        </div>
      </article>
    </article>
  `;
}
