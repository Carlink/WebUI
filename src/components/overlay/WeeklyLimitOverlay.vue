<template>
  <v-card align="center" class="pa-5 pt-4 mx-auto">
    <div class="size-13 ap-dark-gray--text px-10 mb-5">
      Your admin has set 30 minutes weekly time limit for cleaning data.
    </div>
    <v-icon class="mb-3" size="75" color="success">
      mdi-check-circle-outline
    </v-icon>
    <div class="size-22 success--text font-weight-bold mx-12 mb-6">
      You've met weekly limit, great work!
    </div>
    <div class="size-16 mx-6 black--text mb-5">
      You have 15 more duplicates sets, please confirm you want to work on
      those now
    </div>
    <div class="d-flex justify-space-between">
      <v-btn class="size-12 font-weight-black" color="primary">
        yes, load more
      </v-btn>
      <v-btn
        class="size-12 font-weight-black"
        color="primary"
        outlined
        @click="onHide"
      >
        no, show me next week
      </v-btn>
    </div>
  </v-card>  
</template>

<script>
export default {
  name: 'weekly-limit',
  methods: {
    onHide() {
      this.$emit('close')
    }
  }
}
</script>
