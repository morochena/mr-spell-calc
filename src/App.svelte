<script>
  import { user } from "./lib/stores/sessionStore";
  import { supabase } from "./lib/supabaseClient";

  import { Router, Link, Route } from "svelte-routing";
  import Home from "./lib/pages/Home.svelte";
  import Show from "./lib/pages/Show.svelte";
  import Auth from "./lib/pages/Auth.svelte";
  import logo from "./assets/logo.png";

  const setSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      user.set(session.user);
    }
  };

  supabase.auth.onAuthStateChange((_, session) => {
    user.set(session.user);
  });

  let url = "";

  setSession();
</script>

<main class="container mx-auto grid mt-4 mb-20 px-10">
  <a href="/" class="place-self-center">
    <img
      src={logo}
      alt="Logo"
      class="object-cover h-48 w-96 place-self-center"
    />
  </a>

  <div class="flex w-full flex-col items-center justify-center my-8">
    <p class="text-red-500 text-center">
      Note: This version of the app is <strong>deprecated</strong>. Please go to
      the new app: <a href="https://mr-calc.pages.dev">Here</a>.
    </p>
  </div>

  {#if $user}
    <Router {url}>
      <div>
        <Route path="/"><Home /></Route>
        <Route path="/spells/:id" let:params><Show id={params.id} /></Route>
      </div>
    </Router>
  {:else}
    <Auth />
  {/if}
</main>
