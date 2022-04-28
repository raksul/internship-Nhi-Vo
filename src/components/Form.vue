<script setup lang="ts">
import { useBrandStore } from "@/stores/brands";
import { reactive, ref, watch } from "vue";
import { useInventoriesStore } from "../stores/inventories";
import Autocomplete from "./Autocomplete.vue";

import { variants } from "@/data/variants.json";
import type { Brand, Model, Option } from "@/stores/types";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

const memorySizes = [64, 128, 256, 512];
const conditions = ["Like new", "Well used", "Heavily used"];

const brandStore = useBrandStore();
const inventoryStore = useInventoriesStore();

const { fetchData } = useBrandStore();

const brands = ref([] as Array<Brand>);
const models = ref([] as Array<Model>);
const os_versions = ref([] as Array<Option>);
const colors = ref([] as Array<Option>);

const brand = ref({} as Brand);
const image = ref("");

const route = useRoute()
const router = useRouter()

let formData = {
  id: null,
  model: {} as Model,
  os_version: {} as Option,
  memory_size: null as number | null,
  color: {} as Option,
  condition: "",
  price: null as number | null,
  is_sold: false,
  warranty_expiry: "",
  images: [] as Array<string>,
}


const getModelsByBrand = (id: number) => {
  let brand = variants.find((i) => {
    return i.id === id;
  });

  if (brand) {
    models.value = brand.models;
  }

  // console.log(models.value)
};

const getOSByBrand = (id: number) => {
  let brand = variants.find((i) => {
    return i.id === id;
  });

  if (brand) {
    os_versions.value = brand.os_version;
  }

  // console.log(os_versions.value)
};


watch(
  () => brand.value.id,
  () => {
    getModelsByBrand(brand.value.id);
    getOSByBrand(brand.value.id);
  }
);

if (route.params.id) {

  let i_id = parseInt(route.params.id[0])

  inventoryStore.edit.status = true;

  let inventory = inventoryStore.inventories.find((i) => {
    return i.id === i_id;
  });

  if (inventory) {
    brand.value = inventory.model.brand
    formData = JSON.parse(JSON.stringify(inventory));
  }
}

const state = reactive({
  url: [] as Array<string>,
});

fetchData().then(() =>
  brandStore.brands.forEach((brand) => {
    brands.value.push(brand);
  })
);

axios
  .get(`http://localhost:3000/colors/`)
  .then((res) => (colors.value = res.data))
  .catch((err) => console.log(err));

const config = {
  headers: {
    Authorization: "Client-ID b824a3f2d3cab53",
    Accept: "application/json",
  },
};

const onFileChange = (e: Event) => {
  let file = (e.target as HTMLInputElement).files![0];

  if (file) {
    state.url.pop();
    state.url.push(URL.createObjectURL(file));

    axios
      .post(`https://api.imgur.com/3/image`, file, config)
      .then((res) => {
        console.log(res.data.data.link);
        image.value = res.data.data.link;
      })
      .catch((err) => console.log(err));
  }
};

const addInventory = async () => {
  formData.images.push(image.value);

  await axios
    .post(`http://localhost:3000/inventories`, formData)
    .then((res) => {
      if (res.status === 201) {
        alert("Inventory added successfully")
        router.push("/")
      }
    })
    .catch((err) => console.log(err));

};

const updateInventory = async (id: string) => {
  await axios.put(`http://localhost:3000/inventories/${id}`, formData)
    .then(res => {
      if (res.status === 200) {
        alert("Update successfully")
        router.push("/")
      }
    })
    .catch(err => console.log(err))
}

</script>

<template>
  <div class="wrapper">
    <h2 class="title">
      <slot name="title" class="title"></slot>
    </h2>
    <form @submit.prevent>
      <div class="input-group">
        <span class="label">Brand</span>
        <Autocomplete :items="brands" v-model="brand" :value="brand.name" />
      </div>
      <div class="input-group">
        <span class="label">Model</span>
        <Autocomplete :items="models" v-model="formData.model" :value="formData.model.name" />
      </div>
      <div class="input-group">
        <span class="label">Memory Size</span>
        <div class="select">
          <select name="memory_sizes" id="memory_sizes" class="custom-select" v-model="formData.memory_size">
            <option disabled selected>--- Choose option ---</option>
            <option v-for="(memory, index) in memorySizes" :value="memory" :key="index">
              {{ memory }}GB
            </option>
          </select>
          <svg>
            <use xlink:href="#select-arrow-down"></use>
          </svg>
        </div>
        <svg class="sprites">
          <symbol id="select-arrow-down" viewbox="0 0 10 6">
            <polyline points="1 1 5 5 9 1"></polyline>
          </symbol>
        </svg>
      </div>
      <div class="input-group">
        <span class="label">OS Version</span>
        <Autocomplete :items="os_versions" v-model="formData.os_version" :value="formData.os_version.name" />
      </div>
      <div class="input-group">
        <span class="label">Color</span>
        <Autocomplete :items="colors" v-model="formData.color" :value="formData.color.name" />
      </div>
      <div class="input-group">
        <span class="label">Price</span>
        <input type="number" v-model="formData.price" />
      </div>
      <div class="input-group">
        <span class="label">Warranty</span>
        <input type="date" v-model="formData.warranty_expiry" />
      </div>
      <div class="input-group">
        <span class="label">Condition</span>
        <div class="select">
          <select name="conditions" id="conditions" class="custom-select" v-model="formData.condition">
            <option disabled selected>--- Choose option ---</option>
            <option v-for="(condition, index) in conditions" :value="condition" :key="index">
              {{ condition }}
            </option>
          </select>
          <svg>
            <use xlink:href="#select-arrow-down"></use>
          </svg>
        </div>
        <svg class="sprites">
          <symbol id="select-arrow-down" viewbox="0 0 10 6">
            <polyline points="1 1 5 5 9 1"></polyline>
          </symbol>
        </svg>
      </div>
      <div class="input-group image-upload">
        <span class="label">Image</span>
        <input type="file" name="image" @change="onFileChange" />
        <div class="preview">
          <img v-if="state.url[0]" :src="state.url[0]" />
        </div>
      </div>
      <div class="btn-container">
        <div>
          <router-link to="/"><button class="btn-back">Back</button></router-link>
          <button v-if="inventoryStore.edit.status" class="btn-delete">
            Delete
          </button>
        </div>

        <button v-if="!inventoryStore.edit.status" class="btn-save" @click="addInventory">Add</button>
        <button v-else class="btn-save" @click="updateInventory($route.params.id)">Save</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.wrapper {
  width: 60vw;
  justify-self: center;
  border: 1px solid #d2d2d2;
  border-radius: 5px;
  padding: 20px;
  margin: 50px auto;
}

.title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.wrapper form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px;
}

.input-group {
  flex-basis: 50%;
  padding: 20px 20px 20px 0px;
}

.input-group input {
  width: 100%;
  padding: 15px;
  margin-top: 10px;
  font-size: 1rem;
  border: 2px solid #d2d2d2;
  border-radius: 10px;
}

.input-group input:focus {
  border: 2px solid var(--primary-color);
}

.image-upload input {
  border: 2px solid var(--primary-color);
}

.preview img {
  margin-top: 10px;
  width: 100px;
}

.btn-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  padding: 14px;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
}

.btn-save {
  background-color: var(--primary-color);
}

.btn-save:hover {
  background-color: #91b2ff;
}

.btn-back {
  background-color: #c7c7c7;
}

.btn-back:hover {
  background-color: #d2d2d2;
}

.btn-delete {
  background-color: #fe8b8b;
  margin-left: 5px;
}

router-link {
  text-decoration: none;
  color: #fff;
}

@media (max-width: 900px) {
  .wrapper {
    width: 80vw;
    padding: 15px;
  }

  .wrapper form {
    padding: 0px;
  }

  .input-group {
    margin: 0;
    flex-basis: 100%;
    padding: 20px 0px 20px 0px;
  }

  .btn-container {
    width: 100%;
  }
}

.select {
  position: relative;
  min-width: 200px;
}

.select svg {
  position: absolute;
  right: 12px;
  top: 50%;
  width: 10px;
  height: 6px;
  stroke-width: 2px;
  stroke: #9098a9;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  pointer-events: none;
}

.select select {
  -webkit-appearance: none;
  width: 100%;
  padding: 15px;
  margin-top: 10px;
  font-size: 1rem;
  border: 2px solid #d2d2d2;
  border-radius: 10px;
  transition: all 150ms ease;
}

.sprites {
  position: absolute;
  width: 0;
  height: 0;
  padding: 15px;
  pointer-events: none;
  user-select: none;
}
</style>
