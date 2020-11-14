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
            :disabled="true"
          />
          <v-text-field
            :type="'text'"
            label="Company Name"
            prepend-icon="mdi-office-building"
            v-model="companyName"
            required
            :rules="nameRules"
          />
          <v-text-field
            :type="'text'"
            label="Phone"
            prepend-icon="mdi-phone"
            v-model="phone"
            required
            :rules="phoneRules"
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
import { mapMutations } from 'vuex'
import { passwordRules } from '../../utils'

export default {
  name: 'FinishAccountSignup',
  data: () => ({
    showPassword: false,
    password: 'AdminUser4$',
    companyName: 'ActivePrime Inc',
    firstName: 'Jill',
    lastName: 'Smith',
    nameRules: [
      (v) => !!v || 'Field is required',
      (v) => (v && v.length >= 2) || 'Must have 2 or more characters'
    ],
    isValid: true,
    isDone: false,
    phoneRules: [
      (v) => !!v || 'Field is required',
      (v) => (v && v.length >= 7) || 'Must have length of 7 or more'
    ],
    registration_id: '',
    email: '',
    phone: '555-1212',
    error: '',
    passwordRules: passwordRules
  }),
  created() {
    if (this.$route.query.id) {
      this.registration_id = this.$route.query.id
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
        .post('auth/finish_account_signup', {
          email: this.email,
          registration_id: this.registration_id,
          phone: this.phone,
          password: this.password,
          company_name: this.companyName,
          first_name: this.firstName,
          last_name: this.lastName
        })
        .then(
          (response) => {
            this.setJwt(response.data['jwt'])
            if (response.status === 200) {
              this.$router.push({ name: 'home' })
            } else {
              this.error = response.data['message']
            }
          },
          (error) => {
            console.log(error)
            this.error = 'Registration failed'
          }
        )
    }
  }
}
</script>
