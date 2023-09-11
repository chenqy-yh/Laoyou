<template>
  <view class="main-content">
    <view class="demo1">
      <view> 父组件的值:{{ val }} </view>
      <Son v-model:val="val"></Son>
    </view>

    <view class="demo2">
      <view> 空值:{{ is_empty }} </view>
      <Son2 v-model:is_empty="is_empty"></Son2>
    </view>
  </view>
</template>

<script setup>
import Son from "./son.vue";
import { ref } from "vue";
import Son2 from "./son2.vue";
const val = ref(10);
const is_empty = ref(true);
</script>

<style lang="scss" scoped>
.main-content {
  padding-top: 100px;
  padding-left: 100px;
}
</style>
