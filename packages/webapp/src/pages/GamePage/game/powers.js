/**
 * The type of a power
 * @typedef POWER
 * @property {string} name
 * @property {string} description
 * @property {string} type
 * @property {string=} target
 * @property {Function=} use
 */

// Class representing a power.
class Power {
  /**
   * @param {POWER} power - The base power to create a class from
   */
  constructor(power) {
    const { name, description, type, target, use } = power;
    this.name = name;
    this.description = description;
    this.type = type;
    this.target = target;
    this.use = use;
  }
}

export const regen = new Power({
  type: "buff",
  name: "Regen",
  description: "Heals an amount of health points equal to Regen stacks",
  target: "player",
  use: (stacks) => stacks,
});

export const vulnerable = new Power({
  type: "debuff",
  name: "Vulnerable",
  description: "Takes 50% more damage while Vulnerable",
  use: (dmg) => Math.floor(dmg * 1.5),
});

export const weak = new Power({
  type: "debuff",
  name: "Weak",
  description: "Weakened targets deal 25% less damage",
  use: (dmg) => Math.floor(dmg * 0.75),
});

export const boost = new Power({
  type: "buff",
  name: "Boost",
  description: "Next attack deals additional damage",
  use: (stacks) => stacks,
});

export const poison = new Power({
  type: "debuff",
  name: "Poison",
  description: "Poison, deals 1 damage x stack",
  target: "monster",
  use: (dmg, stacks) => dmg + stacks,
});

export const charge = new Power({
  type: "buff",
  name: "Charge",
  description: "Can be discharged to boost certain cards",
  use: (stacks) => stacks,
});
export default { regen, vulnerable, weak, boost, poison, charge };
