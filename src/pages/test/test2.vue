<template>
  <!-- 上传视频或者图片 -->
  <view class="up-page">
    <!--图片-->
    <view class="show-box" v-for="(item, index) in imageList" :key="index">
      <image
        class="full"
        :src="item"
        :data-src="image"
        @tap="previewImage(item)"
      >
      </image>
      <view class="delect-icon" @tap="delect(index)">
        <image class="full" :src="clearIcon" mode=""></image>
        <!--图片或者视频上传成功了，点击右上角叉号-->
      </view>
    </view>
    <!--视频-->
    <view class="show-box" v-for="(item1, index1) in videoList" :key="index1">
      <video class="full" :src="item1"></video>
      <view class="delect-icon" @tap="delectVideo(index1)">
        <image class="full" :src="clearIcon" mode=""></image>
      </view>
    </view>
    <view v-if="VideoOfImagesShow" @tap="chooseVideoImage" class="box-mode">
      <image class="full" :src="selectfile" mode=""></image>
      <!-- 上传图标 懒得写，整个的图 -->
    </view>
  </view>
</template>
<script>
var sourceType = [["camera"], ["album"], ["camera", "album"]];
export default {
  data() {
    return {
      // 图标
      clearIcon:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAwaDE2YTQgNCAwIDAgMSA0IDR2MTZINGE0IDQgMCAwIDEtNC00VjB6IiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXIpIiBmaWxsLW9wYWNpdHk9Ii45OCIgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfYikiLz48cGF0aCBkPSJNMTAuOTQgOS45OTlsMi44NjMtMi44NTdhLjY2OS42NjkgMCAxIDAtLjk0Ni0uOTQ2TDEwIDkuMDYgNy4xNDMgNi4xOTZhLjY2OS42NjkgMCAwIDAtLjk0Ni45NDZsMi44NjQgMi44NTctMi44NjQgMi44NTdhLjY2Ni42NjYgMCAwIDAgLjIxNyAxLjA5Mi42NjQuNjY0IDAgMCAwIC43MjktLjE0NkwxMCAxMC45MzhsMi44NTcgMi44NjRhLjY2Ny42NjcgMCAwIDAgMS4wOTItLjIxNy42NjYuNjY2IDAgMCAwLS4xNDYtLjcyOUwxMC45MzkgMTB6IiBmaWxsPSIjZmZmIi8+PGRlZnM+PGZpbHRlciBpZD0iZmlsdGVyMF9iIiB4PSItNCIgeT0iLTQiIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+PGZlR2F1c3NpYW5CbHVyIGluPSJCYWNrZ3JvdW5kSW1hZ2UiIHN0ZERldmlhdGlvbj0iMiIvPjxmZUNvbXBvc2l0ZSBpbjI9IlNvdXJjZUFscGhhIiBvcGVyYXRvcj0iaW4iIHJlc3VsdD0iZWZmZWN0MV9iYWNrZ3JvdW5kQmx1ciIvPjxmZUJsZW5kIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImVmZmVjdDFfYmFja2dyb3VuZEJsdXIiIHJlc3VsdD0ic2hhcGUiLz48L2ZpbHRlcj48bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXIiIHgxPSIyMCIgeDI9IjE1LjU4NiIgeTI9IjIyLjk0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iIzBEMUUyOCIgc3RvcC1vcGFjaXR5PSIuOCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzA1MEUxMiIgc3RvcC1vcGFjaXR5PSIuNjUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48L3N2Zz4=",
      selectfile:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB4PSIuMjUiIHk9Ii4yNSIgd2lkdGg9IjYzLjUiIGhlaWdodD0iNjMuNSIgcng9IjMuNzUiIGZpbGw9IiNGMkYyRjIiIHN0cm9rZT0iI0YyRjJGMiIgc3Ryb2tlLXdpZHRoPSIuNSIvPjxyZWN0IHg9IjE2IiB5PSIzMSIgd2lkdGg9IjMyIiBoZWlnaHQ9IjIiIHJ4PSIxIiBmaWxsPSIjQkZCRkJGIi8+PHJlY3QgeD0iMzMiIHk9IjE2IiB3aWR0aD0iMzIiIGhlaWdodD0iMiIgcng9IjEiIHRyYW5zZm9ybT0icm90YXRlKDkwIDMzIDE2KSIgZmlsbD0iI0JGQkZCRiIvPjwvc3ZnPg==",
      VideoOfImagesShow: true, // 页面图片或视频数量超出后，拍照按钮隐藏
      imageList: [], //存放图片的地址
      videoList: [], //视频存放的地址
      sourceType: ["拍摄", "相册", "拍摄或相册"],
      sourceTypeIndex: 2,
      cameraList: [
        {
          value: "back",
          name: "后置摄像头",
          checked: "true",
        },
        {
          value: "front",
          name: "前置摄像头",
        },
      ],
      cameraIndex: 0, //上传视频时的数量
      maxCount: 9, //图片和视频允许上传的总数
    };
  },
  onUnload() {
    (this.imageList = []),
      (this.sourceTypeIndex = 2),
      (this.sourceType = ["拍摄", "相册", "拍摄或相册"]);
  },
  methods: {
    //点击上传图片或视频
    chooseVideoImage() {
      uni.showActionSheet({
        title: "选择上传类型",
        itemList: ["图片", "视频"],
        success: (res) => {
          console.log(res);
          if (res.tapIndex == 0) {
            this.chooseImages();
          } else {
            this.chooseVideo();
          }
        },
      });
    },
    //上传图片
    chooseImages() {
      uni.chooseImage({
        count: this.maxCount, //允许选择的数量
        sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], //从相册选择
        success: (res) => {
          this.imageList = this.imageList.concat(res.tempFilePaths);
          //console.log(this.imageList)
          if (this.imageList.length + this.videoList.length == this.maxCount) {
            this.VideoOfImagesShow = false; //图片上传数量和count一样时，让点击拍照按钮消失
          }
        },
      });
    },
    //上传视频
    chooseVideo(index) {
      uni.chooseVideo({
        maxDuration: 0, //拍摄视频最长拍摄时间，单位秒。最长支持 60 秒
        count: this.maxCount,
        camera: this.cameraList[this.cameraIndex].value, //'front'、'back'，默认'back'
        sourceType: sourceType[this.sourceTypeIndex],
        success: (res) => {
          console.log(res);
          this.videoList = this.videoList.concat(res.tempFilePath);
          if (this.imageList.length + this.videoList.length == this.maxCount) {
            this.VideoOfImagesShow = false;
          }
          console.log(this.videoList);
        },
      });
    },
    //预览图片
    previewImage: function (e) {
      console.log(e);
      uni.previewImage({
        current: e,
        urls: this.imageList,
      });
    },
    // 删除图片
    delect(index) {
      uni.showModal({
        title: "提示",
        content: "是否要删除该图片",
        success: (res) => {
          if (res.confirm) {
            this.imageList.splice(index, 1);
          }
          if (this.imageList.length + this.videoList.length == this.maxCount) {
            this.VideoOfImagesShow = false;
          } else {
            this.VideoOfImagesShow = true;
          }
        },
      });
    },
    // 删除视频
    delectVideo(index) {
      uni.showModal({
        title: "提示",
        content: "是否要删除此视频",
        success: (res) => {
          if (res.confirm) {
            this.videoList.splice(index, 1);
          }
          if (this.imageList.length + this.videoList.length == this.maxCount) {
            this.VideoOfImagesShow = false;
          } else {
            this.VideoOfImagesShow = true;
          }
        },
      });
    },
  },
};
</script>
<style lang="scss">
/* 统一上传后显示的盒子宽高比 */
.box-mode {
  width: 27vw;
  height: 27vw;

  border-radius: 8rpx;
  overflow: hidden;
}

.full {
  width: 100%;
  height: 100%;
}

.up-page {
  display: flex;
  flex-wrap: wrap;
  display: flex;
  width: 100%;
  box-sizing: border-box;
  padding-top: 100px;
  .show-box:nth-child(3n) {
    margin-right: 0;
  }
  .show-box {
    position: relative;
    margin-bottom: 4vw;
    margin-right: 4vw;
    @extend .box-mode;

    .delect-icon {
      height: 40rpx;
      width: 40rpx;
      position: absolute;
      right: 0rpx;
      top: 0rpx;
      z-index: 1000;
    }
  }
}
</style>
