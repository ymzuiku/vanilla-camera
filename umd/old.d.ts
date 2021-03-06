export interface CameraOpt {
    onError?: (error: string) => void;
    size?: number;
    area?: number;
    direction?: "horizontal" | "vertical";
}
declare const VanillaCamera: (target: string | HTMLElement, { onError, direction, size, area }?: CameraOpt) => {
    video: HTMLVideoElement;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    remove: () => void;
    playPause: () => void;
    screenshot: () => string;
};
export default VanillaCamera;
