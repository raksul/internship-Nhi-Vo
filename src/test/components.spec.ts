import { createTestingPinia } from "@pinia/testing";
import { shallowMount } from "@vue/test-utils";
import { setActivePinia } from "pinia";

import InventoryList from "../components/InventoryList.vue";
import Autocomplete from "../components/Autocomplete.vue";
import InventoryFilters from "../components/InventoryFilters.vue";
import ImageCarousel from "../components/ImageCarousel.vue";

const pinia = createTestingPinia();

beforeEach(() => {
  setActivePinia(pinia);
});

describe("inventories list", () => {
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

describe("image slider", () => {
  const wrapper = shallowMount(ImageCarousel);

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
