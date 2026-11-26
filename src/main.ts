import "./style.css";
import { COUNTERS } from "./data/counters";
import { HEROES, HERO_IDS, type HeroId } from "./data/heroes";
import { ITEMS } from "./data/items";
import { recommend, type BuildType, type MatchSelection } from "./domain/recommend";

const MAX_ENEMIES = 6;
const TOP_N = 6;

interface State extends MatchSelection<HeroId> {
  showAll: boolean;
}

const initialState = (): State => ({
  enemies: [],
  threats: [],
  buildType: undefined,
  showAll: false,
});

let state = initialState();

function update(next: Partial<State>) {
  state = { ...state, ...next };
  render();
}

const without = (list: readonly HeroId[], hero: HeroId) => list.filter((other) => other !== hero);

function toggleEnemy(hero: HeroId) {
  if (state.enemies.includes(hero)) {
    // Removing an Enemy also drops their Threat mark.
    update({ enemies: without(state.enemies, hero), threats: without(state.threats, hero) });
  } else if (state.enemies.length < MAX_ENEMIES) {
    update({ enemies: [...state.enemies, hero] });
  }
}

function toggleThreat(hero: HeroId) {
  update({
    threats: state.threats.includes(hero)
      ? without(state.threats, hero)
      : [...state.threats, hero],
  });
}

// Tiny DOM helper: h("div", { class: "x" }, child, "text")
function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: Record<string, string | boolean | EventListener> = {},
  ...children: (Node | string | null | false)[]
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (typeof value === "function") el.addEventListener(key, value);
    else if (value === true) el.setAttribute(key, "");
    else if (value !== false) el.setAttribute(key, value);
  }
  for (const child of children) if (child) el.append(child);
  return el;
}

function buildTypeSection() {
  const option = (value: BuildType, label: string) =>
    h(
      "button",
      {
        class: `chip build-${value}`,
        "aria-pressed": String(state.buildType === value),
        click: () => update({ buildType: state.buildType === value ? undefined : value }),
      },
      label,
    );
  return h(
    "section",
    {},
    h("h2", {}, "Build Type"),
    h("div", { class: "row" }, option("weapon", "Weapon"), option("spirit", "Spirit")),
    h("p", { class: "hint" }, "Optional. Tap again to unset."),
  );
}

function enemiesSection() {
  const selected = h(
    "div",
    { class: "row" },
    ...state.enemies.map((hero) => {
      const isThreat = state.threats.includes(hero);
      return h(
        "span",
        { class: `enemy${isThreat ? " threat" : ""}` },
        h(
          "button",
          {
            class: "star",
            "aria-pressed": String(isThreat),
            "aria-label": `Mark ${HEROES[hero]} as Threat`,
            click: () => toggleThreat(hero),
          },
          isThreat ? "★" : "☆",
        ),
        HEROES[hero],
        h(
          "button",
          {
            class: "remove",
            "aria-label": `Remove ${HEROES[hero]}`,
            click: () => toggleEnemy(hero),
          },
          "×",
        ),
      );
    }),
  );

  const full = state.enemies.length >= MAX_ENEMIES;
  const grid = h(
    "div",
    { class: "grid" },
    ...HERO_IDS.map((hero) => {
      const isEnemy = state.enemies.includes(hero);
      return h(
        "button",
        {
          class: "hero",
          "aria-pressed": String(isEnemy),
          disabled: full && !isEnemy,
          click: () => toggleEnemy(hero),
        },
        HEROES[hero],
      );
    }),
  );

  return h(
    "section",
    {},
    h("h2", {}, `Enemies (${state.enemies.length}/${MAX_ENEMIES})`),
    state.enemies.length > 0 && selected,
    state.enemies.length > 0 && h("p", { class: "hint" }, "★ marks a Threat — their Counters count double."),
    grid,
  );
}

function recommendationsSection() {
  const { recommendations, enemiesWithoutCounters } = recommend(
    state,
    { items: ITEMS, counters: COUNTERS },
  );
  const shown = state.showAll ? recommendations : recommendations.slice(0, TOP_N);

  const list = h(
    "ol",
    { class: "recs" },
    ...shown.map((rec) =>
      h(
        "li",
        { class: `rec cat-${rec.details.category}` },
        h(
          "div",
          { class: "rec-head" },
          h("strong", {}, rec.details.name),
          h("span", { class: "tier" }, `${rec.details.tier}`),
        ),
        h(
          "ul",
          { class: "reasons" },
          ...rec.counters.map((counter) =>
            h(
              "li",
              {},
              h("span", { class: "vs" }, `vs ${HEROES[counter.enemy]}${counter.isThreat ? " ★" : ""}: `),
              counter.reason,
            ),
          ),
        ),
      ),
    ),
  );

  return h(
    "section",
    {},
    h("h2", {}, "Recommendations"),
    state.enemies.length === 0 && h("p", { class: "hint" }, "Pick the enemy heroes to get suggestions."),
    enemiesWithoutCounters.length > 0 &&
      h(
        "p",
        { class: "missing" },
        `No counters written yet for: ${enemiesWithoutCounters.map((enemy) => HEROES[enemy]).join(", ")}`,
      ),
    list,
    recommendations.length > TOP_N &&
      h(
        "button",
        { class: "chip", click: () => update({ showAll: !state.showAll }) },
        state.showAll ? `Show top ${TOP_N}` : `Show all (${recommendations.length})`,
      ),
  );
}

function render() {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  app.replaceChildren(
    h(
      "header",
      {},
      h("h1", {}, "Deadlock Counter Helper"),
      h("button", { class: "reset", click: () => update(initialState()) }, "Reset"),
    ),
    buildTypeSection(),
    enemiesSection(),
    recommendationsSection(),
  );
}

render();
