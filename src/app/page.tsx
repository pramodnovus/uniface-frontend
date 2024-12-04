import WebcamDetection from "@/molecules/webcamEnable";

export default function Home() {
  return (
    <div className="flex justify-center items-center">
      <div className="w-1/2 h-1/2">
        <h2>Webcam Detection</h2>
        <WebcamDetection />
      </div>
    </div>
  );
}
