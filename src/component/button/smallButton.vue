<template>
  <view class="main-content" @click="click">
    <button
      :style="{
        background: 'url(' + icon + ')',
        backgroundSize: '70%  70%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        'background-color': props.backgroundColor,
        borderRadius: props.radius,
        width: props.size,
        height: props.size,
      }"
    ></button>
  </view>
</template>

<script setup>
const props = defineProps({
  icon: {
    type: String,
    default: "../../static/icon/at.png",
  },
  radius: {
    type: String,
    default: "50%",
  },
  size: {
    type: String,
    default: "28px",
  },
  backgroundColor: {
    type: String,
    default: "transparent",
  },
  click: {
    type: Function,
    default: () => {},
  },
});
</script>

<style lang="scss" scoped>
.main-content {
  button {
    margin: 0;
    padding: 0;
  }
}
</style>
