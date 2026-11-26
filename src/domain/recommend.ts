export type ItemCategory = "weapon" | "vitality" | "spirit";
export type ItemTier = 800 | 1600 | 3200 | 6400;
export type BuildType = Exclude<ItemCategory, "vitality">;

export interface Item {
  name: string;
  category: ItemCategory;
  tier: ItemTier;
}

export interface Counter<I extends string> {
  item: I;
  reason: string;
}

export type CounterList<H extends string, I extends string> = Partial<
  Record<H, readonly Counter<I>[]>
>;

export interface GameData<H extends string, I extends string> {
  items: Record<I, Item>;
  counters: CounterList<H, I>;
}

export interface MatchSelection<H extends string> {
  enemies: readonly H[];
  threats: readonly H[];
  buildType?: BuildType;
}

export interface ContributingCounter<H extends string> {
  enemy: H;
  reason: string;
  isThreat: boolean;
}

export interface Recommendation<H extends string, I extends string> {
  item: I;
  details: Item;
  counters: ContributingCounter<H>[];
}

export function recommend<H extends string, I extends string>(
  selection: MatchSelection<H>,
  data: GameData<H, I>,
): { recommendations: Recommendation<H, I>[]; enemiesWithoutCounters: H[] } {
  const byItem = new Map<I, Recommendation<H, I>>();
  const enemiesWithoutCounters: H[] = [];
  for (const enemy of selection.enemies) {
    const counters = data.counters[enemy] ?? [];
    if (counters.length === 0) enemiesWithoutCounters.push(enemy);
    for (const counter of counters) {
      let rec = byItem.get(counter.item);
      if (!rec) {
        rec = { item: counter.item, details: data.items[counter.item], counters: [] };
        byItem.set(counter.item, rec);
      }
      rec.counters.push({
        enemy,
        reason: counter.reason,
        isThreat: selection.threats.includes(enemy),
      });
    }
  }
  const scoreOf = (rec: Recommendation<H, I>) => score(rec, selection.buildType);
  // Stable sort: items still tied after tier keep first-seen order (Enemy selection order, then each Enemy's Counter order).
  const recommendations = [...byItem.values()].sort(
    (a, b) => scoreOf(b) - scoreOf(a) || a.details.tier - b.details.tier,
  );
  return { recommendations, enemiesWithoutCounters };
}

const THREAT_WEIGHT = 2;
const BUILD_TYPE_MULTIPLIER = 1.5;

function score<H extends string, I extends string>(
  rec: Recommendation<H, I>,
  buildType: BuildType | undefined,
): number {
  const base = rec.counters.reduce((sum, c) => sum + (c.isThreat ? THREAT_WEIGHT : 1), 0);
  // Vitality is never a Build Type, so Vitality items are never boosted.
  return rec.details.category === buildType ? base * BUILD_TYPE_MULTIPLIER : base;
}
