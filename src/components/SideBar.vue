<template>
  <nav class="pcoded-navbar">
    <div class="nav-list">
      <div class="pcoded-inner-navbar main-menu">
        <div class="pcoded-navigation-label">Navegación</div>
        <ul class="pcoded-item pcoded-left-item" v-if="!isLoggedIn">
          <li class="">
            <router-link to="/" tag="a" class="waves-effect waves-dark">
              <span class="pcoded-micon">
                <i class="feather icon-home"></i>
              </span>
              <span class="pcoded-mtext">Inicio</span>
            </router-link>
          </li>
          <li class="">
            <router-link to="/login" tag="a" class="waves-effect waves-dark">
              <span class="pcoded-micon">
                <i class="feather icon-log-in"></i>
              </span>
              <span class="pcoded-mtext">Iniciar sesión</span>
            </router-link>
          </li>
          <li class="">
            <router-link to="/register" tag="a" class="waves-effect waves-dark">
              <span class="pcoded-micon">
                <i class="feather icon-user-plus"></i>
              </span>
              <span class="pcoded-mtext">Registrarse</span>
            </router-link>
          </li>
        </ul>
        <ul class="pcoded-item pcoded-left-item" v-if="isLoggedIn">
          <li class="">
            <router-link to="/dashboard" tag="a" class="waves-effect waves-dark">
              <span class="pcoded-micon">
                <i class="feather icon-home"></i>
              </span>
              <span class="pcoded-mtext">Dashboard</span>
            </router-link>
          </li>
          <li class="">
            <router-link to="/products" tag="a" class="waves-effect waves-dark">
              <span class="pcoded-micon">
                <i class="feather icon-box"></i>
              </span>
              <span class="pcoded-mtext">Productos</span>
            </router-link>
          </li>
          <li class="">
            <router-link to="/sales" tag="a" class="waves-effect waves-dark">
              <span class="pcoded-micon">
                <i class="feather icon-tag"></i>
              </span>
              <span class="pcoded-mtext">Ventas</span>
            </router-link>
          </li>
          <li class="">
            <router-link to="/purchases" tag="a" class="waves-effect waves-dark">
              <span class="pcoded-micon">
                <i class="feather icon-shopping-cart"></i>
              </span>
              <span class="pcoded-mtext">Compras</span>
            </router-link>
          </li>
          <li class="">
            <router-link to="/inventory" tag="a" class="waves-effect waves-dark">
              <span class="pcoded-micon">
                <i class="feather icon-package"></i>
              </span>
              <span class="pcoded-mtext">Inventario</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SideBar',
  computed: {
    ...mapGetters('authentication', ['isLoggedIn']),
  },
};
</script>

<style>
</style>
