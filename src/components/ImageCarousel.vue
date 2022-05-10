<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { ref } from "vue";

const MAX_VISIBLE = 3;

const props = defineProps<{
  images: Array<string>;
}>();

const current = ref(0);

const start = ref(0);
const end = computed(() => start.value + MAX_VISIBLE);

const total = computed(() => props.images.length);

const prev = () => {
  start.value = start.value === 0 ? 0 : start.value - 1;

  current.value = current.value === 0 ? 0 : current.value - 1;
};

const next = () => {
  start.value = end.value >= total.value ? start.value : start.value + 1;

  current.value =
    current.value === total.value - 1 ? total.value - 1 : current.value + 1;
};
</script>

<template>
  <div class="preview">
    <img :src="props.images[current]" alt="" />
  </div>
  <div class="thumbnail-slider">
    <a class="prev" @click="prev">&#10094;</a>
    <div
      class="slide"
      v-for="(image, index) in props.images.slice(start, end)"
      :key="index"
      :class="{ active: image === props.images[current] }"
    >
      <img :src="image" @click="current = index" />
    </div>
    <a class="next" @click="next">&#10095;</a>
  </div>
</template>

<style scoped>
.preview img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.thumbnail-slider {
  display: flex;
  justify-content: center;
  align-items: center;
}

.slide {
  opacity: 0.5;
}

.slide img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  cursor: pointer;
  margin-right: 2px;
  margin-left: 2px;
}

.slide.active {
  opacity: 1 !important;
}

.slide.active img {
  border: 1px solid rgb(126, 126, 126);
}

.prev,
.next {
  z-index: 99;
  position: absolute;
  cursor: pointer;
  display: inline-block;
}

.prev {
  left: 0;
}

.next {
  right: 0;
}
</style>
