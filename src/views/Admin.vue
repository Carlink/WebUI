<template>
  <v-row no-gutters>
    <v-col>
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </v-col>
  </v-row> 
</template>
<script>
  export default {
    name: 'admin',
  }
</script>
