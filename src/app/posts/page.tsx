import React from "react";
import PageReveal from "@/components/PageReveal";
import Link from "next/link";

export default function PostsPage() {
  const articles = [
    {
      date: "2026.04.15",
      readTime: "5 MIN",
      category: "DESIGN",
      title: "The Industrial Aesthetic in Digital Product Design",
      desc: "Exploring how heavy mechanical influences are reshaping the way we think about user interfaces and digital interactions.",
      href: "/articles"
    },
    {
      date: "2026.03.28",
      readTime: "8 MIN",
      category: "ENGINEERING",
      title: "High Performance Web Architectures",
      desc: "Deep dive into the technical systems required to build buttery smooth, hardware-accelerated web experiences.",
      href: "/articles"
    }
  ];

  const updates = [
    {
      date: "2026.04.24",
      status: "STABLE",
      tag: "SYSTEM",
      message: "Successfully integrated Supabase backend for project inquiries. Connection status: OPERATIONAL."
    },
    {
      date: "2026.04.23",
      status: "OPTIMIZING",
      tag: "UI/UX",
      message: "Refining scroll physics and mechanical transition durations across all primary viewports."
    }
  ];

  return (
    <PageReveal>
      <section className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-accent text-xs tracking-[0.3em] uppercase">
              [COMMUNICATIONS_HUB]
            </span>
            <h1 className="text-5xl md:text-8xl font-header leading-[0.9] uppercase tracking-tighter">
              Posts & <br /> <span className="text-accent underline decoration-1 underline-offset-8">Updates.</span>
            </h1>
          </div>

          <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Column: Updates Log */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="font-header text-2xl uppercase tracking-widest">System Logs</h3>
                <Link href="/updates" className="font-mono text-[10px] uppercase text-accent hover:text-white transition-colors">View All Logs</Link>
              </div>
              
              <div className="flex flex-col">
                {updates.map((update, i) => (
                  <div key={i} className="group border-b border-white/10 py-8 flex flex-col gap-4 hover:bg-white/5 transition-all px-4 -mx-4">
                    <div className="flex justify-between items-start">
                      <span className="font-mono text-[10px] text-foreground/40">{update.date}</span>
                      <span className={`font-mono text-[10px] px-2 py-0.5 border w-fit ${
                        update.status === "STABLE" ? "border-green-500 text-green-500" : 
                        update.status === "OPTIMIZING" ? "border-accent text-accent" : 
                        "border-white/40 text-white/40"
                      }`}>
                        {update.status}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="font-mono text-[10px] text-accent tracking-[0.2em] uppercase">[{update.tag}]</span>
                      <p className="font-mono text-sm leading-relaxed text-foreground/80">
                        {update.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Articles */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="font-header text-2xl uppercase tracking-widest">Featured Articles</h3>
                <Link href="/articles" className="font-mono text-[10px] uppercase text-accent hover:text-white transition-colors">View All Articles</Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {articles.map((article, i) => (
                  <Link href={article.href} key={i} className="group border-brutal p-6 flex flex-col gap-6 hover:bg-accent hover:text-black transition-all cursor-pointer">
                    <div className="flex justify-between items-start">
                      <span className="font-mono text-[10px] uppercase opacity-50 group-hover:opacity-100">{article.date}</span>
                      <span className="font-mono text-[10px] uppercase border border-current px-2 py-0.5">{article.category}</span>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                      <h2 className="text-xl font-header uppercase leading-tight group-hover:tracking-tight transition-all">
                        {article.title}
                      </h2>
                      <p className="font-mono text-[10px] uppercase opacity-40 group-hover:opacity-80 leading-relaxed line-clamp-3">
                        {article.desc}
                      </p>
                    </div>

                    <div className="mt-auto pt-6 border-t border-current flex justify-between items-center">
                      <span className="font-mono text-[10px] uppercase tracking-widest">{article.readTime} READ</span>
                      <div className="w-6 h-6 flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </PageReveal>
  );
}
