<!-- <template>
  <view
    class="main-content"
    :style="{
      'animation-play-state': show ? 'running' : 'paused',
      'animation-duration': duration,
    }"
  >
    <slot></slot>
  </view>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  duration: {
    type: String,
    default: "0.5s",
  },
});
</script>

<style lang="scss" scoped>
.main-content {
  width: 100%;
  height: 100%;
  opacity: 0;
  animation: fade forwards;
}
@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style> -->

<template>
  <view
    class="main-content"
    :style="{
      'animation-play-state': play_anim ? 'running' : 'paused',
      'animation-duration': props.duration,
    }"
  >
    <slot></slot>
  </view>
</template>

<script setup>
import { watch, ref, onMounted } from "vue";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  duration: {
    type: String,
    default: "0.6s",
  },
});

const play_anim = ref(false);
const anim_duration = ref(0);

watch(
  () => props.show,
  () => {
    play_anim.value = true;
    setTimeout(() => {
      play_anim.value = false;
    }, anim_duration.value / 2);
  }
);

onMounted(() => {
  anim_duration.value = parseFloat(props.duration) * 1000;
});
</script>

<style lang="scss" scoped>
.main-content {
  width: 100%;
  height: 100%;
  opacity: 0;
  animation: fade infinite;
}
@keyframes fade {
  from {
    opacity: 0;
  }
  60% {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
