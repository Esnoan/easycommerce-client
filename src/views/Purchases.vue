<template>
  <div>
    <!-- [ breadcrumb ] start -->
    <Breadcrumb title="Compras" description="Administra tus compras" icon="shopping-cart"></Breadcrumb>
    <!-- [ breadcrumb ] end -->
    <div class="pcoded-inner-content">
      <div class="main-body">
        <div class="page-wrapper">
          <div class="page-body">
            <!-- [ page content ] start -->
            <button
              class="btn waves-effect waves-light btn-primary"
              data-toggle="modal"
              data-target="#sale-modal"
            >
              <i class="feather icon-plus"></i>Nueva compra
            </button>
            <!-- Modal static-->
            <div class="modal fade" id="sale-modal" tabindex="-1" role="dialog">
              <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h4 class="modal-title">Nueva Compra</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <PurchaseLine
                      v-for="line in purchaseLine"
                      :key="line.id"
                      :id="line.id"
                      :valueProduct="line.product_id"
                      :valueQuantity="line.quantity"
                      :valueAmount="line.amount"
                      :errorP="line.errorP"
                      :errorQ="line.errorQ"
                      :errorA="line.errorA"
                      @inputA="setValueA"
                      @inputB="setValueB"
                      @inputC="setValueC"
                      @remove="removeLine"
                    ></PurchaseLine>
                    <button
                      type="button"
                      class="btn btn-success waves-effect waves-light"
                      @click="addLine"
                    >Agregar otro</button>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-default waves-effect"
                      data-dismiss="modal"
                    >Cancelar</button>
                    <button
                      type="button"
                      class="btn btn-primary waves-effect waves-light"
                      @click="addPurchase"
                    >Guardar</button>
                  </div>
                </div>
              </div>
            </div>
            <hr>
            <div class="card">
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
                <div class="table-responsive text-center">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Productos</th>
                        <th>Fecha</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="purchase in purchases.slice().reverse()" :key="purchase.id">
                        <td>
                          <table>
                            <thead>
                              <tr>
                                <th>Producto</th>
                                <th>Valor unitario</th>
                                <th>Cantidad</th>
                                <th>Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="product in purchase.products" :key="product.id">
                                <td>{{ product.name }}</td>
                                <td>{{ product.pivot.amount / product.pivot.quantity | currency }}</td>
                                <td>{{ product.pivot.quantity }}</td>
                                <td>{{ product.pivot.amount | currency }}</td>
                              </tr>
                            </tbody>
                          </table>
                          <!--<p
                            v-for="product in sale.products"
                            :key="product.id"
                          >{{ product.name }} - {{ product.pivot.quantity }}</p>-->
                        </td>
                        <td>{{ purchase.created_at | moment }}</td>
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
import PurchaseLine from '@/components/PurchaseLine.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import { mapMutations, mapState, mapActions, mapGetters } from 'vuex';
import router from '../router';

export default {
  data() {
    return {
      purchaseLine: [{
        id: 0,
        product_id: '',
        quantity: 0,
        amount: 0,
        errorP: '',
        errorQ: '',
        errorA: '',
      }],
    };
  },
  mounted() {
    if (this.isLoggedIn) {
      this.index();
    } else {
      return router.push('/login');
    }
  },
  computed: {
    ...mapState('purchases', ['purchases']),
    ...mapGetters('authentication', ['isLoggedIn']),
  },
  methods: {
    ...mapMutations('purchases', ['setProducts']),
    ...mapActions('purchases', ['index', 'store']),
    addPurchase() {
      let errorP = false;
      let errorQ = false;
      let errorA = false;
      this.purchaseLine.forEach((element) => {
        if (element.product_id === '') {
          errorP = true;
          element.errorP = true;
        } else {
          element.errorP = false;
        }
        if (element.quantity === 0 || element.quantity < 0) {
          errorQ = true;
          element.errorQ = true;
        } else {
          element.errorQ = false;
        }
        if (element.amount === 0 || element.amount < 0) {
          errorA = true;
          element.errorA = true;
        } else {
          element.errorA = false;
        }
      });

      if (errorP) {
        this.$snotify.error('No has seleccionado un producto.', 'Error en los campos');
      }

      if (errorQ) {
        this.$snotify.error('Has seleccionado una cantidad de 0 o menor para un producto', 'Error en los campos');
      }

      if (errorA) {
        this.$snotify.error('Has seleccionado un valor de 0 o menor para un producto', 'Error en los campos');
      }

      if (!errorP && !errorQ && !errorA) {
        window.$('#sale-modal').modal('toggle');
        this.setProducts(this.purchaseLine);
        this.purchaseLine = [{ id: 0, product_id: '', quantity: 0 }];
        this.store();
        this.$snotify.success('Compra agregada.');
      }
    },
    addLine() {
      this.purchaseLine.push({
        id: this.purchaseLine.length,
        product_id: '',
        quantity: 0,
        amount: 0,
        errorP: '',
        errorQ: '',
        errorA: '',
      });
    },
    removeLine(idToRemove) {
      this.purchaseLine = this.purchaseLine.filter((line) => {
        return line.id !== idToRemove;
      });
    },
    setValueA(event) {
      const res = event.split(':');
      const value = res[0];
      const id = res[1];
      this.purchaseLine[id].product_id = value;
    },
    setValueB(event) {
      const res = event.split(':');
      const value = res[0];
      const id = res[1];
      this.purchaseLine[id].quantity = value;
    },
    setValueC(event) {
      const res = event.split(':');
      const value = res[0];
      const id = res[1];
      this.purchaseLine[id].amount = value;
    },

  },
  components: {
    TextInput,
    TextareaInput,
    PurchaseLine,
    Breadcrumb,
  },
};
</script>

<style>
</style>
