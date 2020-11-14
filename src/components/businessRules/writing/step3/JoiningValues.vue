<template>
  <div class="border-all border-radius-5 mb-8">
    <div class="pa-4">
      <div class="d-flex justify-space-between">
        <span class="font-weight-bold writing-form-title"
          >Automatic actions on field you want to join:</span
        >
        <v-btn
          class="text-capitalize"
          @click="addObject"
          color="ap-link"
          text
          depressed
          small
        >
          <v-icon size="20" color="ap-link">mdi-plus</v-icon>
          <span class="size-14 ml-1 font-weight-regular">New Field</span>
        </v-btn>
      </div>
      <v-container>
        <v-row
          dense
          class="center"
          v-for="(object, index) in objects"
          :key="object.id"
        >
          <v-col cols="11">
            <v-row>
              <v-col cols="6">
                <label>Join Field</label>
                <v-select
                  outlined
                  dense
                  :items="joinFields"
                  class="white"
                  hide-details
                  :key="object.id"
                ></v-select>
              </v-col>
              <v-col cols="6">
                <p class="mb-0">Separator:</p>
                <div>
                  <v-tooltip
                    bottom
                    v-for="(separator, index) in separators"
                    :key="separator.id"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        outlined
                        class="rounded mr-2"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon color="black" v-if="separator.materialIcon">{{ separator.icon }}</v-icon>
                        <span v-else class="font-weight-black">{{
                          separator.icon
                        }}</span>
                      </v-btn>
                    </template>
                    <span>{{ separator.tooltip }}</span>
                  </v-tooltip>
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="1" class="d-flex align-center">
            <v-btn icon @click="removeObject(index)" class="mt-3">
              <v-icon class="size-14">close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'writing-joining-values',
  data: () => ({
    joinFields: ['Description'],
    object: 1,
    objects: [{ id: 1 }],
    separators: [
      { id: 1, icon: ';', tooltip: 'semicolon' },
      { id: 2, icon: ':', tooltip: 'colon' },
      { id: 3, icon: ',', tooltip: 'comma' },
      { id: 4, icon: 'mdi-format-pilcrow', materialIcon: true, tooltip: 'Start a new line' }
    ]
  }),
  methods: {
    addObject() {
      this.object++
      this.objects.push({ id: this.objects })
    },
    removeObject(index) {
      this.objects.splice(index, 1)
    }
  }
}
</script>
