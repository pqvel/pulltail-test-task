<script setup>
import { ref } from "vue";
import { BIconArrowDownUp, BIconThreeDotsVertical } from "bootstrap-icons-vue";
import LocationInput from "./ui/form/LocationInput.vue";
import MultipleSelect from "./ui/form/MultipleSelect.vue";
import DateRange from "./ui/form/DateRange.vue";
import NumberInput from "./ui/form/NumberInput.vue";
import SearchBtn from "./ui/form/SearchBtn.vue";
import Select from "./ui/form/Select.vue";
import { truckTypes } from "../core/data";
import { useStore } from "../core/store/store";
import { loadTypes } from "../core/constants";

const store = useStore();

const options = ref([
  loadTypes.fullAndPartial,
  loadTypes.full,
  loadTypes.partial,
]);

const selectedOption = ref(loadTypes.fullAndPartial);

const multiSelectOptions = ref(truckTypes);
const selectedOptions = ref([]);

const lengthValue = ref("");
const weightValue = ref("");

const originValue = ref("");
const destinationValue = ref("");

const dateRange = ref({ startDate: "", endDate: "" });

const submitForm = () => {
  store.setFilters({
    equipments: selectedOptions.value,
    loadType: selectedOption.value,
    length: lengthValue.value || null,
    weight: weightValue.value || null,
    location: {
      origin: originValue.value || null,
      destination: destinationValue.value || null,
    },
    date: {
      pickUp: dateRange.value.startDate || null,
      dropOff: dateRange.value.endDate || null,
    },
  });
};
</script>

<template>
  <div class="row align-items-center g-2">
    <div class="col-12 col-lg-6">
      <LocationInput v-model="originValue" label="Origin" placeholder="DH-O" />
    </div>
    <div class="col-1 text-center d-none d-xl-block">
      <BIconArrowDownUp class="location-icon" width="30" height="30" />
    </div>
    <div class="col-12 col-lg-6 col-xl-5">
      <LocationInput
        v-model="destinationValue"
        label="Destination"
        placeholder="DH-D"
      />
    </div>
    <div class="col-lg-6 col-xl-3">
      <MultipleSelect :options="multiSelectOptions" v-model="selectedOptions" />
    </div>
    <div class="col-lg-6 col-xl-2">
      <Select label="Load Type" :options="options" v-model="selectedOption" />
    </div>
    <div class="col-lg-6 col-xl-1">
      <NumberInput v-model="lengthValue" label="Length ft" />
    </div>
    <div class="col-lg-6 col-xl-1">
      <NumberInput v-model="weightValue" label="Weight" />
    </div>
    <div class="col-lg-6 col-xl-3">
      <DateRange v-model="dateRange" />
    </div>
    <div class="col-lg-6 col-xl-2">
      <div class="d-flex align-items-center">
        <SearchBtn @handleSearch="submitForm" />
        <button class="btn btn-transparent">
          <BIconThreeDotsVertical width="24" height="24" />
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.location-icon {
  transform: rotate(90deg);
  fill: #2f3d69;
}
</style>
