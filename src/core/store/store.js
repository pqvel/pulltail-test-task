import { ref } from "vue";
import { defineStore } from "pinia";
import { loadTypes } from "../constants";

export const useStore = defineStore("store", () => {
  const filters = ref({
    equipments: [],
    loadType: loadTypes.fullAndPartial,
    length: null,
    weight: null,
    location: {
      origin: null,
      destination: null,
    },
    date: {
      pickUp: null,
      dropOff: null,
    },
  });

  const setFilters = (newFilters) => {
    filters.value = newFilters;
  };

  return { filters, setFilters };
});
