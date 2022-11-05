<script>
  import { Datatable } from "svelte-simple-datatables";
  import { supabase } from "../supabaseClient";

  // datatable
  let loading = true;
  const settings = { columnFilter: true };
  let rows;
  let spells = [];

  async function getSpells() {
    try {
      loading = true;
      const {
        data: { user },
      } = await supabase.auth.getUser();

      supabase
        .from("spells")
        .select(`id, inserted_at, name`)
        .eq("user_id", user.id)
        .order("inserted_at", { ascending: false })
        .then(({ data, error, status }) => {
          if (data) {
            spells = data;
          }
          if (error && status !== 406) throw error;
        });
    } catch (error) {
      alert(error.message);
    } finally {
      loading = false;
    }
  }

  async function generateSpell() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const spell = { name: "New Spell", user_id: user.id };
    let { data, error } = await supabase.from("spells").insert(spell).select();
    if (error) throw error;
    window.location.href = `/spells/${data[0].id}`;
  }

  getSpells();
</script>

<button
  on:click={generateSpell}
  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  disabled={loading}>New Spell</button
>
<hr class="my-8" />

<h1 class="text-2xl font-bold mb-4">Spells</h1>
{#if !loading}
  <Datatable {settings} data={spells} bind:dataRows={rows}>
    <thead>
      <th data-key="name">Name</th>
      <th data-key="inserted_at">Created At</th>
    </thead>
    <tbody>
      {#if rows}
        {#each $rows as row}
          <tr>
            <td><a href={`/spells/${row.id}`}>{row.name}</a></td>
            <td>{new Date(row.inserted_at).toLocaleString()}</td>
          </tr>
        {/each}
      {/if}
    </tbody>
  </Datatable>
{/if}
