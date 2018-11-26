import HTTP from '../http';

export default {
  namespaced: true,
  state: {
    sales: [],
    salesB: [],
    cantidades: 0,
    ventas: 0,
    purchases: [],
    purchasesB: [],
    cantidadesP: 0,
    compras: 0,
  },
  getters: {},
  mutations: {
    setSales(state, sales) {
      state.sales = sales;
    },
    setSalesB(state, sales) {
      state.salesB = sales;
    },
    setCantidades(state, cantidades) {
      state.cantidades = cantidades;
    },
    setVentas(state, ventas) {
      state.ventas = ventas;
    },
    setPuchases(state, purchases) {
      state.purchases = purchases;
    },
    setPuchasesB(state, purchasesB) {
      state.purchasesB = purchasesB;
    },
    setCantidadesP(state, cantidades) {
      state.cantidadesP = cantidades;
    },
    setCompras(state, compras) {
      state.compras = compras;
    },
  },
  actions: {
    index({ commit }) {
      return HTTP()
        .get('/dashboard')
        .then(({ data }) => {
          commit('setSales', data.salesQ);
          commit('setSalesB', data.salesA);
          commit('setCantidades', data.cantidadesS);
          commit('setVentas', data.ventas);
          commit('setPuchases', data.purchasesQ);
          commit('setPuchasesB', data.purchasesA);
          commit('setCantidadesP', data.cantidadesP);
          commit('setCompras', data.compras);
        });
    },
  },
};
