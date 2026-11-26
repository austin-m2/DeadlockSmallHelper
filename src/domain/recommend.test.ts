import { describe, expect, it } from "vitest";
import { recommend, type GameData } from "./recommend";

const data: GameData<string, string> = {
  items: {
    "metal-skin": { name: "Metal Skin", category: "vitality", tier: 3200 },
    "spirit-armor": { name: "Spirit Armor", category: "vitality", tier: 1600 },
    "cheap-gun": { name: "Cheap Gun", category: "weapon", tier: 800 },
    "pricey-gun": { name: "Pricey Gun", category: "weapon", tier: 3200 },
    "cheap-spirit": { name: "Cheap Spirit", category: "spirit", tier: 800 },
    "pricey-spirit": { name: "Pricey Spirit", category: "spirit", tier: 3200 },
  },
  counters: {},
};

const itemsOf = (result: ReturnType<typeof recommend>) =>
  result.recommendations.map((r) => r.item);

describe("recommend", () => {
  it("recommends an Enemy's Counter with its reason", () => {
    const result = recommend(
      { enemies: ["haze"], threats: [] },
      {
        ...data,
        counters: {
          haze: [{ item: "metal-skin", reason: "Blocks Bullet Dance" }],
        },
      },
    );

    expect(result.recommendations).toEqual([
      {
        item: "metal-skin",
        details: { name: "Metal Skin", category: "vitality", tier: 3200 },
        counters: [{ enemy: "haze", reason: "Blocks Bullet Dance", isThreat: false }],
      },
    ]);
  });

  it("merges Counters for the same item and ranks items countering more Enemies higher", () => {
    const result = recommend(
      { enemies: ["haze", "seven", "infernus"], threats: [] },
      {
        ...data,
        counters: {
          haze: [{ item: "cheap-gun", reason: "Outtrades her" }],
          seven: [{ item: "spirit-armor", reason: "Shrugs off Storm Cloud" }],
          infernus: [{ item: "spirit-armor", reason: "Reduces burn damage" }],
        },
      },
    );

    expect(itemsOf(result)).toEqual(["spirit-armor", "cheap-gun"]);
    expect(result.recommendations[0]?.counters).toEqual([
      { enemy: "seven", reason: "Shrugs off Storm Cloud", isThreat: false },
      { enemy: "infernus", reason: "Reduces burn damage", isThreat: false },
    ]);
  });

  it("weighs a Threat's Counter as much as two ordinary Counters", () => {
    const result = recommend(
      { enemies: ["haze", "seven", "infernus"], threats: ["haze"] },
      {
        ...data,
        counters: {
          // Threat alone (score 2) beats one ordinary Counter (score 1)...
          haze: [{ item: "metal-skin", reason: "Blocks Bullet Dance" }],
          seven: [{ item: "cheap-gun", reason: "Bursts him" }],
          // ...and ties with two ordinary Counters, so the cheaper item wins.
          infernus: [
            { item: "spirit-armor", reason: "Reduces burn damage" },
            { item: "cheap-gun", reason: "Bursts him" },
          ],
        },
      },
    );

    expect(itemsOf(result)).toEqual(["cheap-gun", "metal-skin", "spirit-armor"]);
    expect(result.recommendations[1]?.counters).toEqual([
      { enemy: "haze", reason: "Blocks Bullet Dance", isThreat: true },
    ]);
  });

  it("ignores Threats that are not among the selected Enemies", () => {
    const result = recommend(
      { enemies: ["seven"], threats: ["haze"] },
      {
        ...data,
        counters: {
          haze: [{ item: "metal-skin", reason: "Blocks Bullet Dance" }],
          seven: [{ item: "spirit-armor", reason: "Shrugs off Storm Cloud" }],
        },
      },
    );

    expect(itemsOf(result)).toEqual(["spirit-armor"]);
  });

  it("reports selected Enemies that have no Counters written yet", () => {
    const result = recommend(
      { enemies: ["haze", "seven", "infernus"], threats: [] },
      {
        ...data,
        counters: {
          haze: [{ item: "metal-skin", reason: "Blocks Bullet Dance" }],
          seven: [],
        },
      },
    );

    expect(result.enemiesWithoutCounters).toEqual(["seven", "infernus"]);
  });

  describe("Build Type", () => {
    const counters = {
      haze: [
        { item: "pricey-spirit", reason: "a" },
        { item: "pricey-gun", reason: "b" },
        { item: "cheap-gun", reason: "c" },
      ],
      seven: [{ item: "cheap-gun", reason: "d" }],
      infernus: [{ item: "spirit-armor", reason: "e" }],
    };
    const enemies = ["haze", "seven", "infernus"];

    it("ranks matching-category items above equally-countered cheaper ones, but not above items countering more Enemies", () => {
      const result = recommend(
        { enemies, threats: [], buildType: "spirit" },
        { ...data, counters },
      );

      // cheap-gun: 2 Counters. pricey-spirit: 1 × 1.5. spirit-armor (1600) beats pricey-gun (3200) on tier.
      expect(itemsOf(result)).toEqual(["cheap-gun", "pricey-spirit", "spirit-armor", "pricey-gun"]);
    });

    it("orders purely by Counters and tier when Build Type is unset", () => {
      const result = recommend({ enemies, threats: [] }, { ...data, counters });

      expect(itemsOf(result)).toEqual(["cheap-gun", "spirit-armor", "pricey-spirit", "pricey-gun"]);
    });

    it("boosts a Threat's Counter on top of its double weight for a Weapon build", () => {
      const result = recommend(
        { enemies: ["haze", "seven", "infernus"], threats: ["haze"], buildType: "weapon" },
        {
          ...data,
          counters: {
            haze: [{ item: "pricey-gun", reason: "a" }],
            seven: [
              { item: "cheap-spirit", reason: "b" },
              { item: "metal-skin", reason: "c" },
            ],
            infernus: [{ item: "cheap-spirit", reason: "d" }],
          },
        },
      );

      // pricey-gun: 2 (Threat) × 1.5 = 3, beating cheap-spirit's 2 despite costing more.
      // metal-skin is Vitality, so stays at 1.
      expect(itemsOf(result)).toEqual(["pricey-gun", "cheap-spirit", "metal-skin"]);
    });
  });
});
