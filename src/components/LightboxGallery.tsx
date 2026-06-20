"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

interface CustomVideoPlayerProps {
  src: string;
}

function CustomVideoPlayer({ src }: CustomVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const resetTimer = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (!document.fullscreenElement) {
        setShowControls(true);
        return;
      }
      setShowControls(true);
      timeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 5000);
    };

    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isCurrentlyFullscreen);
      resetTimer();
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", resetTimer);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      if (container) {
        container.removeEventListener("mousemove", resetTimer);
      }
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    setIsMuted(video.muted);
    setIsPlaying(!video.paused);
  }, [src]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    setCurrentTime(video.currentTime);
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    setDuration(video.duration);
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || duration === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * duration;
    setCurrentTime(pos * duration);
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(() => {});
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(() => {});
    }
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full flex items-center justify-center group/player select-none"
      onContextMenu={(e) => e.preventDefault()}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className="max-w-full max-h-full object-contain cursor-pointer"
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      {/* Custom Control Overlay */}
      <div 
        className={`absolute bottom-4 left-4 right-4 bg-black/90 border border-white/10 p-4 flex flex-col gap-3 transition-opacity duration-300 z-20 font-mono text-xs select-none ${
          isFullscreen 
            ? (showControls ? "opacity-100" : "opacity-0 pointer-events-none") 
            : "opacity-0 group-hover/player:opacity-100 focus-within:opacity-100"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress Bar Container */}
        <div 
          className="relative h-1.5 w-full bg-white/10 cursor-pointer group/progress"
          onClick={handleProgressClick}
        >
          <div 
            style={{ width: `${progressPercent}%` }}
            className="absolute top-0 left-0 h-full bg-accent transition-all duration-75"
          />
          <div className="absolute top-0 right-0 h-full w-0 group-hover/progress:w-2 bg-white" />
        </div>

        {/* Buttons and telemetries */}
        <div className="flex justify-between items-center text-white">
          <div className="flex items-center gap-6">
            {/* Play/Pause */}
            <button 
              onClick={togglePlay}
              className="hover:text-accent transition-colors flex items-center justify-center p-1"
            >
              {isPlaying ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Time display */}
            <div className="text-[10px] text-foreground/50 tracking-wider">
              {formatTime(currentTime)} <span className="mx-1 text-white/20">/</span> {formatTime(duration)}
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Mute/Unmute */}
            <button 
              onClick={toggleMute}
              className="hover:text-accent transition-colors flex items-center justify-center p-1"
            >
              {isMuted ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              )}
            </button>

            {/* Fullscreen */}
            <button 
              onClick={toggleFullscreen}
              className="hover:text-accent transition-colors flex items-center justify-center p-1"
            >
              {isFullscreen ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 14h6v6M20 10h-6V4M14 10l7-7M10 14l-7 7" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface LightboxGalleryProps {
  images: string[];
  captions?: string[];
  mainImage?: string;
}

export default function LightboxGallery({ images, mainImage }: LightboxGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const lightboxImages = mainImage ? [mainImage, ...images] : images;

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ index: number }>;
      setCurrentIndex(customEvent.detail.index);
      setIsOpen(true);
    };
    window.addEventListener("open-project-lightbox", handleOpen);
    return () => {
      window.removeEventListener("open-project-lightbox", handleOpen);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
      if (e.key === "ArrowLeft") setCurrentIndex((prev) => (prev === 0 ? lightboxImages.length - 1 : prev - 1));
      if (e.key === "ArrowRight") setCurrentIndex((prev) => (prev === lightboxImages.length - 1 ? 0 : prev + 1));
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, lightboxImages.length]);

  if (!images || images.length === 0) return null;

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => setIsOpen(false);

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? lightboxImages.length - 1 : prev - 1));
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === lightboxImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      <h3 className="font-header text-xl uppercase tracking-widest text-white border-b border-white/10 pb-4">
        Gallery
      </h3>
      {/* Collage Grid */}
      <div className="grid grid-cols-2 gap-2">
        {images.map((img, idx) => (
          <div 
            key={idx} 
            className={`relative cursor-pointer overflow-hidden border border-white/10 group ${
              idx === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"
            } select-none`}
            onClick={() => openLightbox(mainImage ? idx + 1 : idx)}
            onContextMenu={(e) => e.preventDefault()}
          >
            {img.endsWith(".mp4") ? (
              <video
                src={img}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onContextMenu={(e) => e.preventDefault()}
              />
            ) : (
              <div className="relative w-full h-full">
                <Image
                  src={img}
                  alt={`Gallery image ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  draggable="false"
                />
                <div className="absolute inset-0 bg-transparent z-10" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-0" />
          </div>
        ))}
      </div>

      {/* Lightbox Viewer */}
      {isOpen && typeof document !== "undefined" && createPortal(
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeLightbox();
            }
          }}
        >
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors z-[110]"
            onClick={closeLightbox}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Previous Button */}
          <button 
            className="absolute left-2 md:left-8 p-4 text-white/50 hover:text-white transition-colors z-[110]"
            onClick={prevImage}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Main Image or Video */}
          <div className="relative w-full h-full max-w-6xl max-h-[72vh] mb-24 mx-16 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {lightboxImages[currentIndex].endsWith(".mp4") ? (
              <CustomVideoPlayer src={lightboxImages[currentIndex]} />
            ) : (
              <div className="relative w-full h-full flex items-center justify-center select-none" onContextMenu={(e) => e.preventDefault()}>
                <Image
                  src={lightboxImages[currentIndex]}
                  alt={`Lightbox image ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                  priority
                  draggable="false"
                />
                <div className="absolute inset-0 bg-transparent z-10" />
              </div>
            )}
          </div>

          {/* Next Button */}
          <button 
            className="absolute right-2 md:right-8 p-4 text-white/50 hover:text-white transition-colors z-[110]"
            onClick={nextImage}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 max-w-lg text-center z-50">
            <div className="font-mono text-xs text-white/50 tracking-widest bg-black/50 px-4 py-2 border border-white/10">
              {currentIndex + 1} / {lightboxImages.length}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
