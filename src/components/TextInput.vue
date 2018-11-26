<template>
  <div class="form-group row">
    <label class="col-sm-3 col-form-label">{{label}}</label>
    <div class="col-sm-9">
      <input
        :type="type"
        class="form-control"
        v-bind="$attrs"
        v-bind:value="value"
        v-on="inputListeners"
      >
    </div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: ['label', 'value', 'type'],
  computed: {
    inputListeners() {
      const vm = this;
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
            vm.$emit('input', event.target.value);
          },
        },
      );
    },
  },
};
</script>

<style>
</style>
