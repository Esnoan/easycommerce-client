<template>
  <div>
    <!-- [ breadcrumb ] start -->
    <Breadcrumb title="Ventas" description="Administra tus ventas" icon="tag"></Breadcrumb>
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
              <i class="feather icon-plus"></i>Nueva venta
            </button>
            <!-- Modal static-->
            <div class="modal fade" id="sale-modal" tabindex="-1" role="dialog">
              <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h4 class="modal-title">Nueva Venta</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <SaleLine
                      v-for="line in saleLine"
                      :key="line.id"
                      :id="line.id"
                      :valueProduct="line.product_id"
                      :valueQuantity="line.quantity"
                      :errorP="line.errorP"
                      :errorQ="line.errorQ"
                      @inputA="setValueA"
                      @inputB="setValueB"
                      @remove="removeLine"
                    ></SaleLine>
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
                      @click="addSale"
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
                        <th>Salidas</th>
                        <th>Ganancia estimada</th>
                        <th>Fecha</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="sale in sales.slice().reverse()" :key="sale.id">
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
                              <tr v-for="product in sale.products" :key="product.id">
                                <td>{{ product.name }}</td>
                                <td>{{ product.price | currency }}</td>
                                <td>{{ product.pivot.quantity }}</td>
                                <td>{{ product.price * product.pivot.quantity | currency }}</td>
                              </tr>
                              <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>{{ total(sale.products) | currency }}</td>
                              </tr>
                            </tbody>
                          </table>
                          <!--<p
                            v-for="product in sale.products"
                            :key="product.id"
                          >{{ product.name }} - {{ product.pivot.quantity }}</p>-->
                        </td>
                        <td>
                          <table>
                            <thead>
                              <tr>
                                <th>Valor unitario real</th>
                                <th>Cantidad</th>
                                <th>Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="output in sale.outputs" :key="output.id">
                                <td>{{ output.unit_value | currency }}</td>
                                <td>{{ output.quantity }}</td>
                                <td>{{ output.total_value | currency }}</td>
                              </tr>
                              <tr>
                                <td></td>
                                <td></td>
                                <td>{{ totalEstimado(sale.outputs) | currency }}</td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                        <td>{{ total(sale.products) - totalEstimado(sale.outputs) | currency }}</td>
                        <td>{{ sale.created_at | moment }}</td>
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
import SaleLine from '@/components/SaleLine.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import { mapMutations, mapState, mapActions, mapGetters } from 'vuex';
import router from '../router';

export default {
  data() {
    return {
      saleLine: [{
        id: 0,
        product_id: '',
        quantity: 0,
        errorP: '',
        errorQ: '',
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
    ...mapState('sales', ['sales', 'errors']),
    ...mapGetters('authentication', ['isLoggedIn']),
    ...mapGetters('sales', ['getErrors']),
  },
  methods: {
    ...mapMutations('sales', ['setProducts']),
    ...mapActions('sales', ['index', 'store']),
    total(products) {
      let total = 0;
      for (let i = 0; i < products.length; i += 1) {
        const element = products[i];
        const precioA = parseFloat(element.price * element.pivot.quantity);
        total += precioA;
      }
      return total;
    },
    totalEstimado(outputs) {
      let total = 0;
      if (outputs) {
        for (let i = 0; i < outputs.length; i += 1) {
          const element = outputs[i];
          const precioA = parseFloat(element.total_value);
          total += precioA;
        }
      }
      return total;
    },
    addSale() {
      let errorP = false;
      let errorQ = false;
      this.saleLine.forEach((element) => {
        if (element.product_id === '') {
          errorP = true;
          element.errorP = true;
        } else {
          element.errorP = false;
        }
        if (element.quantity === 0) {
          errorQ = true;
          element.errorQ = true;
        } else {
          element.errorQ = false;
        }
      });

      if (errorP) {
        this.$snotify.error('No has seleccionado un producto.', 'Error en los campos');
      }

      if (errorQ) {
        this.$snotify.error('Has seleccionado una cantidad 0 para un producto', 'Error en los campos');
      }

      if (!errorP && !errorQ) {
        window.$('#sale-modal').modal('toggle');
        this.setProducts(this.saleLine);
        this.saleLine = [{ id: 0, product_id: '', quantity: 0 }];
        this.store();

        if (this.getErrors === false) {
          // this.$snotify.success('Venta agregada.');
        }
        if (this.getErrors === true) {
          // this.$snotify.error('Venta no agregada. no hay sufientes unidades de un producto', 'Error');
        }
      }

      // window.$('#sale-modal').modal('toggle');
      // this.setProducts(this.saleLine);
      // this.saleLine = [{ id: 0, product_id: '', quantity: 0 }];
      // this.store();
    },
    addLine() {
      this.saleLine.push({
        id: this.saleLine.length,
        product_id: '',
        quantity: 0,
        errorP: '',
        errorQ: '',
      });
    },
    removeLine(idToRemove) {
      this.saleLine = this.saleLine.filter((line) => {
        return line.id !== idToRemove;
      });
    },
    setValueA(event) {
      const res = event.split(':');
      const value = res[0];
      const id = res[1];
      this.saleLine[id].product_id = value;
    },
    setValueB(event) {
      const res = event.split(':');
      const value = res[0];
      const id = res[1];
      this.saleLine[id].quantity = value;
    },
  },
  components: {
    TextInput,
    TextareaInput,
    SaleLine,
    Breadcrumb,
  },
};
</script>

<style>
</style>
