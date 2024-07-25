<script setup>
import { defineProps } from "vue";

defineProps({
  name: String,
  value: [String, Number],
});
</script>

<template>
  <div class="form-check m-0">
    <input
      class="form-check-input"
      type="checkbox"
      id="flexCheckDefault"
      :name="name"
      :value="value"
    />
    <label class="form-check-label" for="flexCheckDefault">
      <slot> </slot>
    </label>
  </div>
</template>
