import {
  html,
  Component,
} from "../web_modules/htm/preact/standalone.module.js";

export default class QuestRoom extends Component {
  render(props, state) {
    return html`
      <h1 center medium>Event room</h1>
      <p center>
        TODO determine what events we do and what relics you can get.
      </p>

      <p center>
        <button onclick=${() => this.props.onContinue()}>Continue</button>
      </p>
    `;
  }
}
