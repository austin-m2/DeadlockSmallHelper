import type { Item } from "../domain/recommend";

// Only items the Counter List references need to be here. When a patch moves an
// item to another tier or category, fix it here.
export const ITEMS = {
  "metal-skin": { name: "Metal Skin", category: "vitality", tier: 3200 },
  "spirit-armor": { name: "Spirit Armor", category: "vitality", tier: 1600 },
} as const satisfies Record<string, Item>;

export type ItemId = keyof typeof ITEMS;
