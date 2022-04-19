import axios from "axios";
import { defineStore } from "pinia";

export type Model = {
  id: number;
  brand: string;
  name: string;
  year: number;
  display: number;
};

export type Inventory = {
  id: number;
  model: Model;
  os_version: string;
  memory_size: number;
  color: string;
  condition: string;
  price: number;
  is_sold: boolean;
  warranty_expiry: string;
  images: Array<string>;
};

const BASE_URL = "http://localhost:3000/inventories";

export const useInventoriesStore = defineStore({
  id: "inventories",
  state: () => ({
    inventories: [] as Inventory[],
    inventory: {} as Inventory,
    edit: { status: false, id: null },
  }),
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
    async addInventory() {
      await axios.post(BASE_URL, {});
    },
  },
});
