import { boot } from "quasar/wrappers";
import axios from "axios";
import { Notify } from "quasar";

const api = axios.create({ baseURL: "http://localhost:8081/api/" });
const authApi = axios.create({ baseURL: "http://localhost:8081/" });

export default boot(({ app, store }) => {
  api.interceptors.request.use(async function (config) {
    const isSignedIn = store.getters['home/getUserIsLoggedIn'];
    if (isSignedIn) {
      config.headers.Authorization = 'Bearer ' + store.getters['home/getUserToken'];
      return config
    } else {
      store.commit('home/clearData');
      Notify.create({
        type: 'warning',
        message: 'You are not logged in'
      })
      throw new Error('You are not logged in');
    }
  }, function (error) {
    Notify.create({
      type: 'negative',
      message: error
    })
    return Promise.reject(error)
  });

  authApi.interceptors.request.use(async function (config) {
    return config;
  }, function (error) {
    Notify.create({
      type: 'negative',
      message: error
    })
    return Promise.reject(error)
  })

  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
  app.config.globalProperties.$authApi = authApi;
});

export { api, authApi };
