import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './theme/main.sass'
import resizableColumns from '@/directives/resizable-columns.directive'

Vue.config.productionTip = false
Vue.use(resizableColumns)

const axiosConfig = {
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 30000,
  headers: {
    Authorization: 'Bearer xxxx'
  }
}
Vue.use(VueAxios, axios.create(axiosConfig))

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
