import type { CounterList } from "../domain/recommend";
import type { HeroId } from "./heroes";
import type { ItemId } from "./items";

// The Counter List: for each enemy hero, the items that answer them and why.
// Hero and item keys are type-checked; add an item to items.ts before using it.
export const COUNTERS: CounterList<HeroId, ItemId> = {
  haze: [
    { item: "metal-skin", reason: "Bullet immunity window shuts down Bullet Dance." },
  ],
  infernus: [
    { item: "spirit-armor", reason: "Cuts the spirit damage from his burns." },
  ],
  seven: [
    { item: "spirit-armor", reason: "Blunts Storm Cloud and Lightning Ball." },
  ],
};
