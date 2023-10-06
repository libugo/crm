<script setup>

import DialogBar from "components/dialog/DialogBar.vue";
import {ref} from "vue";
import {useSystemSettingStoreStore} from "stores/system-setting-store";

const prop = defineProps(['index', 'defaultData'])
const emit = defineEmits(['moveDialog', 'closeDialog'])

const systemStore = useSystemSettingStoreStore()

const color = ref(systemStore.primary)

function moveFab(ev) {
  emit('moveDialog', ev, prop.index)
}

function closeDialog() {
  emit('closeDialog')
}

function changeSystemColor(val) {
  systemStore.set(val)
}
</script>

<template>
  <div class="system-color-view">
    <q-card>
      <dialog-bar v-touch-pan.prevent.mouse="moveFab"
                  class="cursor-pointer"
                  title="主题色设置"
                  @closeDialog="closeDialog"/>
      <q-card-section>
        <q-color v-model="color" no-header @change="changeSystemColor"/>
      </q-card-section>
    </q-card>
  </div>
</template>

<style lang="sass" scoped>
</style>
