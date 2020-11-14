<template>
  <div noselect>
    <router-view style="background: #b4c3dc;" />
  </div>
</template>

<script>
import tokens from '@/data/tokens'
import { mapMutations, mapActions, mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {},
  data: () => ({}),
  computed: {
    ...mapGetters({
      hasJWT: 'auth/hasJWT'
    })
  },
  methods: {
    ...mapMutations('auth', ['setAgentId', 'setJwt']),
    ...mapActions({
      setJwtInVuexFromJwtInLocalStorage:
        'auth/setJwtInVuexFromJwtInLocalStorage',
      setVuexUserDataFromServer: 'user/setVuexUserDataFromServer'
    }),
    appLoaded(event) {
      const { data } = event
      if (data.agent_id !== undefined) {
        this.setAxiosBaseURL(data.server_url)
        this.setJwt(tokens[data.test_jwt])
        this.setAgentId(data.agent_id)
      }
    },
    setAxiosBaseURL(serverUrl) {
      this.axios.defaults.baseURL = serverUrl
        ? serverUrl + 'api/v0/'
        : process.env.VUE_APP_API_URL
    },
    setRequestInterceptor() {
      this.axios.interceptors.request.use(
        function (config) {
          config.headers.Authorization = 'Bearer ' + localStorage.getItem('jwt')
          return config
        },
        function (error) {
          return Promise.reject(error)
        }
      )
    },
    initApp() {
      this.setRequestInterceptor()
      this.setJwtInVuexFromJwtInLocalStorage()
      this.setAxiosBaseURL()
    }
  },
  created() {
    this.initApp()
  },
  mounted() {
    // Register to listen for postMessage to load dashboard that way
    window.addEventListener('message', (event) => this.appLoaded(event))
  },
  watch: {
    hasJWT: function (val) {
      if (val) this.setVuexUserDataFromServer()
    }
  }
}
</script>
