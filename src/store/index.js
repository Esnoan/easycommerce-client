import Vue from 'vue';
import Vuex from 'vuex';
// import createPersistedState from "vuex-persistedstate";

import authentication from './authentication';
import products from './products';
import sales from './sales';
import purchases from './purchases';
import kardex from './kardex';
import dashboard from './dashboard';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    baseUrl: '/api',
  },
  mutations: {},
  actions: {},
  modules: {
    authentication,
    products,
    sales,
    purchases,
    kardex,
    dashboard,
  },
  // plugins: [createPersistedState()],
});
