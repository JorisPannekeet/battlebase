import {
  html,
  useState,
} from "../web_modules/htm/preact/standalone.module.js";
import CardChooser from "./card-chooser.js";

export default function CampfireRoom(props) {
  const [choice, setChoice] = useState(undefined);
  const [isChoosingCard, setIsChoosingCard] = useState(false);

  function choose(newChoice, reward) {
    setChoice(newChoice);
    setIsChoosingCard((choosing) => !choosing);
    if (reward) {
      props.onChoose(newChoice, reward);
    }
  }

  let label = "";
  if (choice === "upgradeCard") label = "Choose a card to upgrade";
  if (choice === "removeCard") label = "Choose a card to remove";

  return html`
    <h1 center medium>Campfire</h1>
    <ul class="Options campfire">
      ${isChoosingCard
        ? html`
            <li>
              <button onclick=${() => setIsChoosingCard(false)}>Cancel</button>
            </li>
          `
        : html`
            <li>
              <button onclick=${() => props.onChoose("rest")}>Rest</button>
            </li>
            <li>
              <button onclick=${() => choose("upgradeCard")}>
                Upgrade card
              </button>
            </li>
            <li>
              <button onclick=${() => choose("removeCard")}>
                Remove card
              </button>
            </li>
          `}
    </ul>
    ${isChoosingCard &&
    html`<br />
      <p center>${label}</p>
      <${CardChooser}
        gameState=${props.gameState}
        cards=${props.gameState.deck}
        didSelectCard=${(card) => choose(choice, card)}
      />`}
  `;
}
