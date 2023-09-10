<template>
  <view class="main-content">
    <view
      class="header"
      :style="{
        'padding-top': menu_button_pos.top + 'px',
      }"
    >
      <view
        class="header-content"
        :style="{
          height: menu_button_pos.height + 'px',
          width: 'calc(100% - ' + (menu_button_pos.width + 10) + 'px)',
        }"
      >
        <button class="back-btn" @click="back"></button>
        <view class="author-desc">
          <view class="author-avatar">
            <LazyImg
              imgSrc="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"
              width="30px"
              height="30px"
              radius="50%"
            ></LazyImg>
          </view>
          <view class="name">author_name </view>
        </view>
        <button class="follow-btn">关注</button>
      </view>
    </view>
    <scroll-view scroll-y="true" class="scroll-view">
      <view class="body">
        <view class="article">
          <view
            class="article-title"
            :style="{
              'font-weight': 600,
              'margin-bottom': '30rpx',
            }"
          >
            时光荏苒，岁月静好。欣赏美文美图好作品！</view
          >
          <LazyImg
            imgSrc="https://images.unsplash.com/photo-1468581264429-2548ef9eb732?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2VhfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60"
          ></LazyImg>
          <view class="tags">
            <view class="tag" v-for="(tag, idx) in tags" :key="idx">
              #{{ tag }}
            </view>
          </view>

          <view class="foot-note">
            <view class="date"> 09-01 </view>
            <view class="pos"> 重庆 </view>
          </view>
        </view>
        <view class="comments">
          <view class="comments-count"> 共 3 条评论 </view>
          <view class="self-commit">
            <LazyImg
              imgSrc="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60"
              width="30px"
              height="30px"
              radius="50%"
            ></LazyImg>
            <view class="commit-btn" @click="show_box">
              <view> 有话要说，快来评论 </view>
              <view class="btn-group">
                <button class="at-btn"></button>
                <button class="emoji-btn"></button>
                <button class="img-btn"></button>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
    <CommitBox></CommitBox>
    <Comentlist></Comentlist>
    <FooterComment></FooterComment>
  </view>
</template>

<script setup>
import { onReady } from "@dcloudio/uni-app";
import { ref } from "vue";
import LazyImg from "../../component/lazyImg/lazyImg.vue";
import CommitBox from "../../component/commitBox/commitBox.vue";
import Comentlist from "../../component/comments/commentList.vue";
import FooterComment from "../../component/comments/footerComment.vue";

const menu_button_pos = ref({
  height: 0,
  top: 0,
  left: 0,
  width: 0,
});

const showBox = ref(false);

const tags = ["美文", "美图", "好作品"];

onReady(() => {
  const res = uni.getMenuButtonBoundingClientRect();
  menu_button_pos.value.top = res.top;
  menu_button_pos.value.height = res.height;
  menu_button_pos.value.left = res.left;
  menu_button_pos.value.width = res.width;

  // 挂载全局监听
  uni.$on("showCommentBox", () => {
    showBox.value = true;
  });
});

const back = () => {
  uni.navigateBack();
};

const show_box = () => {
  showBox.value = true;
};
</script>

<style lang="scss" scoped>
.main-content {
  // height: 100vh;
  // border: 1px solid red;
  .header {
    padding-bottom: 10px;
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 0;
    left: 0;
    background-color: #fefefe;
    z-index: 99999;
    .header-content {
      display: grid;
      grid-template-columns: 25px 1fr 60px;
      align-items: center;
      padding: 0;
      .back-btn {
        width: 30px;
        height: 30px;
        // border: 1px solid blue;
        margin: 0;
        background: url(../../static/icon/left.png) no-repeat center center;
        background-size: 30px 30px;
      }
      .author-desc {
        display: flex;
        align-items: center;
        .author-avatar {
          margin-inline: 10px;
        }
      }
      .follow-btn {
        background-color: transparent;
        border: 1px solid #ff7675;
        border-radius: 999px;
        padding-inline: 15px;
        height: 20px;
        line-height: 18px;
        font-size: 10px;
        color: #ff7675;
        text-align: center;
        margin: 0;
      }
    }
  }
  .scroll-view {
    height: 100%;

    .body {
      height: 100%;
    }
  }
  .scroll-view {
    height: 100%;
  }
  .body {
    height: 100%;
    padding: 30rpx;
    .article {
      .tags {
        color: #273c75;
        display: flex;
        margin-block: 15rpx;
        .tag {
          margin-right: 5px;
        }
      }
      .foot-note {
        display: flex;
        border-bottom: 1px solid #eee;
        padding-block: 15rpx;
        align-items: center;
        .date {
          font-size: 10px;
          color: #999;
          margin-right: 5px;
        }
        .pos {
          font-size: 10px;
          color: #999;
        }
      }
    }
    .comments {
      .comments-count {
        font-size: 12px;
        color: #999;
        margin-block: 15rpx;
      }
      .self-commit {
        display: grid;
        grid-template-columns: 45px 1fr;
        align-items: center;
        .commit-btn {
          height: 30px;
          border-radius: 15px;
          background-color: #f4f4f4;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-inline: 15px;
          font-size: 13px;
          color: #999;
          .btn-group {
            display: flex;
            align-items: center;
            margin-left: 10px;
            button {
              width: 24px;
              height: 24px;
            }
            button:nth-child(1) {
              background: url(../../static/icon/at.png);
              background-size: 20px;
              background-repeat: no-repeat;
              background-position: center;
            }
            button:nth-child(2) {
              background: url(../../static/icon/emoji.png);
              background-size: 20px;
              background-repeat: no-repeat;
              background-position: center;
            }
            button:nth-child(3) {
              background: url(../../static/icon/img.png);
              background-size: 20px;
              background-repeat: no-repeat;
              background-position: center;
            }
          }
        }
      }
    }
  }
}
</style>
