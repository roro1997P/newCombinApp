<template>
  <q-page padding style="max-height: 550px; min-height: 550px" class="q-mb-lg">
    <q-card class="bg-secondary text-white" style="height: 550px">
      <q-card-section>
        <div class="text-h6">Home</div>
      </q-card-section>
      <q-card-section>
        <HomeForm
          :onFormSubmit="onFormSubmit"
          :onFormReset="onFormReset"
          :loading="loading"
          ref="formRef"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, onBeforeMount, provide, reactive, ref, watch } from "vue";
import { useStore } from 'vuex';
import HomeForm from 'src/components/HomeForm.vue';

export default defineComponent({
  name: "Home",
  components: { HomeForm },
  setup() {

    const store = useStore();
    const loading = ref(false);
    const formRef = ref(null);
    const activity = ref(false);

    const form = reactive({
      firstName: '',
      lastName: '',
      address: '',
      ssn: ''
    });

    const onFormSubmit = async () => {
      loading.value = true;
      formRef.value.$refs.formRef.validate().then(async () => {
        await store.dispatch('home/doSendFormData', form);
      });
      loading.value = false;
    };

    const onFormReset = () => {
      form.firstName = '';
      form.lastName = '';
      form.address = '';
      form.ssn = '';
      formRef.value.$refs.formRef.resetValidation();
      activity.value = !activity.value;
    };

    const doGetMembers = async () => {
      await store.dispatch('home/doGetMembers');
    };

    let timeOut = setInterval( async () => {
      await doGetMembers();
    }, 60 * 2000);

    watch( form, () => {
      console.log(form)
      activity.value = !activity.value;
    });

    watch(activity, () => {
      clearInterval(timeOut);
      timeOut = setInterval( async () => {
        await doGetMembers();
      }, 60 * 2000);
    });

    provide("form", form);

    return {
      formRef,
      form,
      loading,
      onFormSubmit,
      onFormReset
    }
  }
});
</script>