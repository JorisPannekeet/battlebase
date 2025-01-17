import {
  html,
  Component,
} from "../web_modules/htm/preact/standalone.module.js";
import {
  weak as weakPower,
  vulnerable as vulnerablePower,
  regen as regenPower,
  boost as boostpower,
  poison as poisonpower,
  charge as chargepower,
} from "../game/powers.js";

export const Player = (props) => {
  return html`<${Target} ...${props} type="player" />`;
};

export const Monster = (props) => {
  const monster = props.model;
  const state = props.gameState;
  // {damage: 6, block: 2}
  const intent = monster.intents[monster.nextIntent];

  function MonsterIntent([type, amount]) {
    const weakened = monster.powers.weak;
    const vulnerable = state.player.powers.vulnerable;

    if (type === "damage" && weakened) amount = weakPower.use(amount);
    if (type === "damage" && vulnerable) amount = vulnerablePower.use(amount);

    let tooltip = "";
    if (type === "damage") tooltip = `Will deal ${amount} damage`;
    if (type === "block") tooltip = `Will block for ${amount}`;
    if (type === "weak") tooltip = `Will apply ${amount} Weak`;
    if (type === "vulnerable") tooltip = `Will apply ${amount} Vulnerable`;

    // Don't reveal how many stacks will be applied.
    if (type === "vulnerable" || type === "weak") amount = undefined;
    const typeImage = require(`./images/${type}.png`).default;
    return html`
      <div
        class="Target-intent ${tooltip && "tooltipped tooltipped-n"}"
        aria-label="${tooltip}"
      >
        <img alt=${type} src="${typeImage}" />
        ${amount}
      </div>
    `;
  }

  return html`
    <${Target} ...${props} type="enemy">
      ${intent && Object.entries(intent).map((intent) => MonsterIntent(intent))}
    <//>
  `;
};

class Target extends Component {
  componentDidUpdate(prevProps) {
    // Keep track of how much hp we might have lost.

    const lostHealth =
      this.props.model.currentHealth < prevProps.model.currentHealth
        ? prevProps.model.currentHealth - this.props.model.currentHealth
        : this.props.model.currentHealth - prevProps.model.currentHealth;

    if (lostHealth > 0) this.setState({ lostHealth });
    // Keep track of how much block we gained.
    // const gainedBlock = this.props.model.block - prevProps.model.block
    // if (gainedBlock > 0) this.setState({gainedBlock})
  }

  render({ model, type, name, children, hero, monsterIndex, relics }, state) {
    const isDead = model.currentHealth < 1;
    const hp = isDead ? 0 : model.currentHealth;
    let image;

    if (type === "player") {
      image = require(`./images/heroes/${hero.image}`).default;
    } else {
      image = require(`./images/${model.image}`).default;
    }

    return html`
      <div
        class=${`Target${isDead ? " Target--isDead" : ""}`}
        data-type=${type}
        data-monster=${type === "enemy" ? monsterIndex : ""}
      >
        <h2>${children}<span class="Target-name">${name}</span></h2>
        <${Healthbar} max=${model.maxHealth} value=${hp} block=${model.block} />
        <${Powers} powers=${model.powers} />
        <img src="" id="skill" />
        <img
          id="${type}-image"
          class="${type} ${name === "Herbshrimp" ? "shrimp" : ""}"
          src=${image}
        />
        <div class="Target-combatText Split">
          <${FCT}
            key=${model.block}
            value=${model.block}
            class="FCT FCT--block"
          />
          <${FCT} key=${hp} value=${state.lostHealth} />
        </div>
      </div>
    `;
  }
}

// A bar that shows the player's current and maximum health as well as any block.
function Healthbar({ value, max, block }) {
  return html`
    <div class="Healthbar ${block ? `Healthbar--hasBlock` : ""}">
      <p class="Healthbar-label">
        <span>${value}/${max}</span>
      </p>
      <div
        class="Healthbar-bar"
        style=${`width: ${(value / max) * 100}%`}
      ></div>
      <div
        class="Healthbar-bar Healthbar-blockBar"
        style=${`width: ${(block / max) * 100}%`}
      >
        ${block > 0 ? block : ""}
      </div>
    </div>
  `;
}

// Shows currently active powers.
const Powers = (props) => {
  return html`
    <div class="Target-powers">
      <${Power} amount=${props.powers.vulnerable} power=${vulnerablePower} />
      <${Power} amount=${props.powers.regen} power=${regenPower} />
      <${Power} amount=${props.powers.weak} power=${weakPower} />
      <${Power} amount=${props.powers.boost} power=${boostpower} />
      <${Power} amount=${props.powers.poison} power=${poisonpower} />
      <${Power} amount=${props.powers.charge} power=${chargepower} />
    </div>
  `;
};

const Power = ({ power, amount }) => {
  if (!amount) return null;
  return html`<span
    class="tooltipped tooltipped-s"
    aria-label=${power.description}
  >
    ${power.name} ${amount}
  </span>`;
};

// Floating Combat Text. Give it a number and it'll animate it.
function FCT(props) {
  // This avoids animation the value "0".
  if (!props.value) return html`<p></p>`;
  return html`<p class="FCT" ...${props}>${props.value}</p>`;
}
