<template>
  <view class="main-content">
    <FadeTransiton :show="show">
      <view class="container"> 123 </view>
    </FadeTransiton>
    <button @click="change_show">click</button>
  </view>
</template>

<script setup>
import { ref } from "vue";
import FadeTransiton from "../../component/transiton/fadeTransiton.vue";
const show = ref(false);
const change_show = () => {
  show.value = !show.value;
};
</script>

<style lang="scss" scoped>
.main-content {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  .container {
    width: 50px;
    height: 50px;
    border: 1px solid red;
  }
}
</style>
