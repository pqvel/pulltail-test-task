<script setup>
import { onMounted, ref } from "vue";

defineProps({
  label: String,
  placeholder: String,
});

const autocompleteInput = ref(null);

onMounted(() => {
  if (window.google) {
    const autocomplete = new window.google.maps.places.Autocomplete(
      autocompleteInput.value,
      {
        types: ["(cities)"],
        componentRestrictions: { country: "us" }, // Ограничение на конкретную страну, например, Россия
      }
    );
  }
});

const handleInput = (event) => {
  console.log("Ввод:", event.target.value);
  // Здесь можно добавить дополнительную обработку ввода
};
</script>

<template>
  <div class="location-input d-flex">
    <div class="form-floating w-100 me-2">
      <input
        type="text"
        class="form-control"
        id="floatingInput"
        placeholder="Your Name"
        ref="autocompleteInput"
        @input="handleInput"
      />
      <label for="floatingInput" :class="{ active: isFocused || inputValue }">
        {{ label }}
      </label>
    </div>
    <div class="form-floating">
      <div
        class="form-control text-center py-0 d-flex justify-center align-items-center text-nowrap pe-5"
      >
        {{ placeholder }}
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
