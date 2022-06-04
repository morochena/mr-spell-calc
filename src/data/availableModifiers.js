
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
  { name: "Ray", hasTiers: false, modifierType: 'reduce', modifier: 3, description: "Cannot be Area of Effect and the targets must be in direct line of sight for the character for the entire duration of the spell or the spell fails.  The spell has to have at least 10m range and target can't be self" },
  { name: "Aura", hasTiers: false, modifierType: 'add', modifier: 2, description: "Automatically has Area of effect and area of effect is doubled for every tier. The Spell cannot do damage." },
  { name: "Reaction", hasTiers: false, modifierType: 'add', modifier: 2, description: "This spell can be used as an interruption on another person’s turn. The spell cannot be a Delay Spell." },
  { name: "Exhausting", hasTiers: false, modifierType: 'reduce', modifier: 4, description: "Increase the mental cost of the spell by 1. If the removal of the SP causes the spell to move to the next cost bracket, increase the cost by 2 instead." },
  { name: "Uncomplicated", hasTiers: false, modifierType: 'add', modifier: 4, description: "Decrease the mental cost of the spell by 1. If the addition of the SP causes the spell to move to the next cost bracket, decrease the cost by 2 instead." },
  { name: "Charge Up", hasTiers: false, modifierType: 'reduce', modifier: 4, description: "Casting the spell in combat takes both actions. Out of combat the spell has a few seconds of obvious noticeable charging. " },
  { name: "Dangerous", hasTiers: false, modifierType: 'reduce', modifier: 5, description: "On a failure of the spell or a roll of a 1, the cost of the spell is increased by 6, and cannot be taken from Arcana. The cost can overflow from mind to body. Spells cannot be stable, nor can this spell ever become a cantrip." },
  { name: "Painful", hasTiers: false, modifierType: 'reduce', modifier: 6, description: "The cost applies to body as well as mind. This essentially doubles the cost of the spell." },
  { name: "Stealth", hasTiers: false, modifierType: 'add', modifier: 1, description: "Casting the spell is discreet, with no visible somatic or vocal components, nor any glow or magical energies. If someone inspects you for the ability to create magic, they will not detect any of your stealth spells. Cannot be Somatic or Charge Up. If the spell fails, the magical energy is detectable." },
  { name: "Somatic", hasTiers: false, modifierType: 'reduce', modifier: 3, description: "This spell requires very precise manipulation of your body to go off correctly, aside from just calling out the invocation and waving your hands around, almost like a dance. Specifically this means that if your hands are bound you are unable to cast this spell. Cannot be Stealth or Prepared." },
  { name: "Split", hasTiers: true, modifierType: 'function', modifier: "splitModifier", types: ['Concentrated Power'], description: "Creates an extra effect of the spell per tier." },
  { name: "Range", hasTiers: true, modifierType: 'function', modifier: "rangeModifier", description: "Move the origin point of the spell away from your hand to somewhere within the specified range." },
  { name: "Trigger Action", hasTiers: false, modifierType: 'multiply', modifier: 0.5, description: "The Spell Target has to perform a specific action, or at least requires them not fighting back while someone else does it to them; or otherwise for them to be incapacitated and unable in any way to resist the action performed on them; such that a physical attack against them would be an automatic hit." },
  { name: "Thwarted By", hasTiers: false, modifierType: 'multiply', modifier: 0.667, description: "Anyone targeted by the spell (directly or through area of effect) can roll their Stat bonus versus the thwart difficulty of the spell, which is 6 + 1/10th the SP of the spell. If they succeed, they take half the effects of the spell." },
  { name: "Area of Effect", hasTiers: true, modifierType: 'function', modifier: "aoeModifier", description: "Covers a certain continuous area encapsulated by a polygon." },
  { name: "Lasting", hasTiers: true, modifierType: 'functionMultiply', modifier: "lastingModifier", types: ['Concentration', 'Channeling', 'Mobile Origin Spell', 'Mobile Origin Caster'], description: "Lasts for a certain duration." },
  { name: "Delay", hasTiers: false, modifierType: 'multiply', modifier: 0.333, description: "The spell has to have the lasting modifier, The spell doesn't activate immediately, but instead goes off after a certain amount of time specified during the spell creation, which has to be at least half the total time the spell lasts." },
  { name: "Sculpted (Immune)", hasTiers: false, modifierType: 'add', modifier: 2, description: "Spell will not target the caster" },
  { name: "Sculpted (Pre-sculpted)", hasTiers: false, modifierType: 'add', modifier: 3, description: "Spell will not target anyone chosen at spell creation by some physical criteria: race, gender, birthmarks, tattoos, etc" },
  { name: "Sculpted (Sculpted)", hasTiers: false, modifierType: 'add', modifier: 4, description: "Spell will not target anyone chosen by the caster." },
  { name: "Requires Component", hasTiers: true, modifierType: 'function', modifier: "componentModifier", description: "Requires a specific component." },
]