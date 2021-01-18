import { startCamera } from "./camera";

export interface CameraOpt {
  onError?: (error: string) => void;
  size?: number;
  area?: number;
  square?: boolean;
}

const getVideoWH = (video: HTMLVideoElement) => {
  return [video.videoWidth || video.width, video.videoHeight || video.height];
};

const VanillaCamera = (
  target: string | HTMLElement,
  { onError = () => {}, size = 1, area = 1, square }: CameraOpt = {}
) => {
  let box: HTMLElement;
  if (typeof target === "string") {
    box = document.querySelector(target) as any;
  } else {
    box = target as HTMLElement;
  }
  if (!document.contains(box)) {
    console.error("document.contains no found target");
    onError("document.contains no found target");
    return;
  }

  let video = document.createElement("video");
  video.width = box.clientWidth;
  video.height = box.clientHeight;
  video.controls = false;
  video.style.background = "#000";
  video.muted = true;
  box.append(video);
  video.autoplay = true;
  startCamera(video, onError);

  const canvas = document.createElement("canvas");
  let min = window.innerWidth;
  if (window.innerWidth > window.innerHeight) {
    min = window.innerHeight;
  }

  const context = canvas.getContext("2d")!;

  let x = 0;
  let y = 0;
  let w = 0;
  let h = 0;
  let cw = 0;
  let ch = 0;

  video.addEventListener("canplay", function () {
    const [_w, _h] = getVideoWH(video);
    cw = _w * size;
    ch = _h * size;
    canvas.width = cw;
    canvas.height = ch;
    if (square) {
      let min = _w;
      if (_w > _h) {
        x = (_w - _h) / 2;
        min = _h;
      } else {
        y = (_h - _w) / 2;
      }
      w = min;
      h = min;
    } else {
      w = _w;
      h = _h;
    }
  });

  return {
    video,
    canvas,
    context,
    remove: () => {
      video.pause();
      video.remove();
      canvas.remove();
      video = void 0 as any;
    },
    playPause: () => {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    },
    // 绘制canvas画布、获取data
    screenshot: () => {
      if (video) {
        const a = ((1 - area) * w + 2) / 2 + x;
        const b = ((1 - area) * h + 2) / 2 + y;
        const c = w * area;
        const d = h * area;
        context.drawImage(video, a, b, c, d, 0, 0, cw, ch);
        // context.drawImage(video, 50, 50, 200, 200, 0, 0, iw, ih);
        return canvas.toDataURL("image/png");
      }
      return void 0;
    },
  };
};

(window as any).VanillaCamera = VanillaCamera;

export default VanillaCamera;
