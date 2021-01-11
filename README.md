# vanilla-camera

零依赖的绘制和获取摄像头画面，进行 h5 端的扫码和拍摄

Demo: [https://www.writeflowy.com/camera/](https://www.writeflowy.com/camera/)

## Install

npm:

```sh
$ yarn add vanilla-camera
```

unpkg:

```html
<script src="https://unpkg.com/vanilla-camera@1.0.2/umd/index.js"></script>
```

## Use

```ts
import VanillaCamera from 'vanilla-camera';

// 根据在容器内部绘制 video 播放 camera，size 是 screenshot 的分辨率比例
const vc = VanillaCamera('#div', {size: 1, onError:(err)=>{
  alert(err)
}});

// 获取 base64, 进行 barcode 和 身份证识别
const imgData = vc.screenshot(); // base64

// 暂停
vc.playPause();

// 删除
vc.remove();

```