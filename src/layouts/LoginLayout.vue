<template>
  <q-layout view="hHh LpR fff">
    <q-page-container class="preview">
      <router-view @login-success="loginSuccess"/>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";

const router = useRouter();
const route = useRoute();

function loginSuccess() {
  router.push("/");
}

</script>

<style lang="scss" scoped>
</style>
