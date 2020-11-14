<template>
  <v-card class="elevation-0 transparent border-all">
    <v-card-title class="px-4 pt-4 pb-8">
      <BusinessRuleHeader
        title="New Leads"
        status="Live"
        :users="users"
        :displayUser="true"
      ></BusinessRuleHeader>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="px-2 pt-4 pb-1">
      <BusinessRuleCard :cards="cards"></BusinessRuleCard>
    </v-card-text>
  </v-card>
</template>

<script>
import BusinessRuleCard from '../BusinessRuleCard'
import BusinessRuleHeader from '../BusinessRuleHeader'

export default {
  name: 'new-leads',
  components: {
    BusinessRuleCard,
    BusinessRuleHeader
  },
  data() {
    return {
      users: ['Andy', 'Mia', 'John'],
      cards: [
        {
          title: 'Segmentation',
          subTitle: 'Search on form fields',
          description:
            'Some description but not longer than two lines. Otherwise we will add and hover it.',
          users: 5,
          id: 1,
          isAdd: false
        },
        {
          title: 'Matching',
          subTitle: 'Search on form fields',
          description:
            'Some description but not longer than two lines. Otherwise we will add and hover it.',
          users: 5,
          id: 2,
          isAdd: false
        },
        {
          title: 'Assignment',
          subTitle: 'Search on form fields',
          description:
            'Some description but not longer than two lines. Otherwise we will add and hover it.',
          users: 5,
          id: 3,
          isAdd: false
        },
        {
          title: 'Writing',
          subTitle: 'Search on form fields',
          description:
            'Some description but not longer than two lines. Otherwise we will add and hover it.',
          users: 5,
          id: 4,
          isAdd: false
        },
        {
          title: 'Display',
          subTitle: 'Search on form fields',
          description:
            'Some description but not longer than two lines. Otherwise we will add and hover it.',
          users: 5,
          id: 5,
          isAdd: false
        },
        {
          title: 'Launch',
          subTitle: 'Search on form fields',
          description:
            'Some description but not longer than two lines. Otherwise we will add and hover it.',
          users: 5,
          id: 6,
          isAdd: false
        }
      ]
    }
  }
}
</script>
