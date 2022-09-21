// Here you'll find all the default cards used in the game.
// See game/cards.js for the details on how they work.
export default [
	{
		name: 'Strike',
		type: 'attack',
		energy: 1,
		target: 'enemy',
		damage: 6,
		description: 'Deal 6 Damage.',
		image: 'the-angel-of-death.jpg',
		upgrade() {
			this.damage = 9
			this.upgraded = true
			this.name = 'Strike+'
			this.description = 'Deal 9 Damage.'
		},
	},
	{
		name: 'Defend',
		type: 'skill',
		energy: 1,
		block: 5,
		target: 'player',
		image: 'angel-messenger.jpg',
		description: 'Gain 5 Block.',
		upgrade() {
			this.block = 8
			this.upgraded = true
			this.name = 'Defend+'
			this.description = 'Gain 8 Block.'
		},
	},
	{
		name: 'Bash',
		type: 'attack',
		energy: 2,
		damage: 8,
		target: 'enemy',
		image: 'apteryx-mantelli.jpg',
		powers: {
			vulnerable: 2,
		},
		description: 'Deal 8 damage. Apply 2 Vulnerable.',
		upgrade() {
			this.damage = 10
			this.upgraded = true
			this.name = 'Bash+'
			this.powers.vulnerable = 3
			this.description = 'Deal 10 Damage. Apply 3 Vulnerable'
		},
	},
	{
		name: 'Clash',
		type: 'attack',
		energy: 0,
		damage: 14,
		target: 'enemy',
		conditions: [
			{
				type: 'onlyType',
				cardType: 'attack',
			},
		],
		description: 'Can only be played if every card in your hand is an Attack. Deal 14 damage.',
		image: 'h-sperling-horrified.jpg',
		upgrade() {
			this.name = 'Clash+'
			this.damage = 17
			this.description =
				'Can only be played if every card in your hand is an Attack. Deal 17 damage.'
		},
	},
	{
		name: 'Cleave',
		type: 'attack',
		energy: 1,
		damage: 8,
		target: 'allEnemies',
		description: 'Deal 8 damage to all enemies.',
		image: 'vernal-equinox.jpg',
		upgrade() {
			this.damage = 11
			this.upgraded = true
			this.name = 'Cleave+'
			this.description = 'Deal 11 Damage to all enemies.'
		},
	},
	{
		name: 'Iron Wave',
		type: 'attack',
		energy: 1,
		damage: 5,
		block: 5,
		target: 'enemy',
		description: 'Deal 5 damage. Gain 5 Block.',
		image: 'henry-stares-back.jpg',
		upgrade() {
			this.damage = 7
			this.block = 7
			this.upgraded = true
			this.name = 'Iron Wave+'
			this.description = 'Deal 7 Damage. Gain 7 Block.'
		},
	},
	{
		name: 'Sucker Punch',
		type: 'attack',
		energy: 1,
		damage: 7,
		target: 'enemy',
		powers: {
			weak: 1,
		},
		description: 'Deal 7 Damage. Apply 1 Weak.',
		image: 'manicule.jpg',
		upgrade() {
			this.damage = 8
			this.upgraded = true
			this.name = 'Sucker Punch+'
			this.powers.weak = 2
			this.description = 'Deal 8 Damage. Apply 2 Weak'
		},
	},
	{
		name: 'Thunderclap',
		type: 'attack',
		energy: 1,
		damage: 4,
		target: 'allEnemies',
		powers: {
			vulnerable: 1,
		},
		description: 'Deal 4 Damage. Apply 1 Vulnerable to all enemies.',
		image: '4.jpg',
		upgrade() {
			this.name = 'Thunderclap+'
			this.damage = 6
			this.description = 'Deal 6 Damage. Apply 1 Vulnerable to all enemies.'
		},
	},
	{
		name: 'Flourish',
		type: 'skill',
		energy: 2,
		target: 'player',
		description: 'Gain 5 Regen. Can only be played if your health is below 50%.',
		image: '5.jpg',
		powers: {
			regen: 5,
		},
		conditions: [
			{
				type: 'healthPercentageBelow',
				percentage: 50,
			},
		],
		upgrade() {
			this.name = 'Flourish+'
			const a = this.conditions.find((action) => action.type === 'healthPercentageBelow')
			a.percentage = 75
			this.description = 'Gain 5 Regen. Can only be played if your health is below 75%.'
		},
	},
	{
		name: 'Summer of Sam',
		type: 'skill',
		energy: 1,
		target: 'player',
		description: 'Gain 1 Health. Draw 2 Cards if your health is below 50%.',
		image: 'bare-feet-of-god.jpg',
		actions: [
			{
				type: 'addHealth',
				parameter: {
					amount: 1,
				},
			},
			{
				type: 'drawCards',
				parameter: {
					amount: 2,
				},
				conditions: [
					{
						type: 'healthPercentageBelow',
						percentage: 50,
					},
				],
			},
		],
		upgrade() {
			this.name = 'Summer of Sam+'
			this.description = 'Gain 2 Health. Draw 2 Cards if your health is below 50%.'
			// An example of how to upgrade a local action.
			const a = this.actions.find((action) => action.type === 'addHealth')
			a.parameter.amount = 2
		},
	},
	{
		name: 'Body Slam',
		energy: 1,
		type: 'attack',
		target: 'enemy',
		description: 'Deal Damage equal to your Block.',
		image: 'fallback.jpg',
		actions: [
			{
				type: 'dealDamageEqualToBlock',
			},
		],
		upgrade() {
			this.energy = 0
			this.name = 'Body Slam+'
		},
	},
	{
		name: 'Succube',
		type: 'attack',
		energy: 3,
		target: 'allEnemies',
		description: 'Deal 2 Damage to all enemies and suck it into life.',
		image: 'succube.png',
		damage: 2,
		actions: [
			{
				type: 'addRegenEqualToAllDamage',
			},
		],
		upgrade() {
			this.name = 'High Succube'
			this.description = 'Deal 3 damage to all enemies and suck it into life.'
			this.damage = 3
		},
	},
	{
		name: 'Soul Drain',
		type: 'attack',
		energy: 1,
		target: 'allEnemies',
		description: 'Drain 3 Health into Weakness and Vulnerability.',
		image: 'soul-drain.png',
		damage: 0,
		powers: {
			weak: 3,
			vulnerable: 3,
		},
		actions: [
			{
				type: 'removeHealth',
				parameter: {
					amount: 3,
					target: 'player',
				},
			},
		],
		upgrade() {
			this.name = 'Lower Soul Drain'
			this.description = 'Drain 4 Health into Weakness and Vulnerability.'
			this.powers.vulnerable = 4
			this.powers.weak = 4
			this.actions = [
				{
					type: 'removeHealth',
					parameter: {
						amount: 4,
						target: 'player',
					},
				},
			]
		},
	},
	{
		name: 'Voodoo Education',
		energy: 0,
		type: 'attack',
		target: 'enemy',
		description: "Deal Damage equal to target's Vulnerable and Weak and remove the debuffs.",
		image: 'voodoo-education.png',
		actions: [
			{
				type: 'dealDamageEqualToWeak',
			},
			{
				type: 'dealDamageEqualToVulnerable',
			},
			{
				type: 'setPower',
				parameter: {
					power: 'weak',
					amount: 0,
				},
			},
			{
				type: 'setPower',
				parameter: {
					power: 'vulnerable',
					amount: 0,
				},
			},
		],
		upgrade() {
			this.name = 'Voodoo Gift'
			// remove the "reset of monster power"
			this.description = this.description + ' but without resets.'
			this.actions = [
				{
					type: 'dealDamageEqualToWeak',
				},
				{
					type: 'dealDamageEqualToVulnerable',
				},
			]
		},
	},
	{
		name: 'Ritual Rain',
		type: 'skill',
		energy: 2,
		target: 'player',
		description: 'Remove your Weaknesses and Vulnerabilities.',
		image: 'ritual-rain.png',
		damage: 0,
		actions: [
			{
				type: 'removePlayerDebuffs',
			},
		],
		upgrade() {
			this.name = 'Eventual Rain'
			this.description = 'Remove your weaknesses and vulnerabilities. Gain 10 Block.'
			this.block = 10
		},
	},
	{
		name: 'Mask of the Faceless',
		type: 'skill',
		energy: 0,
		target: 'player',
		description: 'Gain 1 energy point',
		image: 'mask-of-the-faceless.png',
		damage: 0,
		actions: [
			{
				type: 'addEnergyToPlayer',
			},
		],
		upgrade() {
			this.description = 'Gain 1 energy point and 5 block'
			this.name = 'Masks of the Faceless'
			this.block = 5
		},
	},
	// {name: 'Flex', energy: 0, type: 'skill', description: 'Gain 2 Strength.'},
]

// 'codices.jpg'
// 'alice-holds-the-white-king.jpg'
// '3.jpg'
// 'poured-millions-of-bubbles.jpg'
// 'railway-trains-in-space.jpg'
// 2.jpg
// 4.jpg
// 5.jpg
// 6.jpg
// 8.jpg
// serpentine-dancer
