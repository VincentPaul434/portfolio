import { BriefcaseBusiness, Code2, GraduationCap } from "lucide-react"

export const projects = [
  {
    id: "01",
    slug: "nurse-tracer",
    title: "CIT NurseTracer",
    shortTitle: "NurseTracer",
    category: "Nursing alumni tracer",
    role: "Full-stack contributor",
    year: "2026",
    description:
      "A privacy-conscious graduate tracer platform for collecting nursing alumni survey responses through a clear, consent-first flow.",
    problem:
      "Graduate outcomes and feedback need a structured, confidential collection flow so CIT-U can study alumni impact without relying on scattered forms or manual consolidation.",
    features: [
      "Consent-first public alumni survey",
      "Protected admin authentication",
      "Survey submission API proxy",
      "Responsive multi-step form",
    ],
    takeaway:
      "Privacy language, validation, and clear step-by-step survey states are product requirements, not finishing touches.",
    tech: ["Next.js", "TypeScript", "Spring Boot", "PostgreSQL"],
    links: [
      { label: "Open live system", href: "https://citnursetracer.vercel.app/" },
      {
        label: "Frontend source",
        href: "https://github.com/VincentPaul434/citnursetracer",
      },
      {
        label: "Backend source",
        href: "https://github.com/VincentPaul434/tracer_backend",
      },
    ],
    visual: "nurse",
  },
  {
    id: "02",
    slug: "synapse-ui",
    title: "Synapse UI",
    shortTitle: "Synapse UI",
    category: "AI team workspace",
    role: "Frontend contributor",
    year: "2026",
    description:
      "A real-time, multi-tenant workspace that brings team chat, shared documents, and AI-assisted workflows into one product.",
    problem:
      "Team knowledge can fragment across chat, documents, and disconnected AI tools, making context harder to find and follow-up work easy to miss.",
    features: [
      "Real-time team chat",
      "Collaborative document workflows",
      "AI summaries and task extraction",
      "RAG-based Q&A and automation",
    ],
    takeaway:
      "A dense collaboration product needs consistent navigation and state feedback so chat, documents, and AI actions still feel like one system.",
    tech: ["Next.js", "TypeScript", "TanStack Query", "Socket.IO"],
    links: [{ label: "View source", href: "https://github.com/princeprog/synapse-ui" }],
    visual: "synapse",
  },
  {
    id: "03",
    slug: "poultry-prophet",
    title: "Poultry Prophet",
    shortTitle: "Poultry",
    category: "Game fowl breeding analytics",
    role: "Full-stack developer",
    year: "2026",
    description:
      "A management platform that tracks bird development and computes transparent readiness scores.",
    problem:
      "Health and readiness were tracked manually, making selection inconsistent and difficult to explain later.",
    features: [
      "Health records by batch and bird",
      "Computed indicators with alerts",
      "Ranked readiness scoring",
      "Exports and real-time updates",
    ],
    takeaway:
      "Keeping scoring logic on the back end made the system easier to test, trust, and reason about.",
    tech: ["Next.js", "TypeScript", "Spring Boot", "PostgreSQL"],
    links: [
      {
        label: "Frontend source",
        href: "https://github.com/VincentPaul434/poultry-prophet-frontend",
      },
      {
        label: "Backend source",
        href: "https://github.com/VincentPaul434/poultry-prophet-backend",
      },
    ],
    visual: "poultry",
  },
]

export const stackGroups = [
  ["Frontend", "React, Next.js, TypeScript, JavaScript, Tailwind CSS"],
  ["Backend", "Spring Boot, Node.js, Java, Python"],
  ["Data", "PostgreSQL, MySQL, MongoDB, Firebase"],
  ["Workflow", "Docker, Git, Vite, Figma"],
]

export const experience = [
  {
    period: "2021 - present",
    title: "BS Information Technology",
    place: "Cebu Institute of Technology - University",
    detail:
      "Building a foundation through coursework, self-study, and experiments that gradually became complete web applications.",
    icon: GraduationCap,
    current: true,
  },
  {
    period: "2025",
    title: "Started shipping full-stack systems",
    place: "Student, collaborative, and independent projects",
    detail:
      "Moved past isolated screens to work on data models, permissions, responsive states, backend logic, and deployment.",
    icon: Code2,
  },
  {
    period: "Now",
    title: "Looking for real product work",
    place: "Internship, junior role, or contract",
    detail:
      "Ready to contribute to useful software, learn from stronger engineers, and own the details that make a product dependable.",
    icon: BriefcaseBusiness,
    current: true,
  },
]

export const aboutText = `NOW

Studying BS Information Technology at CIT-U.
Building practical full-stack web apps across interfaces,
backend logic, databases, and deployment.
Open to internships, junior roles, and contract work.

CURRENT FOCUS

- clear responsive interfaces
- dependable backend logic
- practical systems that hold up beyond the demo`

export const buildLogText = `# BUILD LOG (2026)

- CIT NurseTracer
  Building a consent-first nursing alumni survey and protected admin workflow.

- Synapse UI
  Bringing real-time team chat, shared docs, and AI workflows into one workspace.

- Poultry Prophet
  Keeping health records and readiness scoring transparent, testable, and explainable.`
