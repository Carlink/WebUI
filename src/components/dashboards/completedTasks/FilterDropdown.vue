<template>
  <!-- filter button -->
  <v-menu offset-y :close-on-content-click="false">
    <template #activator="{ on }">
      <v-btn class="filter-button" icon v-on="on">
        <v-icon>mdi-filter-outline</v-icon>
      </v-btn>
    </template>
    <v-card class="pa-5">
      <span class="ap-dark-gray--text font-weight-bold">Display tasks</span>
      <div
        v-for="(item, index) in FilterItems"
        :key="index"
        class="d-flex align-center"
      >
        <v-checkbox
          :value="item"
          v-model="toDisplay"
          :label="item"
          hide-details
        />
      </div>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: 'filter-dropdown',
  data: () => ({
    toDisplay: [],
    FilterItems: ['Admin tasks', 'Automated tasks', 'Sales Rep. tasks']
  })
}
</script>

<style></style>
