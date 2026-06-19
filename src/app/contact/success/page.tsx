import React from "react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-2xl w-full border-brutal p-12 flex flex-col items-center text-center gap-8 bg-black relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-accent animate-pulse" />
        
        <div className="flex flex-col gap-4">
          <span className="font-mono text-accent text-xs tracking-[0.4em] uppercase">
            INQUIRY COMPLETE
          </span>
          <h1 className="text-5xl md:text-7xl font-header leading-none uppercase tracking-tighter">
            MESSAGE <br /> <span className="text-white underline decoration-1 underline-offset-8">RECEIVED.</span>
          </h1>
        </div>

        <p className="font-mono text-xs text-foreground/40 uppercase max-w-sm leading-relaxed">
          Your details have been successfully routed to my system. 
          I will review your inquiry and respond within 24 to 48 hours.
        </p>

        <div className="flex flex-col gap-4 w-full sm:w-auto">
          <Link 
            href="/"
            className="group flex items-center justify-center gap-4 border border-accent bg-accent px-10 py-4 hover:bg-transparent hover:text-accent transition-all duration-300"
          >
            <span className="font-header text-sm tracking-widest uppercase text-black group-hover:text-accent">
              RETURN TO PORTFOLIO
            </span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black group-hover:text-accent">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </Link>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-4 right-4 font-mono text-[8px] text-foreground/10 uppercase">
          Status: Delivered // Routing: Resend API
        </div>
      </div>
    </section>
  );
}
