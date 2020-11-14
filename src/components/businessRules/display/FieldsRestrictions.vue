<template>
  <div>
    <v-row no-gutters>
      <v-col
        v-for="(header, i) in headers"
        :key="i"
        :cols="getCols(header)"
        :class="getHeaderClass(header)"
        class="my-2 border-radius-4"
      >
        <span class="size-14 font-weight-regular cursor-default">
          {{ header.value }}
        </span>
      </v-col>
    </v-row>
    <draggable
      handle=".handle"
      ghost-class="ghost"
      @start="dragging = true"
      @end="dragging = false"
      v-bind="dragOptions"
    >
      <div
        class="d-flex flex-nowrap align-center"
        v-for="(field, i) in fieldsArray"
        :key="i"
      >
        <v-row no-gutters class="pa-1 my-2 ap-light-bg border-radius-4">
          <v-col cols="4">
            <div class="d-flex">
              <v-btn class="text-left pt-1 handle" icon>
                <v-icon>mdi-drag-vertical</v-icon>
              </v-btn>
              <div class="size-16 pt-2 font-weight-regular cursor-default">
                {{ field.value }}
              </div>
            </div>
          </v-col>
          <v-col
            cols="2"
            class="text-center"
            v-for="(role, index) in field.roles"
            :key="index"
          >
            <v-menu>
              <template #activator="{ on: menu }">
                <v-tooltip color="grey darken-4" top>
                  <template #activator="{ on: tooltip }">
                    <v-btn
                      icon
                      v-on="{ ...tooltip, ...menu }"
                      :max-height="24"
                      class="my-2"
                      :max-width="24"
                    >
                      <v-img
                        :lazy-src="getImages(role)"
                        :src="getImages(role)"
                      />
                    </v-btn>
                  </template>
                  <span>{{ role.tooltipText }}</span>
                </v-tooltip>
              </template>
              <v-list class="explanation-list">
                <v-list-item>
                  <v-radio-group
                    v-model="selectedPermission"
                    v-on:change="permissionChange(field, role)"
                  >
                    <v-radio
                      color="accent"
                      :key="item"
                      v-for="item in explanationItems"
                      :label="`${item}`"
                      :value="item"
                    >
                    </v-radio>
                  </v-radio-group>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
      </div>
    </draggable>
    <div class="d-flex my-1">
      <v-btn class="pt-1 cursor-help" icon>
        <v-icon>mdi-information-outline</v-icon>
      </v-btn>
      <v-btn
        class="text-none transparent-bg"
        height="40"
        width="168"
        :ripple="false"
        @click="isShowExplanation = !isShowExplanation"
        text
      >
        <span class="px-4">
          Show explanation
          <v-icon class="size-15" align="right" v-if="isShowExplanation"
            >mdi-chevron-down</v-icon
          >
          <v-icon class="size-15" align="right" v-if="!isShowExplanation"
            >mdi-chevron-up</v-icon
          >
        </span>
      </v-btn>
    </div>
    <v-divider v-if="isShowExplanation"></v-divider>
    <div v-if="isShowExplanation" class="d-flex my-2">
      <div class="d-flex px-1" v-for="(o, i) in rolesIconDetails" :key="i">
        <v-img
          :max-height="24"
          :max-width="34"
          :lazy-src="o.iconUrl"
          color="ap-gray"
          :src="o.iconUrl"
          class="opacity-0-5"
        />
        <span class="px-1 size-13 pad-t-2">{{ '= ' + o.value }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'fields-restrictions',
  props: ['headers', 'rolesIconDetails', 'explanationItems', 'statuses'],
  components: {
    draggable
  },
  data: () => ({
    dragOptions: {
      animation: 200
    },
    isShowExplanation: true,
    selectedPermission: '',
    dragging: false
  }),
  computed: {
    ...mapState({
      fieldsArray: (state) => state.businessRules.displayFieldsPermission
    })
  },
  methods: {
    ...mapActions('businessRules', ['updateFieldsPermission']),
    getCols(fieldName) {
      if (fieldName.name === 'field_name') {
        return '4'
      }
      return '2'
    },
    getHeaderClass(fieldName) {
      if (fieldName.name === 'field_name') {
        return 'text-left pl-10'
      }
      return 'text-center'
    },
    getImages(role) {
      if (!role.isVisible && !role.isEditable && !role.isConflict) {
        return require('@/assets/rules/hide.svg')
      } else if (role.isVisible && role.isEditable && !role.isConflict) {
        return require('@/assets/rules/view-unlock.svg')
      } else if (role.isVisible && !role.isEditable && role.isConflict) {
        return require('@/assets/rules/view-lock-warning.svg')
      }
      return require('@/assets/rules/view.svg')
    },
    permissionChange(field, role) {
      const updateFields = field.roles.map((x) => {
        if (x.name === role.name) {
          return Object.assign({}, x, {
            tooltipText: this.selectedPermission,
            isVisible: this.selectedPermission !== this.statuses.hide,
            isEditable:
              this.selectedPermission === this.statuses.showEditAllowed,
            isConflict:
              this.selectedPermission === this.statuses.showNoEditConflict
          })
        }
        return { ...x }
      })
      const fieldsArray = this.fieldsArray.map((item) => {
        if (item.value === field.value) {
          return Object.assign({}, item, {
            roles: updateFields
          })
        } else {
          return Object.assign({}, item)
        }
      })
      this.updateFieldsPermission(fieldsArray)
    }
  }
}
</script>

<style scoped>
.handle {
  cursor: grab;
}
</style>
