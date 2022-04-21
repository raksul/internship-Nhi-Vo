<script setup lang="ts">import { useBrandStore } from '@/stores/brands';
import { reactive, ref, watch } from 'vue';
import { useInventoriesStore } from "../stores/inventories";
import Autocomplete from "./Autocomplete.vue";

import { variants } from "@/data/variants.json"
import type { Brand, Model, OS } from '@/stores/types';

// type MemorySize = 64 | 128 | 256 | 512

const { fetchData } = useBrandStore()

const brandStore = useBrandStore()
const inventoryStore = useInventoriesStore()

const brands = ref([] as Array<Brand>)
const models = ref([] as Array<Model>)
const os_versions = ref([] as Array<OS>)

const brand = ref({} as Brand)
const model = ref({} as Model)
const os = ref({} as OS)

fetchData().then(() => brandStore.brands.forEach((brand) => {
    brands.value.push(brand)
}))

const getModelsByBrand = (id: number) => {
    let brand = variants.find(i => {
        return i.id === id
    })

    if (brand) {
        models.value = brand.models
    }

    console.log(models.value)
}

const getOSByBrand = (id: number) => {
    let brand = variants.find(i => {
        return i.id === id
    })

    if (brand) {
        os_versions.value = brand.os_version
    }

    console.log(os_versions.value)
}

watch(
    () => brand.value.id,
    () => {
        getModelsByBrand(brand.value.id)
        getOSByBrand(brand.value.id)
    },
    { deep: true }
)

const formData = {
    model: null,
    memory_size: null,
    os_version: null,
    color: null,
    price: null,
    warranty_date: new Date(Date.now()).toISOString().slice(0, 10),
    condition: null,
    images: []
}

</script>

<template>
    <div class="wrapper">
        <h2 class="title">
            <slot name="title" class="title"></slot>
        </h2>
        <form>
            <div class="input-group">
                <span class="label">Brand</span>
                <Autocomplete :items="brands" v-model="brand" />
            </div>
            <div class="input-group">
                <span class="label">Model</span>
                <Autocomplete :items="models" v-model="model" />
            </div>
            <div class="input-group">
                <span class="label">Memory Size</span>
                <input type="number">
            </div>
            <div class="input-group">
                <span class="label">OS Version</span>
                <Autocomplete :items="os_versions" v-model="os" />
            </div>
            <div class="input-group">
                <span class="label">Color</span>
                <input type="text">
            </div>
            <div class="input-group">
                <span class="label">Price</span>
                <input type="number">
            </div>
            <div class="input-group">
                <span class="label">Warranty</span>
                <input type="date">
            </div>
            <div class="input-group">
                <span class="label">Condition</span>
                <input type="text">
            </div>
            <div class="input-group image-upload">
                <span class="label">Image</span>
                <input type="file">
            </div>

            <div class="btn-container">
                <div>
                    <router-link to="/"><button class="btn-back">Back</button></router-link>
                    <button class="btn-delete">Delete</button>
                </div>

                <button v-if="!inventoryStore.edit.status" class="btn-save">Add</button>
                <button v-else class="btn-save">Save</button>
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
    margin-bottom: 10px;
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
        padding: 0px
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
</style>

