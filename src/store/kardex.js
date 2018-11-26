import HTTP from '../http';

export default {
  namespaced: true,
  state: {
    kardex: [],
    productId: null,
  },
  getters: {},
  mutations: {
    setProductId(state, id) {
      state.productId = id;
    },
    setKardex(state, kardex) {
      state.kardex = kardex;
    },
  },
  actions: {
    index({ commit, state }) {
      return HTTP()
        .get(`/product/${state.productId}/kardex`)
        .then(({ data }) => {
          commit('setKardex', data.kardex);
        });
    },
  },
};
