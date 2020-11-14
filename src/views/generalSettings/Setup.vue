<template>
  <div class="d-flex flex-column">
    <v-app-bar elevation="0" class="transparent general-settings-header px-4">
      <v-toolbar-title class="size-26 cursor-default pa-0 ap-gray-2--text">
        Setup
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <div class="px-8">
      <div class="div-context">
        <v-divider class="context-divider"></v-divider>
        <v-spacer></v-spacer>
        <v-btn
          outlined
          rounded
          color="ap-light-gray"
          class="pa-2 bottom-shadow text-none font-weight-light float-right height-45 btn-context"
        >
          <v-icon class="ap-light-blue--text">mdi-help-circle</v-icon>
          <span class="ap-light-blue--text size-13 ml-1">
            Get more context on this page
          </span>
        </v-btn>
      </div>
      <v-tabs v-model="selectedTab">
        <v-tab
          class="size-16 pa-0 text-none font-weight-black letter-spacing"
          v-for="(tab, i) in getTabs"
          :key="i"
        >
          {{ tab.title }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="selectedTab">
        <v-tab-item v-for="(tab, i) in getTabs" :key="i">
          <CheckForDuplicates
            v-if="tab.name === 'check_duplicates'"
          ></CheckForDuplicates>
          <Indexing v-if="tab.name === 'indexing'"></Indexing>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import CheckForDuplicates from '@/components/generalSettings/CheckForDuplicates'
import Indexing from '@/components/generalSettings/Indexing'

export default {
  name: 'setup',
  data() {
    return { selectedTab: 0 }
  },
  components: {
    CheckForDuplicates,
    Indexing
  },
  computed: {
    getTabs: function () {
      return [
        {
          name: 'check_duplicates',
          title: 'Check for Duplicates'
        },
        {
          name: 'indexing',
          title: 'Indexing'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.div-context {
  position: relative;
  z-index: 1;
  top: 48px;
}

.btn-context {
  position: absolute;
  right: 0;
  top: -24px;
}

.context-divider {
  width: calc(100% - 272px);
}

.letter-spacing {
  letter-spacing: 0.03em;
}
</style>
