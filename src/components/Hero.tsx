"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LazyVideo from "./LazyVideo";
import { useLiveLocationAndTime } from "@/hooks/useLiveLocationAndTime";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const { timeStr, locationStr, mounted } = useLiveLocationAndTime("19.0760° N, 72.8777° E");

  useGSAP(
    () => {
      // ... logic remains same
      const tl = gsap.timeline({
        defaults: { ease: "power4.inOut" },
      });

      tl.from(".hero-line", {
        y: "100%",
        skewY: 7,
        stagger: 0.1,
        duration: 1.5,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      })
      .to(".hero-line", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1,
        stagger: 0.1,
      }, "-=1.2")
      .from(".hero-accent", {
        opacity: 0,
        x: -20,
        duration: 1,
      }, "-=0.5")
      .to(".hero-bg-container", {
        scale: 1.05,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "linear",
      });

      gsap.to(".hero-accent", {
        opacity: 0.5,
        duration: 0.05,
        repeat: 5,
        yoyo: true,
        delay: 1.5,
      });

      gsap.to(".hero-bg-container", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: container }
  );

  return (
    <section 
      ref={container} 
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Media with Overlay */}
      <div className="hero-bg-container absolute inset-0 z-0">
        <LazyVideo
          src="https://player.vimeo.com/external/517090025.hd.mp4?s=2540d5883d6a6a12003c4f74d49d97d91e3e7f9c&profile_id=175"
          poster="/hero-bg.jpeg"
          className="opacity-40 grayscale brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/60 to-black/20" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full px-6 md:px-12 pointer-events-none">
        <div className="flex flex-col gap-0">
          <div className="overflow-hidden mb-2 flex items-center justify-between">
            <span className="hero-accent font-mono text-xs md:text-sm text-accent uppercase tracking-[0.4em] block">
              FULLSTACK DEVELOPER // PORTFOLIO 2026
            </span>
          </div>
          
          <div className="flex flex-col">
            <div className="overflow-hidden">
              <h1 className="hero-line text-[15vw] md:text-[12vw] font-header leading-[0.8] text-white uppercase tracking-tighter">
                ASWIN
              </h1>
            </div>
            <div className="overflow-hidden flex items-end justify-between w-full">
              <h1 className="hero-line text-[15vw] md:text-[12vw] font-header leading-[0.8] text-white uppercase tracking-tighter">
                SALISH
              </h1>
              <button 
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'Aswin Salish | Fullstack Developer',
                      text: 'Check out the portfolio of Aswin Salish, a Fullstack Developer specializing in high-performance digital experiences.',
                      url: window.location.origin,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.origin);
                    alert("Profile link copied to clipboard!");
                  }
                }}
                className="hero-accent group hidden lg:flex flex-col items-end gap-2 pb-4 pointer-events-auto cursor-pointer"
              >
                <div className="w-24 h-[1px] bg-accent group-hover:w-32 transition-all duration-500" />
                <span className="font-mono text-[10px] text-accent/60 uppercase group-hover:text-accent transition-colors">
                  SHARE MY PROFILE
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-24 grid grid-cols-1 md:grid-cols-12 w-full pt-8 border-t border-white/10">
          <div className="md:col-span-4 overflow-hidden">
            <p className="hero-line font-mono text-[10px] md:text-xs text-foreground/50 uppercase leading-relaxed max-w-xs">
              ENGINEERING SCALABLE FULL-STACK SYSTEMS AND TRANSLATING COMPLEX LOGIC INTO HIGH-PERFORMANCE WEB APPLICATIONS.
            </p>
          </div>
          <div className="md:col-span-8 flex justify-end items-end gap-12 mt-8 md:mt-0">
            <div className="flex flex-col items-end gap-1">
              <span className="font-mono text-[10px] text-foreground/30 uppercase">Coordinates</span>
              <span className="font-mono text-[10px] text-foreground/60">{mounted ? locationStr : "19.0760° N, 72.8777° E"}</span>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="font-mono text-[10px] text-foreground/30 uppercase">Local Time</span>
              <span className="font-mono text-[10px] text-foreground/60 uppercase">{mounted ? timeStr : "17:45"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10">
        <div className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-accent animate-scroll-line" />
        </div>
        <span className="font-mono text-[8px] uppercase tracking-widest text-accent/40">Scroll to Explore</span>
      </div>

      <style jsx>{`
        @keyframes scroll-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scroll-line {
          animation: scroll-line 2s infinite linear;
        }
      `}</style>
    </section>
  );
}
