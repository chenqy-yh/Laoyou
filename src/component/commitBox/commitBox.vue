<template>
  <view
    class="container mask-fade-out"
    v-if="show"
    @click="click_mask"
    :style="{
      'animation-play-state': fade_out ? 'running' : 'paused',
    }"
  >
    <view class="main-content">
      <CommentInput></CommentInput>
    </view>
  </view>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import CommentInput from "../commentInput/commentInput.vue";
import { onReady } from "@dcloudio/uni-app";

const fade_out = ref(false);

const show = ref(false);

const emits = defineEmits(["update:show"]);

const click_mask = (e) => {
  fade_out.value = true;
  setTimeout(() => {
    uni.$emit("closeCommentBox", null);
    fade_out.value = false;
    show.value = false;
  }, 300);
};

onReady(() => {
  uni.$on("showCommentBox", () => {
    show.value = true;
  });
});
</script>

<style lang="scss" scoped>
.container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9997;
  animation: fade-in 0.3s ease-in-out forwards;
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}

.slide-Out {
  animation: slideOut 0.3s ease-in-out forwards;
  animation-play-state: paused;
  @keyframes slideOut {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(100%);
    }
  }
}

.mask-fade-out {
  animation: fade-out 0.3s ease-in-out forwards;
  animation-play-state: paused;
  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
}

.main-content {
  position: fixed;
  bottom: 0px;
  left: 0;
  // border: 1px solid red;
  width: 100%;
  z-index: 9999;
  box-sizing: border-box;
  padding-inline: 10px;
  padding-block: 15px;
  z-index: 9998;
  background-color: #fefefe;
  animation: slideInFromBottom 0.3s ease-in-out forwards;

  @keyframes slideInFromBottom {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0);
    }
  }

  .mask {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: red;
    z-index: 9998;
  }
}
</style>
