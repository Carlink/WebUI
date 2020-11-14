<template>
  <div class="segmentation-container white pa-4 mx-auto">
    <v-container fluid>
      <v-row no-gutters justify="center">
        <v-col cols="12">
          <div>
            <div class="size-20 font-weight-black mb-4">
              Tell us how to identify duplicates
            </div>
            <h4
              class="mb-2 size-18 segmentation-form-title font-weight-bold"
            >
              How do you want to pull up the records?
            </h4>
            <v-tabs
              class="segmentation"
              v-model="tabs"
              centered
              grow
              slider-size="4"
              height="38"
            >
              <v-tabs-slider color="ap-sky-blue"></v-tabs-slider>
              <v-tab class="width-50p text-none">Use a native CRM report</v-tab>
              <v-tab class="width-50p max-width-auto text-none"
                >Set up ActivePrime report</v-tab
              >
            </v-tabs>
            <v-tabs-items v-model="tabs">
              <v-tab-item>
                <div class="d-flex width-100p justify-end">
                  <div class="mb-3 mt-5">
                    <v-btn
                      text
                      small
                      color="primary"
                      @click="addObject"
                      class="ap-link--text size-14 text-none font-weight-regular"
                    >
                      <v-icon class="size-12">mdi-plus</v-icon> Add new object
                    </v-btn>
                  </div>
                </div>
                <v-card
                  class="mx-auto objectContainer px-4 pt-2"
                  v-for="(object, index) in objects"
                  :key="object.id"
                  outlined
                >
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        <v-row no-gutters align="center" class="mb-6">
                          <v-col
                            cols="11"
                            sm="11"
                            class="size-18 mb-1 font-weight-bold"
                            >Object #{{ index + 1 }}</v-col
                          >
                          <v-col cols="1" sm="1">
                            <div class="d-flex width-100p justify-end">
                              <v-btn icon @click="removeObject(index)">
                                <v-icon size="16">close</v-icon>
                              </v-btn>
                            </div>
                          </v-col>
                        </v-row>
                      </v-list-item-title>
                      <div>
                        <h4
                          class="segmentation-form-title mb-2 size-18 font-weight-bold"
                        >
                          Select the object:
                        </h4>
                        <v-select
                          outlined
                          dense
                          :items="objectOptions"
                        ></v-select>
                      </div>
                      <div>
                        <h4 class="segmentation-form-title size-18 mb-2">
                          Select the report you want to use:
                        </h4>
                        <v-autocomplete
                          outlined
                          dense
                          :items="report"
                          multiple
                          color="#196dcc"
                        >
                          <template slot="append-item">
                            <v-btn
                              text
                              small
                              block
                              color="primary"
                              @click="createNewReport"
                              class="ap-link--text size-14 text-capitalize font-weight-regular"
                            >
                              <v-icon class="size-12">mdi-plus</v-icon> Create
                              new
                            </v-btn>
                          </template>
                        </v-autocomplete>
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </v-tab-item>
              <active-prime-report></active-prime-report>
            </v-tabs-items>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import ActivePrimeReport from './ActivePrimeReport'
export default {
  name: 'lead-segmentation',
  components: { ActivePrimeReport },
  data: () => ({
    tabs: null,
    objectOptions: ['Accounts', 'Contacts', 'Leads'],
    report: ['Turnover', 'Sales YTD', 'New Leads'],
    object: 1,
    objects: [{ id: 1 }]
  }),
  methods: {
    addObject() {
      this.object++
      this.objects.push({ id: this.object })
    },
    removeObject(object) {
      this.objects.splice(object, 1)
    },
    createNewReport() {
      window.open('https://google.com') //static link will be changed in future
    }
  }
}
</script>
<style scoped>
.objectContainer {
  margin-bottom: 20px;
}
</style>

<style>
.segmentation-form-title {
  color: #196dcc;
}
</style>
<style lang="scss">
.add-rule-container {
  .v-tabs.segmentation {
    .v-slide-group__wrapper {
      border: 1px solid var(--v-ap-light-gray-base);
    }
    a.v-tab {
      border-bottom: 1px solid var(--v-ap-light-gray-base);
    }
    .v-slide-group__content div:nth-child(2) {
      border-right: 1px solid var(--v-ap-light-gray-base);
    }
  }
}
.segmentation-container {
  max-width: 605px;
}
</style>
