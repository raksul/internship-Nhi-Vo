import axios from "axios";
import { defineStore } from "pinia";

export type Brand = {
  id: number;
  name: string;
};

const BASE_URL = "http://localhost:3000/brands";

export const useBrandStore = defineStore({
  id: "brand",
  state: () => ({
    brands: [] as Brand[],
    brand: "",
    option: {} as Brand,
  }),
  actions: {
    async fetchData() {
      await axios
        .get(BASE_URL)
        .then((res) => (this.brands = res.data))
        .catch((err) => console.log(err));
    },
    async fetchDataById(id: number) {
      await axios
        .get(`${BASE_URL}/${id}`)
        .then((res) => (this.brand = res.data))
        .catch((err) => console.log(err));
    },
    async addBrand() {
      await axios.post(BASE_URL, {});
    },
  },
});
