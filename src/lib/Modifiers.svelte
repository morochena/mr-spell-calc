<script>
  import { range } from "../utils/range.js";
  import { selectedModifiers } from "../stores/selectedModifiers.js";
  import { calculateDescription } from "../utils/CalcDescription.js";
  import { selectedDomain, SPCost } from "../stores/selectedMeta.js";
  import { allowedModifiers } from "../stores/allowedModifiersAndEffects.js";

  let selectedModifier = null;

  const handleSubmit = () => {
    const mod = { tier: 1, notes: "", ...selectedModifier };
    selectedModifiers.update((n) => [...n, mod]);
    selectedModifier = null;
  };

  const deleteModifier = (index) => {
    selectedModifiers.update((n) => n.filter((_, i) => i !== index));
  };

  selectedDomain.subscribe((value) => {
    $selectedModifiers = [...$selectedModifiers];
  });
</script>

<div class="mt-20">
  <h2 class="text-xl">2. Add Modifiers</h2>

  <form on:submit|preventDefault={handleSubmit}>
    <select
      bind:value={selectedModifier}
      class="mt-1 block w-96 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
    >
      {#each $allowedModifiers as modifier}
        <option value={modifier} hidden={modifier.disabled}>
          {modifier.name}
        </option>
      {/each}
    </select>
    {#if selectedModifier && selectedModifier.description}
      <p
        class="mt-2 bg-gray-50 rounded-lg py-5 px-6 mb-4 text-sm text-gray-500 mb-3"
      >
        {selectedModifier.description}
      </p>
    {/if}

    <button
      disabled={!selectedModifier}
      type="submit"
      class="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-900 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
    >
      Add Modifier
    </button>
  </form>

  <table class="mt-2 min-w-full divide-y divide-gray-300">
    <thead class="bg-gray-50">
      <tr>
        <th
          scope="col"
          class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
          >Modifier</th
        >
        <th
          scope="col"
          class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >Tier</th
        >
        <th
          scope="col"
          class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >Notes</th
        >
        <th
          scope="col"
          class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >Description</th
        >
        <th scope="col" />
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200 bg-white">
      {#each $selectedModifiers as modifier, index}
        <tr>
          <td
            class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
            >{modifier.name}</td
          >
          <td>
            {#if modifier.hasTiers}
              <select
                bind:value={modifier.tier}
                class="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
              >
                {#each range(1, modifier.maxTier + 1 || 50, 1) as i}
                  <option value={i}>{i}</option>
                {/each}
              </select>
            {/if}
          </td>
          <td>
            <textarea
              bind:value={modifier.notes}
              class="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="notes"
            />
          </td>
          <td>
            <button class="mt-1" on:click={() => deleteModifier(index)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </td>
          <td>
            {calculateDescription(modifier, $SPCost)}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
