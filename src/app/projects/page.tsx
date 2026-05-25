import Image from "next/image";
import PageReveal from "@/components/PageReveal";
import Link from "next/link";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <PageReveal>
      <section className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <span className="font-mono text-accent text-xs tracking-[0.3em] uppercase">
            [SELECTED_CASE_STUDIES]
          </span>
          <h1 className="text-5xl md:text-8xl font-header leading-[0.9] uppercase tracking-tighter">
            Selected <br /> <span className="text-accent underline decoration-1 underline-offset-8">Projects.</span>
          </h1>
        </div>
        
        <div className="mt-20 flex flex-col gap-0 border-t border-white/10">
          {projects.map((project, i) => (
            <Link 
              href={`/projects/${project.slug}`}
              key={i} 
              className="group border-b border-white/10 py-16 md:py-24 flex flex-col md:flex-row gap-12 md:gap-20 items-start hover:bg-white/[0.02] transition-colors px-4 -mx-4"
            >
              <div className="w-full md:w-[45%] relative aspect-[16/10] border-brutal overflow-hidden">
                <Image 
                  src={project.image}
                  alt={project.title}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0 grayscale"
                />
              </div>
              
              <div className="w-full md:w-[55%] flex flex-col gap-8">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-accent text-xs">Project {project.id}</span>
                  <span className="font-mono text-[10px] text-foreground/40 uppercase tracking-widest">{project.category}</span>
                </div>
                
                <div className="flex flex-col gap-4">
                  <h2 className="text-4xl md:text-7xl font-header uppercase leading-none tracking-tighter group-hover:text-accent transition-colors">
                    {project.title}
                  </h2>
                  <p className="font-mono text-xs md:text-sm text-foreground/60 leading-relaxed max-w-md uppercase">
                    {project.desc}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-4 group/btn cursor-pointer">
                  <div className="w-10 h-10 border border-white/20 flex items-center justify-center group-hover/btn:border-accent group-hover/btn:bg-accent transition-all">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:text-black">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] group-hover/btn:text-accent transition-colors">View technical docs</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
    </PageReveal>
  );
}

