<script setup lang="ts">
import Form from "../components/Form.vue"
</script>

<template>
    <div class="wrapper">
        <Form>
            <template v-slot:title>
                Add new inventory
            </template>
        </Form>
    </div>
</template>

<style scoped>
.wrapper {
    margin: 50px;
    border: 1px solid #d2d2d2;
    border-radius: 5px;
    padding: 50px;
}
</style>