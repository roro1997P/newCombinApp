import { store } from "quasar/wrappers";
import { createStore } from "vuex";

import home from './home'


export default store(function () {
  const Store = createStore({
    modules: {
      home
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
  });

  return Store;
});
