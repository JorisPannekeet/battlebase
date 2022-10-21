import {
  html,
  Component,
} from "../web_modules/htm/preact/standalone.module.js";
import relics from "../content/relics.js";

export default class QuestRoom extends Component {
  render(props, state) {
    const availableRelics = props.nfts.filter((nft) => {
      return props.gameState.relics.some((rel) => {
        return rel.tokenAddress !== nft.tokenAddress;
      });
    });

    const shuffled = availableRelics.sort(() => 0.5 - Math.random());
    const randomRelics = shuffled.slice(0, 3);

    return html`
      <h1 center medium>Event room</h1>
      <p center>Aren't you a lucky one, you're allowed to choose a relic!</p>
      ${randomRelics
        ? html`
            <div class="Cards Cards--grid">
              ${randomRelics.map((relic) => {
                return html` <article class="Card relic-card">
                  <div
                    class="Card-inner"
                    onClick=${() => this.props.selectRelic(relic)}
                  >
                    <h3 class="Card-name">${relic.metadata.base.name}</h3>
                    <figure class="Card-media relic">
                      <img
                        src=${relic.metadata.imageSize.original}
                        alt=${relic.metadata.base.name}
                      />
                    </figure>
                    <p class="Card-type">Relic</p>
                    <p class="Card-description">
                      ${relics.find(
                        (item) => item.address === relic.tokenAddress
                      ).description}
                    </p>
                  </div>
                </article>`;
              })}
            </div>
          `
        : html` <p center>No Relics in wallet or no wallet connected</p>
            <div center>
              <button onClick=${() => this.props.onContinue()}>Continue</button>
            </div>`}
    `;
  }
}
