<template>
  <div>
    <v-card max-width="800">
      <v-data-table :headers="headers" :items="roles" class="pt-3">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-card-title class="pl-0 pt-0">Roles</v-card-title>
            <v-spacer></v-spacer>
            <v-dialog v-model="showEditRoleWindow" max-width="500px">
              <template v-if="userCanCreateRoles" v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on">
                  New Role
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedRole.name" label="Name" />
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedRole.description"
                          label="Description"
                        />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <h3>Permitted Actions</h3>
                        <v-treeview
                          v-model="editedRole.permitted_actions"
                          selectable
                          :items="appFunctionsToAssignToRoles"
                          item-disabled="cannotBeChanged"
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
                    @click="closeEditRoleDialog"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    v-if="userCanUpdateRoles"
                    color="blue darken-1"
                    text
                    @click="save"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editRole(item)">
            mdi-pencil
          </v-icon>
          <v-icon
            v-if="userCanDeleteRoles"
            small
            @click="openDialogToConfirmDeletionOfRole(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
      <v-dialog v-model="showDeleteRoleConfirmation">
        <v-card>
          <v-card-title>Are you absolutely sure?</v-card-title>
          <v-card-text>
            This action <b>cannot</b> be undone. This will permanently delete
            the <b>{{ roleToDelete.name }}</b> role.<br />
          </v-card-text>
          <v-card-actions class="pb-5 mx-3">
            <v-btn @click="closeDeleteRoleConfirmationDialog">Cancel</v-btn>
            <v-spacer />
            <v-btn color="error" @click="deleteRole">
              I understand the consequences, delete this role.
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-snackbar v-model="showNotification" color="success" :timeout="3000">
        Invitation sent!
      </v-snackbar>
    </v-card>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { appFunctionsToAssignToRoles } from './appFunctionsToAssignToRoles.js'

export default {
  name: 'ManageRoles',
  data: function () {
    return {
      appFunctionsToAssignToRoles: appFunctionsToAssignToRoles,
      defaultRole: {
        name: '',
        description: '',
        permitted_actions: []
      },
      editedIndex: -1,
      editedRole: {
        name: '',
        description: '',
        permitted_actions: []
      },
      errorMessage: '',
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Description', value: 'description' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      showDeleteRoleConfirmation: false,
      showEditRoleWindow: false,
      showNotification: false,
      roles: [],
      roleToDelete: {}
    }
  },
  computed: {
    ...mapState({
      axiosJwtConfig: (state) => state.auth.axiosJwtConfig,
      currentUserRole: (state) => state.user.role,
      userCanCreateRoles: (state) =>
        state.user.permittedActions.includes('admin.roles.post'),
      userCanUpdateRoles: (state) =>
        state.user.permittedActions.includes('admin.roles.id.post'),
      userCanDeleteRoles: (state) =>
        state.user.permittedActions.includes('admin.roles.id.delete')
    }),
    formTitle() {
      return this.editedIndex === -1 ? 'New Role' : 'Edit Role'
    }
  },
  methods: {
    ...mapActions({
      setVuexUserDataFromServer: 'user/setVuexUserDataFromServer'
    }),
    editRole(role) {
      this.editedIndex = this.roles.indexOf(role)
      this.editedRole = Object.assign({}, role) // Copy the role object.
      this.showEditRoleWindow = true
    },
    openDialogToConfirmDeletionOfRole(role) {
      this.roleToDelete = role
      this.showDeleteRoleConfirmation = true
    },
    closeDeleteRoleConfirmationDialog() {
      this.roleToDelete = {}
      this.showDeleteRoleConfirmation = false
    },
    deleteRole() {
      const indexOfRoleToDelete = this.roles.indexOf(this.roleToDelete)
      let vm = this
      this.axios
        .delete('/admin/roles/' + this.roleToDelete.id, this.axiosJwtConfig)
        .then(
          () => {
            vm.roles.splice(indexOfRoleToDelete, 1)
            vm.closeDeleteRoleConfirmationDialog()
          },
          (error) => {
            let errorJson = error.response.data
            let errorInfo = errorJson['error']
            vm.errorMessage = errorInfo['message']
          }
        )
    },
    closeEditRoleDialog() {
      this.showEditRoleWindow = false
      setTimeout(() => {
        this.editedIndex = -1
        this.editedRole = Object.assign({}, this.defaultRole)
      }, 300)
    },
    save() {
      let dataToPost = {}
      let urlToPostTo = '/admin/roles/'
      Object.assign(dataToPost, this.editedRole)

      let weAreUpdatingAnExistingRole = this.editedIndex !== -1
      if (weAreUpdatingAnExistingRole) {
        urlToPostTo += this.editedRole.id
      }

      let vm = this
      this.axios.post(urlToPostTo, dataToPost, this.axiosJwtConfig).then(
        () => {
          if (weAreUpdatingAnExistingRole) {
            Object.assign(vm.roles[vm.editedIndex], vm.editedRole)
            if (vm.editedRole.name === vm.currentUserRole['name']) {
              vm.setVuexUserDataFromServer({ vm: vm })
            }
          }
          vm.closeEditRoleDialog()
          vm.updateRolesData()
        },
        (error) => {
          let errorJson = error.response.data
          let errorInfo = errorJson['error']
          vm.errorMessage = errorInfo['message']
        }
      )
    },
    updateRolesData() {
      let vm = this
      this.axios.get('/admin/roles/', this.axiosJwtConfig).then(
        (response) => {
          vm.roles = response.data['data']
          vm.$forceUpdate()
        },
        (error) => {
          console.log(error)
        }
      )
    }
  },
  mounted() {
    this.updateRolesData()
  }
}
</script>
