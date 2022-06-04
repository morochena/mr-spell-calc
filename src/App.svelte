<script>
  import Meta from "./lib/Meta.svelte";
  import Calculation from "./lib/Calculation.svelte";
  import Modifiers from "./lib/Modifiers.svelte";
  import Effects from "./lib/Effects.svelte";
  import logo from "./assets/logo.png";
</script>

<main class="container mx-auto grid mt-4 mb-20">
  <img src={logo} alt="Logo" class="object-cover h-48 w-96 place-self-center" />
  <h1 class="text-3xl  place-self-center">Spell Calculator</h1>
  <Meta />
  <Modifiers />
  <Effects />
  <Calculation />
</main>

<style>
</style>
