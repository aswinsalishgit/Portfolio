"use client";

import Image from "next/image";
import Link from "next/link";
import { projects, Project } from "@/data/projects";

function ProjectItem({ project, priority = false, span = "" }: { project: Project, priority?: boolean, span?: string }) {
  return (
    <Link 
      href={`/projects/${project.slug}`}
      className={`group relative overflow-hidden border-brutal bg-black cursor-crosshair ${span}`}
    >
      {/* Detail Label (Top Left) */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-0 pointer-events-none">
        <span className="font-mono text-[10px] text-accent font-bold bg-black px-2 mb-1">
          {project.id}
        </span>
        <span className="font-mono text-[8px] text-white/40 uppercase tracking-[0.2em] bg-black/80 px-2 py-1">
          {project.category}
        </span>
      </div>

      {/* Image Container */}
      <div className="relative aspect-[16/10] md:aspect-auto md:h-[60vh] overflow-hidden transition-all duration-700 ease-out">
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
        />
      </div>

      {/* Ticker-tape Marquee (Bottom) - Toxic Yellow Band */}
      <div className="absolute bottom-0 left-0 w-full bg-accent opacity-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] z-30 pointer-events-none translate-y-full group-hover:translate-y-0 transform border-t-brutal">
        <div className="flex overflow-hidden whitespace-nowrap py-3">
          <div className="animate-marquee flex gap-4 pr-4">
            {[...Array(10)].map((_, i) => (
              <span key={i} className="font-header text-xl md:text-2xl text-black uppercase tracking-tighter">
                {project.title} — VIEW DETAILS //
              </span>
            ))}
          </div>
          <div className="animate-marquee flex gap-4 pr-4" aria-hidden="true">
            {[...Array(10)].map((_, i) => (
              <span key={i} className="font-header text-xl md:text-2xl text-black uppercase tracking-tighter">
                {project.title} — VIEW DETAILS //
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ProjectShowcase({ hideHeader = false }: { hideHeader?: boolean }) {
  const spans = ["md:col-span-12", "md:col-span-7", "md:col-span-5"];

  return (
    <section id="projects" className="py-20">
      {!hideHeader && (
        <div className="px-6 mb-12 flex justify-between items-end border-b-brutal pb-8">
          <div>
            <span className="font-mono text-[10px] text-accent uppercase tracking-widest block mb-2">Selected Works</span>
            <h2 className="text-4xl md:text-6xl font-header leading-none">PROJECT <br /> SHOWCASE</h2>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-0 border-brutal bg-border-brutal overflow-hidden">
        {projects.map((project, index) => (
          <ProjectItem 
            key={project.id} 
            project={project} 
            priority={index === 0} 
            span={spans[index] || "md:col-span-6"}
          />
        ))}
      </div>
    </section>
  );
}

