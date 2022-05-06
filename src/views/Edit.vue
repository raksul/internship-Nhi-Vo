<script setup lang="ts">
import { useInventoriesStore } from "../stores/inventories";
import ProductForm from "../components/ProductForm.vue";

const inventoryStore = useInventoriesStore();

inventoryStore.edit.status = true;
</script>

<template>
  <ProductForm>
    <template v-slot:title> Edit </template>
  </ProductForm>
</template>

<style scoped></style>
