"use client";

import React, { useState } from "react";
import PageReveal from "@/components/PageReveal";

interface Post {
  id: string;
  type: "article" | "update";
  date: string;
  category: string; // "DESIGN", "ENGINEERING", "SYSTEM", "UI/UX", etc.
  title: string;
  desc: string;
  meta?: string; // readTime for articles, status for updates
}

const postsData: Post[] = [
  {
    id: "u1",
    type: "update",
    date: "2026.04.24",
    category: "SYSTEM",
    title: "Supabase Integration Status",
    desc: "Successfully integrated Supabase backend for project inquiries. Connection status: OPERATIONAL.",
    meta: "STABLE"
  },
  {
    id: "u2",
    type: "update",
    date: "2026.04.23",
    category: "UI/UX",
    title: "Transition Performance Optimizations",
    desc: "Refining scroll physics and mechanical transition durations across all primary viewports.",
    meta: "OPTIMIZING"
  },
  {
    id: "u3",
    type: "update",
    date: "2026.04.20",
    category: "PROJECT",
    title: "Portfolio Launch V1.0",
    desc: "V1.0 of the Brutalist Motorsport Portfolio is now live on the production server.",
    meta: "DEPLOYED"
  },
  {
    id: "a1",
    type: "article",
    date: "2026.04.15",
    category: "DESIGN",
    title: "The Industrial Aesthetic in Digital Product Design",
    desc: "Exploring how heavy mechanical influences are reshaping the way we think about user interfaces and digital interactions.",
    meta: "5 MIN"
  },
  {
    id: "a2",
    type: "article",
    date: "2026.03.28",
    category: "ENGINEERING",
    title: "High Performance Web Architectures",
    desc: "Deep dive into the technical systems required to build buttery smooth, hardware-accelerated web experiences.",
    meta: "8 MIN"
  },
  {
    id: "a3",
    type: "article",
    date: "2026.02.12",
    category: "PHILOSOPHY",
    title: "Less but Better: A Brutalist Approach",
    desc: "Why stripping away the fluff and focusing on raw functionality leads to more impactful digital products.",
    meta: "4 MIN"
  }
];

export default function PostsPage() {
  const [filter, setFilter] = useState<"all" | "article" | "update">("all");

  const filteredPosts = postsData.filter(post => filter === "all" || post.type === filter);

  return (
    <PageReveal>
      <section className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="flex flex-col gap-4">
              <span className="font-mono text-accent text-xs tracking-[0.3em] uppercase animate-pulse">
                [SYSTEM_FEED]
              </span>
              <h1 className="text-5xl md:text-8xl font-header leading-[0.9] uppercase tracking-tighter">
                Posts & <br /> <span className="text-accent underline decoration-1 underline-offset-8">Updates.</span>
              </h1>
            </div>
            
            {/* Filter buttons */}
            <div className="flex border border-white/15 bg-white/5 font-mono text-[10px] uppercase">
              {(["all", "article", "update"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-4 py-2 border-r last:border-r-0 border-white/15 cursor-pointer transition-colors ${
                    filter === type ? "bg-accent text-black font-bold" : "text-foreground/60 hover:text-white"
                  }`}
                >
                  {type === "all" ? "ALL" : type === "article" ? "ARTICLES" : "UPDATES"}
                </button>
              ))}
            </div>
          </div>

          {/* Feed */}
          <div className="flex flex-col animate-fade-in">
            {filteredPosts.map((post) => (
              <div 
                key={post.id}
                className="group border-b border-white/10 py-10 flex flex-col md:flex-row gap-6 md:gap-12 items-start hover:bg-white/5 transition-all px-4 -mx-4 cursor-pointer"
              >
                {/* Meta details */}
                <div className="flex md:flex-col justify-between md:justify-start items-center md:items-start gap-3 w-full md:w-32 shrink-0">
                  <span className="font-mono text-xs text-foreground/40">{post.date}</span>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-accent px-2 py-0.5 bg-accent/10 border border-accent/20">
                    {post.type}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-grow flex flex-col gap-3">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h2 className="text-xl md:text-2xl font-header uppercase leading-tight group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>
                    <span className="font-mono text-[9px] text-foreground/40 uppercase tracking-widest border border-white/10 px-2 py-0.5">
                      {post.category}
                    </span>
                  </div>
                  <p className="font-mono text-sm leading-relaxed text-foreground/60 max-w-4xl">
                    {post.desc}
                  </p>
                </div>

                {/* Badge (Read Time / Status) */}
                <div className="w-full md:w-32 shrink-0 flex items-center md:justify-end">
                  {post.meta && (
                    <span className={`font-mono text-[10px] px-3 py-1 border ${
                      post.meta === "STABLE" ? "border-green-500 text-green-500" :
                      post.meta === "OPTIMIZING" ? "border-accent text-accent" :
                      post.meta === "DEPLOYED" ? "border-blue-500 text-blue-500" :
                      "border-white/20 text-white/40"
                    }`}>
                      {post.meta}
                    </span>
                  )}
                </div>

                {/* Icon indicator */}
                <div className="hidden md:block">
                  <div className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-accent transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/20 group-hover:text-accent">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageReveal>
  );
}
