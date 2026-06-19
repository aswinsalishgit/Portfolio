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
  body?: { heading: string; text: string }[];
  awards?: string[];
  techStack?: string[];
  futureRoadmap?: string;
  gallery?: { src: string; caption: string }[];
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
      "Power Input: 12V DC / Solenoid Firing",
      "Control Unit: Arduino UNO R3",
      "Aiming Gear: Self-Locking Worm Gear",
      "Sensor Layer: Interlink Force Sensitive Resistors (FSR)",
      "Switching: FQP30N06L N-Channel MOSFETs"
    ],
    body: [
      {
        heading: "The Force-to-Voltage Architecture",
        text: "My process was defined by brutal iteration and a drive for frugal engineering. I designed MSV1 inspired by the Mantis Shrimp's latch-mediated energy storage, decoupling force-loading from firing. Users interact with a single monolithic pedal. Crucially, I utilized a rotary potentiometer to deliver linear, highly accurate analog data. This maps the user's foot pressure to a Pulse Width Modulated (PWM) signal, dynamically driving a 12V DC solenoid to deliver anything from a soft nudge to a high-velocity break shot."
      },
      {
        heading: "Mechanical Innovations",
        text: "To ensure absolute aiming precision, the actuator rotation is controlled by a self-locking worm gear, eliminating aim-drift without the need for electronic brakes. Additionally, the system features a 'Bistable Vertical Suspension System' utilizing a push-push latch. The solenoid rests in a raised 'Hover State' to prevent surface dragging and retracts safely post-impact to avoid recoil damage."
      },
      {
        heading: "Clinical & Medical Applications",
        text: "MSV1 acts as a covert physiotherapy tool. For stroke survivors, modulating exact foot pressure provides real-time proprioceptive feedback, retraining lower-limb fine motor control and neuroplasticity through joyful, competitive gameplay. Furthermore, the core 'Force-to-Voltage' analog architecture is scalable for use in operating rooms as a hands-free Neurosurgical Suction Control system."
      }
    ],
    awards: [
      "1st Prize Winner | Drishti 2.0 Project Expo (Out of 50+ collegiate teams)",
      "1st Prize Winner | EEE Inter-College Microproject Expo (Out of 150 candidates)"
    ],
    techStack: [
      "C/C++",
      "Arduino UNO R3",
      "FQP30N06L MOSFETs",
      "Interlink FSRs",
      "Pulse Width Modulation (PWM)",
      "Autodesk Fusion 360",
      "Cantabile"
    ],
    futureRoadmap: "MSV1 will scale from a $60 prototype to a $25 mass-manufactured unit via a B2B2C clinic distribution model. Technologically, the Custom UI evolves into an AI assistant. Using computer vision, it will analyze carrom board states and input force to provide real-time stroke training. Long-term deployment targets include Stroke Rehabilitation, Geriatric Care, Para-Sports, and Neurosurgical Suction Control.",
    gallery: [
      {
        src: "/images/projects/msv1/project-1.jpg",
        caption: "Mantis Shrimp Variant 1 (MSV1): The final, production-ready product architecture."
      },
      {
        src: "/images/projects/msv1/MSV1 Iso 1.jpg",
        caption: "MSV1 Assembly Blueprint: Isometric perspective optimized in Fusion 360."
      },
      {
        src: "/images/projects/msv1/CAMS v1 - CKTBox (Top View).jpg",
        caption: "MSV1 'Works-Like' Actuator Testbed validating the variable-force PWM logic."
      },
      {
        src: "/images/projects/msv1/Mantis-Shrimp V1 Prototype Setup.jpg",
        caption: "Full System Integration Validation showcasing the floor-mounted pedal and CAMS Controller UI."
      }
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
