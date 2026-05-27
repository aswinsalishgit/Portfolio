"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface LightboxGalleryProps {
  images: string[];
}

export default function LightboxGallery({ images }: LightboxGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
      if (e.key === "ArrowLeft") setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      if (e.key === "ArrowRight") setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
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
  }, [isOpen, images.length]);

  if (!images || images.length === 0) return null;

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => setIsOpen(false);

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
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
            }`}
            onClick={() => openLightbox(idx)}
          >
            <Image
              src={img}
              alt={`Gallery image ${idx + 1}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
          </div>
        ))}
      </div>

      {/* Lightbox Viewer */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
          onClick={closeLightbox}
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

          {/* Main Image */}
          <div className="relative w-full h-full max-w-6xl max-h-[85vh] mx-16" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[currentIndex]}
              alt={`Lightbox image ${currentIndex + 1}`}
              fill
              className="object-contain"
              priority
            />
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
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs text-white/50 tracking-widest bg-black/50 px-4 py-2 border border-white/10">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
}
