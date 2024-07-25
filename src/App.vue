<script setup>
import { onMounted } from "vue";
import { Container, Section } from "./components/ui/wrappers";
import Filters from "./components/Filters.vue";
import Loads from "./components/loads/Loads.vue";
import { useLoadsService } from "./core/services/loadsService";

// onMounted(() => {
//   const loadsService = useLoadsService();

//   store.$patch({
//     loads: loadsService.getLoads(),
//     truckTypes: loadsService.getTruckTypes(),
//   });
// });
</script>
<template>
  <Container>
    <Section>
      <Filters />
    </Section>
    <Section>
      <Loads />
    </Section>
  </Container>
</template>
