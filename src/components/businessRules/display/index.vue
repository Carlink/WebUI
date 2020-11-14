<template>
  <v-row no-gutters class="d-flex justify-center">
    <v-col cols="8" class="white pa-4">
      <div class="size-20 font-weight-black cursor-default mb-4">
        Displayed fields on the grid and restrictions
      </div>
      <div class="size-14 cursor-default">
        Set which fields you want each user type to see on their duplicate grid. You can also determine which fields are locked and which may be edited.
      </div>
      <v-row no-gutters class="my-3">
        <v-col cols="12" class="border-all border-radius-4">
          <div class="text-right pa-4">
            <v-btn
              text
              small
              class="ap-link--text text-none font-weight-regular size-14 pointer"
            >
              <v-icon class="size-13">mdi-plus</v-icon>
              New Field
            </v-btn>
          </div>
          <div class="mx-4 mb-3">
            <FieldsRestrictions
              :headers="headers"
              :rolesIconDetails="rolesIconDetails"
              :explanationItems="explanationItems"
              :statuses="statuses"
            />
          </div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import FieldsRestrictions from './FieldsRestrictions'
import { mapMutations } from 'vuex'
export default {
  name: 'display',
  components: {
    FieldsRestrictions
  },
  computed: {},
  data: () => ({
    headers: [
      { name: 'field_name', value: 'Field Name' },
      { name: 'admin', value: 'Admin' },
      { name: 'sub_admin', value: 'Sub Admin' },
      { name: 'manager', value: 'Manager' },
      { name: 'end_user', value: 'End User' }
    ],
    fieldsArray: [
      {
        id: 1,
        name: 'field_name',
        value: 'Company',
        roles: [
          {
            name: 'Admin',
            tooltipText: 'Show',
            isVisible: true,
            isEditable: false,
            isConflict: false
          },
          {
            name: 'Sub Admin',
            tooltipText: 'Show & lock',
            isVisible: true,
            isEditable: true,
            isConflict: false
          },
          {
            name: 'Manager',
            tooltipText: 'Show & lock',
            isVisible: true,
            isEditable: true,
            isConflict: false
          },
          {
            name: 'End User',
            tooltipText: 'Hide',
            isVisible: false,
            isEditable: false,
            isConflict: false
          }
        ]
      },
      {
        id: 2,
        name: 'field_name',
        value: 'First Name',
        roles: [
          {
            name: 'Admin',
            tooltipText: 'Show',
            isVisible: true,
            isEditable: false,
            isConflict: false
          },
          {
            name: 'Sub Admin',
            tooltipText: 'Show & lock',
            isVisible: true,
            isEditable: true,
            isConflict: false
          },
          {
            name: 'Manager',
            tooltipText: 'Show & lock',
            isVisible: true,
            isEditable: false,
            isConflict: false
          },
          {
            name: 'End User',
            tooltipText: 'Show & lock',
            isVisible: true,
            isEditable: true,
            isConflict: false
          }
        ]
      },
      {
        id: 3,
        name: 'field_name',
        value: 'Last Name',
        roles: [
          {
            name: 'Admin',
            tooltipText: 'Show',
            isVisible: true,
            isEditable: false,
            isConflict: false
          },
          {
            name: 'Sub Admin',
            tooltipText: 'Show & lock',
            isVisible: true,
            isEditable: true,
            isConflict: false
          },
          {
            name: 'Manager',
            tooltipText: 'Show & lock',
            isVisible: true,
            isEditable: true,
            isConflict: false
          },
          {
            name: 'End User',
            tooltipText: 'Hide',
            isVisible: false,
            isEditable: false,
            isConflict: false
          }
        ]
      },
      {
        id: 4,
        name: 'field_name',
        value: 'Phone Number',
        roles: [
          {
            name: 'Admin',
            tooltipText: 'Show',
            isVisible: true,
            isEditable: false,
            isConflict: false
          },
          {
            name: 'Sub Admin',
            tooltipText: 'Show & lock',
            isVisible: true,
            isEditable: true,
            isConflict: false
          },
          {
            name: 'Manager',
            tooltipText: 'Show & lock',
            isVisible: true,
            isEditable: true,
            isConflict: false
          },
          {
            name: 'End User',
            tooltipText: 'Hide',
            isVisible: false,
            isEditable: false,
            isConflict: false
          }
        ]
      },
      {
        id: 5,
        name: 'field_name',
        value: 'Email Address',
        roles: [
          {
            name: 'Admin',
            tooltipText: 'Show',
            isVisible: true,
            isEditable: false,
            isConflict: false
          },
          {
            name: 'Sub Admin',
            tooltipText: 'Hide',
            isVisible: false,
            isEditable: false,
            isConflict: false
          },
          {
            name: 'Manager',
            tooltipText: 'Show & lock',
            isVisible: true,
            isEditable: true,
            isConflict: false
          },
          {
            name: 'End User',
            tooltipText: 'Show & lock',
            isVisible: true,
            isEditable: true,
            isConflict: false
          }
        ]
      }
    ],
    rolesIconDetails: [
      {
        name: 'show',
        value: 'Show',
        iconUrl: require('@/assets/rules/view.svg')
      },
      {
        name: 'show_edit_allowed',
        value: 'Show & lock',
        iconUrl: require('@/assets/rules/view-unlock.svg')
      },
      {
        name: 'hide',
        value: 'Hide',
        iconUrl: require('@/assets/rules/hide.svg')
      }
    ],
    explanationItems: ['Show', 'Show & lock', 'Hide'],
    statuses: {
      show: 'Show',
      showEditAllowed: 'Show & lock',
      hide: 'Hide'
    }
  }),
  methods: {
    ...mapMutations('businessRules', ['setDisplayFieldsPermission'])
  },
  mounted() {
    this.setDisplayFieldsPermission(this.fieldsArray)
  }
}
</script>
