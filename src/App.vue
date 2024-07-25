<script setup>
import { onMounted } from "vue";
import { Container, Section } from "./components/ui/wrappers";
import Filters from "./components/Filters.vue";
import Loads from "./components/loads/Loads.vue";
import { useStore } from "./core/store/store";
import { useLoadsService } from "./core/services/loadsService";

const store = useStore();

onMounted(() => {
  const loadsService = useLoadsService();

  store.$patch({
    loads: loadsService.getLoads(),
    truckTypes: loadsService.getTruckTypes(),
  });
});
</script>
<template>
  <Container>
    <Filters />
    <Section>
      <Loads />
    </Section>
  </Container>
</template>
