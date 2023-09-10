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
    <view class="content-body">
      <textarea
        class="tt"
        placeholder="输入正文(选填)"
        placeholder-style="font-size:13px"
        maxlength="50"
        v-model="share_content"
      ></textarea>
      <view class="pic-list">
        <view class="container" v-for="(item, idx) in pic_list" :key="idx">
          <image
            class="close-btn"
            src="/static/icon/cancel.png"
            @click="del_pic(idx)"
          ></image>

          <LazyImg
            :img-src="item.url"
            width="calc((100vw - 20px)/3 - 10px)"
            height="calc((100vw - 20px)/3 - 10px)"
          ></LazyImg>
        </view>

        <SmallButton
          v-if="pic_list.length < 9"
          icon="/static/icon/plus.png"
          background-color="#f4f4f4"
          radius="0"
          size="calc((100vw - 20px)/3 - 10px)"
          :click="add_pic"
        ></SmallButton>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { onReady, onHide } from "@dcloudio/uni-app";
import SmallButton from "../../component/button/smallButton.vue";
import LazyImg from "../../component/lazyImg/lazyImg.vue";

const menu_button_pos = ref({
  height: 0,
  top: 0,
  left: 0,
  width: 0,
});
const pic_list = ref([]);
const share_title = ref("");
const share_content = ref("");

const add_pic = () => {
  // console.log("add_pic");

  pic_list.value.push({
    url: "https://images.unsplash.com/photo-1682687982360-3fbab65f9d50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=600&q=60",
  });
};

onReady(() => {
  const res = uni.getMenuButtonBoundingClientRect();
  menu_button_pos.value.top = res.top;
  menu_button_pos.value.height = res.height;
  menu_button_pos.value.left = res.left;
  menu_button_pos.value.width = res.width;
  // uni.hideTabBar();
});

onHide(() => {
  // clear data
  pic_list.value = [];
  share_title.value = "";
  share_content.value = "";
});

//function

const del_pic = (idx) => {
  pic_list.value.splice(idx, 1);
};

const back = () => {
  uni.switchTab({
    url: "/pages/index/index",
  });
};
</script>

<style lang="scss" scoped>
.main-content {
  height: 100vh;
  padding-inline: 10px;
  box-sizing: border-box;
  .header {
    // border: 1px solid red;
    display: flex;
    align-items: center;
    margin-bottom: 30px;
  }
  .share-title {
    // border: 1px solid red;
    padding-block: 5px;
    border-bottom: 1px solid #eee;
  }
  .content-body {
    margin-top: 15px;

    .tt {
      box-sizing: border-box;
      height: 60px;
      line-height: 20px;
      width: 100%;
    }

    .pic-list {
      margin-top: 15px;
      display: grid;
      grid-template-columns: repeat(3, calc((100vw - 20px) / 3 - 10px));
      gap: 15px;
      .container {
        position: relative;
        .close-btn {
          position: absolute;
          right: 5px;
          top: 5px;
          width: 20px;
          height: 20px;
          z-index: 9999;
        }
      }
    }
  }
}
</style>
