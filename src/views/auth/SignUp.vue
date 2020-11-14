<template>
  <v-app>
    <v-card width="400" class="mx-auto mt-5">
      <v-card-title>
        <router-link :to="{ name: 'signIn' }" class="indigo--text"
          >Sign In</router-link
        >
        <span class="grey--text ml-2 mr-2"> or</span>
        Sign Up
      </v-card-title>
      <v-card-text>
        <v-form v-model="isValid">
          <v-text-field
            label="Your email"
            prepend-icon="mdi-email"
            v-model="email"
            required
            :rules="emailRules"
          />
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          color="info"
          block
          :disabled="!isValid || isDone === true"
          @click="signUp"
          >Sign Up
        </v-btn>
      </v-card-actions>
      <v-alert
        v-if="status === 'success'"
        border="bottom"
        dark
        type="success"
        class="ma-2"
      >
        Thank you. Please check your email.
      </v-alert>
      <v-alert v-if="status === 'error'" dense text type="error" class="ma-2">
        There was a problem. Please try again
      </v-alert>
    </v-card>
  </v-app>
</template>

<script>
import { emailFormatRule } from '../../utils'

export default {
  name: 'SignUp',
  data: () => ({
    showPassword: false,
    email: 'dev+admin_user@activeprime.com',
    emailRules: [(v) => !!v || 'Username (email) is required', emailFormatRule],
    isValid: true,
    isDone: false,
    status: null
  }),
  methods: {
    signUp() {
      this.axios
        .post('auth/start_account_signup', {
          email: this.email
        })
        .then(
          () => {
            this.status = 'success'
            this.isDone = true
          },
          (error) => {
            this.status = 'error'
          }
        )
    }
  }
}
</script>
