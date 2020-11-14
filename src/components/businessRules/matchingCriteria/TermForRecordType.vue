<template>
  <v-card class="pb-4">
    <!-- header -->
    <v-card-title class="pa-6">
      <div
        class="font-weight-black size-20 mx-auto text-center cursor-default border-dashed-bottom"
      >
        Equivalent Term for Record Type
        <v-btn icon class="size-14 pointer text-none">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </div>
      <v-icon
        @click="onCancel"
        class="ap-light-bg d-flex align-center pa-1 rounded-sm pointer absolute close-btn"
        size="16"
        v-ripple
      >
        mdi-close
      </v-icon>
    </v-card-title>
    <v-card-text>
      <v-row no-gutters class="mx-1 mb-4">
        <v-col cols="12">
          <h2
            class="size-16 py-2 font-weight-bold ap-black--text text--primary cursor-default"
          >
            Apply to field type
          </h2>
          <v-select
            class="white flex-grow-0"
            :items="fieldTypes"
            id="applyToFieldType"
            v-model="form.fieldType"
            height="40"
            item-text="text"
            item-value="value"
            style="width: 288px;"
            outlined
            dense
            hide-details
          />
        </v-col>
      </v-row>
      <div class="d-flex flex-nowrap flex-column">
        <h2
          class="size-16 mx-1 py-2 font-weight-bold ap-black--text cursor-default text--primary"
        >
          What are the objects and fields that qualify as a Record Type field?
        </h2>
        <div
          class="d-flex flex-nowrap flex-column py-2 my-2 border-radius-5 ap-light-bg"
          v-for="(item, i) of form.recordTypes"
          :key="i"
        >
          <div v-for="(o, index) of item.objectField" :key="index">
            <div class="d-flex mx-2">
              <v-select
                class="white flex-grow-0 ma-2"
                :items="o.objects"
                id="rtObjects"
                v-model="item.objects"
                height="40"
                item-text="text"
                item-value="value"
                style="width: 288px;"
                outlined
                dense
                hide-details
              />
              <v-select
                class="white flex-grow-0 ma-2"
                :items="o.fields"
                id="rtObjects"
                v-model="item.fields"
                height="40"
                item-text="text"
                item-value="value"
                style="width: 288px;"
                outlined
                dense
                hide-details
              />
              <v-btn icon class="my-2" @click="removeFields(index, i)">
                <v-icon>close</v-icon>
              </v-btn>
            </div>
          </div>
          <v-btn
            text
            small
            class="ap-link--text size-14 mr-auto justify-start pointer text-none font-weight-regular"
            @click="addNewField(item)"
          >
            <v-icon class="size-13">mdi-plus</v-icon>
            New Field
          </v-btn>
        </div>
      </div>
      <div class="d-flex justify-end">
        <v-btn
          text
          small
          class="ap-link--text size-14 pointer mb-3 text-none font-weight-regular"
          @click="addNewObjects"
        >
          <v-icon class="size-13">mdi-plus</v-icon>
          New Object
        </v-btn>
      </div>
      <div
        class="d-flex flex-nowrap flex-column border-all border-radius-5 pa-4 my-2"
        v-for="(item, i) of form.groups"
        :key="i"
      >
        <div class="d-flex">
          <h2
            class="size-16 mx-1 py-2 font-weight-bold cursor-default ap-black--text text--primary"
          >
            {{ 'Group' + (i + 1) }}
          </h2>
          <v-spacer></v-spacer>
          <v-btn icon class="my-2" @click="removeGroups(i)">
            <v-icon>close</v-icon>
          </v-btn>
        </div>
        <div
          class="d-flex flex-nowrap flex-column py-2 my-2"
          v-for="(object, index) of item.objects"
          :key="index"
        >
          <div class="d-flex">
            <h4 class="ap-black--text">
              {{ object.text }}
            </h4>
            <v-divider class="ma-2"></v-divider>
          </div>
          <div class="d-flex py-2">
            <v-row no-gutters>
              <v-col cols="5">
                <div class="select-drop" style="width: 268px;">
                  <v-menu offset-y>
                    <template #activator="{ on }">
                      <div
                        class="d-flex align-center justify-space-between pointer field-box"
                        v-on="on"
                        v-if="light"
                      >
                        <span class="value">{{ object.selectedText }}</span>
                        <v-icon color="black">mdi-chevron-down</v-icon>
                      </div>
                      <v-text-field
                        :value="object.selectedText"
                        v-on="on"
                        append-icon="mdi-chevron-down"
                        outlined
                        dense
                        hide-details
                      />
                    </template>
                    <v-card>
                      <!-- search field -->
                      <v-text-field
                        v-model="search"
                        @click.stop="() => {}"
                        class="px-3 py-1"
                        placeholder="Search Field"
                        append-icon="mdi-magnify"
                        flat
                        dense
                        solo
                        hide-details
                        autofocus
                      />
                      <v-divider />
                      <v-list>
                        <v-list-item
                          class="px-5 py-1"
                          v-for="(field, n) in recordTypes.fields"
                          :key="n"
                          @click="addSelectedGroups(item, object, field)"
                        >
                          {{ field.text }}
                        </v-list-item>
                      </v-list>
                      <div class="append-slot">
                        <slot name="append"></slot>
                      </div>
                    </v-card>
                  </v-menu>
                </div>
              </v-col>
              <v-divider inset vertical class="pl-4 mx-4"></v-divider>
              <v-col cols="6">
                <v-chip
                  class="ma-2"
                  color="ap-blue"
                  text-color="ap-white"
                  v-for="(field, idx) of object.selectedFields"
                  :key="idx"
                  close
                  @click:close="removeSelectedGroupFields(idx, i, index)"
                >
                  {{ field.text }}
                </v-chip>
              </v-col>
            </v-row>
          </div>
        </div>
      </div>
      <div class="d-flex justify-end">
        <v-btn
          text
          small
          class="ap-link--text size-14 justify-end pointer mb-3 text-none font-weight-regular"
          @click="addNewGroups"
        >
          <v-icon class="size-13">mdi-plus</v-icon>
          New Group
        </v-btn>
      </div>
      <div class="d-flex justify-center mt-6">
        <v-btn color="primary" class="mx-3" outlined @click="onCancel"
          >CANCEL</v-btn
        >
        <v-btn color="primary">Apply</v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'term-record-type',
  components: {},
  data: () => ({
    light: false,
    form: {
      fieldType: 'record_type',
      recordTypes: [],
      groups: []
    },
    defaultFields: {
      fieldId: 1,
      objects: { text: 'Accounts', value: 'account' },
      fields: { text: 'Record Type', value: 'record_type' }
    },
    defaultRecordTypes: {
      objectId: 1,
      objectField: [
        {
          fieldId: 1,
          objects: { text: 'Accounts', value: 'account' },
          fields: { text: 'Record Type', value: 'record_type' }
        }
      ]
    },
    defaultGroups: {
      groupId: 1,
      objects: [
        {
          objectId: 1,
          selectedText: 'Record Type',
          text: 'Accounts',
          value: 'account',
          type: 'account',
          selectedFields: [{ id: 1, text: 'Record Type', value: 'record_type' }]
        },
        {
          objectId: 2,
          selectedText: 'Record Type 1',
          text: 'Leads',
          value: 'leads',
          type: 'leads',
          selectedFields: [
            { id: 1, text: 'Record Type 1', value: 'record_type_1' }
          ]
        }
      ]
    },
    fieldTypes: [
      { id: 1, text: 'Record Type', value: 'record_type' },
      { id: 2, text: 'Record Type 1', value: 'record_type_1' },
      { id: 3, text: 'Record Type 2', value: 'record_type_2' }
    ],
    recordTypes: {
      id: 1,
      objects: [
        { objectId: 1, text: 'Accounts', value: 'account' },
        { objectId: 2, text: 'Leads', value: 'leads' }
      ],
      fields: [
        { fieldId: 1, text: 'Record Type', value: 'record_type' },
        { fieldId: 2, text: 'Record Type 1', value: 'record_type_1' },
        { fieldId: 3, text: 'Record Type2 ', value: 'record_type_2' }
      ]
    },
    selection: null,
    search: '',
    menu1: false
  }),
  mounted() {
    this.form.groups.push(this.defaultGroups)
    this.form.recordTypes.push(this.defaultRecordTypes)
  },
  computed: {
    computedValue: function () {
      return this.selection || this.placeholder
    }
  },
  methods: {
    addNewField(object) {
      const getFields = this.form.recordTypes.find(
        (o) => o.objectId === object.objectId
      )
      if (!getFields) return
      let newFields = {}
      if (getFields.objectField && getFields.objectField.length > 0) {
        newFields = {
          fieldId: getFields.objectField.length + 1,
          objects: getFields.objectField[0].objects,
          fields: getFields.objectField[0].fields
        }
      } else {
        newFields = {
          fieldId: getFields.objectField.length + 1,
          objects: this.recordTypes.objects[0],
          fields: this.recordTypes.fields[0]
        }
      }
      getFields.objectField.push(newFields)
    },
    onCancel() {
      this.$emit('close', null)
    },
    addNewGroups() {
      const groupObject = Object.assign({}, this.form.groups[0], {
        id: this.form.groups[this.form.groups.length - 1].id + 1
      })
      this.form.groups.push(groupObject)
    },
    addNewObjects() {
      const clonedObjects = Object.assign({}, this.form.recordTypes[0], {
        objectId:
          this.form.recordTypes[this.form.recordTypes.length - 1].objectId + 1
      })
      const newObjects = {
        objectField: [clonedObjects.objectField[0]],
        objectId: clonedObjects.objectId
      }
      this.form.recordTypes.push(newObjects)
    },
    removeFields(fieldId, objectId) {
      this.form.recordTypes[objectId].objectField.splice(fieldId, 1)
    },
    removeGroups(i) {
      this.form.groups.splice(i, 1)
    },
    addSelectedGroups(groups, objects, fields) {
      let getGroups = this.form.groups.find((o) => o.groupId === groups.groupId)
      if (!getGroups) return
      getGroups.selectedText = fields.text
      let selectedObjects = getGroups.objects.find(
        (o) => o.objectId === objects.objectId
      )
      let newFields = {}
      if (selectedObjects && selectedObjects.length > 0) {
        newFields = {
          id: fields.id + 1,
          text: fields.text,
          value: fields.value
        }
      } else {
        newFields = selectedObjects.selectedFields[0]
      }
      selectedObjects.selectedFields.push(newFields)
    },
    removeSelectedGroupFields(i, groupIndex, objectIndex) {
      this.form.groups[groupIndex].objects[objectIndex].selectedFields.splice(
        i,
        1
      )
    }
  }
}
</script>

<style scoped>
.close-btn {
  top: 10px;
  right: 10px;
}
.select-drop {
  color: black;
}
.field-box {
  height: 38px;
  padding: 15px;
  border: 1px solid var(--v-ap-border-gray-base);
  border-radius: 3px;
}
.value {
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
