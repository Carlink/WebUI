<template>
  <v-row no-gutters>
    <v-col>
      <v-app-bar elevation="0" class="transparent general-settings-header px-4">
        <v-toolbar-title
          class="font-w-500 size-26 ap-gray-2--text cursor-default pa-0"
        >
          General Settings
        </v-toolbar-title>
        <v-spacer />
        <v-btn
          outlined
          rounded
          color="ap-light-gray"
          class="pa-2 bottom-shadow no-text-transform font-weight-light"
        >
          <v-icon class="ap-light-blue--text">mdi-help-circle</v-icon>
          <span class="ap-light-blue--text size-13 ml-1">
            Get more context on this page</span
          >
        </v-btn>
      </v-app-bar>
      <div class="ma-4">
        <v-card
          v-for="card in generalSettings"
          :key="card.id"
          tile
          class="mx-4 my-6 bottom-shadow border-none border-radius-4"
          outlined
        >
          <v-row no-gutters>
            <v-col cols="10">
              <v-card-title class="ap-blue--text font-weight-bold">
                {{ card.title }}
              </v-card-title>
              <v-card-text>
                <div
                  class="pl-4 pb-1"
                  v-for="link in card.links"
                  :key="link.id"
                >
                  <router-link
                    :to="card.path"
                    class="ap-dark-light-blue--text no-text-decoration"
                  >
                    {{ link.name }}
                  </router-link>
                </div>
              </v-card-text>
            </v-col>
            <v-spacer />
            <v-col cols="1" class="mr-4">
              <div class="btn-navigation">
                <v-btn icon :to="card.path">
                  <v-icon class="size-40 ap-dark-light-blue--text">
                    mdi-chevron-right
                  </v-icon>
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'general-settings-home',
  data() {
    return {
      showSidebar: false,
      generalSettings: [
        {
          id: '1',
          title: 'Setup',
          links: [
            {
              id: '1',
              name: 'Check for duplicates'
            },
            { id: '2', name: 'Indexing' }
          ],
          path: '/cleandata/general-settings/setup'
        },
        {
          id: '2',
          title: 'Governance Rules',
          links: [
            {
              id: '1',
              name: 'Cross Object Field Mapping'
            },
            {
              id: '2',
              name: 'Grouped Fields'
            },
            {
              id: '3',
              name: 'Equivalent Term'
            }
          ],
          path: '/cleandata/general-settings/governance-rules'
        },
        {
          id: '3',
          title: 'Notifications',
          links: [{ id: '1', name: 'Slack' }],
          path: '/cleandata/general-settings/notifications'
        }
      ]
    }
  }
}
</script>

<style scoped>
.general-settings-header {
  height: 60px !important;
}

.general-settings-header > .v-toolbar__content {
  padding: 0 !important;
  height: 60px !important;
}

.btn-navigation {
  justify-content: center;
  align-items: center;
  display: flex;
  height: 100%;
}
</style>
