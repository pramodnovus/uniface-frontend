"use client";
import React, { useRef, useState, useEffect } from "react";
import useFaceDetector from "@/hooks/useFaceDetector";

interface DetectionCategory {
  score: number;
}

interface Landmark {
  x: number;
  y: number;
}

interface Detection {
  categories: DetectionCategory[];
  boundingBox?: {
    originX: number;
    originY: number;
    width: number;
    height: number;
  };
  landmarks?: Landmark[];
}

const WebcamDetection: React.FC = () => {
  const faceDetector = useFaceDetector();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // console.log("🚀 ~ videoRef:", videoRef);
  const [detections, setDetections] = useState<Detection[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isWebcamActive, setIsWebcamActive] = useState<boolean>(false);

  const enableWebcam = async () => {
    if (isWebcamActive) return;

    try {
      const constraints = { video: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        // console.log(stream);

        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          if (videoRef.current) {
            // Ensure the video element has valid dimensions
            videoRef.current.width = videoRef.current.videoWidth;
            videoRef.current.height = videoRef.current.videoHeight;
          }
          setIsWebcamActive(true);
          predictWebcam();
        };
      }
    } catch (err) {
      setError("Unable to access the webcam.");
      console.error("Webcam access error:", err);
    }
  };
  const originalConsoleInfo = console.info;

  console.info = function (...args) {
    if (
      args[0] &&
      typeof args[0] === "string" &&
      args[0].includes("Created TensorFlow Lite XNNPACK delegate for CPU")
    ) {
      return; // Suppress this specific log
    }
    originalConsoleInfo.apply(console, args); // Keep other logs
  };

  const predictWebcam = async () => {
    if (!faceDetector) {
      console.error("FaceDetector is not initialized yet.");
      return;
    } else if (videoRef.current) {
      try {
        const detectionsResult = faceDetector.detectForVideo(
          videoRef.current,
          performance.now()
        );
 
        setDetections(detectionsResult.detections as Detection[]);
      } catch (error) {
        console.error("Error during detection:", error);
      }
      requestAnimationFrame(predictWebcam);
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;

    return () => {
      if (videoElement?.srcObject) {
        (videoElement.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="items-center justify-center space-y-6 p-6">
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={enableWebcam}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow"
      >
        Enable Webcam
      </button>
      <div className="relative w-[640px] h-[480px] border rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          className="w-full h-full object-cover relative"
        />
        {detections.map((detection, index) => {
          const { boundingBox, categories } = detection;
          const confidence = categories[0]?.score
            ? Math.round(categories[0].score * 100) + "%"
            : "N/A";
          return (
            boundingBox && (
              <div
                key={index}
                className="absolute"
                style={{
                  top: 0,
                  left: 0,
                }}
              >
                <div></div>

                {confidence && parseFloat(confidence) > 90 && (
                  <span
                    style={{
                      position: "relative",
                      top: "-20px",
                      left: "0",
                      backgroundColor: "#00bcd4",
                      color: "white",
                      fontSize: "12px",
                      padding: "2px 4px",
                      borderRadius: "4px",
                    }}
                  >
                    Confidence: {confidence}
                  </span>
                )}
              </div>
            )
          );
        })}
      </div>
      {detections.length === 0 && (
        <p className="text-gray-500">No faces detected yet.</p>
      )}
    </div>
  );
};

export default WebcamDetection;
