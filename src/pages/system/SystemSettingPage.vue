<script setup>

import DialogList from "components/dialog/DialogList.vue";
import {ref} from "vue";

const dialogList = ref()

function displayBusinessTemplateView() {
  dialogList.value.addDialog('businessTemplate', 'BusinessTemplateView', null)
}

function displaySystemColorView() {
  dialogList.value.addDialog('systemColor',
    'SystemColorView', null)
}
</script>

<template>
  <q-page class="system-setting-page normal-page q-gutter-md">
    <q-card>
      <q-card-section>
        <div class="text-h6">自定义字段</div>
      </q-card-section>
      <q-separator/>
      <q-card-section class="q-gutter-md">
        <q-btn label="跟单模板" @click="displayBusinessTemplateView"/>
        <q-btn label="性格特点"/>
        <q-btn label="生意进度"/>
        <q-btn label="预约事项等级"/>
      </q-card-section>
    </q-card>
    <q-card>
      <q-card-section>
        <div class="text-h6">主题配色</div>
      </q-card-section>
      <q-separator/>
      <q-card-section class="q-gutter-md">
        <q-btn label="主题色设置" @click="displaySystemColorView"/>
      </q-card-section>
    </q-card>
    <dialog-list ref="dialogList"/>
  </q-page>
</template>

<style lang="sass" scoped>

</style>
