<script>
  import Calculation from "../components/Calculation.svelte";
  import Effects from "../components/Effects.svelte";
  import Meta from "../components/Meta.svelte";
  import Modifiers from "../components/Modifiers.svelte";
  import { loadSpell } from "../utils/saveLoadService";

  export let id;

  loadSpell(id);
</script>

<main class="container mx-auto grid mt-4 mb-20 px-10">
  <h1 class="text-3xl  place-self-center">Spell Calculator</h1>
  <Meta spell_id={id} />
  <Modifiers />
  <Effects />
  <Calculation />
</main>

<style>
</style>
