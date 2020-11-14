<template>
  <div class="d-flex pa-5 size-12 align-center">
    <div
      class="pointer d-flex align-center"
      :class="i === routes.length - 1 ? 'ap-sky-blue--text' : 'primary--text'"
      v-for="(item, i) of routes"
      :key="i"
      @click="$router.push(item.path)"
    >
      {{ item.name }}
      <v-icon v-if="i !== routes.length - 1" color="primary" size="20">
        mdi-chevron-right
      </v-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bread-crumb',
  computed: {
    routes: function () {
      const routes = this.$route.matched
      return routes.filter((item) => item.name && item.name !== 'home')
    }
  }
}
</script>
