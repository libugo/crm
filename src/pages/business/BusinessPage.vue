<script setup>

import {reactive, ref} from "vue";
import {useQuasar} from "quasar";
import TableControl from "components/TableControl.vue";

const $q = useQuasar()

let columns = [
    {name: 'index', label: '#', field: 'index'},
    {name: 'order', align: 'center', label: '顺序', field: 'order'},
    {name: 'control', align: 'center', label: '控制', field: 'control'},
    {name: 'businessId', align: 'center', label: '跟单id', field: 'businessId'},
    {name: 'bType', align: 'center', label: '生意对象', field: 'bType'},
    {name: 'biId', align: 'center', label: '生意id', field: 'biId'},
    {name: 'orderDate', align: 'center', label: '预约时间', field: 'orderDate'},
    {name: 'orderLevel', align: 'center', label: '预约等级', field: 'orderLevel'},
    {name: 'content', align: 'center', label: '预约内容', field: 'content'},
    {name: 'content', align: 'center', label: '跟单结果', field: 'content'},
    {name: 'adminId', align: 'center', label: '操作人', field: 'adminId'},
  ],
  selected = ref([]),
  rows = ref([
    {index: 0, businessId: 0},
    {index: 1, businessId: 1},
    {index: 2, businessId: 2}
  ]),
  filter = ref(''),
  loading = ref(false),
  pagination = ref({
    page: 1,
    rowsNumber: null,
    rowsPerPage: 10,
    sortBy: "asc",
    descending: false
  }),
  dateSelect = ref(0)

let tableMainDialog = reactive({
  display: false,
  content: null,
  data: null
})

function upOrder(businessId) {

}

function downOrder(businessId) {

}
</script>

<template>
  <q-page class="business-page normal-page">
    <table-control>
      <template #control-btn>
        <q-btn-toggle
          v-model="dateSelect"
          :options="[
        {label: '今日8',icon:'calendar_today', value: 0},
        {label: '过期1',icon:'free_cancellation', value: 1},
        {label: '未来888',icon:'trending_up', value: 2},
        {label: '全部',icon:'work_history', value: 3}
      ]" dense glossy
          push
        />
      </template>
    </table-control>
    <q-table
      v-model:pagination="pagination"
      v-model:selected.sync="selected"
      :columns="columns"
      :filter="filter"
      :loading="loading"
      :rows="rows"
      row-key="leadId"
      selection="multiple"
      @request="getTableRows">
      <template #body-cell-order="props">
        <q-td :auto-width="true" :props="props" class="q-gutter-xs non-selectable">
          <q-btn v-if="props.row.index!==0" dense icon="arrow_drop_up" size="sm"
                 @click="upOrder(props.row.bussinessId)"/>
          <q-btn v-if="props.row.index!==rows.length-1" dense icon="arrow_drop_down" size="sm"
                 @click="downOrder(props.row.bussinessId)"/>
        </q-td>
      </template>
      <template #body-cell-control="props">
        <q-td :auto-width="true" :props="props" class="q-gutter-xs non-selectable">
          <q-btn color="warning" dense glossy icon="edit" push @click="editLead(props.row)"/>
          <q-btn color="negative" dense glossy icon="delete" push @click="delLead(props.row.leadId)"/>
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
