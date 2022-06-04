<script>
  import { name, description, selectedDomain, selectedMode } from "../stores/selectedMeta.js";

  let domains = [`Sorcery`, `Fire`, `Water`, `Earth`, `Air`, `Necromancy`, `Holy`, `Mind`, `Illusion`, `Nature`];
  let modes = [`Spell`, `Unpredicable`, `Stable`, `Imbue`];

  const reset = () => {
    localStorage.clear();
    window.location.reload();
  };
</script>

<button
  on:click={reset}
  class="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 justify-self-end"
  >Reset All</button
>

<div class="w-96">
  <h2 class="text-xl">1. Meta</h2>

  <div>
    <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
    <input
      id="name"
      type="text"
      class="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
      bind:value={$name}
      placeholder="spell name"
    />
  </div>
  <div class="mt-2">
    <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
    <textarea
      id="description"
      class="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
      bind:value={$description}
      placeholder="spell description"
    />
  </div>
  <div class="mt-2">
    <label for="domain" class="block text-sm font-medium text-gray-700">Domain</label>
    <select
      bind:value={$selectedDomain}
      class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
    >
      {#each domains as domain}
        <option value={domain}>
          {domain}
        </option>
      {/each}
    </select>
  </div>

  <div class="mt-2">
    <label for="mode" class="block text-sm font-medium text-gray-700">Mode</label>
    <select
      bind:value={$selectedMode}
      class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
    >
      {#each modes as mode}
        <option value={mode}>
          {mode}
        </option>
      {/each}
    </select>
  </div>
</div>
