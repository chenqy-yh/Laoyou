<template>
  <view class="main-content">
    <input type="text" v-model="text" @input="onInput" />
  </view>
</template>

<script setup>
import { defineEmits, ref } from "vue";
const props = defineProps({
  is_empty: {
    type: Boolean,
  },
});

const text = ref("");

const emits = defineEmits(["update:is_empty"]);

const onInput = (e) => {
  console.log(e.target.value === "");
  emits("update:is_empty", e.target.value === "");
};
</script>

<style lang="scss" scoped></style>
