<script>
  import Meta from "../components/Meta.svelte";
  import Calculation from "../components/Calculation.svelte";
  import Modifiers from "../components/Modifiers.svelte";
  import Effects from "../components/Effects.svelte";
  import logo from "../../assets/logo.png";
</script>

<main class="container mx-auto grid mt-4 mb-20 px-10">
  <h1 class="text-3xl  place-self-center">Spell Calculator</h1>
  <Meta />
  <Modifiers />
  <Effects />
  <Calculation />
</main>

<style>
</style>
