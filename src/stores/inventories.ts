import { getInventories, getInventoryById } from "../services";
import { defineStore } from "pinia";
import type { Inventory } from "./types";
import * as Constants from "../common/constants";

export const useInventoriesStore = defineStore({
  id: "inventories",
  state: () => ({
    inventories: [] as Array<Inventory>,
    inventory: {} as Inventory,
    edit: { status: false },
    filter: Constants.IN_STOCK,
  }),
  getters: {
    getFiltered(state) {
      if (state.filter === Constants.IN_STOCK) {
        return state.inventories.filter((i) => {
          return i.is_sold === false;
        });
      } else if (state.filter === Constants.ALL) {
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
      const idx = this.inventories.findIndex((i) => i.id == id);
      this.inventories[idx].is_sold = true;
    },
  },
});
