<template>
  <view
    class="comment"
    :style="{
      'margin-left': isReply ? '20px' : '0px',
    }"
  >
    <lazyImg
      :width="isReply ? '15px' : '30px'"
      :height="isReply ? '15px' : '30px'"
      radius="50%"
      :imgSrc="comments.author.avatar"
    ></lazyImg>
    <view class="comment-area">
      <view class="author-name">{{ comments.author.name }}</view>
      <view class="comment-detail">
        {{ comments.text }}
        <view class="detail-footer">
          {{ comments.date }} {{ comments.area }}
        </view>
        <view class="reply-btn" @click="onReply">回复</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import lazyImg from "../lazyImg/lazyImg.vue";
const props = defineProps({
  comments: {
    type: Object,
    default: () => {},
  },
  isReply: {
    type: Boolean,
    default: false,
  },
});

const onReply = () => {
  uni.showToast({
    title: "回复功能待开发",
    icon: "none",
  });
};
</script>

<style lang="scss" scoped>
.comment {
  display: flex;
  align-items: flex-start;
  width: calc(100% - 100px);
  margin-block: 10px;
  .comment-area {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    .author-name {
      font-size: 12px;
      color: #888;
    }
    .comment-detail {
      font-size: 12px;
      .detail-footer {
        color: #888;
        font-size: 10px;
        display: inline-block;
      }
      .reply-btn {
        display: inline-block;
        font-size: 10px;
        margin-left: 5px;
      }
    }
  }
}
</style>
