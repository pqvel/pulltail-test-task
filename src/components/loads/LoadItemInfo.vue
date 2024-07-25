<script>
import { defineProps } from "vue";
defineProps({
  load: Object,
});
</script>

<template>
  <tr class="load-info d-flex w-100">
    <td class="load-info-column d-flex p-1">
      <div
        class="load-info-title d-flex justify-content-between align-items-center"
      >
        <span class="font-weight-bold">TRIP</span>
        <span class="text-muted"></span>
      </div>
    </td>
    <td class="load-info-column d-flex p-1">dwd</td>
    <td class="load-info-column d-flex p-1">dw</td>
  </tr>
</template>

<style lang="scss">
.load-info {
  cursor: pointer;
  &-column {
    width: 33.33%;
  }

  &-title {
    background-color: #eeeeee;
  }
}
</style>
