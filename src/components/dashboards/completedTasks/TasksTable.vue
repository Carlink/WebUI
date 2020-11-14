<template>
  <v-data-table
    class="my-table border-none"
    :headers="headers"
    :items="data"
    item-key="accountId"
    show-expand
    :mobile-breakpoint="321"
    hide-default-footer
    disable-sort
    dense
  >
    <template v-slot:header="{ item }">
      <span class="red--text">{{ item }}</span>
    </template>
    <template #[`item.source`]="{ item }">
      <span class="font-weight-medium size-13">{{ item.source }}</span>
    </template>
    <template #[`item.name`]="{ item }">
      <span class="ap-dark-blue--text size-13">{{ item.name }}</span>
    </template>
    <template #[`item.date`]="{ item }">
      <span class="ap-dark-gray--text size-13">{{ item.mergeDate }}</span>
    </template>
    <template #[`item.id`]>
      <div>
        <v-icon size="20" color="success">
          mdi-clipboard-check-outline
        </v-icon>
      </div>
    </template>
    <template #expanded-item="{ headers, item }">
      <td></td>
      <td :colspan="headers.length - 1">
        <ExpandedItem
          :item="item"
          :expandedProps="fields"
          :userType="userType"
        />
      </td>
    </template>
  </v-data-table>
</template>

<script>
import ExpandedItem from './ExpandedItem'

export default {
  name: 'tasks-table',
  props: ['data', 'userType', 'fields'],
  components: {
    ExpandedItem
  },
  data: () => ({
    headers: [
      { text: '', value: 'data-table-expand' },
      {
        text: 'Source',
        align: 'start',
        value: 'source',
        class: 'font-weight-regular'
      },
      {
        text: 'Name',
        value: 'name',
        class: 'font-weight-regular'
      },
      {
        text: 'Date',
        value: 'date',
        class: 'font-weight-regular'
      },
      {
        text: '',
        value: 'id',
        class: 'font-weight-regular'
      }
    ]
  })
}
</script>

<style></style>
