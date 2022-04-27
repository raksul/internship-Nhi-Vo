import axios from "axios";
import { defineStore } from "pinia";
import type { Inventory } from "./types";

const BASE_URL = "http://localhost:3000/inventories";

export const useInventoriesStore = defineStore({
  id: "inventories",
  state: () => ({
    inventories: [] as Inventory[],
    inventory: {} as Inventory,
    edit: { status: false, id: null },
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
    async fetchData() {
      await axios
        .get(BASE_URL)
        .then((res) => (this.inventories = res.data))
        .catch((err) => console.log(err));
    },
    async fetchDataById(id: number) {
      await axios
        .get(`${BASE_URL}/${id}`)
        .then((res) => (this.inventory = res.data))
        .catch((err) => console.log(err));
    },
    async updateInventory(id: number) {},
    markAsSold(id: number) {
      this.inventories[id].is_sold = true;
    },
  },
});
