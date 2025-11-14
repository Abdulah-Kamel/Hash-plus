import React, { useRef, useState } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
} from "lucide-react";

const CourseVideo = ({ video }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [showPlayer, setShowPlayer] = useState(false);
  const [controlsTimeout, setControlsTimeout] = useState(null);

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Check if it's a YouTube URL
  const isYouTubeUrl = (url) => {
    return url && (url.includes("youtube.com") || url.includes("youtu.be"));
  };

  const videoId = isYouTubeUrl(video) ? getYouTubeVideoId(video) : null;
  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : "/api/placeholder/800/450";
  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
    : null;

  // Video player functions for non-YouTube videos
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
      
      // Show controls temporarily when playing
      setShowControls(true);
      if (controlsTimeout) {
        clearTimeout(controlsTimeout);
      }
      const timeout = setTimeout(() => {
        setShowControls(false);
      }, 3000); // Hide controls after 3 seconds
      setControlsTimeout(timeout);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * duration;
    }
  };

  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
    }
  };

  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10;
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (videoId && showPlayer) {
    return (
      <div className="relative mx-auto rounded-xl overflow-hidden mb-4 w-full max-h-[490px] bg-black">
        <iframe
          src={embedUrl}
          className="w-full h-full min-h-[490px]"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Course Video"
        />
      </div>
    );
  }

  return (
    <div className="relative mx-auto rounded-xl overflow-hidden mb-4 w-full max-h-[490px] bg-black group">
      {videoId ? (
        <div>
          <img
            src={thumbnailUrl}
            alt="Video thumbnail"
            className="w-full h-full object-cover min-h-[490px]"
          />
          <div className="absolute inset-0 bg-black/40"></div>

          <button
            onClick={() => setShowPlayer(true)}
            className="absolute inset-0 flex items-center justify-center group z-10"
          >
            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform backdrop-blur-sm">
              <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
            </div>
          </button>
        </div>
      ) : (
        <div 
          className="relative group"
          onMouseEnter={() => {
            setShowControls(true);
            if (controlsTimeout) {
              clearTimeout(controlsTimeout);
              setControlsTimeout(null);
            }
          }}
          onMouseLeave={() => {
            if (isPlaying) {
              const timeout = setTimeout(() => {
                setShowControls(false);
              }, 1000);
              setControlsTimeout(timeout);
            } else {
              setShowControls(false);
            }
          }}
        >
          <video
            ref={videoRef}
            src={video}
            className="w-full h-full object-cover min-h-[490px]"
            poster="/api/placeholder/800/450"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onClick={togglePlay}
          />
          
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${showControls || isPlaying ? 'opacity-100' : 'opacity-0'}`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={togglePlay}
                  className="bg-white/20 hover:bg-white/30 rounded-full p-3 transition-all duration-200"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-white" />
                  ) : (
                    <Play className="w-8 h-8 text-white fill-white" />
                  )}
                </button>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="mb-3">
                  <div
                    className="w-full h-1 bg-white/30 rounded-full cursor-pointer"
                    onClick={handleSeek}
                  >
                    <div
                      className="h-full bg-white rounded-full transition-all duration-150"
                      style={{
                        width: `${
                          duration ? (currentTime / duration) * 100 : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlay}
                      className="text-white hover:text-gray-300 transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5" />
                      ) : (
                        <Play className="w-5 h-5" />
                      )}
                    </button>

                    <button
                      onClick={skipBackward}
                      className="text-white hover:text-gray-300 transition-colors"
                    >
                      <SkipBack className="w-5 h-5" />
                    </button>

                    <button
                      onClick={skipForward}
                      className="text-white hover:text-gray-300 transition-colors"
                    >
                      <SkipForward className="w-5 h-5" />
                    </button>

                    <button
                      onClick={toggleMute}
                      className="text-white hover:text-gray-300 transition-colors"
                    >
                      {isMuted ? (
                        <VolumeX className="w-5 h-5" />
                      ) : (
                        <Volume2 className="w-5 h-5" />
                      )}
                    </button>

                    <span className="text-white text-sm">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <button
                    onClick={toggleFullscreen}
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    <Maximize className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default CourseVideo;
