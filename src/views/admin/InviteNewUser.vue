<template>
  <v-card v-if="userCanInviteNewUsers" max-width="600">
    <v-card-title>Invite New User</v-card-title>
    <v-form>
      <v-row>
        <v-col>
          <v-text-field
            label="Email Address"
            class="mx-5 mt-0"
            v-model="emailAddressToInvite"
            :rules="rulesForEmailAddressToSendInvitationTo"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn
            class="ma-5 mt-0"
            :disabled="!enableSendInvitationButton"
            @click="sendRequestToServerToSendInvitation"
          >
            Send invitation
          </v-btn>
        </v-col>
        <v-col>
          <v-progress-circular v-if="showSpinner" indeterminate />
        </v-col>
      </v-row>
    </v-form>
    <v-snackbar
      v-model="showNotificationThatInvitationWasSent"
      color="success"
      :timeout="3000"
    >
      Invitation sent!
    </v-snackbar>
  </v-card>
</template>
<script>
import { mapState } from 'vuex'
import { emailFormatRule } from '../../utils'

export default {
  name: 'InviteNewUser',
  components: {},
  data: function () {
    return {
      emailAddressToInvite: '',
      showNotificationThatInvitationWasSent: false,
      showSpinner: false
    }
  },
  watch: {},
  computed: {
    ...mapState({
      axiosJwtConfig: (state) => state.auth.axiosJwtConfig,
      accountEmailDomain: (state) => state.account.emailDomain,
      userCanInviteNewUsers: (state) =>
        state.user.permittedActions.includes('auth.start_adding_user')
    }),
    enableSendInvitationButton: function () {
      return (
        this.emailAddressToInvite &&
        this.emailAddressToInvite.endsWith(this.accountEmailDomain)
      )
    },
    rulesForEmailAddressToSendInvitationTo() {
      return [
        emailFormatRule,
        (v) =>
          v.endsWith(this.accountEmailDomain) ||
          "Email address must end with the account's domain."
      ]
    }
  },
  methods: {
    sendRequestToServerToSendInvitation: function () {
      let vm = this
      this.showSpinner = true
      this.axios
        .post(
          '/auth/start_adding_user',
          { email: this.emailAddressToInvite },
          this.axiosJwtConfig
        )
        .then(
          () => {
            vm.showNotificationThatInvitationWasSent = true
            vm.emailAddressToInvite = ''
            vm.showSpinner = false
          },
          (error) => {
            console.log(error)
          }
        )
    }
  }
}
</script>
