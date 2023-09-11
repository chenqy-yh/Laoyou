<template>
  <view class="main-content">
    <button @click="change">change</button>
  </view>
</template>

<script setup>
import { defineEmits, onMounted } from "vue";

const props = defineProps({
  val: {
    type: Number,
  },
});
const emits = defineEmits(["update:val"]);

//change fa val
const change = () => {
  emits("update:val", props.val + 1);
};

onMounted(() => {
  console.log(props.val);
});
</script>

<style lang="scss" scoped>
.main-content {
  border: 1px solid green;
}
</style>
