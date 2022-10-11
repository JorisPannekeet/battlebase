import {
  html,
  Component,
} from "../web_modules/htm/preact/standalone.module.js";

export default class StartRoom extends Component {
  render() {
    return html`
      <h1 center medium>Select Hero</h1>
      <div class="container">
        <div class="hero-card">
          <div class="hero-card-image"></div>

          <div class="hero-card-body">
            <span class="power">No type</span>
            <h2>Default</h2>
            <p>Start with the default deck, no NFT's needed.</p>
          </div>

          <div class="hero-card-footer">
            <div class="info">
              <div class="value">51784</div>
              <div class="type">used</div>
            </div>
            <div class="info">
              <div class="value">329</div>
              <div class="type">cards</div>
            </div>
            <div class="info">
              <div class="value">4.5</div>
              <div class="type">winrate</div>
            </div>
          </div>

          <div class="selector">
            <button onClick=${() => this.props.onSelect("Default")}>
              select
            </button>
          </div>
        </div>

        <div class="hero-card">
          <div class="hero-card-image"></div>

          <div class="hero-card-body">
            <span class="power">Street Power</span>
            <h2>P2A</h2>
            <p>Use the Power to the Apes deck and ....</p>
          </div>

          <div class="hero-card-footer">
            <div class="info">
              <div class="value">51784</div>
              <div class="type">used</div>
            </div>
            <div class="info">
              <div class="value">329</div>
              <div class="type">cards</div>
            </div>
            <div class="info">
              <div class="value">4.5</div>
              <div class="type">winrate</div>
            </div>
          </div>
          <div class="selector">
            <button onClick=${() => this.props.onSelect("P2A")}>select</button>
          </div>
        </div>

        <div class="hero-card">
          <div class="hero-card-image"></div>

          <div class="hero-card-body">
            <span class="power">Knight Power</span>
            <h2>Ice Cream</h2>
            <p>Not working yet.</p>
          </div>

          <div class="hero-card-footer">
            <div class="info">
              <div class="value">51784</div>
              <div class="type">used</div>
            </div>
            <div class="info">
              <div class="value">329</div>
              <div class="type">cards</div>
            </div>
            <div class="info">
              <div class="value">4.5</div>
              <div class="type">winrate</div>
            </div>
          </div>
          <div class="selector">
            <button disabled>select</button>
          </div>
        </div>

        <div class="hero-card">
          <div class="hero-card-image"></div>

          <div class="hero-card-body">
            <span class="power">Brilliant Power</span>
            <h2>Hollow</h2>
            <p>Not working yet</p>
          </div>

          <div class="hero-card-footer">
            <div class="info">
              <div class="value">51784</div>
              <div class="type">used</div>
            </div>
            <div class="info">
              <div class="value">329</div>
              <div class="type">cards</div>
            </div>
            <div class="info">
              <div class="value">4.5</div>
              <div class="type">winrate</div>
            </div>
          </div>
          <div class="selector">
            <button disabled>select</button>
          </div>
        </div>
      </div>

      <p center>
        <button onclick=${() => (window.location = window.location.origin)}>
          Leave
        </button>
      </p>
    `;
  }
}
