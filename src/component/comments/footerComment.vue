<template>
  <view :animation="anim_data" class="main-content">
    <view class="comment-btn" @click.stop="sub_comment">
      <image class="edit-icon" src="/static/icon/edit.png" mode="aspectFit">
      </image>
      <view class="text"> 分享你的看法... </view>
    </view>
    <view class="btn-group">
      <!-- like -->
      <LikeButton></LikeButton>
      <!-- star -->
      <LikeButton
        like-url="/static/icon/star.png"
        un-like-url="/static/icon/unstar.png"
      ></LikeButton>
      <SmallButton icon="/static/icon/comment.png"></SmallButton>
    </view>
  </view>
</template>

<script setup>
import LikeButton from "../button/likeButton.vue";
import SmallButton from "../button/smallButton.vue";
import { onReady } from "@dcloudio/uni-app";
import { ref } from "vue";

const anim_data = ref({});

const sub_comment = () => {
  const animation = uni.createAnimation({
    duration: 250,
    timingFunction: "ease",
  });
  animation.translateY(50).opacity(0).step();
  anim_data.value = animation.export();
  setTimeout(() => {
    uni.$emit("showCommentBox", null);
  }, 250);
};

onReady(() => {
  uni.$on("closeCommentBox", () => {
    // console.log("closeCommentBox");
    const animation = uni.createAnimation({
      duration: 250,
      timingFunction: "ease",
    });
    animation.translateY(0).opacity(1).step();
    anim_data.value = animation.export();
  });
});
</script>

<style lang="scss" scoped>
.main-content {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 50px;
  z-index: 9999;
  background-color: #fefefe;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 10px;
  box-sizing: border-box;
  border-top: 1px solid #eee;

  .comment-btn {
    display: flex;
    width: 150px;
    padding: 5px;
    background-color: #f4f4f4;
    border-radius: 999px;
    .edit-icon {
      width: 20px;
      height: 20px;
    }
    .text {
      font-size: 14px;
      color: #999;
      margin-inline: 10px;
    }
  }
  .btn-group {
    width: 100px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
