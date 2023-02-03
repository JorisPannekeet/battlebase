export const electric = [
  {
    name: "Electric shock",
    type: "attack",
    energy: 1,
    target: "enemy",
    damage: 4,
    description: "Deal 4 Damage and add 1 Charge.",
    image: "",
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
      this.description = "Deal 6 Damage and add 1 Charge.";
    },
  },
  {
    name: "Black Lightning",
    type: "attack",
    energy: 1,
    target: "enemy",
    description: "Deal damage equal to your charge.",
    image: "",
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
      this.name = "Black Lightning+";
      this.block = 10;
      this.description = "Deal damage equal to your charge. and gain 10 block.";
    },
  },
  {
    name: "Thunder storm",
    type: "attack",
    energy: 2,
    target: "allEnemies",
    description: "Deal 2 Damage x Charge to all enemies.",
    image: "",
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
      this.name = "Thunder storm+";
      this.description = "Deal 3 Damage x Charge to all enemies.";
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
    description: "Add 4 charge.",
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
      this.description = "Add 6 charge";
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
];
