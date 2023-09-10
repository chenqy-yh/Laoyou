<template>
  <view
    :animation="anim_data"
    class="main-content"
    @click.stop="change_like"
  >
    <image
      class="icon"
      :src="like ? likeUrl : unLikeUrl"
      mode="aspectFit"
      :style="{
        'animation-play-state': play ? 'running' : 'paused',
      }"
    >
    </image>
  </view>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  likeUrl: {
    type: String,
    default: "/static/icon/like_sx.png",
  },
  unLikeUrl:{
    type:String,
    default:"/static/icon/like_kx.png",
  }
});

const like = ref(false);
const play = ref(false);
const anim_data = ref(false);
// const like_url = "/static/icon/like_sx.png";
// const unlike_url = "/static/icon/like_kx.png";
const change_like = () => {
  const animation = uni.createAnimation({
    duration: 250,
    timingFunction: "ease",
  });
  animation.scale(0.7, 0.7).opacity(0).step();
  anim_data.value = animation.export();
  setTimeout(() => {
    like.value = !like.value;
    animation.scale(1, 1).opacity(1).step();
    anim_data.value = animation.export();
  }, 250);
};

</script>

<style lang="scss" scoped>
.main-content {
  height: max-content;
  width: max-content;

  .icon {
    width: 25px;
    height: 25px;
    animation: like 0.5s ease-in-out infinite;
    animation-play-state: paused;
    @keyframes like {
      from {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(0.7);
        opacity: 0;
      }
      to {
        transform: scale(1);
        opacity: 1;
      }
    }
  }
}
</style>
