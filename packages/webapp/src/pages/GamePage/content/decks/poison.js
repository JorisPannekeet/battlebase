export const poison = [
  {
    name: "Poison dart",
    type: "attack",
    energy: 1,
    target: "enemy",
    damage: 3,
    description: "Deal 3 Damage and apply 1 Poison.",
    image: "PoisonDart.png",
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
    damage: 6,
    description:
      "Deal 6 damage and 3 Poison to all enemies but you get 1 poison.",
    image: "PoisonMist.png",
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
      this.damage = 9;
      this.upgraded = true;
      this.name = "Poison mist+";
      this.powers.poison = 4;
      this.description =
        "Deal 9 damage and 4 Poison to all enemies but you get 1 poison.";
    },
  },
  {
    name: "Antidote",
    type: "skill",
    energy: 1,
    target: "player",
    description: "Remove your Poison stacks.",
    image: "Antidote.png",
    powers: {
      poison: 0,
    },
    actions: [
      {
        type: "removePlayerPoison",
      },
    ],
    upgrade() {
      this.name = "Antidote+";
      this.description = "Remove your Poison stacks. Gain 10 Block.";
      this.block = 10;
    },
  },
  {
    name: "Afterburner",
    type: "attack",
    energy: 2,
    target: "enemy",
    description: "Deal 1 damage for every poison stack",
    image: "Afterburner.png",
    actions: [
      {
        type: "dealDamageEqualToPoison",
      },
    ],
    upgrade() {
      this.upgraded = true;
      this.name = "Afterburner+";
      this.description =
        "Deal 1 damage for every poison stack and gain 10 block";
      this.block = 10;
    },
  },
  {
    name: "Radiation blast",
    type: "attack",
    energy: 2,
    target: "enemy",
    description: "Double the poison stacks of an enemy",
    image: "",
    actions: [
      {
        type: "multiplyPoisonStack",
        parameter: {
          multiplier: 2,
        },
      },
    ],
    upgrade() {
      this.upgraded = true;
      this.name = "Radiation blast+";
      this.description = "Triple the poison stacks of an enemy";
      this.actions = [
        {
          type: "multiplyPoisonStack",
          parameter: {
            multiplier: 3,
          },
        },
      ];
    },
  },
  {
    name: "Toxic grenade",
    type: "attack",
    energy: 1,
    target: "enemy",
    description: "Apply 1 poison, 1 vulnerable and 1 weak",
    image: "ToxicGrenade.png",
    powers: {
      weak: 1,
      vulnerable: 1,
      poison: 1,
    },
    upgrade() {
      this.upgraded = true;
      this.name = "Toxic grenade+";
      this.description = "Apply 2 poison, 2 vulnerable and 2 weak";
      this.powers = {
        weak: 2,
        vulnerable: 2,
        poison: 2,
      };
    },
  },
  {
    name: "Steroid syringe",
    type: "skill",
    energy: 1,
    target: "player",
    description: "Your next attack deals 5 extra damage",
    image: "SteroidSyringe.png",
    powers: {
      boost: 5,
    },
    upgrade() {
      this.upgraded = true;
      this.name = "Steroid syringe+";
      this.description = "Your next attack deals 8 extra damage";
      this.powers = {
        boost: 8,
      };
    },
  },
  {
    name: "Poison blade",
    type: "attack",
    energy: 3,
    target: "enemy",
    description: "Deal 10 damage and apply 2 poison",
    image: "PoisonBlade.png",
    damage: 10,
    powers: {
      poison: 2,
    },
    upgrade() {
      this.upgraded = true;
      this.name = "Poison blade+";
      this.description = "Deal 12 damage and apply 3 poison";
      this.damage = 12;
      this.powers = {
        poison: 3,
      };
    },
  },
  {
    name: "Ritual Rain",
    type: "skill",
    energy: 2,
    target: "player",
    description: "Remove your Weaknesses and Vulnerabilities.",
    image: "ritualRain.png",
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
    image: "MaskOfTheFaceless.png",
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
    image: "Flourish.png",
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
  {
    name: "Defend",
    type: "skill",
    energy: 1,
    block: 5,
    target: "player",
    image: "Defend.png",
    description: "Gain 5 Block.",
    upgrade() {
      this.block = 8;
      this.upgraded = true;
      this.name = "Defend+";
      this.description = "Gain 8 Block.";
    },
  },
];
