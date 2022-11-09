// @ts-nocheck

import { get } from 'svelte/store';
import * as effects from "../stores/selectedEffects.js";
import * as meta from "../stores/selectedMeta.js";
import * as modifiers from "../stores/selectedModifiers.js";
import { supabase } from "../supabaseClient";
import Toastify from 'toastify-js'


export const saveSpell = async () => {
  const { name, description, selectedDomain, selectedMode, id, isPublic } = meta;
  const { selectedModifiers } = modifiers;
  const { selectedEffects } = effects;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const spell = {
    id: get(id),
    name: get(name),
    user_id: user.id,
    is_public: get(isPublic),
    spell_data: {
      description: get(description),
      domain: get(selectedDomain),
      mode: get(selectedMode),
      modifiers: get(selectedModifiers),
      effects: get(selectedEffects),
    }
  };

  if (!spell.id || !name) {
    return;
  }


  const { error } = await supabase.from("spells").upsert(spell);

  if (!error) {
    Toastify({
      text: "Spell saved!",
      duration: 3000
    }).showToast();
  }
}

export const loadSpell = async (spell_id) => {
  await supabase.auth.getUser();
  const { data, error, status } = await supabase.from("spells").select(`*`).single().eq("id", spell_id);

  if (data) {
    const spell = data;
    setSpell(spell);
  }

  if (error && status !== 406) throw error;
}

export const loadLocalSpell = () => {
  const uploadNode = document.createElement("input")
  uploadNode.setAttribute("type", "file");
  uploadNode.setAttribute("accept", "application/json");

  uploadNode.addEventListener("change", (e) => {
    const fileList = e.target.files;
    if (fileList.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.addEventListener("load", e => {
        const data = reader.result
        const spell = JSON.parse(data);
        setLocalSpell(spell)
      });

      reader.readAsText(file)
    }
  });

  uploadNode.click();
}

const setSpell = (spell) => {
  meta.isPublic.set(spell.is_public);
  meta.name.set(spell.name);
  meta.id.set(spell.id)
  meta.description.set(spell.spell_data.description);
  meta.selectedDomain.set(spell.spell_data.domain);
  meta.selectedMode.set(spell.spell_data.mode);
  modifiers.selectedModifiers.set(spell.spell_data.modifiers || []);
  effects.selectedEffects.set(spell.spell_data.effects || []);
}

const setLocalSpell = (spell) => {
  meta.name.set(spell.name);
  meta.description.set(spell.description);
  meta.selectedDomain.set(spell.domain);
  meta.selectedMode.set(spell.mode);
  modifiers.selectedModifiers.set(spell.modifiers);
  effects.selectedEffects.set(spell.effects);
}
