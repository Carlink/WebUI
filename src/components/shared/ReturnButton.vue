<template>
  <v-row no-gutters class="pb-2 pt-4">
    <div
      no-gutters
      class="d-flex white align-center ap-dark-blue--text text-none border-all pr-3 pl-2 rounded pointer noselect"
      @click="returnLink()"
    >
      <div class="d-flex py-1">
        <v-icon color="ap-dark-blue" left>keyboard_arrow_left</v-icon>
        <div>Return to {{ returnRouteName }}</div>
      </div>
      <v-divider vertical class="mx-3"></v-divider>
      <div class="black--text">{{ actualRoute }}</div>
    </div>
  </v-row>
</template>

<script>
export default {
  methods: {
    routerLink(link) {
      this.$router.push(link)
    },
    returnLink() {
      this.$router.push('/' + this.returnRoute)
    },
    getRoute(route) {
      switch (route) {
        case 'team-performance-dashboard':
          return {
            name: 'Team Performance Dashboard',
            returnRoute: 'admin-dashboard',
            returnName: 'Admin Dashboard'
          }
        case 'sys-performance-dashboard':
          return {
            name: 'System Performance Dashboard',
            returnRoute: 'admin-dashboard',
            returnName: 'Admin Dashboard'
          }
        case 'on-plate-dashboard':
          return {
            name: 'On My Plate',
            returnRoute: 'admin-dashboard',
            returnName: 'Admin Dashboard'
          }
        case 'admin-dashboard':
          return {
            name: 'Admin Dashboard',
            returnRoute: 'dashboard',
            returnName: 'Dashboard'
          }
        case 'sales-rep-dashboard':
          return {
            name: 'Sales Representative Dashboard',
            returnRoute: 'dashboard',
            returnName: 'Dashboard'
          }
        case 'sales-manager-dashboard':
          return {
            name: 'Sales Manager Dashboard',
            returnRoute: 'dashboard',
            returnName: 'Dashboard'
          }
        default:
          return {
            name: 'Not Registered Route',
            returnRoute: 'dashboard',
            returnName: 'Dashboard'
          }
      }
    }
  },
  computed: {
    route() {
      return this.$route.path.split('/')[this.$route.path.split('/').length - 1]
    },
    actualRoute() {
      return this.getRoute(this.route).name
    },
    returnRouteName() {
      return this.getRoute(this.route).returnName
    },
    returnRoute() {
      return this.getRoute(this.route).returnRoute
    }
  }
}
</script>
