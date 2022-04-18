<script setup lang="ts">
defineEmits(['close'])
</script>

<template>
    <div class="modal-backdrop">
        <div class="modal">
            <header class="modal-header">
                <slot name="header">
                    Model name
                </slot>
                <button type="button" class="btn-close" @click="$emit('close')">
                    x
                </button>
            </header>

            <section class="modal-body">
                <slot name="body">
                    Description
                </slot>
            </section>

            <footer class="modal-footer">
                <button type="button" class="btn-blue" @click="$emit('close')">
                    Close
                </button>
            </footer>
        </div>
    </div>
</template>

<style>
.modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    width: 300px;
    background: #FFFFFF;
    box-shadow: 2px 2px 5px 1px rgba(124, 124, 124, 0.3);
    overflow-x: auto;
    display: flex;
    flex-direction: column;
}

.modal-header,
.modal-footer {
    padding: 15px;
    display: flex;
}

.modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    font-weight: bold;
    justify-content: space-between;
}

.modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
    justify-content: flex-end;
}

.modal-body {
    position: relative;
    padding: 20px 15px;
}

.btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #7EAAFF;
    background: transparent;
}

.btn-blue {
    color: white;
    background: var(--primary-color);
    border: 1px solid var(--primary-color);
    border-radius: 2px;
    padding: 10px;
}
</style>