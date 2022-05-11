import { api, authApi } from 'src/boot/axios'
import { Notify } from 'quasar';

export async function doSignIn ({ commit, dispatch }) {
  try {
    const response = await authApi.post('auth', { username: 'sarah', password: 'connor' });
    commit("setUserState", response.data);
    dispatch('doGetMembers');
    return response;
  } catch (error) {
    Notify.create({
      type: 'negative',
      message: error.message
    })
    return null
  }
};

export async function doSendFormData ({ commit }, payload) {
  try {
    const response = await api.post('members', payload);
    commit("setFormData", response.data);
    return response;
  } catch (error) {
    return null
  }
};

export async function doGetMembers ({ commit }) {
  try {
    const response = await api.get('members');
    commit("setMembersData", response.data);
    return response;
  } catch (error) {
    return null
  }
};