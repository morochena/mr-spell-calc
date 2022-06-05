<script>
  import { name, description, selectedDomain, selectedMode } from "../stores/selectedMeta.js";
  import { selectedModifiers } from "../stores/selectedModifiers.js";
  import { selectedEffects } from "../stores/selectedEffects.js";
  import {calculateDescription } from "../utils/CalcDescription.js";
  import {
    splitModifier,
    rangeModifier,
    aoeModifier,
    lastingModifier,
    componentModifier,
  } from "../data/availableModifiers.js";

  const runModifier = (name, tier) => {
    switch (name) {
      case "splitModifier":
        return splitModifier(tier);
      case "rangeModifier":
        return rangeModifier(tier);
      case "aoeModifier":
        return aoeModifier(tier);
      case "lastingModifier":
        return lastingModifier(tier);
      case "componentModifier":
        return componentModifier(tier);
    }
  };

  let selectedModifierValues = [];
  let selectedEffectValues = [];
  let totalSPCost = 0;

  selectedEffects.subscribe((value) => {
    selectedEffectValues = value;
    calculateSPCost();
  });

  selectedModifiers.subscribe((value) => {
    selectedModifierValues = value;
    calculateSPCost();
  });

  

  function calculateSPCost() {
    console.log(selectedModifierValues);
    let modifierCost = selectedModifierValues.reduce((total, modifier) => {
      let cost = 0;
      switch (modifier.modifierType) {
        case "add":
          cost = modifier.modifier * modifier.tier;
          break;
        case "reduce":
          cost = modifier.modifier * modifier.tier * -1;
          break;
        case "function":
          cost = runModifier(modifier.modifier, modifier.tier);
          break;
        case "functionMultiply":
          cost = runModifier(modifier.modifier, modifier.tier)[0];
          break;
      }
      return total + cost;
    }, 0);

    let effectCost = selectedEffectValues.reduce((total, effect) => {
      let cost = effect.tier * effect.cost;
      return total + cost;
    }, 0);

    totalSPCost = modifierCost + effectCost;

    let spMultipliers = selectedModifierValues.filter(
      (modifier) => modifier.modifierType === "multiply" || modifier.modifierType === "functionMultiply"
    );

    spMultipliers.forEach((modifier) => {
      if (modifier.modifierType === "functionMultiply") {
        totalSPCost *= runModifier(modifier.modifier, modifier.tier)[1];
      } else {
        totalSPCost *= modifier.modifier;
      }
    });

    totalSPCost = Math.round(totalSPCost);
  }

  const calculateEffectCostText = (effect) => {
    return effect.cost * effect.tier;
  };

  const calculateCostText = (modifier) => {
    switch (modifier.modifierType) {
      case "add":
        return `+${modifier.modifier * modifier.tier}`;
      case "reduce":
        return `${modifier.modifier * modifier.tier * -1}`;
      case "multiply":
        return `x${modifier.modifier * modifier.tier}`;
      case "function":
        return `${runModifier(modifier.modifier, modifier.tier)}`;
      case "functionMultiply":
        return `x${runModifier(modifier.modifier, modifier.tier)[1]} and +${
          runModifier(modifier.modifier, modifier.tier)[0]
        }`;
    }
  };
</script>

<div class="mt-10">
  <h2 class="text-xl">Summary</h2>
  <p><strong>Name:</strong> {$name}</p>
  <p><strong>Description:</strong> {$description}</p>
  <p><strong>Domain:</strong> {$selectedDomain}</p>
  <p><strong>Mode:</strong> {$selectedMode}</p>
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
          <td>{modifier.description}</td>
          <td>{modifier.notes}</td>
        </tr>
      {/each}
      {#each selectedEffectValues as effect}
        <tr>
          <td>{effect.name}</td>
          <td>{calculateEffectCostText(effect)}</td>
          <td>{effect.tier}</td>
          <td>{calculateDescription(effect)}</td>
          <td>{effect.notes}</td>
        </tr>
      {/each}
      <tr>
        <td>Total</td>
        <td><strong>{totalSPCost}</strong></td>
        <td />
      </tr>
    </tbody>
  </table>
</div>
