import { createTestingPinia } from "@pinia/testing";
import { shallowMount } from "@vue/test-utils";
import { setActivePinia } from "pinia";

import InventoryList from "../components/InventoryList.vue";
import Autocomplete from "../components/Autocomplete.vue";
import InventoryFilters from "../components/InventoryFilters.vue";
import ImageCarousel from "../components/ImageCarousel.vue";
import ProductModal from "../components/ProductModal.vue";
import Form from "../components/ProductForm.vue";
import type { Inventory } from "@/stores/types";

const pinia = createTestingPinia();

const item = {
  id: 8,
  images: [
    "https://i.imgur.com/jd2pfBl.jpg",
    "https://i.imgur.com/DuwY64M.jpg",
  ],
};

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
    expect(wrapper.html()).toMatchSnapshot();
  });
});

describe("inventory filters", () => {
  const wrapper = shallowMount(InventoryFilters);

  it("renders correctly", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});

describe("autocomplete", () => {
  const wrapper = shallowMount(Autocomplete);

  it("renders correctly", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});

describe("image slider", () => {
  const wrapper = shallowMount(ImageCarousel, {
    props: {
      images: item.images,
    },
  });
  it("renders correctly", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});

describe("product modal", () => {
  const wrapper = shallowMount(ProductModal, {
    props: {
      item: item as Inventory,
    },
  });

  it("renders correctly", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});

describe("form", () => {
  const wrapper = shallowMount(Form, {
    props: {
      id: item.id,
    },
  });

  it("renders correctly", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
