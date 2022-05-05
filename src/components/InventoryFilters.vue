<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { useInventoriesStore } from "../stores/inventories";
import { ref, watch } from "vue";

const store = useInventoriesStore();
const selected = ref(store.filter);
const emit = defineEmits(["input", "update:modelValue"]);

watch(
  () => selected.value,
  () => {
    store.filter = selected.value;
  }
);

const query = (e: Event) => {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
};
</script>

<template>
  <div class="header">
    <input type="text" class="filter" placeholder="Search..." @input="query" />
    <div class="select">
      <select class="custom-select" v-model="selected">
        <option value="in-stock">In-stock items</option>
        <option value="all">All</option>
      </select>
      <svg>
        <use xlink:href="#select-arrow-down"></use>
      </svg>
      <svg class="sprites">
        <symbol id="select-arrow-down" viewbox="0 0 10 6">
          <polyline points="1 1 5 5 9 1"></polyline>
        </symbol>
      </svg>
    </div>
    <button class="add-btn">
      <router-link class="button-link" to="/add">
        <font-awesome-icon :icon="['fas', 'plus']" />
        Add new inventory
      </router-link>
    </button>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  width: 100%;
}

.filter {
  border: 1px solid #d2d2d2;
  border-radius: 5px;
  width: 250px;
  height: 2.5em;
  margin-bottom: 15px;
  padding: 10px;
  font-size: 1em;
  margin-inline-end: 10px;
}

.select svg {
  position: absolute;
  right: 25px;
  top: calc(50% - 10px);
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
  border: 1px solid #d2d2d2;
  border-radius: 5px;
  width: 250px;
  height: 2.5em;
  margin-bottom: 15px;
  padding: 10px;
  font-size: 1em;
  margin-inline-end: 10px;
}

.sprites {
  position: absolute;
  width: 0;
  height: 0;
  padding: 15px;
  pointer-events: none;
  user-select: none;
}

.add-btn {
  height: 3em;
  background-color: var(--primary-color);
  border: none;
  border-radius: 5px;
  margin-left: auto;
  cursor: pointer;
  margin-bottom: 15px;
}

.add-btn .button-link {
  text-decoration: none;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  padding: 10px;
}

.add-btn:hover {
  background-color: #91b2ff;
}

@media (max-width: 750px) {
  .header {
    flex-direction: column;
  }

  .add-btn,
  .select select,
  .filter {
    width: 100%;
  }
} ;
</style>
