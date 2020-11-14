<template>
  <div>
    <v-card v-if="connections" class="mt-3" max-width="600">
      <v-card-title>Connections</v-card-title>
      <v-treeview :items="connectionsFormattedForTheTreeView" open-on-click />
    </v-card>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getFirstElementOrDefaultValue } from '../../utils.js'

export default {
  name: 'Connections',
  components: {},
  data: function () {
    return {
      connections: [
        {
          name: 'some connection',
          description: 'example description',
          systemType: 'some system',
          authParams: 'some params',
          crawlers: [
            {
              id: '9eea810f-1fb5-4837-81b8-85425b80d133',
              object: 'crawler',
              name: 'Accounts and Leads',
              owner_id: '090e24d3-34c6-49cb-846b-57af9cbff1fe',
              created: '2018-11-13T20:20:39+00:00',
              modifed: '2018-11-13T20:20:39+00:00',
              account_id: 'd463677e-2060-4db0-8985-35585a8bc90c',
              connection_id: '9b40c303-4fce-4482-89a3-6df6a1eea6df',
              run_state: 'stopped',
              crawl_state: 'waiting',
              purger_enabled: true,
              state_history: [
                {
                  run_state: 'started',
                  crawl_state: 'crawling'
                }
              ],
              loader_period: 300,
              entities: [
                {
                  name: 'account',
                  entity: {
                    datetime_format: 'YYYY-MM-DDTHH:mm:ssZ',
                    estimator_field: 'name',
                    key_field: 'id',
                    label: 'Companies',
                    modified_field: 'modified',
                    type: 'Account',
                    fields: [
                      {
                        label: 'ID',
                        name: 'id',
                        type: 'ID'
                      },
                      {
                        label: 'ID',
                        name: 'id',
                        type: 'ID'
                      }
                    ]
                  },
                  crawl_data: {
                    last_scan_time: '2018-11-13T20:20:39+00:00',
                    slice_count: 30,
                    initial_load_slice: 10,
                    last_crawl_time: '2018-11-13T20:20:39+00:00',
                    last_record_time: '2018-11-13T20:20:39+00:00',
                    entity_changed: false,
                    index_fields: ['name', 'phone'],
                    fields: ['id', 'name', 'phone'],
                    can_be_queried: false
                  }
                }
              ]
            }
          ]
        },
        {
          name: 'second connection',
          description: 'example description',
          systemType: 'some system',
          authParams: 'some params',
          crawlers: [
            {
              id: '9eea810f-1fb5-4837-81b8-85425b80d133',
              object: 'crawler',
              name: 'Accounts and Leads',
              owner_id: '090e24d3-34c6-49cb-846b-57af9cbff1fe',
              created: '2018-11-13T20:20:39+00:00',
              modifed: '2018-11-13T20:20:39+00:00',
              account_id: 'd463677e-2060-4db0-8985-35585a8bc90c',
              connection_id: '9b40c303-4fce-4482-89a3-6df6a1eea6df',
              run_state: 'stopped',
              crawl_state: 'waiting',
              purger_enabled: true,
              state_history: [
                {
                  run_state: 'started',
                  crawl_state: 'crawling'
                }
              ],
              loader_period: 300,
              entities: [
                {
                  name: 'account',
                  entity: {
                    datetime_format: 'YYYY-MM-DDTHH:mm:ssZ',
                    estimator_field: 'name',
                    key_field: 'id',
                    label: 'Companies',
                    modified_field: 'modified',
                    type: 'Account',
                    fields: [
                      {
                        label: 'ID',
                        name: 'id',
                        type: 'ID'
                      },
                      {
                        label: 'ID',
                        name: 'id',
                        type: 'ID'
                      }
                    ]
                  },
                  crawl_data: {
                    last_scan_time: '2018-11-13T20:20:39+00:00',
                    slice_count: 30,
                    initial_load_slice: 10,
                    last_crawl_time: '2018-11-13T20:20:39+00:00',
                    last_record_time: '2018-11-13T20:20:39+00:00',
                    entity_changed: false,
                    index_fields: ['name', 'phone'],
                    fields: ['id', 'name', 'phone'],
                    can_be_queried: false
                  }
                }
              ]
            }
          ]
        }
      ],
      selectedCrawlerIndex: undefined
    }
  },
  watch: {},
  computed: {
    ...mapState({
      axiosJwtConfig: (state) => state.auth.axiosJwtConfig
    }),
    connectionsFormattedForTheTreeView() {
      let connectionsFormattedForTheTreeView = []
      for (let originalConnection of this.connections) {
        let reformattedConnection = {
          name: originalConnection.name,
          id: getNewId(),
          children: []
        }
        for (let attributeName of ['description', 'systemType', 'authParams']) {
          reformattedConnection.children.push({
            name: attributeName + ': ' + originalConnection[attributeName],
            id: getNewId()
          })
        }
        reformattedConnection.children.push(
          this.getReformattedObject('crawlers', originalConnection.crawlers)
        )
        connectionsFormattedForTheTreeView.push(reformattedConnection)
      }
      return connectionsFormattedForTheTreeView
    }
  },
  created() {
    let vm = this
    this.axios.get('/admin/licenses', this.axiosJwtConfig).then(
      (response) => {
        let apiResponse = response.data
        vm.license = getFirstElementOrDefaultValue(apiResponse['data'], {})
      },
      (error) => {
        console.log(error)
      }
    )
  },
  methods: {
    getReformattedObject(nameToUse, originalObject) {
      let reformattedObject = {
        id: getNewId(),
        name: nameToUse,
        children: []
      }
      for (let [attributeName, attributeValue] of Object.entries(
        originalObject
      )) {
        if (typeof attributeValue !== 'object') {
          reformattedObject.children.push({
            name: attributeName + ': ' + attributeValue,
            id: getNewId()
          })
        } else {
          reformattedObject.children.push(
            this.getReformattedObject(attributeName, attributeValue)
          )
        }
      }
      return reformattedObject
    }
  }
}

function getNewId() {
  return '' + window.crypto.getRandomValues(new Uint32Array(1))
}
</script>
