import React from 'react';
import CourseVideo from '../CourseVideo';

const VideoViewer = ({ module, thumbnailUrl, contentId, contentType }) => {
  console.log("module.video object:", module?.video);
  const videoUrl = module?.video?.url;
  const videoKey = module?.video?.key;
  
  return (
    <div className="w-full">
      {videoUrl ? (
        <CourseVideo 
          videoUrl={videoUrl} 
          videoKey={videoKey}
          thumbnailUrl={thumbnailUrl} 
          contentId={contentId}
          contentType={contentType}
        />
      ) : (
        <div className="w-full aspect-video bg-gray-900 rounded-xl flex items-center justify-center text-white">
          <p>الفيديو غير متوفر</p>
        </div>
      )}
      <div className="mt-6 mb-4">
        <h2 className="text-xl font-bold text-gray-900">{module.title}</h2>
        {module.description && (
          <p className="text-gray-600 mt-2">{module.description}</p>
        )}
      </div>
    </div>
  );
};

export default VideoViewer;
