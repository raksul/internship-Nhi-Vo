import { createTestingPinia } from "@pinia/testing";
import { shallowMount } from "@vue/test-utils";
import { setActivePinia } from "pinia";

import InventoryList from "../components/InventoryList.vue";
import Autocomplete from "../components/Autocomplete.vue";
import InventoryFilters from "../components/InventoryFilters.vue";
import ProductModal from "../components/ProductModal.vue";

describe("inventories list", () => {
  const pinia = createTestingPinia();
  setActivePinia(pinia);

  const wrapper = shallowMount(InventoryList, {
    global: {
      plugins: [pinia],
    },
  });

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("inventory filters", () => {
  const wrapper = shallowMount(InventoryFilters);

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("autocomplete", () => {
  const wrapper = shallowMount(Autocomplete);

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("product modal", () => {
  const wrapper = shallowMount(ProductModal);

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
