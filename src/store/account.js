import { getFirstElementOrDefaultValue } from '../utils'
import Vue from 'vue'

const account = {
  namespaced: true,
  state: {
    id: undefined,
    emailDomain: undefined,
    name: undefined,
    url: undefined
  },
  mutations: {
    setAttributesFromTheServer: (state, dataFromTheServer) => {
      state.id = dataFromTheServer['id']
      state.emailDomain = dataFromTheServer['email_domain']
      state.name = dataFromTheServer['name']
      state.url = dataFromTheServer['url']
    }
  },
  actions: {
    loadAccountInfoFromTheServer: function ({ commit, rootState }) {
      Vue.axios.get('/admin/accounts/', rootState.auth.axiosJwtConfig).then(
        (response) => {
          let apiResponse = response.data
          let accountDataFromTheServer = getFirstElementOrDefaultValue(
            apiResponse['data'],
            {}
          )
          commit('setAttributesFromTheServer', accountDataFromTheServer)
        },
        (error) => {
          console.log(error)
        }
      )
    }
  }
}

export default account
