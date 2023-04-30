const relics = [
  {
    address: "0xfe86f18373f116a1a4db56a0bde6ac638f36251b", // ice cream society
    matchingData: "Ice Cream Society",
    type: "battleStart",
    relicDescription: "Add 10 block at the start of each encounter",
    action: "addBlock",
    value: 10,
    id: 835,
  },
  {
    address: "0x76dea21c8ddf828e5ca1dd20a61dbd4a763ed28a", // Power 2 the apes
    type: "battleStart",
    matchingData: "Power 2 The Apes!",
    relicDescription:
      "Your first attack deals 8 additional damage each encounter",
    action: "addAttack",
    value: 8,
    id: 749,
  },
  {
    address: "0x1d006a27bd82e10f9194d30158d91201e9930420", // Metaboy
    matchingData: "MetaBoy",
    type: "battleStart",
    relicDescription: "Draw 2 additional cards at the start of each encounter",
    action: "addCard",
    value: 2,
    id: 2040,
  },
  {
    address: "0x76dea21c8ddf828e5ca1dd20a61dbd4a763ed28a", // Story cards
    matchingData: "SC:",
    type: "battleStart",
    relicDescription:
      "Apply 1 vulnerable to all enemies at the start of each encounter",
    action: "addVulnerable",
    value: 1,
    id: 838,
  },
  {
    address: "0xfe86f18373f116a1a4db56a0bde6ac638f36251b", // SERA
    matchingData: "Sera the",
    type: "battleStart",
    relicDescription: "Gain 1 extra energy the first turn of each encounter",
    action: "addEnergy",
    value: 1,
    id: 1991,
  },
  {
    address: "0xfe86f18373f116a1a4db56a0bde6ac638f36251b", // Food society
    matchingData: "Food Society",
    type: "battleStart",
    relicDescription: "Heal 2 HP at the start of each encounter",
    action: "addHealth",
    value: 2,
    id: 2509,
  },
  {
    address: "0xf232a9bf3839385311afd7835bac68166120e26b", // Ghostd
    matchingData: "Ghostd",
    type: "death",
    relicDescription: "When you die recover 30% HP, works only once", // TODO: make this.
    action: "addHealthPercentage",
    value: 0.3,
    id: 2509,
  },
  {
    address: "free", // FREE
    matchingData: "Sacred frog",
    type: "enemyDmgCalc",
    relicDescription: "Have a 10% chance to dodge enemy attacks each turn",
    action: "addDodge%",
    value: 1,
    id: null,
  },
  {
    address: "free", // FREE
    matchingData: "Good luck cat",
    type: "start",
    relicDescription: "Increase your max HP by 8",
    action: "addMaxHealth",
    value: 8,
    id: null,
  },
  {
    address: "free", // FREE
    matchingData: "Rotting fish",
    type: "battleStart",
    relicDescription: "Apply 1 poison to all enemies each encounter.",
    action: "addPoison",
    value: 1,
    id: null,
  },
  {
    address: "free", // FREE
    matchingData: "Pocket money",
    type: "start",
    relicDescription: "Gain 10 gold instantly.",
    action: "addGold",
    value: 10,
    id: null,
  },
];
export default relics;
