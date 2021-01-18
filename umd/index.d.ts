export interface CameraOpt {
    onError?: (error: string) => void;
    size?: number;
    area?: number;
    square?: boolean;
}
declare const VanillaCamera: (target: string | HTMLElement, { onError, size, area, square }?: CameraOpt) => {
    video: HTMLVideoElement;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    remove: () => void;
    playPause: () => void;
    screenshot: () => string | undefined;
} | undefined;
export default VanillaCamera;
