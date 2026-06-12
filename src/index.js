import { html, render } from "./web_modules/htm/preact/standalone.module.js";
import { SlayTheWeb } from "./ui/index.js";
import "./ui/index.css";

render(html`<${SlayTheWeb} />`, document.querySelector("#SlayTheWeb"));
