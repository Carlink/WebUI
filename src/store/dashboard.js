import Vue from 'vue'
import Vuex from 'vuex'
import row from '../row'
import myDupesets from '@/data/my_dupesets.json'
import pendingDupesets from '@/data/pending_dupesets.json'

Vue.use(Vuex)
const defaultData = {
  data: {
    entity_key: 'Empty',
    entity_name: 'Type',
    field_values: {}
  }
}
const dashboard = {
  namespaced: true,
  state: {
    agentId: '1234',
    showMockButtons: false,
    status: undefined,
    current_dupeset: undefined,
    dataForDupeSetQuery: defaultData,
    columns: [],
    gridRows: [],
    teamRanks: [],
    personRanks: [],
    excludedColumns: [],
    excludedGridRows: [],
    excluded_dupesetId: undefined,
    requestConfig: {
      headers: {
        Authorization: 'Bearer ' + 'staticToken'
      }
    },
    overlay: ''
  },
  getters: {
    COLUMNS: (state) => state.columns,
    GRIDROWS: (state) => state.gridRows
  },
  mutations: {
    setAgentId(state, id) {
      state.agentId = id
    },
    setShowMockButtons(state, show) {
      state.showMockButtons = show
    },
    setDataForDupeSetQuery(state, data) {
      state.dataForDupeSetQuery = { data: { ...defaultData.data, ...data } }
    },
    setStatus(state, status) {
      state.status = status
    },
    setPersonRanks(state, value) {
      state.personRanks = value
    },
    setTeamRanks(state, value) {
      state.teamRanks = value
    },
    setCurrentDupeSet(state, dupeset_id) {
      state.current_dupeset = dupeset_id
    },
    setColumns(state, newColumns) {
      state.columns = newColumns
    },
    setGridRows(state, newRows) {
      state.gridRows = newRows
    },
    setExcludedColumns(state, newColumns) {
      state.excludedColumns = newColumns
    },
    setExcludedGridRows(state, newRows) {
      state.excludedGridRows = newRows
    },
    setExcludedDupeSet(state, dupeset_id) {
      state.excluded_dupesetId = dupeset_id
    },
    showOverlay(state, type) {
      state.overlay = type
    },
    onCloseOverlay(state) {
      state.overlay = ''
    }
  },
  actions: {
    saveUrlQueryParametersToTheVuexStore({ commit }, { vm }) {
      const { query } = vm.$route
      commit('setShowMockButtons', query.enable_mock_buttons)
    },
    saveAgentId({ commit }, agentId) {
      commit('setAgentId', agentId)
    },
    saveDataForDupeSetQuery({ commit }, data) {
      commit('setDataForDupeSetQuery', data)
    },
    saveStatus({ commit }, status) {
      commit('setStatus', status)
    },
    saveDupeGridColumns({ commit }, newColumns) {
      commit('setColumns', newColumns)
    },
    saveExGridColumns({ commit }, newColumns) {
      commit('setExcludedColumns', newColumns)
    },
    saveOverlay({ commit }, overlay) {
      commit('showOverlay', overlay)
    },
    closeOverlay({ commit }) {
      commit('onCloseOverlay')
    },
    personRankingData({ state, commit }) {
      let agentId = state.agentId
      let api_url = process.env.VUE_APP_API_URL
      const url = api_url + `/agent/${agentId}/person_ranking`
      Vue.axios.get(url, state.requestConfig).then((response) => {
        commit('setPersonRanks', response)
      })
    },
    teamRankingData({ state, commit }) {
      let agentId = state.agentId
      let api_url = process.env.VUE_APP_API_URL
      const url = api_url + `/agent/${agentId}/team_ranking`
      Vue.axios.get(url, state.requestConfig).then((response) => {
        commit('setTeamRanks', response)
      })
    },
    fetchDupeData({ commit }) {
      const { id, columns, rows, cells } = myDupesets
      commit('setCurrentDupeSet', id)
      commit('setColumns', columns)
      const gridRows = rows.map((aRow) =>
        row.buildGridRow(aRow, columns, cells)
      )
      commit('setGridRows', gridRows)
    },
    fetchExcludedData({ commit }) {
      const { id, columns, rows, cells } = pendingDupesets
      commit('setExcludedDupeSet', id)
      commit('setExcludedColumns', columns)
      const gridRows = rows.map((aRow) =>
        row.buildGridRow(aRow, columns, cells)
      )
      commit('setExcludedGridRows', gridRows)
    }
  }
}
export default dashboard
