<script setup>
import { defineEmits } from "vue";
import { BIconSearch } from "bootstrap-icons-vue";

const emit = defineEmits("handleSearch");

const handleClick = () => {
  emit("handleSearch");
};
</script>

<template>
  <div class="form-floating me-3 w-100">
    <button
      type="button"
      class="search-btn form-control btn btn-primary btn-lg text-sm py-2 w-100"
      @click="handleClick"
    >
      <BIconSearch width="20" height="20" />
      Search
    </button>
  </div>
</template>

<style lang="scss" scoped>
.search-btn {
  background-color: rgb(0, 128, 255);
  border-radius: 4px;
}
</style>
