<template>
  <div>
    <v-card v-if="license" max-width="600">
      <v-card-title>License</v-card-title>
      <v-simple-table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Account ID</td>
            <td>{{ license.account_id }}</td>
          </tr>
          <tr>
            <td>User Limit</td>
            <td>{{ license.user_limit }}</td>
          </tr>
          <tr>
            <td>Apps</td>
            <td>{{ license.apps }}</td>
          </tr>
          <tr>
            <td>Start Date</td>
            <td>{{ formattedStartDate }}</td>
          </tr>
          <tr>
            <td>End Date</td>
            <td>{{ formattedEndDate }}</td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getFirstElementOrDefaultValue } from '../../utils.js'
import moment from 'moment'

export default {
  name: 'License',
  components: {},
  data: function () {
    return {
      license: {}
    }
  },
  watch: {},
  computed: {
    ...mapState({
      axiosJwtConfig: (state) => state.auth.axiosJwtConfig
    }),
    formattedStartDate: function () {
      return this.formattedDate(this.license.start)
    },
    formattedEndDate: function () {
      return this.formattedDate(this.license.start)
    }
  },
  created() {
    let vm = this
    this.axios.get('/admin/licenses', this.axiosJwtConfig).then(
      (response) => {
        let apiResponse = response.data
        vm.license = getFirstElementOrDefaultValue(apiResponse['data'], {})
      },
      (error) => {
        console.log(error)
      }
    )
  },
  methods: {
    formattedDate: function (dateStringFromTheServer) {
      return moment(dateStringFromTheServer).format('MMMM Do YYYY')
    }
  }
}
</script>
