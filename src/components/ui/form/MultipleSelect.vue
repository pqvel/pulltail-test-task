<script setup>
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import { reactive } from "vue";
import { truckTypes } from "../../../core/data";

const selectedOptions = reactive([]);
const options = reactive(truckTypes);
</script>

<template>
  <div>
    <Multiselect
      v-model="selectedOptions"
      :options="options"
      :multiple="true"
      :track-by="'code'"
      :label="'name'"
      placeholder="Select options"
    >
      <template #tag="{ option, remove }">
        <span class="custom-tag">
          {{ option.name }}
          <button type="button" @click="remove(option)">✕</button>
        </span>
      </template>
      <template #option="{ option }">
        <div class="custom-option">
          <span>{{ option.name }} ({{ option.code }})</span>
        </div>
      </template>
    </Multiselect>
  </div>
</template>

<style>
.custom-tag {
  display: inline-flex;
  align-items: center;
  background-color: #e0e0e0;
  border-radius: 4px;
  padding: 5px;
  margin: 2px;
}

.custom-tag button {
  background: none;
  border: none;
  font-size: 14px;
  margin-left: 5px;
  cursor: pointer;
}

.custom-option {
  padding: 5px 10px;
  cursor: pointer;
}

.custom-option:hover {
  background-color: #f0f0f0;
}
</style>
