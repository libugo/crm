<script setup>


import {reactive, ref} from "vue";

const dialogList = reactive([]), dragDialogAble = ref(false)

function moveDialog(ev, index) {
  dragDialogAble.value = ev.isFirst !== true && ev.isFinal !== true
  dialogList[index].top = dialogList[index].top + ev.delta.y
  dialogList[index].left = dialogList[index].left + ev.delta.x
}

/**
 *
 * @param key
 * @param componentFileName 组件名字，不包含后缀名，动态导入的组件需要在components/dynamicImport目录下
 * @param data
 * @param oneSame 相同key的组件只能打开一个
 */
function addDialog(key, componentFileName, data, oneSame = true) {
  if (oneSame) {
    for (let dialog of dialogList) {
      if (dialog.key === key) {
        dialog.highlight = true
        let timer = setTimeout(() => {
          dialog.highlight = false
          clearTimeout(timer)
        }, 500)
        return
      }
    }
  }
  //https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#rollupplugin-dynamic-import-vars
  import(`../dynamicImport/${componentFileName}.vue`).then((module) => {
    let dialog = {
      key,
      component: module.default,
      //方便在调节窗口后，新建模态框能保持中心
      top: window.innerHeight / 2.5 + dialogList.length * 10,
      left: window.innerWidth / 2.5,
      data,
      highlight: false
    }
    dialogList.push(dialog)
  })
}

defineExpose({addDialog})
</script>

<template>
  <div v-for="(item,index) in dialogList" :key="index"
       :class="{'absolute-center':true,'rotate360':item.highlight}"
       :style="{top:item.top+'px',left:item.left+'px'}">
    <component :is="item.component"
               :default-data="item.data"
               :index="index"
               class="flex flex-center"
               @closeDialog="dialogList.splice(index,1)"
               @moveDialog="moveDialog"/>
  </div>
</template>

<style lang="sass" scoped>

</style>
