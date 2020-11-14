<template>
  <div class="d-flex flex-nowrap align-center mx-6 pa-4 ap-light-bg">
    <!-- field selector -->
    <v-select
      v-model="form.field"
      @change="form.match_field = $event"
      class="white flex-grow-0"
      :items="filteredFields"
      placeholder="-- Choose a field --"
      height="40"
      style="width: 288px;"
      outlined
      dense
      hide-details
    />
    <!-- algoritm selection -->
    <div class="d-flex align-center">
      <span class="mx-4 cursor-default">is</span>
      <div>
        <v-tooltip
          color="grey darken-4"
          top
          v-for="(item, i) of algorithmItems"
          :key="i"
        >
          <template #activator="{ on }">
            <v-btn
              class="mr-3 rounded"
              :class="item.value === form.algo && 'ap-link'"
              active-class="ap-link"
              :value="item.value"
              icon
              v-on="on"
              outlined
              @click="form.algo = item.value"
            >
              <v-icon
                :color="form.algo === item.value ? 'white' : 'ap-dark-gray'"
              >
                {{ item.icon }}
              </v-icon>
            </v-btn>
          </template>
          <span>{{ item.tooltipText }}</span>
        </v-tooltip>
      </div>
    </div>
    <!-- ignore items -->
    <div class="d-flex align-center mx-auto">
      <span class="mx-4 ap-dark-gray--text cursor-default">Ignore:</span>
      <v-checkbox
        v-model="form[item.value]"
        class="mr-4 mt-0"
        v-for="(item, i) of ignoreItems"
        :key="i"
        :label="item.text"
        hide-details
      />
    </div>
    <!-- delete btn -->
    <v-btn v-if="onDelete" @click="onDelete" icon class="ml-auto">
      <v-icon color="ap-gray">
        mdi-delete
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'configurations',
  props: {
    value: Object,
    selectedFields: {
      type: Array,
      default: () => []
    },
    onDelete: Function
  },
  computed: {
    ...mapState({
      fields: (state) => state.businessRules.labels
    }),
    filteredFields: function () {
      // removing fields selected on other configurations
      let newFields = this.fields.filter(
        (field) => this.selectedFields.indexOf(field) === -1
      )

      // adding current selected field
      if (this.form.field) newFields.unshift(this.form.field)

      return newFields
    }
  },
  data: () => ({
    algorithmItems: [
      { icon: 'mdi-equal', value: 'exact', tooltipText: 'Equal' },
      { icon: 'mdi-code-tags', value: 'startswith', tooltipText: 'Start with' },
      {
        icon: 'mdi-lightbulb-on-outline',
        value: 'fuzzy',
        tooltipText: 'Fuzzy Match'
      }
    ],
    ignoreItems: [
      { text: 'Blanks', value: 'ignore_blanks' },
      { text: 'Lower & Upper casing', value: 'case_sensitive' },
      { text: 'Special Characters', value: 'punctuation' }
    ],
    form: {
      field: null,
      match_field: null,
      algo: null,
      negate: true
    },
    isValid: false
  }),
  mounted() {
    if (this.value) this.form = this.value
  },
  watch: {
    value: function (val) {
      if (val) this.form = val
    },
    form: {
      deep: true,
      handler: function (val) {
        this.$emit('validityChange', val.field !== null && val.algo !== null)
      }
    }
  }
}
</script>
