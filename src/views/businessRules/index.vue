<template>
  <v-row no-gutters class="white">
    <v-col>
      <v-app-bar elevation="0" class="transparent business-rules-header px-4">
        <v-app-bar-nav-icon
          v-if="$vuetify.breakpoint.mdAndDown"
          @click.stop="showSidebar = !showSidebar"
        />
        <v-toolbar-title
          class="font-weight-medium size-26 primary--text cursor-default pa-0"
          >Business Rules</v-toolbar-title
        >
        <v-spacer />
        <v-btn
          color="primary"
          class="text-none font-weight-light"
          to="/cleandata/manage-business-rule"
        >
          <v-icon class="size-14">mdi-plus</v-icon>
          <span class="size-13">Add a Business Rule</span>
        </v-btn>
      </v-app-bar>

      <v-divider></v-divider>

      <transition name="fade">
        <router-view></router-view>
      </transition>
      <div class="ma-4 mb-8">
        <NewLeads></NewLeads>
      </div>
      <div class="ma-4 mt-8">
        <LeadsContacts></LeadsContacts>
      </div>
      <v-footer class="white pt-3 pb-6">
        <div class="size-12 primary--text cursor-default">
          CDBS-0.1
          &#124;
          <a href="https://activeprime.zendesk.com/hc/en-us/requests/new" target="_blank"
             class="size-12 primary--text pointer no-text-decoration">
              Are we missing something in this page?
          </a>
        </div>
      </v-footer>
    </v-col>
  </v-row>
</template>

<script>
import NewLeads from '@/components/businessRules/newLeads'
import LeadsContacts from '@/components/businessRules/leadsContacts'

export default {
  name: 'business-rule',
  components: {
    NewLeads,
    LeadsContacts
  },
  data() {
    return {
      showSidebar: false
    }
  }
}
</script>

<style scoped>
.business-rules-header {
  height: 60px !important;
}

.business-rules-header >>> .v-toolbar__content {
  padding: 0 !important;
  height: 60px !important;
}
</style>
