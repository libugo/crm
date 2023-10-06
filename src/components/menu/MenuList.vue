<template>
  <div class="menu-list">
    <q-list class="text-primary">
      <menu-item
        :item-list="verticalMenuListData"
        :indent-level="0"
        :role="role"/>
    </q-list>
  </div>
</template>
<script setup>
import MenuItem from "components/menu/MenuItem.vue";
import {useLoginUserStore} from "stores/login-user-store";
import {computed} from "vue";
import {verticalMenuListData} from "src/config";

const LoginUser = useLoginUserStore();
const role = computed(() => LoginUser.role);


</script>
<style lang="sass" scoped>
</style>
