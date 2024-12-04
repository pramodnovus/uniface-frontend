"use client";

import React, { useState } from "react";
import ImageAtom from "@/atoms/images";
import useFaceDetector from "@/hooks/useFaceDetector";
import { Detection } from "@mediapipe/tasks-vision";
import imagePath from "../../assets/images/female-4572747_640.jpg";

const ImageDetection: React.FC = () => {
  const faceDetector = useFaceDetector();
  const [detections, setDetections] = useState<Detection[] | null>(null);

  const handleImageClick = async (
    event: React.MouseEvent<HTMLImageElement>
  ) => {
    if (!faceDetector) {
      console.error("FaceDetector is not initialized yet.");
      return;
    }

    const imageElement = event.target as HTMLVideoElement;

    try {
      // Run detection on the image
      const detectionsResult = await faceDetector.detect(imageElement);

      if (detectionsResult && detectionsResult.detections) {
        setDetections(detectionsResult.detections);
      } else {
        console.warn("No detections found.");
        setDetections([]);
      }
    } catch (error) {
      console.error("Error during face detection:", error);
      setDetections(null);
    }
  };

  return (
    <div>
      <ImageAtom
        src={imagePath}
        alt="Face"
        onClick={handleImageClick}
        width={100}
        height={100}
      />
      {detections &&
        detections.map((detection, index) => (
          <div key={index}>
            <p>
              Confidence:{" "}
              {detection.categories &&
                detection.categories[0] &&
                Math.round(detection.categories[0].score * 100)}
              %
            </p>
            {/* You can render bounding box or other data here */}
          </div>
        ))}
    </div>
  );
};

export default ImageDetection;
