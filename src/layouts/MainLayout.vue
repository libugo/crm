<template>
  <q-layout view="hHh LpR lFf">
    <q-header class="bg-white text-black" elevated reveal>
      <q-toolbar>
        <q-btn dense flat icon="menu" round @click="leftDrawerControl"/>
        <q-input v-model="search" class="q-mr-sm" dense outlined>
          <template v-slot:append>
            <q-icon v-if="search === ''" name="search"/>
            <q-icon v-else class="cursor-pointer" name="clear" @click="search = ''"/>
          </template>
        </q-input>
        <q-space/>
        <q-btn v-if="LoginUser.user==null" class="bg-red text-white" label="已离线" @click="needLogin()"/>
        <q-btn-dropdown v-else :label="LoginUser.user" color="main" icon="account_circle" no-caps outline>
          <q-tabs vertical>
            <q-tab v-if="!LoginUser.adminLogin" v-close-popup @click="displayUserInfo">
              <div>个人设置</div>
            </q-tab>
            <q-tab v-close-popup exact label="修改密码" @click="updatePwd"/>
            <q-tab v-close-popup exact label="退出登录" @click="LoginUser.logout()"/>
          </q-tabs>
        </q-btn-dropdown>
      </q-toolbar>
      <tab-list/>
    </q-header>

    <q-drawer v-model="mainLeftDrawer" elevated>
      <menu-list @menuClick="flushRoute"/>
    </q-drawer>

    <q-page-container class="bg-light-main full-width full-height">
      <router-view v-if="routeViewAlive" v-slot="{ Component,route}">
        <transition mode="out-in" name="fade">
          <keep-alive>
            <component :is="Component" :key="route.fullPath" @need-login="needLogin"/>
          </keep-alive>
        </transition>
      </router-view>
      <page-drag-fab>
        <q-fab-action color="primary" icon="person" label="客户登记" @click="onClick"/>
        <q-fab-action color="primary" icon="real_estate_agent" label="中介登记" @click="onClick"/>
        <q-fab-action color="primary" icon="attach_money" label="生意跟单" @click="onClick"/>
        <q-fab-action color="primary" icon="key" label="创建话术" @click="onClick"/>
      </page-drag-fab>
    </q-page-container>
    <q-dialog v-model="loginDialogDisplay" maximized>
      <!--      <LoginPage @login-success="loginSuccess" @close-login-page="closeLoginPage" />-->
    </q-dialog>
    <q-dialog v-model="mainDialog.display" :maximized="true" persistent>
      <component :is="mainDialog.content" :default-data="mainDialog.data" class="flex flex-center"
                 @closeMainDialog="closeMainDialog"/>
    </q-dialog>
    <q-ajax-bar ref="bar" color="main" position="bottom" size="3px"/>
  </q-layout>
</template>

<script setup>

import {useRouter} from "vue-router";
import {useQuasar} from "quasar";
import {useMenuOpenMapStore} from "stores/menu-open-map";
import {reactive, ref} from "vue";
import {useLoginUserStore} from "stores/login-user-store";
import MenuList from "components/menu/MenuList.vue";
import PageDragFab from "components/PageDragFab.vue";
import TabList from "components/tab/TabList.vue";

const $q = useQuasar();
const router = useRouter();

const menuOpenMapStore = useMenuOpenMapStore();
const mainLeftDrawer = ref(menuOpenMapStore.statusMap.mainLeftDrawer);

const LoginUser = useLoginUserStore();
/*const balance = ref();*/

let mainDialog = reactive({
  display: false,
  content: null,
  data: null
});

const loginDialogDisplay = ref(false),
  userInfo = ref(),
  cancelCallback = ref(null)

const search = ref('')

const routeViewAlive = ref(true)

function needLogin(callback = null) {
  cancelCallback.value = callback;
  loginDialogDisplay.value = true;
}

function loginSuccess() {
  loginDialogDisplay.value = false;
  userInfo.value = LoginUser;
  router.go(0)
}

function updatePwd() {
  // mainDialog.content = markRaw(LoginUser.adminLogin ? AdminUpdatePwd : UserUpdatePwd);
  mainDialog.display = true;
}

function closeMainDialog(refresh) {
  mainDialog.display = false;
  if (refresh) {
    router.go(0);
  }
}

function closeLoginPage() {
  if (cancelCallback.value != null) {
    cancelCallback.value();
    cancelCallback.value = null;
  }
  loginDialogDisplay.value = false;
}

function leftDrawerControl() {
  menuOpenMapStore.inverse("mainLeftDrawer");
  mainLeftDrawer.value = !mainLeftDrawer.value;
}

function logOut() {
  LoginUser.logout();
}

function displayUserInfo() {
  // mainDialog.content=markRaw(UserInfo)
  mainDialog.display = true
}

function initMenu() {
  menuOpenMapStore.put("mainLeftDrawer", !($q.platform.is.mobile))
}

function flushRoute() {
  /*  routeViewAlive.value=false
    nextTick(()=>{
      routeViewAlive.value=true
    })*/
}

/*else if (LoginUser.role === 0) {
  getUserBalance();
}*/
initMenu()
</script>
<style lang="sass" scoped>
.left-drawer-logo
  font-size: 1.3rem
</style>
