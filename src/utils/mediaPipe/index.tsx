// mediapipe.d.ts

declare module "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0" {
  export class FaceDetector {
    static createFromOptions(
      resolver: FilesetResolver,
      options: FaceDetectorOptions
    ): Promise<FaceDetector>;
    detect(image: HTMLImageElement): { detections: Detection[] };
    detectForVideo(video: HTMLVideoElement, startTimeMs: number): {
      detections: Detection[];
    };
    setOptions(options: Partial<FaceDetectorOptions>): Promise<void>;
    close(): void;
  }

  export interface FaceDetectorOptions {
    baseOptions: {
      modelAssetPath: string;
      delegate?: "GPU" | "CPU";
    };
    runningMode: "IMAGE" | "VIDEO";
  }

  export class FilesetResolver {
    static forVisionTasks(basePath: string): Promise<FilesetResolver>;
  }

  export interface Detection {
    boundingBox: {
      originX: number;
      originY: number;
      width: number;
      height: number;
    };
    keypoints: { x: number; y: number }[];
    categories: { score: number }[];
  }
}
