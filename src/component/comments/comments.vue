<template>
  <view class="main-content">
    <CommentDetail :comments="comments"></CommentDetail>
    <CommentDetail
      :comments="comments.son[0]"
      :isReply="true"
      v-if="comments.son.length > 0"
    ></CommentDetail>
    <view
      class="show-other-msg-btn"
      v-if="comments.son.length > 1 && !show_other_msg"
      @click="showMoreMsg"
    >
      展开 {{ comments.son.length - 1 }} 条回复
    </view>

    <CommentDetail
      v-if="comments.son.length > 1 && show_other_msg"
      v-for="(item, idx) in comments.son.slice(1)"
      :comments="item"
      :key="idx"
      :isReply="true"
    ></CommentDetail>
    <view class="comment-like">
      <LikeButton></LikeButton>
      <!-- <image
        class="heart"
        src="/static/icon/like_kx.png"
        mode="aspectFit"
      ></image> -->
      <view class="like-count">
        {{ format_like_count }}
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed, ref } from "vue";
import CommentDetail from "./commentDetail.vue";
import LikeButton from "../button/likeButton.vue";
const props = defineProps({
  comments: {
    type: Object,
    default: () => {},
  },
});

//TODO 每一次点击多展示5条评论，这里需要进行服务器请求，后面再实现
const show_other_msg = ref(false);

const format_like_count = computed(() => {
  return formatNumber(props.comments.like);
});


const formatNumber = () => {
  const like = props.comments.like;
  if (like < 1000) {
    return like;
  } else if (like < 10000) {
    return (like / 1000).toFixed(1) + "k";
  } else if (like < 1000000) {
    return (like / 10000).toFixed(1) + "w";
  } else {
    return (like / 1000000).toFixed(1) + "m";
  }
};

const showMoreMsg = () => {
  uni.showToast({
    title: "功能待开发",
    icon: "none",
  });
  show_other_msg.value = true;
};
</script>

<style lang="scss" scoped>
.main-content {
  // border: 1px solid red;
  box-sizing: border-box;
  position: relative;
  // padding-block: 10px;
  padding-inline: 10px;
  border-bottom: 1px solid #eee;
  .comment-like {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    right: 15px;
    top: 0px;
    .heart {
      width: 25px;
      height: 25px;
    }
    .like-count {
      font-size: 10px;
      color: #888;
    }
  }
  .show-other-msg-btn {
    color: #888;
    font-size: 12px;
    margin-block: 10px;
    margin-left: 20px;
    font-weight: 600;
    color: #273c75;
  }
}
</style>
