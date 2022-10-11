// Here you'll find all the default cards used in the game.
// See game/cards.js for the details on how they work.
export const testDeck = [
  {
    name: "Strike",
    type: "attack",
    energy: 1,
    target: "enemy",
    damage: 6,
    description: "Deal 6 Damage.",
    image: "strike.png",
    upgrade() {
      this.damage = 9;
      this.upgraded = true;
      this.name = "Strike+";
      this.description = "Deal 9 Damage.";
    },
  },
  {
    name: "Defend",
    type: "skill",
    energy: 1,
    block: 5,
    target: "player",
    image: "defend.png",
    description: "Gain 5 Block.",
    upgrade() {
      this.block = 8;
      this.upgraded = true;
      this.name = "Defend+";
      this.description = "Gain 8 Block.";
    },
  },
  {
    name: "Clash",
    type: "attack",
    energy: 0,
    damage: 14,
    target: "enemy",
    conditions: [
      {
        type: "onlyType",
        cardType: "attack",
      },
    ],
    description:
      "Can only be played if every card in your hand is an Attack. Deal 14 damage.",
    image: "placeholder.png",
    upgrade() {
      this.name = "Clash+";
      this.damage = 17;
      this.description =
        "Can only be played if every card in your hand is an Attack. Deal 17 damage.";
    },
  },
  {
    name: "Cleave",
    type: "attack",
    energy: 1,
    damage: 8,
    target: "allEnemies",
    description: "Deal 8 damage to all enemies.",
    image: "placeholder.png",
    upgrade() {
      this.damage = 11;
      this.upgraded = true;
      this.name = "Cleave+";
      this.description = "Deal 11 Damage to all enemies.";
    },
  },
  {
    name: "Iron Wave",
    type: "attack",
    energy: 1,
    damage: 5,
    block: 5,
    target: "enemy",
    description: "Deal 5 damage. Gain 5 Block.",
    image: "placeholder.png",
    upgrade() {
      this.damage = 7;
      this.block = 7;
      this.upgraded = true;
      this.name = "Iron Wave+";
      this.description = "Deal 7 Damage. Gain 7 Block.";
    },
  },
  {
    name: "Sucker Punch",
    type: "attack",
    energy: 1,
    damage: 7,
    target: "enemy",
    powers: {
      weak: 1,
    },
    description: "Deal 7 Damage. Apply 1 Weak.",
    image: "placeholder.png",
    upgrade() {
      this.damage = 8;
      this.upgraded = true;
      this.name = "Sucker Punch+";
      this.powers.weak = 2;
      this.description = "Deal 8 Damage. Apply 2 Weak";
    },
  },
  {
    name: "Thunderclap",
    type: "attack",
    energy: 1,
    damage: 4,
    target: "allEnemies",
    powers: {
      vulnerable: 1,
    },
    description: "Deal 4 Damage. Apply 1 Vulnerable to all enemies.",
    image: "placeholder.png",
    upgrade() {
      this.name = "Thunderclap+";
      this.damage = 6;
      this.description = "Deal 6 Damage. Apply 1 Vulnerable to all enemies.";
    },
  },
];
