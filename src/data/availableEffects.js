/*
Sorcery ✨
Fire 🔥
Water 🌊
Earth 🌑
Air 🍃
Necromancy 💀
Holy 💥
Mind 🧠
Illusion 👁
Nature 🌳
*/

// { name: "", domains: [], cost: 0, hasTiers: true, description: "" },

export const createElement = (tier) => {
  return tier + 2;
}


export const availableEffects = [

  { name: "Attack", domains: ["Sorcery", "Fire", "Water", "Air", "Earth", "Necromancy", "Holy"], modifierType: 'add', amount: 0, hasTiers: false, description: "takes an attack using the Caster's Magical Attack specialty that deals d10 DMG" },
  { name: "Attack (Targeted)", domains: ["Sorcery", "Necromancy", "Holy"], modifierType: 'add', amount: 2, hasTiers: false, description: "takes an attack which cannot be dodged that deals d10 DMG" },
  { name: "Create Element", maxTier:3, domains: ["Air", "Earth", "Fire", "Water"], modifierType: 'function', amount: 'createElement', hasTiers: true, description: "creates {elementAmount([tier],[domain])}" },
  { name: "Destroy Element", maxTier:3, domains: ["Air", "Earth", "Fire", "Water"], modifierType: 'add', amount: 1, hasTiers: true, description: "destroys {elementAmount([tier],[domain])}" },  // TODO
  { name: "Apply Force", domains: ["Sorcery", "Fire", "Water", "Air", "Earth", "Nature"], modifierType: 'add', amount: 0, hasTiers: true, description: "is moved [Tier] meters [notes]" },
  { name: "Damage", domains: ["Sorcery", "Fire", "Water", "Air", "Earth", "Necromancy"], modifierType: 'add', amount: 2, hasTiers: true, description: "+[tier] DMG" },
  { name: "Damage (Armor Piercing)", domains: ["Fire", "Water", "Necromancy"], modifierType: 'add', amount: 1, hasTiers: true, description: "[tier] AP" },
  { name: "Transform", domains: ["Holy", "Water", "Air", "Earth", "Necromancy", "Nature"], modifierType: 'add', amount: 1, hasTiers: true, description: "turns [tier * 1000]cm^3 of [domain] into [notes]" },
  { name: "Armor", domains: ["Sorcery", "Earth", "Nature"], modifierType: 'add', amount: 4, hasTiers: true, description: " gains [tier * 3] Armor point(s)" },
  { name: "Healing (1)", domains: ["Holy", "Water"], modifierType: 'add', amount: 4, hasTiers: true, description: "heals [tier] Body point(s)" },
  { name: "Healing (1d10)", domains: ["Holy", "Nature"], modifierType: 'add', amount: 15, hasTiers: true, description: "heals [tier]d10 Body points" },
  { name: "Drain", domains: ["Necromancy"], modifierType: 'add', amount: 3, hasTiers: true, description: "any body points taken by the spell can be redistributed by the caster" },
  { name: "Restore Wound", domains: ["Holy", "Necromancy"], modifierType: 'add', amount: 2, hasTiers: true, description: "changes the wound up by as many points as body healed, or [tier], whichever is lower" },
  { name: "Resurrect host (Holy)", domains: ["Holy"], modifierType: 'add', amount: 20, hasTiers: true, description: "is brought back to life by pulling their soul from the ether.  The soul has to belong to the specific body, and be willing to come back to the body." },
  { name: "Resurrect host (Necromancy)", domains: ["Necromancy"], modifierType: 'add', amount: 2, hasTiers: true, description: "is brought back to life by either grabbing someone’s soul or creating a simulacrum from the ether. Normally the heal power does not work on dead targets, but coupled with the resurrection power, heals can add body points even if the target has less than their negative maximum body point total. Tthe soul can belong to anyone or can be an simulacrum made of many souls that doesn’t do anything unless commanded. A soul belonging to another body automatically gains a point of madness. It leaves its body after the spell is over." },
  { name: "Emulate Item", domains: ["Holy", "Sorcery", "Fire", "Water"], modifierType: 'add', amount: 1, hasTiers: true, description: "emulates [notes] made of [domain] at 10 Structure Points or what the item had, whichever is less." },
  { name: "Emulate Item", domains: ["Air"], modifierType: 'add', amount: 1, hasTiers: true, description: "emulates [notes] made of [domain] at 1 Structure Points or what the item had, whichever is less." },
  { name: "Emulate Item", domains: ["Earth"], modifierType: 'add', amount: 1, hasTiers: true, description: "emulates [notes] made of [domain]" },
  { name: "Harden Item", domains: ["Sorcery", "Holy", "Nature"], modifierType: 'add', amount: 2, hasTiers: true, description: "Adds [tier] structure points to the [notes] item" },
  { name: "Harden Item (Earth)", domains: ["Earth"], modifierType: 'add', amount: 1, hasTiers: true, description: "Add [tier] structure points" },
  { name: "Animate Materials (Earth)", domains: ["Earth",], modifierType: 'add', amount: 1, hasTiers: true, description: "Rocks (7 STR 3 DEX). Animate a pile of inanimate materials without imbuing it with a soul. The characters will have 0 Intelligence or Empathy and the above stats otherwise." },
  { name: "Animate Materials (Necromancy)", domains: ["Necromancy",], modifierType: 'add', amount: 1, hasTiers: true, description: "Bones (5 STR 5 DEX). Animate a pile of inanimate materials without imbuing it with a soul. The characters will have 0 Intelligence or Empathy and the above stats otherwise." },
  { name: "Animate Materials (Nature)", domains: ["Nature",], modifierType: 'add', amount: 1, hasTiers: true, description: "Trees (6 STR 4 DEX). Animate a pile of inanimate materials without imbuing it with a soul. The characters will have 0 Intelligence or Empathy and the above stats otherwise." },
  { name: "Animate Materials (Sorcery)", domains: ["Sorcery",], modifierType: 'add', amount: 1, hasTiers: true, description: "Clothing (3 STR 7 DEX). Animate a pile of inanimate materials without imbuing it with a soul. The characters will have 0 Intelligence or Empathy and the above stats otherwise." },
  { name: "Control", domains: ["Necromancy", "Mind",], modifierType: 'add', amount: 20, hasTiers: true, description: "Makes a character act against their interests for the duration of the spell if they have no mind points left. If they do, the spell does 5 damage to their mind. During the entire time the character is under control they can be given commands by the caster, and they have to follow those commands. The control wears off if the character is knocked out, or gains more than 10 Mind points." },
  { name: "Control (Inanimate)", domains: ["Sorcery", "Earth", "Nature"], modifierType: 'add', amount: 20, hasTiers: true, description: "Animated inanimate objects only. Makes a character act against their interests for the duration of the spell if they have no mind points left. If they do, the spell does 5 damage to their mind. During the entire time the character is under control they can be given commands by the caster, and they have to follow those commands. The control wears off if the character is knocked out, or gains more than 10 Mind points." },
  { name: "Control (Limited)", domains: ["Nature"], modifierType: 'add', amount: 10, hasTiers: true, description: "Works on creatures with INT bonus of -2 or lower.For a cheaper option, the control is limited. Every time the character has to follow a command they do not consent to they can roll a Willpower-Self Control check vs the spell difficulty to see if they snap out of it. If the user has Mind points left, it does 2 damage per level of limited control." },


  { name: "Help Attribute", domains: ["Mind", "Holy", "Necromancy", "Earth", "Air", "Water", "Illusion", "Nature"], modifierType: 'add', amount: 4, hasTiers: true, description: "Add [tier] points to [notes]" },
  { name: "Help Skill", domains: ["Mind", "Holy", "Necromancy", "Earth", "Air", "Water", "Illusion", "Nature"], modifierType: 'add', amount: 2, hasTiers: true, description: "Add [tier] points to [notes]" },
  { name: "Help Speciality", domains: ["Mind", "Holy", "Necromancy", "Earth", "Air", "Water", "Illusion", "Nature"], modifierType: 'add', amount: 1, hasTiers: true, description: "Add [tier] points to [notes]" },
]