<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import HomeView from "./views/HomeView.vue";
import AddView from "./views/AddView.vue";
</script>

<template>
  <main>
    <div class="app-bar">
      Logo
    </div>
    <HomeView />
    <!-- <AddView /> -->
  </main>
</template>

<style>
@import "@/assets/base.css";

.app-bar {
  background-color: var(--primary-color);
  text-align: center;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
}
</style>
