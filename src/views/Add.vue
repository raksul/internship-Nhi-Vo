<script setup lang="ts">
import { useInventoriesStore } from "../stores/inventories";
import ProductForm from "../components/ProductForm.vue";

const inventoryStore = useInventoriesStore();

inventoryStore.setEditStatus(false);
</script>

<template>
  <ProductForm>
    <template v-slot:title> Add new inventory </template>
  </ProductForm>
</template>
