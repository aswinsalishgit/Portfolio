import Hero from "@/components/Hero";
import ScrollReveal from "@/components/ScrollReveal";
import ProjectShowcase from "@/components/ProjectShowcase";
import EndorsementList from "@/components/EndorsementList";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      
      <div className="px-6 py-20">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 border-brutal group">
            {[
              { label: "01", title: "Recruit", desc: "EVALUATE TECHNICAL BACKGROUND AND SECURE RESUME." },
              { label: "02", title: "Endorse", desc: "APPEND A PUBLIC PEER REVIEW OR VERIFIED RECOMMENDATION." },
              { label: "03", title: "Subscribe", desc: "RECEIVE UPDATES ON PROJECT BUILDS AND DEPLOYMENTS." },
            ].map((item, i) => (
              <Link 
                href={item.title === "Subscribe" ? "/connect" : `/${item.title.toLowerCase()}`}
                key={i} 
                className={`p-8 border-brutal hover:bg-accent hover:text-black transition-all cursor-pointer group/item ${
                  i === 1 ? "md:border-x-brutal" : ""
                }`}
              >
                <span className="font-mono text-[10px] mb-4 block opacity-50 group-hover/item:opacity-100">{item.label}</span>
                <h3 className="text-2xl font-header mb-2 uppercase">{item.title}</h3>
                <p className="font-mono text-[10px] uppercase opacity-40 group-hover/item:opacity-80">
                  {item.desc}
                </p>
              </Link>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/10 pt-20">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-accent text-[10px] tracking-[0.3em] uppercase">[SYSTEM_MANIFESTO]</span>
              <h2 className="text-4xl md:text-6xl font-header leading-none uppercase tracking-tighter">Raw <br /> Engineering.</h2>
            </div>
            <div className="flex flex-col gap-6">
              <p className="font-mono text-sm md:text-base leading-relaxed text-foreground/60 uppercase">
                A digital archive and high-performance technical exhibition. This platform serves as a nexus where motorsport-inspired engineering meets brutalist minimalism, showcasing a portfolio of creative development, digital architectures, and experimental interface design.
              </p>
              <p className="font-mono text-sm md:text-base leading-relaxed text-foreground/60 uppercase border-l border-accent pl-6">
                Every line of code is optimized for raw performance and aesthetic precision. This is not just a portfolio; it is a live system feed of technical excellence and creative exploration.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-40">
          <ProjectShowcase />
        </ScrollReveal>

        <ScrollReveal className="mt-40">
          <div className="flex flex-col gap-12 border-t border-white/10 pt-20">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-accent text-[10px] tracking-[0.3em] uppercase">[COMMUNITY_FEED]</span>
              <h2 className="text-4xl md:text-6xl font-header leading-none uppercase tracking-tighter">System <br /> Endorsements.</h2>
            </div>
            <EndorsementList />
          </div>
        </ScrollReveal>
      </div>
      
      {/* Background Decor */}
      <div className="absolute top-[120vh] left-1/2 -translate-x-1/2 w-full h-[50vh] -z-10 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-0 right-0 font-header text-[20vw] leading-none select-none -mr-[5%] mt-[5%] blur-sm">
          08
        </div>
      </div>
    </div>
  );
}
