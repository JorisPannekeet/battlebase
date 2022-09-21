import {html, Component} from '../web_modules/htm/preact/standalone.module.js'
import {canPlay} from '../game/conditions.js'

export default class Cards extends Component {
	// props = {gameState: {}, type ''}
	render(props) {
		const cards = props.gameState[props.type]
		return html` <div class="Cards">${cards.map((card) => Card(card, props.gameState))}</div> `
	}
}

export function Card(card, gameState) {
	const isDisabled = !canPlay(card, gameState)
	const image = card.image ? `/ui/images/cards/${card.image}` : '/ui/images/cards/fallback.jpg'

	return html`
		<article
			class="Card"
			data-card-type=${card.type}
			data-card-target=${card.target}
			key=${card.id}
			data-id=${card.id}
			disabled=${isDisabled}
		>
			<div class="Card-inner">
				<p class="Card-energy EnergyBadge">
					<span>${card.energy}</span>
				</p>
				<figure class="Card-media">
					<img src=${image} alt=${card.name} />
				</figure>
				<p class="Card-type">${card.type}</p>
				<h3 class="Card-name">${card.name}</h3>
				<p class="Card-description">${card.description}</p>
			</div>
		</article>
	`
}
