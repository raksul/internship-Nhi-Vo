<template>
  <input type="text" name="" id="" class="filter" placeholder="Search..." />
  <div class="select">
    <select class="custom-select">
      <option selected>In-stock items</option>
      <option>All</option>
    </select>
    <svg>
      <use xlink:href="#select-arrow-down"></use>
    </svg>
    <svg class="sprites">
      <symbol id="select-arrow-down" viewbox="0 0 10 6">
        <polyline points="1 1 5 5 9 1"></polyline>
      </symbol>
    </svg>
  </div>
</template>

<style scoped>
.filter {
  border: 1px solid #d2d2d2;
  border-radius: 5px;
  width: 250px;
  height: 2.5em;
  margin-bottom: 15px;
  padding: 10px;
  font-size: 1em;
  margin-inline-end: 10px;
}

.select {
  position: relative;
  min-width: 200px;
}

.select svg {
  position: absolute;
  right: 25px;
  top: calc(50% - 10px);
  width: 10px;
  height: 6px;
  stroke-width: 2px;
  stroke: #9098a9;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  pointer-events: none;
}

.select select {
  -webkit-appearance: none;
  border: 1px solid #d2d2d2;
  border-radius: 5px;
  width: 250px;
  height: 2.5em;
  margin-bottom: 15px;
  padding: 10px;
  font-size: 1em;
  margin-inline-end: 10px;
}

.sprites {
  position: absolute;
  width: 0;
  height: 0;
  padding: 15px;
  pointer-events: none;
  user-select: none;
}
</style>
