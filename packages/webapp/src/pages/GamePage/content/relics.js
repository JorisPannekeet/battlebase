const relics = [
  {
    address: "0xfe86f18373f116a1a4db56a0bde6ac638f36251b", // lvl5mage
    type: "battleStart",
    description: "Add 10 block at the start of each encounter",
    action: "addBlock",
    value: 10,
  },
  {
    address: "0x76dea21c8ddf828e5ca1dd20a61dbd4a763ed28a", // Power to the apes
    type: "battleStart",
    description: "Your first attack deals 8 additional damage each encounter",
    action: "addAttack",
    value: 8,
  },
];
export default relics;
