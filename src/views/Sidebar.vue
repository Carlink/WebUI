<template>
  <div class="nav-drawer">
    <v-btn
      fab
      small
      color="ap-light-blue"
      v-if="!menuOpen"
      class="pane-open ap-white--text"
      @click="togglePane()"
    >
      <v-icon>mdi-chevron-double-left</v-icon>
    </v-btn>
    <v-btn
      fab
      small
      color="ap-light-blue"
      v-if="menuOpen"
      class="pane-open mini ap-white--text"
      @click="togglePane()"
    >
      <v-icon>mdi-chevron-double-right</v-icon>
    </v-btn>
    <v-navigation-drawer
      v-model="showTheSidebar"
      app
      color="primary"
      :clipped="clipped"
      enable-resize-watcher
      :mini-variant="menuOpen"
      class="border-radius-tr-16"
      :permanent="!$vuetify.breakpoint.xsOnly"
      stateless
      hide-overlay
    >
      <v-img
        class="ma-4"
        :max-height="26"
        :max-width="154"
        :lazy-src="getLogo()"
        :src="getLogo()"
      />
      <v-list dense nav class="mt-16 pa-0">
        <v-list-item-group mandatory>
          <v-list-item to="/">
            <v-tooltip right>
              <template #activator="{ on }">
                <v-list-item-icon class="mx-2" v-on="on">
                  <v-icon class="ap-white--text size-20" v-text="'mdi-home'" />
                </v-list-item-icon>
              </template>
              <span>Control Panel</span>
            </v-tooltip>
            <v-list-item-title class="ap-white--text">
              Control Panel
            </v-list-item-title>
          </v-list-item>
          <v-list-group
            v-if="!menuOpen"
            append-icon="mdi-chevron-down"
            v-on="on"
          >
            <template #activator>
              <v-tooltip slot="prepend" right>
                <template #activator="{ on }">
                  <v-list-item-icon class="mx-2" v-on="on">
                    <span class="alert-sidebar"></span>
                    <v-icon class="size-20" v-text="'mdi-database'" />
                  </v-list-item-icon>
                </template>
                <v-list-item-content>
                  <span>Clean Data</span>
                </v-list-item-content>
              </v-tooltip>
              <v-list-item-title class="ap-white--text"
                >Clean Data</v-list-item-title
              >
            </template>
            <v-list-item
              v-for="item in navbarItemsForAdminTheUserHasPermissionToView"
              :to="item.path"
              class="ap-white--text"
              :key="item.title"
            >
              <v-tooltip right>
                <template #activator="{ on }">
                  <v-list-item-icon :class="getActiveMenuClass" v-on="on">
                    <v-icon
                      v-if="!menuOpen"
                      class="size-20"
                      v-text="item.icon"
                    />
                  </v-list-item-icon>
                </template>
                <span>{{ item.title }}</span>
              </v-tooltip>
              <v-list-item-title class="ap-white--text">
                {{ item.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list-group>
          <v-list-group
            v-if="menuOpen"
            append-icon="mdi-chevron-down"
            v-on="on"
          >
            <template #activator>
              <v-menu offset-x open-on-hover>
                <template #activator="{ on }">
                  <v-list-item-icon class="mx-2" v-on="on">
                    <span class="alert-sidebar"></span>
                    <v-icon class="size-20" v-text="'mdi-database'" />
                  </v-list-item-icon>
                </template>
                <v-list>
                  <v-list-item
                    v-for="item in navbarItemsForAdminTheUserHasPermissionToView"
                    :to="item.path"
                    :key="item.title"
                  >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </v-list-group>
        </v-list-item-group>
      </v-list>
      <template #append>
        <v-list class="ap-white--text pa-0" dense nav>
          <v-list-item-group>
            <v-list-item
              v-for="item in navbarBottomItemForAdmin"
              :to="item.path"
              class="ap-white--text"
              :key="item.title"
            >
              <v-tooltip right>
                <template #activator="{ on }">
                  <v-list-item-icon class="mx-2" v-on="on">
                    <v-icon class="ap-white--text size-20" v-text="item.icon" />
                  </v-list-item-icon>
                </template>
                <span>{{ item.title }}</span>
              </v-tooltip>
              <v-list-item-title class="ap-white--text">
                {{ item.title }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="signOut">
              <v-tooltip right>
                <template #activator="{ on }">
                  <v-list-item-icon class="mx-2" v-on="on">
                    <v-icon
                      class="ap-white--text size-20"
                      v-text="'mdi-power'"
                    />
                  </v-list-item-icon>
                </template>
                <span>Logout</span>
              </v-tooltip>
              <v-list-item-title class="ap-white--text"
                >Logout</v-list-item-title
              >
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </template>
    </v-navigation-drawer>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'sidebar',
  components: {},
  data: function () {
    return {
      showTheSidebar: true,
      navbarItemsForAdmin: [
        {
          title: 'User Management',
          path: '/cleandata/users',
          icon: 'mdi-arrow-right',
          necessaryPermissions: ['admin.users.get']
        },
        {
          title: 'Permissions Rules',
          path: '/cleandata/roles',
          icon: 'mdi-arrow-right',
          necessaryPermissions: ['admin.roles.get']
        },
        {
          title: 'Business Scenarios',
          path: '/cleandata/business-rules',
          icon: 'mdi-arrow-right',
          necessaryPermissions: ['admin.roles.get']
        },
        {
          title: 'General Settings',
          path: '/cleandata/general-settings',
          icon: 'mdi-arrow-right',
          necessaryPermissions: ['admin.roles.get']
        }
      ],
      navbarBottomItemForAdmin: [
        {
          title: 'Licenses Overview',
          path: '/license',
          icon: 'mdi-license',
          necessaryPermissions: ['admin.licenses.get']
        },
        {
          title: 'My profile',
          path: '/account',
          icon: 'mdi-account',
          necessaryPermissions: ['admin.accounts.get']
        },
        {
          title: 'Notifications',
          path: '/notifications',
          icon: 'mdi-bell-outline',
          necessaryPermissions: ['admin.notifications.get']
        },
        {
          title: 'Security',
          path: '/security',
          icon: 'mdi-guitar-pick-outline',
          necessaryPermissions: ['admin.security.get']
        },
        {
          title: 'Help',
          path: '/help',
          icon: 'mdi-help-circle-outline',
          necessaryPermissions: ['admin.help.get']
        }
      ],
      on: undefined,
      menuOpen: false,
      clipped: false
    }
  },
  watch: {},
  computed: {
    ...mapState({
      permittedActions: (state) => state.user.permittedActions
    }),
    navbarItemsForAdminTheUserHasPermissionToView() {
      let navbarItemsForAdminTheUserHasPermissionToView = []
      for (let item of this.navbarItemsForAdmin) {
        let userHasNecessaryPermissions = true
        for (let requiredPermission of item.necessaryPermissions) {
          if (!this.permittedActions.includes(requiredPermission)) {
            userHasNecessaryPermissions = false
          }
        }
        if (userHasNecessaryPermissions) {
          navbarItemsForAdminTheUserHasPermissionToView.push(item)
        }
      }
      return navbarItemsForAdminTheUserHasPermissionToView
    },
    showAdminLink() {
      for (let actionName of this.permittedActions) {
        if (actionName.startsWith('admin')) {
          return true
        }
      }
      return false
    },
    getActiveMenuClass() {
      if (!this.menuOpen) {
        return 'ml-6 px-2 mx-2'
      }
      return 'mx-auto'
    }
  },
  methods: {
    ...mapActions({
      signOut: 'auth/signOut'
    }),
    togglePane() {
      this.menuOpen = !this.menuOpen
    },
    getLogo() {
      if (!this.menuOpen) {
        return require('@/assets/fullAPLogo.jpg')
      }
      return require('@/assets/aplogo.png')
    }
  }
}
</script>
