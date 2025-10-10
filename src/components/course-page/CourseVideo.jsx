'use client';
import React from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CourseVideo = ({ video }) => {
  return (
    <Card className="relative mx-auto rounded-xl overflow-hidden mb-4 w-full max-w-4xl aspect-video border-0">
      <Image
        src={video}
        alt="Course video"
        fill
        className="object-cover"
        priority
      />
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <Button variant="secondary" size="icon" className="w-14 h-14 rounded-full group-hover:scale-110 transition-transform">
            <Play className="w-7 h-7 text-primary ml-1" fill="currentColor" />
        </Button>
      </div>
    </Card>
  );
};

export default CourseVideo;
