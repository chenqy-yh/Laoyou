export function pxToRpx(px, screenWidth) {
  // 获取设备的像素比例
  const devicePixelRatio = wx.getSystemInfoSync().pixelRatio;

  // 计算1rpx等于多少px
  const rpxRatio = screenWidth / 750;

  // 将px转换为rpx
  const rpx = px / (devicePixelRatio * rpxRatio);

  return rpx;
}

// 节流
export const throttle = (fn, delay) => {
  let timeoutId = null;
  return function (...args) {
    if (timeoutId === null) {
      fn.apply(this, args);
      timeoutId = setTimeout(() => {
        timeoutId = null;
      }, delay);
    }
  };
};

// TODO提示
export const todo = () => {
  uni.showToast({
    title: "暂未开放",
    icon: "none",
  });
};
