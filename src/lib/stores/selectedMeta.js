
import { persistedStore } from './persistedStore';

export const name = persistedStore("name")
export const description = persistedStore("description");
export const selectedDomain = persistedStore("selectedDomain");
export const selectedMode = persistedStore("selectedMode");
export const SPCost = persistedStore("SPCost");
export const isAlchemy = persistedStore("isAlchemy", false);
export const isRunesmith = persistedStore("IsRunesmith", false);
export const user_id = persistedStore("user_id");
export const id = persistedStore("id");
export const isPublic = persistedStore("isPublic", false)
