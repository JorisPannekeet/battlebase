export const electric = [
  {
    name: "Electric shock",
    type: "attack",
    energy: 1,
    target: "enemy",
    damage: 4,
    description: "Deal 4 Damage and add 1 Discharge.",
    image: "ElectricShock.png",
    actions: [
      {
        type: "addPlayerCharge",
        parameter: {
          amount: 1,
        },
      },
    ],
    upgrade() {
      this.damage = 6;
      this.upgraded = true;
      this.name = "Electric shock+";
      this.description = "Deal 6 Damage and add 1 Discharge.";
    },
  },
  {
    name: "Power Surge",
    type: "attack",
    energy: 1,
    target: "enemy",
    description: "Deal damage equal to your Discharge.",
    image: "PowerSurge.png",
    actions: [
      {
        type: "dealDamageEqualToCharge",
        parameter: {
          multiplier: 0,
        },
      },
    ],
    upgrade() {
      this.upgraded = true;
      this.name = "Power Surge+";
      this.block = 10;
      this.description =
        "Deal damage equal to your Discharge. and gain 10 block.";
    },
  },
  {
    name: "Thunder",
    type: "attack",
    energy: 2,
    target: "allEnemies",
    description: "Deal 2 Damage x Discharge to all enemies.",
    image: "thunder.png",
    actions: [
      {
        type: "dealDamageEqualToCharge",
        parameter: {
          multiplier: 2,
          allTargets: true,
        },
      },
    ],
    upgrade() {
      this.upgraded = true;
      this.name = "Thunder+";
      this.description = "Deal 3 Damage x Discharge to all enemies.";
      this.actions = [
        {
          type: "dealDamageEqualToCharge",
          parameter: {
            multiplier: 3,
          },
        },
      ];
    },
  },
  {
    name: "Battery Pills",
    type: "skill",
    energy: 1,
    target: "player",
    description: "Add 4 Discharge.",
    image: "",
    actions: [
      {
        type: "addPlayerCharge",
        parameter: {
          amount: 4,
        },
      },
    ],
    upgrade() {
      this.upgraded = true;
      this.name = "Battery Pills+";
      this.description = "Add 6 Discharge";
      this.actions = [
        {
          type: "addPlayerCharge",
          parameter: {
            amount: 6,
          },
        },
      ];
    },
  },
  {
    name: "Positive Current",
    type: "skill",
    energy: 1,
    target: "player",
    description: "Transfer your discharge into health",
    image: "PositiveCurrent.png",
    actions: [
      {
        type: "transferDischargeToHealth",
      },
    ],
  },
  {
    name: "Heavenly Smite",
    type: "attack",
    energy: 3,
    target: "enemy",
    description: "Deal 10 Damage x Discharge.",
    image: "HeavenlySmite.png",
    actions: [
      {
        type: "dealDamageEqualToCharge",
        parameter: {
          multiplier: 10,
          allTargets: true,
        },
      },
    ],
    upgrade() {
      this.upgraded = true;
      this.name = "Heavenly Smite+";
      this.description = "Deal 15 Damage x Discharge.";
      this.actions = [
        {
          type: "dealDamageEqualToCharge",
          parameter: {
            multiplier: 15,
          },
        },
      ];
    },
  },
];
