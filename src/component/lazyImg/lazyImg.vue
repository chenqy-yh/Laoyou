<template>
  <view
    class="main-content"
    :style="{
      width: props.width,
      height: props.height,
      'max-width': props.width,
      'max-height': props.height,
      'border-radius': props.radius,
      'animation-play-state': showSk || lock ? 'running' : 'paused',
    }"
  >
    <FadeTransiton :show="!showSk && !lock">
      <image class="img" @load="imgLoad" :src="imgSrc" :mode="imgMode"></image>
    </FadeTransiton>
  </view>
</template>

<script setup>
import FadeTransiton from "../transiton/fadeTransiton.vue";
import { onMounted, ref } from "vue";
const showSk = ref(true);
const lock = ref(true);
const props = defineProps({
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "200px",
  },
  radius: {
    type: String,
    default: "0px",
  },
  imgSrc: {
    type: String,
    default: "/static/img/photo.webp",
  },
  imgMode: {
    type: String,
    default: "aspectFill",
  },
});

const imgLoad = () => {
  showSk.value = false;
};

onMounted(() => {
  setTimeout(() => {
    lock.value = false;
  }, 1000);
});
</script>

<style lang="scss" scoped>
.main-content {
  overflow: hidden;
  background: #eee; /*从多少度开始，到25%是#eee,37%是#fff*/
  background-image: linear-gradient(90deg, #eee 25%, #fff 37%, #eee 63%);
  list-style: none;
  background-size: 400% 100%;
  background-position: 100% 50%;
  animation: loading 2s infinite; /*infinite规定动画播放无限次*/
  @keyframes loading {
    /*右下角 中间*/
    0% {
      background-position: 100% 50%;
    } /*左上角 中间*/
    50%,
    100% {
      background-position: 0 50%;
    }
  }
  .img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
