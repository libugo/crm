<template>
  <q-page class="full-width full-height normal-page bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div class="zero">
        404
      </div>

      <div class="text-h2" style="opacity:.4">
        请求的页面不存在
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        label="首页"
        no-caps
        text-color="blue"
        to="/"
        unelevated
      />
    </div>
  </q-page>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "ErrorNotFound"
});
</script>

<style lang="sass" scoped>
.zero
  transform: rotateY(0deg)
  animation: rotateY 2s linear infinite
  font-size: 30vh
</style>
