import { startCamera } from "./camera";
export interface CameraOpt {
  onError?: (error: string) => void;
  size?: number;
  direction?: "horizontal" | "vertical";
}

const VanillaCamera = (target: string | HTMLElement, { onError = () => {}, direction, size = 1 }: CameraOpt = {}) => {
  let box: HTMLElement;
  if (typeof target === "string") {
    box = document.querySelector(target) as any;
  } else {
    box = target as HTMLElement;
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
  if (direction === "horizontal") {
    canvas.height = window.innerWidth * size;
    canvas.width = window.innerHeight * size;
  } else {
    canvas.width = window.innerWidth * size;
    canvas.height = window.innerHeight * size;
  }

  const context = canvas.getContext("2d")!;

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
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL("image/png");
    },
  };
};
(window as any).VanillaCamera = VanillaCamera;

export default VanillaCamera;
