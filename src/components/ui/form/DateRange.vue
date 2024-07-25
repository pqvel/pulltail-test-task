<script setup>
import Litepicker from "litepicker";
import { onMounted } from "vue";
import { BIconCalendarFill } from "bootstrap-icons-vue";

onMounted(() => {
  new Litepicker({
    element: document.getElementById("datepicker"),
    singleMode: false,
    format: "DD/MM/YYYY",
  });
});
</script>

<template>
  <div class="date-range form-floating w-100 me-2">
    <input
      id="datepicker"
      class="form-control w-100 m-0"
      style="width: 300px; margin: 15px 0"
      placeholder="Date Range*"
    />
    <label for="numberInput"> Date Range* </label>
    <BIconCalendarFill class="date-range-icon text-secondary" />
  </div>
</template>

<style scoped lang="scss">
.date-range {
  position: relative;

  &-icon {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
