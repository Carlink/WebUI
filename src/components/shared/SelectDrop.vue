<template>
  <div class="select-drop" :style="{ width: width + 'px' }">
    <v-menu v-model="menu1" offset-y>
      <template #activator="{ on }">
        <div
          class="d-flex align-center justify-space-between pointer field-box"
          :class="{ active: menu1 }"
          v-on="on"
          v-if="light"
        >
          <span class="value">{{ computedValue }}</span>
          <v-icon color="black">mdi-chevron-down</v-icon>
        </div>
        <v-text-field
          v-if="!light"
          :value="computedValue"
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
          placeholder="Search"
          append-icon="mdi-magnify"
          flat
          dense
          solo
          hide-details
          autofocus
        />
        <v-divider />
        <!-- group items -->
        <v-list v-if="groups">
          <div>
            <template v-for="(group, g) of groups">
              <div class="group-list" :key="g" v-if="hasItems(group)">
                <div class="px-5 py-1 d-flex align-center">
                  <span class="ap-gray--text pr-2">{{ group }}</span>
                  <div class="group-rule"></div>
                </div>
                <v-list-item
                  class="px-5 py-1 group-item"
                  v-for="(item, n) in filteredItems.filter(
                    (item) => item.group === group
                  )"
                  :key="n"
                  @click="selection = getValue(item)"
                >
                  {{ getLabel(item) }}
                </v-list-item>
              </div>
            </template>
          </div>
          <v-list-item
            class="px-5 py-1"
            v-for="(item, n) in filteredItems.filter((item) => !item.group)"
            :key="n + 'nogroup'"
            @click="selection = getValue(item)"
          >
            {{ getLabel(item) }}
          </v-list-item>
        </v-list>
        <!-- normal items -->
        <v-list v-else>
          <v-list-item
            class="px-5 py-1"
            v-for="(item, n) in filteredItems"
            :key="n"
            @click="selection = getValue(item)"
          >
            {{ getLabel(item) }}
          </v-list-item>
        </v-list>
        <!-- append slot -->
        <div class="append-slot">
          <slot name="append"></slot>
        </div>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'select-drop',
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    groups: {
      type: Array,
      default: null
    },
    items: {
      type: Array,
      default: () => []
    },
    width: String,
    light: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    selection: null,
    search: '',
    menu1: false
  }),
  computed: {
    computedValue: function () {
      return this.selection || this.placeholder
    },
    filteredItems: function () {
      return this.items.filter(
        (item) =>
          this.getLabel(item)
            .toLowerCase()
            .indexOf(this.search.toLowerCase()) !== -1
      )
    }
  },
  methods: {
    getValue(item) {
      if (typeof item === 'object') return item.value
      return item
    },
    getLabel(item) {
      if (typeof item === 'object') return item.text
      return item
    },
    hasItems(group) {
      return (
        this.filteredItems.filter((item) => item.group === group).length > 0
      )
    }
  },
  mounted() {
    this.selection = this.value
  },
  watch: {
    value: function (val) {
      this.selection = val
    },
    selection: function (val) {
      if (val !== this.value) this.$emit('input', val)
    }
  }
}
</script>

<style scoped lang="scss">
.select-drop {
  color: black;

  .field-box {
    height: 38px;
    padding: 15px;
    border: 1px solid var(--v-ap-border-gray-base);
    border-radius: 3px;
    transition: all 0.25s;

    &:hover {
      border-color: black;
    }
    &.active {
      border: 2px solid var(--v-primary-base);
    }
  }
}
.group-rule {
  background-color: var(--v-ap-light-gray-base);
  height: 1px;
  flex: 1;
}
.group-list:last-child .group-item:last-child {
  border-bottom: 1px solid var(--v-ap-border-gray-base);
}
.value {
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
