<script setup>
import { BIconX } from "bootstrap-icons-vue";
import {
  ref,
  computed,
  defineProps,
  defineEmits,
  onMounted,
  onUnmounted,
} from "vue";
import { useClickOutside } from "../../../core/composables/useClickOutside";

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue"]);

// Local state
const dropdownOpen = ref(false);

// Methods
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const toggleOption = (option) => {
  const index = selectedOptions.value.indexOf(option);
  if (index === -1) {
    selectedOptions.value.push(option);
  } else {
    selectedOptions.value.splice(index, 1);
  }
  emit("update:modelValue", selectedOptions.value);
};

const removeOption = (option) => {
  const index = selectedOptions.value.indexOf(option);
  if (index !== -1) {
    selectedOptions.value.splice(index, 1);
    emit("update:modelValue", selectedOptions.value);
  }
};

// Computed property for selected options
const selectedOptions = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

// Click outside handler
const handleClickOutside = (event) => {
  const dropdownElement = document.querySelector(".multiple-select");
  if (!dropdownElement.contains(event.target)) {
    dropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div class="multiple-select">
    <div class="form-floating">
      <div
        type="text"
        class="multiple-select-input form-control"
        @click="toggleDropdown"
        placeholder="Equipment"
        readonly
      >
        <div
          v-for="(option, index) in selectedOptions"
          :key="index"
          class="multiple-select-tag py-2 px-2 badge me-2 mb-2 text-dark fw-normal d-inline-flex align-items-center"
        >
          {{ option.name }}
          <button
            type="button"
            class="multiple-select-delete d-flex align-items-center justify-content-center"
            aria-label="Close"
            @click="removeOption(option)"
          >
            <BIconX width="12" height="12" />
          </button>
        </div>
      </div>
      <label class="multiple-select-label" for="customMultiSelect">
        Equipment Type
      </label>
    </div>

    <div
      class="dropdown-menu shadow-lg show"
      :class="{ 'd-none': !dropdownOpen }"
    >
      <div class="text-purple py-2 px-3 fw-bolder fz-14px">Test group 1</div>
      <button
        class="dropdown-item d-flex items-center justify-content-between px-4 py-2"
        v-for="option in options"
        :key="option.code"
        @click="toggleOption(option)"
      >
        <div>{{ option.name }}</div>
        <div class="text-muted">{{ option.code }}</div>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.multiple-select {
  position: relative;

  &-input {
    display: flex;
    flex-wrap: wrap;
    height: auto !important;
  }

  &-tag {
    background-color: #dddddd;
    flex-wrap: nowrap;
  }

  &-delete {
    background-color: #a7a7a7;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    color: #fff;
    outline: none;
    border: none;
    margin: 0;
    padding: 0;
    margin-left: 6px;
  }

  &-label {
    font-size: 16px !important;
    top: -1px !important;
    background-color: transparent !important;
    opacity: 1 !important;
    height: 30px;
    padding: 0px 4px;
    z-index: 1;

    &::before {
      content: "";
      display: flex;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 100%;
      height: 16px;
      background-color: #fff;
      z-index: -1;
    }
  }
}
.dropdown {
  &-menu {
    max-height: 300px;
    max-width: 300px;
    width: 100%;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      background-color: #ffffff;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #eeeeee;
      border-radius: 8px;
      width: 8px;
      height: 8px;
    }
  }

  &-item {
    transition: 0.15s;

    &:active,
    &:focus,
    &:hover {
      background-color: #c4c4c4;
      color: #000;
    }
  }
}
.form-floating > .form-control {
  padding: 0.75rem 0.75rem 0.25rem;
}
.form-floating > label {
  top: -0.25rem;
  left: 0.75rem;
  padding: 0 0.25rem;
  background: white;
  transition: all 0.1s ease-in-out;
  pointer-events: none;
}
.form-floating > .form-control:not(:placeholder-shown) + label {
  top: -1rem;
  font-size: 0.75rem;
  opacity: 0.65;
}
</style>
