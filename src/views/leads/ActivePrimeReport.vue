<template>
  <v-tab-item class="activePrimeReport">
    <div class="d-flex width-100p justify-end">
      <div class="mb-3 mt-3">
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
      class="mx-auto mb-5"
      :key="object.id"
      v-for="(object, index) in objects"
      outlined
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <v-row>
              <v-col cols="11" class="headline mb-1 cursor-default"
                >Object #{{ index + 1 }}</v-col
              >
              <v-col cols="1">
                <div class="d-flex width-100p justify-end">
                  <v-btn icon @click="removeObject(index)">
                    <v-icon class="size-14">close</v-icon>
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-list-item-title>
          <div>
            <h4 class="segmentation-form-title mb-1 cursor-default">
              Search for duplicate in:
            </h4>
            <v-select
              class="mb-5"
              :items="objectOptions"
              dense
              outlined
            ></v-select>
            <v-row dense>
              <v-col cols="9">
                <h4 class="segmentation-form-title pointer">
                  <v-icon color="#196dcc">mdi-filter</v-icon>
                  Show only result for
                </h4>
              </v-col>
              <v-col cols="3">
                <div class="d-flex width-100p justify-end">
                  <v-btn
                    text
                    small
                    color="primary"
                    @click="addFilter(object)"
                    class="ap-link--text size-14 text-none font-weight-regular"
                  >
                    <v-icon class="size-12">mdi-plus</v-icon> Add new filter
                  </v-btn>
                </div>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="11">
                <v-row>
                  <v-col cols="4">
                    <div>
                      <label class="mb-2 text-body-1">
                        Field
                      </label>
                      <v-select outlined dense :items="fieldOptions"></v-select>
                    </div>
                  </v-col>
                  <v-col cols="4">
                    <div>
                      <label class="mb-2 text-body-1">
                        Operation
                      </label>
                      <v-select
                        :items="operationOptions"
                        outlined
                        dense
                      ></v-select>
                    </div>
                  </v-col>
                  <v-col cols="4">
                    <div>
                      <label class="mb-2 text-body-1">
                        Value
                      </label>
                      <v-text-field
                        dense
                        outlined
                      ></v-text-field>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <div
              v-for="(filter, filterIndex) in object.filters"
              :key="filter.id"
            >
              <v-row dense>
                <v-col cols="12">
                  <div class="d-flex justify-center">
                    <v-radio-group
                      row
                      justify="center"
                      v-model="filter.radioGroup"
                    >
                      <v-radio
                        color="#016dcc"
                        label="and"
                        value="and"
                      ></v-radio>
                      <v-radio color="#016dcc" label="or" value="or"></v-radio>
                    </v-radio-group>
                  </div>
                </v-col>
              </v-row>
              <v-row dense align-content="center">
                <v-col cols="11">
                  <v-row>
                    <v-col cols="4">
                      <label class="mb-2 text-body-1">
                        Field
                      </label>
                      <v-select :items="fieldOptions" outlined dense></v-select>
                    </v-col>
                    <v-col cols="4">
                      <label class="mb-2 text-body-1">
                        Operation
                      </label>
                      <v-select
                        :items="operationOptions"
                        outlined
                        dense
                      ></v-select>
                    </v-col>
                    <v-col cols="4">
                      <label class="mb-2 text-body-1">
                        Value
                      </label>
                      <v-text-field
                        v-model="filter.value"
                        dense
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="1">
                  <div class="d-flex align-center height-100p">
                    <v-btn
                      class="margin-top-10"
                      icon
                      @click="removeFilter(index, filterIndex)"
                      ><v-icon class="size-16" color="#706E6B"
                        >close</v-icon
                      ></v-btn
                    >
                  </div>
                </v-col>
              </v-row>
            </div>
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-tab-item>
</template>

<script>
export default {
  name: 'active-prime-report',
  data: () => ({
    objectOptions: ['Accounts', 'Contacts', 'Leads'],
    fieldOptions: ['Name', 'Billing Street', 'Description', 'Phone'],
    operationOptions: ['=', '!=', '<', '<=', '>=', 'IN()', 'NOT IN()', '%'],
    valueOptions: [
      'equals',
      'not equal to',
      'less then',
      'less or equal',
      'greater or equal',
      'contain',
      'does not contain',
      'start with'
    ],
    object: 1,
    objects: [{ id: 1, filters: [{ id: 1 }] }],
    radioGroup: ''
  }),
  methods: {
    addObject() {
      this.object++
      this.objects.push({ id: this.object, filters: [{ id: 1 }] })
    },
    removeObject(object) {
      this.objects.splice(object, 1)
    },
    createNewReport() {
      window.open('https://google.com') //static link will be changed in future
    },
    addFilter(object) {
      const getFilter = this.objects.find((o) => o.id === object.id)
      if (!getFilter) return
      getFilter.filters.push({ id: getFilter.filters.length + 1 })
    },
    removeFilter(index, filter) {
      this.objects[index].filters.splice(filter, 1)
    }
  }
}
</script>

<style lang="scss">
.activePrimeReport {
  .v-input--selection-controls {
    margin-top: 0;
  }
  .v-input__slot {
    margin-bottom: 0;
  }
  .v-messages {
    display: none;
  }
}
</style>
