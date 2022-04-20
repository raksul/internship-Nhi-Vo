import { defineStore } from "pinia";

export type Option = {
  id: number;
  name: string;
};

export const useOptionStore = defineStore({
  id: "option",
  state: () => ({
    option: {} as Option,
  }),
  actions: {},
});
