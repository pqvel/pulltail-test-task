import { defineStore } from "pinia";
import { sortingOrders } from "../constants";
import { ref } from "vue";

export const useStore = defineStore("store", () => {
  const sorting = ref({
    sortingName: "",
    sortingOrder: sortingOrders.asc,
  });
  const loads = ref();

  const changeSortings = ({ sortingName, sortingOrder }) => {
    this.sorting.sortingName = sortingName;
    this.sorting.sortingOrder = sortingOrder;
  };

  return {
    sorting,
    loads,
    changeSortings,
  };
});
