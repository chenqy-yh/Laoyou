<template>
  <view
    class="main-content"
    :style="{
      'padding-top': menu_button_pos.top + 'px',
    }"
  >
    <!-- top-header -->
    <view
      class="top-header"
      :style="{
        width: 'calc(100% - ' + (menu_button_pos.width + 10) + 'px)',
      }"
    >
      <SmallButton icon="/static/icon/customer.png"></SmallButton>
      <SmallButton icon="/static/icon/setting.png"></SmallButton>
    </view>

    <!-- personal info -->
    <view class="personal-info-block">
      <view class="simple-record">
        <LazyImg
          width="40px"
          height="40px"
          img-src="https://images.unsplash.com/photo-1640951613773-54706e06851d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"
          radius="50%"
        ></LazyImg>
        <view class="person-simple-info">
          <view class="person-name"> 老友_0909 </view>
          <view class="time-record"> 加入老友16天 </view>
        </view>
      </view>
      <view class="other-record">
        <view
          v-for="(item, idx) in other_record"
          class="record-item"
          :key="idx"
        >
          <view @click="todo">
            {{ item.value }}
          </view>
          <view>
            {{ item.name }}
          </view>
        </view>
      </view>
    </view>
    <view>
      <CustomBlock
        title="我的应用"
        :title-style="{
          'margin-bottom': '10px',
        }"
      >
        <view class="app-list">
          <view
            v-for="(item, idx) in app_list"
            :key="idx"
            class="app-item"
            @click="linkTo(item.url)"
          >
            <SmallButton :icon="item.icon" size="35px"></SmallButton>
            <view class="app-name">{{ item.name }}</view>
          </view>
        </view>
      </CustomBlock>
    </view>
  </view>
</template>

<script setup>
import SmallButton from "../../component/button/smallButton.vue";
import LazyImg from "../../component/lazyImg/lazyImg.vue";

import { todo } from "../../utils/index.js";
import { onReady } from "@dcloudio/uni-app";
import { ref } from "vue";
import CustomBlock from "../../component/block/customBlock.vue";

const other_record = [
  {
    name: "主题",
    value: 1,
  },
  {
    name: "回帖",
    value: 1,
  },
  {
    name: "打卡",
    value: 10,
  },
];

const menu_button_pos = ref({
  height: 0,
  top: 0,
  left: 0,
  width: 0,
});

const app_list = [
  {
    name: "健康监测",
    icon: "/static/icon/health.png",
    url: "/pages/health/health",
  },
  {
    name: "天气",
    icon: "/static/icon/weather.png",
    url: "/pages/weather/weather",
  },
  {
    name: "在线学期",
    icon: "/static/icon/learn.png",
    url: "/pages/learn/learn",
  },
];

onReady(() => {
  const res = uni.getMenuButtonBoundingClientRect();
  menu_button_pos.value.top = res.top;
  menu_button_pos.value.height = res.height;
  menu_button_pos.value.left = res.left;
  menu_button_pos.value.width = res.width;
});

// function
const linkTo = (url) => {
  uni.navigateTo({
    url,
  });
};
</script>

<style lang="scss" scoped>
.main-content {
  box-sizing: border-box;
  padding-inline: 15px;
  min-height: 100vh;
  .top-header {
    display: flex;
    justify-content: flex-end;
  }
  .personal-info-block {
    display: flex;
    flex-direction: column;
    .simple-record {
      display: flex;
      align-items: center;
      .person-simple-info {
        box-sizing: border-box;
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .person-name {
          font-weight: 600;
        }
        .time-record {
          font-size: 10px;
          color: #999;
        }
      }
    }
    .other-record {
      margin-top: 10px;
      display: flex;
      justify-content: space-around;
      .record-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        view:nth-child(2) {
          color: #999;
          font-size: 12px;
        }
      }
    }
  }
  .app-list {
    display: flex;

    .app-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      .app-name {
        font-size: 10px;
        color: #999;
      }
      //除了最后一个元素其他的带边框
      &:not(:last-child) {
        margin-right: 10px;
      }
    }
  }
}
</style>
