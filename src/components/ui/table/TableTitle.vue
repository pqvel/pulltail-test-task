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
  <th :class="clsx('table-title py-0', className)">
    <slot></slot>
  </th>
</template>

<style lang="scss">
.table-title {
  border: none;
  background: transparent !important;
  text-transform: uppercase;
}
</style>
