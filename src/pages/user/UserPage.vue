<script setup>

import {reactive, ref} from "vue";
import {useQuasar} from "quasar";

const $q = useQuasar()

let columns = [
    {name: 'index', label: '#', field: 'index'},
    {name: 'control', align: 'center', label: '控制', field: 'control'},
    {name: 'userId', align: 'center', label: '用户id', field: 'userId'},
    {name: 'level', align: 'center', label: '级别', field: 'level'},
    {name: 'character', align: 'center', label: '性格特点', field: 'character'},
    {name: 'idNumber', align: 'center', label: '身份证', field: 'idNumber'},
    {name: 'contact', align: 'center', label: '联系方式', field: 'wxId'}
  ],
  selected = ref([]),
  rows = ref([{
    userId: 1,
    level: 1,
    character: '犹豫不决'
  }]),
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

function simpleT4() {
  $q.notify("点击后弹窗详细显示相关信息")
}
</script>

<template>
  <q-page class="user-page normal-page">
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
      <template #body-cell-idNumber="props">
        <q-td :auto-width="true" :props="props" class="q-gutter-xs">
          <q-btn color="primary" dense glossy icon="badge" push @click="simpleT4">
            <q-tooltip>
              <q-card>
                <q-card-section class="text-black">
                  身份证id信息
                </q-card-section>
                <q-card-section class="text-black">
                  身份证性别
                </q-card-section>
                <q-card-section class="text-black">
                  身份证有效期
                </q-card-section>
                <q-card-section class="text-black">
                  其他的信息
                </q-card-section>
              </q-card>
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>
      <template #body-cell-contact="props">
        <q-td :auto-width="true" :props="props" class="q-gutter-xs">
          <q-btn color="warning" dense glossy icon="contacts" push @click="simpleT4">
            <q-tooltip>
              <q-card>
                <q-card-section class="text-black">
                  QQ联系方式1及备注
                </q-card-section>
                <q-card-section class="text-black">
                  QQ联系方式2及备注
                </q-card-section>
                <q-card-section class="text-black">
                  微信联系方式及备注
                </q-card-section>
                <q-card-section class="text-black">
                  手机号联系方式1及备注
                </q-card-section>
                <q-card-section class="text-black">
                  手机号联系方式2及备注
                </q-card-section>
              </q-card>
            </q-tooltip>
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
