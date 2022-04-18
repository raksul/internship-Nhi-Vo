<script setup lang="ts">

</script>

<template>
    <div class="wrapper">
        <h2 class="title">
            <slot name="title" class="title"></slot>
        </h2>
        <form action="">
            <div class="input-field">
                <span class="label">Brand</span>
                <input type="text">
            </div>
            <div class="input-field">
                <span class="label">Model</span>
                <input type="text">
            </div>
            <div class="input-field">
                <span class="label">Memory Size</span>
                <input type="number">
            </div>
            <div class="input-field">
                <span class="label">OS Version</span>
                <input type="text">
            </div>
            <div class="input-field">
                <span class="label">Color</span>
                <input type="text">
            </div>
            <div class="input-field">
                <span class="label">Price</span>
                <input type="number">
            </div>
        </form>
    </div>
</template>

<style scoped>
.wrapper {
    margin: 50px;
    border: 1px solid #d2d2d2;
    border-radius: 5px;
    padding: 50px;
}

.title {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
}

.wrapper form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 50px;
}

.input-field {
    flex-basis: 50%;
    padding: 10px 50px 20px 0px;
}

.input-field input {
    width: 100%;
    padding: 15px;
    margin-top: 10px;
    font-size: 1rem;
    border: 1px solid #d2d2d2;
    border-radius: 5px;
}
</style>