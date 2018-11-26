import router from '../router';
import HTTP from '../http';

export default {
  namespaced: true,
  state: {
    registerEmail: null,
    registerPassword: null,
    registerError: null,
    registerFirstName: null,
    registerLastName: null,
    registerCompany: null,
    registerPhone: null,
    loginEmail: 'andrewu121@gmail.com',
    loginPassword: 'rdca1212010',
    loginError: null,
    token: null,
    user: null,
  },
  getters: {
    isLoggedIn(state) {
      return !!state.token;
    },
    getUser(state) {
      return state.user ? state.user : {};
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUser(state, user) {
      state.user = user;
    },
    setRegisterError(state, error) {
      state.registerError = error;
    },
    setRegisterEmail(state, email) {
      state.registerEmail = email;
    },
    setRegisterPassword(state, password) {
      state.registerPassword = password;
    },
    setRegisterFirstName(state, firstNames) {
      state.registerFirstName = firstNames;
    },
    setRegisterLastName(state, lastNames) {
      state.registerLastName = lastNames;
    },
    setRegisterCompany(state, company) {
      state.registerCompany = company;
    },
    setRegisterPhone(state, phone) {
      state.registerPhone = phone;
    },
    setLoginError(state, error) {
      state.loginError = error;
    },
    setLoginEmail(state, email) {
      state.loginEmail = email;
    },
    setLoginPassword(state, password) {
      state.loginPassword = password;
    },
  },
  actions: {
    register({ commit, state }) {
      return HTTP()
        .post('/auth/signup', {
          email: state.registerEmail,
          password: state.registerPassword,
          first_names: state.registerFirstName,
          last_names: state.registerLastName,
          phone: state.registerPhone,
          company_name: state.registerCompany,
        })
        .then(({ data }) => {
          commit('setToken', data.token);
          HTTP()
            .post('/auth/user')
            .then((response) => {
              commit('setUser', response.data.user);
            });
          router.push('/dashboard');
        })
        .catch(() => {
          commit('setRegisterError', 'Errores al registrase');
        });
    },
    login({ commit, state }) {
      return HTTP()
        .post('/auth/signin', {
          email: state.loginEmail,
          password: state.loginPassword,
        })
        .then(({ data }) => {
          commit('setToken', data.token);
          HTTP()
            .post('/auth/user')
            .then((response) => {
              commit('setUser', response.data.user);
            });
          router.push('/dashboard');
        })
        .catch(() => {
          commit('setLoginError', 'Errores al loguearse');
        });
    },
    getUser({ commit }) {
      return HTTP()
        .post('/auth/user')
        .then(({ data }) => {
          console.log(data);
          commit('setUser', data);
        })
        .catch(() => {
          commit('setLoginError', 'Errores al loguearse');
        });
    },
    logout({ commit }) {
      commit('setToken', null);
      router.push('/login');
    },
  },
};
