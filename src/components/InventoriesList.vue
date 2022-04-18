<script setup lang="ts">
import { ref } from "vue"
import axios from "axios"

const BASE_URL = "http://localhost:3000/"

const labels = [
    "Image",
    "Brand",
    "Model",
    "Condition",
    "Memory Size",
    "Warranty Expiry",
    "Price",
    "Status",
    "Mark as sold",
];

const isShow = ref(false)
const inventories: any = ref([])
const currentItem: any = ref(null)

axios
    .get(BASE_URL + 'inventories')
    .then(res => {
        inventories.value = res.data
    })

const warrantyDisplay = (date: string) => {
    return Date.parse(date) < Date.now() ? "Expired" : date.substring(0, 10)
}

const showModal = (item: any) => {
    currentItem.value = item
    console.log(currentItem.value)
    isShow.value = true
}

const closeModal = () => {
    isShow.value = false
}

</script>

<template>
    <div class="wrapper">
        <table>
            <thead>
                <tr>
                    <th v-for="label in labels">
                        {{ label }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in inventories" :key="item.id" @click="showModal(item)">
                    <td><img class="thumbnail" :src="item.images[0]" alt=""></td>
                    <td>{{ item.model.brand }}</td>
                    <td>{{ item.model.name }}</td>
                    <td>{{ item.condition }}</td>
                    <td>{{ item.memory_size }}GB</td>
                    <td>{{ warrantyDisplay(item.warranty_expiry) }}</td>
                    <td>{{ item.price }}</td>
                    <td>{{ item.is_sold ? "Sold" : "In-stock" }}</td>
                    <td><button>Sold</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.wrapper {
    margin: 20px;
}

table {
    border: 1px solid #ccc;
    border-collapse: collapse;
    overflow: hidden;
    margin: 0;
    padding: 0;
    width: 100%;
    table-layout: fixed;
}

thead th {
    background-color: var(--primary-color);
    color: #fff;
    font-weight: bold;
}

td,
th {
    padding: 10px;
}

tbody,
thead {
    text-align: center;
}

tbody tr:hover {
    background-color: rgb(241, 241, 241);
}

.thumbnail {
    width: 100px;
    height: 90px;
    object-fit: cover;
    background-position: center center;
    background-repeat: no-repeat;
}
</style>
