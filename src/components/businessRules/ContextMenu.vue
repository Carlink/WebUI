<template>
  <v-menu offset-y>
    <template #activator="{ on: menu }">
      <v-btn color="ap-dark-gray" left v-on="{ ...menu }" class="pa-0 option-btn" outlined>
        <v-icon size="20">mdi-dots-vertical</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item v-for="(item, i) in menuItems" :key="i">
        <v-list-item-title class="size-13">
          {{ item }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
export default {
  name: 'context-menu',
  data() {
    return {
      menuItems: [
        'Set to Live',
        'Set to Draft',
        'Archive'
      ]
    }
  }
}
</script>
