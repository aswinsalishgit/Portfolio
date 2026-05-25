import { projects } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";
import PageReveal from "@/components/PageReveal";
import { notFound } from "next/navigation";

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <PageReveal mode="fade">
      <section className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col gap-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-12 gap-8">
            <div className="flex flex-col gap-4">
              <h1 className="text-5xl md:text-9xl font-header leading-[0.8] uppercase tracking-tighter">
                {project.title.split(' ')[0]} <br /> 
                <span className="text-accent underline decoration-1 underline-offset-[12px]">
                  {project.title.split(' ').slice(1).join(' ')}.
                </span>
              </h1>
            </div>
            <Link 
              href="/projects"
              className="group flex items-center gap-4 font-mono text-[10px] uppercase text-foreground/40 hover:text-accent transition-colors border border-white/10 px-6 py-3"
            >
              <div className="w-2 h-2 bg-foreground/20 group-hover:bg-accent transition-colors" />
              Back to Registry
            </Link>
          </div>

          {/* Main Image */}
          <div className="relative aspect-[16/10] md:aspect-[21/9] w-full border-brutal overflow-hidden group">
             <Image 
               src={project.image}
               alt={project.title}
               fill
               priority
               className="object-cover transition-transform duration-1000 group-hover:scale-105"
             />
             <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
          </div>

          {/* Detailed Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mt-8">
            {/* Left side: Technical Specs */}
            <div className="lg:col-span-4 flex flex-col gap-10">
               <div className="flex flex-col gap-4">
                 <h3 className="font-header text-xl uppercase tracking-widest text-white border-b border-white/10 pb-4">
                   Technical Specs
                 </h3>
                 <ul className="flex flex-col gap-3">
                   {project.technicalSpecs.map((spec, i) => (
                     <li key={i} className="font-mono text-xs text-foreground/60 flex items-center gap-3">
                       <span className="w-1.5 h-1.5 bg-accent" />
                       {spec}
                     </li>
                   ))}
                 </ul>
               </div>

               <div className="flex flex-col gap-4">
                 <h3 className="font-header text-xl uppercase tracking-widest text-white border-b border-white/10 pb-4">
                   Category
                 </h3>
                 <span className="font-mono text-xs text-accent uppercase tracking-[0.2em]">
                   {project.category}
                 </span>
               </div>
            </div>

            {/* Right side: Full Description */}
            <div className="lg:col-span-8 flex flex-col gap-12">
               <div className="flex flex-col gap-6">
                 <h3 className="font-header text-2xl uppercase tracking-tighter text-white">Project Narrative</h3>
                 <p className="font-mono text-base md:text-lg text-foreground/70 leading-relaxed max-w-3xl">
                   {project.fullDesc}
                 </p>
               </div>

               <div className="flex flex-col gap-8 bg-white/5 p-8 border-l-2 border-accent">
                 <h3 className="font-header text-xl uppercase tracking-tighter text-white flex items-center gap-4">
                   <span className="text-accent text-xs">01 //</span> System Architecture
                 </h3>
                 <p className="font-mono text-sm text-foreground/50 leading-relaxed">
                   The infrastructure for this project was built on a proprietary stack designed for maximum data throughput. Every module was audited for mechanical efficiency and aesthetic consistency with the core system protocol.
                 </p>
                 <div className="flex gap-4">
                    <div className="px-3 py-1 bg-white/5 border border-white/10 font-mono text-[8px] uppercase text-accent">Active Protocol</div>
                    <div className="px-3 py-1 bg-white/5 border border-white/10 font-mono text-[8px] uppercase text-foreground/40">Verified Audit</div>
                 </div>
               </div>

               <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-12">
                 <div className="flex flex-col gap-2">
                   <span className="font-mono text-[10px] text-foreground/30 uppercase">Year</span>
                   <span className="font-mono text-sm">2026 // SYSTEM</span>
                 </div>
                 <div className="flex flex-col gap-2">
                   <span className="font-mono text-[10px] text-foreground/30 uppercase">Status</span>
                   <span className="font-mono text-sm uppercase">Prototype V1.0</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </PageReveal>
  );
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}
