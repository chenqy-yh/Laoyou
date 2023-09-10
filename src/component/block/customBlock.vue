<template>
  <view
    class="main-content"
    :style="{
      height: props.height,
      margin: props.margin,
    }"
  >
    <view class="title" :style="props.titleStyle">{{ title }}</view>
    <slot></slot>
  </view>
</template>

<script setup>
const props = defineProps({
  height: {
    type: String,
    default: "max-content",
  },
  margin: {
    type: String,
    default: "20px 0px",
  },
  title: {
    type: String,
    default: "Title",
  },
  titleStyle: {
    type: Object,
    default: {},
  },
});
</script>

<style lang="scss" scoped>
.main-content {
  box-sizing: border-box;
  width: 100%;
  border-radius: 3px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  padding-inline: 10px;
  padding-block: 10px 20px;
  display: flex;
  flex-direction: column;

  .title {
    font-weight: 600;
    font-size: 13px;
  }
}
</style>
