export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  image: string;
  desc: string;
  technicalSpecs: string[];
  fullDesc: string;
  role?: string;
  timeline?: string;
}

export const projects: Project[] = [
  {
    id: "01",
    slug: "msv1",
    title: "Mantis Shrimp Variant 1 (MSV1)",
    category: "Mechatronics // Healthcare Tech // Assistive Robotics // Hardware Integration",
    image: "/project-1.jpeg",
    desc: "A bio-inspired, foot-operated electromechanical actuator engineered for inclusive tabletop gameplay and hands-free medical control systems.",
    fullDesc: "As of 2026, the industry has mastered digital accessibility, but physical tabletop recreation remains exclusionary. Existing physical assistive devices are either crude, unpredictable spring-loaded plastics, or unaffordable $30,000 robotic arms. MSV1 shatters this binary. It is the first frugal electromechanical actuator to achieve clinical-grade precision. By translating lower-limb pressure into high-velocity, precision strikes, it enables inclusive Carrom gameplay for upper-limb amputees while serving as a covert physiotherapy tool.",
    role: "Project Lead & Product Engineer",
    timeline: "Fall 2025 - Present",
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
