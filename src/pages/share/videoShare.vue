<template>
  <view
    class="main-content"
    :style="{
      'padding-top': menu_button_pos.top + 'px',
      height: props.height,
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
    <view class="share-title" :src="sub_video_url">
      <input
        type="text"
        maxlength="15"
        placeholder="分享你的心情,观点和经历..."
        v-model="share_title"
      />
    </view>
    <view
      class="video-container"
      v-if="sub_video_url !== ''"
      :style="video_playing ? video_post_style : video_pre_style"
    >
      <video
        :src="sub_video_url"
        class="video-item"
        object-fit="cover"
        show-fullscreen-btn="false"
        @play="play_video"
      ></video>
      <image
        class="close-btn"
        src="/static/icon/cancel.png"
        v-if="!video_playing"
        @click="del_video"
      ></image>

      <view
        class="full-screen-gui"
        :style="{
          top: menu_button_pos.top + 'px',
        }"
        v-if="video_playing"
      >
        <view class="btn-1" @click="video_playing = false"> 关闭 </view>
        <view class="btn-2" @click="del_video"> 删除 </view>
      </view>
    </view>
    <view class="add-video-btn" @click="add_video" v-else>
      <image class="img" src="/static/icon/plus.png" mode="aspectFit"> </image>
      <view class="desc"> 添加视频 </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from "vue";
import { onReady } from "@dcloudio/uni-app";
import SmallButton from "../../component/button/smallButton.vue";

const props = defineProps({
  height: {
    type: String,
    default: "100%",
  },
});

const menu_button_pos = ref({
  height: 0,
  top: 0,
  left: 0,
  width: 0,
});
const component_name = "VideoShare";
const share_title = ref("");
const sub_video_url = ref("");
const video_playing = ref(false);
const video_pre_style = {
  "margin-top": "10px",
  width: "100%",
  height: "150px",
  position: "relative",
};

const video_post_style = {
  position: "fixed",
  left: "0",
  top: "0",
  width: "100vw",
  height: "100vh",
  "z-index": "9999",
};

const share_is_empty = computed(() => {
  return sub_video_url.value === "" && share_title.value === "";
});

onReady(() => {
  //获取胶囊位置
  get_menu_button_pos();

  //监听 分享数据是否为空
  listen_share_is_empty();

  //监听 清空数据
  listen_clean_share_data();
});

//function
//获取胶囊位置
const get_menu_button_pos = () => {
  const res = uni.getMenuButtonBoundingClientRect();
  menu_button_pos.value.top = res.top;
  menu_button_pos.value.height = res.height;
  menu_button_pos.value.left = res.left;
  menu_button_pos.value.width = res.width;
};

//监听 分享数据是否为空
const listen_share_is_empty = () => {
  uni.$on("share_is_empty", (res) => {
    if (res === component_name) {
      uni.$emit("share_data_empty", {
        component: component_name,
        is_empty: share_is_empty.value,
      });
    }
  });
};

// 监听 清空数据
const listen_clean_share_data = () => {
  uni.$on("clean_share_data", (res) => {
    if (res === component_name) {
      clear_data();
    }
  });
};

//回到首页
const back = () => {
  uni.switchTab({
    url: "/pages/index/index",
  });
};

// 添加视频
const add_video = () => {
  uni.showActionSheet({
    title: "选择视频来源",
    itemList: ["拍摄", "从手机相册选择"],
    success: (res) => {
      if (res.tapIndex === 0) {
        // 拍摄视频
        uni.chooseMedia({
          sourceType: ["camera"],
          maxDuration: 60,
          camera: "back",
          success: (res) => {
            sub_video_url.value = res.tempFiles[0].tempFilePath;
          },
          fail: (err) => {
            console.log(err);
          },
        });
      } else if (res.tapIndex === 1) {
        // 从相册中选取视频
        uni.chooseMedia({
          sourceType: ["album"],
          maxDuration: 60,
          camera: "back",
          success: (res) => {
            sub_video_url.value = res.tempFiles[0].tempFilePath;
          },
          fail: (err) => {
            console.log(err);
          },
        });
      }
    },
    fail: (err) => {
      console.log(err);
    },
  });
};

// 删除当前视频
const del_video = () => {
  video_playing.value = false;
  sub_video_url.value = "";
};

// 播放视频
const play_video = (e) => {
  video_playing.value = true;
};

// 切换分享类型
const change_share_type = () => {
  uni.showModal({
    title: "提示",
    content: "切换分享类型会清空已填写的内容,是否继续?",
    success: (res) => {
      if (res.confirm) {
        share_title.value = "";
        sub_video_url.value = "";
        video_playing.value = false;
      } else {
        // 取消切换
      }
    },
    fail: (err) => {
      console.log(err);
    },
  });
};

// 清空分享数据
const clear_data = () => {
  share_title.value = "";
  sub_video_url.value = "";
};
</script>

<style lang="scss" scoped>
.main-content {
  padding-inline: 20px;
  box-sizing: border-box;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: #fefefe;

  .header {
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
    padding-block: 5px;
    border-bottom: 1px solid #eee;
  }
  .sub-video {
    width: 100%;
    height: 150px;
    border: 1px solid red;
  }
  .video-container {
    .close-btn {
      position: absolute;
      content: "";
      width: 20px;
      height: 20px;
      top: 5px;
      right: 5px;
      z-index: 9999;
    }

    .full-screen-gui {
      z-index: 999999;
      position: fixed;
      top: 100px;
      left: 20px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 5px;
      align-items: center;
      color: white;
      font-size: 14px;

      .btn-1 {
        background-color: black;
        max-width: 35px;
        min-width: 35x;
        height: 30px;
        line-height: 30px;
        padding-inline: 10px 10px;
        text-align: center;
        opacity: 0.8;
      }
      .btn-2 {
        background-color: black;
        max-width: 35px;
        min-width: 35px;
        height: 30px;
        line-height: 30px;
        padding-inline: 10px 10px;
        text-align: center;
        opacity: 0.8;
      }
    }

    .video-item {
      width: 100%;
      height: 100%;
      // object-fit: contain;
      // border: 1px solid green;
    }
  }
  .add-video-btn {
    margin-top: 10px;
    height: 150px;
    display: flex;
    flex-direction: column;
    background-color: #f4f4f4;
    justify-content: center;
    align-items: center;
    user-select: none;
    .img {
      width: 30%;
      height: 30%;
    }
    .desc {
      font-size: 14px;
      color: #999;
    }
  }
}
</style>
