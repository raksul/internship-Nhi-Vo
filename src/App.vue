<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import HomeView from "./views/HomeView.vue";
import AddView from "./views/AddView.vue";
</script>

<template>
  <main>
    <div class="app-bar">
      <RouterLink to="/" class="branding">
        2ndMobile
        <font-awesome-icon :icon="['fas', 'mobile-screen-button']" />
      </RouterLink>
    </div>
    <RouterView />
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
  text-decoration: none;
}

.branding {
  color: #fff;
  font-weight: bold;
  text-decoration: none;
}
</style>
