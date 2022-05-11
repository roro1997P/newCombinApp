<template>
  <q-form
    @submit="onFormSubmit"
    @reset="onFormReset"
    class="q-gutter-md"
    ref="formRef"
  >
    <q-input
      dark
      filled
      v-model.trim="form.firstName"
      label="First name *"
      lazy-rules
      :rules="[ val => val && val.length > 1 || 'Please type something with more than 1 character']"
      autocomplete="new-firstName"
    />

    <q-input
      dark
      filled
      v-model.trim="form.lastName"
      label="Last name *"
      lazy-rules
      :rules="[ val => val && val.length > 1 || 'Please type something with more than 1 character']"
      autocomplete="new-lastName"
    />

    <q-input
      dark
      filled
      v-model.trim="form.address"
      label="Address *"
      lazy-rules
      :rules="[ val => val && val.length > 1 || 'Please type something with more than 1 character']"
      autocomplete="new-address"
    />

    <q-input
      dark
      filled
      v-model.trim="form.ssn"
      label="SSN *"
      lazy-rules
      :rules="[ 
        val => val && val.length > 10 || 'Please type a valid ssn number',
        val => val && findAnotherIdenticalSSN() || 'There is already another member with that ssn'
      ]"
      autocomplete="new-ssn"
      mask="###-##-####"
      hint="###-##-####"
    />

    <q-separator dark />

    <q-card-actions align="around">
      <q-btn flat type="reset" :loading="loading">Reset</q-btn>
      <q-btn flat type="submit" :loading="loading">Save</q-btn>
    </q-card-actions>
  </q-form>
</template>

<script>
import { inject } from 'vue';
import { useStore } from 'vuex';

export default {
  props: {
    onFormSubmit: {
      type: Function,
      required: true
    },
    onFormReset: {
      type: Function,
      required: true
    },
    loading: {
      type: Boolean
    }
  },
  setup() {
    const store = useStore();

    const form = inject("form");

    const findAnotherIdenticalSSN = () => {
      const members = store.getters['home/getMembers'];
      const exists = members.find( member => member.ssn === form.ssn);
      return !exists;
    }
    
    return {
      form,
      findAnotherIdenticalSSN
    }
  }
}
</script>

<style>

</style>