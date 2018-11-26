<template>
  <div>
    <!-- [ breadcrumb ] start -->
    <Breadcrumb title="Dashboard" description="Bienvenido" icon="home"></Breadcrumb>
    <!-- [ breadcrumb ] end -->
    <div class="pcoded-inner-content">
      <div class="main-body">
        <div class="page-wrapper">
          <div class="page-body">
            <!-- [ page content ] start -->
            <div class="row">
              <!-- product profit start -->
              <div class="col-xl-3 col-md-6">
                <div class="card prod-p-card card-red">
                  <div class="card-body">
                    <div class="row align-items-center m-b-30">
                      <div class="col">
                        <h6 class="m-b-5 text-white">Cantidades vendidas Totales</h6>
                        <h3 class="m-b-0 f-w-700 text-white">{{cantidades}}</h3>
                      </div>
                      <div class="col-auto">
                        <i class="fas fa-database text-c-red f-18"></i>
                      </div>
                    </div>
                    <p class="m-b-0 text-white">
                      <!-- <span class="label label-danger m-r-10">+11%</span>From Previous Month -->
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-md-6">
                <div class="card prod-p-card card-blue">
                  <div class="card-body">
                    <div class="row align-items-center m-b-30">
                      <div class="col">
                        <h6 class="m-b-5 text-white">Ventas totales</h6>
                        <h3 class="m-b-0 f-w-700 text-white">{{ventas | currency }}</h3>
                      </div>
                      <div class="col-auto">
                        <i class="fas fa-money-bill-alt text-c-blue f-18"></i>
                      </div>
                    </div>
                    <p class="m-b-0 text-white">
                      <!--  <span class="label label-primary m-r-10">+12%</span>From Previous Month -->
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-md-6">
                <div class="card prod-p-card card-green">
                  <div class="card-body">
                    <div class="row align-items-center m-b-30">
                      <div class="col">
                        <h6 class="m-b-5 text-white">Cantidades compradas totales</h6>
                        <h3 class="m-b-0 f-w-700 text-white">{{ cantidadesP }}</h3>
                      </div>
                      <div class="col-auto">
                        <i class="fas fa-tags text-c-green f-18"></i>
                      </div>
                    </div>
                    <p class="m-b-0 text-white">
                      <!-- <span class="label label-success m-r-10">+52%</span>From Previous Month -->
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-md-6">
                <div class="card prod-p-card card-yellow">
                  <div class="card-body">
                    <div class="row align-items-center m-b-30">
                      <div class="col">
                        <h6 class="m-b-5 text-white">Compras totales</h6>
                        <h3 class="m-b-0 f-w-700 text-white">{{ compras | currency }}</h3>
                      </div>
                      <div class="col-auto">
                        <i class="fas fa-dollar-sign text-c-yellow f-18"></i>
                      </div>
                    </div>
                    <p class="m-b-0 text-white">
                      <!-- <span class="label label-warning m-r-10">+52%</span>From Previous Month -->
                    </p>
                  </div>
                </div>
              </div>
              <!-- product profit end -->
              <div class="col-xl-6 col-md-12">
                <div class="card">
                  <div class="card-header">
                    <h5>Ventas por cantidades</h5>
                    <div class="card-header-right">
                      <ul class="list-unstyled card-option">
                        <li class="first-opt">
                          <i class="feather icon-chevron-left open-card-option"></i>
                        </li>
                        <li>
                          <i class="feather icon-maximize full-card"></i>
                        </li>
                        <li>
                          <i class="feather icon-minus minimize-card"></i>
                        </li>
                        <li>
                          <i class="feather icon-refresh-cw reload-card"></i>
                        </li>
                        <li>
                          <i class="feather icon-trash close-card"></i>
                        </li>
                        <li>
                          <i class="feather icon-chevron-left open-card-option"></i>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="card-block">
                    <column-chart :data="sales"></column-chart>
                  </div>
                </div>
              </div>
              <div class="col-xl-6 col-md-12">
                <div class="card">
                  <div class="card-header">
                    <h5>Ventas totales</h5>
                    <div class="card-header-right">
                      <ul class="list-unstyled card-option">
                        <li class="first-opt">
                          <i class="feather icon-chevron-left open-card-option"></i>
                        </li>
                        <li>
                          <i class="feather icon-maximize full-card"></i>
                        </li>
                        <li>
                          <i class="feather icon-minus minimize-card"></i>
                        </li>
                        <li>
                          <i class="feather icon-refresh-cw reload-card"></i>
                        </li>
                        <li>
                          <i class="feather icon-trash close-card"></i>
                        </li>
                        <li>
                          <i class="feather icon-chevron-left open-card-option"></i>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="card-block">
                    <column-chart :data="salesB"></column-chart>
                  </div>
                </div>
              </div>
              <div class="col-xl-6 col-md-12">
                <div class="card">
                  <div class="card-header">
                    <h5>Compras por cantidades</h5>
                    <div class="card-header-right">
                      <ul class="list-unstyled card-option">
                        <li class="first-opt">
                          <i class="feather icon-chevron-left open-card-option"></i>
                        </li>
                        <li>
                          <i class="feather icon-maximize full-card"></i>
                        </li>
                        <li>
                          <i class="feather icon-minus minimize-card"></i>
                        </li>
                        <li>
                          <i class="feather icon-refresh-cw reload-card"></i>
                        </li>
                        <li>
                          <i class="feather icon-trash close-card"></i>
                        </li>
                        <li>
                          <i class="feather icon-chevron-left open-card-option"></i>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="card-block">
                    <column-chart :data="purchases"></column-chart>
                  </div>
                </div>
              </div>
              <div class="col-xl-6 col-md-12">
                <div class="card">
                  <div class="card-header">
                    <h5>Compras totales</h5>
                    <div class="card-header-right">
                      <ul class="list-unstyled card-option">
                        <li class="first-opt">
                          <i class="feather icon-chevron-left open-card-option"></i>
                        </li>
                        <li>
                          <i class="feather icon-maximize full-card"></i>
                        </li>
                        <li>
                          <i class="feather icon-minus minimize-card"></i>
                        </li>
                        <li>
                          <i class="feather icon-refresh-cw reload-card"></i>
                        </li>
                        <li>
                          <i class="feather icon-trash close-card"></i>
                        </li>
                        <li>
                          <i class="feather icon-chevron-left open-card-option"></i>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="card-block">
                    <column-chart :data="purchasesB"></column-chart>
                  </div>
                </div>
              </div>
              <!-- ticket, proj, clent start -->
              <!--
              <div class="col-xl-3 col-md-6">
                <div class="card ticket-card">
                  <div class="card-body">
                    <p class="m-b-30 bg-c-red lbl-card">
                      <i class="fas fa-folder-open"></i>Open Tickets
                    </p>
                    <div class="text-center">
                      <h2 class="m-b-0 d-inline-block text-c-red">128</h2>
                      <p class="m-b-0 d-inline-block">Tickets</p>
                      <p class="m-b-0 m-t-15">
                        <i class="fas fa-caret-down m-r-10 f-18 text-c-red"></i>From Previous Month
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-md-6">
                <div class="card ticket-card">
                  <div class="card-body">
                    <p class="m-b-30 bg-c-blue lbl-card">
                      <i class="fas fa-file-archive"></i>Close Tickets
                    </p>
                    <div class="text-center">
                      <h2 class="m-b-0 d-inline-block text-c-blue">134</h2>
                      <p class="m-b-0 d-inline-block">Tickets</p>
                      <p class="m-b-0 m-t-15">
                        <i class="fas fa-caret-up m-r-10 f-18 text-c-blue"></i>From Previous Month
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-md-6">
                <div class="card ticket-card">
                  <div class="card-body">
                    <p class="m-b-30 bg-c-green lbl-card">
                      <i class="fas fa-users"></i>New Clients
                    </p>
                    <div class="text-center">
                      <h2 class="m-b-0 d-inline-block text-c-green">307</h2>
                      <p class="m-b-0 d-inline-block">Clients</p>
                      <p class="m-b-0 m-t-15">
                        <i class="fas fa-caret-up m-r-10 f-18 text-c-green"></i>From Previous Month
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-md-6">
                <div class="card ticket-card">
                  <div class="card-body">
                    <p class="m-b-30 bg-c-yellow lbl-card">
                      <i class="fas fa-database"></i>New Orders
                    </p>
                    <div class="text-center">
                      <h2 class="m-b-0 d-inline-block text-c-yellow">231</h2>
                      <p class="m-b-0 d-inline-block">Orders</p>
                      <p class="m-b-0 m-t-15">
                        <i class="fas fa-caret-up m-r-10 f-18 text-c-yellow"></i>From Previous Month
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              -->
              <!-- ticket, proj, clent end -->
              <div class="col-xl-6 col-md-12"></div>
            </div>
            <!-- [ page content ] end -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Breadcrumb from '@/components/Breadcrumb.vue';
import { mapGetters, mapState, mapActions } from 'vuex';
import router from '../router';

export default {
  mounted() {
    if (this.isLoggedIn) {
      this.index();
    } else {
      return router.push('/login');
    }
  },
  computed: {
    ...mapState('dashboard', ['sales', 'salesB', 'cantidades', 'ventas', 'purchases', 'purchasesB', 'cantidadesP', 'compras']),
    ...mapGetters('authentication', ['isLoggedIn']),
  },
  methods: {
    ...mapActions('dashboard', ['index']),
  },
  components: {
    Breadcrumb,
  },
};
</script>

<style>
</style>
