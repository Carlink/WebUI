<template>
  <div>
    <h1 class="py-5">Profile</h1>
    <v-card max-width="600" class="pt-5">
      <v-text-field label="ID" v-model="userId" disabled class="mx-5" />
      <v-text-field label="Role" v-model="userRoleName" disabled class="mx-5" />
      <v-checkbox
        label="Is Account Owner"
        v-model="userIsAccountOwner"
        disabled
        class="mx-5"
      />
      <v-text-field
        label="Last Login"
        v-model="userLastLogin"
        disabled
        class="mx-5"
      />
      <v-text-field label="Status" v-model="userStatus" disabled class="mx-5" />
      <v-text-field
        label="Manager"
        v-model="userManagerName"
        disabled
        class="mx-5"
      />
      <v-divider class="mb-5" />
      <v-form v-model="pendingChangesAreValidated">
        <v-text-field
          label="First Name"
          v-model="pendingUserFirstName"
          class="mx-5"
        />
        <v-text-field
          label="Last Name"
          v-model="pendingUserLastName"
          class="mx-5"
        />
        <v-text-field label="Title" v-model="pendingUserTitle" class="mx-5" />
        <v-text-field
          label="Email Address"
          v-model="pendingUserEmailAddress"
          class="mx-5"
        />
        <v-text-field
          label="Location"
          v-model="pendingUserLocation"
          class="mx-5"
        />
        <v-text-field
          label="Phone Number"
          v-model="pendingUserPhoneNumber"
          class="mx-5"
        />
      </v-form>
      <v-btn
        class="ma-5"
        :disabled="!enableUpdateButton"
        @click="sendRequestToServerToUpdateUser"
      >
        Update profile
      </v-btn>
      <v-divider class="mb-5" />
      <ChangePassword
        @passwordChanged="showNotificationThatUpdateWasSuccessful"
      />
      <v-snackbar
        v-model="notificationThatUpdateWasSuccessfulShouldBeDisplayed"
        color="success"
        :timeout="3000"
      >
        Updated!
      </v-snackbar>
    </v-card>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import moment from 'moment'
import ChangePassword from './profile/ChangePassword'

export default {
  name: 'Profile',
  components: { ChangePassword },
  data: function () {
    return {
      userInfo: {},
      notificationThatUpdateWasSuccessfulShouldBeDisplayed: false,
      pendingChangesAreValidated: undefined,
      pendingUserEmailAddress: undefined,
      pendingUserFirstName: undefined,
      pendingUserLastName: undefined,
      pendingUserTitle: undefined,
      pendingUserLocation: undefined,
      pendingUserPhoneNumber: undefined
    }
  },
  computed: {
    ...mapState({
      axiosJwtConfig: (state) => state.auth.axiosJwtConfig,
      userId: (state) => state.user.id,
      userIsAccountOwner: (state) => state.user.isAccountOwner,
      userLastLogin: (state) =>
        moment(state.user.lastLogin).format('MMMM Do YYYY'),
      userManagerName: (state) => state.user.managerName,
      userRoleName: (state) => state.user.role.name,
      userStatus: (state) => state.user.status,
      userEmailAddress: (state) => state.user.emailAddress,
      userFirstName: (state) => state.user.firstName,
      userLastName: (state) => state.user.lastName,
      userTitle: (state) => state.user.title,
      userLocation: (state) => state.user.location,
      userPhoneNumber: (state) => state.user.phoneNumber
    }),
    enableUpdateButton: function () {
      return (
        this.userId &&
        (this.userEmailAddress !== this.pendingUserEmailAddress ||
          this.userFirstName !== this.pendingUserFirstName ||
          this.userLastName !== this.pendingUserLastName ||
          this.userTitle !== this.pendingUserTitle ||
          this.userLocation !== this.pendingUserLocation ||
          this.userPhoneNumber !== this.pendingUserPhoneNumber) &&
        this.pendingChangesAreValidated
      )
    },
    pendingUserInfoToSendToTheServer: function () {
      return {
        email: this.pendingUserEmailAddress,
        first_name: this.pendingUserFirstName,
        last_name: this.pendingUserLastName,
        location: this.pendingUserLocation,
        phone: this.pendingUserPhoneNumber,
        title: this.pendingUserTitle
      }
    }
  },
  mounted() {
    this.setPendingUserInfoBasedOnUserInfoFromTheServer()
  },
  watch: {
    userEmailAddress() {
      this.pendingUserEmailAddress = this.userEmailAddress
    },
    userFirstName() {
      this.pendingUserFirstName = this.userFirstName
    },
    userLastName() {
      this.pendingUserLastName = this.userLastName
    },
    userTitle() {
      this.pendingUserTitle = this.userTitle
    },
    userLocation() {
      this.pendingUserLocation = this.userLocation
    },
    userPhoneNumber() {
      this.pendingUserPhoneNumber = this.userPhoneNumber
    }
  },
  methods: {
    ...mapMutations({
      setCurrentUser: 'user/setCurrentUser'
    }),
    showNotificationThatUpdateWasSuccessful() {
      this.notificationThatUpdateWasSuccessfulShouldBeDisplayed = true
    },
    sendRequestToServerToUpdateUser: function () {
      let vm = this
      this.axios
        .post(
          '/admin/users/' + this.userId,
          this.pendingUserInfoToSendToTheServer,
          this.axiosJwtConfig
        )
        .then(
          (response) => {
            let apiResponse = response.data
            vm.setCurrentUser(apiResponse)
            vm.setPendingUserInfoBasedOnUserInfoFromTheServer()
            vm.showNotificationThatUpdateWasSuccessful()
          },
          (error) => {
            console.log(error)
          }
        )
    },
    setPendingUserInfoBasedOnUserInfoFromTheServer() {
      this.pendingUserEmailAddress = this.userEmailAddress
      this.pendingUserFirstName = this.userFirstName
      this.pendingUserLastName = this.userLastName
      this.pendingUserTitle = this.userTitle
      this.pendingUserLocation = this.userLocation
      this.pendingUserPhoneNumber = this.userPhoneNumber
    }
  }
}
</script>
