<template>
  <v-app>
    <v-card :disabled="error !== ''" width="400" class="mx-auto mt-5">
      <v-card-title>
        Finish Your Registration
      </v-card-title>
      <v-card-text>
        <v-form v-model="isValid">
          <v-text-field
            :type="'text'"
            label="Email"
            prepend-icon="mdi-email"
            required
            v-model="email"
            disabled
          />
          <v-text-field
            :type="'text'"
            label="First Name"
            prepend-icon="mdi-face"
            v-model="firstName"
            required
            :rules="nameRules"
          />
          <v-text-field
            :type="'text'"
            label="Last Name"
            prepend-icon="mdi-face"
            v-model="lastName"
            required
            :rules="nameRules"
          />
          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            v-model="password"
            required
            :rules="passwordRules"
          />
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          color="success"
          block
          :disabled="error !== '' || !isValid || isDone === true"
          @click="register"
          >Finish Registration and Login
        </v-btn>
      </v-card-actions>
      <v-alert v-if="error !== ''" dense text type="error" class="ma-2">
        {{ error }}
      </v-alert>
    </v-card>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { passwordRules } from '../../utils'

export default {
  name: 'FinishAddingUserToAnExistingAccount',
  data: () => ({
    showPassword: false,
    password: 'AdminUser4$',
    firstName: 'Jill',
    lastName: 'Smith',
    nameRules: [
      (v) => !!v || 'Field is required',
      (v) => (v && v.length >= 2) || 'Must have 2 or more characters'
    ],
    isValid: true,
    isDone: false,
    id: '',
    email: '',
    phone: '555-1212',
    error: '',
    passwordRules: passwordRules
  }),
  computed: {
    ...mapState({
      axiosJwtConfig: (state) => state.auth.axiosJwtConfig
    })
  },
  created() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
    }
    if (this.$route.query.email) {
      this.email = this.$route.query.email
    }
  },
  methods: {
    ...mapMutations({
      setJwt: 'auth/setJwt'
    }),
    register() {
      this.axios
        .post(
          'auth/finish_adding_user',
          {
            registration_id: this.id,
            password: this.password,
            first_name: this.firstName,
            last_name: this.lastName
          },
          this.axiosJwtConfig
        )
        .then(
          (response) => {
            if (response.data['jwt']) {
              this.setJwt(response.data['jwt'])
              this.$router.push({ name: 'home' })
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
