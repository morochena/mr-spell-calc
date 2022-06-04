
import { persistedStore } from './persistedStore';

export const name = persistedStore("name")
export const description = persistedStore("description");
export const selectedDomain = persistedStore("selectedDomain");
export const selectedMode = persistedStore("selectedMode");