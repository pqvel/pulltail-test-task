<script setup>
import { ref, onMounted, watch } from "vue";
import Litepicker from "litepicker";
import { BIconCalendarFill } from "bootstrap-icons-vue";

const props = defineProps({
  modelValue: Object,
});

const emit = defineEmits(["update:modelValue"]);

const datepickerRef = ref(null);
const startDate = ref(
  props.modelValue?.startDate ? new Date(props.modelValue.startDate) : null
);
const endDate = ref(
  props.modelValue?.endDate ? new Date(props.modelValue.endDate) : null
);

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      startDate.value = new Date(newVal.startDate);
      endDate.value = new Date(newVal.endDate);
    }
  }
);

const formatDate = (date) => {
  if (!date) return "";
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

onMounted(() => {
  const picker = new Litepicker({
    element: datepickerRef.value,
    singleMode: false,
    format: "DD/MM/YYYY",
    setup: (picker) => {
      picker.on("selected", (date1, date2) => {
        const start = new Date(date1.format("YYYY-MM-DD"));
        const end = new Date(date2.format("YYYY-MM-DD"));
        emit("update:modelValue", {
          startDate: start.toISOString(),
          endDate: end.toISOString(),
        });
      });
    },
  });
});
</script>

<template>
  <div class="date-range form-floating w-100 me-2">
    <input
      ref="datepickerRef"
      class="form-control w-100 m-0"
      style="width: 300px; margin: 15px 0"
      :value="`${formatDate(startDate)} - ${formatDate(endDate)}`"
      readonly
    />
    <label for="numberInput"> Date Range* </label>
    <BIconCalendarFill class="date-range-icon text-secondary" />
  </div>
</template>

<style scoped lang="scss">
.date-range {
  position: relative;

  &-icon {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
