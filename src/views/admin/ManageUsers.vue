<template>
  <div>
    <v-card>
      <v-data-table :headers="headers" :items="users" class="pt-3">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-card-title class="pl-0 pt-0">Manage Users</v-card-title>
            <v-spacer></v-spacer>
            <v-dialog v-model="showEditUserWindow" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">Edit User</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedUser.first_name"
                          label="First Name"
                        />
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedUser.last_name"
                          label="Last Name"
                        />
                      </v-col>
                      <v-col cols="12" sm="8">
                        <v-text-field
                          v-model="editedUser.email"
                          label="Email Address"
                        />
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          v-model="editedUser.status"
                          :items="editedUserStatusOptions"
                          label="Status"
                        />
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          v-model="editedUser.manager"
                          :items="editedUserPotentialManagers"
                          label="Manager"
                          item-text="full_name"
                          item-value="id"
                          return-object
                        />
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-alert
                  v-if="errorMessage !== ''"
                  dense
                  text
                  type="error"
                  class="mx-5 my-0"
                >
                  {{ errorMessage }}
                </v-alert>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="closeEditUserDialog"
                  >
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                </v-card-actions>
                <v-card-text v-if="editedUserDirectSubordinates.length > 0">
                  <v-card-title>Direct Subordinates</v-card-title>
                  <v-simple-table>
                    <thead>
                      <tr>
                        <th>Full Name</th>
                        <th>Email Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="subordinate in editedUserDirectSubordinates"
                        :key="subordinate.id"
                      >
                        <td>{{ subordinate.full_name }}</td>
                        <td>{{ subordinate.email }}</td>
                      </tr>
                    </tbody>
                  </v-simple-table>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template #item.full_name="{item}">
          <span class="ap-dark-blue--text font-weight-bold">
            {{ item.full_name }}
          </span>
        </template>
        <template #item.sf_profile="{item}">
          <span class="ap-dark-blue--text font-weight-bold">
            {{ item.sf_profile }}
          </span>
        </template>
        <template #item.team="{item}">
          <span class="ap-dark-blue--text font-weight-bold">
            {{ item.team.name }}
          </span>
        </template>
        <template #item.email="{item}">
          <span class="ap-dark-blue--text font-weight-bold">
            {{ item.email }}
          </span>
        </template>
        <template #item.role="{item}">
          <span class="ap-dark-blue--text font-weight-bold">
            {{ item.role.name }}
          </span>
        </template>
        <template #item.status="{item}">
          <span
            :class="{
              'green--text darken-4': item.status === 'enabled',
              'red--text darken-4': item.status === 'disabled'
            }"
          >
            {{ item.status === 'enabled' ? 'Active' : 'Inactive' }}
          </span>
        </template>
        <template #item.actions="{ item }">
          <v-icon
            v-if="userCanUpdateUsers"
            small
            class="mr-2"
            @click="editUser(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            v-if="!item.is_owner && userCanDeleteUsers"
            @click="openDialogToConfirmDeletionOfUser(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
      <v-dialog v-model="showDeleteUserConfirmation">
        <v-card>
          <v-card-title>Are you absolutely sure?</v-card-title>
          <v-card-text>
            This action <b>cannot</b> be undone. This will permanently delete
            the <b>{{ userToDelete.email }}</b> user.<br />
            Please type <b>{{ userToDelete.email }}</b> to confirm.
            <v-form
              v-model="currentUserHasReenteredTheEmailAddressOfTheUserToDelete"
            >
              <v-text-field
                v-model="emailAddressOfTheUserToDeleteAsTypedInByTheCurrentUser"
                max-width="100"
                :rules="rulesForTheReenteringOfTheUserEmailAddress"
              />
            </v-form>
          </v-card-text>
          <v-card-actions class="pb-5 mx-3">
            <v-btn @click="closeDeleteUserConfirmationDialog">Cancel</v-btn>
            <v-spacer />
            <v-btn
              color="error"
              @click="deleteUser"
              :disabled="
                !currentUserHasReenteredTheEmailAddressOfTheUserToDelete
              "
            >
              I understand the consequences, delete this user.
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-snackbar v-model="showNotification" color="success" :timeout="3000">
        Invitation sent!
      </v-snackbar>
    </v-card>
    <InviteNewUser class="mt-5" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import InviteNewUser from './InviteNewUser'

export default {
  name: 'manage-users',
  components: { InviteNewUser },
  data: function () {
    return {
      currentUserHasReenteredTheEmailAddressOfTheUserToDelete: false,
      defaultUser: {
        first_name: '',
        last_name: '',
        email: '',
        status: ''
      },
      editedIndex: -1,
      editedUser: {
        first_name: '',
        last_name: '',
        email: '',
        status: '',
        manager: ''
      },
      editedUserDirectSubordinates: [],
      editedUserPotentialManagers: [],
      editedUserStatusOptions: ['Active', 'Inactive', 'Archived'],
      emailAddressOfTheUserToDeleteAsTypedInByTheCurrentUser: '',
      errorMessage: '',
      headers: [
        { text: 'Full Name', value: 'full_name' },
        { text: 'Salesforce Profile', value: 'sf_profile' },
        { text: 'Teams', value: 'team.name' },
        { text: 'Email Address', value: 'email' },
        { text: 'Roles', value: 'role.name' },
        { text: 'Status', value: 'status' },
        { text: 'Manager', value: 'manager.full_name' },
        { text: 'Direct Subordinates', value: 'subordinate_count' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      rulesForTheReenteringOfTheUserEmailAddress: [
        (v) => !!v || 'Field is required',
        (v) =>
          v === this.userToDelete.email ||
          'Must match the email address of the user to delete.'
      ],
      showDeleteUserConfirmation: false,
      showEditUserWindow: false,
      showNotification: false,
      users: [],
      userToDelete: {}
    }
  },
  watch: {
    showEditUserWindow(newValue) {
      if (newValue === true) {
        this.setEditedUserPotentialManagers()
        this.setEditedUserDirectSubordinates()
      }
    }
  },
  computed: {
    ...mapState({
      axiosJwtConfig: (state) => state.auth.axiosJwtConfig,
      userCanUpdateUsers: (state) =>
        state.user.permittedActions.includes('admin.users.id.post'),
      userCanDeleteUsers: (state) =>
        state.user.permittedActions.includes('admin.users.id.delete')
    })
  },
  methods: {
    editUser(user) {
      this.editedIndex = this.users.indexOf(user)
      this.editedUser = Object.assign({}, user) // Copy the user object.
      this.showEditUserWindow = true
    },
    openDialogToConfirmDeletionOfUser(user) {
      this.userToDelete = user
      this.showDeleteUserConfirmation = true
    },
    closeDeleteUserConfirmationDialog() {
      this.userToDelete = {}
      this.showDeleteUserConfirmation = false
      this.emailAddressOfTheUserToDeleteAsTypedInByTheCurrentUser = ''
    },
    deleteUser() {
      const indexOfUserToDelete = this.users.indexOf(this.userToDelete)
      let vm = this
      this.axios
        .delete('/admin/users/' + this.userToDelete.id, this.axiosJwtConfig)
        .then(
          () => {
            vm.users.splice(indexOfUserToDelete, 1)
            vm.closeDeleteUserConfirmationDialog()
          },
          (error) => {
            let errorJson = error.response.data
            let errorInfo = errorJson['error']
            vm.errorMessage = errorInfo['message']
          }
        )
    },
    closeEditUserDialog() {
      this.showEditUserWindow = false
      setTimeout(() => {
        this.editedIndex = -1
        this.editedUser = Object.assign({}, this.defaultUser)
        this.editedUserDirectSubordinates = []
        this.editedUserPotentialManagers = []
      }, 300)
    },
    save() {
      let vm = this
      let dataToPost = {}
      Object.assign(dataToPost, this.editedUser)

      if (this.editedUser.manager) {
        dataToPost['manager_id'] = this.editedUser.manager.id
      }
      delete dataToPost['manager']

      this.axios
        .post(
          '/admin/users/' + this.editedUser.id,
          dataToPost,
          this.axiosJwtConfig
        )
        .then(
          () => {
            Object.assign(vm.users[vm.editedIndex], vm.editedUser)
            vm.closeEditUserDialog()
            vm.updateUsersData()
          },
          (error) => {
            let errorJson = error.response.data
            let errorInfo = errorJson['error']
            vm.errorMessage = errorInfo['message']
          }
        )
    },
    setEditedUserPotentialManagers() {
      this.editedUserPotentialManagers = this.users.filter(
        (user) =>
          user.id !== this.editedUser.id &&
          !this.editedUser.subordinates.includes(user.id)
      )
      this.editedUserPotentialManagers.splice(0, 0, { id: null, full_name: '' })
    },
    setEditedUserDirectSubordinates() {
      this.editedUserDirectSubordinates = this.users.filter(
        (user) => user.manager && user.manager.id === this.editedUser.id
      )
    },
    updateUsersData() {
      let vm = this
      this.axios.get('/admin/users/', this.axiosJwtConfig).then(
        (response) => {
          vm.users = response.data['data']
          for (let userIndex = 0; userIndex < vm.users.length; userIndex++) {
            let user = vm.users[userIndex]
            user.subordinate_count = user.subordinates.length
          }
          vm.$forceUpdate()
        },
        (error) => {
          console.log(error)
        }
      )
    }
  },
  mounted() {
    this.updateUsersData()
  }
}
</script>
