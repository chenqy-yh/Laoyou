<template>
  <view class="main-content">
    <!-- <CommonShare></CommonShare> -->
    <!-- <VideoShare></VideoShare> -->
    <FadeTransiton
      position="fixed"
      width="100vw"
      height="84vh"
      :show="choose_type_component === 'CommonShare'"
    >
      <CommonShare></CommonShare>
    </FadeTransiton>
    <FadeTransiton
      position="fixed"
      width="100vw"
      height="84vh"
      :show="choose_type_component === 'VideoShare'"
    >
      <VideoShare></VideoShare>
    </FadeTransiton>

    <view class="share-footer">
      <view class="share-type-list">
        <view
          class="type-item"
          :class="{
            active: item.active,
          }"
          @click="select_share_type(idx)"
          v-for="(item, idx) in share_type_list"
          :key="idx"
        >
          {{ item.name }}
        </view>
      </view>
      <button>发布</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { onReady, onHide, onShow } from "@dcloudio/uni-app";
import CommonShare from "./commonShare.vue";
import VideoShare from "./videoShare.vue";
import FadeTransiton from "../../component/transiton/fadeTransiton.vue";
const share_type_list = ref([
  {
    name: "帖子",
    active: true,
    component: "CommonShare",
  },
  {
    name: "视频",
    active: false,
    component: "VideoShare",
  },
]);

const choose_type_component = ref("CommonShare");

onShow(() => {
  console.log("show Tab");
  uni.hideTabBar();
});
onHide(() => {
  console.log("show Tab");
  uni.showTabBar();
});

// 选中分享类型
const select_share_type = (idx) => {
  share_type_list.value.forEach((item, index) => {
    if (index === idx) {
      item.active = true;
      choose_type_component.value = item.component;
    } else {
      item.active = false;
    }
  });
};
</script>

<style lang="scss" scoped>
.main-content {
  height: 100vh;
  box-sizing: border-box;
  background-color: #333;

  .share-footer {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 16vh;
    width: 100vw;
    box-sizing: border-box;
    padding-block: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-inline: 15px;

    .share-type-list {
      display: flex;
      justify-content: space-around;
      color: #aaa;
      font-size: 14px;
      font-weight: 500;
      .type-item {
        &.active {
          font-weight: 600;
          color: #fefefe;
          position: relative;
          &::before {
            content: "";
            position: absolute;
            left: 50%;
            bottom: -10px;
            transform: translateX(-50%);
            width: 30px;
            height: 2px;
            background-color: #fefefe;
            border-radius: 999px;
          }
        }
      }
    }
    button {
      box-sizing: border-box;
      width: 100%;
      height: 32px;
      line-height: 32px;
      font-size: 14px;
      background-color: #474f67;
      color: #fefefe;
    }
  }
}
</style>
