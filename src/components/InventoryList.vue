<script setup lang="ts">
import { reactive, ref } from "vue";
import { useInventoriesStore } from "../stores/inventories";
import ProductModal from "./ProductModal.vue";
import Filter from "./InventoryFilters.vue";
import { computed } from "@vue/reactivity";

import type { Inventory } from "../stores/types";
import { updateStatus } from "../services";

const store = useInventoriesStore();
const { fetchInventories } = useInventoriesStore();

fetchInventories();

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
const currentItem = ref({} as Inventory);

const warrantyDisplay = (date: string) => {
  return Date.parse(date) < Date.now() ? "Expired" : date;
};

const showModal = (item: Inventory) => {
  currentItem.value = item;
  // console.log(currentItem.value);
  isShow.value = true;
};

const closeModal = () => {
  isShow.value = false;
};

interface Results {
  search: string;
  filteredResults?: Array<Inventory>;
}

const state: Results = reactive({
  search: "",
  filteredResults: computed(() =>
    store.getFiltered?.filter((i) => {
      return i.model.brand.name
        .concat(" ", i.model.name)
        .toLowerCase()
        .includes(state.search.toLowerCase());
    })
  ),
});

const markSold = (id: number) => {
  if (confirm("Mark this item as sold?")) {
    updateStatus(id.toString())
      .then(() => {
        let index = store.inventories.findIndex((item) => item.id === id);
        store.markAsSold(index);
      })
      .catch((err) => console.log(err));
  }
};
</script>

<template>
  <div class="row">
    <Filter v-model="state.search" />
  </div>
  <table class="table">
    <thead>
      <tr>
        <th v-for="(label, index) in labels" :key="index">
          {{ label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in state.filteredResults"
        :key="item.id"
        @click="showModal(item)"
      >
        <td data-label="Image">
          <div v-if="item.images.length > 0">
            <img class="thumbnail" :src="item.images[0]" alt="" />
          </div>
          <div v-else>
            <img
              class="thumbnail"
              src="https://www.chanchao.com.tw/VTG/images/default.jpg"
            />
          </div>
        </td>

        <td data-label="Brand">{{ item.model.brand.name }}</td>
        <td data-label="Model">{{ item.model.name }}</td>
        <td data-label="Condition">{{ item.condition }}</td>
        <td data-label="Memory Size">{{ item.memory_size }}GB</td>
        <td data-label="Warranty Expiry">
          {{ warrantyDisplay(item.warranty_expiry) }}
        </td>
        <td data-label="Price">${{ item.price }}</td>
        <td data-label="Status">{{ item.is_sold ? "Sold" : "In-stock" }}</td>
        <td data-label="Mark as sold">
          <button
            :disabled="item.is_sold"
            class="sold-btn"
            @click.prevent.stop="markSold(item.id)"
          >
            <font-awesome-icon :icon="['fas', 'tag']" /> Sold
          </button>
        </td>
      </tr>
    </tbody>

    <ProductModal v-if="isShow" @close="closeModal" :item="currentItem" />
  </table>
</template>

<style scoped>
.row {
  width: 100%;
  display: flex;
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
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .table tr:not(:first-child) {
    margin-top: 15px;
  }

  .table td {
    text-align: start;
    padding-left: 50%;
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

.sold-btn {
  background-color: var(--primary-color);
  color: #fff;
  font-size: 15px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  padding: 15px;
}

.sold-btn:hover {
  background-color: #91b2ff;
  cursor: pointer;
}

.sold-btn:disabled {
  background-color: #ccc;
}
</style>
