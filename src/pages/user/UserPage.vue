<script setup>

import {reactive, ref} from "vue";
import {useQuasar} from "quasar";
import DialogList from "components/dialog/DialogList.vue";

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
    <q-card v-if="fullFilterControl.status" class="q-mb-md bg-grey-11">
      <q-card-section>
        <q-card>
          <q-card-section>
            <div class="text-h6">
              内部信息
            </div>
            <div class="q-gutter-sm row">
              <q-input v-model="fullFilterControl.userId" clearable dense label="用户id" outlined/>
              <q-btn-toggle v-model="fullFilterControl.readStatus"
                            :options="[{label: '全部', value: null},{label: '客户', value: 0},{label: 'VIP', value: 1},{label: '机密', value: 2}]"
                            push toggle-color="primary"/>
              <q-input v-model="fullFilterControl.character" clearable dense label="性格特点" outlined/>
            </div>
          </q-card-section>
        </q-card>
      </q-card-section>
      <q-card-section>
        <q-card>
          <q-card-section>
            <div class="text-h6">
              身份证信息
            </div>
            <div class="q-gutter-sm row">
              <q-input v-model="fullFilterControl.userId" clearable dense label="姓名" outlined/>
              <q-btn-toggle v-model="fullFilterControl.readStatus"
                            :options="[{label: '全部', value: null},{label: '男', value: false},{label: '女', value: true}]"
                            push toggle-color="primary"/>
              <q-input v-model="fullFilterControl.character" clearable dense label="民族" outlined/>
              <q-input v-model="fullFilterControl.character" clearable dense label="号码" outlined/>
              <q-input v-model="fullFilterControl.character" clearable dense label="出生年月日" outlined/>
              <q-input v-model="fullFilterControl.character" clearable dense label="住址" outlined/>
            </div>
          </q-card-section>
        </q-card>
      </q-card-section>
      <q-card-section>
        <q-card>
          <q-card-section>
            <div class="text-h6">
              联系方式信息
            </div>
            <div class="q-gutter-sm row">
              <q-btn-toggle v-model="fullFilterControl.readStatus"
                            :options="[{label: '全部', value: null},{label: 'QQ', value: 0},{label: '微信', value: 1},{label: '手机号', value: 2}]"
                            push toggle-color="primary"/>
              <q-input v-model="fullFilterControl.character" clearable dense label="内容" outlined/>
              <q-input v-model="fullFilterControl.character" clearable dense label="备注" outlined/>
            </div>
          </q-card-section>
        </q-card>
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
