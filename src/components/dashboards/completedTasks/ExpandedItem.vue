<template>
  <span>
    <div class="my-5">
      <v-row
        class="size-13 my-3"
        v-for="(prop, i) of expandedProps"
        :key="i"
        no-gutters
      >
        <span class="width-x">{{ prop.label }}</span>
        <span class="font-weight-black">{{ item[prop.name] }}</span>
      </v-row>
    </div>
    <v-divider class="mb-5"></v-divider>
    <div class="size-13 mb-4">
      <template v-if="userType === admin">
        <div>
          <v-btn
            class="elevation-0 px-3 text-none font-weight-normal size-13"
            dark
            color="ap-dark-blue"
            v-if="item.status !== 'processed'"
          >
            Undo Merging
          </v-btn>
          <v-btn
            class="elevation-0 px-3 text-none font-weight-normal size-13"
            outlined
            color="ap-dark-gray"
            @click="openMergeHistoryOverlay"
            v-else
          >
            Merge History
          </v-btn>
        </div>
      </template>
      <template v-else>
        <div v-if="item.status === processed">
          See a mistake? <span class="ap-link--text pointer">Click here</span>
        </div>
        <div v-else>
          See a mistake? <span class="ap-link--text pointer">Cancel here</span>
        </div>
      </template>
    </div>
  </span>
</template>

<script>
import constants from '@/constants/constants'
import { mapActions } from 'vuex'

export default {
  name: 'expanded-item',
  data() {
    return {
      currentOverlay: '',
      overlays: constants.overlays,
      admin: constants.userType.admin,
      processed: constants.taskStatus.processed,
      queue: constants.taskStatus.queue
    }
  },
  props: ['expandedProps', 'item', 'userType'],
  methods: {
    ...mapActions('dashboard', {
      saveOverlay: 'saveOverlay',
      closeOverlay: 'closeOverlay'
    }),
    openMergeHistoryOverlay() {
      this.currentOverlay = this.overlays.mergehistory
      this.saveOverlay(this.currentOverlay)
    },
    close() {
      this.currentOverlay = ''
      this.closeOverlay()
    }
  }
}
</script>
