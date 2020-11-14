import Vue from 'vue'
const RULE_ID = 'a5409032-6ca8-4953-98a4-a1349f7f60e7'

const businessRules = {
  namespaced: true,
  state: {
    criterias: [],
    rule: {},
    labels: [],
    displayFieldsPermission: []
  },
  mutations: {
    setRule: (state, payload) => {
      state.rule = {
        ...payload
      }
    },
    setCriterias: (state, criterias) => {
      state.criterias = [...criterias]
    },
    addCriteria: (state, payload) => {
      state.criterias.push(payload)
    },
    deleteRule: (state, index) => {
      state.criterias.splice(index, 1)
    },
    setLabels: (state, labels) => {
      state.labels = labels
    },
    setDisplayFieldsPermission: (state, data) => {
      console.log(state, data, 'data');
      state.displayFieldsPermission = data
    }
  },
  actions: {
    getRuleById: async ({ commit }) => {
      let { data } = await Vue.axios.get(`/rule/rules/${RULE_ID}`)
      let criterias = data.rule.config.map((item) => item.config)
      commit('setCriterias', criterias)
      commit('setRule', data)
    },
    addCriteria: async ({ commit, state }, criteria) => {
      let payload = {
        ...state.rule,
        rule: {
          class: 'OrClause',
          config: [
            ...state.criterias.map((item) => ({
              class: 'AndClause',
              config: {
                conditions: item.conditions
              }
            })),
            {
              class: 'AndClause',
              config: {
                conditions: criteria.conditions
              }
            }
          ]
        }
      }
      await Vue.axios.post(`/rule/rules/${RULE_ID}`, payload)
      commit('addCriteria', criteria)
    },
    updateRule: async ({ state }) => {
      let payload = {
        ...state.rule,
        rule: {
          class: 'OrClause',
          config: [
            ...state.criterias.map((item) => ({
              class: 'AndClause',
              config: {
                conditions: item.conditions
              }
            }))
          ]
        }
      }
      await Vue.axios.post(`/rule/rules/${RULE_ID}`, payload)
    },
    deleteCriteria: async ({ state }, index) => {
      state.criterias.splice(index, 1)
      let payload = {
        ...state.rule,
        rule: {
          class: 'OrClause',
          config: [
            ...state.criterias.map((item) => ({
              class: 'AndClause',
              config: {
                conditions: item.conditions
              }
            }))
          ]
        }
      }
      await Vue.axios.post(`/rule/rules/${RULE_ID}`, payload)
    },
    getMultimapsById: async ({ commit }) => {
      let { data } = await Vue.axios.get('/admin/multimaps/123')
      commit('setLabels', data.labels)
    },
    updateFieldsPermission: async ({ commit }, payload) => {
      commit('setDisplayFieldsPermission', payload)
    }
  }
}

export default businessRules
