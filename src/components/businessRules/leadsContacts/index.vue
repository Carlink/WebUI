<template>
  <v-card class="elevation-0 transparent border-all">
    <v-card-title class="px-4 pt-4 pb-8">
      <BusinessRuleHeader
        title="Leads to Contacts"
        status="Draft"
        :displayUser="false"
      ></BusinessRuleHeader>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="px-2 pt-4 pb-1">
      <BusinessRuleCard
        :cards="cards"
        @addRules="addNewRules"
      ></BusinessRuleCard>
    </v-card-text>
  </v-card>
</template>

<script>
import BusinessRuleHeader from '../BusinessRuleHeader'
import BusinessRuleCard from '../BusinessRuleCard'

export default {
  name: 'leads-to-contacts',
  components: {
    BusinessRuleHeader,
    BusinessRuleCard
  },
  data() {
    return {
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
          title: 'Writing',
          users: 0,
          id: 3,
          isAdd: true
        }
      ]
    }
  },
  methods: {
    addNewRules(leads) {
      let params = {
        title: leads.title,
        subTitle: 'Search on form fields',
        description:
          'Some description but not longer than two lines. Otherwise we will add and hover it.',
        users: 5,
        isAdd: false,
        id: leads.id
      }
      this.cards = this.cards.map((obj) =>
        leads.id === obj.id ? params : null || obj
      )
      let emptyObject = {
        title: leads.title,
        users: leads.users,
        id: leads.id + 1,
        isAdd: true
      }
      this.cards.push(emptyObject)
    }
  }
}
</script>
