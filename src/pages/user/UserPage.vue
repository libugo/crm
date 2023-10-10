<script setup>

import {reactive, ref} from "vue";
import {useQuasar} from "quasar";
import DialogList from "components/dialog/DialogList.vue";
import TableControl from "components/TableControl.vue";

const $q = useQuasar()

const columns = [
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

const dialogList = ref()

/**
 * @deprecated 使用动态组件列表代替
 * @type {UnwrapNestedRefs<{data: null, display: boolean, content: null}>}
 */
const tableMainDialog = reactive({
  display: false,
  content: null,
  data: null
})

const simpleFilterControl = reactive({
  search: null,
  readStatus: null,
  dateSelect: null,
  auditStatus: null
});

const fullFilterControl = reactive({
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

function simpleT4() {
  $q.notify("点击后弹窗详细显示相关信息")
}

/*function viewDetail(content){
  tableMainDialog.data = content
  tableMainDialog.content = markRaw(UserDetailView)
  tableMainDialog.display = true
}*/

function viewDetail(userId) {
  dialogList.value.addDialog('userDetail', 'UserDetailView', userId)
}

function viewIdCard(userId) {
  dialogList.value.addDialog('UserIdCard', 'UserIdCardView', userId)
}

function viewContact(userId) {
  dialogList.value.addDialog('UserContact', 'UserContactView', userId)
}
</script>

<template>
  <q-page class="user-page normal-page">
    <table-control>
    </table-control>
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
      @request="getTableRows">
      <template #body-cell-control="props">
        <q-td :auto-width="true" :props="props" class="q-gutter-xs">
          <q-btn color="primary" dense glossy icon="ballot" push @click="viewDetail(props.row.userId)">
            <q-tooltip>详情</q-tooltip>
          </q-btn>
          <q-btn color="warning" dense glossy icon="edit" push @click="editLead(props.row)">

          </q-btn>
          <q-btn color="negative" dense glossy icon="delete" push @click="delLead(props.row.leadId)">

          </q-btn>
        </q-td>
      </template>
      <template #body-cell-idNumber="props">
        <q-td :auto-width="true" :props="props" class="q-gutter-xs">
          <q-btn color="primary" dense glossy icon="badge" push @click="viewIdCard(props.row.userId)">
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
          <q-btn color="warning" dense glossy icon="contacts" push @click="viewContact(props.row.userId)">
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
    <dialog-list ref="dialogList"/>
  </q-page>
</template>

<style lang="sass" scoped>
</style>
