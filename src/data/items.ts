import type { Item } from "../domain/recommend";

// Only items the Counter List references need to be here. When a patch moves an
// item to another tier or category, fix it here.
export const ITEMS = {
  // Weapon
  "monster-rounds": { name: "Monster Rounds", category: "weapon", tier: 800 },
  fleetfoot: { name: "Fleetfoot", category: "weapon", tier: 1600 },
  "weakening-headshot": { name: "Weakening Headshot", category: "weapon", tier: 1600 },
  "toxic-bullets": { name: "Toxic Bullets", category: "weapon", tier: 3200 },
  "crippling-headshot": { name: "Crippling Headshot", category: "weapon", tier: 6400 },
  ricochet: { name: "Ricochet", category: "weapon", tier: 6400 },

  // Spirit
  "cold-front": { name: "Cold Front", category: "spirit", tier: 1600 },
  "mystic-vulnerability": { name: "Mystic Vulnerability", category: "spirit", tier: 1600 },
  "slowing-hex": { name: "Slowing Hex", category: "spirit", tier: 1600 },
  suppressor: { name: "Suppressor", category: "spirit", tier: 1600 },
  decay: { name: "Decay", category: "spirit", tier: 3200 },
  "disarming-hex": { name: "Disarming Hex", category: "spirit", tier: 3200 },
  knockdown: { name: "Knockdown", category: "spirit", tier: 3200 },
  "silence-wave": { name: "Silence Wave", category: "spirit", tier: 3200 },
  tankbuster: { name: "Tankbuster", category: "spirit", tier: 3200 },
  "ethereal-shift": { name: "Ethereal Shift", category: "spirit", tier: 6400 },

  // Vitality
  "extra-stamina": { name: "Extra Stamina", category: "vitality", tier: 800 },
  rebuttal: { name: "Rebuttal", category: "vitality", tier: 800 },
  "debuff-reducer": { name: "Debuff Reducer", category: "vitality", tier: 1600 },
  "enduring-speed": { name: "Enduring Speed", category: "vitality", tier: 1600 },
  healbane: { name: "Healbane", category: "vitality", tier: 1600 },
  "reactive-barrier": { name: "Reactive Barrier", category: "vitality", tier: 1600 },
  "spirit-shielding": { name: "Spirit Shielding", category: "vitality", tier: 1600 },
  counterspell: { name: "Counterspell", category: "vitality", tier: 3200 },
  "dispel-magic": { name: "Dispel Magic", category: "vitality", tier: 3200 },
  "metal-skin": { name: "Metal Skin", category: "vitality", tier: 3200 },
  "spirit-resilience": { name: "Spirit Resilience", category: "vitality", tier: 3200 },
  "stamina-mastery": { name: "Stamina Mastery", category: "vitality", tier: 3200 },
  "warp-stone": { name: "Warp Stone", category: "vitality", tier: 3200 },
  "divine-barrier": { name: "Divine Barrier", category: "vitality", tier: 6400 },
  indomitable: { name: "Indomitable", category: "vitality", tier: 6400 },
  juggernaut: { name: "Juggernaut", category: "vitality", tier: 6400 },
  "phantom-strike": { name: "Phantom Strike", category: "vitality", tier: 6400 },
  "siphon-bullets": { name: "Siphon Bullets", category: "vitality", tier: 6400 },
  spellbreaker: { name: "Spellbreaker", category: "vitality", tier: 6400 },
  unstoppable: { name: "Unstoppable", category: "vitality", tier: 6400 },
} as const satisfies Record<string, Item>;

export type ItemId = keyof typeof ITEMS;
