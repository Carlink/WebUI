<template>
  <div>
    <!-- new button -->
    <div class="mb-3" align="right">
      <v-btn
        text
        color="ap-link"
        @click="addNew"
        :disabled="tieBreakers.length === 4"
        class="text-capitalize"
      >
        <v-icon size="16">mdi-plus</v-icon> New Tie Breaker
      </v-btn>
    </div>
    <!-- tie breaker wraper -->
    <div class="border-style py-4" v-if="tieBreakers.length > 0">
      <div
        v-for="(item, i) of tieBreakers"
        :key="i"
        :class="{ 'mb-5': i != tieBreakers.length - 1 }"
      >
        <div class="mx-4 mb-0 pa-4 ap-light-bg rounded relative">
          <!-- title -->
          <div class="black-text mb-5 cursor-default">
            Tie Breaker # {{ i + 1 }}
            <v-tooltip top>
              <template #activator="{ on: tooltip }">
                <v-icon class="cursor-help" v-on="tooltip" size="22" color="black">
                  mdi-information-outline
                </v-icon>
              </template>
              <span>tooltip</span>
            </v-tooltip>
          </div>
          <!-- field and operator -->
          <div class="mb-8">
            <span class="ap-dark-gray--text cursor-default">
              If the system was not able to set a Primary, look at
            </span>
            <v-select
              class="mb-5 white"
              :items="fields"
              outlined
              dense
              hide-details
            />
            <v-select
              class="white"
              :items="operators"
              outlined
              dense
              hide-details
              white
            />
          </div>
          <!-- prioritize -->
          <span class="ap-dark-gray--text mb-2 cursor-default">
            as follows
          </span>
          <Draggable
            v-model="prioritizeItems"
            v-bind="dragOptions"
            handle=".handle"
          >
            <div
              class="d-flex align-center pa-2 white rounded my-2 relative"
              v-for="item of prioritizeItems"
              :key="item"
            >
              <v-icon class="handle">mdi-drag-vertical</v-icon>
              <span>{{ item }}</span>
            </div>
          </Draggable>
          <v-btn
            icon
            text
            x-small
            class="delete-btn"
            @click="tieBreakers.splice(i, 1)"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'

export default {
  name: 'tie-breaker',
  components: {
    Draggable
  },
  data: () => ({
    tieBreakers: [1],
    fields: ['Status', 'Email', 'Phone', 'Street'],
    operators: ['Prioritized by values'],
    prioritizeItems: ['Reopened', 'Opened', 'Prospecting', 'Contacted'],
    dragOptions: {
      animation: 200
    }
  }),
  methods: {
    addNew() {
      this.tieBreakers.push(1)
    }
  }
}
</script>

<style scoped>
.border-style {
  border: 1px solid var(--v-ap-border-gray-base);
}
.delete-btn {
  position: absolute;
  top: 10px;
  right: 10px;
}
.handle {
  cursor: grab;
}
</style>
