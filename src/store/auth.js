const auth = {
  namespaced: true,
  state: {
    jwt: '',
    agentId: '737561b4-bc8f-11ea-bb1a-f40f241f8cc3',
    axiosJwtConfig: {}
  },
  mutations: {
    setJwt(state, jwt) {
      /*
        Axios has had recent issues with axios.defaults.headers.common when
        setting ['Authorization'] = `Bearer...`, so we won't use Axios that way.
        Instead, on each update to the JWT we'll update an axiosJwtConfig Vuex variable,
        and when we need to use Axios to access a protected URL, we'll pass that variable
        to Axios for it to use as its configuration.
       */
      if (!jwt) return
      state.jwt = jwt
      localStorage.setItem('jwt', jwt)
      state.axiosJwtConfig = {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      }
    },
    setAgentId(state, id) {
      state.agentId = id
    },
    clearUserData() {
      localStorage.removeItem('jwt')
      location.reload() // reload() will reset (flush) jwt and axiosJwtConfig
    }
  },
  getters: {
    hasJWT(state) {
      return !!state.jwt
    }
  },
  actions: {
    signOut({ commit }) {
      commit('clearUserData')
    },
    setJwtInVuexFromJwtInLocalStorage({ commit }) {
      commit('setJwt', localStorage.getItem('jwt'))
    }
  }
}

export default auth
