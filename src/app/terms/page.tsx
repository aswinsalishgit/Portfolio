"use client";

import ScrollReveal from "@/components/ScrollReveal";

export default function TermsAndConditions() {
  return (
    <main className="relative min-h-screen w-full bg-background pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h1 className="text-huge mb-12">
            Terms & <br /> <span className="text-accent">Conditions</span>
          </h1>
        </ScrollReveal>

        <div className="space-y-16">
          <ScrollReveal delay={0.1}>
            <section className="border-t border-white/10 pt-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <span className="font-mono text-[10px] uppercase text-accent">[01] Acceptance</span>
                <div className="md:col-span-3 space-y-4">
                  <p className="font-mono text-sm leading-relaxed text-foreground/70">
                    By accessing aswinsalish.me, you agree to be bound by these terms and conditions. 
                    This site is a professional portfolio showcasing creative development work.
                  </p>
                </div>
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <section className="border-t border-white/10 pt-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <span className="font-mono text-[10px] uppercase text-accent">[02] Intellectual Property</span>
                <div className="md:col-span-3 space-y-4">
                  <p className="font-mono text-sm leading-relaxed text-foreground/70">
                    All content on this website, including code, designs, animations, and copy, is the intellectual property of Aswin Salish unless otherwise stated. 
                    You may not reproduce, distribute, or use any materials for commercial purposes without explicit permission.
                  </p>
                </div>
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <section className="border-t border-white/10 pt-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <span className="font-mono text-[10px] uppercase text-accent">[03] Usage Limits</span>
                <div className="md:col-span-3 space-y-4">
                  <p className="font-mono text-sm leading-relaxed text-foreground/70">
                    You agree not to attempt to reverse engineer, scrape, or disrupt the website's performance. 
                    This portfolio is designed to demonstrate high-performance digital architectures and should be treated with respect to its engineering.
                  </p>
                </div>
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <section className="border-t border-white/10 pt-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <span className="font-mono text-[10px] uppercase text-accent">[04] Liability</span>
                <div className="md:col-span-3 space-y-4">
                  <p className="font-mono text-sm leading-relaxed text-foreground/70">
                    While I strive for technical perfection, the information provided on this site is "as is". 
                    I am not liable for any damages arising from the use of this website or the information contained herein.
                  </p>
                </div>
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <div className="pt-20 border-t border-white/10 flex justify-between items-center">
              <span className="font-mono text-[10px] uppercase text-foreground/30">Last Updated: April 29, 2026</span>
              <span className="font-mono text-[10px] uppercase text-foreground/30">Legal Archive: 01</span>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </main>
  );
}
