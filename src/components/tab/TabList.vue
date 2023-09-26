<script setup>
import {useRouteTabListStore} from "stores/route-tab-list";
import {date} from "quasar"

const routeTabListStore = useRouteTabListStore();

function routeTabClose(name, timestamp) {
  routeTabListStore.remove(name, timestamp);
}

function getFormatDatetimeByTimestamp(timestamp) {
  return date.formatDate(timestamp, 'DD日 HH:mm:ss.SSS')
}

function clearTabByName(name, id) {
  routeTabListStore.removeByName(name, id)
}

function clearAllTab() {
  routeTabListStore.init()
}
</script>

<template>
  <div class="q-mb-xs q-ma-xs bread-crumbs">
    <q-btn-group v-for="item in routeTabListStore.list" :key="item.name"
                 class="tab-btn-group q-mr-xs" outline>
      <q-btn :color="$route.fullPath===item.path?'main':'grey'" :label="item.title" :to="item.path" outline/>
      <q-btn v-if="item.name!=='home'" :color="$route.fullPath===item.path?'main':'grey'"
             dense icon="close" outline size="sm"
             @click="routeTabClose(item.id)"/>
      <q-tooltip v-if="item.name!=='home'" :offset="[10, 10]" anchor="top middle" self="bottom middle">
        {{ item.datetime }}
      </q-tooltip>
      <q-popup-proxy context-menu>
        <q-list v-close-popup>
          <q-item v-if="$route.name!=='home' && $route.fullPath===item.path" v-ripple clickable>
            <q-item-section @click="clearTabByName(item.name,item.id)">关闭重复</q-item-section>
          </q-item>
          <q-item v-ripple clickable>
            <q-item-section @click="clearAllTab">关闭所有</q-item-section>
          </q-item>
        </q-list>
      </q-popup-proxy>
    </q-btn-group>
  </div>
</template>

<style lang="sass" scoped>
.bread-crumbs
  white-space: nowrap
  overflow-x: auto
</style>
