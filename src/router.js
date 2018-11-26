import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Register from './views/Register.vue';
import Login from './views/Login.vue';
import Dashboard from './views/Dashboard.vue';
import Products from './views/Products.vue';
import Sales from './views/Sales.vue';
import Purchases from './views/Purchases.vue';
import Inventory from './views/Inventory.vue';
import Kardex from './views/Kardex.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/products',
      name: 'products',
      component: Products,
    },
    {
      path: '/sales',
      name: 'sales',
      component: Sales,
    },
    {
      path: '/purchases',
      name: 'purchases',
      component: Purchases,
    },
    {
      path: '/inventory',
      name: 'inventory',
      component: Inventory,
    },
    {
      path: '/kardex/:id',
      name: 'kardex',
      component: Kardex,
    },
  ],
});
