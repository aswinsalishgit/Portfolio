"use client";

import React, { useState } from "react";
import { submitInquiry } from "./actions";
import PageReveal from "@/components/PageReveal";
import { useRouter } from "next/navigation";
import { useLiveLocationAndTime } from "@/hooks/useLiveLocationAndTime";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { timeStr, mounted } = useLiveLocationAndTime();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    try {
      const result = await submitInquiry(formData);
      if (result?.success) {
        router.push("/contact/success");
      } else if (result?.error) {
        setError(result.error);
        setIsSubmitting(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Transmission failed.");
      setIsSubmitting(false);
    }
  };

  return (
    <PageReveal>
      <section className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <span className="font-mono text-accent text-xs tracking-[0.3em] uppercase animate-pulse">
            [PROJECT_INITIATION]
          </span>
          <h1 className="text-5xl md:text-8xl font-header leading-[0.9] uppercase tracking-tighter">
            Establishing <br /> <span className="text-accent underline decoration-1 underline-offset-8">Connection.</span>
          </h1>
          <p className="font-mono text-xs text-foreground/40 mt-4 uppercase max-w-md">
            System ready for data intake. Please provide mission parameters below.
          </p>
        </div>

        <form 
          onSubmit={handleSubmit}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 border-t border-white/10 pt-16"
        >
          {/* 01 // FULL NAME */}
          <div className="flex flex-col gap-4 group">
            <label htmlFor="name" className="font-mono text-[10px] md:text-xs text-foreground/40 uppercase tracking-widest group-focus-within:text-accent transition-colors">
              01 // FULL NAME
            </label>
            <input 
              type="text" 
              id="name"
              name="name"
              placeholder="OPERATOR NAME"
              required
              className="bg-transparent border-b border-white/20 pb-4 font-mono text-lg md:text-xl uppercase placeholder:text-foreground/10 focus:outline-none focus:border-accent transition-all selection:bg-accent selection:text-black"
            />
          </div>

          {/* 02 // EMAIL ADDRESS */}
          <div className="flex flex-col gap-4 group">
            <label htmlFor="email" className="font-mono text-[10px] md:text-xs text-foreground/40 uppercase tracking-widest group-focus-within:text-accent transition-colors">
              02 // EMAIL ADDRESS
            </label>
            <input 
              type="email" 
              id="email"
              name="email"
              placeholder="COMM_LINK@DOMAIN.COM"
              required
              className="bg-transparent border-b border-white/20 pb-4 font-mono text-lg md:text-xl uppercase placeholder:text-foreground/10 focus:outline-none focus:border-accent transition-all selection:bg-accent selection:text-black"
            />
          </div>

          {/* 03 // WHO ARE YOU? */}
          <div className="flex flex-col gap-4 group">
            <label htmlFor="role" className="font-mono text-[10px] md:text-xs text-foreground/40 uppercase tracking-widest group-focus-within:text-accent transition-colors">
              03 // WHO ARE YOU?
            </label>
            <div className="relative">
              <select 
                id="role"
                name="role"
                required
                defaultValue=""
                className="w-full bg-transparent border-b border-white/20 pb-4 font-mono text-lg md:text-xl uppercase focus:outline-none focus:border-accent transition-all appearance-none cursor-pointer selection:bg-accent selection:text-black"
              >
                <option value="" disabled className="bg-black text-foreground/20">IDENTIFY ENTITY</option>
                <option value="Recruiter" className="bg-black text-white">RECRUITER</option>
                <option value="Client" className="bg-black text-white">CLIENT</option>
                <option value="Collaborator" className="bg-black text-white">COLLABORATOR</option>
                <option value="Other" className="bg-black text-white">OTHER</option>
              </select>
              <div className="absolute right-0 bottom-4 pointer-events-none text-accent">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-90">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </div>
          </div>

          {/* 04 // PROJECT MESSAGE */}
          <div className="flex flex-col gap-4 group md:col-span-2">
            <label htmlFor="message" className="font-mono text-[10px] md:text-xs text-foreground/40 uppercase tracking-widest group-focus-within:text-accent transition-colors">
              04 // PROJECT MESSAGE
            </label>
            <textarea 
              id="message"
              name="message"
              rows={4}
              placeholder="DESCRIBE THE MISSION..."
              required
              className="bg-transparent border-b border-white/20 pb-4 font-mono text-lg md:text-xl uppercase placeholder:text-foreground/10 focus:outline-none focus:border-accent transition-all resize-none selection:bg-accent selection:text-black"
            />
          </div>

          {error && (
            <div className="md:col-span-2 text-red-500 font-mono text-xs uppercase animate-pulse">
              [ERROR] // {error}
            </div>
          )}

          <div className="md:col-span-2 mt-8">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="group flex items-center gap-4 border border-white/20 px-10 py-6 hover:border-accent transition-all relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="font-header text-xl tracking-widest uppercase relative z-10 group-hover:text-black transition-colors duration-300">
                {isSubmitting ? "DISPATCHING..." : "DISPATCH INQUIRY"}
              </span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`relative z-10 group-hover:text-black group-hover:translate-x-2 transition-all duration-300 ${isSubmitting ? "animate-bounce" : ""}`}>
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
              <div className={`absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out ${isSubmitting ? "translate-y-0" : ""}`} />
            </button>
          </div>
        </form>

        <div className="mt-20 border-t border-white/10 pt-8 flex justify-between items-center font-mono text-[10px] text-foreground/20 uppercase">
          <span>Security Protocol: Encrypted</span>
          <span>Buffer Status: Ready</span>
          <span className="hidden md:block">Time: {mounted && timeStr ? timeStr : ""}</span>
        </div>
      </div>
    </section>
    </PageReveal>
  );
}
