<template>
  <div class="login-container column justify-center">
    <div class="row justify-center">
      <form>
        <q-card bordered class="login-card shadow-24">
          <q-card-section>
            <div class="row items-center no-wrap">
              <div class="col text-h6 cursor-none" @click="adminMode=!adminMode">
                NJ抖音数据统计
              </div>
              <!--                <div class="col text-right">
                                <q-chip clickable color="grey" icon="directions" outline square text-color="white"
                                        @click="loginCancel">
                                  取消
                                </q-chip>
                              </div>-->
            </div>
          </q-card-section>
          <q-card-section>
            <q-input v-model="loginForm.username" :rules="[val => !!val || '必填']"
                     autocomplete clearable
                     label="账号" label-color="rgb(0 0 0 / 90%)" outlined
                     type="text">
              <template v-slot:prepend>
                <q-icon name="person_outline"/>
              </template>
            </q-input>
            <q-input id="pwd"
                     v-model="loginForm.pwd" :rules="[val => !!val || '必填']" autocomplete="false" class="q-mt-md"
                     clearable label="密码"
                     label-color="rgb(0 0 0 / 90%)"
                     outlined
                     type="password">
              <template v-slot:prepend>
                <q-icon name="vpn_key"/>
              </template>
            </q-input>
            <div class="q-pt-xs text-grey-4 text-right">
              <q-chip clickable
                      color="primary" icon="badge"
                      size="md" square text-color="white" @click="submitForm">{{ adminMode ? "管理员" : "" }}登录
              </q-chip>
            </div>
          </q-card-section>
        </q-card>
      </form>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref, watch} from "vue";
import {useQuasar} from "quasar";
import {useRoute, useRouter} from "vue-router";
import {useLoginUserStore} from "stores/login-user-store";
import {isEmptySequence} from "src/config";
import {userLoginApi} from "src/api/userApi";
import {adminLoginApi} from "src/api/adminApi";

const $q = useQuasar();
const route = useRoute();
const router = useRouter();


const emit = defineEmits([
  "closeLoginPage", "loginSuccess"
]);

const adminMode = ref(false);

const LoginUser = useLoginUserStore();

let loginForm = reactive({
  username: null,
  pwd: null
});

function loginCancel() {
  emit("closeLoginPage");
}

function submitForm() {
  if (isEmptySequence(loginForm.username) || isEmptySequence(loginForm.pwd)) {
    return;
  }
  let api = adminMode.value ? adminLoginApi : userLoginApi;
  api(loginForm.username, loginForm.pwd)
    .then((data) => {
      LoginUser.login(data.username, data.role, data.token);
      $q.notify({
        type: "positive",
        message: "登录成功"
      });

      emit("loginSuccess", data);
    });
}

$q.notify({
  color: "positive",
  message: adminMode.value ? "欢迎您，管理员" : "欢迎使用！"
});

watch(adminMode, (newV, oldV) => {
  $q.notify({
    color: "positive",
    message: newV ? "欢迎您，管理员" : "欢迎使用！"
  });
});

</script>

<style lang="sass" scoped>
@import "src/css/app.scss"
.login-bg
  position: absolute
  z-index: -1
  width: 100%
  height: 100%
  top: 0
  background: rgb(9 75 203 / 15%)

.login-container
  width: 100%
  height: 100vh
  background-image: url('/img/login/background.svg')
  background-repeat: no-repeat
  background-size: 100% 100%

  .login-card
    width: 352px
    background: rgb(255 255 255 / 80%)
    border: 1px solid $main
</style>
<style lang="sass">
.body--dark
  .login-container
    .login-card
      background: #00000069
</style>
