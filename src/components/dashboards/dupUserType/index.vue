<template>
  <div>
    <CardHeader title="Duplicates by CRM Type" class="pa-0" />

    <v-tabs v-model="tab" color="primary" class="dashboard-tab">
      <v-tabs-slider></v-tabs-slider>

      <v-tab class="px-0 border-bottom" v-for="item in tabs" :key="item.tab">
        <div class="width-100p">
          <span class="tab-text text-capitalize">{{ item.name }}</span>
        </div>
      </v-tab>

      <!-- filters -->
      <!-- <v-icon class="ml-auto mr-3">mdi-filter-outline</v-icon> -->
      <div class="d-flex align-center flex-1 filters px-1 ml-auto">
        <date-picker-btn outline v-model="date" />
      </div>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card flat>
          <v-card-text class="px-0">
            <div class="size-12 ap-dark-gray--text mt-3 ml-7">
              By Record Type
            </div>
            <Status />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <!-- HIDDEN FOR FUTURE -->
      <!-- <v-tab-item>
        <v-card flat>
          <v-card-text class="px-0 pb-0">
            <Evolution />
          </v-card-text>
        </v-card>
      </v-tab-item> -->
    </v-tabs-items>
  </div>
</template>

<script>
import CardHeader from '../../shared/CardHeader'
import Status from './Status'
// import Evolution from './Evolution'
import DatePickerBtn from '@/components/dashboards/countTasks/datePickerBtn'

export default {
  name: 'duplicates-user',
  components: {
    DatePickerBtn,
    Status,
    // Evolution,
    CardHeader
  },
  data: () => ({
    tab: 0,
    grow: false,
    date: '',
    tabs: [
      { tab: 1, name: 'Status', alert: '' }
      // HIDDEN FOR FUTURE
      // { tab: 2, name: 'Evolution', alert: '' }
    ]
  })
}
</script>
