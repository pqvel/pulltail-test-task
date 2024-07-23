<script setup>
import { Container, Section } from "./components/ui/wrappers";
import Filters from "./components/Filters.vue";
</script>
<template>
  <Container>
    <Filters />
    <div class="form-floating mb-3">
      <input
        type="text"
        class="form-control"
        id="floatingInput"
        placeholder="Your Name"
        v-model="inputValue"
        @focus="onFocus"
        @blur="onBlur"
      />
      <label for="floatingInput" :class="{ active: isFocused || inputValue }">
        Your Name
      </label>
    </div>
  </Container>
</template>
