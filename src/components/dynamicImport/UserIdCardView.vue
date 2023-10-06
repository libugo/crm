<script setup>

import DialogBar from "components/dialog/DialogBar.vue";

const prop = defineProps(['index', 'defaultData'])
const emit = defineEmits(['moveDialog', 'closeDialog'])

function moveFab(ev) {
  emit('moveDialog', ev, prop.index)
}

function closeDialog() {
  emit('closeDialog')
}
</script>

<template>
  <div class="user-id-card-view">
    <q-card>
      <dialog-bar :id="prop.defaultData"
                  v-touch-pan.prevent.mouse="moveFab"
                  :index="prop.index"
                  class="cursor-pointer"
                  entity="人员"
                  module="身份证信息"
                  @closeDialog="closeDialog"/>
      <q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>

<style lang="sass" scoped>

</style>
