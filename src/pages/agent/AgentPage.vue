<script setup>

import {reactive, ref} from "vue";
import {useQuasar} from "quasar";
import TableControl from "components/TableControl.vue";

const $q = useQuasar()

let columns = [
    {name: 'index', label: '#', field: 'index'},
    {name: 'control', align: 'center', label: '控制', field: 'control'},
    {name: 'introducerId', align: 'center', label: '客户id', field: 'introducerId'},
    {name: 'userId', align: 'center', label: '人员信息', field: 'userId'},
    {name: 'firstTalk', align: 'center', label: '第一次对话', field: 'firstTalk'},
    {name: 'userId', align: 'center', label: '裁判文书网', field: 'userId'},
    {name: 'aiqicha', align: 'center', label: '爱企查', field: 'aiqicha'},
    {name: 'qiyecha', align: 'center', label: '企业查查', field: 'qiyecha'},
    {name: 'tianyancha', align: 'center', label: '天眼查', field: 'tianyancha'},
  ],
  selected = ref([]),
  rows = ref([]),
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
