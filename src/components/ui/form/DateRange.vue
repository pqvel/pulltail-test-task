<script setup>
import Litepicker from "litepicker";
import { onMounted, ref } from "vue";

// const dateRangeInput = ref(null);

onMounted(() => {
  const picker = new Litepicker({
    element: document.getElementById("datepicker"),
    singleMode: false,
    tooltipText: {
      one: "night",
      other: "nights",
    },
    tooltipNumber: (totalDays) => {
      return totalDays - 1;
    },
  });
});
</script>

<template>
  <input type="text" id="datepicker" />
</template>
