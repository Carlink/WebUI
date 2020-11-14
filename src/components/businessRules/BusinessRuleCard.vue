<template>
  <v-data-iterator
    :items="cards"
    :items-per-page.sync="itemsPerPage"
    :page.sync="page"
    hide-default-footer
  >
    <template v-slot:default="props">
      <v-row no-gutters>
        <v-col
          v-for="card in props.items"
          :key="card.id"
          :cols="(12/itemsPerRow)"
          class="px-2"
        >
          <div
            :class="{ 'add-rule-card': card.isAdd }"
            class="business-card elevation-3"
          >
            <v-card-title class="py-0 px-4">
              <v-row no-gutters>
                <v-col cols="12" class="pt-2 pb-0">
                  <div class="d-flex align-center">
                    <div
                      :class="[
                        { 'ap-light-blue': !card.isAdd },
                        { 'ap-gray': card.isAdd }
                      ]"
                      class="ap-white--text size-14 px-3 py-1 border-radius-20 cursor-default"
                    >
                      {{ card.title }}
                    </div>
                    <v-spacer />
                    <div class="d-flex align-center" v-if="!card.isAdd">
                      <v-icon size="18" color="black" class="cursor-help"
                        >mdi-information-outline</v-icon
                      >

                      <!--Hiding for now due to this is for future release -->
                      <div v-if="!outOfScope">
                        <v-btn icon>
                          <v-icon>mdi-account-multiple</v-icon>
                        </v-btn>
                        <span class="size-20 font-weight-black cursor-default">
                          {{ card.users }}
                        </span>
                      </div>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text class="mt-3 pb-2">
              <div v-if="!card.isAdd">
                <h2
                  class="size-20 py-2 font-weight-bold ap-black--text text--primary"
                >
                  {{ card.subTitle }}
                </h2>
                <p class="size-15 word-break cursor-default" v-line-clamp="2">
                  {{ card.description }}
                </p>
              </div>
              <div v-else class="d-flex align-center mx-auto add-rules">
                <v-btn icon @click="addRules(card)">
                  <v-img
                    :max-height="64"
                    :max-width="64"
                    :lazy-src="require('@/assets/plus.svg')"
                    :src="require('@/assets/plus.svg')"
                  />
                </v-btn>
              </div>
            </v-card-text>
            <v-divider v-if="!card.isAdd"></v-divider>
            <v-card-actions v-if="!card.isAdd" class="px-4 py-3">
              <v-spacer></v-spacer>
              <v-btn
                small
                icon
                :to="'/cleandata/edit-business-rule/' + card.id"
              >
                <v-icon size="20">mdi-pencil</v-icon>
              </v-btn>
              <!--Hiding for now due to this is for future release -->
              <div v-if="!outOfScope">
                <v-btn icon>
                  <v-icon>mdi-share-variant</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </div>
            </v-card-actions>
          </div>
        </v-col>
      </v-row>
    </template>
    <template v-slot:footer>
      <v-row
        class="no-gutters mt-auto py-2 shrink"
        align="center"
        justify="center"
      >
        <v-pagination
          color="ap-link"
          v-model="page"
          :length="pages"
          @next="nextPage"
          @previous="previousPage"
        >
        </v-pagination>
      </v-row>
    </template>
  </v-data-iterator>
</template>

<script>
export default {
  name: 'business-rule-card',
  props: ['cards'],
  data() {
    return {
      itemsPerPage: 4,
      page: 1,
      outOfScope: true
    }
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    previousPage() {
      if (this.page - 1 >= 1) this.page -= 1
    },
    addRules(o) {
      this.$emit('addRules', o)
    }
  },
  computed: {
    rowsPerPage() {
      return this.itemsPerPage
    },
    numberOfPages() {
      return Math.ceil(this.cards.length / this.itemsPerPage)
    },
    itemsPerRow() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 1
        case 'sm':
          return 2
        case 'md':
          return 3
        case 'lg':
          return 4
        case 'xl':
          return 6
        default:
          return 6
      }
    },
    pages() {
      return this.itemsPerPage
        ? Math.ceil(this.cards.length / this.itemsPerPage)
        : 0
    }
  }
}
</script>
