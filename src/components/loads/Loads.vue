<script setup>
import { ref, computed, reactive } from "vue";
import { BIconInfoCircleFill } from "bootstrap-icons-vue";
import { Table, TableRow, TableTitle } from "../ui/table";
import TableSortBtn from "../ui/table/TableSortBtn.vue";
import { loads as originalLoads } from "../../core/data";
import { sortingOrders, sortings } from "../../core/constants";
import { loadsSortingReducer } from "../../core/sotring/loadsSorting";
import LoadItem from "./LoadItem.vue";

const loads = ref(originalLoads);

const sorting = reactive({
  sortingName: "",
  sortingOrder: sortingOrders.asc,
});

const currentLoadIndex = ref(null);

const sortedLoads = computed(() => {
  return loadsSortingReducer(loads.value, sorting);
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
        v-for="(load, i) in sortedLoads"
        :key="i"
        :load="load"
        :active="i === currentLoadIndex"
        @handleActive="() => setCurrentLoadIndex(i)"
      />
    </template>
  </Table>
</template>
