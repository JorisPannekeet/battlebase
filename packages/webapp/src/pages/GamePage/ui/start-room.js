import {
  html,
  Component,
} from "../web_modules/htm/preact/standalone.module.js";
import relics from "../content/relics";
import { heroes } from "../content/heroes.js";

export default class StartRoom extends Component {
  constructor() {
    super();
    this.state = {
      heroSelected: false,
      selectedHero: heroes[0],
    };
  }

  render() {
    const allRelics = [];
    this.props.nfts.map((nft) => {
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
    const uniques = shuffled.filter(
      (value, index, self) =>
        index ===
        self.findIndex((t) => t.relicDescription === value.relicDescription)
    );
    const randomRelics = uniques.slice(0, 3); // pick 3

    return html`
      <article
        class="start-room"
        style="background-image:url(${require(`./images/heroes/backgrounds/${this.state.selectedHero.background}`)
          .default});"
      >
        ${!this.state.heroSelected &&
        html`
          <p class="hero-btns">
            <button onclick=${() => window.location.reload()}>Leave</button>
            <button
              onclick=${() => {
                this.props.onSelect(this.state.selectedHero);
                this.setState({ heroSelected: true });
              }}
            >
              Next
            </button>
          </p>
          <h1 center medium>Select Hero</h1>
          <div class="selected-hero">
            <img
              src="${require(`./images/heroes/${this.state.selectedHero.image}`)
                .default}"
            />
            <h3>${this.state.selectedHero.name}</h3>
            <p>Deck type: ${this.state.selectedHero.type}</p>
          </div>
          <div class="hero-container">
            ${heroes.map((hero) => {
              return html`
                <div
                  class="hero-select ${this.state.selectedHero.id === hero.id
                    ? "active"
                    : ""}"
                >
                  <a
                    onClick=${() => {
                      // this.props.onSelect(hero.name);
                      this.setState({ selectedHero: hero });
                    }}
                  >
                    <img
                      src="${require(`./images/heroes/thumbnails/${hero.thumbnail}`)
                        .default}"
                    />
                  </a>
                </div>
              `;
            })}
          </div>
        `}
        ${this.state.heroSelected &&
        html`
          <h1 center medium>Select Relic</h1>
          <p center>
            Relics will give you a little boost on your descent so collect as
            mamny as you can!
          </p>
          ${this.props.nfts.length
            ? html`
                <div class="Cards Cards--grid">
                  ${randomRelics.map((nft) => {
                    return html` <article class="Card relic-card">
                      <div
                        class="Card-inner"
                        onClick=${() => this.props.selectRelic(nft)}
                      >
                        <h3 class="Card-name">${nft.metadata.base.name}</h3>
                        <figure class="Card-media relic">
                          <img
                            src=${nft.tokenAddress === "free"
                              ? require(`./images/relics/${nft.metadata.imageSize.original}`)
                                  .default
                              : nft.metadata.imageSize.original}
                            alt=${nft.metadata.base.name}
                          />
                        </figure>
                        <p class="Card-type">Relic</p>
                        <p class="Card-description">${nft.relicDescription}</p>
                      </div>
                    </article>`;
                  })}
                </div>
              `
            : html` <p center>No Relics in wallet or no wallet connected</p>
                <div center>
                  <button onClick=${() => this.props.onContinue()}>
                    Start descent
                  </button>
                </div>`}
        `}
      </article>
    `;
  }
}
