# vanilla-camera

零依赖的绘制和获取摄像头画面，进行 h5 端的摄像头渲染.

若需要内置扫码，请使用 [vanilla-qrcode](https://github.com/ymzuiku/vanilla-qrcode)

Demo: [https://camera.writeflowy.com](https://camera.writeflowy.com)

## Install

npm:

```sh
$ yarn add vanilla-camera
```

unpkg:

```html
<script src="https://unpkg.com/vanilla-camera@1.0.2/umd/index.js"></script>
```

## Use Camera

```ts
import VanillaCamera from 'vanilla-camera';

// 根据在容器内部绘制 video 播放 camera，size 是 screenshot 的分辨率比例, square: 是否仅读取正方形，这对 QRCode 场景非常有用，可以减少较多不必要的解析空间
const vc = VanillaCamera('#div', {size: 1, area: 0.5,  square: true, onError:(err)=>{
  alert(err)
}});

// 获取 base64, 进行 barcode 和 身份证识别
const imgData = vc.screenshot(); // base64

// 暂停
vc.playPause();

// 删除
vc.remove();

```

