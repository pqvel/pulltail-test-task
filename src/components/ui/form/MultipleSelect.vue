<script setup>
import { v4 as uuid } from "uuid";
import { ref } from "vue";
import Multiselect from "vue-multiselect";
const value = ref({ name: "Javascript", code: "js" });
const options = ref([
  { name: "Vue.js", code: "vu" },
  { name: "Javascript", code: "js" },
  { name: "Open Source", code: "os" },
]);

function addTag(newTag) {
  const tag = {
    name: newTag,
    code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
  };
  this.options.push(tag);
  this.value.push(tag);
}

const inputId = "multipleSelect" + uuid();
const autocompleteInput = ref(null);
defineProps({
  label: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div>
    <label class="typo__label">Tagging</label>
    <Multiselect
      v-model="value"
      tag-placeholder="Add this as new tag"
      placeholder="Search or add a tag"
      label="name"
      track-by="code"
      :options="options"
      :multiple="true"
      :taggable="true"
      @tag="addTag"
    >
    </Multiselect>
  </div>
</template>

<style lang="scss">
@import url("vue-multiselect/dist/vue-multiselect.css");
</style>
