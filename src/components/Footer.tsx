"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "./SmoothScroll";
import { useLiveLocationAndTime } from "@/hooks/useLiveLocationAndTime";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const lenis = useLenis();
  const { timeStr, locationStr, mounted } = useLiveLocationAndTime("40.7128° N, 74.0060° W");

  const handleStartProjectClick = (e: React.MouseEvent) => {
    if (pathname === "/contact" && lenis) {
      e.preventDefault();
      lenis.scrollTo(0);
    }
  };

  return (
    <footer className="w-full border-t-brutal bg-background pt-20 pb-10 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <div>
          <h2 className="text-4xl md:text-6xl font-header mb-8 leading-none">
            Let&apos;s build <br /> <span className="text-accent">something raw.</span>
          </h2>
          <p className="font-mono text-sm max-w-sm text-foreground/60 mb-8">
            Specializing in high-performance digital experiences where engineering meets extreme minimalism.
          </p>
          <Link 
            href="/contact" 
            onClick={handleStartProjectClick}
            className="inline-block border-brutal px-8 py-4 font-header tracking-widest hover:bg-white hover:text-black transition-all"
          >
            START PROJECT
          </Link>
        </div>
        
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-[10px] uppercase text-foreground/40">Navigation</span>
            <ul className="flex flex-col gap-2">
              {[
                { name: "Recruit", href: "/recruit" },
                { name: "Articles", href: "/articles" },
                { name: "Projects", href: "/projects" },
                { name: "Endorse", href: "/endorse" },
                { name: "Connect", href: "/connect" },
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="font-header text-sm tracking-tighter hover:text-accent uppercase transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-mono text-[10px] uppercase text-foreground/40">Socials</span>
            <ul className="flex flex-col gap-2">
              {[
                { name: "Instagram", url: "https://www.instagram.com/aswin_salish/" },
                { name: "LinkedIn", url: "https://www.linkedin.com/in/aswinsalish/" },
                { name: "Github", url: "https://github.com/aswinsalishgit" },
                { name: "X", url: "https://x.com/AswinSalish" },
              ].map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-header text-sm tracking-tighter hover:text-accent uppercase"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-end border-t-brutal pt-8 gap-4">
        <div className="font-mono text-[10px] uppercase text-foreground/40">
          DESIGNED & DEVELOPED BY ASWIN SALISH &copy; {currentYear}
        </div>
        <div className="flex flex-wrap gap-8 font-mono text-[10px] uppercase">
          <Link href="/policy" className="hover:text-accent transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-accent transition-colors">Terms & Conditions</Link>
          <div className="flex gap-8">
            <span>Local Time: {mounted ? timeStr : "--:--:--"}</span>
            <span>{mounted ? locationStr : "40.7128° N, 74.0060° W"}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
