import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import account from './account'
import user from './user'
import dashboard from './dashboard'
import businessRules from './businessRules'

Vue.use(Vuex)

/* Note from Nathan Wailes: I recommend that the Vuex code be split into modules similar to how you'd break up Python
 * code into different files/modules.  You can keep any "top-level" Vuex variables / mutations / etc. within this
 * top-level Store object, similar to how you can use an __init__.py file in Python. */
const store = new Vuex.Store({
  modules: {
    account,
    auth,
    user,
    dashboard,
    businessRules
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {}
})

export default store
