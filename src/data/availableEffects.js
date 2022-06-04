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


export const availableEffects = [

  { name: "Attack", domains: ["Sorcery", "Fire", "Water", "Air", "Earth", "Necromancy", "Holy"], cost: 0, hasTiers: false, description: "Counts as an attack on the target. The Cast roll must pass the target’s Dodge rating as well as the cast difficulty in order to hit. Add 1d10 to the Total damage dealt." },
  { name: "Attack (Targeted)", domains: ["Sorcery", "Fire", "Water", "Air", "Earth", "Necromancy", "Holy"], cost: 2, hasTiers: false, description: "Counts as an attack on the target. The spell does not need to beat the target Dodge rating, and the target cannot spend Advantage points to increase their Dodge and escape the hit. Add 1d10 to the Total damage dealt." },
  { name: "Create or Destroy Element", domains: ["Air", "Earth", "Fire", "Water"], hasTiers: true, description: "Fuck thermodynamics" }, // TODO
  { name: "Apply Force", domains: ["Sorcery", "Fire", "Water", "Air", "Earth", "Nature"], cost: 0, hasTiers: true, description: "" },
  { name: "Damage", domains: ["Sorcery", "Fire", "Water", "Air", "Earth", "Necromancy"], cost: 2, hasTiers: true, description: "Adds [tier] damage" },
  { name: "Damage (Armor Piercing)", domains: ["Fire", "Water", "Necromancy"], cost: 1, hasTiers: true, description: "[tier] point(s) of armor negated" },
  { name: "Damage (Scambled Targeting)", domains: ["Fire", "Water", "Necromancy"], cost: 0, hasTiers: false, description: "This spell rolls for a new body part to Damage every time it does damage" },
  { name: "Transform", domains: ["Holy", "Water", "Air", "Earth", "Necromancy", "Nature"], cost: 1, hasTiers: true, description: "[tier * 1000]cm^3 material affected. Change elemental structure of something, turn water into wine, lead into gold, flesh into a grotesque offering to the dark gods. " },
  { name: "Armor", domains: ["Sorcery", "Earth", "Nature"], cost: 4, hasTiers: true, description: "[tier * 3] Armor point(s) gained" },
  { name: "Healing (1)", domains: ["Holy", "Water"], cost: 4, hasTiers: true, description: "Heal [tier] Body point(s)" },
  { name: "Healing (1d10)", domains: ["Holy", "Nature"], cost: 15, hasTiers: true, description: "Heal [tier]d10 Body points" },
  { name: "Drain", domains: ["Necromancy"], cost: 3, hasTiers: true, description: "Take [tier] Body point from a target in range and give it to another target in range of the spell. In case of an attack, distribute the 1d10 damage as well." },
  { name: "Restore Wound", domains: ["Holy", "Necromancy"], cost: 2, hasTiers: true, description: "Changes the wound up by as many points as body healed, or the maximum level of restore wound, whichever is lower." },
  { name: "Resurrect host (Holy)", domains: ["Holy"], cost: 20, hasTiers: true, description: "Brings a body back to life by either grabbing someone’s soul or creating a simulacrum from the ether. Normally the heal power does not work on dead targets, but coupled with the resurrection power, heals can add body points even if the target has less than their negative maximum body point total. The soul has to belong to the specific body, and be willing to come back to the body. Once the spell is over, the creature remains living." },
  { name: "Resurrect host (Necromancy)", domains: ["Necromancy"], cost: 2, hasTiers: true, description: "Brings a body back to life by either grabbing someone’s soul or creating a simulacrum from the ether. Normally the heal power does not work on dead targets, but coupled with the resurrection power, heals can add body points even if the target has less than their negative maximum body point total. Tthe soul can belong to anyone or can be an simulacrum made of many souls that doesn’t do anything unless commanded. A soul belonging to another body automatically gains a point of madness. It leaves its body after the spell is over." },
  { name: "Help Attribute", domains: ["Mind", "Holy", "Necromancy", "Earth", "Air", "Water", "Illusion", "Nature"], cost: 4, hasTiers: true, description: "Add [tier] points to a stat" },
  { name: "Help Skill", domains: ["Mind", "Holy", "Necromancy", "Earth", "Air", "Water", "Illusion", "Nature"], cost: 2, hasTiers: true, description: "Add [tier] points to a skill" },
  { name: "Help Speciality", domains: ["Mind", "Holy", "Necromancy", "Earth", "Air", "Water", "Illusion", "Nature"], cost: 1, hasTiers: true, description: "Add [tier] points to a speciality" },
]