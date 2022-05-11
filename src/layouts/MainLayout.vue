<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-black">
        <q-toolbar-title> NewCombin - Client </q-toolbar-title>

        <q-btn v-if="!isLoggedIn" :loading="loading" @click="doSignIn" label="Login"/>
        <q-btn v-else @click="doLogOut" label="Logout"/>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import { useStore } from 'vuex';

export default defineComponent({
  name: "MainLayout",
  setup() {
    const store = useStore();

    const loading = ref(false);
    const isLoggedIn = computed( () => store.getters['home/getUserIsLoggedIn']);

    const doSignIn = async () => {
      loading.value = true;
      await store.dispatch('home/doSignIn');
      loading.value = false;
    };

    const doLogOut = () => {
      store.commit('home/clearData');
    }

    return {
      loading,
      isLoggedIn,
      doSignIn,
      doLogOut
    }
  }
});
</script>
