import {
  html,
  Component,
} from "../web_modules/htm/preact/standalone.module.js";
import relics from "../content/relics.js";
import CardChooser from "./card-chooser.js";
import { getCardRewards } from "../game/cards.js";

export default class Shop extends Component {
  constructor() {
    super();
    // Props
    this.relics = [];
    this.cards = [];
  }
  componentDidMount() {
    this.props.buyItem(null, "relic", 0);
    const owned = this.props.gameState.relics.map(
      (rel) => rel.relicDescription
    );
    const available = relics.filter(
      (relic) => !owned.includes(relic.relicDescription)
    );
    const shuffled = [...available].sort(() => 0.5 - Math.random()); //shuffle relics
    const randomRelics = shuffled.slice(0, 3); // pick 3

    this.cards = html`<${CardChooser}
      cards=${getCardRewards(3, this.props.state.hero)}
      didSelectCard=${(card) => this.props.buyItem(card, "card", 80)}
      isShop=${true}
    /> `;
    this.relics = randomRelics;
  }

  buyRelic(relic) {
    this.props.buyItem(relic, "relic", 70);
    const el = document.getElementById(relic.name);
    el.style.pointerEvents = "none";
    el.style.filter = "grayscale(1)";
  }
  render(props, state) {
    return html`
      <div
        id="relics"
        class="relics"
        topleft
        style="position:fixed !important;"
      >
        <div class="gold-ui">
          <img src="/images/gold.png" />${props.state.player.gold}
        </div>
      </div>
      <h1 center medium>Shop</h1>
      <h2 center>Cards 80 Gold each.</h2>
      ${props.state.player.gold >= 80 ? this.cards : html``}
      <h2 center>Relics 70 Gold each.</h2>
      ${props.state.player.gold >= 70
        ? html`
            <div class="Cards Cards--grid">
              ${this.relics.map((relic) => {
                return html` <article class="Card relic-card" id=${relic.name}>
                  <div class="Card-inner" onClick=${() => this.buyRelic(relic)}>
                    <h3 class="Card-name">${relic.name}</h3>
                    <figure class="Card-media relic">
                      <img src="/images/${relic.image}" alt=${relic.name} />
                    </figure>
                    <p class="Card-type">Relic</p>
                    <p class="Card-description">${relic.relicDescription}</p>
                  </div>
                </article>`;
              })}
              <div center>
                <button onClick=${() => this.props.onContinue()}>
                  Continue
                </button>
              </div>
            </div>
          `
        : html` <p center>Not enough gold</p>
            <div center>
              <button onClick=${() => this.props.onContinue()}>Continue</button>
            </div>`}
    `;
  }
}
