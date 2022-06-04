<script>
  import { range } from "../utils/range.js";
  import { availableEffects } from "../data/availableEffects.js";
  import { selectedEffects } from "../stores/selectedEffects.js";
  import { selectedDomain } from "../stores/selectedMeta.js";

  let selectedEffect = null;
  let selectedDescription = null;
  let selectedDomainValue = null;

  selectedDomain.subscribe((value) => {
    selectedDomainValue = value;
  });

  $: if (selectedEffect) {
    const foundEffect = availableEffects.find((effect) => effect.name === selectedEffect.name);
    selectedDescription = foundEffect.description;
  }

  const handleSubmit = () => {
    const effect = { tier: 1, notes: "", ...selectedEffect };
    selectedEffects.update((n) => [...n, effect]);
    selectedEffect = null;
    selectedDescription = null;
  };

  const deleteEffect = (effect) => {
    selectedEffects.update((n) => n.filter((m) => m.name !== effect.name));
  };
</script>

<div class="mt-20">
  <h2 class="text-xl">3. Add Effects</h2>

  <form on:submit|preventDefault={handleSubmit}>
    <select
      bind:value={selectedEffect}
      class="mt-1 block w-96 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
    >
      {#each availableEffects as effect}
        <option value={effect} disabled={!effect.domains.includes($selectedDomain)}>
          {effect.name}
        </option>
      {/each}
    </select>
    {#if selectedDescription}
      <p class="mt-2 bg-gray-50 rounded-lg py-5 px-6 mb-4 text-sm text-gray-500 mb-3">{selectedDescription}</p>
    {/if}

    <button
      disabled={!selectedEffect}
      type="submit"
      class="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Add Effect
    </button>
  </form>

  <table class="mt-2 min-w-full divide-y divide-gray-300">
    <thead class="bg-gray-50">
      <tr>
        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Effect</th>
        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Tier</th>
        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Notes</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200 bg-white">
      {#each $selectedEffects as effect}
        <tr>
          <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{effect.name}</td>
          <td>
            {#if effect.hasTiers}
              <select
                bind:value={effect.tier}
                class="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                {#each range(1, 50, 1) as i}
                  <option value={i}>{i}</option>
                {/each}
              </select>
            {/if}
          </td>
          <td>
            <textarea
              bind:value={effect.notes}
              class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="notes"
            />
          </td>
          <td>
            <button class="mt-1" on:click={() => deleteEffect(effect)}>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
