<template>
  <div>
    <v-card v-if="accountId" max-width="600">
      <v-card-title>Account</v-card-title>
      <v-text-field label="ID" :value="accountId" disabled class="mx-5" />
      <v-text-field
        label="Name"
        class="mx-5"
        v-model="pendingAccountName"
        :disabled="!currentUserIsAccountOwner"
      />
      <v-text-field
        label="URL"
        class="mx-5"
        v-model="pendingAccountUrl"
        :disabled="!currentUserIsAccountOwner"
      />
      <v-text-field
        label="Domain Name"
        hint="Require new users to have an email address at the specified domain."
        class="mx-5"
        v-model="pendingAccountEmailDomain"
        :disabled="!currentUserIsAccountOwner"
      />
      <v-btn
        class="ma-5"
        :disabled="!enableUpdateAccountButton"
        @click="sendRequestToServerToUpdateAccount"
        v-if="currentUserIsAccountOwner || userCanUpdateAccounts"
      >
        Update account
      </v-btn>
      <v-snackbar
        v-model="showNotificationThatUpdateWasSuccessful"
        color="success"
        :timeout="3000"
      >
        Updated!
      </v-snackbar>
    </v-card>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { getFirstElementOrDefaultValue } from '../../utils.js'

export default {
  name: 'Account',
  components: {},
  data: function () {
    return {
      pendingAccountName: '',
      pendingAccountUrl: '',
      pendingAccountEmailDomain: '',
      showNotificationThatUpdateWasSuccessful: false
    }
  },
  computed: {
    ...mapState({
      axiosJwtConfig: (state) => state.auth.axiosJwtConfig,
      currentUserIsAccountOwner: (state) => state.user.isAccountOwner,
      accountId: (state) => state.account.id,
      accountName: (state) => state.account.name,
      accountUrl: (state) => state.account.url,
      accountEmailDomain: (state) => state.account.emailDomain,
      userRoleName: (state) => state.user.role.name,
      userCanUpdateAccounts: (state) =>
        state.user.permittedActions.includes('admin.accounts.id.post')
    }),
    enableUpdateAccountButton: function () {
      return (
        this.accountId &&
        (this.accountName !== this.pendingAccountName ||
          this.accountUrl !== this.pendingAccountUrl ||
          this.accountEmailDomain !== this.pendingAccountEmailDomain)
      )
    },
    pendingAccountInfoToSendToTheServer: function () {
      return {
        name: this.pendingAccountName,
        url: this.pendingAccountUrl,
        email_domain: this.pendingAccountEmailDomain
      }
    }
  },
  mounted() {
    this.loadAccountInfoFromTheServer({ vm: this })
    this.setPendingAccountInfoBasedOnUserInfoFromTheServer()
  },
  watch: {
    accountName() {
      this.pendingAccountName = this.accountName
    },
    accountUrl() {
      this.pendingAccountUrl = this.accountUrl
    },
    accountEmailDomain() {
      this.pendingAccountEmailDomain = this.accountEmailDomain
    },
    userRoleName(newValue) {
      if (newValue !== 'Admin') {
        this.$router.replace('/')
      }
    }
  },
  methods: {
    ...mapMutations({
      setAccountAttributes: 'account/setAttributesFromTheServer'
    }),
    ...mapActions({
      loadAccountInfoFromTheServer: 'account/loadAccountInfoFromTheServer'
    }),
    sendRequestToServerToUpdateAccount: function () {
      let vm = this
      this.axios
        .post(
          '/admin/accounts/' + this.accountId,
          this.pendingAccountInfoToSendToTheServer,
          this.axiosJwtConfig
        )
        .then(
          (response) => {
            let apiResponse = response.data
            let accountAttributes = getFirstElementOrDefaultValue(
              apiResponse['data'],
              {}
            )
            vm.setAccountAttributes(accountAttributes)
            vm.showNotificationThatUpdateWasSuccessful = true
          },
          (error) => {
            console.log(error)
          }
        )
    },
    setPendingAccountInfoBasedOnUserInfoFromTheServer() {
      this.pendingAccountName = this.accountName
      this.pendingAccountUrl = this.accountUrl
      this.pendingAccountEmailDomain = this.accountEmailDomain
    }
  }
}
</script>
