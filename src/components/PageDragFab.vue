<script setup>
import {ref} from "vue";

const fabPos = ref([50, 50]), draggingFab = ref(false)

function moveFab(ev) {
  draggingFab.value = ev.isFirst !== true && ev.isFinal !== true
  fabPos.value = [
    fabPos.value[0] - ev.delta.x,
    fabPos.value[1] - ev.delta.y
  ]
}
</script>

<template>
  <q-page-sticky :offset="fabPos" position="bottom-right" style="z-index: 10000">
    <q-fab v-touch-pan.prevent.mouse="moveFab" color="main" direction="up"
           icon="keyboard_arrow_up">
      <slot/>
    </q-fab>
  </q-page-sticky>
</template>

<style lang="sass" scoped>

</style>
