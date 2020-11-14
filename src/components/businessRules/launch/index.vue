<template>
  <v-container>
    <v-row>
      <v-col class="text-right">
        <v-btn dense icon outlined class="rounded"
          ><v-icon>more_vert</v-icon></v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <LaunchForm />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LaunchForm from './LaunchForm'

export default {
  name: 'LaunchTab',
  components: {
    LaunchForm
  }
}
</script>
