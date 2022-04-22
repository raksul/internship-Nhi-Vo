import axios from "axios";
import { defineStore } from "pinia";
import type { Inventory } from "./types";
import Fuse from "fuse.js";

const BASE_URL = "http://localhost:3000/inventories";

export const useInventoriesStore = defineStore({
  id: "inventories",
  state: () => ({
    inventories: [] as Inventory[],
    inventory: {} as Inventory,
    edit: { status: false, id: null },
    filters: [],
  }),
  getters: {
    getFilteredInventories(state) {},
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
  },
});
