<template>
  <v-app>
    <Sidebar v-if="$vuetify.breakpoint.lgAndUp || showSidebar" />
    <v-main class="white">
      <v-container fluid class="pa-0">
        <!-- <v-app-bar dense elevation="0" v-if="isToolbarVisible">
          <v-app-bar-nav-icon
            v-if="$vuetify.breakpoint.mdAndDown"
            @click.stop="showSidebar = !showSidebar"
          />
          <v-toolbar-title>Acme Widgets Inc</v-toolbar-title>
          <v-spacer />
          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-app-bar> -->
        <transition name="fade">
          <router-view />
        </transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Sidebar from './Sidebar'

export default {
  name: 'Home',
  components: { Sidebar },
  data() {
    return {
      showSidebar: false
    }
  },
  computed: {
    ...mapState({
      axiosJwtConfig: (state) => state.auth.axiosJwtConfig,
      jwt: (state) => state.auth.jwt
    }),
    loggedIn() {
      return this.jwt !== ''
    },
    isToolbarVisible: {
      get() {
        if (
          ['businessRules', 'generalSettings', 'addBusinessRule'].includes(
            this.$route.name
          )
        ) {
          return false
        }
        return true
      }
    }
  },
  methods: {
    ...mapMutations({
      setCurrentUser: 'user/setCurrentUser'
    })
  }
}
</script>
