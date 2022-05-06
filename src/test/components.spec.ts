import { createTestingPinia } from "@pinia/testing";
import { shallowMount } from "@vue/test-utils";
import { setActivePinia } from "pinia";

import InventoryList from "../components/InventoryList.vue";
import Autocomplete from "../components/Autocomplete.vue";
import InventoryFilters from "../components/InventoryFilters.vue";
import ImageCarousel from "../components/ImageCarousel.vue";
import ProductModal from "../components/ProductModal.vue";
import Form from "../components/ProductForm.vue";

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
  const wrapper = shallowMount(ImageCarousel, {
    props: {
      images: ["https://picsum.photos/200", "https://picsum.photos/200"],
    },
  });
  it("renders correctly", () => {
    console.log(wrapper);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("product modal", () => {
  const wrapper = shallowMount(ProductModal, {
    props: {
      item: {
        id: 8,
        model: {
          id: 7,
          brand: {
            id: 2,
            name: "Samsung",
          },
          name: "Samsung A52",
          year: 2021,
          display: 6.5,
        },
        os_version: {
          id: 4,
          name: "Android 12",
        },
        memory_size: 128,
        color: {
          id: 4,
          name: "Purple",
        },
        condition: "Like new",
        price: 259,
        is_sold: false,
        warranty_expiry: "2021-12-31",
        images: [
          "https://i.imgur.com/jd2pfBl.jpg",
          "https://i.imgur.com/DuwY64M.jpg",
        ],
      },
    },
  });

  it("renders correctly", () => {
    console.log(wrapper);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("form", () => {
  const wrapper = shallowMount(Form, {
    props: {
      id: 1,
    },
  });

  it("renders correctly", () => {
    console.log(wrapper);
    expect(wrapper).toMatchSnapshot();
  });
});
