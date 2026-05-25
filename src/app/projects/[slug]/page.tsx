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

                {project.slug === "thermal-braking" ? (
                  <div className="flex flex-col gap-12 mt-8">
                    {/* Game Mechanics block */}
                    <div className="flex flex-col gap-6">
                      <h3 className="font-header text-2xl uppercase tracking-tighter text-white">The Core Mechanics (The State Machine)</h3>
                      <p className="font-mono text-sm text-foreground/75 leading-relaxed">
                        {"Players control two distinct actions simultaneously:"}
                      </p>
                      <ul className="flex flex-col gap-3 font-mono text-xs pl-4 border-l border-accent/30">
                        <li><strong>{"The Right Hand (The State):"}</strong> {"Throw 1 to 5 fingers to set your state."}</li>
                        <li><strong>{"The Left Hand (The Read):"}</strong> {"Throw 1 to 5 fingers to guess your opponent's state."}</li>
                      </ul>
                    </div>

                    {/* Buffer memory cooldown */}
                    <div className="flex flex-col gap-6">
                      <h3 className="font-header text-2xl uppercase tracking-tighter text-white">The &quot;Buffer&quot; (2-Round Cooldown)</h3>
                      <p className="font-mono text-sm text-foreground/70 leading-relaxed">
                        {"When you play a number with your Right Hand, it enters your Buffer. You cannot legally play that number again for the next two rounds. This single rule forces the game to escalate from blind luck into algorithmic prediction. By Round 3, both players' available moves are constrained. You must manage your own legal options while reverse-engineering your opponent's remaining probability matrix. First to 3 points wins."}
                      </p>
                    </div>

                    {/* AI Engine block */}
                    <div className="flex flex-col gap-6">
                      <h3 className="font-header text-2xl uppercase tracking-tighter text-white">The Engine: 3-Tier Heuristic AI</h3>
                      <p className="font-mono text-sm text-foreground/70 leading-relaxed">
                        {"The Bot in this game does not cheat; it simply out-thinks you. The AI is built on a custom heuristic engine with three distinct personality tiers:"}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                        <div className="border border-white/10 bg-white/5 p-6 flex flex-col gap-3">
                          <h4 className="font-header text-sm text-accent">{"Level 1: The Grunt"}</h4>
                          <p className="font-mono text-[11px] text-foreground/50">{"Functionally blind. Plays completely randomly."}</p>
                        </div>
                        <div className="border border-white/10 bg-white/5 p-6 flex flex-col gap-3">
                          <h4 className="font-header text-sm text-accent">{"Level 2: The Sniper"}</h4>
                          <p className="font-mono text-[11px] text-foreground/50">{"Mathematically perfect. It tracks your current Buffer and will never make an illegal guess. It also actively avoids guessing your previous throw."}</p>
                        </div>
                        <div className="border border-white/10 bg-white/5 p-6 flex flex-col gap-3">
                          <h4 className="font-header text-sm text-accent">{"Level 3: The Grandmaster"}</h4>
                          <p className="font-mono text-[11px] text-foreground/50">{"Tracks your soul. The Grandmaster cross-references your current available moves against your entire match history. It uses frequency analysis to predict the number you lean on when panicked, and employs a 20% \"Double-Bluff\" override."}</p>
                        </div>
                      </div>
                    </div>

                    {/* Taunts block */}
                    <div className="flex flex-col gap-6">
                      <h3 className="font-header text-2xl uppercase tracking-tighter text-white">The Psychological Taunt Engine</h3>
                      <p className="font-mono text-sm text-foreground/70 leading-relaxed">
                        {"Inspired by the dynamic bots of Chess.com, Buffer features a zero-latency, offline Taunt Manager. The AI monitors the exact RoundResult state and reacts instantly:"}
                      </p>
                      <ul className="flex flex-col gap-3 font-mono text-xs pl-4 border-l border-accent/30">
                        <li><strong>{"The Blunder Trap:"}</strong> {"If you waste your Read guessing a number that is currently locked in the Bot's Buffer (an impossible move), the engine detects the blunder and ruthlessly mocks your lack of working memory."}</li>
                        <li><strong>{"The Bluff Reveal:"}</strong> {"If the Grandmaster successfully executes its Double-Bluff algorithm against you, it will explicitly tell you in the chat that it knew you were trying to outsmart it."}</li>
                      </ul>
                    </div>

                    {/* UI/UX architecture */}
                    <div className="flex flex-col gap-6">
                      <h3 className="font-header text-2xl uppercase tracking-tighter text-white">UI / UX Architecture</h3>
                      <p className="font-mono text-sm text-foreground/70 leading-relaxed">
                        {"The application is built entirely in Jetpack Compose using modern Android development standards:"}
                      </p>
                      <ul className="flex flex-col gap-2 font-mono text-xs pl-4 border-l border-accent/30">
                        <li><strong>{"State-Driven Rendering:"}</strong> {"Utilizing StateFlow and ViewModel, the UI organically morphs between \"Selection Phase\" and \"Reveal Phase\" on a single screen without jarring navigation changes."}</li>
                        <li><strong>{"Tactical Aesthetic:"}</strong> {"Custom TacticalButton components, sharp corners (RoundedCornerShape(0.dp)), and a strict #1A1D24 dark theme accented with #F58A27 to mimic AAA-shooter loadout screens."}</li>
                        <li><strong>{"Data Persistence:"}</strong> {"Integrated androidx.datastore.preferences to track user data and difficulty settings seamlessly."}</li>
                        <li><strong>{"Zero-Latency Splash:"}</strong> {"Implementation of the modern AndroidX Core Splash Screen API for immediate, flash-free startup."}</li>
                      </ul>
                    </div>

                    {/* Installation section */}
                    <div className="flex flex-col gap-6 bg-white/5 p-8 border border-white/10 mt-8">
                      <h3 className="font-header text-2xl uppercase tracking-tighter text-white">Installation</h3>
                      <p className="font-mono text-sm text-foreground/60 leading-relaxed">
                        {"Buffer is a fully standalone, offline application requiring zero system permissions."}
                      </p>
                      <ol className="flex flex-col gap-3 font-mono text-xs pl-4 list-decimal">
                        <li>{"Navigate to the Releases tab of this repository."}</li>
                        <li>{"Download the latest Buffer.apk."}</li>
                        <li>{"Open the file on your Android device (ensure \"Install from Unknown Sources\" is enabled)."}</li>
                      </ol>
                      <p className="font-mono text-xs text-foreground/40 mt-4 leading-relaxed italic border-t border-white/5 pt-4">
                        {"Note on Installation: Because this app is distributed directly via GitHub and not the Google Play Store, Android's Play Protect will likely flag it as an \"Unrecognized Developer.\" This is a standard OS-level security prompt for sideloaded applications. You can safely bypass this by clicking \"More Details\" -> \"Install Anyway.\""}
                      </p>
                    </div>
                  </div>
                ) : (
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
                )}

                <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-12">
                  <div className="flex flex-col gap-2">
                    <span className="font-mono text-[10px] text-foreground/30 uppercase">{"Year"}</span>
                    <span className="font-mono text-sm">{"2026 // SYSTEM"}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="font-mono text-[10px] text-foreground/30 uppercase">{"Status"}</span>
                    <span className="font-mono text-sm uppercase">{"Prototype V1.0"}</span>
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
