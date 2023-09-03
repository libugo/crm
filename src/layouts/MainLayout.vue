<template>
  <q-layout view="lHh LpR lFf">
    <q-header class="q-mx-sm q-mt-sm bg-grey-2 text-black" elevated reveal>
      <q-toolbar>
        <q-btn dense flat icon="menu"
               round
               @click="leftDrawerControl"
        />
        <q-space/>

        <!--        <q-btn v-if="adminLogin" class="q-ma-sm" color="grey-8" flat icon="notifications" round>
                  <q-badge color="red" floating text-color="white">
                    2
                  </q-badge>
                  <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">Notifications</q-tooltip>
                </q-btn>-->
        <q-btn v-if="LoginUser.user==null" class="bg-red text-white" label="已离线" @click="needLogin()"/>
        <q-btn-dropdown v-else :label="LoginUser.user" color="main"
                        icon="account_circle" no-caps outline>
          <q-tabs vertical>
            <!--            <q-tab v-if="!LoginUser.adminLogin" @click="getUserBalance">
                          <div>余额:<span v-if="balance!=null">{{ balance }}</span>
                            <q-spinner-tail v-else color="main"
                                            size="sm"
                            />
                          </div>
                        </q-tab>-->

            <q-tab v-if="!LoginUser.adminLogin" v-close-popup @click="displayUserInfo">
              <div>个人设置</div>
            </q-tab>
            <q-tab
              v-close-popup
              exact
              label="修改密码"
              @click="updatePwd"
            />
            <q-tab
              v-close-popup
              exact
              label="退出登录"
              @click="LoginUser.logout()"
            />
          </q-tabs>
        </q-btn-dropdown>
      </q-toolbar>
      <div class="q-mb-xs q-ma-xs bread-crumbs">
        <q-btn-group v-for="item in routeTabListStore.list" :key="item.name"
                     class="tab-btn-group" outline>
          <q-btn :color="$route.path===item.path?'main':'grey'" :label="item.title" :to="item.path" outline/>
          <q-btn :color="$route.path===item.path?'main':'grey'" class="q-mr-xs" dense icon="close" outline size="sm"
                 @click="routeTabClose(item.name)"/>
        </q-btn-group>
      </div>
    </q-header>

    <q-drawer
      v-model="mainLeftDrawer"
      elevated>
      <div class="left-drawer-logo text-main q-pa-md flex flex-center">
        车小明-效率CRM
      </div>
      <menu-list/>
    </q-drawer>

    <q-page-container class="bg-light-main full-width full-height">
      <!--      <router-view v-slot="{ Component }">
              <keep-alive v-if="viewPlay">
                <component :is="Component" :key="$route.fullPath" :user-info="userInfo" @need-login="needLogin" />
              </keep-alive>
            </router-view>-->
      <router-view :user-info="userInfo" @need-login="needLogin"/>
    </q-page-container>
    <q-dialog v-model="loginDialogDisplay" maximized>
      <!--      <LoginPage @login-success="loginSuccess" @close-login-page="closeLoginPage" />-->
    </q-dialog>

    <q-dialog v-model="mainDialog.display" :maximized="true" persistent>
      <component :is="mainDialog.content" :default-data="mainDialog.data"
                 class="flex flex-center"
                 @closeMainDialog="closeMainDialog"/>
    </q-dialog>
    <q-ajax-bar
      ref="bar"
      color="main"
      position="bottom"
      size="3px"
    />
  </q-layout>
</template>

<script setup>

import {useRouter} from "vue-router";
import {useQuasar} from "quasar";
import {useMenuOpenMapStore} from "stores/menu-open-map";
import {useRouteTabListStore} from "stores/route-tab-list";
import {reactive, ref} from "vue";
import {useLoginUserStore} from "stores/login-user-store";
import MenuList from "components/menu/MenuList.vue";

const $q = useQuasar();
const router = useRouter();

const menuOpenMapStore = useMenuOpenMapStore();
const routeTabListStore = useRouteTabListStore();
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

function routeTabClose(name) {
  routeTabListStore.remove(name);
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

/*else if (LoginUser.role === 0) {
  getUserBalance();
}*/
initMenu()
</script>
<style lang="sass" scoped>
.left-drawer-logo
  font-size: 1.3rem

.bread-crumbs
  white-space: nowrap
  overflow-x: auto
</style>
