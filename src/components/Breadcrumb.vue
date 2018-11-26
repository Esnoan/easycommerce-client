<template>
  <div class="page-header card">
    <div class="row align-items-end">
      <div class="col-lg-8">
        <div class="page-header-title">
          <i :class="icono"></i>
          <div class="d-inline">
            <h5>{{ title }}</h5>
            <span>{{ description }}</span>
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="page-header-breadcrumb">
          <ul class="breadcrumb breadcrumb-title">
            <li class="breadcrumb-item">
              <router-link to="/dashboard" tag="a">
                <i class="feather icon-home"></i>
              </router-link>
            </li>
            <li class="breadcrumb-item">
              <a href="#!">{{ title }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: ['title', 'description', 'icon'],
  data() {
    return {
      icono: `feather icon-${this.icon} bg-c-blue`,
    };
  },
};
</script>

<style>
</style>
