<script setup lang="ts">
import { ref } from "vue";

const props = defineProps(["item"]);
defineEmits(["close"]);

const item = ref(props.item);

const warrantyDisplay = (date: string) => {
  return Date.parse(date) < Date.now() ? "Expired" : date;
};
</script>

<template v-if="props.item">
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        Inventory details
        <button type="button" class="btn-close" @click="$emit('close')">
          x
        </button>
      </header>

      <section class="modal-body">
        <div class="container">
          <div style="text-align: center">
            <img class="thumbnail" :src="item.images[0]" />
            <p style="font-weight: bold">{{ item.model.name }}</p>

            <button class="btn-edit" v-show="!item.is_sold">
              <router-link
                style="text-decoration: none; color: #000"
                :to="{ name: 'edit', params: { id: item.id } }"
              >
                <font-awesome-icon :icon="['fas', 'pen']" />
                Edit
              </router-link>
            </button>
          </div>
          <div class="outline">
            <table>
              <tr>
                <th>Brand</th>
                <td>{{ item.model.brand.name }}</td>
              </tr>
              <tr>
                <th>Display</th>
                <td>{{ item.model.display }}"</td>
              </tr>
              <tr>
                <th>Year</th>
                <td>{{ item.model.year }}</td>
              </tr>
              <tr>
                <th>Color</th>
                <td>{{ item.color.name }}</td>
              </tr>
              <tr>
                <th>OS Version</th>
                <td>{{ item.os_version.name }}</td>
              </tr>
              <tr>
                <th>Memory size</th>
                <td>{{ item.memory_size }}GB</td>
              </tr>
              <tr>
                <th>Warranty</th>
                <td>{{ warrantyDisplay(item.warranty_expiry) }}</td>
              </tr>
              <tr>
                <th>Condition</th>
                <td>{{ item.condition }}</td>
              </tr>
              <tr>
                <th>Price</th>
                <td>${{ item.price }}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>{{ item.is_sold ? "Sold" : "In-stock" }}</td>
              </tr>
            </table>
          </div>
        </div>
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
  width: 450px;
  background: #ffffff;
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
  color: var(--primary-color);
  background: transparent;
}

.btn-blue {
  color: white;
  background: var(--primary-color);
  border: 1px solid var(--primary-color);
  border-radius: 10px;
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
}

.container {
  display: flex;
}

.outline {
  margin: 0px 10px;
  padding: 10px;
  width: 100%;
  border: 1px solid #d2d2d2;
  display: flex;
  border-radius: 10px;
}

.outline table,
th,
td {
  text-align: start;
  padding: 5px;
}

.outline table th {
  font-weight: bold;
}

.thumbnail {
  width: 100px;
  height: 90px;
  object-fit: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.btn-edit {
  margin-top: 10px;
  width: 100%;
  background-color: rgb(205, 205, 205);
  border: none;
  padding: 10px;
  border-radius: 10px;
}
</style>
