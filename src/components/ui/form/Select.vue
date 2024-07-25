<script setup>
import { ref, computed, defineProps, defineEmits } from "vue";

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const dropdownOpen = ref(false);
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const selectOption = (option) => {
  emit("update:modelValue", option);
  dropdownOpen.value = false;
};

const selectedOption = computed(() => props.modelValue);
</script>
<template>
  <div class="form-floating dropdown">
    <input
      type="text"
      class="form-control"
      @click="toggleDropdown"
      :value="selectedOption"
      :placeholder="label"
      readonly
    />
    <label for="customSelect" v-if="label">{{ label }}</label>
    <div
      class="dropdown-menu dropdown-menu-dark show"
      :class="{ 'd-none': !dropdownOpen }"
    >
      <button
        class="dropdown-item"
        v-for="option in options"
        :key="option"
        @click="selectOption(option)"
      >
        {{ option }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dropdown-menu-dark {
  top: 20px;
  left: -10px;
  width: 100%;
  background-color: #343a40;
  color: white;
}
</style>
