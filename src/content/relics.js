// Relics give the player a passive bonus, depending on their `type`:
// "start" triggers once when the relic is picked up,
// "battleStart" triggers at the start of each encounter,
// "death" triggers once when the player would die,
// "enemyDmgCalc" is checked during enemy damage calculation.
// `image` is a path relative to /images/.
const relics = [
  {
    name: "Tower shield",
    image: "block.png",
    type: "battleStart",
    relicDescription: "Add 10 block at the start of each encounter",
    action: "addBlock",
    value: 10,
  },
  {
    name: "Whetstone",
    image: "damage.png",
    type: "battleStart",
    relicDescription:
      "Your first attack deals 8 additional damage each encounter",
    action: "addAttack",
    value: 8,
  },
  {
    name: "Marked deck",
    image: "cards/placeholder.png",
    type: "battleStart",
    relicDescription: "Draw 2 additional cards at the start of each encounter",
    action: "addCard",
    value: 2,
  },
  {
    name: "Cracked mirror",
    image: "vulnerable.png",
    type: "battleStart",
    relicDescription:
      "Apply 1 vulnerable to all enemies at the start of each encounter",
    action: "addVulnerable",
    value: 1,
  },
  {
    name: "Mana crystal",
    image: "crystal.gif",
    type: "battleStart",
    relicDescription: "Gain 1 extra energy the first turn of each encounter",
    action: "addEnergy",
    value: 1,
  },
  {
    name: "Healing herbs",
    image: "potion-red.png",
    type: "battleStart",
    relicDescription: "Heal 2 HP at the start of each encounter",
    action: "addHealth",
    value: 2,
  },
  {
    name: "Phoenix feather",
    image: "potion-green.png",
    type: "death",
    relicDescription: "When you die recover 30% HP, works only once",
    action: "addHealthPercentage",
    value: 0.3,
  },
  {
    name: "Sacred frog",
    image: "relics/frog.png",
    type: "enemyDmgCalc",
    relicDescription: "Have a 10% chance to dodge enemy attacks each turn",
    action: "addDodge%",
    value: 1,
  },
  {
    name: "Good luck cat",
    image: "relics/cat.png",
    type: "start",
    relicDescription: "Increase your max HP by 8",
    action: "addMaxHealth",
    value: 8,
  },
  {
    name: "Rotting fish",
    image: "relics/rotting-fish.png",
    type: "battleStart",
    relicDescription: "Apply 1 poison to all enemies each encounter.",
    action: "addPoison",
    value: 1,
  },
  {
    name: "Pocket money",
    image: "relics/pouch.png",
    type: "start",
    relicDescription: "Gain 10 gold instantly.",
    action: "addGold",
    value: 10,
  },
];
export default relics;
