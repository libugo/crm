<template>
  <div class="menu-item">
    <div v-for="(item,index) in itemList" :key="index">
      <div v-if="role+1>item.meta.role">
        <q-item v-if="!item.children"
                :key="index"
                v-ripple
                :active="$route.path===item.path"
                :inset-level="props.indentLevel"
                :to="item.path"
                active-class="text-main text-bold"
                class="text-grey-8"
                clickable
        >
          <q-item-section>
            <div class="row items-center">
              <q-icon :name="item.meta.icon" class="q-ma-sm q-mr-md" size="sm"/>
              {{ item.meta.title }}
            </div>
          </q-item-section>
        </q-item>
        <q-expansion-item v-else
                          :key="item"
                          :content-inset-level="props.indentLevel"
                          :default-opened="item.meta.open"
                          :duration="300"
                          :header-inset-level="props.indentLevel"
                          :icon="item.meta.icon"
                          :label="item.meta.title"
                          class="text-grey-8"
                          expand-icon="chevron_left"
                          expanded-icon="expand_more"
                          @hide="closeMenu(item.name)"
                          @show="openMenu(item.name)"
        >
          <template v-slot:header>
            <q-item-section>
              <div class="row items-center">
                <q-icon :name="item.meta.icon" class="q-ma-sm q-mr-md" size="sm"/>
                {{ item.meta.title }}
              </div>
            </q-item-section>
          </template>
          <template v-slot:default>
            <menu-item
              :indent-level="props.indentLevel + 0.2"
              :item-list="item.children"
              :role="item.meta.role"
            />
          </template>
        </q-expansion-item>
      </div>
    </div>
  </div>
</template>
<script setup>
import {useMenuOpenMapStore} from "stores/menu-open-map";


const props = defineProps({
  indentLevel: Number,
  itemList: Object,
  role: Number
});

const menuOpenMap = useMenuOpenMapStore();

function openMenu(name) {
  menuOpenMap.put(name, true);
}

function closeMenu(name) {
  menuOpenMap.put(name, false);
}
</script>
<style lang="sass" scoped>
.menu-item
  font-size: 22px
</style>
