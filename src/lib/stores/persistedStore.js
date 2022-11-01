// @ts-nocheck
import { writable } from 'svelte/store';

export const persistedStore = (key, defaut = "") => {
  const storedVal = JSON.parse(localStorage.getItem(key)) || defaut;
  const store = writable(storedVal);
  store.subscribe(value => {
    localStorage.setItem(key, JSON.stringify(value));
  });

  return store;
};
