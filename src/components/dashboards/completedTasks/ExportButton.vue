<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn
        class="px-0 custom-icon-button"
        outlined
        height="40"
        color="ap-dark-gray"
        v-on="on"
      >
        <div class="px-3 font-weight-bold size-13">export</div>
        <div
          class="d-flex align-center justify-center px-2 height-100p"
          :style="{
            borderLeft: `1px solid ${$vuetify.theme.themes.light['ap-dark-gray']}`
          }"
        >
          <v-icon size="22">mdi-chevron-down</v-icon>
        </div>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        @click="onExport"
      >
        <v-list-item-title class="size-13">
          {{ item }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'export-button',
  data: () => ({
    items: ['Export XLSX', 'Export CSV']
  }),
  methods: {
    onExport() {
      this.$emit('exportStarted')
      // simulate time taken for export to finish
      setTimeout(() => {
        this.$emit('exportFinished')
      }, 10000)
    }
  }
}
</script>
