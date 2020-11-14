<template>
  <v-row no-gutters>
    <v-col cols="12" class="pa-0">
      <div class="d-flex align-start">
        <div class="d-flex flex-column">
          <div class="d-flex align-center">
            <div class="size-20 font-weight-black cursor-default">
              {{ title }}
            </div>
            <v-icon color="black" class="cursor-help ml-1 mr-1"
              >mdi-information-outline</v-icon
            >
            <div
              class="size-14 ap-yellow-light ap-white--text py-1 px-3 border-radius-20 cursor-default"
            >
              {{ status }}
            </div>
          </div>
          <div class="d-flex flex-column mt-2">
            <div
              class="size-14 font-weight-regular cursor-default d-flex align-center"
            >
              <v-icon class="mr-1" color="ap-dark-gray"
                >mdi-file-document-outline</v-icon
              >
              <span>
                This is a line of description if you want to find out more,
                hover on it
                <a href="#" class="ap-link--text no-text-decoration"
                  >Read more</a
                >
              </span>
            </div>
            <!--Hiding for now due to this is for future release -->
            <div class="size-14 px-3 py-1" v-if="displayUser && !outOfScope">
              <v-icon>mdi-account-multiple</v-icon>
              <span class="cursor-default">
                <template v-for="user in users">
                  {{ user + ',' }}
                </template>
                {{ '+' + users.length }}
              </span>
            </div>
          </div>
        </div>

        <v-spacer />
        <v-btn
          color="ap-dark-gray"
          class="mr-2 pa-0 option-btn"
          outlined
          to="/cleandata/manage-business-rule"
        >
          <v-icon size="20">mdi-pencil</v-icon>
        </v-btn>
        <!--Hiding for now due to this is for future release -->
        <v-btn
          color="ap-dark-gray"
          class="option-btn"
          v-if="!outOfScope"
          outlined
        >
          <v-icon>mdi-share-variant</v-icon>
        </v-btn>
        <ContextMenu />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import ContextMenu from './ContextMenu'
export default {
  name: 'business-rule-header',
  components: {
    ContextMenu
  },
  props: {
    title: {
      type: String,
      default: () => ''
    },
    status: {
      type: String,
      default: () => ''
    },
    users: {
      type: Array,
      default: () => []
    },
    displayUser: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      outOfScope: true
    }
  }
}
</script>
