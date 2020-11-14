<template>
  <div class="add-rule-container">
    <!-- header -->
    <div class="d-flex justify-space-between align-center px-4 py-6">
      <!-- back arrow -->
      <v-icon color="black" @click="$router.push('/cleandata/business-rules')">
        mdi-arrow-left
      </v-icon>
      <!-- title -->
      <span class="font-weight-black cursor-default">New Leads</span>
      <!-- action buttons -->
      <div class="d-flex justify-space-between align-center">
        <v-btn class="mr-3" disabled>draft</v-btn>
      </div>
    </div>
    <!-- content -->
    <div>
      <!-- tabs frame -->
      <v-tabs
        v-model="tabs"
        fixed-tabs
        height="74"
        slider-size="4"
        class="px-10"
      >
        <v-tabs-slider color="ap-sky-blue"></v-tabs-slider>
        <v-tab
          v-for="(item, i) of tabHeaderItems"
          :href="'#' + (i + 1)"
          :key="i"
        >
          <div
            class="d-flex flex-column text-capitalize flex-grow-1 text-left height-100p relative"
          >
            <!-- tab button content -->
            <div class="my-auto d-flex align-center">
              {{ item.text }}
              <v-icon
                v-if="currentTab > i + 1"
                class="ml-2"
                size="18"
                color="ap-sky-blue"
              >
                mdi-check-circle-outline
              </v-icon>
              <div
                v-if="currentTab == i + 1"
                class="d-flex align-center warning--text font-weight-bold"
              >
                <v-icon class="ml-2 mr-1" size="18">
                  mdi-timelapse
                </v-icon>
                <span>5m</span>
              </div>
            </div>
            <!-- stepper -->
            <MiniStepper
              v-if="item.stepper"
              class="mini-stepper"
              :steps="item.stepper.steps"
              :current="item.stepper.current"
            />
            <!-- tab button actions -->
            <div class="absolute tab-icons">
              <v-icon color="ap-light-gray" size="16">mdi-pencil</v-icon>
            </div>
          </div>
        </v-tab>
      </v-tabs>
      <!-- tabs content -->
      <v-tabs-items v-model="tabs">
        <v-tab-item value="1">
          <v-card flat>
            <Segmentation :step="getStep" />
          </v-card>
        </v-tab-item>
        <v-tab-item value="2">
          <MatchingCriteria />
        </v-tab-item>
        <v-tab-item value="3">
          <Assignment :step="getStep" />
        </v-tab-item>
        <v-tab-item value="4">
          <Writing :step="getStep" />
        </v-tab-item>
        <v-tab-item value="5">
          <Display />
        </v-tab-item>
        <v-tab-item value="6">
          <v-card flat>
            <Launch />
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </div>
    <v-footer
      width="100%"
      class="footer-card white elevation-3"
      :style="paddingFooter"
    >
      <div class="d-flex white align-center width-100p">
        <v-row align="center">
          <div class="pl-4 d-flex flex-column">
            <div class="primary--text size-12 cursor-default">
              <v-icon color="primary">
                mdi-checkbox-marked-circle-outline
              </v-icon>
              changes saved
            </div>
            <div class="pt-1 primary--text size-12 cursor-default">
              CDBS - {{ step }}
              &#124;
              <a
                href="https://activeprime.zendesk.com/hc/en-us/requests/new"
                target="_blank"
                class="size-12 primary--text pointer no-text-decoration"
              >
                Are we missing something in this page?
              </a>
            </div>
          </div>
          <v-spacer></v-spacer>
          <div class="d-flex justify-end pr-4 pl-4" v-if="currentTab != 6">
            <v-btn
              v-if="currentTab != 1 || prev"
              class="mr-2"
              color="primary"
              outlined
              @click="onPrev"
            >
              Previous
            </v-btn>
            <v-btn color="primary" @click="onNext">Next</v-btn>
          </div>
          <div class="d-flex justify-end pr-4 pl-4" v-else>
            <v-btn class="mr-2" color="primary" outlined>
              Save & Exit
            </v-btn>
            <v-btn color="primary">Save & Launch</v-btn>
          </div>
        </v-row>
      </div>
    </v-footer>
  </div>
</template>

<script>
import MiniStepper from '@/components/shared/MiniStepper'
import MatchingCriteria from '@/components/businessRules/matchingCriteria'
import Assignment from '@/components/businessRules/assignment'
import Display from '@/components/businessRules/display'
import Writing from '@/components/businessRules/writing'
import Segmentation from '@/views/leads/Segmentation'
import Launch from '@/components/businessRules/launch'

export default {
  name: 'manage-business-rule',
  components: {
    Segmentation,
    MiniStepper,
    MatchingCriteria,
    Display,
    Assignment,
    Writing,
    Launch
  },
  computed: {
    getStep: function () {
      const tab = this.tabHeaderItems[this.currentTab - 1]
      let { stepper } = tab
      if (!stepper) return null
      return stepper.current
    },
    currentTab: function () {
      if (!this.tabs) {
        return 1
      }
      return parseInt(this.tabs)
    }
  },
  data() {
    return {
      tabs: this.$route.params.id,
      tabHeaderItems: [
        { id: 1, text: 'Segmentation', stepper: { steps: 2, current: 1 } },
        { id: 2, text: 'Matching' },
        { id: 3, text: 'Assignment', stepper: { steps: 2, current: 1 } },
        { id: 4, text: 'Writing', stepper: { steps: 3, current: 1 } },
        { id: 5, text: 'Display' },
        { id: 6, text: 'Launch' }
      ],
      step: '1.1',
      prev: false,
      paddingFooter: 'padding-left: 56px;'
    }
  },
  mounted() {
    this.resizePadding()
    window.addEventListener('resize', () => {
      this.resizePadding()
    })  
  },
  methods: {
    resizePadding() {
      const drawer = document.getElementsByClassName('v-navigation-drawer')[0]
      this.paddingFooter = `padding-left: ${drawer.offsetWidth + 16}px;`
    },
    onNext() {
      const tab = this.tabHeaderItems[this.currentTab - 1]
      let { stepper } = tab

      // change step if applies
      if (stepper && stepper.current < stepper.steps) {
        stepper.current++
        this.tabHeaderItems.splice(this.currentTab - 1, 1, tab)
        this.prev = true
      }
      // change tab
      else this.tabs = this.currentTab + 1 + ''
    },
    onPrev() {
      const tab = this.tabHeaderItems[this.currentTab - 1]
      let { stepper } = tab

      // change step if applies
      if (stepper && stepper.current > 1) {
        stepper.current--
        this.tabHeaderItems.splice(this.currentTab - 1, 1, tab)
        this.prev = false
      }
      // change tab
      else this.tabs = this.currentTab - 1 + ''
    }
  }
}
</script>

<style lang="scss">
.footer-card {
  position: fixed !important;
  bottom: 0 !important;
  right: 0;
}

.add-rule-container {
  .v-tabs {
    .v-slide-group__wrapper {
      border: 1px solid var(--v-ap-light-gray-base);
      border-bottom: 0px;
      border-radius: 4px;
    }
    a.v-tab {
      position: relative;
      border-bottom: 1px solid var(--v-ap-light-gray-base);

      & {
        border-right: 1px solid var(--v-ap-light-gray-base);
      }
    }
    .tab-icons {
      top: 5px;
      right: 0px;
    }
    .mini-stepper {
      position: absolute;
      bottom: 10px;
    }
  }
}
</style>
