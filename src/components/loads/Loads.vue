<script setup>
import { ref, computed, reactive } from "vue";
import {
  BIconInfoCircleFill,
  BIconRecordCircleFill,
  BIconArrowDown,
  BIconCheck,
  BIconArrowUpRightSquareFill,
} from "bootstrap-icons-vue";
import { Table, TableRow, TableTitle, TableColumn } from "../ui/table";
import { Checkbox } from "../ui/form";
import TableSortBtn from "../ui/table/TableSortBtn.vue";
import { formatPickUpDate } from "../../core/utils/format/formatTime";
import { loads as originalLoads, truckTypes } from "../../core/data";
import { roundUpToTwoDecimals } from "../../core/utils/numbers/round";
import {
  fullPartialValues,
  sortingOrders,
  sortings,
} from "../../core/constants";
import { loadsSortingReducer } from "../../core/sotring/loadsSorting";
import { formatRangeDate } from "../../core/utils/format/formatTime";
import LoadItemInfo from "./LoadItemInfo.vue";

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
      <tr
        class="table-item d-flex"
        v-for="(load, i) in sortedLoads"
        :key="load.id"
        @click="() => setCurrentLoadIndex(i)"
      >
        <td class="p-0">
          <table>
            <TableRow>
              <TableColumn class="align-items-center">
                <Checkbox name="age" :value="load.amount">
                  <span class="px-4">{{ load.age }}m</span>
                </Checkbox>
              </TableColumn>
              <TableColumn
                className="justify-content-end align-items-center"
                v-if="load.amount && load.miles"
              >
                <div class="d-flex flex-column align-items-end me-1">
                  <span>${{ load.amount }}</span>
                  <span class="text-secondary fs-12">
                    ${{ roundUpToTwoDecimals(load.amount / load.miles) }}*/mi
                  </span>
                </div>

                <BIconCheck width="20" height="20" />
              </TableColumn>
              <TableColumn
                className="justify-content-center align-items-center"
                v-else
              >
                <span class="d-flex align-items-center justify-content-center">
                  —
                </span>
              </TableColumn>
              <TableColumn
                className="d-flex align-items-center justify-content-between"
              >
                <div class="d-flex">
                  <div class="w-40px me-2 text-purple">{{ load.miles }}</div>
                  <div class="d-flex align-items-center">
                    <div class="location-icon">
                      <BIconRecordCircleFill width="8" height="8" />
                      <BIconArrowDown width="10" height="10" />
                      <div class="dot"></div>
                    </div>
                    <div class="d-flex flex-column">
                      <span>
                        {{ load.addressPickUp.city }},
                        {{ load.addressPickUp.state }}
                      </span>
                      <span>
                        {{ load.addressDropOff.city }},
                        {{ load.addressDropOff.state }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="d-flex flex-column align-items-end">
                  <span> ({{ load.addressPickUp.dho }}) </span>
                  <span> ({{ load.addressDropOff.dho }}) </span>
                </div>
              </TableColumn>
              <TableColumn className="d-flex justify-content-center">
                {{ formatPickUpDate(load.datePickUpStart, load.datePickUpEnd) }}
              </TableColumn>
              <TableColumn class="equipment d-flex justify-content-between">
                <div class="d-flex">
                  <div class="equipment-code">
                    {{ truckTypes[load.equipment].code }}
                  </div>
                  <div class="equipment-name me-1">
                    {{ truckTypes[load.equipment].name }}
                  </div>
                </div>

                <div class="equipment-info d-flex text-end">
                  {{ load.weight }}lbs {{ load.length }}ft -
                  {{ fullPartialValues[load.fullPartial] }}
                </div>
              </TableColumn>
              <TableColumn className="justify-content-between">
                <div class="d-flex flex-column">
                  <span class="text-purple"> {{ load.company.name }} </span>
                  <span class="text-purple">
                    {{ load.company.contact.email }}
                  </span>
                </div>
                <div class="d-flex flex-column align-items-end">
                  <span> {{ load.company.cs }} CS </span>
                  <span class="text-secondary">
                    {{ load.company.dtp }} DTP
                  </span>
                </div>
              </TableColumn>
            </TableRow>
          </table>
          <!-- <LoadItemInfo /> -->

          <!--  -->
          <tr
            class="load-info d-flex w-100 bg-white"
            v-if="i === currentLoadIndex"
          >
            <td class="load-info-column d-flex flex-column p-1 me-2">
              <div
                class="load-info-title d-flex justify-content-between align-items-center p-1 w-100"
              >
                <span class="fw-bold">TRIP</span>
                <span class="text-muted">{{ load.miles }} ml</span>
              </div>
              <div class="d-flex justify-content-between mt-2">
                <div class="d-flex flex-column pl-2">
                  <span class="fw-bold">
                    {{ load.addressPickUp.city }},
                    {{ load.addressPickUp.state }}
                    ({{ load.addressPickUp.dho }})
                  </span>
                  <span class="text-muted mb-3">
                    {{ formatRangeDate(load.datePickUpStart) }} -
                    {{ formatRangeDate(load.datePickUpEnd) }}
                  </span>
                  <span class="fw-bold">
                    {{ load.addressDropOff.city }},
                    {{ load.addressDropOff.state }}, ({{
                      load.addressDropOff.dho
                    }})
                  </span>
                </div>
                <BIconArrowUpRightSquareFill
                  class="text-purple"
                  width="18"
                  height="18"
                />
              </div>
              <table class="mt-3">
                <thead>
                  <tr>
                    <th class="fw-bold">EQUIPMENT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td width="100" class="text-muted">Load</td>
                    <td class="fw-bolder">
                      {{ fullPartialValues[load.fullPartial] }}
                    </td>
                  </tr>
                  <tr>
                    <td width="100" class="text-muted">Truck</td>
                    <td class="fw-bolder">
                      {{ truckTypes[load.equipment].name }}
                    </td>
                  </tr>
                  <tr>
                    <td width="100" class="text-muted">Length</td>
                    <td class="fw-bolder">{{ load.length }}ft</td>
                  </tr>
                  <tr>
                    <td width="100" class="text-muted">weight</td>
                    <td class="fw-bolder">{{ load.weight }}ft</td>
                  </tr>
                  <tr>
                    <td width="100" class="text-muted">Commodity</td>
                    <td class="fw-bolder">{{ load.commodity || "—" }}</td>
                  </tr>
                  <tr>
                    <td width="100" class="text-muted">Reference ID</td>
                    <td class="fw-bolder">{{ load.id || "—" }}</td>
                  </tr>
                </tbody>
              </table>
              <div>
                <div class="fw-bold mt-3">COMMENTS</div>
                <p>{{ load.comments }}</p>
              </div>
            </td>
            <td class="load-info-column d-flex flex-column p-1 pb-2 me-2">
              <div
                class="load-info-title d-flex justify-content-between align-items-center p-1 w-100"
              >
                <span class="fw-bold">RATE</span>
              </div>
              <table class="mt-3">
                <tr>
                  <td width="100" class="text-muted">Total</td>
                  <td class="fw-bolder">${{ load.amount || "" }}</td>
                </tr>
                <tr>
                  <td width="100" class="text-muted">Trip</td>
                  <td class="fw-bolder">{{ load.miles }} ml</td>
                </tr>
                <tr>
                  <td width="100" class="text-muted">Rate / mile</td>
                  <td class="d-flex align-items-center fw-bolder">
                    <span class="me-2">
                      ${{ roundUpToTwoDecimals(load.amount / load.miles) }}
                    </span>
                    <BIconInfoCircleFill
                      width="14"
                      height="14"
                      fill="#b4b4b4"
                    />
                  </td>
                </tr>
              </table>
              <div
                class="load-info-title d-flex justify-content-between align-items-center p-1 w-100 mt-3"
              >
                <span class="fw-bold">MARKET RATES Powered by DAT IQ</span>
                <span class="text-purple fw-bold">RATEVIEW</span>
              </div>

              <div class="d-flex flex-column h-100 border border-dark mt-3">
                <div
                  class="load-info-title d-flex justify-content-between align-items-center p-1 w-100"
                >
                  <span class="fw-bold">SPOT AND CONTACTS RATES</span>
                </div>
                <div
                  class="d-flex justify-content-center align-items-center mt-2 w-100 h-100 text-muted"
                >
                  Retrieving market rate data...
                </div>
              </div>
            </td>
            <td class="load-info-column d-flex flex-column p-1 pb-2">
              <div
                class="load-info-title d-flex justify-content-between align-items-center p-1 w-100"
              >
                <span class="fw-bold">COMPANY</span>
              </div>

              <div class="mt-3">{{ load.company.name }}</div>

              <div class="mt-3 text-purple">
                {{ load.company.contact.email }}
              </div>

              <table class="mt-4">
                <tr class="py-1">
                  <td width="200" class="text-muted"></td>
                  <td width="100" class="text-muted">Credit Score</td>
                  <td>{{ load.company.cs }}</td>
                </tr>
                <tr class="py-1">
                  <td width="200" class="text-muted">Chicago, ll.</td>
                  <td width="100" class="text-muted">Days To Pay</td>
                  <td>{{ load.company.dtp }}</td>
                </tr>
              </table>

              <div class="fw-bold mt-4">LOAD RESOURCES</div>

              <table class="mt-1">
                <tr>
                  <td width="100" class="text-muted">Factor with</td>
                  <td class="fw-bolder">OTR SOLUTIONS</td>
                </tr>
                <tr>
                  <td width="100" class="text-muted">Insurance</td>
                  <td class="fw-bolder">PER LOAD INSURANCE ml</td>
                </tr>
              </table>
            </td>
          </tr>
        </td>
      </tr>
    </template>
  </Table>
</template>

<style lang="scss">
.location-icon {
  position: relative;
  width: 16px;
  height: 34px;

  svg,
  div {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    &:nth-child(1) {
      top: 3px;
    }

    &:nth-child(2) {
      top: 6px;
    }
  }

  .dot {
    top: 24px;
    background-color: #000000;
    border-radius: 50%;
    width: 6px;
    height: 6px;
  }
}

.fs-12 {
  font-size: 12px;
}

.equipment {
  &-code {
    width: 36px;
  }

  &-name {
    width: 120px;
  }
}

.table-item {
  transition: 0.05s;

  &:nth-child(2n) {
    background-color: #eeeeee;
  }

  &:hover {
    background-color: #dfdfdf;
  }

  td {
    background: transparent;
    border-top: none;
    border-bottom: none;
  }
}

.text-purple {
  color: #003380;
}

.w-40px {
  width: 40px;
}
</style>
