import { get, writable } from 'svelte/store';
import { selectedEffects } from './selectedEffects.js'
import { selectedModifiers } from './selectedModifiers.js'
import { availableModifiers } from '../data/availableModifiers.js'
import { availableEffects } from '../data/availableEffects.js'
import { selectedDomain } from './selectedMeta.js';

export const allowedModifiers = writable([]);
export const allowedEffects = writable([]);

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
  availableEffects.forEach(effect => {
    let disabled = false;

    if (effect.prerequisite) {
      effect.prerequisite.forEach(prerequisite => {
        if (!selectedMods.concat(selectedEffects).find(m => m.name == prerequisite)) {
          disabled = true;
        }
      })
    }

    if (effect.incompatible) {
      effect.incompatible.forEach(incompatible => {
        if (selectedMods.concat(selectedEffects).find(m => m.name == incompatible)) {
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
  availableModifiers.forEach(modifier => {
    let disabled = false;

    if (modifier.prerequisite) {
      modifier.prerequisite.forEach(prerequisite => {
        if (!selectedMods.concat(selectedEffects).find(m => m.name == prerequisite)) {
          disabled = true;
        }
      })
    }

    if (modifier.incompatible) {
      modifier.incompatible.forEach(incompatible => {
        if (selectedMods.concat(selectedEffects).find(m => m.name == incompatible)) {
          disabled = true;
        }
      })
    }

    modifier.disabled = disabled;
  })

  allowedModifiers.set(availableModifiers)
}