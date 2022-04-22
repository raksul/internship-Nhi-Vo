<script setup lang="ts">
import { ref } from "vue";
import { useInventoriesStore } from "@/stores/inventories";
import ProductModal from "./ProductModal.vue";

const store = useInventoriesStore();
const { fetchData } = useInventoriesStore();

fetchData();

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

const isShow = ref(false);
const currentItem: any = ref(null);

const warrantyDisplay = (date: string) => {
  return Date.parse(date) < Date.now() ? "Expired" : date;
};

const showModal = (item: object) => {
  currentItem.value = item;
  console.log(currentItem.value);
  isShow.value = true;
};

const closeModal = () => {
  isShow.value = false;
};
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th v-for="(label, index) in labels" :key="index">
          {{ label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in store.inventories" :key="item.id" @click="showModal(item)">
        <td data-label="Image">
          <img class="thumbnail" :src="item.images[0]" alt="" />
        </td>
        <td data-label="Brand">{{ item.model.brand }}</td>
        <td data-label="Model">{{ item.model.name }}</td>
        <td data-label="Condition">{{ item.condition }}</td>
        <td data-label="Memory Size">{{ item.memory_size }}GB</td>
        <td data-label="Warranty Expiry">
          {{ warrantyDisplay(item.warranty_expiry) }}
        </td>
        <td data-label="Price">${{ item.price }}</td>
        <td data-label="Status">{{ item.is_sold ? "Sold" : "In-stock" }}</td>
        <td data-label="Mark as sold">
          <button :disabled="item.is_sold">Sold</button>
        </td>
      </tr>
    </tbody>

    <ProductModal v-if="isShow" @close="closeModal" :item="currentItem" />
  </table>
</template>

<style scoped>
table {
  border: 1px solid #ccc;
  border-collapse: collapse;
  overflow: hidden;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
}

.table td,
.table th {
  padding: 15px 15px;
  text-align: center;
  font-size: 16px;
}

.table th {
  background-color: var(--primary-color);
  color: #ffffff;
  font-weight: bold;
}

.table tbody tr:hover {
  background-color: rgb(241, 241, 241);
  cursor: pointer;
}

@media (max-width: 900px) {
  table {
    border: none;
  }

  .table thead {
    display: none;
  }

  .table,
  .table tbody,
  .table tr,
  .table td {
    display: block;
    width: 100%;
  }

  .table tr {
    margin-bottom: 15px;
    border: 1px solid #ccc;
  }

  .table td {
    text-align: start;
    padding-left: 50%;
    text-align: start;
    position: relative;
  }

  .table td::before {
    content: attr(data-label);
    position: absolute;
    left: 0;
    width: 50%;
    padding-left: 15px;
    font-size: 15px;
    font-weight: bold;
    text-align: start;
  }
}

.thumbnail {
  width: 100px;
  height: 90px;
  object-fit: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
</style>
