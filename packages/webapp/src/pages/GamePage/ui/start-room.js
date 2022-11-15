import {
  html,
  Component,
} from "../web_modules/htm/preact/standalone.module.js";
import relics from "../content/relics";

export default class StartRoom extends Component {
  constructor() {
    super();
    this.state = {
      heroSelected: false,
    };
  }

  render() {
    return html`
      <article>
        ${!this.state.heroSelected &&
        html` <h1 center medium>Select Hero</h1>
          <div class="container">
            <div class="hero-card">
              <div class="hero-card-image"></div>

              <div class="hero-card-body">
                <span class="power">Deck type</span>
                <h2>Specter</h2>
                <p>
                  Specter uses evasive manouvres and poisonous skills to win his
                  battles.
                </p>
              </div>

              <div class="selector">
                <button
                  onClick=${() => {
                    this.props.onSelect("Default");
                    this.setState({ heroSelected: true });
                  }}
                >
                  select
                </button>
              </div>
            </div>

            <div class="hero-card">
              <div class="hero-card-image"></div>

              <div class="hero-card-body">
                <span class="power">Deck type</span>
                <h2>Ape</h2>
                <p>
                  Use the Power to the Apes deck and destroy your opponents
                  using bleed damage
                </p>
              </div>

              <div class="selector">
                <button
                  onClick=${() => {
                    this.props.onSelect("P2A");
                    this.setState({ heroSelected: true });
                  }}
                >
                  select
                </button>
              </div>
            </div>

            <div class="hero-card">
              <div class="hero-card-image"></div>

              <div class="hero-card-body">
                <span class="power">Deck type</span>
                <h2>Ice Cream</h2>
                <p>
                  General Ice Cream will obliterate enemies using his ice
                  abilities!
                </p>
              </div>

              <div class="selector">
                <button
                  onClick=${() => {
                    this.props.onSelect("IceCream");
                    this.setState({ heroSelected: true });
                  }}
                >
                  select
                </button>
              </div>
            </div>

            <div class="hero-card">
              <div class="hero-card-image"></div>

              <div class="hero-card-body">
                <span class="power">Deck type</span>
                <h2>Sakura</h2>
                <p>Not working yet</p>
              </div>

              <div class="selector">
                <button disabled>select</button>
              </div>
            </div>
          </div>
          <p center>
            <button onclick=${() => window.location.reload()}>Leave</button>
          </p>`}
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
                  ${this.props.nfts.map((nft) => {
                    return html` <article class="Card relic-card">
                      <div
                        class="Card-inner"
                        onClick=${() => this.props.selectRelic(nft)}
                      >
                        <h3 class="Card-name">${nft.name}</h3>
                        <figure class="Card-media relic">
                          <img src=${nft.avatar} alt=${nft.name} />
                        </figure>
                        <p class="Card-type">Relic</p>
                        <p class="Card-description">
                          ${relics.find((item) => item.id === nft.id)
                            .relicDescription}
                        </p>
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
