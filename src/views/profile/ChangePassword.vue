<template>
  <div>
    <v-form v-model="pendingPasswordIsValidated">
      <v-text-field
        :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="passwordRules"
        :type="showNewPassword ? 'text' : 'password'"
        label="New Password"
        hint="At least 8 characters"
        value=""
        v-model="pendingUserPassword"
        @click:append="showNewPassword = !showNewPassword"
        class="mx-5"
      />
      <v-text-field
        :append-icon="showNewPasswordReentered ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[newPasswordsMatch]"
        :type="showNewPasswordReentered ? 'text' : 'password'"
        label="Reenter Your New Password"
        v-model="pendingUserPasswordReentered"
        @click:append="showNewPasswordReentered = !showNewPasswordReentered"
        class="mx-5"
      />
    </v-form>
    <v-btn
      class="ma-5"
      :disabled="!pendingPasswordIsValidated"
      @click="sendRequestToServerToUpdateUserPassword"
    >
      Change password
    </v-btn>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { passwordRules } from '../../utils'

export default {
  name: 'Profile',
  components: {},
  data: function () {
    return {
      passwordRules: passwordRules,
      pendingPasswordIsValidated: undefined,
      pendingUserPassword: '',
      pendingUserPasswordReentered: '',
      showNewPassword: false,
      showNewPasswordReentered: false
    }
  },
  computed: {
    ...mapState({
      axiosJwtConfig: (state) => state.auth.axiosJwtConfig,
      userId: (state) => state.user.id
    }),
    newPasswordsMatch: function () {
      return (
        this.pendingUserPassword === this.pendingUserPasswordReentered ||
        'Password must match.'
      )
    }
  },
  methods: {
    sendRequestToServerToUpdateUserPassword: function () {
      let vm = this
      this.axios
        .post(
          '/admin/users/' + this.userId,
          { password: this.pendingUserPassword },
          this.axiosJwtConfig
        )
        .then(
          () => {
            vm.$emit('passwordChanged')
          },
          (error) => {
            console.log(error)
          }
        )
    }
  }
}
</script>
