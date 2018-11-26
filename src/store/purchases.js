import HTTP from '../http';

export default {
  namespaced: true,
  state: {
    purchases: [],
    products: null,
  },
  getters: {},
  mutations: {
    appendPurchases(state, purchase) {
      state.purchases.push(purchase);
    },
    setPurchases(state, purchases) {
      state.purchases = purchases;
    },
    setProducts(state, products) {
      state.products = products;
    },
  },
  actions: {
    index({ commit }) {
      return HTTP()
        .get('/purchases')
        .then(({ data }) => {
          commit('setPurchases', data.purchases);
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
          amount: element.amount,
        });
        ids.push(element.product_id);
      });

      const idsUnique = removeDuplicates(ids);

      idsUnique.forEach((element) => {
        products.push({ product_id: element, quantity: 0, amount: 0 });
      });

      products.forEach((product) => {
        for (let i = 0; i < oldProducts.length; i += 1) {
          const element = oldProducts[i];
          if (product.product_id === element.product_id) {
            const quantityA = parseInt(product.quantity, 10);
            const quantityB = parseInt(element.quantity, 10);
            const quantityT = quantityA + quantityB;
            const totalQ = quantityT.toString();
            product.quantity = totalQ;
            const amountA = parseInt(product.amount, 10);
            const amountB = parseInt(element.amount, 10);
            const amountT = amountA + amountB;
            const totalA = amountT.toString();
            product.amount = totalA;
          }
        }
      });

      return HTTP()
        .post('/purchases', {
          products,
        })
        .then(({ data }) => {
          commit('appendPurchases', data.purchase);
          commit('setProducts', null);
        })
        .catch(() => {});
    },
  },
};
