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
    image: "/project-2.jpeg",
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
    slug: "thermal-braking",
    title: "Buffer Game",
    category: "Buffer",
    image: "/project-3.jpeg",
    desc: "Visualizing extreme kinetic energy conversion through heat mapping and mechanical stress simulations.",
    fullDesc: "Thermal Braking is a visualization study into the physics of deceleration. By mapping the heat generated during extreme braking events, we created a visual language that represents energy dissipation. This project served as both a technical audit for brake cooling systems and a piece of generative digital art.",
    technicalSpecs: [
      "Peak Temp: 950°C",
      "Simulation: Kinetic Energy Transfer",
      "Visualization: Infrared Mapping",
      "Data Rate: 10k Samples/Sec",
      "Rendering: Real-time GPU Path Tracing"
    ]
  },
];
