<template>
  <view class="main-content">
    <Comments
      :comments="item"
      v-for="(item, idx) in comments_tr"
      :key="idx"
    ></Comments>
    <view class="comments-list-footer">
        - THE END -
    </view>
      
  </view>
</template>

<script setup lang="ts">
import Comments from "../../component/comments/comments.vue";

const comments_tr = [
  {
    author: {
      avatar: "/static/img/avatar2.webp",
      name: "小明",
    },
    text: "这是一条评论",
    date: "09-01",
    area: "北京",
    like: 12155,
    son: [
      {
        author: {
          avatar: "/static/img/avatar.webp",
          name: "小红",
        },
        text: "这是一条回复",
        date: "09-02",
        area: "天津",
      },
      {
        author: {
          avatar: "/static/img/avatar.webp",
          name: "小兰",
        },
        text: "这是一条回复",
        date: "09-02",
        area: "",
      },
    ],
  },
  {
    author: {
      avatar: "/static/img/avatar.webp",
      name: "小K",
    },
    text: "这是第二条评论",
    date: "09-01",
    area: "重庆",
    son: [],
    like: 55,
  },
  {
    author: {
      avatar: "/static/img/avatar2.webp",
      name: "小J",
    },
    text: "这是第三条条评论",
    date: "09-02",
    area: "北京",
    like: 11,
    son: [
      {
        author: {
          avatar: "/static/img/avatar2.webp",
          name: "小M",
        },
        text: "这是一条回复",
        date: "09-02",
        area: "太原",
      },
      {
        author: {
          avatar: "/static/img/avatar2.webp",
          name: "小Q",
        },
        text: "这是一条回复",
        date: "09-02",
        area: "",
      },
    ],
  },
];
</script>

<style lang="scss" scoped>
    .main-content{
        .comments-list-footer{
            height: 80px;
            font-size: 12px;
            color: #888;
            margin-top: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>
