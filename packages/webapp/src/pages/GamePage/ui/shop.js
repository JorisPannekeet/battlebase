import {
  html,
  Component,
} from "../web_modules/htm/preact/standalone.module.js";
import relics from "../content/relics.js";

export default class Shop extends Component {
  render(props, state) {
    const allRelics = [];
    props.nfts.map((nft) => {
      const relic = relics.find(
        (item) =>
          item.address === nft.tokenAddress &&
          nft.metadata.base.name.includes(item.matchingData)
      );
      if (relic) {
        allRelics.push({ ...relic, ...nft });
      }
    });
    const shuffled = allRelics.sort(() => 0.5 - Math.random()); //shuffle relics
    const uniques = shuffled
      .filter(
        (value, index, self) =>
          index ===
          self.findIndex((t) => t.relicDescription === value.relicDescription)
      )
      .filter((nft) => {
        return props.gameState.relics.some((rel) => {
          return rel.relicDescription !== nft.relicDescription;
        });
      }); // remove dupes

    const randomRelics = uniques.slice(0, 3); // pick 3

    return html`
      <h1 center medium>Shop</h1>
      <p center>Welcome to the shop!</p>
      ${randomRelics.length
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
                        src=${relic.tokenAddress === "free"
                          ? require(`./images/relics/${relic.metadata.imageSize.original}`)
                              .default
                          : relic.metadata.imageSize.original}
                        alt=${relic.metadata.base.name}
                      />
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
        : html` <p center>No Relics in wallet or no wallet connected</p>
            <div center>
              <button onClick=${() => this.props.onContinue()}>Continue</button>
            </div>`}
    `;
  }
}
