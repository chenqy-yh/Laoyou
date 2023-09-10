<template>
  <view class="main-content" :animation="anim_data">
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

const anim_duration = ref(0);
const anim_data = ref({});

watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      const animation = uni.createAnimation({
        duration: anim_duration.value,
        timingFunction: "ease",
      });
      animation.opacity(1).step();
      anim_data.value = animation.export();
    } else {
      const animation = uni.createAnimation({
        duration: anim_duration.value,
        timingFunction: "ease",
      });
      animation.opacity(0).step();
      anim_data.value = animation.export();
    }
  },
  {
    immediate: true,
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
}
</style>
