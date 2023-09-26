<script setup>

import {reactive, ref} from "vue";
import {useQuasar} from "quasar";

const $q = useQuasar()

let columns = [
    {name: 'index', label: '#', field: 'index'},
    {name: 'control', align: 'center', label: '控制', field: 'control'},
    {name: 'brId', align: 'center', label: '中介跟单id', field: 'brId'},
    {name: 'type', align: 'center', label: '资源类型', field: 'type'},
    {name: 'vehicleModel', align: 'center', label: '细分车型', field: 'vehicleModel'},
    {name: 'vehicleModelSupplement', align: 'center', label: '细分车型补充', field: 'vehicleModelSupplement'},
    {name: 'scopeArea', align: 'center', label: '范围地区', field: 'scopeArea'},
    {name: 'address', align: 'center', label: '地点', field: 'address'},
    {name: 'receiveMethod', align: 'center', label: '接收方式', field: 'receiveMethod'},
    {name: 'receiveDateNeed', align: 'center', label: '需要时间', field: 'receiveDateNeed'},
    {name: 'price', align: 'center', label: '价格费用', field: 'price'},
    {name: 'requiredInfo', align: 'center', label: '所需资料', field: 'requiredInfo'},
  ],
  selected = ref([]),
  rows = ref([1]),
  filter = ref(''),
  loading = ref(false),
  pagination = ref({
    page: 1,
    rowsNumber: null,
    rowsPerPage: 10,
    sortBy: "asc",
    descending: false
  })

let tableMainDialog = reactive({
  display: false,
  content: null,
  data: null
})

</script>

<template>
  <q-page class="business-res-page normal-page">
    <div class="table-header q-mb-md row items-center">
      <div class="col q-gutter-sm">
        <q-icon color="main" name="follow_the_signs" size="md"/>
        <q-btn class="bg-main text-white" icon-right="add" label="新增" @click="addLeadInfo"/>
        <q-btn v-if="selected.length>0" color="negative" icon-right="delete_forever" label="删除所选"
               @click="delSelectedRow"/>
      </div>
      <div class="col-auto text-right">
        <div class="row items-center q-gutter-md">
          <q-btn class="text-main" icon-right="sync" label="刷新" outline @click="getTableRows()"/>
          <q-input v-model="filter" color="main" debounce="300" dense
                   label="搜索" outlined
                   rounded style="max-width: 300px"
                   @update:model-value="searchLead">
            <template v-slot:prepend>
              <q-icon dense flat name="search"/>
            </template>
            <template v-slot:append>
              <q-btn :style="{visibility:filter?'visible':'hidden'}" dense flat icon="clear" @click="filter=''"/>
            </template>
          </q-input>
        </div>
      </div>
    </div>
    <q-table
      v-model:pagination="pagination"
      v-model:selected.sync="selected"
      :columns="columns"
      :filter="filter"
      :loading="loading"
      :rows="rows"
      row-key="leadId"
      selection="multiple"
      table-header-class="ad-table-header"
      @request="getTableRows">
      <template #body-cell-control="props">
        <q-td :auto-width="true" :props="props" class="q-gutter-xs">
          <q-btn color="warning" dense glossy icon="edit" push @click="editLead(props.row)">
            <q-tooltip>编辑广告</q-tooltip>
          </q-btn>
          <q-btn color="negative" dense glossy icon="delete" push @click="delLead(props.row.leadId)">
            <q-tooltip>删除广告</q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
    <q-dialog v-model="tableMainDialog.display" :maximized="true" persistent>
      <component :is="tableMainDialog.content" :default-data="tableMainDialog.data"
                 class="flex flex-center"
                 @closeMainDialog="closeMainDialog"/>
    </q-dialog>
  </q-page>
</template>

<style lang="sass" scoped>

</style>
