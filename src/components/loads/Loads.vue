<script setup>
import { ref, computed, reactive } from "vue";
import { storeToRefs } from "pinia";
import { BIconInfoCircleFill } from "bootstrap-icons-vue";
import { Table, TableRow, TableTitle, TableSortBtn } from "../ui/table";
import LoadItem from "./LoadItem.vue";
import { loads as originalLoads } from "../../core/data";
import { sortingOrders, sortings } from "../../core/constants";
import { loadsFilterReducer } from "../../core/filters/loadsFIlters";
import { loadsSortingReducer } from "../../core/sotring/loadsSorting";
import { useStore } from "../../core/store/store";

const store = useStore();
const { filters } = storeToRefs(store);
const loads = ref(originalLoads);

const sorting = reactive({
  sortingName: "",
  sortingOrder: sortingOrders.asc,
});

const currentLoadIndex = ref(null);

const filteredAndSortedLoads = computed(() => {
  const filteredLoads = loadsFilterReducer(loads.value, filters.value);
  const sortedLoads = loadsSortingReducer(filteredLoads, sorting);

  return sortedLoads;
});

const changeSorting = (sortingName) => {
  if (sorting.sortingName !== sortingName) {
    sorting.sortingName = sortingName;
    sorting.sortingOrder = sortingOrders.asc;
    return;
  }

  const newOrder =
    sorting.sortingOrder === sortingOrders.asc
      ? sortingOrders.desc
      : sortingOrders.asc;

  sorting.sortingOrder = newOrder;
};

const setCurrentLoadIndex = (index) => {
  currentLoadIndex.value = index;
};
</script>

<template>
  <Table>
    <template v-slot:head>
      <TableRow>
        <TableTitle className="d-flex justify-content-center">
          <TableSortBtn
            :active="sorting.sortingName === sortings.age"
            :order="sorting.sortingOrder"
            @handleSort="() => changeSorting(sortings.age)"
          >
            AGE
          </TableSortBtn>
        </TableTitle>
        <TableTitle
          className="d-flex justify-content-between align-items-center"
        >
          <TableSortBtn
            :active="sorting.sortingName === sortings.rate"
            :order="sorting.sortingOrder"
            @handleSort="() => changeSorting(sortings.rate)"
          >
            RATE
          </TableSortBtn>
          <BIconInfoCircleFill width="16" height="16" fill="#b4b4b4" />
        </TableTitle>
        <TableTitle
          className="d-flex justify-content-between align-items-center"
        >
          <span>Trip</span> <span> DH-O </span>
        </TableTitle>
        <TableTitle>
          <TableSortBtn
            :active="sorting.sortingName === sortings.pickUp"
            :order="sorting.sortingOrder"
            @handleSort="() => changeSorting(sortings.pickUp)"
          >
            PICK UP
          </TableSortBtn>
        </TableTitle>
        <TableTitle>Equipment</TableTitle>
        <TableTitle>Company</TableTitle>
      </TableRow>
    </template>
    <template v-slot:body>
      <LoadItem
        v-for="(load, i) in filteredAndSortedLoads"
        :key="i"
        :load="load"
        :active="i === currentLoadIndex"
        @handleActive="() => setCurrentLoadIndex(i)"
      />
    </template>
  </Table>
</template>
