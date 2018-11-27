import axios from 'axios';
import store from './store/';

export default () => {
  return axios.create({
    baseURL: 'https://easycommerce-andres.herokuapp.com/api',
    timeout: 10000,
    headers: {
      Authorization: `Bearer ${store.state.authentication.token}`,
    },
  });
};
