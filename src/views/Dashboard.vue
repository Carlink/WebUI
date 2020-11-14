<template>
  <v-app>
    <v-main style="background: #f9f9f9;">
      <v-container fluid>
        <v-app-bar dense elevation="0">
          <v-toolbar-title>Acme Widgets Inc</v-toolbar-title>

          <v-spacer />

          <v-btn color="primary" class="mx-2" to="/">
            <v-icon>mdi-home-variant</v-icon>
            <span class="px-2">Home</span>
          </v-btn>
          <v-btn color="primary" class="mx-2" to="/admin-dashboard">
            <v-icon>mdi-view-dashboard</v-icon>
            <span class="px-2">Admin Dashboard</span>
          </v-btn>
          <v-btn color="primary" class="mx-2" to="/sales-rep-dashboard">
            <v-icon>mdi-view-dashboard</v-icon>
            <span class="px-2">Sales Representative Dashboard</span>
          </v-btn>
          <v-btn color="primary" class="mx-2" to="/sales-manager-dashboard">
            <v-icon>mdi-view-dashboard</v-icon>
            <span class="px-2">Sales Manager Dashboard</span>
          </v-btn>
        </v-app-bar>
        <transition name="fade">
          <router-view />
        </transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'Dashboard',
}
</script>
