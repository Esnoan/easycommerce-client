import Vue from 'vue';
import moment from 'moment';
import currency from 'currency.js';

Vue.filter('moment', (date) => {
  moment.locale('es');
  return moment(date).format('LLL');
});

Vue.filter('currency', (value) => {
  const valor = currency(value);
  return currency(valor, { formatWithSymbol: true, separator: '.', decimal: ',' }).format();
});
