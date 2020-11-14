<template>
  <v-row class="grey lighten-4">
    <v-col cols="12">
      <div class="d-flex align-center">
        <div class="pr-3 width-50p divider">
          <div
            class="d-flex mb-3 align-center"
            v-for="(options, i) in field.fields"
            :key="i"
          >
            <span class="text-right mr-3 cursor-default width-110">{{ options.name }}</span>
            <v-select
              outlined
              dense
              hide-details
              class="white width-100p"
              :items="objectOptions"
              v-model="options.value"
            ></v-select>
          </div>
        </div>
        <div class="d-flex align-center width-50p">
          <v-icon class="size-16 mr-2 ml-1 pointer">mdi-arrow-right</v-icon>
          <v-text-field
            class="white"
            append-icon="mdi-pencil"
            hide-details
            outlined
            dense
            :placeholder="field.name"
          ></v-text-field>
        </div>
      </div>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'mapping-field',
  props: ['field'],
  data: () => ({
    objectOptions: [
      'Address',
      'Mailing Address',
      'Billing Address',
      'Company',
      'Account',
      'Account Name'
    ]
  })
}
</script>
<style scoped>
.divider {
  border-right: 1px solid #b9b9b9;
}
</style>
