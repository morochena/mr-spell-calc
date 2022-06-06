<script>
  import { name, description, selectedDomain, selectedMode, SPCost } from "../stores/selectedMeta.js";
  import { selectedModifiers } from "../stores/selectedModifiers.js";
  import { selectedEffects } from "../stores/selectedEffects.js";
  import { calculateDescription } from "../utils/CalcDescription.js";
  import {
    splitModifier,
    rangeModifier,
    aoeModifier,
    lastingModifier,
    componentModifier,
  } from "../data/availableModifiers.js";

  // cool hack
  splitModifier;
  rangeModifier;
  aoeModifier;
  lastingModifier;
  componentModifier;

  import { get } from "svelte/store";

  import { createElement, movementCondition, geas, sound, plague, madness } from "../data/availableEffects.js";

  const runModifier = (modifier) => {
    // evaluates eg. splitModifier(tier)

    if (modifier.name.includes("Lasting")) {
      return eval(`${modifier.amount}(${modifier.tier},'${modifier.name}')`);
    }
    if (name) {
      return eval(`${modifier.amount}(${modifier.tier})`);
    }

    return 0;
  };

  let selectedModifierValues = [];
  let selectedEffectValues = [];
  let totalSPCost = 0;
  let totalSPAdds = 0;
  let totalSPMults = 0;
  let spellResist = 0;
  let spellCost = 0;

  function calcSpellResist(value) {
    return calcSpellCost(value) + 5;
  }

  function calcSpellCost(value) {
    let cost = Math.ceil(value / 10.0) + 1;
    const modList = get(selectedModifiers);
    if (modList.filter((mod) => mod.name === "Exhausting").length > 0) {
      cost += 1;
    }
    if (modList.filter((mod) => mod.name === "Uncomplicated").length > 0) {
      cost -= 1;
    }
    //TODO essentially I need to run the cost calculations without Uncomplicated/Exhausting and then with and compare them

    return cost;
  }

  function verboseSpellMode(value) {
    switch (value) {
      case `Unpredicable`:
        return "casts an unstable spell by rolling a skill check and doubling the dice numbers versus the Spell Difficulty and Winds of Magic";
      case "Stable":
        return "casts a stable spell ";
      case "Imbue":
        return "Imbues an item. The item casts a stable spell";
      case "Spell":
      default:
        return "casts a spell by rolling a skill check versus the Spell Difficulty and Winds of Magic";
    }
  }

  selectedEffects.subscribe((value) => {
    selectedEffectValues = value;
    calculateSPCost();
  });

  selectedModifiers.subscribe((value) => {
    selectedModifierValues = value;
    calculateSPCost();
  });

  SPCost.subscribe((value) => {
    spellResist = calcSpellResist(value);
    spellCost = calcSpellCost(value);
  });

  function calculateSPCost() {
    const effectAndModifierValues = selectedEffectValues.concat(selectedModifierValues);

    totalSPAdds = 0;
    totalSPMults = 1;

    let modifierCost = effectAndModifierValues.reduce((total, modifier) => {
      let cost = 0;
      switch (modifier.modifierType) {
        case "add":
          cost = modifier.amount * modifier.tier;
          break;
        case "reduce":
          cost = modifier.amount * modifier.tier * -1;
          break;
        case "function":
          cost = runModifier(modifier);
          break;
        case "functionMultiply":
          if (modifier.name.includes("Lasting")) {
            cost = runModifier(modifier)[0];
          } else {
            cost = runModifier(modifier)[0];
          }
          break;
      }
      return total + cost;
    }, 0);

    totalSPAdds = modifierCost;
    totalSPCost = modifierCost;

    let spMultipliers = effectAndModifierValues.filter(
      (modifier) => modifier.modifierType === "multiply" || modifier.modifierType === "functionMultiply"
    );

    spMultipliers.forEach((modifier) => {
      if (modifier.modifierType === "functionMultiply") {
        totalSPCost *= runModifier(modifier)[1];
        totalSPMults *= runModifier(modifier)[1];
      } else {
        totalSPCost *= modifier.amount;
        totalSPMults *= modifier.amount;
      }
    });

    totalSPCost = Math.ceil(totalSPCost);
    totalSPCost = Math.max(totalSPCost, 0);
    $SPCost = totalSPCost;
  }

  const calculateCostText = (modifier) => {
    switch (modifier.modifierType) {
      case "add":
        return `+${modifier.amount * modifier.tier}`;
      case "reduce":
        return `${modifier.amount * modifier.tier * -1}`;
      case "multiply":
        return `x${modifier.amount * modifier.tier}`;
      case "function":
        const amount = runModifier(modifier);
        const operator = amount > 0 ? "+" : "";
        return `${operator}${amount}`;
      case "functionMultiply":
        const amountM = runModifier(modifier)[0];
        const operatorM = amountM > 0 ? "+" : "";
        return `x${runModifier(modifier)[1]} and ${operatorM}${runModifier(modifier)[0]}`;
    }
  };
</script>

<div class="mt-10">
  <h2 class="text-xl">Summary</h2>
  <div class="mt-2 bg-gray-700 rounded-lg py-5 px-6 mb-4 text-sm text-white mb-3">
    <div>
      <p><strong>Name:</strong> {$name}</p>
      <p><strong>Description:</strong> {$description}</p>
      <p><strong>Domain:</strong> {$selectedDomain}</p>
      <p><strong>Mode:</strong> {$selectedMode}</p>
      <p><strong>Spell Difficulty:</strong> {$SPCost}</p>
      <p><strong>Mental Cost:</strong> {spellCost}</p>
    </div>
    <hr class="my-3" />
    <div>
      <p>
        {$description}. The caster {verboseSpellMode($selectedMode)} that {#each selectedModifierValues as modifier}
          {calculateDescription(modifier, $SPCost)} and&nbsp;
        {/each} the target {#each selectedEffectValues as effect} {calculateDescription(effect, $SPCost)}.&nbsp; {/each}
      </p>
    </div>
  </div>
  <table class="mt-2 min-w-full divide-y divide-gray-300">
    <thead class="bg-gray-50">
      <tr>
        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
        <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Cost</th>
        <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Tier</th>
        <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Description</th>
        <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Notes</th>
      </tr>
    </thead>
    <tbody>
      {#each selectedModifierValues as modifier}
        <tr>
          <td>{modifier.name}</td>
          <td>{calculateCostText(modifier)}</td>
          <td>{modifier.tier}</td>
          <td>{calculateDescription(modifier, $SPCost)}</td>
          <td>{modifier.notes}</td>
        </tr>
      {/each}
      {#each selectedEffectValues as effect}
        <tr>
          <td>{effect.name}</td>
          <td>{calculateCostText(effect)}</td>
          <td>{effect.tier}</td>
          <td>{calculateDescription(effect, $SPCost)}</td>
          <td>{effect.notes}</td>
        </tr>
      {/each}
      <tr>
        <td>Total</td>
        <td>{totalSPAdds} x {totalSPMults.toFixed(2)} = <strong>{totalSPCost}</strong></td>
        <td />
      </tr>
    </tbody>
  </table>
</div>
