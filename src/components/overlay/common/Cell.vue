<template>
  <td :class="{ opaque: !canMerge }" class="py-0">
    <div class="d-flex align-center" :class="{ 'justify-center': isPrimary }">
      <v-radio-group
        v-if="selected || hasSelection"
        class="ma-0 pa-0"
        :class="{ hidden: hasSelection && !selected }"
        :value="isPrimary ? selected : finalValue"
        dense
        hide-details
      >
        <v-radio
          :color="radiocolor"
          :value="isPrimary ? true : item[field]"
          dense
          hide-details
        />
      </v-radio-group>
      <span :class="textcolor(selected)">
        {{ isPrimary ? '00Q3X00001D7ZAhUAN' : item[field] }}
      </span>
    </div>
  </td>
</template>

<script>
export default {
  name: 'cell',
  props: {
    item: {
      required: false
    },
    field: {
      required: false
    },
    selected: {
      required: false
    },
    finalValue: {
      required: false
    },
    locked: {
      required: false
    },
    canMerge: {
      required: false
    },
    hasSelection: {
      required: false
    },
    isPrimary: {
      required: false
    },
    dupesgridcolors: {
      type: Boolean,
      default: false
    },
    conflicted: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    radiocolor() {
      if(this.locked) {
        return 'grey'
      }
      if(this.dupesgridcolors) {
        return 'ap-dark-blue'
      }
      return 'ap-dark-gray'
    }
  },
  methods: {
    textcolor(selected) {
      if(this.locked) {
        return 'grey--text'
      }
      if(this.conflicted && !selected) {
        return 'ap-orange--text font-weight-bold'
      }
      if(this.dupesgridcolors && selected) {
        return 'ap-dark-blue--text font-weight-bold'
      }
      return ''
      
    }
  },
  data: () => ({})
}
</script>
