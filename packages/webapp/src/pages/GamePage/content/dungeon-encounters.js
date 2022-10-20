import Dungeon from "../game/dungeon.js";
import { MonsterRoom, Monster } from "../game/dungeon-rooms.js";
import { random } from "../game/utils.js";

// Hello. With the imported functions above you can create a dungeon with different rooms and monsters.

// This is the dungeon currently used.
export const dungeonWithMap = (state) => {
  return Dungeon({}, state);
};

// This is the dungeon used in tests. Don't change it without running tests.
export const createTestDungeon = () => {
  const dungeon = Dungeon({ width: 1, height: 3 });
  // The tests rely on the first room having a single monster, second two monsters.
  const intents = [
    { block: 7 },
    { damage: 10 },
    { damage: 8 },
    {},
    { damage: 14 },
  ];
  dungeon.graph[1][0].room = MonsterRoom(Monster({ hp: 42, intents }));
  dungeon.graph[2][0].room = MonsterRoom(
    Monster({ hp: 24, intents }),
    Monster({ hp: 13, intents })
  );
  dungeon.graph[3][0].room = MonsterRoom(Monster({ hp: 42, intents }));
  return dungeon;
};
