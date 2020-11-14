import Vue from 'vue'

const user = {
  namespaced: true,
  state: {
    emailAddress: undefined,
    firstName: undefined,
    sfProfile: undefined,
    team: undefined,
    id: undefined,
    isAccountOwner: undefined,
    lastLogin: undefined,
    lastName: undefined,
    location: undefined,
    managerName: undefined,
    permittedActions: [],
    phoneNumber: undefined,
    role: {},
    status: undefined,
    title: undefined
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.emailAddress = currentUser['email']
      state.firstName = currentUser['first_name']
      if (currentUser['sfProfile'] !== undefined) {
        state.sfProfile = currentUser['sf_profile']
      }
      if (currentUser['team'] !== undefined) {
        state.team = currentUser['team']
      }
      state.id = currentUser['id']
      state.isAccountOwner = currentUser['is_owner']
      state.lastLogin = currentUser['last_login']
      state.lastName = currentUser['last_name']
      state.location = currentUser['location']
      state.managerName = currentUser['manager']
        ? currentUser['manager']['first_name'] +
          ' ' +
          currentUser['manager']['last_name']
        : 'None'
      state.permittedActions = currentUser['role']['permitted_actions']
      state.phoneNumber = currentUser['phone']
      state.role = currentUser['role']
      if (currentUser['status'] === 'enabled') {
        state.status = 'Active'
      } else if (currentUser['status'] === 'disabled') {
        state.status = 'Inactive'
      } else {
        state.status = 'Archived'
      }
      state.title = currentUser['title']
    }
  },
  actions: {
    setVuexUserDataFromServer: function ({ commit, rootState }) {
      Vue.axios.get('admin/users/me', rootState.auth.axiosJwtConfig).then(
        (response) => {
          commit('setCurrentUser', response.data)
        },
        (error) => {
          console.log(error)
        }
      )
    }
  }
}

export default user
