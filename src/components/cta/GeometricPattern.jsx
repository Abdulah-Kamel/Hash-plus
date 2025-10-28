import React from 'react';
import geometricpattern from "@/assets/geometricpattern.svg";
import Image from "next/image";

const GeometricPattern = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image 
        src={geometricpattern} 
        alt="Geometric Pattern" 
        className="absolute top-0 left-0 h-full w-auto object-contain max-xl:opacity-40 hidden sm:block"
      />
    </div>
  );
};

export default GeometricPattern;