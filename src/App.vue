<template>
  <div>
    <!-- <div class="loader-bg">
      <div class="loader-bar"></div>
    </div>-->
    <div id="pcoded" class="pcoded">
      <div class="pcoded-container navbar-wrapper">
        <!-- [ Header ] start -->
        <AppHeader></AppHeader>
        <!-- [ Header ] end -->
        <div class="pcoded-main-container">
          <div class="pcoded-wrapper">
            <!-- [ navigation menu ] start -->
            <SideBar></SideBar>
            <!-- [ navigation menu ] end -->
            <div class="pcoded-content">
              <!-- [ page content ] start -->
              <router-view></router-view>
              <!-- [ page content ] end -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <vue-snotify></vue-snotify>
  </div>
</template>

<script>
import AppHeader from '@/components/Header.vue';
import SideBar from '@/components/SideBar.vue';


export default {
  components: {
    AppHeader,
    SideBar,
  },
};
</script>

<style lang="scss">
</style>
