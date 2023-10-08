<script setup>

import {reactive, ref} from "vue";
import {useQuasar} from "quasar";
import TableControl from "components/TableControl.vue";

const $q = useQuasar()

let columns = [
    {name: 'index', label: '#', field: 'index'},
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


let simpleFilterControl = reactive({
    search: null,
    readStatus: null,
    dateSelect: null,
    auditStatus: null
});

let fullFilterControl = reactive({
    status: false,
    userInfo: null,
    img: null,
    text: null,
    addStartTime: null,
    addEndTime: null,
    readStatus: null,
    commission: null,
    auditStatus: null,
    auditDetails: null,
    auditStartTime: null,
    auditEndTime: null,
    ban: null
});


</script>

<template>
  <q-page class="business-page normal-page">
    <table-control>
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
      table-header-class="ad-table-header"
      @request="getTableRows">
      <template #body-cell-control="props">
        <q-td :auto-width="true" :props="props" class="q-gutter-xs">
          <q-btn color="warning" dense glossy icon="edit" push @click="editLead(props.row)">

          </q-btn>
          <q-btn color="negative" dense glossy icon="delete" push @click="delLead(props.row.leadId)">

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
