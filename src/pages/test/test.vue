<template>
  <view class="main-content">
    <LikeButton></LikeButton>
  </view>
</template>

<script setup>
import LikeButton from "../../component/button/likeButton.vue";
</script>

<style lang="scss" scoped>
  .main-content {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>
