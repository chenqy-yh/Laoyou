<template>
  <view class="main-content">
    <div class="header">
      <TopTabBar></TopTabBar>
    </div>
    <scroll-view scroll-y="true" class="scroll-view">
      <view class="body">
        <Card size="100%" :link-to="linkTo"></Card>
        <Card size="100%" :link-to="linkTo"></Card>
        <Card size="100%" :link-to="linkTo"></Card>
        <Card size="100%" :link-to="linkTo"></Card>
        <Card size="100%" :link-to="linkTo"></Card>
        <Card size="100%" :link-to="linkTo"></Card>
        <Card size="100%" :link-to="linkTo"></Card>
        <Card size="100%" :link-to="linkTo"></Card>
        <Card size="100%" :link-to="linkTo"></Card>
        <Card size="100%" :link-to="linkTo"></Card>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import TopTabBar from "../../component/topTabBar/topTabBar.vue";
import Card from "../../component/card/card.vue";
import { onReady } from "@dcloudio/uni-app";
import { ref } from "vue";
const menu_button_pos = ref({
  height: 0,
  top: 0,
});

onReady(() => {
  const res = uni.getMenuButtonBoundingClientRect();
  menu_button_pos.value.top = res.top;
  menu_button_pos.value.height = res.height;
});

// to
const linkTo = () => {
  uni.navigateTo({
    url: "/pages/post/post",
    animationType: "fade-in",
    animationDuration: 1000,
  });
};
</script>

<style lang="scss" scoped>
:root {
  --main-content-padding: 50rpx 30rpx;
  --block-gap: 30rpx;
}
.main-content {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .header {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 99999;
    background-color: #fefefe;
  }
  .scroll-view {
    height: 100%;
  }
  .body {
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15rpx;
    padding: 15rpx;
  }
}
</style>
