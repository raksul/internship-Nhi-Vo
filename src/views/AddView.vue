<script setup lang="ts">
import { useInventoriesStore } from "@/stores/inventories";
import Form from "../components/Form.vue";

const inventoryStore = useInventoriesStore();

inventoryStore.edit.status = false;
</script>

<template>
  <Form>
    <template v-slot:title> Add new inventory </template>
  </Form>
</template>
