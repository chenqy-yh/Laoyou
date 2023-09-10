<template>
  <view
    class="main-content"
    :style="{
      'padding-top': menu_button_pos.top,
      height: menu_button_pos.height,
    }"
  >
    <image class="logo" src="../../static/icon/logo.png"> </image>
    <swiper
      class="swiper-list"
      :indicator-dots="false"
      :autoplay="false"
      display-multiple-items="1"
      @change="onChange"
      :current="1"
      previous-margin="40px"
      next-margin="40px"
    >
      <swiper-item v-for="item in tab_list" :key="item.id">
        <view
          class="swiper-item"
          :style="{
            'font-weight': item.active ? 600 : 400,
          }"
          >{{ item.name }}</view
        >
      </swiper-item>
    </swiper>
    <view class="search-btn"></view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onReady } from "@dcloudio/uni-app";
const tab_list = ref([
  { name: "关注", id: "item-1" },
  { name: "推荐", id: "item-2", active: true },
  { name: "公告", id: "item-3" },
  {
    name: "tab1",
    id: "item-4",
  },
  {
    name: "tab2",
    id: "item-5",
  },
  {
    name: "tab3",
    id: "item-6",
  },
]);
const menu_button_pos = ref({
  height: "0px",
  top: "0px",
});

const onChange = (e) => {
  tab_list.value.forEach((item, idx) => {
    item.active = idx == e.detail.current ? true : false;
  });
};

onReady(() => {
  const res = uni.getMenuButtonBoundingClientRect();
  menu_button_pos.value.top = res.top + "px";
  menu_button_pos.value.height = res.height + "px";
});
</script>

<style lang="scss" scoped>
.main-content {
  --common-height: 32px;
  --item-width: 40px;
  padding-inline: 30rpx;
  font-weight: 600;
  display: grid;
  grid-template-columns: 55px 125px 30px;
  .logo {
    width: 50px;
    height: 25px;
  }

  .swiper-list {
    height: var(--common-height);
    width: calc(var(--item-width) * 3);
    position: relative;
    .swiper-item {
      display: block;
      height: var(--common-height);
      line-height: var(--common-height);
      text-align: center;
      font-size: 14px;
    }
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: var(--item-width);
      height: 100%;
      background: linear-gradient(to right, #ffffff, #ffffffbb, transparent);
      z-index: 333;
    }
    &::after {
      content: "";
      position: absolute;
      right: 0;
      top: 0;
      width: var(--item-width);
      height: 100%;
      background: linear-gradient(to left, #ffffff, #ffffffbb, transparent);
      z-index: 333;
    }
  }
  .search-btn {
    width: 30px;
    height: 30px;
    border-radius: 0;
    background-image: url(../../static/icon/search.png);
    background-size: contain;
    background-color: transparent;
    background-repeat: no-repeat;
    transform: scale(0.7);
  }
}
</style>
