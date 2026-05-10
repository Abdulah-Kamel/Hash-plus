import React, { useRef, useState, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
  Loader2
} from "lucide-react";
import { getStreamUrl } from "@/actions/uploadActions";

const CourseVideo = ({ videoUrl, videoKey, thumbnailUrl, contentId, contentType }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [showPlayer, setShowPlayer] = useState(false);
  const [controlsTimeout, setControlsTimeout] = useState(null);
  
  const [activeVideoUrl, setActiveVideoUrl] = useState(videoUrl || "");
  const [isLoadingStream, setIsLoadingStream] = useState(false);
  const [streamError, setStreamError] = useState("");

  // If the parent passes a new videoUrl or videoKey, reset state
  useEffect(() => {
    setActiveVideoUrl(videoUrl || "");
    setShowPlayer(false);
    setIsPlaying(false);
    setStreamError("");
    console.log("videoKey", videoKey);
    
  }, [videoUrl, videoKey]);


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

  if (!videoUrl) {
    return (
      <div className="relative mx-auto rounded-xl overflow-hidden mb-4 w-full min-h-[490px] max-h-[490px] bg-black flex items-center justify-center">
        <p className="text-white">لا يوجد فيديو</p>
      </div>
    );
  }

  const handleStartVideo = async () => {
    console.log("handleStartVideo started");
    
    // Fallback: try to extract key from Cloudinary URL if videoKey is missing
    let derivedKey = videoKey;
    if (!derivedKey && videoUrl) {
      const uploadMatch = videoUrl.split('/upload/');
      if (uploadMatch.length > 1) {
        const parts = uploadMatch[1].split('/');
        if (parts[0].startsWith('v') && !isNaN(parts[0].replace('v', ''))) {
          parts.shift(); // remove version
        }
        derivedKey = parts.join('/');
      }
    }
    
    console.log("Using key:", derivedKey, "contentId:", contentId);

    // If we have a videoKey, we need to fetch the secure stream URL first
    if (derivedKey && contentId) {
      setIsLoadingStream(true);
      setStreamError("");
      const res = await getStreamUrl(contentId, derivedKey, contentType);
      console.log("getStreamUrl result:", res);
      setIsLoadingStream(false);
      
      if (res.success && res.url) {
        // API returns { url: { url: "...", expiresIn: 3600 } }
        const streamUrl = typeof res.url === "string" ? res.url : res.url?.url;
        if (streamUrl) {
          setActiveVideoUrl(streamUrl);
        } else {
          setStreamError("تعذر تحميل الفيديو الآمن");
          return;
        }
      } else {
        setStreamError("تعذر تحميل الفيديو الآمن");
        return; // Don't show player if stream fetch failed
      }
    } else {
      console.warn("Skipped fetching stream URL due to missing key or contentId");
    }

    setShowPlayer(true);
    // After React updates state and mounts the video element, play it.
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(e => console.log("Play interrupted", e));
        setIsPlaying(true);
      }
    }, 100);
  };

  if (!showPlayer) {
    return (
      <div className="relative mx-auto rounded-xl overflow-hidden mb-4 w-full max-h-[490px] bg-black group cursor-pointer" onClick={!isLoadingStream ? handleStartVideo : undefined}>
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt="Video thumbnail"
            className="w-full h-full object-cover min-h-[490px]"
          />
        ) : (
          <div className="w-full min-h-[490px] bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center" />
        )}
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform backdrop-blur-sm">
            {isLoadingStream ? (
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            ) : (
              <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
            )}
          </div>
        </div>

        {streamError && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-lg z-20 shadow-lg">
            {streamError}
          </div>
        )}
      </div>
    );
  }

  // Otherwise, render the custom HTML5 video player
  return (
    <div className="relative mx-auto rounded-xl overflow-hidden mb-4 w-full max-h-[490px] bg-black group"
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
        src={activeVideoUrl}
        className="w-full h-full object-cover min-h-[490px]"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onClick={togglePlay}
        controls={false}
      />
      
      <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}>
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
                className="w-full h-1 bg-white/30 rounded-full cursor-pointer relative"
                onClick={handleSeek}
              >
                <div
                  className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-150"
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
  );
};

export default CourseVideo;
