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
    address: "0xfe86f18373f116a1a4db56a0bde6ac638f36251b", // Ice team delta
    matchingData: ["Sergeant", "Major", "Private", "Captain"],
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
];
export default relics;
