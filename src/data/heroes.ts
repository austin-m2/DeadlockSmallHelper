// Every playable hero. Add new heroes here when they release; the key is what
// the Counter List uses.
export const HEROES = {
  abrams: "Abrams",
  bebop: "Bebop",
  billy: "Billy",
  calico: "Calico",
  doorman: "The Doorman",
  drifter: "Drifter",
  dynamo: "Dynamo",
  "grey-talon": "Grey Talon",
  haze: "Haze",
  holliday: "Holliday",
  infernus: "Infernus",
  ivy: "Ivy",
  kelvin: "Kelvin",
  "lady-geist": "Lady Geist",
  lash: "Lash",
  mcginnis: "McGinnis",
  mina: "Mina",
  mirage: "Mirage",
  "mo-and-krill": "Mo & Krill",
  paige: "Paige",
  paradox: "Paradox",
  pocket: "Pocket",
  seven: "Seven",
  shiv: "Shiv",
  sinclair: "Sinclair",
  victor: "Victor",
  vindicta: "Vindicta",
  viscous: "Viscous",
  vyper: "Vyper",
  warden: "Warden",
  wraith: "Wraith",
  yamato: "Yamato",
} as const satisfies Record<string, string>;

export type HeroId = keyof typeof HEROES;

export const HERO_IDS = (Object.keys(HEROES) as HeroId[]).sort((a, b) =>
  HEROES[a].localeCompare(HEROES[b]),
);
