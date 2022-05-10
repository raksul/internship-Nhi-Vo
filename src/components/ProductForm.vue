<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";

import type { Brand, Model, Option } from "../stores/types";
import { useInventoriesStore } from "../stores/inventories";

import {
  getInventoryById,
  saveInventory,
  updateInventory,
  deleteInventory,
  getColors,
  getBrands,
} from "../services/index";
import { uploadImage } from "../services/images";

import { variants } from "../data/variants.json";

import AutoComplete from "./AutoComplete.vue";

const memorySizes = [64, 128, 256, 512];
const conditions = ["Like new", "Well used", "Heavily used"];

const inventoryStore = useInventoriesStore();

const brands = ref([] as Array<Brand>);
const models = ref([] as Array<Model>);
const os_versions = ref([] as Array<Option>);
const colors = ref([] as Array<Option>);

const brand = ref({} as Brand);
const image = ref("");

const router = useRouter();

const props = defineProps(["id"]);

const loading = ref(true);

const errors = ref(new Map<string, string>());

let formData = reactive({
  id: null,
  model: {} as Model,
  os_version: {} as Option,
  memory_size: "" as number | string,
  color: {} as Option,
  condition: "",
  price: null as number | null,
  is_sold: false,
  warranty_expiry: "",
  images: [] as Array<string>,
});

if (props.id && inventoryStore.edit.status === true) {
  getInventoryById(props.id).then((res) => {
    brand.value = res.data.model.brand;
    formData.model = res.data.model;
    formData.color = res.data.color;
    formData.os_version = res.data.os_version;
    formData.memory_size = res.data.memory_size;
    formData.condition = res.data.condition;
    formData.price = res.data.price;
    formData.warranty_expiry = res.data.warranty_expiry;
    formData.images = res.data.images;

    loading.value = false;
  });
} else {
  loading.value = false;
}

const getModelsByBrand = (id: number) => {
  let brand = variants.find((i) => {
    return i.id === id;
  });

  if (brand) {
    models.value = brand.models;
  }
};

const getOSByBrand = (id: number) => {
  let brand = variants.find((i) => {
    return i.id === id;
  });

  if (brand) {
    os_versions.value = brand.os_version;
  }
};

watch(
  () => brand.value,
  () => {
    getModelsByBrand(brand.value.id);
    getOSByBrand(brand.value.id);
  },
  { deep: true }
);

watch(
  () => formData.model.name,
  () => {
    if (formData.model.name) {
      errors.value.delete("model");
    }
  }
);

watch(
  () => formData.os_version.name,
  () => {
    if (formData.os_version.name) {
      errors.value.delete("os_version");
    }
  }
);

watch(
  () => formData.color.name,
  () => {
    if (formData.color.name) {
      errors.value.delete("color");
    }
  }
);

getBrands().then((res) => (brands.value = res.data));

getColors()
  .then((res) => (colors.value = res.data))
  .catch((err) => console.log(err));

const onFileChange = (e: Event) => {
  let file = (e.target as HTMLInputElement).files?.[0] as Blob;

  if (file) {
    uploadImage(file)
      .then((res) => {
        image.value = res.data.data.link;
        formData.images.push(image.value);
      })
      .catch((err) => {
        alert("Cannot upload image. Please try again");
        console.log(err);
      });
  }
};

const removeImage = async (index: number) => {
  formData.images.splice(index, 1);
};

const checkInput = () => {
  if (Object.keys(formData.model).length === 0) {
    errors.value.set("model", "Please select a valid model");
  }
  if (Object.keys(formData.color).length === 0) {
    errors.value.set("color", "Please select a color");
  }
  if (Object.keys(formData.os_version).length === 0) {
    errors.value.set("os_version", "Please select an OS version");
  }
  if (!formData.memory_size) {
    errors.value.set("memory_size", "Please select a memory size");
  }
  if (!formData.price) {
    errors.value.set("price", "Please enter a price");
  }
  if (formData.price && formData.price < 0) {
    errors.value.set("price", "Price cannot be negative");
  }
  if (formData.condition === "") {
    errors.value.set("condition", "Please select a condition");
  }
  if (formData.warranty_expiry === "") {
    errors.value.set(
      "warranty_expiry",
      "Please select the warranty expiry date"
    );
  }
};

const addItem = () => {
  errors.value.clear;
  checkInput();
  if (errors.value.size === 0) {
    saveInventory(formData)
      .then((res) => {
        if (res.status === 201) {
          alert("Inventory added successfully");
          router.push("/");
        }
      })
      .catch((err) => console.log(err));
  }
};

const updateItem = (id: string) => {
  errors.value.clear();
  checkInput();
  if (errors.value.size === 0) {
    updateInventory(id, formData)
      .then((res) => {
        if (res.status === 200) {
          alert("Update successfully");
          router.push("/");
        }
      })
      .catch((err) => console.log(err));
  }
};

const deleteItem = (id: string) => {
  if (
    confirm(
      "Are you sure you want to delete this item? This action cannot be undone"
    )
  ) {
    deleteInventory(id)
      .then((res) => {
        if (res.status === 200) {
          alert("Item deleted");
          router.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const back = () => {
  if (
    confirm(
      "Are you sure you want to return to homepage? You will lose your data"
    )
  ) {
    router.push("/");
  }
};
</script>

<template>
  <div class="wrapper" v-if="!loading">
    <h2 class="title">
      <slot name="title" class="title"></slot>
    </h2>
    <form @submit.prevent>
      <div class="input-group">
        <span class="label">Brand</span>
        <AutoComplete
          :items="brands"
          v-model="brand"
          :value="brand.name ? brand.name : null"
          placeholder="Apple"
        />
      </div>
      <div class="input-group">
        <span class="label">Model</span>
        <AutoComplete
          :items="models"
          v-model="formData.model"
          :value="formData.model.name ? formData.model.name : null"
          :brand="brand"
          :className="errors.has('model') ? 'on-error' : undefined"
          placeholder="iPhone 11"
        />
        <p class="error-text" v-if="errors.has('model')">
          {{ errors.get("model") }}
        </p>
      </div>
      <div class="input-group">
        <span class="label">Memory Size</span>
        <div class="select">
          <select
            v-model="formData.memory_size"
            :class="{ 'on-error': errors.has('memory_size') }"
            @change="errors.delete('memory_size')"
          >
            <option value disabled selected>--- Choose option ---</option>
            <option
              v-for="(memorySize, index) in memorySizes"
              :value="memorySize"
              :key="index"
            >
              {{ memorySize }}
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
        <p class="error-text" v-if="errors.has('condition')">
          {{ errors.get("condition") }}
        </p>
      </div>
      <div class="input-group">
        <span class="label">OS Version</span>
        <AutoComplete
          :items="os_versions"
          v-model="formData.os_version"
          :value="formData.os_version.name ? formData.os_version.name : null"
          :brand="brand"
          :className="errors.has('os_version') ? 'on-error' : undefined"
          placeholder="iOS 14"
        />
        <p class="error-text" v-if="errors.has('os_version')">
          {{ errors.get("os_version") }}
        </p>
      </div>
      <div class="input-group">
        <span class="label">Color</span>
        <AutoComplete
          :items="colors"
          v-model="formData.color"
          :value="formData.color.name ? formData.color.name : null"
          :className="errors.has('color') ? 'on-error' : undefined"
          placeholder="Red"
        />
        <p class="error-text" v-if="errors.has('color')">
          {{ errors.get("color") }}
        </p>
      </div>
      <div class="input-group">
        <span class="label">Price (USD)</span>
        <input
          type="number"
          v-model="formData.price"
          min="0"
          ref="input"
          :class="{ 'on-error': errors.has('price') }"
          placeholder="999"
          @input="errors.delete('price')"
        />
        <p class="error-text" v-if="errors.has('price')">
          {{ errors.get("price") }}
        </p>
      </div>
      <div class="input-group">
        <span class="label">Warranty</span>
        <input
          type="date"
          v-model="formData.warranty_expiry"
          :class="{ 'on-error': errors.has('warranty_expiry') }"
          @input="errors.delete('warranty_expiry')"
        />
        <p class="error-text" v-if="errors.has('warranty_expiry')">
          {{ errors.get("warranty_expiry") }}
        </p>
      </div>
      <div class="input-group">
        <span class="label">Condition</span>
        <div class="select">
          <select
            v-model="formData.condition"
            :class="{ 'on-error': errors.has('condition') }"
            @change="errors.delete('condition')"
          >
            <option value="" disabled selected>--- Choose option ---</option>
            <option
              v-for="(condition, index) in conditions"
              :value="condition"
              :key="index"
            >
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
        <p class="error-text" v-if="errors.has('condition')">
          {{ errors.get("condition") }}
        </p>
      </div>
      <div class="input-group image-upload">
        <span class="label">Image</span>
        <input type="file" name="image" @input="onFileChange" />
        <div v-if="formData.images.length > 0" class="previews-container">
          <div
            class="preview"
            v-for="(image, index) in formData.images"
            :key="index"
          >
            <button class="btn-remove-img" @click="removeImage(index)">
              <span>&times;</span>
            </button>
            <img :src="image" style="margin-inline-end: 10px" />
            <!-- <button @click="removeImage(index)">Remove</button> -->
          </div>
        </div>
      </div>
      <div class="btn-container">
        <div>
          <button class="btn-back" @click="back">Back</button>
          <button
            v-if="inventoryStore.edit.status"
            class="btn-delete"
            @click="deleteItem(props.id)"
          >
            Delete
          </button>
        </div>

        <button
          v-if="!inventoryStore.edit.status"
          class="btn-save"
          @click="addItem"
        >
          Add
        </button>
        <button v-else class="btn-save" @click="updateItem(props.id)">
          Save
        </button>
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

.on-error {
  border: 2px solid var(--text-danger) !important;
}

.previews-container {
  display: flex;
  flex-wrap: wrap;
}

.preview img {
  margin-top: 10px;
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.btn-remove-img {
  position: absolute;
  background: transparent;
  color: #fff;
  opacity: 0.5;
  top: -8px;
  right: 0;
  z-index: 999;
  font-size: 30px;
}

.btn-remove-img:hover {
  color: #ff2828;
  opacity: 2;
}

.btn-container {
  margin-top: 15px;
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

.error-text {
  color: var(--text-danger);
  margin-top: 10px;
}
</style>
