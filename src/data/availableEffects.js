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

  { name: "Attack", domains: ["Sorcery", "Fire", "Water", "Air", "Earth", "Necromancy", "Holy"], modifierType: 'add', amount: 0, hasTiers: false, description: "Counts as an attack on the target. The Cast roll must pass the target’s Dodge rating as well as the cast difficulty in order to hit. Add 1d10 to the Total damage dealt." },
  { name: "Attack (Targeted)", domains: ["Sorcery", "Necromancy", "Holy"], modifierType: 'add', amount: 2, hasTiers: false, description: "Counts as an attack on the target. The spell does not need to beat the target Dodge rating, and the target cannot spend Advantage points to increase their Dodge and escape the hit. Add 1d10 to the Total damage dealt." },
  { name: "Create Element", maxTier:3, domains: ["Air", "Earth", "Fire", "Water"], modifierType: 'function', amount: 'createElement', hasTiers: true, description: "Create  {elementAmount([tier],[domain])}" },
  { name: "Destroy Element", maxTier:3, domains: ["Air", "Earth", "Fire", "Water"], modifierType: 'add', amount: 1, hasTiers: true, description: "Destroy  {elementAmount([tier],[domain])}" },  // TODO
  { name: "Apply Force", domains: ["Sorcery", "Fire", "Water", "Air", "Earth", "Nature"], modifierType: 'add', amount: 0, hasTiers: true, description: "" },
  { name: "Damage", domains: ["Sorcery", "Fire", "Water", "Air", "Earth", "Necromancy"], modifierType: 'add', amount: 2, hasTiers: true, description: "Adds [tier] damage" },
  { name: "Damage (Armor Piercing)", domains: ["Fire", "Water", "Necromancy"], modifierType: 'add', amount: 1, hasTiers: true, description: "[tier] point(s) of armor negated" },
  { name: "Damage (Scambled Targeting)", domains: ["Fire", "Water", "Necromancy"], modifierType: 'add', amount: 0, hasTiers: false, description: "This spell rolls for a new body part to Damage every time it does damage" },
  { name: "Transform", domains: ["Holy", "Water", "Air", "Earth", "Necromancy", "Nature"], modifierType: 'add', amount: 1, hasTiers: true, description: "[tier * 1000]cm^3 material affected. Change elemental structure of something, turn water into wine, lead into gold, flesh into a grotesque offering to the dark gods. " },
  { name: "Armor", domains: ["Sorcery", "Earth", "Nature"], modifierType: 'add', amount: 4, hasTiers: true, description: "[tier * 3] Armor point(s) gained" },
  { name: "Healing (1)", domains: ["Holy", "Water"], modifierType: 'add', amount: 4, hasTiers: true, description: "Heal [tier] Body point(s)" },
  { name: "Healing (1d10)", domains: ["Holy", "Nature"], modifierType: 'add', amount: 15, hasTiers: true, description: "Heal [tier]d10 Body points" },
  { name: "Drain", domains: ["Necromancy"], modifierType: 'add', amount: 3, hasTiers: true, description: "Take [tier] Body point from a target in range and give it to another target in range of the spell. In case of an attack, distribute the 1d10 damage as well." },
  { name: "Restore Wound", domains: ["Holy", "Necromancy"], modifierType: 'add', amount: 2, hasTiers: true, description: "Changes the wound up by as many points as body healed, or the maximum level of restore wound, whichever is lower." },
  { name: "Resurrect host (Holy)", domains: ["Holy"], modifierType: 'add', amount: 20, hasTiers: true, description: "Brings a body back to life by pulling their soul from the ether. Normally the heal power does not work on dead targets, but coupled with the resurrection power, heals can add body points even if the target has less than their negative maximum body point total. The soul has to belong to the specific body, and be willing to come back to the body. Once the spell is over, the creature remains living." },
  { name: "Resurrect host (Necromancy)", domains: ["Necromancy"], modifierType: 'add', amount: 2, hasTiers: true, description: "Brings a body back to life by either grabbing someone’s soul or creating a simulacrum from the ether. Normally the heal power does not work on dead targets, but coupled with the resurrection power, heals can add body points even if the target has less than their negative maximum body point total. Tthe soul can belong to anyone or can be an simulacrum made of many souls that doesn’t do anything unless commanded. A soul belonging to another body automatically gains a point of madness. It leaves its body after the spell is over." },
  { name: "Emulate Item", domains: ["Earth", "Holy", "Air", "Sorcery", "Fire", "Water"], modifierType: 'add', amount: 1, hasTiers: true, description: "Only mundane items and no modifiers. Starts at 10 Structure Points or what the item had, whichever is less." },
  { name: "Harden Item", domains: ["Sorcery", "Holy", "Nature"], modifierType: 'add', amount: 2, hasTiers: true, description: "Add [tier] structure points" },
  { name: "Harden Item (Earth)", domains: ["Earth"], modifierType: 'add', amount: 1, hasTiers: true, description: "Add [tier] structure points" },
  { name: "Animate Materials (Earth)", domains: ["Earth",], modifierType: 'add', amount: 1, hasTiers: true, description: "Rocks (7 STR 3 DEX). Animate a pile of inanimate materials without imbuing it with a soul. The characters will have 0 Intelligence or Empathy and the above stats otherwise." },
  { name: "Animate Materials (Necromancy)", domains: ["Necromancy",], modifierType: 'add', amount: 1, hasTiers: true, description: "Bones (5 STR 5 DEX). Animate a pile of inanimate materials without imbuing it with a soul. The characters will have 0 Intelligence or Empathy and the above stats otherwise." },
  { name: "Animate Materials (Nature)", domains: ["Nature",], modifierType: 'add', amount: 1, hasTiers: true, description: "Trees (6 STR 4 DEX). Animate a pile of inanimate materials without imbuing it with a soul. The characters will have 0 Intelligence or Empathy and the above stats otherwise." },
  { name: "Animate Materials (Sorcery)", domains: ["Sorcery",], modifierType: 'add', amount: 1, hasTiers: true, description: "Clothing (3 STR 7 DEX). Animate a pile of inanimate materials without imbuing it with a soul. The characters will have 0 Intelligence or Empathy and the above stats otherwise." },
  { name: "Control", domains: ["Necromancy", "Mind",], modifierType: 'add', amount: 20, hasTiers: true, description: "Makes a character act against their interests for the duration of the spell if they have no mind points left. If they do, the spell does 5 damage to their mind. During the entire time the character is under control they can be given commands by the caster, and they have to follow those commands. The control wears off if the character is knocked out, or gains more than 10 Mind points." },
  { name: "Control (Inanimate)", domains: ["Sorcery", "Earth", "Nature"], modifierType: 'add', amount: 20, hasTiers: true, description: "Animated inanimate objects only. Makes a character act against their interests for the duration of the spell if they have no mind points left. If they do, the spell does 5 damage to their mind. During the entire time the character is under control they can be given commands by the caster, and they have to follow those commands. The control wears off if the character is knocked out, or gains more than 10 Mind points." },
  { name: "Control (Limited)", domains: ["Nature"], modifierType: 'add', amount: 10, hasTiers: true, description: "Works on creatures with INT bonus of -2 or lower.For a cheaper option, the control is limited. Every time the character has to follow a command they do not consent to they can roll a Willpower-Self Control check vs the spell difficulty to see if they snap out of it. If the user has Mind points left, it does 2 damage per level of limited control." },


  { name: "Help Attribute", domains: ["Mind", "Holy", "Necromancy", "Earth", "Air", "Water", "Illusion", "Nature"], modifierType: 'add', amount: 4, hasTiers: true, description: "Add [tier] points to [notes]" },
  { name: "Help Skill", domains: ["Mind", "Holy", "Necromancy", "Earth", "Air", "Water", "Illusion", "Nature"], modifierType: 'add', amount: 2, hasTiers: true, description: "Add [tier] points to a skill" },
  { name: "Help Speciality", domains: ["Mind", "Holy", "Necromancy", "Earth", "Air", "Water", "Illusion", "Nature"], modifierType: 'add', amount: 1, hasTiers: true, description: "Add [tier] points to a speciality" },
]