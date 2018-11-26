<template>
  <div class="form-group row">
    <label class="col-sm-3 col-form-label">Producto</label>
    <div class="col-sm-3">
      <select name="select" :class="classP" v-bind:value="valueProduct" v-on="inputAListeners">
        <option disabled value="">Elije</option>
        <option v-for="product in products" :key="product.id" :value="product.id">{{product.name}}</option>
      </select>
    </div>
    <label class="col-sm-2 col-form-label">Cantidad</label>
    <div class="col-sm-2">
      <input type="number" :class="classQ" v-bind:value="valueQuantity" v-on="inputBListeners">
    </div>
    <div class="col-sm-1">
      <button @click="$emit('remove', identificador)" type="button" class="close">
        <span style="color: red" aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  props: ['id', 'valueProduct', 'valueQuantity', 'errorP', 'errorQ'],
  mounted() {
    if (this.isLoggedIn) {
      this.index();
    }
  },
  data() {
    return {
      identificador: this.id,
    };
  },
  methods: {
    ...mapActions('products', ['index', 'store']),
  },
  computed: {
    ...mapState('products', ['products']),
    ...mapGetters('authentication', ['isLoggedIn']),
    classP() {
      return this.errorP ? 'form-control fill form-control-danger ' : 'form-control fill';
    },
    classQ() {
      return this.errorQ ? 'form-control fill form-control-danger ' : 'form-control fill';
    },
    inputAListeners() {
      const vm = this;
      const x = this.identificador;
      // `Object.assign` merges objects together to form a new object
      return Object.assign(
        {},
        // We add all the listeners from the parent
        this.$listeners,
        // Then we can add custom listeners or override the
        // behavior of some listeners.
        {
          // This ensures that the component works with v-model
          input(event) {
            vm.$emit('inputA', `${event.target.value}:${x}`);
          },
        },
      );
    },
    inputBListeners() {
      const vm = this;
      const x = this.identificador;
      // `Object.assign` merges objects together to form a new object
      return Object.assign(
        {},
        // We add all the listeners from the parent
        this.$listeners,
        // Then we can add custom listeners or override the
        // behavior of some listeners.
        {
          // This ensures that the component works with v-model
          input(event) {
            vm.$emit('inputB', `${event.target.value}:${x}`);
          },
        },
      );
    },
  },
};
</script>

<style>
</style>
