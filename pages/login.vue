<template>
  <v-app id="login">
    <v-main>
      <v-container fill-height fluid>
        <v-row
          align="center"
          justify="center"
        >
          <v-col cols="12" sm="8" md="4">
            <v-card outlined>
              <v-card-title
                class="headline text-uppercase"
              >
                Login
              </v-card-title>
              <v-card-text class="overline">
                Movie app
              </v-card-text>
              <v-card-text class="px-4 pt-5">
                <v-form ref="form">
                  <v-text-field
                    id="username"
                    v-model="formData.username"
                    :rules="[
                      (v) => !!v || 'Username is required'
                    ]"
                    label="Username"
                    placeholder="username"
                    type="text"
                    outlined
                    required
                  />
                  <v-text-field
                    id="password"
                    key="password-input"
                    v-model="formData.password"
                    :rules="[
                      (v) => !!v || 'Password is required',
                      (v) =>
                        (v && v.length >= 6) ||
                        'Password cannot be less than 6 characters'
                    ]"
                    label="Password"
                    placeholder="password"
                    outlined
                    required
                    :append-icon="showP ? `mdi-eye-outline` : `mdi-eye-off-outline`"
                    :type="showP ? `text` : `password`"
                    @keypress.13.prevent="validateBeforeSubmit"
                    @click:append="showP = !showP"
                  />
                </v-form>
              </v-card-text>
              <v-card-text>
                (username and password can be anything)
              </v-card-text>
              <v-card-actions class="px-4">
                <v-btn
                  id="btnLogin"
                  block
                  large
                  color="primary"
                  type="submit"
                  dark
                  @click="doLogin"
                >
                  login
                </v-btn>
              </v-card-actions>
              <v-card-text v-if="false">
                <div class="text-center">
                  Belum punya akun?
                  <nuxt-link to="/register">
                    daftar sekarang
                  </nuxt-link>
                </div>
                <div class="text-center">
                  Sudah daftar tapi belum bisa login?
                  <nuxt-link to="/verification">
                    verifikasi di sini
                  </nuxt-link>
                </div>
              </v-card-text>
              <v-card-text v-if="false" class="greylight">
                <div class="text-center">
                  Lupa password
                  <nuxt-link to="/forgetpassword">
                    Reset di sini
                  </nuxt-link>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import debounce from 'lodash.debounce'
export default {
  layout: 'login',
  data: () => ({
    formData: {
      username: null,
      password: null
    },
    showP: false
  }),
  methods: {
    doLogin: debounce(async function () {
      try {
        if (this.$refs.form.validate()) {
          this.loadingButton = true
          await this.$store.dispatch('user/loginAct', this.formData)
          this.loadingButton = false
          this.$router.push('/')
        }
      } catch (error) {
        this.loadingButton = false
        this.$nuxt.$emit('EAT_SNACKBAR', {
          view: true,
          color: 'error',
          message: error
        })
      }
    }, 1000, { leading: true, trailing: false })
  }
}
</script>
