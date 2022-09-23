<script>
  import {
    name,
    description,
    selectedDomain,
    selectedMode,
    SPCost,
    isAlchemy,
    isRunesmith,
  } from "../stores/selectedMeta.js";
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

  import { get } from "svelte/store";

  import {
    createElement,
    movementCondition,
    geas,
    sound,
    plague,
    madness,
  } from "../data/availableEffects.js";
  import { element, identity, xlink_attr } from "svelte/internal";

  const runModifier = (modifier) => {
    // evaluates eg. splitModifier(tier)
    let truetier = modifier.tier;
    if (modifier.domaintier) truetier -= modifier.domaintier;
    switch (modifier.amount) {
      case "splitModifier":
        return splitModifier(truetier);
      case "rangeModifier":
        return rangeModifier(truetier);
      case "aoeModifier":
        return aoeModifier(truetier);
      case "lastingModifier":
        return lastingModifier(truetier, modifier.name);
      case "componentModifier":
        return componentModifier(truetier);
      case "createElement":
        return createElement(truetier);
      case "movementCondition":
        return movementCondition(truetier);
      case "geas":
        return geas(truetier);
      case "sound":
        return sound(truetier);
      case "plague":
        return plague(truetier);
      case "madness":
        return madness(truetier);
    }

    console.log("modifier case not handled: ", modifier.amount);

    return 0;
  };

  let isAlchemyValue = false;
  let isRunesmithValue = false;
  let selectedModifierValues = [];
  let selectedEffectValues = [];
  let totalSPCost = 0;
  let totalSPAdds = 0;
  let totalSPMults = 0;
  let spellResist = 0;
  let spellCost = 0;
  let illusionDiscount = 0;
  let sMode = "";

  isAlchemy.subscribe((value) => {
    isAlchemyValue = value;
  });
  isRunesmith.subscribe((value) => {
    isRunesmithValue = value;
  });
  selectedMode.subscribe((value) => {
    sMode = value;
    calculateSPCost();
  });

  function calcSpellResist(value) {
    return calcSpellCost(value) + 5;
  }

  function calcSpellCost(value) {
    let cost = Math.ceil(value / 10.0) + 1;
    const modList = get(selectedModifiers);
    let val = 1;

    let subModList = modList.filter(
      (mod) => mod.name !== "Exhausting" && mod.name !== "Uncomplicated"
    );

    const effectList = get(selectedEffects);
    const effectAndsubModifierValues = subModList.concat(effectList);
    const subModSP = calculateSPCostParam(effectAndsubModifierValues);
    let subcost = Math.ceil(subModSP / 10.0) + 1;
    if (subcost != cost) {
      val = 2;
    }

    if (modList.filter((mod) => mod.name === "Exhausting").length > 0) {
      cost += val;
    }
    if (modList.filter((mod) => mod.name === "Uncomplicated").length > 0) {
      cost -= val;
    }
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

  function processDomainEffects(sMode, sDomain, sEffects) {
    let effects = sEffects;
    effects = structuredClone(effects);

    if (sMode === "Unpredicable") {
      effects.push({
        name: "Unpredictable",
        tier: 1,
        hasTiers: true,
        notes: "Unpredictable spell",
        modifierType: "add",
        amount: 4,
        description: "",
      });
    }

    let domain = sDomain;
    switch (domain) {
      case "Fire":
        let x = effects.find((x) => x.name === "Damage");
        if (x && (!x.domaintier || x.domaintier <= 0)) {
          x.tier += 2;
          x.domaintier = 2;
          x.notes = "+2 Fire Domain Damage";
          x.prerequisite = ["Fire"];
        } else if (!x)
          effects.push({
            name: "Damage",
            tier: 2,
            domaintier: 2,
            hasTiers: true,
            prerequisite: ["Fire"],
            notes: "Fire Domain",
            modifierType: "add",
            amount: 2,
            description: "+2 DMG",
          });
        let y = effects.find((y) => y.name === "Light");
        if (y && (!y.domaintier || y.domaintier <= 0)) {
          y.tier += 2;
          y.domaintier = 2;
          y.notes = "+2 Fire Domain Light";
          y.prerequisite = ["Fire"];
        } else if (!y)
          effects.push({
            name: "Light",
            tier: 2,
            domaintier: 2,
            hasTiers: true,
            prerequisite: ["Fire"],
            notes: "Fire Domain",
            modifierType: "add",
            amount: 2,
            description: "Flickers with enough light to brighten a dark room",
          });
        let z = effects.find((z) => z.name === "Create Element");
        if (!z) {
          effects.push({
            name: "Require Element",
            tier: 0,
            domaintier: 0,
            hasTiers: true,
            prerequisite: ["Fire"],
            notes: "Fire Domain",
            modifierType: "add",
            amount: 0,
            description: "Requires the presence of Fire or the spell fails",
          });
        }
        break;
      case "Air":
        let air = effects.find((air) => air.name === "Create Element");
        if (!air) {
          effects.push({
            name: "Require Element",
            tier: 0,
            domaintier: 0,
            hasTiers: true,
            prerequisite: ["Air"],
            notes: "Air Domain",
            modifierType: "add",
            amount: 0,
            description: "Requires the presence of Air or the spell fails",
          });
        }
        break;
      case "Water":
        let water = effects.find((water) => water.name === "Create Element");
        if (!water) {
          effects.push({
            name: "Require Element",
            tier: 0,
            domaintier: 0,
            hasTiers: true,
            prerequisite: ["Water"],
            notes: "Water Domain",
            modifierType: "add",
            amount: 0,
            description: "Requires the presence of Water or the spell fails",
          });
        }
        break;
      case "Earth":
        let force = effects.find((force) => force.name === "Apply Force");
        if (force && (!force.domaintier || force.domaintier <= 0)) {
          force.tier += 2;
          force.domaintier = 2;
          force.notes += " powered up by Earth Domain";
          force.prerequisite = ["Earth"];
        } else if (!force)
          effects.push({
            name: "Apply Force",
            tier: 2,
            domaintier: 2,
            hasTiers: true,
            prerequisite: ["Earth"],
            notes: "Earth Domain",
            modifierType: "add",
            amount: 2,
            description: "is moved 2 meters",
          });
        let earth = effects.find((earth) => earth.name === "Create Element");
        if (!earth) {
          effects.push({
            name: "Require Element",
            tier: 0,
            domaintier: 0,
            hasTiers: true,
            prerequisite: ["Earth"],
            notes: "Earth Domain",
            modifierType: "add",
            amount: 0,
            description: "Requires the presence of Earth or the spell fails",
          });
        }
        break;
      case "Mind":
        effects.push({
          name: "Require Mind",
          tier: 0,
          domaintier: 0,
          hasTiers: true,
          prerequisite: ["Mind"],
          notes: "Mind Domain",
          modifierType: "add",
          amount: 0,
          description: "Requires the presence of a Mind or the spell fails",
        });
        break;
      case "Nature":
        effects.push({
          name: "Require Nature",
          tier: 0,
          domaintier: 0,
          hasTiers: true,
          prerequisite: ["Nature"],
          notes: "Nature Domain",
          modifierType: "add",
          amount: 0,
          description: "Requires the presence of a Life or the spell fails",
        });
        break;
      case "Illusion":
        effects.push({
          name: "Illusion Discount",
          tier: 1,
          domaintier: 0,
          hasTiers: true,
          prerequisite: ["Illusion"],
          notes:
            "When Taking Illusion Powers in a spell as well as the “Help Statistic/Skill/Specialty” Power, Ignore the spell points of the Illusion Powers up to the amount spent on the “Help Statistic/Skill/Specialty” Power",
          modifierType: "reduce",
          amount: illusionDiscount,
          description: "",
        });
        break;
      default:
        break;
    }
    return effects;
  }

  function processDomainModifiers(sDomain, sModifiers) {
    let modifiers = sModifiers;
    modifiers = structuredClone(modifiers);
    let domain = sDomain;
    switch (domain) {
      case "Fire":
        break;
      case "Air":
        break;
      case "Water":
        /*let water = modifiers.find((water) =>
          water.name.includes("Area of Effect")
        );
        if (water) {
          {
            water.notes += "Water Domain Doubles Area";
          }
        }*/
        break;
      case "Earth":
        break;
      case "Mind":
        break;
      case "Nature":
        break;
      case "Illusion":
        break;
      default:
        break;
    }
    return modifiers;
  }

  function calcIllusionDiscount(total, effects) {
    let help = effects.filter((x) => x.name.includes("Help"));
    let helpSP = 0;
    help.forEach((element) => {
      helpSP += resolveCost(element);
    });
    illusionDiscount = Math.min(helpSP, Math.max(total - helpSP, 0));
    if (sMode === "Unpredictable") illusionDiscount -= 4;
    return illusionDiscount;
  }

  function resolveCost(modifier) {
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
    return cost;
  }

  function calculateSPCostParam(effectAndModifierValues) {
    totalSPAdds = 0;

    totalSPMults = 1;

    let modifierCost = effectAndModifierValues.reduce((total, modifier) => {
      return total + resolveCost(modifier);
    }, 0);

    if (get(selectedDomain) === "Illusion")
      modifierCost -= calcIllusionDiscount(
        modifierCost,
        effectAndModifierValues
      );

    if (sMode === "Unpredicable") {
      modifierCost += 4;
    }

    totalSPAdds = modifierCost;

    let paramSPCost = modifierCost;

    let spMultipliers = effectAndModifierValues.filter(
      (modifier) =>
        modifier.modifierType === "multiply" ||
        modifier.modifierType === "functionMultiply"
    );

    spMultipliers.forEach((modifier) => {
      if (modifier.modifierType === "functionMultiply") {
        paramSPCost *= runModifier(modifier)[1];
        totalSPMults *= runModifier(modifier)[1];
      } else {
        paramSPCost *= modifier.amount;
        totalSPMults *= modifier.amount;
      }
    });

    paramSPCost = Math.ceil(paramSPCost);
    paramSPCost = Math.max(paramSPCost, 0);

    return paramSPCost;
  }

  function calcNumberOfPowers(effects, modifiers) {
    let sum = 0;
    effects.forEach((element) => {
      if (
        (!element.prerequisite || element.prerequisite.length == 0) &&
        (!element.domaintier || element.domaintier <= 0)
      )
        sum++;
    });
    modifiers.forEach((element) => {
      if (
        (!element.prerequisite || element.prerequisite.length == 0) &&
        (!element.domaintier || element.domaintier <= 0)
      )
        sum++;
    });
    return sum;
  }

  function calculateSPCost() {
    const effectAndModifierValues = selectedEffectValues.concat(
      selectedModifierValues
    );
    totalSPCost = calculateSPCostParam(effectAndModifierValues);
    $SPCost = totalSPCost;
  }

  function craftedSpellPreamble(isAlchemyValue, isRunesmithValue, spellCost) {
    const modList = get(selectedModifiers);
    let hours = spellCost;
    let days = 1;
    const alclist = modList.filter((mod) => mod.name.includes("brewing"));
    const runelist = modList.filter((mod) => mod.name.includes("crafting"));
    if (alclist.length > 0) {
      hours += alclist[0].tier;
    }
    if (runelist.length > 0) {
      days += runelist[0].tier;
    }
    if (isAlchemyValue)
      return (
        "This is an alchemical creation that takes a day to craft, which includes working on it for " +
        hours +
        " hours actively. Thereafter they can be used by anyone."
      );
    if (isRunesmithValue) {
      hours = hours * 2;
      return (
        "This is an magical rune that takes " +
        days +
        " days to craft which includes " +
        hours +
        " in hours of intense labor per day. Thereafter they can be used by anyone."
      );
    }
    return "";
  }

  const calculateCostText = (modifier) => {
    let truetier = modifier.tier;
    if (modifier.domaintier) truetier -= modifier.domaintier;

    switch (modifier.modifierType) {
      case "add":
        return `+${modifier.amount * truetier}`;
      case "reduce":
        return `${modifier.amount * truetier * -1}`;
      case "multiply":
        return `x${modifier.amount * truetier}`;
      case "function":
        const amount = runModifier(modifier);
        const operator = amount > 0 ? "+" : "";
        return `${operator}${amount}`;
      case "functionMultiply":
        const amountM = runModifier(modifier)[0];
        const operatorM = amountM > 0 ? "+" : "";
        return `x${runModifier(modifier)[1]} and ${operatorM}${
          runModifier(modifier)[0]
        }`;
    }
  };

  const threeSpaces = "\t";

  const effectClass = (effect) => {
    if (effect.prerequisite && effect.prerequisite.length > 0) {
      return "pl-5";
    } else {
      return "";
    }
  };
</script>

<div class="mt-10">
  <h2 class="text-xl">Summary</h2>
  <div
    class="mt-2 bg-gray-700 rounded-lg py-5 px-6 mb-4 text-sm text-white mb-3"
  >
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
        {craftedSpellPreamble(isAlchemyValue, isRunesmithValue, spellCost)}
        {$description}. The caster {verboseSpellMode($selectedMode)} that {#each processDomainModifiers($selectedDomain, $selectedModifiers) as modifier}
          {calculateDescription(modifier, $SPCost)} and&nbsp;
        {/each} the target {#each processDomainEffects($selectedMode, $selectedDomain, $selectedEffects) as effect}
          {calculateDescription(effect, $SPCost)}.&nbsp;
        {/each}
      </p>
    </div>
  </div>
  <table class="mt-2 min-w-full divide-y divide-gray-300">
    <thead class="bg-gray-50">
      <tr>
        <th
          scope="col"
          class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
          >Name</th
        >
        <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >Cost</th
        >
        <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >Tier</th
        >
        <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >Description</th
        >
        <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >Notes</th
        >
      </tr>
    </thead>
    <tbody>
      {#each processDomainModifiers($selectedDomain, $selectedModifiers) as modifier}
        <tr>
          <td class={effectClass(modifier)}
            >{#if !modifier.prerequisite || modifier.prerequisite.length <= 0}
              •
            {/if}{modifier.name}</td
          >
          <td>{calculateCostText(modifier)}</td>
          <td>{modifier.tier}</td>
          <td>{calculateDescription(modifier, $SPCost)}</td>
          <td>{modifier.notes}</td>
        </tr>
      {/each}
      {#each processDomainEffects($selectedMode, $selectedDomain, $selectedEffects) as effect}
        <tr>
          <td class={effectClass(effect)}
            >{#if !effect.prerequisite || effect.prerequisite.length <= 0}
              •
            {/if}{effect.name}</td
          >
          <td>{calculateCostText(effect)}</td>
          <td>{effect.tier}</td>
          <td>{calculateDescription(effect, $SPCost)}</td>
          <td>{effect.notes}</td>
        </tr>
      {/each}
      <tr>
        <td>Total</td>
        <td
          >{totalSPAdds} x {totalSPMults.toFixed(2)} =
          <strong>{totalSPCost}</strong></td
        >
        <td />
      </tr>
    </tbody>
  </table>
  <div>
    <p>
      <strong>Number of Powers:</strong>
      {calcNumberOfPowers(
        processDomainEffects($selectedMode, $selectedDomain, $selectedEffects),
        processDomainModifiers($selectedDomain, $selectedModifiers)
      )}
    </p>
  </div>
</div>
