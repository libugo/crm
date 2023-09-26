<script setup>

import {reactive, ref} from "vue";
import {useQuasar} from "quasar";

const $q = useQuasar()

let columns = [
    {name: 'index', label: '#', field: 'index'},
    {name: 'control', align: 'center', label: '控制', field: 'control'},
    {name: 'biId', align: 'center', label: '客户跟单id', field: 'biId'},
    {name: 'userId', align: 'center', label: '客户信息', field: 'userId'},
    {name: 'name', align: 'center', label: '生意名称', field: 'name'},
    {name: 'type', align: 'center', label: '业务类型', field: 'type'},
    {name: 'schedule', align: 'center', label: '生意进度', field: 'schedule'},
    {name: 'trackCreateDate', align: 'center', label: '跟单日期', field: 'trackCreateDate'},
    {name: 'introducerId', align: 'center', label: '介绍人', field: 'introducerId'},
    {name: 'point', align: 'center', label: '结算积分', field: 'point'},
    {name: 'adminId', align: 'center', label: '生意主管', field: 'adminId'},
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
  <q-page class="introducer-page normal-page">
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
      <template #body-cell-userId="props">
        <q-td :auto-width="true" :props="props" class="q-gutter-xs">
          <q-btn color="primary" dense glossy icon="boy" push @click="editLead(props.row)">
            <q-tooltip>用户信息</q-tooltip>
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
