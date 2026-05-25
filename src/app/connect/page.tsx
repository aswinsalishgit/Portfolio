"use client";

import React, { useState } from "react";
import PageReveal from "@/components/PageReveal";
import { Mail, Bell, CheckCircle2, ShieldCheck, Zap, Send } from "lucide-react";

export default function ConnectPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageReveal>
      <section className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center max-w-3xl mx-auto text-center gap-12">
          
          <div className="flex flex-col gap-4">
            <span className="font-mono text-accent text-xs tracking-[0.3em] uppercase">
              [COMMUNICATION_LINK]
            </span>
            <h1 className="text-6xl md:text-8xl font-header leading-[0.9] uppercase tracking-tighter">
              System <br /> <span className="text-accent underline decoration-1 underline-offset-8">Feed.</span>
            </h1>
            <p className="font-mono text-sm text-foreground/60 mt-6 max-w-xl mx-auto">
              Stay synchronized with high-performance updates, technical breakdowns, and new case studies. Choose your synchronization frequency.
            </p>
          </div>

          {submitted ? (
            <div className="w-full border-brutal p-16 flex flex-col items-center justify-center text-center gap-8 bg-white/5 animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-accent flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-black" />
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-4xl font-header uppercase tracking-tighter">Synchronization Active</h2>
                <p className="font-mono text-sm text-foreground/50">A confirmation handshake has been sent to your primary address.</p>
              </div>
              <button 
                onClick={() => setSubmitted(false)}
                className="px-8 py-3 border border-white/10 font-mono text-[10px] text-foreground/40 hover:text-accent hover:border-accent uppercase tracking-widest transition-all"
              >
                Modify Preferences
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-12">
              <div className="flex flex-col gap-4 text-left">
                <label className="font-mono text-[10px] uppercase text-foreground/40 pl-1">Primary Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-accent" />
                  <input 
                    required
                    type="email" 
                    placeholder="USER@SYSTEM.COM"
                    className="w-full bg-white/5 border-brutal p-6 pl-16 font-mono text-lg focus:border-accent outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="group relative flex flex-col gap-4 p-8 border border-white/10 bg-white/5 hover:border-accent/50 cursor-pointer transition-all">
                  <input type="checkbox" className="absolute top-6 right-6 w-5 h-5 accent-accent" />
                  <Bell className="w-8 h-8 text-accent" />
                  <div className="text-left">
                    <h3 className="font-header text-xl uppercase tracking-tighter">System Updates</h3>
                    <p className="font-mono text-[10px] text-foreground/40 uppercase mt-1">Direct alerts on new features & infrastructure changes.</p>
                  </div>
                </label>

                <label className="group relative flex flex-col gap-4 p-8 border border-white/10 bg-white/5 hover:border-accent/50 cursor-pointer transition-all">
                  <input type="checkbox" className="absolute top-6 right-6 w-5 h-5 accent-accent" />
                  <Zap className="w-8 h-8 text-accent" />
                  <div className="text-left">
                    <h3 className="font-header text-xl uppercase tracking-tighter">Full Archive</h3>
                    <p className="font-mono text-[10px] text-foreground/40 uppercase mt-1">Bi-weekly technical breakdowns and deep-dives.</p>
                  </div>
                </label>
              </div>

              <button 
                type="submit"
                className="group flex items-center justify-center gap-6 border-brutal p-8 bg-white text-black hover:bg-accent transition-all"
              >
                <span className="font-header text-2xl uppercase tracking-tighter">Initialize Connection</span>
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center group-hover:bg-black transition-colors">
                  <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </button>

              <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-8 border-t border-white/5">
                <div className="flex items-center gap-2 font-mono text-[10px] text-foreground/30 uppercase">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Encrypted Data Transmission</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[10px] text-foreground/30 uppercase">
                  <span>Zero Spam Protocol Enabled</span>
                </div>
              </div>
            </form>
          )}

        </div>
      </section>
    </PageReveal>
  );
}
