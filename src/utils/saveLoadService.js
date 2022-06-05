// @ts-nocheck

import { get } from 'svelte/store';
import * as meta from "../stores/selectedMeta.js";
import * as modifiers from "../stores/selectedModifiers.js";
import * as effects from "../stores/selectedEffects.js";

export const saveSpell = () => {
  const { name, description, selectedDomain, selectedMode } = meta;
  const { selectedModifiers } = modifiers;
  const { selectedEffects } = effects;

  const spell = {
    name: get(name),
    description: get(description),
    domain: get(selectedDomain),
    mode: get(selectedMode),
    modifiers: get(selectedModifiers),
    effects: get(selectedEffects)
  };

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(spell));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", get(name) + ".json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

export const loadSpell = () => {
  const uploadNode = document.createElement("input")
  uploadNode.setAttribute("type", "file");

  uploadNode.addEventListener("change", (e) => {
    const fileList = e.target.files;
    if (fileList.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.addEventListener("load", e => {
        const data = reader.result
        const spell = JSON.parse(data);
        setSpell(spell)
      });

      reader.readAsText(file)
    }
  });

  uploadNode.click();
}

const setSpell = (spell) => {
  meta.name.set(spell.name);
  meta.description.set(spell.description);
  meta.selectedDomain.set(spell.domain);
  meta.selectedMode.set(spell.mode);
  modifiers.selectedModifiers.set(spell.modifiers);
  effects.selectedEffects.set(spell.effects);
}