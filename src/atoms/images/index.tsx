import Image, { StaticImageData } from "next/image";
import React from "react";

interface ImageProps {
  src: string | StaticImageData; 
  alt: string;
  width: number; 
  height: number; 
  onClick?: React.MouseEventHandler<HTMLImageElement>
}

const ImageAtom: React.FC<ImageProps> = ({ src, alt, width, height,onClick }) => {
  return (
    <div>
      <Image src={src} alt={alt} width={width} height={height} onClick={onClick}/>
    </div>
  );
};

export default ImageAtom;
