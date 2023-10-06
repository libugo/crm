<script setup>

import PageDragFab from "components/fab/PageDragFab.vue";
import {fabWheelMenuListData} from "src/config";
import {goRouteItem} from "src/util";
</script>

<template>
  <page-drag-fab>
    <q-fab-action v-for="item in fabWheelMenuListData"
                  :key="item.label"
                  :color="item.color"
                  :icon="item.icon"
                  :label="item.label"
                  @click="goRouteItem(item.name,item.label,item.path)"/>
  </page-drag-fab>
</template>

<style lang="sass" scoped>

</style>
