<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="form-floating w-100 me-2">
    <input
      type="text"
      class="form-control"
      id="numberInput"
      :placeholder="label"
      ref="autocompleteInput"
    />
    <label for="numberInput">
      {{ label }}
    </label>
  </div>
</template>
