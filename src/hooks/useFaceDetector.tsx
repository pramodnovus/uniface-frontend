import { FaceDetector, FilesetResolver } from "@mediapipe/tasks-vision";
import { useState, useEffect } from "react";

// const useFaceDetector = () => {
//   const [faceDetector, setFaceDetector] = useState<FaceDetector | null>(null);

//   useEffect(() => {
//     // const initializeFaceDetector = async () => {
//     //   try {
//     //     const vision = await FilesetResolver.forVisionTasks(
//     //       "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
//     //     );
//     //     const detector = await FaceDetector.createFromOptions(vision, {
//     //       baseOptions: {
//     //         modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite"
//     //       },
//     //       runningMode: "VIDEO", // Ensure runningMode is set to "VIDEO"
//     //       // maxNumFaces: 1,
//     //     });
//     //     setFaceDetector(detector);
//     //   } catch (error) {
//     //     console.error("Error initializing face detector:", error);
//     //   }
//     const initializeFaceDetector = async () => {
//       try {
//         // Check for WebGL 2.0 support
//         const canvas = document.createElement("canvas");
//         const gl = canvas.getContext("webgl2");
//         if (!gl) {
//           console.error("WebGL 2.0 is not supported in this browser.");
//           setFaceDetector(null); // Disable detection
//           return;
//         }

//         const vision = await FilesetResolver.forVisionTasks(
//           "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
//         );
//         const detector = await FaceDetector.createFromOptions(vision, {
//           baseOptions: {
//             modelAssetPath:
//               "https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite",
//           },
//           runningMode: "VIDEO", // Change to IMAGE for single image detection
//         });

//         setFaceDetector(detector);
//       } catch (error) {
//         console.error("Error initializing face detector:", error);
//       }
//     };

//     initializeFaceDetector();

//     return () => {
//       if (faceDetector) {
//         faceDetector.close(); // Clean up resources
//       }
//     };
//   }, []);

//   return faceDetector;
// };

// export default useFaceDetector;

const useFaceDetector = () => {
  const [faceDetector, setFaceDetector] = useState<FaceDetector | null>(null);

  useEffect(() => {
    const initializeFaceDetector = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
        );
        const detector = await FaceDetector.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite",
          },
          runningMode: "VIDEO", // Ensure VIDEO mode
        });
        setFaceDetector(detector);
      } catch (error) {
        console.error("Error initializing face detector:", error);
      }
    };

    initializeFaceDetector();

    return () => {
      faceDetector?.close(); // Clean up resources
    };
  }, []);

  return faceDetector;
};

export default useFaceDetector;
