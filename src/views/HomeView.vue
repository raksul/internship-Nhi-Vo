<script setup lang="ts">
import InventoriesList from "../components/InventoriesList.vue";
import Filter from "../components/Filter.vue";
</script>

<template>
  <div class="wrapper">
    <div class="row">
      <Filter />
      <button class="add-btn">
        <router-link class="button-link" to="/add">
          <font-awesome-icon :icon="['fas', 'plus']" />
          Add new inventory
        </router-link>
      </button>
    </div>
    <InventoriesList />
  </div>
</template>

<style scoped>
.wrapper {
  margin: 20px;
}

.row {
  width: 100%;
  display: flex;
}

/* temporary */
@media (max-width: 600px) {
  .row {
    display: none;
  }
}

.add-btn .button-link {
  text-decoration: none;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
}

.add-btn {
  background-color: var(--primary-color);
  border: none;
  border-radius: 5px;
  margin-left: auto;
  margin-bottom: 15px;
  cursor: pointer;
}

.add-btn:hover {
  background-color: #91b2ff;
}
</style>
