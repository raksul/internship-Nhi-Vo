<script setup lang="ts">
import { useInventoriesStore } from "@/stores/inventories";
import Form from "../components/Form.vue";

const inventoryStore = useInventoriesStore();

inventoryStore.edit.status = true;
</script>

<template>
  <Form>
    <template v-slot:title> Edit </template>
  </Form>
</template>

<style scoped></style>
