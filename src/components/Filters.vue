<script setup>
import { BIconArrowDownUp, BIconThreeDotsVertical } from "bootstrap-icons-vue";
import LocationInput from "./ui/form/LocationInput.vue";
import MultipleSelect from "./ui/form/MultipleSelect.vue";
import DateRange from "./ui/form/DateRange.vue";
import NumberInput from "./ui/form/NumberInput.vue";
import SearchBtn from "./ui/form/SearchBtn.vue";
</script>

<template>
  <form @submit.prevent="submitForm">
    <!-- 1 -->
    <div class="row align-items-center g-2">
      <div class="col-12 col-lg-6">
        <LocationInput label="Origin" placeholder="DH-O" />
      </div>
      <div class="col-1 text-center d-none d-xl-block">
        <BIconArrowDownUp class="location-icon" width="30" height="30" />
      </div>
      <div class="col-12 col-lg-6 col-xl-5">
        <LocationInput label="Destination" placeholder="DH-D" />
      </div>
      <!--  -->
      <div class="col-lg-6 col-xl-3">
        <MultipleSelect label="Equipment Type" />
      </div>
      <div class="col-lg-6 col-xl-2">
        <MultipleSelect label="Equipment Type" />
      </div>
      <div class="col-lg-6 col-xl-1">
        <NumberInput label="Length ft" />
      </div>
      <div class="col-lg-6 col-xl-1">
        <NumberInput label="Weight" />
      </div>
      <div class="col-lg-6 col-xl-3">
        <DateRange />
      </div>
      <div class="col-lg-6 col-xl-2">
        <div class="d-flex align-items-center">
          <SearchBtn />
          <button class="btn btn-transparent">
            <BIconThreeDotsVertical width="24" height="24" />
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped>
.location-icon {
  transform: rotate(90deg);
  fill: #2f3d69;
}
</style>
