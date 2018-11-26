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
                        <th>Nombre</th>
                        <th>Existencias</th>
                        <th>Kardex</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="product in products" :key="product.id">
                        <td>{{ product.name }}</td>
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
                              <tr v-for="input in existencias(product.stocks)" :key="input.id">
                                <td>{{ input.quantity }}</td>
                                <td>{{ input.unit_value | currency }}</td>
                                <td>{{ input.total_value | currency }}</td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                        <td>
                          <router-link
                            :to="`/kardex/${product.id}`"
                            tag="button"
                            class="btn waves-effect waves-light btn-primary"
                          >
                            <i class="feather icon-book"></i>Ver
                          </router-link>
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
      this.index();
    } else {
      return router.push('/login');
    }
  },
  computed: {
    ...mapState('products', ['productName', 'productDescription', 'productPrice', 'products']),
    ...mapGetters('authentication', ['isLoggedIn']),
  },
  methods: {
    ...mapMutations('products', ['setProductName', 'setProductDescription', 'setProductPrice']),
    ...mapActions('products', ['index', 'store']),
    existencias(stocks) {
      const last = stocks[stocks.length - 1];
      const array = [];
      if (last !== undefined) {
        const lastId = last.kardex_id;
        stocks.forEach((element) => {
          if (element.kardex_id === lastId) {
            array.push(element);
          }
        });
      } else {
        array.push({ quantity: 0, unit_value: 0, total_value: 0 });
      }
      return array;
    },
    addProduct() {
      window.$('#product-modal').modal('toggle');
      this.store();
    },
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
