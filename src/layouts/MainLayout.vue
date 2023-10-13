<template>
  <q-layout view="hHh LpR lFf">
    <q-header class="header bg-white text-primary" elevated reveal>
      <q-toolbar class="q-gutter-xs">
          <q-btn :color="mainLeftDrawer?'primary':($q.dark.isActive?'white':'black')" dense flat icon="menu" round
                 @click="leftDrawerControl"/>
        <q-input v-model="search" dense outlined>
          <template v-slot:append>
            <q-icon v-if="search === ''" name="search"/>
            <q-icon v-else class="cursor-pointer" name="clear" @click="search = ''"/>
          </template>
        </q-input>
        <q-space/>
        <q-btn :color="$q.dark.isActive?'primary':'black'"
               :flat="!($q.dark.isActive)"
               dense icon="nights_stay" round size="md"
               @click="changeDark"/>
        <q-btn v-if="LoginUser.user==null"
               class="bg-red text-white"
               dense
               label="离线"
               @click="needLogin()"/>
        <q-btn-dropdown v-else :label="LoginUser.user" color="primary" icon="account_circle" no-caps outline>
          <q-tabs vertical>
            <q-tab v-if="!LoginUser.adminLogin" v-close-popup @click="displayUserInfo">
              <div>个人设置</div>
            </q-tab>
            <q-tab v-close-popup exact label="修改密码" @click="updatePwd"/>
            <q-tab v-close-popup exact label="退出登录" @click="LoginUser.logout()"/>
          </q-tabs>
        </q-btn-dropdown>
      </q-toolbar>
      <tab-list @clearAllTab="clearAliveCache"/>
    </q-header>

    <q-drawer v-model="mainLeftDrawer" elevated>
      <menu-list/>
    </q-drawer>

    <q-page-container class="bg-light-main full-width full-height">
      <router-view v-if="routeViewAlive" v-slot="{ Component,route}">
        <transition mode="out-in" name="fade">
          <keep-alive>
            <component :is="Component" :key="route.fullPath" @need-login="needLogin"/>
          </keep-alive>
        </transition>
      </router-view>
      <fab-wheel-menu/>
    </q-page-container>
    <q-dialog v-model="loginDialogDisplay" maximized>
      <!--      <LoginPage @login-success="loginSuccess" @close-login-page="closeLoginPage" />-->
    </q-dialog>
    <q-dialog v-model="mainDialog.display" :maximized="true" persistent>
      <component :is="mainDialog.content" :default-data="mainDialog.data" class="flex flex-center"
                 @closeDialog="mainDialog.display=false"/>
    </q-dialog>
    <q-ajax-bar ref="bar" color="primary" position="bottom" size="3px"/>
  </q-layout>
</template>

<script setup>

import {useRouter} from "vue-router";
import {useQuasar} from "quasar";
import {useMenuOpenMapStore} from "stores/menu-open-map";
import {nextTick, onBeforeMount, reactive, ref} from "vue";
import {useLoginUserStore} from "stores/login-user-store";
import MenuList from "components/menu/MenuList.vue";
import TabList from "components/tab/TabList.vue";
import FabWheelMenu from "components/fab/FabWheelMenu.vue";
import {useSystemSettingStoreStore} from "stores/system-setting-store";

const $q = useQuasar();
const router = useRouter();

const menuOpenMapStore = useMenuOpenMapStore();
const mainLeftDrawer = ref(menuOpenMapStore.mainLeftDrawer);

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
  mainLeftDrawer.value = !mainLeftDrawer.value;
    menuOpenMapStore.mainLeftDrawer = mainLeftDrawer.value;
}

function logOut() {
  LoginUser.logout();
}

function displayUserInfo() {
  // mainDialog.content=markRaw(UserInfo)
  mainDialog.display = true
}

function clearAliveCache() {
  routeViewAlive.value = false
  nextTick(() => {
    routeViewAlive.value = true
    router.push("/")
  })
}

function changeDark() {
  $q.dark.toggle();
    LoginUser.updateDark($q.dark.isActive);
}

function init() {
    menuOpenMapStore.mainLeftDrawer = !($q.platform.is.mobile)

    $q.dark.set(LoginUser.dark)

    const systemStore = useSystemSettingStoreStore()
    systemStore.updateSystemColor()
}

onBeforeMount(() => {
    init()
})
</script>
<style lang="sass" scoped>
@import "src/css/quasar.variables"
.left-drawer-logo
  font-size: 1.3rem

.body--dark
  .header
    background: $dark-page !important
</style>
