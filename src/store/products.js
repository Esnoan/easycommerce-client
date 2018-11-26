import HTTP from '../http';

export default {
  namespaced: true,
  state: {
    products: [],
    productName: null,
    productDescription: null,
    productPrice: null,
    edit: false,
    id: null,
  },
  getters: {
    isEditing(state) {
      return state.edit;
    },
  },
  mutations: {
    setProductName(state, name) {
      state.productName = name;
    },
    setProductDescription(state, description) {
      state.productDescription = description;
    },
    setProductPrice(state, price) {
      state.productPrice = price;
    },
    appendProduct(state, product) {
      state.products.push(product);
    },
    setProducts(state, products) {
      state.products = products;
    },
    setEdit(state, edit) {
      state.edit = edit;
    },
    setId(state, id) {
      state.id = id;
    },
    editProduct(state, product) {
      state.products.forEach((element) => {
        if (element.id === product.id) {
          element.name = product.name;
          element.description = product.description;
          element.price = product.price;
        }
      });
    },
    deleteProduct(state, id) {
      let index = 0;
      state.products.forEach((element) => {
        if (element.id === id) {
          index = state.products.indexOf(element);
        }
      });
      state.products.splice(index, 1);
    },
  },
  actions: {
    index({ commit }) {
      return HTTP()
        .get('/products')
        .then(({ data }) => {
          commit('setProducts', data.products);
        });
    },
    store({ commit, state }) {
      return HTTP()
        .post('/products', {
          name: state.productName,
          description: state.productDescription,
          price: state.productPrice,
        })
        .then(({ data }) => {
          commit('appendProduct', data.product);
          commit('setProductName', '');
          commit('setProductDescription', '');
          commit('setProductPrice', '');
        })
        .catch(() => {
          commit('setRegisterError', 'Errores al registrase');
        });
    },
    update({ commit, state }) {
      return HTTP()
        .patch(`/products/${state.id}`, {
          name: state.productName,
          description: state.productDescription,
          price: state.productPrice,
        })
        .then(() => {
          const product = {
            id: state.id,
            name: state.productName,
            description: state.productDescription,
            price: state.productPrice,
          };
          commit('setProductName', '');
          commit('setProductDescription', '');
          commit('setProductPrice', '');
          commit('setId', '');
          commit('setEdit', false);
          commit('editProduct', product);
        })
        .catch(() => {
          console.log('error');
        });
    },
    destroy({ commit, state }) {
      return HTTP()
        .delete(`/products/${state.id}`)
        .then(() => {
          const { id } = state.id;
          commit('setId', '');
          commit('deleteProduct', id);
        });
    },
  },
};
