import { MonsterRoom, Monster } from "../../game/dungeon-rooms.js";
import { random } from "../../game/utils.js";

export const easyMonsters = {};
export const monsters = {};
export const elites = {};
export const bosses = {};

easyMonsters["Easy does it"] = MonsterRoom(
  Monster({
    hp: random(8, 13),
    intents: [{ damage: 7 }, { damage: 11 }, { damage: 7 }, { block: 9 }],
    random: 2,
    name: "Sneaky Devil",
    image: "monsters/devil.gif",
  })
);
easyMonsters["Easy does it x2"] = MonsterRoom(
  Monster({
    hp: random(8, 13),
    intents: [{ damage: 7 }, { damage: 11 }, { damage: 7 }, { block: 9 }],
    random: 2,
    name: "Sneaky Devil",
    image: "monsters/devil.gif",
  }),
  Monster({
    hp: random(8, 13),
    intents: [{ damage: 6 }, { damage: 11 }, { damage: 5 }, { block: 5 }],
    random: 1,
    name: "Sneaky Devil",
    image: "monsters/devil.gif",
  })
);
monsters["RNG does it"] = MonsterRoom(
  Monster({
    hp: random(18, 20),
    intents: [{ damage: 7 }, { damage: 11 }, { damage: 7 }, { block: 9 }],
    random: 4,
    name: "Minor demon",
    image: "monsters/herbshrimp2.gif",
  })
);
monsters["Easy one"] = MonsterRoom(
  Monster({
    hp: random(33, 37),
    intents: [
      { vulnerable: 1 },
      { damage: 10 },
      { damage: 6 },
      {},
      { weak: 1 },
    ],
    random: 2,
    name: "Sneaky Devil",
    image: "monsters/devil.gif",
  })
);
monsters["First double trouble"] = MonsterRoom(
  Monster({
    hp: random(13, 17),
    intents: [
      { damage: 7 },
      { block: 4, damage: 8 },
      { damage: 6 },
      {},
      { block: 6 },
    ],
    random: 2,
    name: "Sneaky Devil",
    image: "monsters/devil.gif",
  }),
  Monster({
    hp: 29,
    intents: [{ damage: 9 }, { damage: 8 }, { weak: 1 }, { damage: 6 }, {}],
    random: 2,
    name: "Herbshrimp",
    image: "monsters/herbshrimp2.gif",
  })
);
monsters["Mid sized duo"] = MonsterRoom(
  Monster({
    hp: random(28, 32),
    intents: [{ weak: 1 }, { damage: 9 }, { damage: 6 }, {}, { weak: 1 }],
    random: 2,
    name: "Herbshrimp",
    image: "monsters/herbshrimp2.gif",
  }),
  Monster({
    hp: random(50, 54),
    intents: [{ vulnerable: 1 }, { damage: 6 }, { damage: 9 }, { block: 10 }],
    random: 2,
    name: "Herbshrimp",
    image: "monsters/herbshrimp2.gif",
  })
);
monsters["Tiny duo"] = MonsterRoom(
  Monster({
    hp: random(12, 15),
    random: 2,
    intents: [{ damage: 6 }],
    name: "Herbshrimp",
    image: "monsters/herbshrimp2.gif",
  }),
  Monster({
    hp: random(12, 15),
    random: 2,
    intents: [{ damage: 6 }],
    name: "Herbshrimp",
    image: "monsters/herbshrimp2.gif",
  })
);
elites["monster7"] = MonsterRoom(
  Monster({
    hp: 46,
    intents: [
      { damage: 12 },
      { block: 6, damage: 11 },
      { block: 5, damage: 16 },
      {},
      { block: 6 },
    ],
    name: "Ghostd",
    image: "monsters/ghostd_gif.gif",
  })
);
monsters["monster10"] = MonsterRoom(
  Monster({
    hp: 28,
    intents: [{ weak: 1 }, { block: 10, damage: 10 }, { damage: 21 }],
    name: "Herbshrimp",
    image: "monsters/herbshrimp2.gif",
  })
);

elites["monster9"] = MonsterRoom(
  Monster({
    hp: 60,
    intents: [{ damage: 12 }, { damage: 11, weak: 1 }, { damage: 4, block: 6 }],
    random: 6,
    name: "Ghostd",
    image: "monsters/ghostd_gif.gif",
  })
);
elites["Tougher"] = MonsterRoom(
  Monster({
    hp: 70,
    block: 12,
    intents: [{ block: 5 }, { damage: 16 }],
    name: "Herbshrimp",
    image: "monsters/herbshrimp2.gif",
  })
);
elites["The Trio"] = MonsterRoom(
  Monster({
    hp: random(39, 46),
    intents: [{ weak: 1 }, { damage: 10 }],
    name: "Herbshrimp",
    image: "monsters/herbshrimp2.gif",
  }),
  Monster({
    hp: random(40, 60),
    intents: [{ damage: 12 }, { damage: 11, weak: 1 }, { damage: 4, block: 6 }],
    name: "Herbshrimp",
    image: "monsters/herbshrimp2.gif",
  })
);

bosses["Scale much?"] = MonsterRoom(
  Monster({
    hp: 200,
    intents: [
      { damage: 5 },
      { damage: 8 },
      { damage: 12 },
      { damage: 17 },
      { damage: 23 },
      { damage: 30 },
      { damage: 38 },
      { damage: 45 },
    ],
    name: "Beelzebub",
    image: "monsters/boss.gif",
  })
);
export const stage2Monsters = { easyMonsters, monsters, elites, bosses };
