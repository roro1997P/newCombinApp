<template>
  <q-page padding>
    <q-table
      title="Members"
      :rows="rows"
      row-key="ssn"
      separator="vertical"
      :rows-per-page-options="[8]"
      style="height: 550px"
    />
  </q-page>
</template>

<script>
import { computed, defineComponent, watch } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Table",
  setup() {
    const store = useStore();
    const rows = computed( () => store.getters['home/getMembers']);
    
    return {
      rows
    }
  }
});
</script>
