import { get, writable } from 'svelte/store';
import { selectedEffects } from './selectedEffects.js'
import { selectedModifiers } from './selectedModifiers.js'
import { availableModifiers } from '../data/availableModifiers.js'
import { availableEffects } from '../data/availableEffects.js'
import { selectedDomain, isAlchemy, isRunesmith } from './selectedMeta.js';

export const allowedModifiers = writable([]);
export const allowedEffects = writable([]);

isAlchemy.subscribe((value) => {
  calculateAllowedModifiers(get(selectedModifiers), get(selectedEffects))
  calculateAllowedEffects(get(selectedModifiers), get(selectedModifiers))
})

isRunesmith.subscribe((value) => {
  calculateAllowedModifiers(get(selectedModifiers), get(selectedEffects))
  calculateAllowedEffects(get(selectedModifiers), get(selectedModifiers))
})

selectedDomain.subscribe(domain => {
  calculateAllowedModifiers(get(selectedModifiers), get(selectedEffects))
  calculateAllowedEffects(get(selectedModifiers), get(selectedModifiers))
})

selectedEffects.subscribe(effects => {
  calculateAllowedModifiers(get(selectedModifiers), effects)
  calculateAllowedEffects(get(selectedModifiers), effects)
})

selectedModifiers.subscribe(modifiers => {
  calculateAllowedModifiers(modifiers, get(selectedEffects))
  calculateAllowedEffects(modifiers, get(selectedEffects))
})

function calculateAllowedEffects(selectedMods, selectedEffects) {

  const toCheck = selectedMods.concat(selectedEffects)
  if (get(isAlchemy)) {
    toCheck.push({ name: "Alchemist" })
  }
  if (get(isRunesmith)) {
    toCheck.push({ name: "Runesmith" })
  }

  availableEffects.forEach(effect => {
    let disabled = false;

    if (effect.prerequisite) {
      let foundOne = 0;
      effect.prerequisite.forEach(prerequisite => {
        if (toCheck.find(m => m.name.includes(prerequisite))) {
          foundOne++;
        }
      })

      disabled = foundOne < effect.prerequisite.length;
    }

    if (effect.incompatible) {
      effect.incompatible.forEach(incompatible => {
        if (toCheck.find(m => m.name.includes(incompatible))) {
          disabled = true;
        }
      })
    }

    if (!effect.domains.includes(get(selectedDomain))) {
      disabled = true
    }

    effect.disabled = disabled;
  });

  allowedEffects.set(availableEffects);
}

function calculateAllowedModifiers(selectedMods, selectedEffects) {

  const toCheck = selectedMods.concat(selectedEffects)
  if (get(isAlchemy)) {
    toCheck.push({ name: "Alchemist" })
  }
  if (get(isRunesmith)) {
    toCheck.push({ name: "Runesmith" })
  }

  console.log(toCheck)

  availableModifiers.forEach(modifier => {
    let disabled = false;

    if (modifier.prerequisite) {
      let foundOne = 0;
      modifier.prerequisite.forEach(prerequisite => {
        if (toCheck.find(m => m.name.includes(prerequisite))) {
          foundOne++;
        }
      })

      disabled = foundOne < modifier.prerequisite.length;
    }

    if (modifier.incompatible) {
      modifier.incompatible.forEach(incompatible => {
        if (toCheck.find(m => m.name.includes(incompatible))) {
          disabled = true;
        }
      })
    }

    modifier.disabled = disabled;
  })

  allowedModifiers.set(availableModifiers)
}