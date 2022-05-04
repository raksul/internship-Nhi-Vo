import { getBrandById, getBrands } from "@/services";
import { defineStore } from "pinia";
import type { Brand } from "./types";

export const useBrandStore = defineStore({
  id: "brand",
  state: () => ({
    brands: [] as Brand[],
    brand: "",
    option: {} as Brand,
  }),
  actions: {
    async getBrands() {
      await getBrands()
        .then((res) => (this.brands = res.data))
        .catch((err) => console.log(err));
    },
    async getBrandById(id: string) {
      await getBrandById(id)
        .then((res) => (this.brand = res.data))
        .catch((err) => console.log(err));
    },
  },
});
