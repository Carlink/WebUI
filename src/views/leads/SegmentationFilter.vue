<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col cols="9">
        <div>
          <h3 class="mb-5 v-size--large cursor-default text-h6 font-weight-bold">
            Tell us how to apply the segmentation filter
          </h3>
          <v-row>
            <v-col cols="12">
              <v-card class="mx-auto objectContainer" outlined>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-row dense>
                        <v-col
                          cols="12"
                          class="segmentation-form-title cursor-default font-weight-bold"
                          >Apply this filter to match:</v-col
                        >
                        <v-col cols="12">
                          <v-radio-group
                            v-model="filter"
                            class="mt-0"
                            color="purple"
                          >
                            <v-radio
                              class="v-size--small font-weight-medium"
                              color="#196dcc"
                              v-for="option in options"
                              :label="option"
                              :value="option"
                              :key="option"
                            />
                          </v-radio-group>
                        </v-col>
                      </v-row>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: 'lead-segmentation',
  data: () => ({
    filter: null,
    options: [
      'Against entire database',
      'Within this subset',
      'Against another subset'
    ]
  })
}
</script>
<style scoped>
.objectContainer {
  margin-bottom: 20px;
}
.heading {
  font-size: 24px;
  margin-bottom: 20px;
}
.segmentation-form-title {
  color: #196dcc;
}
</style>
