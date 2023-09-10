<template>
  <view class="main-content">
    <FadeTransiton
      :show="show"
      position="absolute"
      width="max-content"
      height="max-content"
    >
      <view class="container div1">1 </view>
    </FadeTransiton>
    <FadeTransiton
      :show="!show"
      position="absolute"
      width="max-content"
      height="max-content"
    >
      <view class="container div2"> 2 </view>
    </FadeTransiton>
    <button @click="click">click</button>
  </view>
</template>

<script setup>
import FadeTransiton from "../../component/transiton/fadeTransiton.vue";
import { ref } from "vue";

const show = ref(false);
const click = () => {
  show.value = !show.value;
};
</script>

<style lang="scss" scoped>
.div1 {
  background-color: red;
}
.div2 {
  background-color: blue;
}
.main-content {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: 1px solid red;

  button {
    margin: 0;
    padding: 0;
  }

  .container {
    width: 100px;
    height: 100px;
    border: 1px solid red;
  }
}
</style>
