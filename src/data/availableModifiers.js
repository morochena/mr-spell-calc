
export const splitModifier = (tier) => {
  if (tier == 1) return 8;
  if (tier == 2) return 15;
  if (tier == 3) return 27;
  if (tier == 4) return 40;
  if (tier > 4) return tier * 10;
}

export const rangeModifier = (tier) => {
  let cost = 0

  for (let i = 0; i < tier; i++) {
    if (i < 5) {
      cost += 2
    } else if (i < 10) {
      cost += 3
    } else {
      cost += 4
    }
  }

  return cost;
}

export const aoeModifier = (tier) => {
  let cost = 0;

  for (let i = 0; i < tier; i++) {
    if (i < 10) {
      cost += 2
    } else if (i < 20) {
      cost += 3
    } else if (i < 30) {
      cost += 4
    } else {
      cost += 5
    }
  }

  return cost;
}

export const lastingModifier = (tier, type = null) => {
  let cost = 0
  let multiplier = 0

  for (let i = 0; i < tier; i++) {
    if (i < 1) {
      multiplier = 2
    } else if (i < 5) {
      multiplier = 2
      cost += 2
    } else if (i < 10) {
      multiplier = 3
      cost += 3
    } else if (i < 10) {
      multiplier = 4
      cost += 2
    } else if (i < 10) {
      multiplier = 5
      cost += 2
    } else {
      multiplier = 8
      cost += 8
    }
  }

  return [cost, multiplier];
}

export const componentModifier = (tier) => {
  let cost = 0;

  for (let i = 0; i < tier; i++) {
    cost += 1
  }

  return cost;
}

export const availableModifiers = [
  { name: "Ray", hasTiers: false, modifierType: 'reduce', modifier: 3 },
  { name: "Aura", hasTiers: false, modifierType: 'add', modifier: 2 },
  { name: "Reaction", hasTiers: false, modifierType: 'add', modifier: 2 },
  { name: "Exhausting", hasTiers: false, modifierType: 'reduce', modifier: 4 },
  { name: "Uncomplicated", hasTiers: false, modifierType: 'add', modifier: 4 },
  { name: "Charge Up", hasTiers: false, modifierType: 'reduce', modifier: 4 },
  { name: "Dangerous", hasTiers: false, modifierType: 'reduce', modifier: 5 },
  { name: "Painful", hasTiers: false, modifierType: 'reduce', modifier: 6 },
  { name: "Stealth", hasTiers: false, modifierType: 'add', modifier: 1 },
  { name: "Somatic", hasTiers: false, modifierType: 'reduce', modifier: 3 },
  { name: "Split", hasTiers: true, modifierType: 'function', modifier: "splitModifier" },
  { name: "Range", hasTiers: true, modifierType: 'function', modifier: "rangeModifier" },
  { name: "Trigger Action", hasTiers: false, modifierType: 'multiply', modifier: 0.5 },
  { name: "Thwarted By", hasTiers: false, modifierType: 'multiply', modifier: 0.667 },
  { name: "Area of Effect", hasTiers: true, modifierType: 'function', modifier: "aoeModifier" },
  { name: "Lasting", hasTiers: true, modifierType: 'functionMultiply', modifier: "lastingModifier", types: ['Concentration', 'Channeling', 'Mobile Origin Spell', 'Mobile Origin Caster'] },
  { name: "Delay", hasTiers: false, modifierType: 'multiply', modifier: 0.333 },
  { name: "Sculpted (Immune)", hasTiers: false, modifierType: 'add', modifier: 2 },
  { name: "Sculpted (Pre-sculpted)", hasTiers: false, modifierType: 'add', modifier: 3 },
  { name: "Sculpted (Sculpted)", hasTiers: false, modifierType: 'add', modifier: 4 },
  { name: "Requires Component", hasTiers: true, modifierType: 'function', modifier: "componentModifier" },
]