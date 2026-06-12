import {
  html,
  useState,
  useEffect,
} from "../web_modules/htm/preact/standalone.module.js";
import relics from "../content/relics.js";
import { heroes } from "../content/heroes.js";

export default function StartRoom(props) {
  const [heroSelected, setHeroSelected] = useState(false);
  const [displayStage, setDisplayStage] = useState(false);
  const [selectedHero, setSelectedHero] = useState(heroes[0]);
  // Pick the three relics once, so re-renders don't reshuffle them.
  const [randomRelics] = useState(() =>
    [...relics].sort(() => 0.5 - Math.random()).slice(0, 3)
  );

  useEffect(() => {
    props.audio("start", "play");
  }, []);

  function startGame(relic) {
    setDisplayStage(true);
    setTimeout(() => {
      props.selectRelic(relic);
    }, 2000);
  }

  return html`
    <article
      class="start-room"
      style="background-image:url(/images/heroes/backgrounds/${selectedHero.background});"
    >
      ${!heroSelected &&
      html`
        <p class="hero-btns">
          <button onclick=${() => window.location.reload()}>Leave</button>
          <button
            onclick=${() => {
              props.onSelect(selectedHero);
              setHeroSelected(true);
            }}
          >
            Next
          </button>
        </p>
        <h1 center medium>Select Hero</h1>
        <div class="selected-hero">
          <img src="/images/heroes/${selectedHero.image}" />
          <h3>${selectedHero.name}</h3>
          <p>Deck type: ${selectedHero.type}</p>
        </div>
        <div class="hero-container">
          ${heroes.map((hero) => {
            return html`
              <div
                class="hero-select ${hero.active ? "" : "disabled"} ${selectedHero.id ===
                hero.id
                  ? "active"
                  : ""}"
              >
                <a
                  onClick=${() => {
                    if (hero.active) setSelectedHero(hero);
                  }}
                >
                  <img src="/images/heroes/thumbnails/${hero.thumbnail}" />
                </a>
              </div>
            `;
          })}
        </div>
      `}
      ${heroSelected &&
      html`
        <h1 center medium>Select Relic</h1>
        <p center>
          Relics will give you a little boost on your descent so collect as
          many as you can!
        </p>
        <div class="Cards Cards--grid">
          ${randomRelics.map((relic) => {
            return html` <article class="Card relic-card">
              <div class="Card-inner" onClick=${() => startGame(relic)}>
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
      ${displayStage &&
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
