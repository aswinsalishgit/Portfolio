"use client";

import React from "react";
import PageReveal from "@/components/PageReveal";
import { Download, ExternalLink, Mail, MapPin } from "lucide-react";

export default function RecruitPage() {
  const skills = [
    "Next.js / React", "TypeScript", "GSAP / Framer Motion", "Tailwind CSS",
    "Supabase / PostgreSQL", "Node.js", "UI/UX Design", "Performance Optimization"
  ];

  const experience = [
    {
      role: "Fullstack Developer",
      company: "Freelance / Independent",
      period: "2023 - Present",
      description: "Developing high-performance digital experiences for clients globally, focusing on brutalist aesthetics and smooth interactions."
    },
    {
      role: "Frontend Engineer Intern",
      company: "Tech Collective",
      period: "2022 - 2023",
      description: "Collaborated on building complex web applications with a focus on component architecture and state management."
    }
  ];

  return (
    <PageReveal>
      <section className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Info & Skills */}
          <div className="lg:col-span-4 flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <span className="font-mono text-accent text-xs tracking-[0.3em] uppercase">
                [RECRUITMENT_PORTAL]
              </span>
              <h1 className="text-5xl md:text-7xl font-header leading-[0.9] uppercase tracking-tighter">
                Candidate <br /> <span className="text-accent underline decoration-1 underline-offset-8">Profile.</span>
              </h1>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 text-foreground/60 font-mono text-xs">
                <Mail className="w-4 h-4 text-accent" />
                <span>aswinpulikottil@gmail.com</span>
              </div>
              <div className="flex items-center gap-4 text-foreground/60 font-mono text-xs">
                <MapPin className="w-4 h-4 text-accent" />
                <span>Kerala, India (Remote Available)</span>
              </div>
              <div className="flex items-center gap-4 text-foreground/60 font-mono text-xs">
                <ExternalLink className="w-4 h-4 text-accent" />
                <a href="https://github.com/aswinsalishgit" target="_blank" rel="noopener" className="hover:text-accent transition-colors">github.com/aswinsalishgit</a>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <h3 className="font-header text-xl uppercase tracking-widest border-b border-white/10 pb-4">Core Stack</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 font-mono text-[10px] uppercase text-foreground/70">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <button 
              className="group flex items-center justify-between border-brutal p-6 bg-accent text-black hover:bg-white transition-all mt-4"
              onClick={() => window.print()}
            >
              <span className="font-header text-lg uppercase tracking-tighter">Download Resume</span>
              <Download className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
            </button>
          </div>

          {/* Right Column: Digital Resume */}
          <div className="lg:col-span-8">
            <div className="border-brutal bg-white/5 p-8 md:p-12 flex flex-col gap-12">
              <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-header uppercase tracking-tighter text-white">Summary</h2>
                <p className="font-mono text-sm text-foreground/60 leading-relaxed max-w-2xl">
                  A multi-disciplinary developer dedicated to pushing the boundaries of web aesthetics. I specialize in building &quot;Mechanical Minimalist&quot; interfaces that don&apos;t just work well, but feel physical and high-performance.
                </p>
              </div>

              <div className="flex flex-col gap-8">
                <h2 className="text-3xl font-header uppercase tracking-tighter text-white">Professional Experience</h2>
                <div className="flex flex-col gap-12">
                  {experience.map((exp, i) => (
                    <div key={i} className="flex flex-col gap-4 relative pl-8 border-l border-accent/30">
                      <div className="absolute top-0 left-0 w-2 h-2 bg-accent -translate-x-1/2" />
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <h4 className="font-header text-xl uppercase tracking-tighter">{exp.role}</h4>
                        <span className="font-mono text-[10px] text-accent px-2 py-1 bg-accent/10 w-fit">{exp.period}</span>
                      </div>
                      <span className="font-mono text-xs text-foreground/40 uppercase">{exp.company}</span>
                      <p className="font-mono text-sm text-foreground/60 leading-relaxed max-w-xl">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-8">
                <h2 className="text-3xl font-header uppercase tracking-tighter text-white">Educational Background</h2>
                <div className="flex flex-col gap-4 relative pl-8 border-l border-accent/30">
                  <div className="absolute top-0 left-0 w-2 h-2 bg-accent -translate-x-1/2" />
                  <h4 className="font-header text-xl uppercase tracking-tighter">B.Tech in Computer Science</h4>
                  <span className="font-mono text-xs text-foreground/40 uppercase">Christ College of Engineering</span>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center font-mono text-[8px] text-foreground/20 uppercase tracking-[0.3em]">
                <span>Status: Available for Hire</span>
                <span>ID: AS_2026_RECRUIT</span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </PageReveal>
  );
}
