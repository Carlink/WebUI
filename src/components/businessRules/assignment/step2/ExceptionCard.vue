<template>
  <div class="rounded mb-2 px-4 py-2 pb-4 size-13 border-style black--text">
    <!-- title -->
    <div class="d-flex align-center justify-space-between">
      <span class="mr-auto cursor-default">
        {{ title }}
      </span>
      <v-icon class="cursor-help" color="black" size="20">mdi-information-outline</v-icon>
    </div>
    <!-- select -->
    <select-drop
          class="mt-5 white"
          placeholder="Assign"
          :items="dropItems"
          :groups="groups"
          :light="true"
        />
  </div>
</template>

<script>
import SelectDrop from '@/components/shared/SelectDrop'
export default {
  name: 'exception-card',
  props: ['title','dropItems','groups'],
  components: {
    SelectDrop
  }
}
</script>
