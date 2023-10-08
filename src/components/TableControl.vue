<script setup>
import {ref} from "vue";

const prop = defineProps(['fields'])
const simpleSearchMode = ref(true),
  search = ref()
</script>

<template>
  <div class="table-control q-mb-sm">
    <div class="table-header q-mb-md row items-center">
      <div class="col q-gutter-sm">
        <q-icon color="primary" name="follow_the_signs" size="md"/>
        <slot name="controlBtn"/>
      </div>
      <div class="col-auto q-gutter-sm text-right">
        <q-btn color="primary" dense icon-right="sync" outline @click="$emit('getTableRows',true)">
          <q-tooltip :offset="[10, 10]" anchor="top middle" self="bottom middle">刷新</q-tooltip>
        </q-btn>
        <q-btn color="primary" dense icon-right="filter_alt" outline
               @click="simpleSearchMode=!simpleSearchMode">
          <q-tooltip :offset="[10, 10]" anchor="top middle" self="bottom middle">高级筛选</q-tooltip>
        </q-btn>
      </div>
    </div>
    <div v-if="simpleSearchMode" class="q-gutter-sm">
      <q-input v-model="search" color="primary" debounce="300" dense
               label="搜索" outlined
               rounded
               @update:model-value="$emit('getTableRows',true)">
        <template v-slot:prepend>
          <q-icon dense flat name="search"/>
        </template>
        <template v-slot:append>
          <q-btn :style="{visibility:search?'visible':'hidden'}" dense flat icon="clear" @click="search=''"/>
        </template>
      </q-input>
    </div>
    <q-card v-if="!simpleSearchMode" class="q-mb-md bg-grey-11">
      <slot/>
      <q-card-actions>
        <q-btn color="primary" label="搜索" @click="$emit('getTableRows',false)"/>
      </q-card-actions>
    </q-card>
  </div>
</template>

<style lang="sass" scoped>

</style>
