<template>
  <div>
    <!-- [ breadcrumb ] start -->
    <Breadcrumb title="Productos" description="Administra tus productos" icon="box"></Breadcrumb>
    <!-- [ breadcrumb ] end -->
    <div class="pcoded-inner-content">
      <div class="main-body">
        <div class="page-wrapper">
          <div class="page-body">
            <!-- [ page content ] start -->
            <button
              class="btn waves-effect waves-light btn-primary"
              data-toggle="modal"
              data-target="#product-modal"
            >
              <i class="feather icon-plus"></i>Nuevo producto
            </button>
            <hr>
            <div class="card">
              <!-- Modal static-->
              <div class="modal fade" id="product-modal" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h4 class="modal-title">{{ isEditing ? 'Editando' : 'Nuevo' }} producto</h4>
                      <button type="button" class="close" @click="cancel" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <TextInput
                        type="text"
                        label="Nombre"
                        :value="productName"
                        @input="setProductName"
                      ></TextInput>
                      <TextInput
                        type="number"
                        label="Precio"
                        :value="productPrice"
                        @input="setProductPrice"
                      ></TextInput>
                      <TextareaInput
                        label="Descripción"
                        :value="productDescription"
                        @input="setProductDescription"
                      ></TextareaInput>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-default waves-effect"
                        @click="cancel"
                      >Cancelar</button>
                      <button
                        type="button"
                        class="btn btn-primary waves-effect waves-light"
                        @click="addProduct"
                      >Guardar</button>
                    </div>
                  </div>
                </div>
              </div>
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
                        <th>Precio</th>
                        <th>Descripción</th>
                        <th>Opciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="product in products" :key="product.id">
                        <td>{{ product.name }}</td>
                        <td>{{ product.price | currency }}</td>
                        <td>{{ product.description }}</td>
                        <td>
                          <!-- <button class="btn btn-sm waves-effect waves-light btn-success mr-1">
                            <i class="icofont icofont-eye-alt"></i>
                          </button>-->
                          <button
                            class="btn btn-sm waves-effect waves-light btn-warning mr-1"
                            @click="editProduct(product.id)"
                          >
                            <i class="icofont icofont-ui-edit"></i>
                          </button>
                          <button
                            class="btn btn-sm waves-effect waves-light btn-danger"
                            @click="deleteProduct(product.id)"
                          >
                            <i class="icofont icofont-ui-delete"></i>
                          </button>
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
    ...mapGetters('authentication', ['isLoggedIn', 'isEditing']),
    ...mapGetters('products', ['isEditing']),
  },
  methods: {
    ...mapMutations('products', ['setProductName', 'setProductDescription', 'setProductPrice', 'setEdit', 'setId']),
    ...mapActions('products', ['index', 'store', 'update', 'destroy']),
    addProduct() {
      if (this.productName === null || this.productName === '') {
        this.$snotify.error('Nombre no puede ir vacio.', 'Error');
      } else if (this.productPrice <= 0) {
        this.$snotify.error('Precio debe ser mayor a cero.', 'Error');
      } else if (this.productDescription === null || this.productDescription === '') {
        this.$snotify.error('Descripción no puede ir vacia.', 'Error');
      } else {
        window.$('#product-modal').modal('toggle');
        if (this.isEditing) {
          this.update();
          this.$snotify.success('Producto actualizado.');
        } else {
          this.store();
          this.$snotify.success('Producto agregado.');
        }
      }
    },
    editProduct(id) {
      this.products.forEach((element) => {
        if (element.id === id) {
          this.setId(element.id);
          this.setProductName(element.name);
          this.setProductPrice(element.price);
          this.setProductDescription(element.description);
          this.setEdit(true);
          window.$('#product-modal').modal('toggle');
        }
      });
    },
    deleteProduct(id) {
      this.setId(id);
      this.destroy();
    },
    cancel() {
      if (this.isEditing) {
        this.setEdit(false);
        this.setId(null);
        this.setProductName(null);
        this.setProductPrice(null);
        this.setProductDescription(null);
      }
      window.$('#product-modal').modal('toggle');
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
