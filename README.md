# Downfall

A dungeon crawler deck-building card game in the browser, inspired by Slay the Spire and built on top of [Slay the Web](https://github.com/oskarrough/slaytheweb).

Pick a hero, choose a relic, and descend through the stages of hell. Fight monsters by playing cards from your hand, collect new cards and relics along the way, and try to make it through alive.

## How to run

Requires [Node.js](https://nodejs.org).

```sh
npm install
npm run dev
```

Then open the printed local URL in your browser.

To create a production build in `dist/`:

```sh
npm run build
npm run preview   # serve the build locally
```

The build is a fully static site — deploy the `dist/` folder anywhere (Netlify, Vercel, GitHub Pages, a plain web server). It expects to be served from the domain root, since assets are referenced with absolute paths like `/images/...`.

## Project structure

- `src/game/` — game logic: actions, the action queue (with undo), dungeon generation, card and power mechanics. No DOM code here.
- `src/content/` — game content: cards, decks, heroes, monsters, relics and dungeon encounters.
- `src/ui/` — the interface, written with [htm](https://github.com/developit/htm) + Preact, animated with GSAP. Sound effects use Tone.js.
- `src/web_modules/` — vendored ES module dependencies (preact/htm, gsap, immer, tone).
- `public/images/`, `public/audio/` — art and music, served as static assets.

## Gameplay notes

- Drag cards from your hand onto a target to play them. Keyboard shortcuts: `e` end turn, `u` undo, `d` deck, `a` draw pile, `s` discard pile, `m` map, `Escape` menu.
- The game saves to `localStorage` when you choose Save in the menu, and the splash screen offers to continue a saved run.
- A debug console is available in the browser devtools under `window.df` (e.g. `df.money()`, `df.clearStage()`).
