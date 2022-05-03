<script setup lang="ts">
import type { Brand, T } from "@/stores/types";
import { computed } from "@vue/reactivity";
import { ref, watch } from "vue";

const props = defineProps<{
  brand?: Brand;
  items: Array<T>;
  modelValue: T;
  value: string | null;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", option: T): void;
}>();

const isShow = ref(false);
const keyword = ref();

const results = ref([] as Array<T>);
const currentIdx = ref(0);

const selectedOption = ref({} as T);

const computedValue = computed(() => props.value);

props.value ? (keyword.value = computedValue.value) : (keyword.value = "");

watch(
  () => keyword.value,
  () => {
    if (keyword.value === "") {
      selectedOption.value = {} as T;
    }
  }
);

watch(
  () => selectedOption.value,
  () => {
    emit("update:modelValue", selectedOption.value);
  }
);

watch(
  () => props.brand,
  () => {
    selectedOption.value = {} as T;
    keyword.value = "";
  }
);

const filterResults = () => {
  if (props.value) {
    selectedOption.value = props.modelValue;
  }

  results.value = props.items.filter((i: T) => {
    return i.name.toLowerCase().includes(keyword.value?.toLowerCase());
  });
};

const onChange = () => {
  filterResults();

  if (results.value.length > 0) {
    isShow.value = true;
  }
};

const onArrowDown = () => {
  if (currentIdx.value === results.value.length - 1) {
    currentIdx.value = 0;
  } else {
    currentIdx.value++;
  }
};

const onArrowUp = () => {
  if (currentIdx.value === 0) {
    currentIdx.value = results.value.length - 1;
  } else {
    currentIdx.value--;
  }
};

const onBlur = () => {
  isShow.value = false;
};

const setResult = (result: T) => {
  if (keyword.value !== result.name) {
    keyword.value = result.name;
    selectedOption.value = result;
    isShow.value = false;
  }
};
const onEnter = () => {
  if (keyword.value !== results.value[currentIdx.value].name) {
    keyword.value = results.value[currentIdx.value].name;
    selectedOption.value = results.value[currentIdx.value];
  }
  isShow.value = false;
  currentIdx.value = 0;
};
</script>

<template>
  <div class="autocomplete">
    <input
      type="text"
      v-model="keyword"
      @input="onChange"
      @keydown.down="onArrowDown"
      @keydown.up="onArrowUp"
      @blur="onBlur"
      @keydown.enter.prevent="onEnter"
      @focus="onChange"
    />
    <div class="autocomplete-items" v-show="isShow">
      <div
        v-for="(result, index) in results"
        :key="index"
        :class="{ 'autocomplete-active': index === currentIdx }"
        @mousedown="setResult(result)"
      >
        {{ result.name }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.autocomplete {
  position: relative;
  display: inline-block;
  width: 100%;
}

.autocomplete input {
  width: 100%;
  padding: 15px;
  margin-top: 10px;
  font-size: 1rem;
  border: 2px solid #d2d2d2;
  border-radius: 10px;
}
.on-error {
  border: 2px solid var(--danger-color) !important;
}

.autocomplete input:focus {
  border: 2px solid var(--primary-color);
}

.autocomplete-items {
  position: absolute;
  border: 2px solid #d2d2d2;
  z-index: 99;
  top: 100%;
  left: 0;
  right: 0;
}

.autocomplete-items div {
  padding: 10px;
  cursor: pointer;
  background-color: #fff;
}

.autocomplete-items div:hover {
  background-color: #bddcff;
}

.autocomplete-active {
  background-color: #bddcff !important;
}
</style>
