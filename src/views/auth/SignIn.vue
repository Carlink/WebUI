<template>
  <v-app>
    <v-card width="400" class="mx-auto mt-5">
      <v-card-title>
        Sign In
        <span class="grey--text ml-2 mr-2"> or</span>
        <router-link :to="{ name: 'signUp' }" class="indigo--text"
          >Sign Up</router-link
        >
      </v-card-title>
      <v-card-text>
        <v-form v-model="isValid">
          <v-text-field
            label="Username (email)"
            prepend-icon="mdi-account-circle"
            v-model="username"
            required
            :rules="emailRules"
          />
          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            v-model="password"
            required
          />
        </v-form>
        <v-alert v-if="error" type="error">
          {{ error }}
        </v-alert>
        <v-card-actions>
          <v-btn color="info" block :disabled="!isValid" @click="signIn">
            Sign In
          </v-btn>
        </v-card-actions>
        <v-layout align-end justify-end class="mt-4 mr-2 mb-1">
          <v-btn text x-small :to="{ name: 'forgotPassword' }" color="indigo">
            Forgot Password?
          </v-btn>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'SignIn',
  data: () => ({
    showPassword: false,
    username: 'dev+admin_user@activeprime.com',
    password: 'AdminUser4$',
    isValid: true,
    emailRules: [
      (v) => !!v || 'Username (email) is required',
      (v) => /.+@.+/.test(v) || 'Must be a valid email'
    ],
    error: ''
  }),
  methods: {
    ...mapMutations({
      setJwt: 'auth/setJwt'
    }),
    signIn() {
      this.axios
        .post('auth/sign_in', {
          username: this.username,
          password: this.password
        })
        .then(
          (response) => {
            if (response.status === 200) {
              this.setJwt(response.data['jwt'])
              this.$router.push({ name: 'home' })
            } else {
              this.error = response.data['error']['message']
            }
          },
          (error) => {
            this.error = error.response.data['error']['message']
          }
        )
    }
  }
}
</script>
