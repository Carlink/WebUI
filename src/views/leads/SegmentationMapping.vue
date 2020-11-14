<template>
  <div class="mapping-container white pa-4 mx-auto">
    <v-container class="mapping">
      <v-dialog v-model="dialog" width="800">
        <v-card>
          <v-card-title class="justify-end pa-2">
            <v-btn icon @click="onModalClose()"><v-icon>close</v-icon></v-btn>
          </v-card-title>
          <div class="d-flex justify-center align-center pb-1">
            <div class="title width-40p">
              <v-text-field
                class="white font-weight-bold black--text"
                append-icon="mdi-pencil"
                single-line
                hide-details
                v-model="mappingData.title"
                dense
                placeholder="Title"
              ></v-text-field>
            </div>
          </div>
          <div class="d-flex justify-center align-center pa-1">
            <div class="description width-40p">
              <v-text-field
                class="white"
                append-icon="mdi-pencil"
                hide-details
                v-model="mappingData.description"
                dense
                placeholder="Description"
              ></v-text-field>
            </div>
          </div>
          <div class="d-flex justify-end align-center pr-6">
            <span class="mr-3">Show only Frequently Used Fields</span>
            <v-switch v-model="switchFrequent" inset></v-switch>
          </div>
          <div class="pa-5 pt-0">
            <v-container
              id="scroll-target"
              class="overflow-y-auto rounded-lg fieldsContainer"
            >
              <v-row align="center" dense>
                <v-col cols="4">
                  <v-divider></v-divider>
                </v-col>
                <v-col cols="4">
                  <div class="d-flex justify-center">
                    <span class="size-16">Frequently used fields</span>
                  </div>
                </v-col>
                <v-col cols="4">
                  <v-divider></v-divider>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <div class="d-flex">
                    <div class="text-right mr-3 width-110 font-weight-bold">
                      Objects
                    </div>
                    <div class="text-right mr-3 width-110 font-weight-bold">
                      Field
                    </div>
                  </div>
                </v-col>
                <v-col cols="6">
                  <div class="d-flex">
                    <div class="text-right font-weight-bold">
                      Displayed Field name
                    </div>
                  </div>
                </v-col>
              </v-row>
              <div
                v-for="(field, i) in mappingData.frequentlyUsed"
                :key="i"
                class="pa-2 pt-0"
              >
                <mapping-field :field="field"></mapping-field>
              </div>
              <div v-if="!switchFrequent">
                <v-row align="center" dense>
                  <v-col cols="5">
                    <v-divider></v-divider>
                  </v-col>
                  <v-col cols="2">
                    <div class="d-flex justify-center">
                      <span class="size-16">All Fields</span>
                    </div>
                  </v-col>
                  <v-col cols="5">
                    <v-divider></v-divider>
                  </v-col>
                </v-row>
                <div
                  class="pa-2 pt-0"
                  v-for="(field, i) in mappingData.allFields"
                  :key="i"
                >
                  <mapping-field :field="field"></mapping-field>
                </div>
              </div>
            </v-container>
          </div>
          <v-container>
            <v-row>
              <v-col cols="12" align="center" justify="center">
                <v-btn color="primary" @click="onModalClose">Apply</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
      <v-row no-gutters justify="center">
        <v-col cols="12">
          <div class="size-28 font-weight-black mb-4">
            Which field mapping do you want to use
          </div>
          <div class="d-flex width-100p justify-end">
            <div>
              <v-btn
                text
                small
                color="primary"
                @click="addNew"
                class="ap-link--text size-14 text-capitalize font-weight-regular"
              >
                <v-icon class="ap-link--text size-12">mdi-plus</v-icon> Add new
              </v-btn>
            </div>
          </div>
          <v-radio-group
            v-model="activeRule"
            class="pa-0 ma-0 mr-auto"
            hide-details
          >
            <v-row>
              <v-col
                cols="6"
                v-for="option in options"
                :key="option.id"
                class="pt-0"
              >
                <v-card outlined class="pa-4 mt-4" elevation="0">
                  <div class="d-flex flex-nowrap align-start">
                    <div class="d-flex width-100p">
                      <v-radio
                        class="font-weight-black"
                        label="Lead, Accounts, Contact 2"
                        :value="option.id"
                      >
                        <template #label>
                          <span class="black--text font-weight-bold">
                            {{ option.title }}
                          </span>
                        </template>
                      </v-radio>
                    </div>

                    <v-btn icon @click="openModal(option)">
                      <v-icon size="20">mdi-pencil</v-icon>
                    </v-btn>
                  </div>
                  <div class="size-13 pl-8 mt-1" v-if="option.description">
                    <div>{{ option.description }}</div>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-radio-group>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import MappingField from '@/views/leads/MappingField'
export default {
  name: 'lead-segmentation-mapping',
  components: { MappingField },
  data: () => ({
    filter: null,
    options: [
      {
        id: 1,
        title: 'Lead, Accounts, Contact',
        description: 'To be used for lead conversion'
      },
      {
        id: 2,
        title: 'Lead, Accounts, Contact 2',
        description: 'To be used for lead conversion'
      }
    ],
    mappingData: {
      title: '',
      description: '',
      frequentlyUsed: [
        {
          fields: [
            { name: 'Lead', value: 'Address' },
            { name: 'Contact', value: 'Mailing Address' },
            { name: 'Account', value: 'Billing Address' }
          ],
          name: 'Address'
        },
        {
          fields: [
            { name: 'Lead', value: 'Company' },
            { name: 'Contact', value: 'Account' },
            { name: 'Account', value: 'Account Name' }
          ],
          name: 'Account'
        }
      ],
      allFields: [
        {
          fields: [
            { name: 'Lead', value: 'Address' },
            { name: 'Contact', value: 'Mailing Address' },
            { name: 'Account', value: 'Billing Address' }
          ],
          name: 'Phone'
        }
      ]
    },
    activeRule: '',
    dialog: false,
    getTitle: '12323',
    objectOptions: ['Status'],
    switchFrequent: false
  }),
  methods: {
    openModal(option) {
      this.mappingData.title = option.title
      this.mappingData.description = option.description
      this.dialog = true
    },
    onModalClose() {
      this.dialog = false
      this.switchFrequent = false
    },
    addNew() {
      this.mappingData.title = ''
      this.mappingData.description = ''
      this.dialog = true
    }
  }
}
</script>
<style scoped>
.fieldsContainer {
  max-height: 400px;
  border: 1px solid #efefef;
}
.mapping-container {
  max-width: 605px;
}
</style>
