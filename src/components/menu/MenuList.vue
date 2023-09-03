<template>
  <div class="menu-list">
    <q-list class="text-primary">
      <menu-item
        :indent-level="0"
        :item-list="menuList"
        :role="role"/>
    </q-list>
  </div>
</template>
<script setup>
import MenuItem from "components/menu/MenuItem.vue";
import {useMenuOpenMapStore} from "stores/menu-open-map";
import {useLoginUserStore} from "stores/login-user-store";
import {computed} from "vue";

const LoginUser = useLoginUserStore();
const role = computed(() => LoginUser.role);

const menuOpenMap = useMenuOpenMapStore();
const menuList = [
  {path: "/", name: "home", meta: {title: "工作台", icon: "home", role: 0}},
  {path: "/data", name: "home", meta: {title: "数据管理", icon: "storage", role: 0}},
  {path: "/withdrawal", name: "withdrawal", meta: {title: "提现管理", icon: "price_check", role: 0}},
  // {path: "/audit", name: "audit", meta: {title: "数据审核", icon: "task", role: 0}},
  {
    name: "role", meta: {title: "账户管理", icon: "supervisor_account", role: 1, open: menuOpenMap.get("role")},
    children: [
      {path: "/user", name: "用户", meta: {title: "用户", icon: "person_outline", role: 0}},
    ]
  },
  // { path: "/person", name: "person", meta: { title: "个人信息", icon: "badge", role: 0 } }
];
</script>
<style lang="sass" scoped>
</style>
