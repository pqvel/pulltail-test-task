<script setup>
import { defineEmits } from "vue";
import { sortingOrders } from "../../../core/constants";
import clsx from "clsx";
import { BIconArrowUp } from "bootstrap-icons-vue";

const emit = defineEmits(["handleSort"]);

const handleClick = () => {
  emit("handleSort");
};

defineProps({
  active: {
    type: Boolean,
    default: false,
  },
  order: {
    type: String,
    default: sortingOrders.asc,
  },
});
</script>

<template>
  <button
    :class="clsx('table-sort-btn d-flex align-items-center', { active })"
    @click="handleClick"
  >
    <slot> </slot>
    <BIconArrowUp
      v-if="active"
      :class="clsx({ 'rotate-180': order === sortingOrders.desc })"
      width="14"
      height="14"
    />
  </button>
</template>

<style lang="scss" scoped>
.table-sort-btn {
  margin: 0;
  padding: 0;
  outline: none;
  border: none;
  background: none;
  text-transform: uppercase;
  font-weight: inherit;
  cursor: pointer;

  &.active {
    color: #003380;
  }
}

.rotate-180 {
  transform: rotate(180deg);
}
</style>
