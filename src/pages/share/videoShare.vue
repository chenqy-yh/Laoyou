<template>
  <view
    class="main-content"
    :style="{
      'padding-top': menu_button_pos.top + 'px',
    }"
  >
    <view
      class="header"
      :style="{
        height: menu_button_pos.height + 'px',
      }"
    >
      <SmallButton icon="/static/icon/close.png" :click="back"></SmallButton>
    </view>
    <view class="share-title">
      <input
        type="text"
        maxlength="15"
        placeholder="分享你的心情,观点和经历..."
        v-model="share_title"
      />
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { onReady, onHide } from "@dcloudio/uni-app";
import SmallButton from "../../component/button/smallButton.vue";
const menu_button_pos = ref({
  height: 0,
  top: 0,
  left: 0,
  width: 0,
});
const share_title = ref("");

onReady(() => {
  const res = uni.getMenuButtonBoundingClientRect();
  menu_button_pos.value.top = res.top;
  menu_button_pos.value.height = res.height;
  menu_button_pos.value.left = res.left;
  menu_button_pos.value.width = res.width;
  uni.hideTabBar();
});

onHide(() => {
  // clear data
  pic_list.value = [];
  pic_id.value = 0;
  share_title.value = "";
  share_content.value = "";
});

//function

const back = () => {
  uni.switchTab({
    url: "/pages/index/index",
  });
};
</script>

<style lang="scss" scoped>
.main-content {
  height: 84vh;
  padding-inline: 10px;
  box-sizing: border-box;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: #fefefe;
  .header {
    // border: 1px solid red;
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    position: relative;
    &::before {
      content: "视频";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-weight: 600;
    }
  }
  .share-title {
    // border: 1px solid red;
    padding-block: 5px;
    border-bottom: 1px solid #eee;
  }
}
</style>
