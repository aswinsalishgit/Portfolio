"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  // Close lightbox on Escape, navigate with Arrow keys
  useEffect(() => {
    if (activeIdx === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIdx(null);
      } else if (e.key === "ArrowRight") {
        setActiveIdx((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowLeft") {
        setActiveIdx((prev) => (prev !== null && prev > 0 ? prev - 1 : images.length - 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIdx, images.length]);

  return (
    <div className="flex flex-col gap-2">
      {/* Brutalist Asymmetric Collage Grid */}
      <div className="grid grid-cols-2 gap-2 w-full">
        {/* Main large widescreen screenshot */}
        <div 
          onClick={() => setActiveIdx(0)}
          className="col-span-2 aspect-[16/10] relative border-brutal overflow-hidden group cursor-pointer bg-white/5"
        >
          <Image 
            src={images[0]} 
            alt="Buffer Interface Main"
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
          />
          <div className="absolute inset-0 bg-black/40 opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
          <div className="absolute bottom-3 left-3 bg-black/80 px-2.5 py-1 border border-white/10 backdrop-blur-sm pointer-events-none">
            <span className="font-mono text-[9px] uppercase text-accent tracking-wider font-bold">Deploy // 01</span>
          </div>
        </div>

        {/* Thumbnail grid */}
        {images.slice(1).map((img, i) => (
          <div 
            key={i}
            onClick={() => setActiveIdx(i + 1)}
            className="col-span-1 aspect-[9/16] relative border-brutal overflow-hidden group cursor-pointer bg-white/5"
          >
            <Image 
              src={img} 
              alt={`Buffer Interface Spec ${i + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 200px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
            />
            <div className="absolute inset-0 bg-black/40 opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
            <div className="absolute bottom-3 left-3 bg-black/80 px-2 py-1 border border-white/10 backdrop-blur-sm pointer-events-none">
              <span className="font-mono text-[9px] uppercase text-foreground/50 tracking-wider font-bold">Frame // 0{i + 2}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Google Photos / WhatsApp style Lightbox Modal */}
      {activeIdx !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 md:p-8 animate-in fade-in duration-300">
          
          {/* Header Controls */}
          <div className="flex justify-between items-center w-full z-10">
            <div className="flex flex-col">
              <span className="font-mono text-[10px] text-accent uppercase tracking-widest font-bold">Tactical Viewer</span>
              <span className="font-mono text-xs text-foreground/60">{`Frame 0${activeIdx + 1} of 0${images.length}`}</span>
            </div>
            <button 
              onClick={() => setActiveIdx(null)}
              className="group flex items-center gap-2 border-brutal px-4 py-2 bg-white/5 hover:bg-white text-white hover:text-black font-header tracking-wider text-xs transition-all"
            >
              <div className="w-1.5 h-1.5 bg-accent group-hover:bg-black transition-colors" />
              {"CLOSE VIEW"}
            </button>
          </div>

          {/* Large Image Frame & Arrows */}
          <div className="relative w-full h-[70vh] flex items-center justify-center my-auto">
            {/* Left Navigation Arrow */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setActiveIdx((prev) => (prev !== null && prev > 0 ? prev - 1 : images.length - 1));
              }}
              className="absolute left-0 md:left-4 z-10 w-12 h-12 border-brutal bg-black/60 hover:bg-accent text-white hover:text-black flex items-center justify-center transition-all cursor-pointer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>

            {/* Main Center Image */}
            <div 
              onClick={() => setActiveIdx(null)}
              className="relative w-full h-full max-w-4xl mx-auto flex items-center justify-center p-2 cursor-zoom-out"
            >
              <div className="relative w-full h-full">
                <Image 
                  src={images[activeIdx]} 
                  alt={`Buffer Active View Frame 0${activeIdx + 1}`}
                  fill
                  priority
                  className="object-contain transition-all duration-300"
                />
              </div>
            </div>

            {/* Right Navigation Arrow */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setActiveIdx((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : 0));
              }}
              className="absolute right-0 md:right-4 z-10 w-12 h-12 border-brutal bg-black/60 hover:bg-accent text-white hover:text-black flex items-center justify-center transition-all cursor-pointer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>

          {/* Bottom Thumbnail Strip (Google Photos style) */}
          <div className="flex flex-col gap-4 items-center w-full z-10 border-t border-white/5 pt-4">
            <div className="flex gap-2.5 overflow-x-auto py-1 max-w-full justify-center">
              {images.map((img, i) => (
                <div 
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`relative w-12 md:w-16 h-12 md:h-16 border-brutal cursor-pointer overflow-hidden transition-all duration-300 bg-white/5 flex-shrink-0 ${
                    activeIdx === i ? "border-accent ring-2 ring-accent/30 scale-105" : "border-white/10 hover:border-white/40 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image 
                    src={img} 
                    alt={`Thumb 0${i + 1}`} 
                    fill 
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
