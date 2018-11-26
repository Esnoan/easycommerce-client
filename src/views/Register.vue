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
                  <div class="md-float-material form-material">
                    <div class="auth-box card">
                      <div class="card-block">
                        <div class="row m-b-20">
                          <div class="col-md-12">
                            <h3 class="text-center txt-primary">Regístrate</h3>
                          </div>
                        </div>
                        <p class="text-muted text-center p-b-5">Regístrese con su correo electrónico</p>
                        <div class="form-group form-primary">
                          <TextInput
                            label="Tus nombres"
                            :value="registerFirstName"
                            @input="setRegisterFirstName"
                          ></TextInput>
                        </div>
                        <div class="form-group form-primary">
                          <TextInput
                            label="Tus apellidos"
                            :value="registerLastName"
                            @input="setRegisterLastName"
                          ></TextInput>
                        </div>
                        <div class="form-group form-primary">
                          <TextInput
                            label="El nombre de tu empresa"
                            :value="registerCompany"
                            @input="setRegisterCompany"
                          ></TextInput>
                        </div>
                        <div class="form-group form-primary">
                          <TextInput
                            label="Tu celular"
                            :value="registerPhone"
                            @input="setRegisterPhone"
                            type="number"
                          ></TextInput>
                        </div>
                        <div class="form-group form-primary">
                          <TextInput
                            label="Tu correo electrónico"
                            :value="registerEmail"
                            @input="setRegisterEmail"
                          ></TextInput>
                        </div>
                        <div class="form-group form-primary">
                          <div class="form-group form-primary">
                            <PasswordInput
                              label="Contraseña"
                              :value="registerPassword"
                              @input="setRegisterPassword"
                            ></PasswordInput>
                          </div>
                        </div>
                        <div class="row m-t-25 text-left">
                          <!--
                          <div class="col-md-12">
                          <div class="checkbox-fade fade-in-primary">
                          <label>
                          <input type="checkbox" value="">
                          <span class="cr">
                          <i class="cr-icon icofont icofont-ui-check txt-primary"></i>
                          </span>
                          <span class="text-inverse">
                          Leo y acepto los
                          <a href="#">
                          Términos y
                          Condiciones.
                          </a>
                          </span>
                          </label>
                          </div>
                          </div>

                          <div class="col-md-12">
                          <div class="checkbox-fade fade-in-primary">
                          <label>
                          <input type="checkbox" value="">
                          <span class="cr">
                          <i class="cr-icon icofont icofont-ui-check txt-primary"></i>
                          </span>
                          <span class="text-inverse">
                          Envíame el
                          <a href="">boletín</a>
                          semanalmente.
                          </span>
                          </label>
                          </div>
                          </div>
                          -->
                        </div>
                        <div class="row m-t-30">
                          <div class="col-md-12">
                            <button
                              class="btn btn-primary btn-md btn-block waves-effect text-center m-b-20"
                              @click="registrarse"
                            >
                              Regístrate
                              ahora
                            </button>
                          </div>
                        </div>
                        <hr>
                        <div class="row">
                          <div class="col-md-10">
                            <p class="text-inverse text-left">
                              <router-link to="/login" tag="a">Iniciar sesión</router-link>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- Authentication card end -->
                </div>
                <!-- end of col-sm-12 -->
              </div>
              <!-- end of row -->
            </div>
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
    ...mapState('authentication', ['registerEmail', 'registerPassword', 'registerFirstName', 'registerLastName', 'registerCompany', 'registerPhone']),
  },
  methods: {
    ...mapMutations('authentication', ['setRegisterEmail', 'setRegisterPassword', 'setRegisterFirstName', 'setRegisterLastName', 'setRegisterCompany', 'setRegisterPhone']),
    ...mapActions('authentication', ['register']),
    registrarse() {
      if (this.registerEmail === null || this.registerEmail === '') {
        this.$snotify.error('Email no puede ir vacio.', 'Error');
      } else if (this.registerPassword === null || this.registerPassword === '') {
        this.$snotify.error('Contraseña no puede ir vacia.', 'Error');
      } else if (this.registerFirstName === null || this.registerFirstName === '') {
        this.$snotify.error('Nombres no pueden ir vacios.', 'Error');
      } else if (this.registerLastName === null || this.registerLastName === '') {
        this.$snotify.error('Apellidos no pueden ir vacios.', 'Error');
      } else if (this.registerCompany === null || this.registerCompany === '') {
        this.$snotify.error('Nombre de empresa no puede ir vacio.', 'Error');
      } else if (this.registerPhone === null || this.registerPhone === 0) {
        this.$snotify.error('Número de celular no puede ir vacio.', 'Error');
      } else {
        this.register();
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
