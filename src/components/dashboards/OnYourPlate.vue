<template>
  <v-card tile class="d-flex flex-column align-start">
    <card-header title="On Your Plate" />
    <div class="margin-admin-dashboard-cards d-flex justify-center width-100p pt-6">
      <div class="pr-5">
        <div class="primary--text" :class="big_title_class">{{ duplicates }}</div>
        <div class="d-flex align-start justify-center">
          <v-icon class="mr-2" color="primary">mdi-content-copy</v-icon>
          <span class="description-text">Duplicate sets to be reviewed</span>
        </div>
      </div>
      <v-divider vertical></v-divider>
      <div class="pl-5">
        <div class="ap-light-blue--text" :class="big_title_class">{{ excluded }}</div>
        <div class="d-flex align-start justify-center">
          <v-icon class="mr-2" color="ap-light-blue">mdi-minus-circle-off-outline</v-icon>
          <span class="description-text">Excluded records to review</span>
        </div>
      </div>
    </div>

    <v-btn
      color="primary"
      class="mt-auto mx-auto mb-5 font-weight-black"
      large
      outlined
      to="/admin-dashboard/on-plate-dashboard"
    >
      <span>My Tasks</span>
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
  </v-card>
</template>

<script>
import CardHeader from '../shared/CardHeader'

export default {
  name: 'on-your-plate',
  components: {
    CardHeader
  },
  data: () => ({
    duplicates: 132,
    excluded: 56,
    big_title_class: 'size-80 text-center big-title pb-6 pt-2'
  })
}
</script>

<style>
.description-text {
  width: 110px;
  color: #706e6b;
  font-size: 13px;
  line-height: 16px;
  font-weight: normal;
}

.big-title {
  line-height: 1;
}
</style>
