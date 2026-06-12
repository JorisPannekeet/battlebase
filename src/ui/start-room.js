import {
  html,
  Component,
} from "../web_modules/htm/preact/standalone.module.js";
import relics from "../content/relics.js";
import { heroes } from "../content/heroes.js";

export default class StartRoom extends Component {
  constructor() {
    super();
    this.state = {
      heroSelected: false,
      displayStage: false,
      selectedHero: heroes[0],
    };
    this.startGame = this.startGame.bind(this);
  }
  componentDidMount() {
    this.props.audio("start", "play");
  }

  startGame(relic) {
    this.setState({ displayStage: true });
    setTimeout(() => {
      this.props.selectRelic(relic);
    }, 2000);
  }

  render() {
    const shuffled = [...relics].sort(() => 0.5 - Math.random()); //shuffle relics
    const randomRelics = shuffled.slice(0, 3); // pick 3

    return html`
      <article
        class="start-room"
        style="background-image:url(/images/heroes/backgrounds/${this.state
          .selectedHero.background});"
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
            <img src="/images/heroes/${this.state.selectedHero.image}" />
            <h3>${this.state.selectedHero.name}</h3>
            <p>Deck type: ${this.state.selectedHero.type}</p>
          </div>
          <div class="hero-container">
            ${heroes.map((hero) => {
              return html`
                <div
                  class="hero-select ${!hero.active && "disabled"} ${this.state
                    .selectedHero.id === hero.id
                    ? "active"
                    : ""}"
                >
                  <a
                    onClick=${() => {
                      this.setState({ selectedHero: hero });
                    }}
                  >
                    <img src="/images/heroes/thumbnails/${hero.thumbnail}" />
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
            many as you can!
          </p>
          <div class="Cards Cards--grid">
            ${randomRelics.map((relic) => {
              return html` <article class="Card relic-card">
                <div class="Card-inner" onClick=${() => this.startGame(relic)}>
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
        `}
        ${this.state.displayStage &&
        html`
          <div class="stage-start">
            <div class="stage-start-content">
              <h2>Stage 1</h2>
              <h1>Limbo</h1>
            </div>
          </div>
        `}
      </article>
    `;
  }
}
