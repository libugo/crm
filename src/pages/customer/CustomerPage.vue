<script setup>

import {reactive, ref} from "vue";
import {useQuasar} from "quasar";

const $q = useQuasar()

let columns = [
    {name: 'index', label: '#', field: 'index'},
    {name: 'control', align: 'center', label: '控制', field: 'control'},
    {name: 'customerId', align: 'center', label: '客户id', field: 'customerId'},
    {name: 'userId', align: 'center', label: '人员信息', field: 'userId'},
    {name: 'driver', align: 'center', label: '驾驶证', field: 'driver'},
    {name: 'driving', align: 'center', label: '行驶证', field: 'driving'},
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
  <q-page class="customer-page normal-page">
    <div class="table-header q-mb-md row items-center">
      <div class="col q-gutter-sm">
        <q-icon color="primary" name="follow_the_signs" size="md"/>
        <q-btn color="primary" icon-right="add" label="新增" @click="addLeadInfo"/>
        <q-btn v-if="selected.length>0" color="negative" icon-right="delete_forever" label="删除所选"
               @click="delSelectedRow"/>
      </div>
      <div class="col-auto text-right">
        <div class="row items-center q-gutter-md">
          <q-btn color="primary" icon-right="sync" label="刷新" outline @click="getTableRows()"/>
          <q-input v-model="filter" color="primary" debounce="300" dense
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

          </q-btn>
          <q-btn color="negative" dense glossy icon="delete" push @click="delLead(props.row.leadId)">
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
      <template #body-cell-driver="props">
        <q-td :auto-width="true" :props="props" class="q-gutter-xs">
          <q-btn color="primary" dense glossy icon="drive_eta" push @click="editLead(props.row)">
            <q-tooltip>驾驶证</q-tooltip>
          </q-btn>
        </q-td>
      </template>
      <template #body-cell-driving="props">
        <q-td :auto-width="true" :props="props" class="q-gutter-xs">
          <q-btn color="primary" dense glossy icon="emoji_transportation" push @click="editLead(props.row)">
            <q-tooltip>行驶证</q-tooltip>
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
