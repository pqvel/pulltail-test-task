<script setup>
import clsx from "clsx";

defineProps({
  className: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <td :class="clsx('table-column d-flex px-2', className)">
    <slot></slot>
  </td>
</template>

<style lang="scss">
.table-column {
  border: none;
  background: transparent !important;
  // font-size: 13px;

  &:not(:last-child) {
    border-right: 1px solid #000;
  }
}
</style>
