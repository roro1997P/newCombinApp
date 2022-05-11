<template>
  <q-page>
    <div v-if="isLoggedIn" class="row text-center">
      <div class="col-lg-6 col-md-5 col-sm-12">
        <Home />
      </div>
      <div class="col-lg-6 col-md-7 col-sm-12">
        <Table />
      </div>
    </div>
    <div v-else class="absolute-center vertical-middle">
      <q-card
        dark
        bordered
      >
        <div class="text-h6 q-pa-md">Press the login button</div>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { computed, defineComponent, onBeforeMount } from "vue";
import { useStore } from 'vuex';

import Home from "./Home.vue";
import Table from "./Table.vue";

export default defineComponent({
  name: "Index",
  components: { Home, Table },
  setup() {
    const store = useStore();

    const isLoggedIn = computed( () => store.getters['home/getUserIsLoggedIn']);

    const doGetMembers = async () => {
      await store.dispatch('home/doGetMembers');
    };

    onBeforeMount( async () => {
      await doGetMembers();
    });

    return {
      isLoggedIn
    }
  }
});
</script>
