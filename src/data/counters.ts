import type { CounterList } from "../domain/recommend";
import type { HeroId } from "./heroes";
import type { ItemId } from "./items";

// The Counter List: for each enemy hero, the items that answer them and why.
// Hero and item keys are type-checked; add an item to items.ts before using it.
// Source: "One counterplay tip for every Deadlock hero" video transcript.
// Deadman Danny and Sinclair only have positioning tips (no item), so they have no Counters.
export const COUNTERS: CounterList<HeroId, ItemId> = {
  abrams: [
    { item: "healbane", reason: "Cuts his heavy self-healing." },
    { item: "counterspell", reason: "Shoulder Charge passes right through you." },
    { item: "warp-stone", reason: "Blink out of Shoulder Charge's path." },
    { item: "debuff-reducer", reason: "Shorter Shoulder Charge stun, so you recover in time to parry his heavy melee." },
  ],
  apollo: [
    { item: "slowing-hex", reason: "Shuts down three of his four abilities; only Riposte is left, so stop shooting him." },
  ],
  baba: [
    { item: "dispel-magic", reason: "Strips the spirit power she gains from Thread Sap." },
  ],
  bebop: [
    { item: "reactive-barrier", reason: "Barrier on Hook lets you tank the bomb." },
    { item: "indomitable", reason: "Prevents him from hooking you at all." },
  ],
  billy: [
    { item: "counterspell", reason: "Blocks the damage from his sticky Rising Ram / Bash Down combo." },
    { item: "warp-stone", reason: "Escape Rising Ram or warp out of the Bash Down combo." },
  ],
  calico: [
    { item: "spirit-shielding", reason: "Early spirit resist; most of her burst combo is spirit damage." },
    { item: "spirit-resilience", reason: "Later spirit resist so her burst can't execute you." },
    { item: "slowing-hex", reason: "Locks down her abilities." },
  ],
  celeste: [
    { item: "slowing-hex", reason: "CC her when she closes in; her kit needs to get up close." },
    { item: "knockdown", reason: "Stops her getting close, so Light Eater stops being a threat." },
  ],
  doorman: [
    { item: "counterspell", reason: "Block the kidnap combo, or the damage inside the Baroness if you can't escape." },
  ],
  drifter: [
    { item: "dispel-magic", reason: "Removes Stalker's Mark so he can't teleport to you." },
  ],
  dynamo: [
    { item: "slowing-hex", reason: "Disables Quantum Entanglement so your ult lands." },
    { item: "silence-wave", reason: "Disables Quantum Entanglement so your ult lands." },
  ],
  graves: [
    { item: "monster-rounds", reason: "Extra weapon damage to NPCs shreds her skulls and ghouls." },
    { item: "ricochet", reason: "On gun builds, her skulls stop being a problem." },
  ],
  "grey-talon": [
    { item: "counterspell", reason: "Blocks the bird; only pop it when impact is certain, since he'll try to bait it." },
  ],
  haze: [
    { item: "metal-skin", reason: "Bullet immunity lasts about as long as Bullet Dance; press it once she starts." },
  ],
  holliday: [
    { item: "debuff-reducer", reason: "Shortens Spirit Lasso, Powder Keg knockup, Bounce Pad stun and Crackshot slow." },
    { item: "counterspell", reason: "Blocks the lasso if your reflexes are fast." },
  ],
  infernus: [
    { item: "dispel-magic", reason: "Removes afterburn and Toxic Bullets; priority vs afterburn gun builds." },
    { item: "slowing-hex", reason: "Stops Flame Dash; priority vs dash builds, and stops him escaping." },
  ],
  ivy: [
    { item: "counterspell", reason: "Stone Form is telegraphed and blockable; bait it before your big abilities." },
    { item: "warp-stone", reason: "Warp out from under the telegraphed Stone Form." },
  ],
  kelvin: [
    { item: "healbane", reason: "Cuts Frost Grenade and Frozen Shelter healing." },
    { item: "debuff-reducer", reason: "Shrugs off his Arctic Beam and Frost Grenade slows." },
    { item: "enduring-speed", reason: "Slow resist against his constant movement slows." },
    { item: "fleetfoot", reason: "Slow resist against his constant movement slows." },
  ],
  "lady-geist": [
    { item: "silence-wave", reason: "Stops her short-range health-swap ult when you must go in for the kill." },
  ],
  lash: [
    { item: "counterspell", reason: "Most telegraphed kit in the game; blocks Ground Strike and his ult. Most economical answer." },
    { item: "ethereal-shift", reason: "Avoid being picked up by his ult." },
    { item: "indomitable", reason: "Can't be picked up by his ult." },
    { item: "unstoppable", reason: "Can't be picked up, and guarantees your own ultimate." },
  ],
  mcginnis: [
    { item: "warp-stone", reason: "Warp over (or through, before it deploys) Spectral Wall instead of punching it." },
  ],
  mina: [
    { item: "slowing-hex", reason: "Stops Sanguine Retreat; she builds Dispel Magic, so bring a second Hex." },
  ],
  mirage: [
    { item: "dispel-magic", reason: "Dispel Djinn's Mark at 3-4 stacks to delete his burst (and his Toxic Bullets)." },
  ],
  "mo-and-krill": [
    { item: "indomitable", reason: "Prevents Combo from grabbing you." },
    { item: "debuff-reducer", reason: "Shortens Combo's duration." },
    { item: "warp-stone", reason: "His kit is very short range; just stay away." },
    { item: "stamina-mastery", reason: "His kit is very short range; just stay away." },
    { item: "enduring-speed", reason: "His kit is very short range; just stay away." },
  ],
  "nurse-harrow": [
    { item: "healbane", reason: "Buy anti-heal. Multiple, if needed." },
    { item: "toxic-bullets", reason: "Anti-heal on your gun." },
    { item: "crippling-headshot", reason: "Anti-heal on your gun." },
    { item: "decay", reason: "Anti-heal from spirit." },
  ],
  paige: [
    { item: "counterspell", reason: "Blocks Captivating Read." },
    { item: "dispel-magic", reason: "Removes Captivating Read's root after it lands." },
    { item: "warp-stone", reason: "Escape Captivating Read." },
  ],
  paradox: [
    { item: "spellbreaker", reason: "Hard counter: Carbine hits hard enough to always proc its spirit damage reduction." },
    { item: "spirit-resilience", reason: "Carbine deals spirit damage despite scaling with gun." },
  ],
  pocket: [
    { item: "divine-barrier", reason: "Cleanses his ult's no-healing affliction, which Dispel can't remove." },
    { item: "counterspell", reason: "Blocks his ult." },
  ],
  "rat-king": [
    { item: "siphon-bullets", reason: "Steals his large max HP, healing you and weakening his Royal Pestments barrier." },
    { item: "tankbuster", reason: "Percent-based damage against his huge health pool." },
    { item: "decay", reason: "Percent-based damage against his huge health pool." },
    { item: "toxic-bullets", reason: "Percent-based damage against his huge health pool." },
  ],
  rem: [
    { item: "slowing-hex", reason: "Stops him entering Tag Along, where he is untargetable." },
    { item: "silence-wave", reason: "Stops him entering Tag Along, where he is untargetable." },
  ],
  seven: [
    { item: "spirit-resilience", reason: "Blunts his spirit damage, though bullying him early matters more." },
    { item: "dispel-magic", reason: "Removes his stun." },
  ],
  shiv: [
    { item: "dispel-magic", reason: "Removes his dagger debuffs." },
    { item: "slowing-hex", reason: "Stops his dash and his ultimate." },
  ],
  silver: [
    { item: "stamina-mastery", reason: "Get to high ground; Lycan Curse has no verticality." },
    { item: "warp-stone", reason: "Get to high ground; Lycan Curse has no verticality." },
    { item: "cold-front", reason: "Crowd control her into oblivion." },
    { item: "slowing-hex", reason: "Crowd control her into oblivion." },
    { item: "knockdown", reason: "Crowd control her into oblivion." },
  ],
  solomon: [
    { item: "dispel-magic", reason: "Cleanses the Rook immobilize so you can escape." },
    { item: "counterspell", reason: "Blocks the Rooks or the Queen hit." },
  ],
  venator: [
    { item: "warp-stone", reason: "Burst past him instead of chasing into his shotgun-into-wall hallway." },
  ],
  victor: [
    { item: "crippling-headshot", reason: "Best item: anti-heal plus resist shred." },
    { item: "weakening-headshot", reason: "Cheaper resist shred." },
    { item: "mystic-vulnerability", reason: "Cheaper resist shred." },
    { item: "healbane", reason: "Cuts his Aura of Suffering sustain." },
  ],
  vindicta: [
    { item: "phantom-strike", reason: "Pulls her out of flight and isn't reactable like Knockdown." },
    { item: "knockdown", reason: "Interrupts her flight; she often has Counterspell/Dispel, so bring several." },
    { item: "disarming-hex", reason: "Shuts down her gun; stack several on the team." },
  ],
  violet: [
    { item: "dispel-magic", reason: "Dispel once Still Life is applied to avoid the stun." },
    { item: "counterspell", reason: "Blocks Still Life's stun." },
  ],
  viscous: [
    { item: "rebuttal", reason: "Shorter parry cooldown against Puddle Punch; a successful parry heals you." },
  ],
  vyper: [
    { item: "metal-skin", reason: "Survives her short-range gun burst; preferred option." },
    { item: "disarming-hex", reason: "Shuts off her gun when she's up close." },
  ],
  warden: [
    { item: "extra-stamina", reason: "Keep stamina in the tank despite his stamina steal." },
    { item: "stamina-mastery", reason: "Keep stamina in the tank despite his stamina steal." },
    { item: "enduring-speed", reason: "Movement speed so stolen stamina matters less." },
    { item: "warp-stone", reason: "Escape Binding Word without stamina." },
    { item: "dispel-magic", reason: "Removes the tier-three cage silence." },
  ],
  wraith: [
    { item: "disarming-hex", reason: "Disables her gun; Metal Skin is weak since most of her damage is spirit." },
    { item: "juggernaut", reason: "Fire rate slow on her gun." },
    { item: "suppressor", reason: "Fire rate slow on her gun." },
  ],
  yamato: [
    { item: "dispel-magic", reason: "Dispel Flying Slash so she can't grapple to you." },
  ],
};
