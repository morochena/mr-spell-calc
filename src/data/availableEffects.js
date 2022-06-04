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
  { name: "Armor", domains: ["Sorcery", "Earth", "Nature"], cost: 4, hasTiers: true, description: "[tier * 3] Armor point(s) gained" },
  { name: "Healing (1)", domains: ["Holy", "Water"], cost: 4, hasTiers: true, description: "Heal [tier] Body point(s)" },
  { name: "Healing (1d10)", domains: ["Holy", "Nature"], cost: 15, hasTiers: true, description: "Heal [tier]d10 Body points" },
  { name: "Damage", domains: ["Sorcery", "Fire", "Water", "Air", "Earth", "Necromancy"], cost: 2, hasTiers: true, description: "Adds [tier] damage" },
  { name: "Help Attribute", domains: ["Mind", "Holy", "Necromancy", "Earth", "Air", "Water", "Illusion", "Nature"], cost: 4, hasTiers: true, description: "Add [tier] points to a stat" },
  { name: "Help Skill", domains: ["Mind", "Holy", "Necromancy", "Earth", "Air", "Water", "Illusion", "Nature"], cost: 2, hasTiers: true, description: "Add [tier] points to a skill" },
  { name: "Help Speciality", domains: ["Mind", "Holy", "Necromancy", "Earth", "Air", "Water", "Illusion", "Nature"], cost: 1, hasTiers: true, description: "Add [tier] points to a speciality" },
]