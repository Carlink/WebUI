<template>
  <div class="excluded-records">
    <!-- name -->
    <div class="font-weight-bold ap-dark-gray--text size-13 mb-3 px-5">
      Excluded Records
    </div>
    <!-- data -->
    <v-data-table
      :headers="headers"
      :items="items"
      hide-default-footer
      hide-default-header
      row
      class="no-rounded-table"
    >
      <!-- header -->
      <template #header="{props}">
        <thead class="ap-light-bg">
          <th
            v-for="header in props.headers"
            :key="header.id"
            class="border-right border-bottom ap-dark-gray--text text-no-wrap text-left"
          >
            {{ header.text }}
          </th>
        </thead>
      </template>
      <!-- rows -->
      <template #item="{item}">
        <tr class="relative">
          <td class="checkbox-wrapper">
            <v-checkbox hide-details />
          </td>
          <td v-for="(val, text) of item" :key="text">{{ val }}</td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: 'excluded-records-table',
  data: () => ({
    headers: [
      { text: '', value: 'action' },
      { text: 'Source', value: 'source' },
      { text: 'Master ID', value: 'master' },
      { text: 'Name', value: 'name' },
      { text: 'Billing Street', value: 'billing_street' },
      { text: 'Lead Source', value: 'lead_source' },
      { text: 'Billing State', value: 'billing_state' },
      { text: 'Phone Number', value: 'phone_number' },
      { text: 'Email', value: 'email' }
    ],
    items: [
      {
        source: 'Lead',
        master: '00Q3X00001D7ZAhUAN',
        name: 'First Alarm',
        billing_street: '2335 N. Michigan Avenue',
        lead_source: 'Exposition',
        billing_state: 'New York',
        phone_number: '+123123123',
        email: 'janett@firstalarm.com'
      },
      {
        source: 'Lead',
        master: '00Q3X00001D7ZAhUAN',
        name: 'First Alarm',
        billing_street: '2335 N. Michigan Avenue',
        lead_source: 'Exposition',
        billing_state: 'New York',
        phone_number: '+123123123',
        email: 'janett@firstalarm.com'
      }
    ]
  })
}
</script>

<style scoped>
.no-rounded-table >>> .v-data-table__wrapper {
  border-radius: 0px !important;
}
</style>