<template>
  <div ref="lottieBox" class="lottie-web full-height"></div>
</template>

<script>
import Lottie from "lottie-web";
import {onMounted, ref} from "vue";

export default {
  name: "lottie-web",
  props: ["animation", "path"],
  setup(props, {emit}) {
    let lottieBox = ref();
    let lottieObj = null;
    onMounted(() => {
      lottieObj = Lottie.loadAnimation({
        container: lottieBox.value,
        renderer: "svg",
        loop: true,
        speed: 1,
        animationData: props.animation,
        path: props.path
      });
      emit("isLottieFinish", true);
    });
    return {
      lottieBox,
      lottieObj
    };
  }
};
</script>

<style scoped>

</style>
