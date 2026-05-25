"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "./SmoothScroll";

const navLinks = [
  { name: "Recruit", href: "/recruit" },
  { name: "Articles", href: "/articles" },
  { name: "Projects", href: "/projects" },
  { name: "Endorse", href: "/endorse" },
  { name: "Connect", href: "/connect" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const lenis = useLenis();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle body scroll locking
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [isOpen, lenis]);

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === "/" && lenis) {
      e.preventDefault();
      lenis.scrollTo(0);
    }
  };

  const handleNavLinkClick = (e: React.MouseEvent, href: string) => {
    if (href.startsWith("/#") && pathname === "/" && lenis) {
      e.preventDefault();
      const targetId = href.replace("/#", "");
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        lenis.scrollTo(targetElement);
      }
    }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full transition-all duration-300 ${
        isOpen 
          ? "z-[110] bg-transparent border-transparent" 
          : "z-50 border-b-brutal bg-background/80 backdrop-blur-md"
      }`}>
        <div className="flex items-center px-6 py-4">
          {/* Left Section: Logo */}
          <div className="flex-1">
            <Link 
              href="/" 
              onClick={handleLogoClick}
              className="group flex items-center gap-2 w-fit"
            >
              <div className="w-8 h-8 bg-accent flex items-center justify-center">
                <span className="text-black font-header text-xl font-black">A</span>
              </div>
              <span className="font-header text-xl tracking-tighter uppercase whitespace-nowrap">
                Aswin Salish
              </span>
            </Link>
          </div>
          
          {/* Middle Section: Navigation */}
          <nav className="hidden md:flex items-center gap-8 px-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavLinkClick(e, link.href)}
                className="font-mono text-xs uppercase tracking-widest text-foreground/60 hover:text-accent transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right Section: Actions */}
          <div className="flex-1 flex items-center justify-end gap-4">
            <a 
              href="https://github.com/aswinsalishgit/PortfolioWebsite"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] uppercase text-foreground/40 hidden sm:block hover:text-accent transition-colors cursor-pointer"
            >
              ACCESS CODE
            </a>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-12 h-12 flex flex-col items-end justify-center gap-1.5 group relative"
              aria-label="Toggle menu"
            >
              <div className={`h-[1px] bg-foreground group-hover:bg-accent transition-all duration-300 ${isOpen ? "w-8 rotate-45 translate-y-[4px]" : "w-8"}`} />
              <div className={`h-[1px] bg-foreground group-hover:bg-accent transition-all duration-300 ${isOpen ? "opacity-0" : "w-6"}`} />
              <div className={`h-[1px] bg-foreground group-hover:bg-accent transition-all duration-300 ${isOpen ? "w-8 -rotate-45 -translate-y-[4px]" : "w-4"}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black z-[100] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] md:hidden ${
          isOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col h-full p-8 pt-40 gap-10">
          <div className="flex flex-col gap-6">
            {navLinks.map((link, i) => (
              <Link 
                key={i} 
                href={link.href}
                className="flex items-baseline gap-4 group"
              >
                <span className="font-mono text-accent text-[10px]">0{i + 1} {'//'}</span>
                <span className="text-6xl font-header uppercase tracking-tighter group-hover:text-accent transition-colors">
                  {link.name}
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-auto border-t border-white/10 pt-10 flex flex-col gap-6">
            <a 
              href="https://github.com/aswinsalishgit/PortfolioWebsite"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase text-foreground/40 hover:text-accent transition-colors flex items-center gap-2"
            >
              <span className="w-2 h-2 bg-accent animate-pulse" />
              ACCESS CODE [GITHUB]
            </a>
            
            <div className="flex justify-between items-center font-mono text-[8px] text-foreground/20 uppercase tracking-[0.3em]">
              <span>System: Operational</span>
              <span>2026 // Production</span>
            </div>
          </div>
        </div>

        {/* Shutter background decor */}
        <div className="absolute top-0 right-0 w-[1px] h-full bg-white/5" />
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-white/5" />
      </div>
    </>
  );
}

