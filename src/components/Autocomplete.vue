<script setup lang="ts">
import { ref } from 'vue';
import { useOptionStore, type Option } from '@/stores/option';

const props = defineProps<{
    items: Array<Option>,
}>()

const store = useOptionStore()

const isShow = ref(false)
const keyword = ref("")
const results = ref([] as Array<Option>)
const currentIdx = ref(0)

const filterResults = () => {
    results.value = props.items.filter((i: Option) => {
        return i.name.toLowerCase().includes(keyword.value.toLowerCase())
    })
}

const onChange = () => {
    filterResults()

    if (results.value.length > 0) {
        isShow.value = true
    }
}

const onArrowDown = () => {
    if (currentIdx.value === results.value.length - 1) {
        currentIdx.value = 0
    } else {
        currentIdx.value++
    }
};

const onArrowUp = () => {
    if (currentIdx.value === 0) {
        currentIdx.value = results.value.length - 1
    } else {
        currentIdx.value--
    }
};

const onBlur = () => {
    isShow.value = false
}

const setResult = (result: Option) => {
    keyword.value = result.name
    isShow.value = false
    store.option = result
}

const onEnter = () => {
    keyword.value = results.value[currentIdx.value].name
    isShow.value = false
    currentIdx.value = 0
    store.option = results.value[currentIdx.value]
}

</script>

<template>
    <div class="autocomplete">
        <input type="text" v-model="keyword" @input="onChange" @keydown.down="onArrowDown" @keydown.up="onArrowUp"
            @blur="onBlur" @keydown.enter.prevent="onEnter">
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
    border: 1px solid #d2d2d2;
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