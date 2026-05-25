export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  image: string;
  desc: string;
  technicalSpecs: string[];
  fullDesc: string;
}

export const projects: Project[] = [
  {
    id: "01",
    slug: "aerodynamics-prototype",
    title: "Mantis Shrimp Variant 1",
    category: "MSV1",
    image: "/project-1.jpeg",
    desc: "A high-fidelity exploration into fluid dynamics and structural integrity for next-generation motorsport vehicles.",
    fullDesc: "This project explores the intersection of aesthetic rawism and pure performance. By utilizing computational fluid dynamics (CFD), we developed a body form that minimizes drag while maintaining a brutalist visual language. The prototype features exposed carbon structures and integrated cooling ducts that function as both performance and aesthetic elements.",
    technicalSpecs: [
      "Drag Coefficient: 0.24 Cd",
      "Material: Pre-preg Carbon Fiber",
      "Process: CFD Simulation + Wind Tunnel Testing",
      "Scale: 1:1 Prototype",
      "Weight: 840kg (Estimated)"
    ]
  },
  {
    id: "02",
    slug: "cockpit-interface",
    title: "MM8 App",
    category: "MM8",
    image: "/mm8.png",
    desc: "Redefining the relationship between driver and machine through high-contrast, zero-latency digital instrumentation.",
    fullDesc: "The Cockpit Interface project focused on human-machine interaction in high-stress environments. We designed a custom operating system that prioritizes essential telemetry using a high-contrast monochromatic palette. The interface responds with zero perceived latency, ensuring the driver is always in sync with the vehicle's internal systems.",
    technicalSpecs: [
      "Refresh Rate: 120Hz",
      "Color Space: P3 Monochromatic",
      "Latency: < 5ms",
      "Input: Haptic Rotary + Touch",
      "Platform: Custom RTOS"
    ]
  },
  {
    id: "03",
    slug: "buffer",
    title: "Buffer Game",
    category: "GAME",
    image: "/buffer.png",
    desc: "A 1v1 psychological deduction game disguised as a mobile app.",
    fullDesc: "Buffer is a high-speed, simultaneous-reveal logic game built natively for Android. It takes the core concept of Rock-Paper-Scissors and completely shatters it by introducing a 2-Round Memory Cooldown and a Heuristic AI Taunt Engine. You are not playing against a random number generator; you are playing against an algorithm that tracks your habits, analyzes your frequency, and actively trash-talks your blunders. The application is built entirely in Jetpack Compose, featuring state-driven rendering and a zero-latency tactical UI.",
    technicalSpecs: [
      "Architecture: Kotlin Jetpack Compose",
      "AI Engine: 3-Tier Heuristic Matrix",
      "State Management: StateFlow + ViewModel",
      "Persistence: AndroidX DataStore Preferences",
      "Start Latency: AndroidX Core Splash API (0ms)",
      "UI Theme: #1A1D24 with #F58A27 Accents"
    ]
  },
];
