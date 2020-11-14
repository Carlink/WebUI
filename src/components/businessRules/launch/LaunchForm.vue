<template>
  <v-form v-model="valid">
    <v-row class="flex-column align-center no-gutters">
      <v-col cols="6">
        <label>Name</label>
        <v-text-field outlined dense v-model="firstname"></v-text-field>
      </v-col>
      <v-col cols="6">
        <label>Description</label>
        <v-textarea outlined dense v-model="description"></v-textarea>
      </v-col>
      <v-col cols="6">
        <label>Notes</label>
        <v-text-field outlined dense v-model="notes"></v-text-field>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  name: 'launch-form'
}
</script>
