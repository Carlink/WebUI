<template>
  <v-app>
    <v-card width="400" class="mx-auto mt-5">
      <v-card-title>
        Recover Access
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            label="Username (email)"
            prepend-icon="mdi-email"
            v-model="email"
            required
            :rules="emailRules"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="info" block>Send me the link</v-btn>
      </v-card-actions>
      <v-layout align-end justify-end class="mt-4 mr-2 mb-1">
        <v-btn text x-small :to="{ name: 'signIn' }" color="indigo" class="mt-1"
          >Sign In</v-btn
        >
      </v-layout>
    </v-card>
  </v-app>
</template>

<script>
export default {
  name: 'ForgotPassword',
  data: () => ({
    email: null,
    emailRules: [
      (v) => !!v || 'Username (email) is required',
      (v) => /.+@.+/.test(v) || 'Must be a valid email'
    ]
  })
}
</script>
