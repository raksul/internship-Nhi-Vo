import { getInventories, getInventoryById } from "../services";
import { defineStore } from "pinia";
import type { Inventory } from "./types";

export const useInventoriesStore = defineStore({
  id: "inventories",
  state: () => ({
    inventories: [] as Array<Inventory>,
    inventory: {} as Inventory,
    edit: { status: false },
    filter: "in-stock",
  }),
  getters: {
    getFiltered(state) {
      if (state.filter === "in-stock") {
        return state.inventories.filter((i) => {
          return i.is_sold === false;
        });
      } else if (state.filter === "all") {
        return state.inventories;
      }
    },
  },
  actions: {
    async fetchInventories() {
      await getInventories()
        .then((res) => (this.inventories = res.data))
        .catch((err) => console.log(err));
    },
    async fetchItemById(id: string) {
      await getInventoryById(id)
        .then((res) => (this.inventory = res.data))
        .catch((err) => console.log(err));
    },
    markAsSold(id: number) {
      this.inventories[id].is_sold = true;
    },
  },
});
