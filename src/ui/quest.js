import {
  html,
  Component,
} from "../web_modules/htm/preact/standalone.module.js";
import relics from "../content/relics.js";

export default class QuestRoom extends Component {
  render(props, state) {
    const owned = props.gameState.relics.map((rel) => rel.relicDescription);
    const available = relics.filter(
      (relic) => !owned.includes(relic.relicDescription)
    );
    const shuffled = [...available].sort(() => 0.5 - Math.random()); //shuffle relics
    const randomRelics = shuffled.slice(0, 3); // pick 3

    return html`
      <h1 center medium>Event room</h1>
      <p center>Aren't you a lucky one, you're allowed to choose a relic!</p>
      ${randomRelics.length
        ? html`
            <div class="Cards Cards--grid">
              ${randomRelics.map((relic) => {
                return html` <article class="Card relic-card">
                  <div
                    class="Card-inner"
                    onClick=${() => this.props.selectRelic(relic)}
                  >
                    <h3 class="Card-name">${relic.name}</h3>
                    <figure class="Card-media relic">
                      <img src="/images/${relic.image}" alt=${relic.name} />
                    </figure>
                    <p class="Card-type">Relic</p>
                    <p class="Card-description">${relic.relicDescription}</p>
                  </div>
                </article>`;
              })}
            </div>
          `
        : html` <p center>No relics left to collect</p>
            <div center>
              <button onClick=${() => this.props.onContinue()}>Continue</button>
            </div>`}
    `;
  }
}
