<template>
  <view class="main-content">
    <CommonShare
      v-show="choose_type_component === 'CommonShare'"
      :height="100 - footerHeight + 'vh'"
    ></CommonShare>
    <VideoShare
      :height="100 - footerHeight + 'vh'"
      v-show="choose_type_component === 'VideoShare'"
    ></VideoShare>
    <view
      class="share-footer"
      :style="{
        height: footerHeight + 'vh',
      }"
    >
      <view class="share-type-list">
        <view
          class="type-item"
          :class="{
            active: item.active,
          }"
          @click="beginChangeShareTpyp(idx)"
          v-for="(item, idx) in share_type_list"
          :key="idx"
        >
          {{ item.name }}
        </view>
      </view>
      <button @click="todo">发布</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { onHide, onShow, onReady } from "@dcloudio/uni-app";
import CommonShare from "./commonShare.vue";
import VideoShare from "./videoShare.vue";
import { todo } from "../../utils/index.js";

const begin_selector = ref("");
const choose_type_component = ref("");
const footerHeight = ref("16");

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

onShow(() => {
  uni.hideTabBar();
});
onHide(() => {
  uni.showTabBar();
});

onReady(() => {
  share_type_list.value.forEach((item) => {
    if (item.active) {
      choose_type_component.value = item.component;
    }
  });
  uni.$on("share_data_empty", (res) => {
    if (res.is_empty) {
      // 当前share数据为空
      share_type_list.value.forEach((item) => {
        if (item.component === begin_selector.value) {
          item.active = true;
        } else {
          item.active = false;
        }
      });
      choose_type_component.value = begin_selector.value;
    } else {
      // 当前share数据为假
      uni.showActionSheet({
        itemList: ["清空数据"],
        success: (choose_idx) => {
          // 清空数据
          uni.$emit("clean_share_data", res.component);
          share_type_list.value.forEach((item) => {
            if (item.component === begin_selector.value) {
              item.active = true;
            } else {
              item.active = false;
            }
          });
          choose_type_component.value = begin_selector.value;
        },
        fail: () => {
          console.log("取消");
        },
      });
    }
  });
});

// 开始选择分享类型
const beginChangeShareTpyp = (idx) => {
  begin_selector.value = share_type_list.value[idx].component;
  uni.$emit("share_is_empty", choose_type_component.value);
};
</script>

<style lang="scss" scoped>
.tttt {
  position: fixed;
  top: 0;
  left: 0;
  color: red;
  font-size: 30px;
}
.main-content {
  height: 100vh;
  box-sizing: border-box;
  background-color: #333;

  .share-footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100vw;
    box-sizing: border-box;
    padding-block: 15px 10px;
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
