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
  <div class="business-template-view">
    <q-card>
      <dialog-bar :id="prop.defaultData"
                  v-touch-pan.prevent.mouse="moveFab"
                  class="cursor-pointer"
                  title="跟单模板"
                  @closeDialog="closeDialog"/>
      <q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>

<style lang="sass" scoped>

</style>
