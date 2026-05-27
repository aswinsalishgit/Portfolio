"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const dragStart = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Disable body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Reset scale and position when active image changes
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [activeIdx]);

  // Imperative wheel listener on container to allow e.preventDefault() for dynamic scale zoom
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isOpen) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setScale((prev) => {
        const zoomStep = 0.15;
        const direction = e.deltaY < 0 ? 1 : -1;
        const nextScale = prev + direction * zoomStep;
        return Math.min(Math.max(nextScale, 1.0), 5.0);
      });
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [isOpen, activeIdx]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setActiveIdx((prev) => (prev + 1) % images.length);
      } else if (e.key === "ArrowLeft") {
        setActiveIdx((prev) => (prev - 1 + images.length) % images.length);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, images.length]);

  // Mouse Drag Panning Logic
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || scale <= 1) return;
    e.preventDefault();
    const newX = e.clientX - dragStart.current.x;
    const newY = e.clientY - dragStart.current.y;
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const openLightbox = (idx: number) => {
    setActiveIdx(idx);
    setIsOpen(true);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 5-Image Brutalist Collage Grid */}
      <div className="grid grid-cols-6 gap-2 w-full">
        {/* Main Large Image */}
        <div
          onClick={() => openLightbox(0)}
          className="col-span-6 aspect-video relative border-brutal overflow-hidden group cursor-pointer bg-black/40"
        >
          <Image
            src={images[0]}
            alt="Telemetry Screenshot 1"
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0 grayscale opacity-70 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          <span className="absolute bottom-3 left-3 font-mono text-[9px] text-accent font-semibold tracking-wider bg-black/80 px-2 py-0.5 border border-accent/20">
            {"[SCR // 01]"}
          </span>
        </div>

        {/* 2x2 Grid for Remaining 4 Images */}
        <div
          onClick={() => openLightbox(1)}
          className="col-span-3 aspect-square relative border-brutal overflow-hidden group cursor-pointer bg-black/40"
        >
          <Image
            src={images[1]}
            alt="Telemetry Screenshot 2"
            fill
            sizes="(max-width: 768px) 50vw, 200px"
            className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0 grayscale opacity-70 group-hover:opacity-100"
          />
          <span className="absolute bottom-2 left-2 font-mono text-[8px] text-accent font-semibold tracking-wider bg-black/80 px-2 py-0.5 border border-accent/20">
            {"[SCR // 02]"}
          </span>
        </div>

        <div
          onClick={() => openLightbox(2)}
          className="col-span-3 aspect-square relative border-brutal overflow-hidden group cursor-pointer bg-black/40"
        >
          <Image
            src={images[2]}
            alt="Telemetry Screenshot 3"
            fill
            sizes="(max-width: 768px) 50vw, 200px"
            className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0 grayscale opacity-70 group-hover:opacity-100"
          />
          <span className="absolute bottom-2 left-2 font-mono text-[8px] text-accent font-semibold tracking-wider bg-black/80 px-2 py-0.5 border border-accent/20">
            {"[SCR // 03]"}
          </span>
        </div>

        <div
          onClick={() => openLightbox(3)}
          className="col-span-3 aspect-square relative border-brutal overflow-hidden group cursor-pointer bg-black/40"
        >
          <Image
            src={images[3]}
            alt="Telemetry Screenshot 4"
            fill
            sizes="(max-width: 768px) 50vw, 200px"
            className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0 grayscale opacity-70 group-hover:opacity-100"
          />
          <span className="absolute bottom-2 left-2 font-mono text-[8px] text-accent font-semibold tracking-wider bg-black/80 px-2 py-0.5 border border-accent/20">
            {"[SCR // 04]"}
          </span>
        </div>

        <div
          onClick={() => openLightbox(4)}
          className="col-span-3 aspect-square relative border-brutal overflow-hidden group cursor-pointer bg-black/40"
        >
          <Image
            src={images[4]}
            alt="Telemetry Screenshot 5"
            fill
            sizes="(max-width: 768px) 50vw, 200px"
            className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0 grayscale opacity-70 group-hover:opacity-100"
          />
          <span className="absolute bottom-2 left-2 font-mono text-[8px] text-accent font-semibold tracking-wider bg-black/80 px-2 py-0.5 border border-accent/20">
            {"[SCR // 05]"}
          </span>
        </div>
      </div>

      {/* Dynamic Lightbox View */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-6 select-none animate-in fade-in duration-200">

          {/* Top Panel: Title and Close button */}
          <div className="flex justify-between items-center w-full z-50">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[9px] text-accent uppercase tracking-widest">Buffer // Telemetry Stream</span>
              <span className="font-mono text-xs text-white uppercase">{"Screenshot 0" + (activeIdx + 1) + " of 0" + images.length}</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="font-mono text-xs text-foreground/50 hover:text-accent border border-white/10 hover:border-accent px-4 py-2 bg-black/40 transition-all cursor-pointer"
            >
              {"[ CLOSE // X ]"}
            </button>
          </div>

          {/* Center Viewport */}
          <div className="relative flex-grow flex items-center justify-center overflow-hidden my-4">
            {/* Left navigation arrow */}
            <button
              onClick={prevImage}
              className="absolute left-4 z-40 w-12 h-12 border border-white/10 hover:border-accent hover:bg-accent hover:text-black flex items-center justify-center font-mono text-white transition-all bg-black/30"
            >
              {"<"}
            </button>

            {/* Zoomable Image Container */}
            <div
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className={`relative max-w-[85vw] max-h-[70vh] aspect-[16/10] md:aspect-auto w-full h-full flex items-center justify-center overflow-hidden ${scale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-default"}`}
            >
              <div
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                  transition: isDragging ? "none" : "transform 0.15s ease-out, translate 0.15s ease-out",
                }}
                className="relative w-full h-full max-w-[85vw] max-h-[70vh] flex items-center justify-center pointer-events-none select-none"
              >
                <Image
                  src={images[activeIdx]}
                  alt={`Telemetry Full Screenshot ${activeIdx + 1}`}
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </div>

            {/* Right navigation arrow */}
            <button
              onClick={nextImage}
              className="absolute right-4 z-40 w-12 h-12 border border-white/10 hover:border-accent hover:bg-accent hover:text-black flex items-center justify-center font-mono text-white transition-all bg-black/30"
            >
              {">"}
            </button>
          </div>

          {/* Bottom Panel: Thumbnails and Feedback */}
          <div className="flex flex-col gap-4 items-center justify-center z-50 border-t border-white/5 pt-4">
            <div className="font-mono text-[9px] text-foreground/45 flex gap-4 uppercase">
              <span>{"Scale: " + scale.toFixed(2) + "x"}</span>
              {scale > 1 && <span>{"[ Drag mouse to pan zoomed image ]"}</span>}
            </div>

            <div className="flex gap-2.5 overflow-x-auto max-w-full py-1">
              {images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`relative w-16 h-10 border cursor-pointer overflow-hidden transition-all ${i === activeIdx ? "border-accent scale-105" : "border-white/10 hover:border-white/40 opacity-50 hover:opacity-80"}`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${i + 1}`}
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
