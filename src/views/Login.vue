<template>
  <div class="pcoded-inner-content">
    <div class="main-body">
      <div class="page-wrapper">
        <div class="page-body">
          <!-- [ page content ] start -->
          <section class="login-block">
            <!-- Container-fluid starts -->
            <div class="container-fluid">
              <div class="row">
                <div class="col-sm-12">
                  <!-- Authentication card start -->
                  <form class="md-float-material form-material">
                    <div class="auth-box card">
                      <div class="card-block">
                        <div class="row m-b-20">
                          <div class="col-md-12">
                            <h3 class="text-center txt-primary">Iniciar sesión</h3>
                          </div>
                        </div>
                        <p
                          class="text-muted text-center p-b-5"
                        >Iniciar sesión con su correo electrónico</p>
                        <div class="form-group form-primary">
                          <TextInput
                            label="Tu correo electrónico"
                            :value="loginEmail"
                            @input="setLoginEmail"
                          ></TextInput>
                        </div>
                        <div class="form-group form-primary">
                          <PasswordInput
                            label="Contraseña"
                            :value="loginPassword"
                            @input="setLoginPassword"
                          ></PasswordInput>
                        </div>
                        <div class="row m-t-30">
                          <div class="col-md-12">
                            <button
                              @click="iniciar"
                              type="button"
                              class="btn btn-primary btn-md btn-block waves-effect text-center m-b-20"
                            >
                              Iniciar
                              sesión
                            </button>
                          </div>
                        </div>
                        <p class="text-inverse text-left">¿No tienes una cuenta?
                          <router-link tag="a" to="/register">
                            <b>Registrar aquí</b>
                          </router-link>
                        </p>
                      </div>
                    </div>
                  </form>
                  <!-- end of form -->
                </div>
                <!-- Authentication card end -->
              </div>
              <!-- end of col-sm-12 -->
            </div>
            <!-- end of row -->
            <!-- end of container-fluid -->
          </section>
          <!-- [ page content ] end -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import TextInput from '@/components/TextInput.vue';
import PasswordInput from '@/components/PasswordInput.vue';

export default {
  computed: {
    ...mapState('authentication', ['loginEmail', 'loginPassword']),
  },
  methods: {
    ...mapMutations('authentication', ['setLoginEmail', 'setLoginPassword']),
    ...mapActions('authentication', ['login']),
    iniciar() {
      if (this.loginEmail === null || this.loginEmail === '') {
        this.$snotify.error('Email no puede ir vacio.', 'Error');
      } else if (this.loginPassword === null || this.loginPassword === '') {
        this.$snotify.error('Contraseña no puede ir vacia.', 'Error');
      } else {
        this.login();
      }
    },
  },
  components: {
    TextInput,
    PasswordInput,
  },
};
</script>

<style>
</style>
