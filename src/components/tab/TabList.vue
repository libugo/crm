<script setup>
import {useRouteTabListStore} from "stores/route-tab-list";
import {useRouter} from "vue-router";
import {scroll} from 'quasar'
import {nextTick} from "vue";

const emit = defineEmits(['clearAllTab'])

const router = useRouter()
const routeTabListStore = useRouteTabListStore();

function routeTabClose(id) {
    routeTabListStore.remove(id);
}

function clearTabByName(name, id) {
  routeTabListStore.removeByName(name, id)
}

function clearAllTab() {
    routeTabListStore.$reset()
    emit('clearAllTab')
}

function stillScrollRight() {
    nextTick(() => {
        let breadCrumbs = document.getElementById('bread-crumbs')
        let s = scroll.getScrollTarget(breadCrumbs)
        scroll.setHorizontalScrollPosition(s, scroll.getScrollWidth(s))
    })
}

function flushPage() {
  router.go(0)
}

routeTabListStore.$subscribe((mutation, state) => stillScrollRight())

</script>

<template>
    <div id="bread-crumbs" class="scroll q-mb-xs q-ma-xs">
        <q-btn-group v-for="item in routeTabListStore.list" :key="item.id"
                 class="tab-btn-group q-mr-xs" outline>
          <q-btn :color="$route.fullPath===item.path?'primary':'grey'" :label="item.title" :to="item.path" outline/>
          <q-btn v-if="item.name!=='home'" :color="$route.fullPath===item.path?'primary':'grey'"
             dense icon="close" outline size="sm"
             @click="routeTabClose(item.id)"/>
      <q-tooltip v-if="item.name!=='home'" :offset="[10, 10]" anchor="top middle" self="bottom middle">
        {{ item.datetime }}
      </q-tooltip>
      <q-popup-proxy context-menu>
        <q-list v-close-popup>
          <q-item v-if="$route.name!=='home' && $route.fullPath===item.path" v-ripple clickable>
            <q-item-section @click="flushPage(item.name,item.id)">重载页面</q-item-section>
          </q-item>
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
#bread-crumbs
  white-space: nowrap
</style>
