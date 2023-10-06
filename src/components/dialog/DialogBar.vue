<template>
  <div class="dialog-bar ">
    <q-bar class="row bg-primary text-white shadow-4 non-selectable">
      <div class="col">
        <div v-if="props.title!=null">
          {{ title }}
        </div>
        <div v-else>
          <q-badge v-if="props.index!=null" :label="props.index" align="middle" color="orange"/>
          {{ props.entity }}
          <q-badge :label="props.id" outline/>
          {{ props.module }}
        </div>
      </div>
      <div class="col-auto cursor-pointer">
        <q-btn dense flat icon="close" @click="closeDialog"/>
      </div>
    </q-bar>
  </div>
</template>
<script setup>
const props = defineProps(['index', 'entity', 'id', 'module', 'title'])
const emit = defineEmits(['closeDialog'])

function closeDialog() {
  emit('closeDialog')
}
</script>
<style lang="sass" scoped>
.dialog-bar
  min-width: 100px
</style>
