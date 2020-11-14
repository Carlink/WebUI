<template>
  <v-card class="py-3">
    <!-- header -->
    <v-card-title class="pa-6 mb-2">
      <div class="font-weight-black size-20 mx-auto cursor-default">
        <v-icon color="ap-link" class="pointer" size="28">
          mdi-download-outline
        </v-icon>
        Save Score on Your CRM
      </div>
      <v-btn
        @click="$emit('close')"
        icon
        class="ap-light-bg rounded-sm pointer absolute close-btn"
        small
      >
        <v-icon size="16">
          mdi-close
        </v-icon>
      </v-btn>
    </v-card-title>
    <!-- body -->
    <div class="d-flex flex-column pa-6 pb-5 pt-0">
      <p class="ap-dark-gray--text px-1 mx-12 size-13 text-center mb-6 cursor-default">
        The Match Confidence Score can be stored on a field on the Primary
        Record.
      </p>
      <SelectDrop
        placeholder="Choose a Field"
        :items="items"
        class="mx-auto mb-5"
        :light="true"
      >
        <template #append>
          <div class="px-5 pb-4">
            <v-btn
              color="ap-link"
              text
              depressed
              class="text-capitalize px-0 width-100p text-left"
            >
              <div class="width-100p text-left">
                <v-icon size="16">mdi-plus</v-icon> Create New Field on CRM
              </div>
            </v-btn>
          </div>
        </template>
      </SelectDrop>
      <v-btn class="mx-auto" color="primary" @click="$emit('close')">
        save
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import SelectDrop from '@/components/shared/SelectDrop'

export default {
  name: 'save-score',
  components: {
    SelectDrop
  },
  data: () => ({
    items: ['Sales YTD', 'Turnover', 'Name', 'Lead Source']
  })
}
</script>

<style scoped>
.close-btn {
  top: 10px;
  right: 10px;
}
</style>
