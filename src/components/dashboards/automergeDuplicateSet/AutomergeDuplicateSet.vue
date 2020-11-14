<template>
  <div class="autoMergeWidget">
    <v-row class="dupe_grid_bg mb-4" align="justify-end">
      <v-col cols="4">
        <!-- Filter -->
      </v-col>
      <v-col cols="8">
        <div class="d-flex justify-end">
          <div>
            <v-btn class="full-height mr-4" color="primary" outlined>
              Exclude from auto-merge
            </v-btn>
          </div>
          <div>
            <v-btn class="full-height" color="primary">
              <v-icon>mdi-check</v-icon> Approve auto-merge
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-data-table
      v-model="selected"
      :headers="headers"
      show-select
      :items="records"
      :single-select="false"
      item-key="name"
    >
      <template v-slot:header.data-table-select="{ props, on }">
        <v-simple-checkbox
          color="primary"
          v-if="props.indeterminate"
          v-ripple
          v-bind="props"
          :value="props.indeterminate"
          v-on="on"
        ></v-simple-checkbox>
        <v-simple-checkbox
          color="primary"
          v-if="!props.indeterminate"
          v-ripple
          v-bind="props"
          v-on="on"
        ></v-simple-checkbox>
      </template>
      <template v-slot:item.data-table-select="{ isSelected, select }">
        <v-simple-checkbox
          color="primary"
          v-ripple
          :value="isSelected"
          @input="select($event)"
        ></v-simple-checkbox>
      </template>
      <template v-slot:item.name="{ item }">
        <span class="size-13 ap-dark-blue--text">
          {{ item.name }}
        </span>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  name: 'automerge-duplicate-set',
  data: () => ({
    selected: [],
    headers: [
      { text: 'Source', value: 'source' },
      { text: 'Name', value: 'name' },
      {
        text: 'Billing Street',
        value: 'billingStreet',
        sortable: false
      },
      {
        text: 'Billing City',
        value: 'billingCity'
      },
      {
        text: 'Billing State',
        value: 'billingState'
      }
    ],
    records: [
      {
        source: 'Lead',
        name: 'Dream Folks',
        billingStreet: '2335 N.',
        billingCity: 'New York',
        billingState: 'New York'
      },
      {
        source: 'Account',
        name: 'Johnson & Co',
        billingStreet: '2335 N.',
        billingCity: 'Shiloh',
        billingState: 'New York'
      },
      {
        source: 'Account',
        name: 'Microsoft',
        billingStreet: '2335 N.',
        billingCity: 'New York',
        billingState: 'New York'
      },
      {
        source: 'Lead',
        name: 'First Alarm',
        billingStreet: '2335 N.',
        billingCity: 'Richardson',
        billingState: 'New York'
      },
      {
        source: 'Lead',
        name: 'Dream Folk',
        billingStreet: '2335 N.',
        billingCity: 'New York',
        billingState: 'New York'
      },
      {
        source: 'Account',
        name: 'Johnson & Com',
        billingStreet: '2335 N.',
        billingCity: 'Richardson',
        billingState: 'New York'
      }
    ]
  })
}
</script>
<style lang="scss">
.autoMergeWidget {
  th.text-start {
    background: #f5f5f5 !important;
    border-color: #ddd !important;
  }
}
</style>
