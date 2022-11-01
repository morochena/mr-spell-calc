<script>
  import { description, isAlchemy, isRunesmith, name, selectedDomain, selectedMode } from "../stores/selectedMeta.js";
  import { supabase } from "../supabaseClient";
  import { saveSpell, loadLocalSpell } from "../utils/saveLoadService.js";

  export let spell_id;

  let domains = [`Sorcery`, `Fire`, `Water`, `Earth`, `Air`, `Necromancy`, `Holy`, `Mind`, `Illusion`, `Nature`];
  let modes = [`Spell`, `Unpredicable`, `Stable`, `Imbue`];

  const save = () => {
    saveSpell();
  };

  const load = () => {
    loadLocalSpell();
  };

  const deleteSpell = async () => {
    if (confirm("Are you sure?")) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { error } = await supabase.from("spells").delete().eq("id", spell_id);

      if (!error) {
        window.location.href = "/";
      }
    }
  };
</script>

<div class="flex justify-end">
  <button
    on:click={save}
    class="mt-2 mr-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 justify-self-end"
    >Save</button
  >

  <button
    on:click={load}
    class="mt-2 mr-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 justify-self-end"
    >Load</button
  >

  <button
    on:click={deleteSpell}
    class="mt-2 mr-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 justify-self-end"
    >Delete</button
  >
</div>

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
  <div class="mt-2">
    <div class="flex">
      <div>
        <div class="form-check">
          <input
            class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="checkbox"
            value=""
            id="alchemy"
            bind:checked={$isAlchemy}
          />
          <label class="form-check-label inline-block text-gray-800" for="alchemy"> Alchemy </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="checkbox"
            value=""
            id="runesmithing"
            bind:checked={$isRunesmith}
          />
          <label class="form-check-label inline-block text-gray-800" for="runesmithing"> Runesmithing </label>
        </div>
      </div>
    </div>
  </div>
</div>
