import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import Snotify from 'vue-snotify';
import 'vue-snotify/styles/material.css';

import VueChartkick from 'vue-chartkick';
import Chart from 'chart.js';

import App from './App.vue';
import router from './router';
import store from './store/index';
import './filters';

Vue.config.productionTip = false;
Vue.use(Snotify, {
  toast: {
    timeout: 4000,
    bodyMaxLength: 200,
    titleMaxLength: 20,
  },
});

Vue.use(VueChartkick, { adapter: Chart });

sync(store, router);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
