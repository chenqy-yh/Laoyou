<template>
  <view
    class="main-content"
    :style="{
      width: props.size,
    }"
    @click="props.linkTo"
  >
    <LazyImg :width="props.size" height="180px"
    radius="10px"
    ></LazyImg>
    <view class="card-detail">
      <view class="card-title"> 怎么办在线等挺急的</view>
      <view class="card-footer">
        <view class="author-info">
          <image src="../../static/img/avatar.webp" class="avatar" />
          <view class="author_name"> 布朗熊 </view>
        </view>
        <view class="commit">
          <image src="../../static/icon/like_kx.png"></image>
          <view> 1.2万 </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import LazyImg from "../../component/lazyImg/lazyImg.vue";

const props = defineProps({
  size: {
    type: String,
    default: "100px",
  },
  linkTo: {
    type: Function,
    default: () => {},
  },
});
</script>

<style lang="scss" scoped>
.main-content {
  aspect-ratio: 1/1.5;
  display: grid;
  gap: 0px;
  background-color: #fefefe;
  .card-detail {
    display: flex;
    height: 100%;
    // padding-inline: 30rpx;
    flex-direction: column;
    // justify-content: space-between;
    padding: 15rpx;
    .card-title {
      // max-height: 30px;
      font-size: 12px;
      font-weight: 600;
    }
    .card-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 5px;
      .author-info {
        display: flex;
        align-items: center;
        image {
          border-radius: 50%;
        }
        .author_name {
          font-size: 10px;
          margin-left: 6px;
        }
      }
      .commit {
        display: flex;
        align-items: center;
      }
    }
  }
}
image {
  width: 16px;
  height: 16px;
}
</style>
