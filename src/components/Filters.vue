<script setup>
import { reactive } from "vue";
import { BIconArrowDownUp, BIconSearch } from "bootstrap-icons-vue";

import { Section } from "./ui/wrappers";
import LocationInput from "./ui/form/LocationInput.vue";
import MultipleSelect from "./ui/form/MultipleSelect.vue";
import DateRange from "./ui/form/DateRange.vue";
import NumberInput from "./ui/form/NumberInput.vue";

const formData = reactive({
  name: "",
  email: "",
  message: "",
});

const submitForm = () => {
  // Логика отправки формы
  console.log(formData);
};
</script>

<template>
  <Section>
    <form @submit.prevent="submitForm">
      <!-- 1 -->
      <div class="row align-items-center">
        <div class="col-6">
          <LocationInput label="Origin" placeholder="DH-O" />
        </div>
        <div class="col-1 text-center">
          <BIconArrowDownUp class="location-icon" width="24" height="24" />
        </div>
        <div class="col-5">
          <LocationInput label="Destination" placeholder="DH-D" />
        </div>
      </div>
      <!-- 2 -->
      <div class="row g-2 mt-3">
        <div class="col-3">
          <MultipleSelect label="Equipment Type" />
        </div>
        <div class="col-1">
          <NumberInput label="Length ft" />
        </div>
        <div class="col-1">
          <NumberInput label="Weight" />
        </div>
        <div class="col-3">
          <DateRange />
        </div>
        <div class="col-2">
          <button type="button" class="btn btn-primary btn-lg text-sm">
            <BIconSearch width="20" height="20" />
            Search
          </button>
        </div>
      </div>
    </form>
  </Section>
</template>

<style scoped>
.location-icon {
  transform: rotate(90deg);
  fill: #2f3d69;
}
</style>
