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
    setEditStatus(status: boolean) {
      this.edit.status = status;
    },
    markAsSold(id: number) {
      const idx = this.inventories.findIndex((i) => i.id === id);
      if (idx) {
        this.inventories[idx].is_sold = true;
      }
    },
  },
});
