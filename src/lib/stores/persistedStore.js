// @ts-nocheck
import { writable } from 'svelte/store';

let timer;

export const persistedStore = (key, defaut = "") => {
  const storedVal = defaut;
  const store = writable(storedVal);

  store.subscribe(value => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      const { saveSpell } = await import("../utils/saveLoadService");
      saveSpell();
    }, 2000);
  });


  return store;
};
