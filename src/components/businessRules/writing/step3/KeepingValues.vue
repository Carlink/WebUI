<template>
  <div class="border-all border-radius-5 mb-8">
    <div class="pa-4">
      <div class="d-flex justify-space-between">
        <span class="font-weight-bold writing-form-title"
          >Automatic actions on field you want to keep:</span
        >
        <v-btn
          class="text-capitalize"
          @click="addobject"
          color="ap-link"
          text
          depressed
          small
        >
          <v-icon size="20" color="ap-link">mdi-plus</v-icon>
          <span class="size-14 ml-1 font-weight-regular">New Field</span>
        </v-btn>
      </div>
      <div
        class="actions-wrapper mt-4 border-radius-4 justify-center align-center d-flex"
        v-for="(object, index) in objects"
        :key="object.id"
      >
        <v-container>
          <v-row dense class="center">
            <v-col cols="11">
              <v-row dense>
                <v-col cols="6">
                  <v-select
                    outlined
                    dense
                    :items="actionFields"
                    class="white"
                    hide-details
                    :key="object.id"
                    block
                    v-model="object.action"
                  ></v-select>
                </v-col>
                <v-col cols="6">
                  <v-select
                    outlined
                    dense
                    :items="opertators"
                    class="white"
                    hide-details
                    :key="object.id"
                    block
                    v-model="object.operator"
                  />
                </v-col>
              </v-row>
              <v-row v-if="object.action">
                <v-col col="12">
                  <v-combobox
                    multiple
                    dense
                    append-icon
                    chips
                    deletable-chips
                    class="white"
                    outlined
                    hide-details
                  >
                  </v-combobox>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="1" class="d-flex">
              <v-btn icon @click="removeobject(index)" class="mt-1">
                <v-icon class="size-14">close</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'writing-keeping-values',
  data: () => ({
    actionFields: ['Name', 'Shipping Address', 'Turnover', 'Saled YTD'],
    opertators: [
      'Equal',
      'Does not equal',
      'Contains',
      'Does not contains',
      'Starts with',
      'Ends with'
    ],
    object: 1,
    objects: [{ id: 1 }]
  }),
  methods: {
    addobject() {
      this.object++
      this.objects.push({ id: this.object })
    },
    removeobject(object) {
      this.objects.splice(object, 1)
    }
  }
}
</script>
