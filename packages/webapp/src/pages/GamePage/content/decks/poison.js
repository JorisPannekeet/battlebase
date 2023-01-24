// Here you'll find all the default cards used in the game.
// See game/cards.js for the details on how they work.
export const poison = [
  {
    name: "Poison dart",
    type: "attack",
    energy: 1,
    target: "enemy",
    damage: 3,
    description: "Deal 3 Damage and apply 1 Poison.",
    image: "strike.png",
    powers: {
      poison: 1,
    },
    upgrade() {
      this.damage = 6;
      this.upgraded = true;
      this.name = "Poison dart+";
      this.powers.poison = 1;
      this.description = "Deal 6 Damage and apply 1 poison.";
    },
  },
  {
    name: "Poison mist",
    type: "attack",
    energy: 2,
    target: "allEnemies",
    damage: 0,
    description: "Apply 3 Poison to all enemies and 1 to yourself.",
    image: "strike.png",
    powers: {
      poison: 3,
    },
    actions: [
      {
        type: "applyPlayerPoison",
        parameter: {
          amount: 1,
        },
      },
    ],
    upgrade() {
      this.damage = 0;
      this.upgraded = true;
      this.name = "Poison mist+";
      this.powers.poison = 4;
      this.description = "Apply 4 Poison to all enemies and 1 to yourself.";
    },
  },
  {
    name: "Ritual Rain",
    type: "skill",
    energy: 2,
    target: "player",
    description: "Remove your Weaknesses and Vulnerabilities.",
    image: "placeholder.png",
    damage: 0,
    actions: [
      {
        type: "removePlayerDebuffs",
      },
    ],
    upgrade() {
      this.name = "Eventual Rain";
      this.description =
        "Remove your weaknesses and vulnerabilities. Gain 10 Block.";
      this.block = 10;
    },
  },
  {
    name: "Mask of the Faceless",
    type: "skill",
    energy: 0,
    target: "player",
    description: "Gain 1 energy point",
    image: "placeholder.png",
    damage: 0,
    actions: [
      {
        type: "addEnergyToPlayer",
      },
    ],
    upgrade() {
      this.description = "Gain 1 energy point and 5 block";
      this.name = "Masks of the Faceless";
      this.block = 5;
    },
  },
  {
    name: "Flourish",
    type: "skill",
    energy: 2,
    target: "player",
    description:
      "Gain 5 Regen. Can only be played if your health is below 50%.",
    image: "placeholder.png",
    powers: {
      regen: 5,
    },
    conditions: [
      {
        type: "healthPercentageBelow",
        percentage: 50,
      },
    ],
    upgrade() {
      this.name = "Flourish+";
      const a = this.conditions.find(
        (action) => action.type === "healthPercentageBelow"
      );
      a.percentage = 75;
      this.description =
        "Gain 5 Regen. Can only be played if your health is below 75%.";
    },
  },
];
