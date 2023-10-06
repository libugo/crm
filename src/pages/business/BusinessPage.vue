<script setup>

import {reactive, ref} from "vue";
import {useQuasar} from "quasar";

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
    <div class="table-header q-mb-md row items-center">
      <div class="col q-gutter-sm">
        <q-icon color="primary" name="follow_the_signs" size="md"/>
        <q-btn color="primary" icon-right="add" label="上传" @click="addData"/>
          <!--        <q-btn v-if="selected.length>0" color="negative" icon-right="delete_forever" label="删除所选"
                         @click="delSelectedRow" />-->
      </div>
        <div class="col-auto q-gutter-sm text-right">
          <q-btn color="primary" dense icon-right="sync" outline @click="getTableRows()">
                <q-tooltip :offset="[10, 10]" anchor="top middle" self="bottom middle">刷新</q-tooltip>
            </q-btn>
          <q-btn color="primary" dense icon-right="filter_alt" outline
                   @click="fullFilterControl.status=!fullFilterControl.status">
                <q-tooltip :offset="[10, 10]" anchor="top middle" self="bottom middle">高级筛选</q-tooltip>
            </q-btn>
      </div>
    </div>
      <div v-if="!fullFilterControl.status" class="q-gutter-sm">
        <q-input v-model="simpleFilterControl.search" color="primary" debounce="300" dense
                   label="搜索" outlined
                   rounded
                   @update:model-value="getTableRows()">
              <template v-slot:prepend>
                  <q-icon dense flat name="search"/>
              </template>
              <template v-slot:append>
                  <q-btn :style="{visibility:filter?'visible':'hidden'}" dense flat icon="clear" @click="filter=''"/>
              </template>
          </q-input>
      </div>
      <q-card v-if="fullFilterControl.status" class="q-mb-md">
          <q-card-section class="q-gutter-sm">
              <q-input v-model="fullFilterControl.img" clearable dense label="图片名" outlined/>
              <q-input v-model="fullFilterControl.text" clearable dense label="文字包含" outlined/>
              <q-btn-toggle v-model="fullFilterControl.readStatus"
                            :options="[{label: '全部', value: null},{label: '未阅读', value: false},{label: '已阅读', value: true}]"
                            dense
                            push
                            toggle-color="primary"
              />
          </q-card-section>
          <q-card-actions>
            <q-btn color="primary" label="搜索" @click="getTableRows()"/>
          </q-card-actions>
      </q-card>
    <q-table
            class="q-mt-sm"
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
