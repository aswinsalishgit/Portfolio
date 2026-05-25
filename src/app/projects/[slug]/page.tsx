import { projects } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";
import PageReveal from "@/components/PageReveal";
import { notFound } from "next/navigation";
import ImageGallery from "@/components/ImageGallery";

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

                {project.slug === "buffer" && (
                  <div className="flex flex-col gap-4 mt-2">
                    <h3 className="font-header text-xl uppercase tracking-widest text-white border-b border-white/10 pb-4">
                      Images
                    </h3>
                    <ImageGallery 
                      images={[
                        "/bufferp1.jpg",
                        "/bufferp2.jpg",
                        "/bufferp3.jpg",
                        "/bufferp4.jpg",
                        "/bufferp5.jpg"
                      ]} 
                    />
                  </div>
                )}
            </div>

            {/* Right side: Full Description */}
            <div className="lg:col-span-8 flex flex-col gap-12">
               <div className="flex flex-col gap-6">
                 <h3 className="font-header text-2xl uppercase tracking-tighter text-white">Project Narrative</h3>
                 <p className="font-mono text-base md:text-lg text-foreground/70 leading-relaxed max-w-3xl">
                   {project.fullDesc}
                 </p>
               </div>

                {project.slug === "buffer" ? (
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
                    <div className="flex flex-col gap-8 bg-white/[0.02] p-8 border-brutal mt-12 relative overflow-hidden">
                      <div className="flex flex-col gap-2 border-b border-white/10 pb-6">
                        <div className="flex items-center gap-3">
                          <span className="w-2 h-2 bg-accent animate-pulse" />
                          <span className="font-mono text-[10px] text-accent uppercase tracking-widest">Pipeline // Deploy</span>
                        </div>
                        <h3 className="font-header text-3xl uppercase tracking-tighter text-white">Installation Protocols</h3>
                        <p className="font-mono text-xs text-foreground/60 leading-relaxed max-w-2xl">
                          {"Buffer is a zero-dependency, fully offline game. Choose one of the verified installation pipelines below to deploy the package onto your device."}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Method 01: Direct Sideload */}
                        <div className="border-brutal bg-white/5 p-6 flex flex-col justify-between gap-8">
                          <div className="flex flex-col gap-4">
                            <span className="font-mono text-[10px] text-accent uppercase tracking-wider">[Method 01 // Direct Sideload]</span>
                            <h4 className="font-header text-xl text-white">Direct Installation</h4>
                            <p className="font-mono text-xs text-foreground/50 leading-relaxed">
                              {"Instantly retrieve and deploy the pre-compiled, production-ready package on your Android device."}
                            </p>
                            <ul className="flex flex-col gap-2.5 font-mono text-[11px] text-foreground/75 pl-4 list-decimal">
                              <li>{"Enable \"Install from Unknown Sources\" in your Android system settings."}</li>
                              <li>{"Click the download action below to retrieve the direct verified APK package."}</li>
                              <li>{"Open the downloaded file and run the Android package installer."}</li>
                            </ul>
                          </div>
                          
                          <a 
                            href="/Buffer.apk"
                            download="Buffer.apk"
                            className="group flex items-center justify-center gap-3 border-brutal p-4 bg-white text-black hover:bg-accent hover:text-black font-header tracking-wider text-xs transition-all w-full text-center"
                          >
                            <svg 
                              viewBox="0 0 24 24" 
                              fill="currentColor" 
                              className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
                            >
                              <path d="M17.523 15.3414c-.5511 0-1-.4489-1-1s.4489-1 1-1 1 .4489 1 1-.4489 1-1 1zm-11.046 0c-.5511 0-1-.4489-1-1s.4489-1 1-1 1 .4489 1 1-.4489 1-1 1zm11.546-5.8827l1.93-3.3427a.498.498 0 00-.181-.682.497.497 0 00-.68.181l-1.956 3.388C15.86 8.358 13.996 7.962 12 7.962c-1.997 0-3.861.396-5.132 1.026l-1.956-3.388a.496.496 0 00-.68-.181.498.498 0 00-.181.682l1.93 3.3427C2.793 11.2334.619 14.2804.5 17.8484h23c-.119-3.568-2.293-6.615-5.5-7.8497z" />
                            </svg>
                            {"DOWNLOAD FOR ANDROID (v1.0.0)"}
                          </a>
                        </div>

                        {/* Method 02: GitHub Compile/Release */}
                        <div className="border-brutal bg-white/5 p-6 flex flex-col justify-between gap-8">
                          <div className="flex flex-col gap-4">
                            <span className="font-mono text-[10px] text-foreground/45 uppercase tracking-wider">[Method 02 // Github Compile]</span>
                            <h4 className="font-header text-xl text-white">Installation from GitHub</h4>
                            <p className="font-mono text-xs text-foreground/50 leading-relaxed">
                              {"Audit the open-source Kotlin codebase, download public tags, or build the application from source."}
                            </p>
                            <ul className="flex flex-col gap-2.5 font-mono text-[11px] text-foreground/75 pl-4 list-decimal">
                              <li>{"Access the official repository hosted on GitHub."}</li>
                              <li>{"Navigate to the Releases section to verify MD5/SHA256 checksums."}</li>
                              <li>{"Clone the repository to compile the source code via Gradle, or fetch pre-built assets."}</li>
                            </ul>
                          </div>

                          <a 
                            href="https://github.com/aswinsalishgit/Buffer/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-center gap-3 border-brutal p-4 bg-white/5 text-white hover:bg-white hover:text-black font-header tracking-wider text-xs transition-all w-full text-center"
                          >
                            <svg 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
                            >
                              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                              <path d="M9 18c-4.51 2-5-2-7-2" />
                            </svg>
                            {"DOWNLOAD FROM GITHUB"}
                          </a>
                        </div>
                      </div>

                      {/* Warnings Callout */}
                      <div className="flex gap-4 border-t border-white/5 pt-6 mt-2">
                        <div className="flex-shrink-0 w-8 h-8 border border-accent/20 flex items-center justify-center font-mono text-accent text-xs bg-accent/5">
                          {"!"}
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="font-mono text-[10px] text-accent uppercase tracking-wider">Play Protect Warning</span>
                          <p className="font-mono text-[11px] text-foreground/45 leading-relaxed">
                            {"Because this package is distributed directly and not signed through the Google Play Store, Android's Play Protect security layer may display a prompt flagging it as an \"Unrecognized Developer.\" Sideloading is completely secure—simply click \"More Details\" followed by \"Install Anyway\" to complete the setup."}
                          </p>
                        </div>
                      </div>
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
                    <span className="font-mono text-[10px] text-foreground/30 uppercase">
                      {project.slug === "buffer" ? "Latest Version" : "Status"}
                    </span>
                    <span className="font-mono text-sm uppercase">
                      {project.slug === "buffer" ? "Buffer v1.0.0" : "Prototype V1.0"}
                    </span>
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
