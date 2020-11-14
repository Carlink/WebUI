<template>
  <div class="writing-container white pa-4 mx-auto">
    <!-- title -->
    <div class="size-20 font-weight-black mb-3">
      What do you want to do with the duplicates?
    </div>
    <!-- subtitle -->
    <div class="size-16 mb-4 font-weight-black mb-3">
      Keeping values
    </div>
    <!-- subtitle -->
    <div class="mb-4">
      The system will automatically keep the values of the primary unless
      specified differently below.
    </div>
    <!-- Keeping Values -->
    <WritingKeepingValues />
    <!-- Joining Values -->
    <div class="size-16 font-weight-black mb-3">
      Joining values
    </div>
    <WritingJoiningValues />
  </div>
</template>

<script>
import WritingKeepingValues from '@/components/businessRules/writing/step3/KeepingValues'
import WritingJoiningValues from '@/components/businessRules/writing/step3/JoiningValues'

export default {
  name: 'writing-step-3',
  components: { WritingKeepingValues, WritingJoiningValues }
}
</script>

<style>
.writing-form-title {
  color: #196dcc;
}
.actions-wrapper {
  background-color: #f3f2f2;
}
</style>
