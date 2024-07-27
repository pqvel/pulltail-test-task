<script setup>
import { ref, defineEmits, defineProps, onMounted, watch } from "vue";

const props = defineProps({
  label: String,
  modelValue: String,
  placeholder: String,
});

const emit = defineEmits(["update:modelValue"]);

const autocompleteInput = ref(null);
const inputValue = ref(props.modelValue || "");

const initializeAutocomplete = () => {
  if (window.google) {
    const autocomplete = new window.google.maps.places.Autocomplete(
      autocompleteInput.value,
      {
        types: ["(cities)"],
        componentRestrictions: { country: "us" }, // Ограничение на США
      }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place && place.formatted_address) {
        const filteredAddress = filterInput(place.formatted_address);
        inputValue.value = filteredAddress;
        emit("update:modelValue", place.name);
      }
    });
  }
};

const filterInput = (value) => {
  alert("validate input");
  return value.replace(/[^a-zA-Z\s]/g, "");
};

const handleInput = (e) => {
  const filteredValue = filterInput(e.target.value);
  inputValue.value = filteredValue;
  e.target.value = filteredValue;
  alert("handle input");
  emit("update:modelValue", filteredValue);
};

watch(
  () => props.modelValue,
  (newValue) => {
    const filteredValue = filterInput(newValue);
    if (filteredValue !== newValue) {
      emit("update:modelValue", filteredValue);
    }
    inputValue.value = filteredValue;
  },
  { immediate: true }
);

onMounted(() => {
  initializeAutocomplete();
});
</script>

<template>
  <div class="location-input d-flex">
    <div class="form-floating w-100 me-2">
      <input
        type="text"
        class="form-control"
        id="floatingInput"
        placeholder="location"
        ref="autocompleteInput"
        v-model="inputValue"
        @input="handleInput"
      />
      <label for="floatingInput">
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
