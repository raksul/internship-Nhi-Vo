<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
    items: Array<any>;
    modelValue: object;
    value: string;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", option: object): void;
}>();

const isShow = ref(false);
const keyword = ref(props.value);
const results = ref([] as Array<any>);
const currentIdx = ref(0);

const selectedOption = ref({});

watch(
    () => selectedOption.value,
    () => {
        emit("update:modelValue", selectedOption.value);
    }
);

const filterResults = () => {
    results.value = props.items.filter((i: any) => {
        return i.name.toLowerCase().includes(keyword.value.toLowerCase());
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

const setResult = (result: any) => {
    keyword.value = result.name;
    selectedOption.value = result;
    isShow.value = false;
};

const onEnter = () => {
    keyword.value = results.value[currentIdx.value].name;
    selectedOption.value = results.value[currentIdx.value];
    isShow.value = false;
    currentIdx.value = 0;
};
</script>

<template>
    <div class="autocomplete">
        <input type="text" v-model="keyword" @input="onChange" @keydown.down="onArrowDown" @keydown.up="onArrowUp"
            @blur="onBlur" @keydown.enter.prevent="onEnter" @focus="onChange" />
        <div class="autocomplete-items" v-show="isShow">
            <div v-for="(result, index) in results" :key="index"
                :class="{ 'autocomplete-active': index === currentIdx }" @mousedown="setResult(result)">
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
