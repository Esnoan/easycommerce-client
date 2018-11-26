import HTTP from '../http';

export default {
  namespaced: true,
  state: {
    sales: [],
    products: null,
    errors: false,
  },
  getters: {
    getErrors(state) {
      return state.errors;
    },
  },
  mutations: {
    appendSales(state, sale) {
      state.sales.push(sale);
    },
    setSales(state, sales) {
      state.sales = sales;
    },
    setProducts(state, products) {
      state.products = products;
    },
    setErrors(state, errors) {
      state.errors = errors;
    },
  },
  actions: {
    index({ commit }) {
      return HTTP()
        .get('/sales')
        .then(({ data }) => {
          commit('setSales', data.sales);
        });
    },
    store({ commit, state }) {
      function removeDuplicates(arr) {
        const uniqueArray = [];
        for (let i = 0; i < arr.length; i += 1) {
          if (uniqueArray.indexOf(arr[i]) === -1) {
            uniqueArray.push(arr[i]);
          }
        }
        return uniqueArray;
      }

      const products = [];
      const oldProducts = [];
      const ids = [];

      state.products.forEach((element) => {
        oldProducts.push({
          product_id: element.product_id,
          quantity: element.quantity,
        });
        ids.push(element.product_id);
      });

      const idsUnique = removeDuplicates(ids);

      idsUnique.forEach((element) => {
        products.push({ product_id: element, quantity: 0 });
      });

      products.forEach((product) => {
        for (let i = 0; i < oldProducts.length; i += 1) {
          const element = oldProducts[i];
          if (product.product_id === element.product_id) {
            const quantityA = parseInt(product.quantity, 10);
            const quantityB = parseInt(element.quantity, 10);
            const quantityT = quantityA + quantityB;
            const total = quantityT.toString();
            product.quantity = total;
          }
        }
      });

      return HTTP()
        .post('/sales', {
          products,
        })
        .then(({ data }) => {
          if (data.error === true) {
            commit('setErrors', true);
          } else {
            commit('appendSales', data.sale);
            commit('setProducts', null);
            commit('setErrors', false);
          }
        })
        .catch(() => {});
    },
  },
};
