import { startCamera } from "./camera";

export interface CameraOpt {
  onError?: (error: string) => void;
  size?: number;
  area?: number;
  square?: number | boolean;
  direction?: "horizontal" | "vertical";
}

const getVideoWH = (video: HTMLVideoElement) => {
  return [video.videoWidth || video.width, video.videoHeight || video.height];
};

const VanillaCamera = (
  target: string | HTMLElement,
  { onError = () => {}, direction, size = 1, area = 1, square }: CameraOpt = {}
) => {
  let box: HTMLElement;
  if (typeof target === "string") {
    box = document.querySelector(target) as any;
  } else {
    box = target as HTMLElement;
  }
  if (!document.contains(box)) {
    onError("document.contains no found target");
    return;
  }
  const video = document.createElement("video");
  video.width = box.clientWidth;
  video.height = box.clientHeight;
  video.controls = false;
  video.style.background = "#000";
  video.muted = true;
  box.append(video);
  video.autoplay = true;
  startCamera(video, onError);

  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth * size;
  canvas.height = window.innerHeight * size;

  const context = canvas.getContext("2d")!;

  let x = 0;
  let y = 0;
  let w = 100;
  let h = 100;
  let cw = 200;
  let ch = 200;

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
        context.drawImage(
          video,
          ((1 - area) * w + 2) / 2,
          ((1 - area) * h + 2) / 2,
          w * area,
          h * area,
          0,
          0,
          canvas.width,
          canvas.height
        );
        return canvas.toDataURL("image/png");
      }
    },
  };
};

(window as any).VanillaCamera = VanillaCamera;

export default VanillaCamera;
