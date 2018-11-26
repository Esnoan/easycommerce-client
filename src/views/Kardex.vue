<template>
  <div>
    <!-- [ breadcrumb ] start -->
    <Breadcrumb title="Inventario" description="Administra tu inventario" icon="package"></Breadcrumb>
    <!-- [ breadcrumb ] end -->
    <div class="pcoded-inner-content">
      <div class="main-body">
        <div class="page-wrapper">
          <div class="page-body">
            <!-- [ page content ] start -->
            <hr>
            <div class="card">
              <!-- Modal static-->
              <div class="card-header">
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
              <div class="card-block table-border-style">
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Fecha</th>
                        <th>Detalle</th>
                        <th>Entradas</th>
                        <th>Salidas</th>
                        <th>Saldos</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="line in kardex" :key="line.id">
                        <td>{{ line.created_at | moment }}</td>
                        <td>{{ line.detail }}</td>
                        <td>
                          <table>
                            <thead>
                              <tr>
                                <th>Cantidad</th>
                                <th>Valor unitario</th>
                                <th>Valor Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="input in line.inputs" :key="input.id">
                                <td>{{ input.quantity }}</td>
                                <td>{{ input.unit_value | currency }}</td>
                                <td>{{ input.total_value | currency }}</td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                        <td>
                          <table>
                            <thead>
                              <tr>
                                <th>Cantidad</th>
                                <th>Valor unitario</th>
                                <th>Valor Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="output in line.outputs" :key="output.id">
                                <td>{{ output.quantity }}</td>
                                <td>{{ output.unit_value | currency }}</td>
                                <td>{{ output.total_value | currency }}</td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                        <td>
                          <table>
                            <thead>
                              <tr>
                                <th>Cantidad</th>
                                <th>Valor unitario</th>
                                <th>Valor Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="stock in line.stocks" :key="stock.id">
                                <td>{{ stock.quantity }}</td>
                                <td>{{ stock.unit_value | currency }}</td>
                                <td>{{ stock.total_value | currency }}</td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <!-- [ page content ] end -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextInput from '@/components/TextInput.vue';
import TextareaInput from '@/components/TextareaInput.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import { mapMutations, mapState, mapActions, mapGetters } from 'vuex';
import router from '../router';

export default {
  mounted() {
    if (this.isLoggedIn) {
      this.setProductId(this.$route.params.id);
      this.index();
    } else {
      return router.push('/login');
    }
  },
  computed: {
    ...mapState('kardex', ['productId', 'kardex']),
    ...mapGetters('authentication', ['isLoggedIn']),
  },
  methods: {
    ...mapMutations('kardex', ['setProductId']),
    ...mapActions('kardex', ['index']),
  },
  components: {
    TextInput,
    TextareaInput,
    Breadcrumb,
  },
};
</script>

<style>
</style>
