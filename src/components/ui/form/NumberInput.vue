<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const validateInput = (e) => {
  const validValue = e.target.value?.replace(/\D/g, "");
  e.target.value = validValue || "";
};

const updateValue = (e) => {
  emit("update:modelValue", e.target.value);
};

const handleInput = (e) => {
  validateInput(e);
  updateValue(e);
};
</script>

<template>
  <div class="form-floating w-100 me-2">
    <input
      type="text"
      class="form-control"
      id="numberInput"
      :placeholder="label"
      :value="modelValue"
      @input="handleInput"
    />
    <label for="numberInput">
      {{ label }}
    </label>
  </div>
</template>
