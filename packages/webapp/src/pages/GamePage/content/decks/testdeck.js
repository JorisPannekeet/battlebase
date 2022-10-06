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
];
