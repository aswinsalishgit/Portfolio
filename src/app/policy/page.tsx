"use client";

import ScrollReveal from "@/components/ScrollReveal";

export default function PrivacyPolicy() {
  return (
    <main className="relative min-h-screen w-full bg-background pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h1 className="text-huge mb-12">
            Privacy <br /> <span className="text-accent">Policy</span>
          </h1>
        </ScrollReveal>

        <div className="space-y-16">
          <ScrollReveal delay={0.1}>
            <section className="border-t border-white/10 pt-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <span className="font-mono text-[10px] uppercase text-accent">[01] Introduction</span>
                <div className="md:col-span-3 space-y-4">
                  <p className="font-mono text-sm leading-relaxed text-foreground/70">
                    This Privacy Policy explains how I handle your data when you interact with my portfolio website. 
                    As a fullstack developer, I value transparency and data sovereignty.
                  </p>
                </div>
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <section className="border-t border-white/10 pt-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <span className="font-mono text-[10px] uppercase text-accent">[02] Data Collection</span>
                <div className="md:col-span-3 space-y-4">
                  <h2 className="text-xl font-header mb-4">Contact Form & Communication</h2>
                  <p className="font-mono text-sm leading-relaxed text-foreground/70">
                    When you use the contact form, I collect your name, email address, and any information you provide in your message. 
                    This data is used solely to respond to your inquiries and discuss potential projects.
                  </p>
                  <h2 className="text-xl font-header mt-8 mb-4">Analytics</h2>
                  <p className="font-mono text-sm leading-relaxed text-foreground/70">
                    I use minimal, privacy-focused analytics to understand how visitors interact with the site. 
                    This data is anonymized and does not track you across other websites.
                  </p>
                </div>
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <section className="border-t border-white/10 pt-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <span className="font-mono text-[10px] uppercase text-accent">[03] Data Storage</span>
                <div className="md:col-span-3 space-y-4">
                  <p className="font-mono text-sm leading-relaxed text-foreground/70">
                    Your data is stored securely and is never sold to third parties. 
                    I use industry-standard services like Supabase and Resend for backend and email delivery, 
                    ensuring high-level encryption and security protocols.
                  </p>
                </div>
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <section className="border-t border-white/10 pt-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <span className="font-mono text-[10px] uppercase text-accent">[04] Your Rights</span>
                <div className="md:col-span-3 space-y-4">
                  <p className="font-mono text-sm leading-relaxed text-foreground/70">
                    You have the right to request access to, correction of, or deletion of any personal data I hold about you. 
                    If you wish to exercise these rights, please contact me through the contact form.
                  </p>
                </div>
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <div className="pt-20 border-t border-white/10 flex justify-between items-center">
              <span className="font-mono text-[10px] uppercase text-foreground/30">Last Updated: April 29, 2026</span>
              <span className="font-mono text-[10px] uppercase text-foreground/30">System: Active</span>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </main>
  );
}
