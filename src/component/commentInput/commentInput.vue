<template>
  <view
    class="main-container"
    :style="{
      width: 'calc(' + width + ' - 70px)',
    }"
    @click.stop=""
  >
    <view class="main-content">
      <textarea
        class="tt"
        :style="{
          height: height + 'px',
          'line-height': LINE_HEIGHT + 'px',
        }"
        :maxlength="MAX_WORD_COUNT"
        @input="onInput"
        @linechange="onLineChange"
        @focus="onFocus"
        v-model="comments"
        auto-focus="true"
      ></textarea>
      <view class="tt-placeholder" v-show="wordCount === 0">
        分享你的快乐
      </view>
      <!-- <view class="btn-group">
        <SmallButton icon="../../static/icon/at.png"></SmallButton>
        <SmallButton icon="../../static/icon/emoji.png"></SmallButton>
        <SmallButton icon="../../static/icon/img.png"></SmallButton>
      </view> -->
    </view>
    <button class="sub-btn" @click="sub_comments">发送</button>
  </view>
</template>

<script setup>
// import SmallButton from "../button/smallButton.vue";
import { ref } from "vue";

const props = defineProps({
  width: {
    type: String,
    default: "100%",
  },
});

// op TextArea Height
// define
const START_CHANGE_WORD_COUNT = 13;
const MAX_WORD_COUNT = 30;
const LINE_HEIGHT = ref(30);

const height = ref(LINE_HEIGHT.value);

let wordCount = ref(0);
let comments = ref("");


const onInput = (e) => {
  wordCount.value = e.detail.value.length;
  if (wordCount.value < START_CHANGE_WORD_COUNT) {
    height.value = LINE_HEIGHT.value;
  } else if (
    wordCount.value >= START_CHANGE_WORD_COUNT &&
    wordCount.value < MAX_WORD_COUNT
  ) {
    height.value = LINE_HEIGHT.value * 2;
  }
};


// 发送评论
const sub_comments = () => {
  console.log(comments.value);
};
</script>

<style lang="scss" scoped>
.main-container {
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-self: flex-end;
  .main-content {
    box-sizing: border-box;
    background-color: #eee;
    position: relative;
    border-radius: 15px;
    width: 100%;
    animation: draw ease-in-out infinite;
    animation-play-state: paused;
    .tt {
      width: 100%;
      padding-inline: 15px;
      box-sizing: border-box;
      display: block;
    }
    .tt-placeholder {
      position: absolute;
      top: 50%;
      left: 15px;
      transform: translateY(-50%);
      color: #999;
      font-size: 13px;
      z-index: -1;
    }

  }
  .sub-btn {
    position: absolute;
    right: -70px;
    bottom: 0;

    box-sizing: border-box;
    height: 30px;
    width: 60px;
    background-color: #2196f3;
    margin: 0;
    padding: 0;
    border-radius: 999px;
    font-size: 12px;
    letter-spacing: 1px;
    color: #fefefe;
    display: flex;
    justify-content: center;
    align-items: center;
    justify-self: end;
  }
}
</style>
