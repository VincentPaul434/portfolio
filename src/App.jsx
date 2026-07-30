import { useEffect, useMemo, useRef, useState } from "react"
import {
  ArrowRight,
  ArrowUpRight,
  BookOpenText,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  CircleHelp,
  Code2,
  Copy,
  ExternalLink,
  File,
  FileCode2,
  FileText,
  Folder,
  Github,
  GraduationCap,
  Grid2X2,
  Linkedin,
  List,
  Mail,
  MapPin,
  Maximize2,
  Minus,
  Monitor,
  Moon,
  Newspaper,
  Palette,
  RefreshCw,
  Search,
  Send,
  Settings2,
  Square,
  Sun,
  Terminal,
  UserRound,
  X,
} from "lucide-react"

const EMAIL = "dumangcasvincentpaul@gmail.com"
const GITHUB = "https://github.com/VincentPaul434"
const LINKEDIN = "https://www.linkedin.com/in/vincent-paul-dumangcas-74063a365/"
const STORAGE_KEY = "vincent-portfolio-desktop-v2"

const projects = [
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

const stackGroups = [
  ["Frontend", "React, Next.js, TypeScript, JavaScript, Tailwind CSS"],
  ["Backend", "Spring Boot, Node.js, Java, Python"],
  ["Data", "PostgreSQL, MySQL, MongoDB, Firebase"],
  ["Workflow", "Docker, Git, Vite, Figma"],
]

const experience = [
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

const aboutText = `NOW

Studying BS Information Technology at CIT-U.
Building practical full-stack web apps across interfaces,
backend logic, databases, and deployment.
Open to internships, junior roles, and contract work.

CURRENT FOCUS

- clear responsive interfaces
- dependable backend logic
- practical systems that hold up beyond the demo`

const buildLogText = `# BUILD LOG (2026)

- CIT NurseTracer
  Building a consent-first nursing alumni survey and protected admin workflow.

- Synapse UI
  Bringing real-time team chat, shared docs, and AI workflows into one workspace.

- Poultry Prophet
  Keeping health records and readiness scoring transparent, testable, and explainable.`

const appMeta = {
  about: {
    id: "about",
    label: "About",
    icon: UserRound,
    route: "/about",
    x: 112,
    y: 18,
    width: 500,
    height: 610,
    minWidth: 420,
    minHeight: 430,
  },
  blog: {
    id: "blog",
    label: "Blog",
    icon: Newspaper,
    route: "/blog",
    x: 230,
    y: 44,
    width: 940,
    height: 535,
    minWidth: 520,
    minHeight: 350,
  },
  contact: {
    id: "contact",
    label: "Contact",
    icon: Mail,
    route: "/contact",
    x: 570,
    y: 18,
    width: 500,
    height: 610,
    minWidth: 420,
    minHeight: 500,
  },
  experience: {
    id: "experience",
    label: "Experience",
    icon: List,
    route: "/experience",
    x: 330,
    y: 28,
    width: 780,
    height: 600,
    minWidth: 520,
    minHeight: 410,
  },
  help: {
    id: "help",
    label: "Help",
    icon: CircleHelp,
    route: "/help",
    x: 310,
    y: 70,
    width: 860,
    height: 505,
    minWidth: 500,
    minHeight: 340,
  },
  settings: {
    id: "settings",
    label: "Settings",
    icon: Settings2,
    route: "/settings",
    x: 270,
    y: 24,
    width: 900,
    height: 600,
    minWidth: 520,
    minHeight: 440,
  },
  terminal: {
    id: "terminal",
    label: "Terminal",
    icon: Terminal,
    route: "/terminal",
    x: 200,
    y: 62,
    width: 920,
    height: 545,
    minWidth: 480,
    minHeight: 330,
  },
  works: {
    id: "works",
    label: "Works",
    icon: BriefcaseBusiness,
    route: "/works",
    x: 150,
    y: 8,
    width: 1080,
    height: 600,
    minWidth: 600,
    minHeight: 420,
  },
  "about-file": {
    id: "about-file",
    label: "about.txt",
    icon: FileText,
    route: "/desktop/about.txt",
    x: 400,
    y: 92,
    width: 580,
    height: 420,
    minWidth: 360,
    minHeight: 260,
    meta: `${aboutText.length} chars`,
  },
  "build-log-file": {
    id: "build-log-file",
    label: "build-log.md",
    icon: FileText,
    route: "/desktop/build-log.md",
    x: 450,
    y: 112,
    width: 600,
    height: 430,
    minWidth: 360,
    minHeight: 260,
    meta: `${buildLogText.length} chars`,
  },
}

for (const [index, project] of projects.entries()) {
  appMeta[`folder-${project.slug}`] = {
    id: `folder-${project.slug}`,
    label: project.title,
    icon: Folder,
    route: `/desktop/${project.slug}`,
    x: 170 + index * 64,
    y: 32 + index * 42,
    width: 620,
    height: 470,
    minWidth: 420,
    minHeight: 300,
    meta: "4 items",
  }
  appMeta[`project-${project.slug}`] = {
    id: `project-${project.slug}`,
    label: project.title,
    icon: FileCode2,
    route: `/works/${project.slug}`,
    x: 54 + index * 30,
    y: 8 + index * 14,
    width: 1080,
    height: 600,
    minWidth: 650,
    minHeight: 420,
    meta: "CASE STUDY",
  }
}

const dockApps = [
  "about",
  "blog",
  "contact",
  "experience",
  "help",
  "search",
  "settings",
  "terminal",
  "works",
]

const dockMeta = {
  ...appMeta,
  search: { id: "search", label: "Search", icon: Search },
}

const desktopItems = [
  ...projects.map((project) => ({
    id: `folder-${project.slug}`,
    label: project.shortTitle,
    type: "folder",
  })),
  { id: "contact", label: "Contact", type: "app" },
  { id: "about-file", label: "about.txt", type: "text" },
  { id: "build-log-file", label: "build-log.md", type: "text" },
]

function idFromPath(pathname) {
  if (pathname === "/" || pathname === "") return null
  const direct = Object.values(appMeta).find((item) => item.route === pathname)
  return direct?.id ?? null
}

function routeForId(id) {
  return appMeta[id]?.route ?? "/"
}

function createWindowState(meta) {
  return {
    x: meta.x,
    y: meta.y,
    width: meta.width,
    height: meta.height,
    isOpen: false,
    minimized: false,
    maximized: false,
    z: 1,
  }
}

function readSavedDesktop() {
  if (typeof window === "undefined") return null
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "null")
  } catch {
    return null
  }
}

function createInitialDesktop() {
  const saved = readSavedDesktop()
  const windows = Object.fromEntries(
    Object.entries(appMeta).map(([id, meta]) => {
      const base = createWindowState(meta)
      const persisted = saved?.windows?.[id]
      const restored = persisted
        ? {
            ...base,
            x: Number.isFinite(persisted.x) ? persisted.x : base.x,
            y: Number.isFinite(persisted.y) ? persisted.y : base.y,
            width: Number.isFinite(persisted.width) ? persisted.width : base.width,
            height: Number.isFinite(persisted.height) ? persisted.height : base.height,
            isOpen: Boolean(persisted.isOpen),
            minimized: Boolean(persisted.minimized),
            maximized: Boolean(persisted.maximized),
            z: Number.isFinite(persisted.z) ? persisted.z : base.z,
          }
        : base
      const geometry =
        typeof window !== "undefined" && window.innerWidth > 640
          ? clampPosition(id, restored.x, restored.y, restored.width, restored.height)
          : {}
      return [
        id,
        { ...restored, ...geometry },
      ]
    }),
  )

  const routeId = typeof window === "undefined" ? null : idFromPath(window.location.pathname)
  let activeId = saved?.activeId && windows[saved.activeId]?.isOpen ? saved.activeId : null

  if (routeId && windows[routeId]) {
    const nextZ = Math.max(2, ...Object.values(windows).map((item) => item.z)) + 1
    windows[routeId] = {
      ...windows[routeId],
      isOpen: true,
      minimized: false,
      z: nextZ,
    }
    activeId = routeId
  }

  return { windows, activeId }
}

function topVisibleId(windows, excludedId) {
  return (
    Object.entries(windows)
      .filter(
        ([id, item]) => id !== excludedId && item.isOpen && !item.minimized,
      )
      .sort((a, b) => b[1].z - a[1].z)[0]?.[0] ?? null
  )
}

function useClock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  return useMemo(() => {
    const parts = new Intl.DateTimeFormat("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Manila",
    }).formatToParts(now)
    const value = (type) => parts.find((part) => part.type === type)?.value ?? ""

    return {
      date: `${value("weekday")} ${value("day")} ${value("month")}`,
      time: `${value("hour")}:${value("minute")} PHT`,
      full: new Intl.DateTimeFormat("en-PH", {
        dateStyle: "full",
        timeStyle: "medium",
        timeZone: "Asia/Manila",
      }).format(now),
    }
  }, [now])
}

function clampPosition(id, x, y, width, height) {
  const meta = appMeta[id]
  const workspaceWidth = window.innerWidth
  const workspaceHeight = window.innerHeight - 36
  const maxWidth = Math.max(1, workspaceWidth - 16)
  const maxHeight = Math.max(40, workspaceHeight - 88)
  const minWidth = Math.min(meta.minWidth, maxWidth)
  const minHeight = Math.min(meta.minHeight, maxHeight)
  const nextWidth = Math.min(maxWidth, Math.max(minWidth, width))
  const nextHeight = Math.min(maxHeight, Math.max(minHeight, height))
  return {
    x: Math.min(Math.max(8, x), Math.max(8, workspaceWidth - nextWidth - 8)),
    y: Math.min(Math.max(8, y), Math.max(8, workspaceHeight - nextHeight - 76)),
    width: nextWidth,
    height: nextHeight,
  }
}

function WindowFrame({
  id,
  state,
  active,
  children,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onMove,
  onResize,
}) {
  const meta = appMeta[id]
  const interactionRef = useRef(null)

  const beginInteraction = (kind) => (event) => {
    if (event.button !== 0 || state.maximized || window.innerWidth <= 640) return
    event.preventDefault()
    event.stopPropagation()
    onFocus(id)
    event.currentTarget.setPointerCapture(event.pointerId)
    interactionRef.current = {
      kind,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      x: state.x,
      y: state.y,
      width: state.width,
      height: state.height,
    }
  }

  const continueInteraction = (event) => {
    const interaction = interactionRef.current
    if (!interaction || event.pointerId !== interaction.pointerId) return
    const deltaX = event.clientX - interaction.startX
    const deltaY = event.clientY - interaction.startY

    if (interaction.kind === "move") {
      onMove(id, {
        x: interaction.x + deltaX,
        y: interaction.y + deltaY,
      })
      return
    }

    onResize(id, {
      width:
        interaction.kind === "height"
          ? interaction.width
          : interaction.width + deltaX,
      height:
        interaction.kind === "width"
          ? interaction.height
          : interaction.height + deltaY,
    })
  }

  const endInteraction = (event) => {
    if (interactionRef.current?.pointerId !== event.pointerId) return
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    interactionRef.current = null
  }

  const pointerHandlers = (kind) => ({
    onPointerDown: beginInteraction(kind),
    onPointerMove: continueInteraction,
    onPointerUp: endInteraction,
    onPointerCancel: endInteraction,
  })

  if (!state.isOpen) return null

  return (
    <article
      className={[
        "os-window",
        active ? "is-active" : "",
        state.minimized ? "is-minimized" : "",
        state.maximized ? "is-maximized" : "",
        `window-${id.replaceAll(" ", "-")}`,
      ]
        .filter(Boolean)
        .join(" ")}
      style={
        state.maximized
          ? { zIndex: state.z }
          : {
              left: `${state.x}px`,
              top: `${state.y}px`,
              width: `${state.width}px`,
              height: state.minimized ? "40px" : `${state.height}px`,
              zIndex: state.z,
            }
      }
      onPointerDown={() => onFocus(id)}
      onFocusCapture={() => {
        if (!active && !state.minimized) onFocus(id)
      }}
      aria-label={meta.label}
    >
      <header
        className="window-titlebar"
        {...pointerHandlers("move")}
        onDoubleClick={() => onMaximize(id)}
      >
        <span className="window-title">{meta.label}</span>
        <span className="window-title-spacer" />
        {active ? <span className="active-diamond" aria-hidden="true" /> : null}
        {meta.meta ? <span className="window-meta">{meta.meta}</span> : null}
        <nav className="window-controls" aria-label={`${meta.label} window controls`}>
          <button
            type="button"
            className="window-control control-minimize"
            aria-label={`${state.minimized ? "Restore" : "Minimize"} ${meta.label}`}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation()
              onMinimize(id)
            }}
          >
            <Minus aria-hidden="true" />
          </button>
          <button
            type="button"
            className="window-control control-maximize"
            aria-label={`${state.maximized ? "Restore" : "Expand"} ${meta.label}`}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation()
              onMaximize(id)
            }}
          >
            <Square aria-hidden="true" />
          </button>
          <button
            type="button"
            className="window-control control-close"
            aria-label={`Close ${meta.label}`}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation()
              onClose(id)
            }}
          >
            <X aria-hidden="true" />
          </button>
        </nav>
      </header>

      <div className="window-body" hidden={state.minimized}>
        {children}
      </div>

      {!state.minimized && !state.maximized ? (
        <>
          <span
            className="resize-handle resize-width"
            aria-hidden="true"
            {...pointerHandlers("width")}
          />
          <span
            className="resize-handle resize-height"
            aria-hidden="true"
            {...pointerHandlers("height")}
          />
          <span
            className="resize-handle resize-corner"
            aria-hidden="true"
            {...pointerHandlers("both")}
          >
            <i />
            <i />
            <i />
          </span>
        </>
      ) : null}
    </article>
  )
}

function Panel({ title, children, className = "" }) {
  return (
    <section className={`lined-panel ${className}`}>
      <div className="panel-label">{title}</div>
      <div className="panel-content">{children}</div>
    </section>
  )
}

function AboutApp({ openApp }) {
  return (
    <article className="about-app">
      <figure className="about-photo">
        <img src="/profile-photo.jpg" alt="A childhood photo of Vincent" />
        <figcaption>
          <span>VPD / ARCHIVE</span>
          <span>CEBU, PH</span>
        </figcaption>
      </figure>

      <div className="about-copy">
        <h2>Vincent Paul Dumangcas</h2>
        <p>
          I&apos;m an IT student at CIT-U who cares about the small decisions that make software
          feel calm under real use - forms, tables, permissions, empty states, and clear labels.
        </p>
        <p>
          I work across the full path from data and backend logic to responsive frontend flows. I
          care about finishing what I start and understanding why a system behaves the way it does.
        </p>

        <Panel title="CURRENT FOCUS" className="about-focus">
          <ul className="dot-list">
            <li>Completing BS Information Technology at CIT-U.</li>
            <li>Shipping practical full-stack student, collaborative, and independent projects.</li>
            <li>Looking for internship, junior, and contract opportunities.</li>
          </ul>
        </Panel>

        <div className="about-cta">
          <div>
            <span className="micro-label">FULL TIMELINE</span>
            <p>Education, current work, and the direction I&apos;m heading.</p>
          </div>
          <button type="button" className="flat-button" onClick={() => openApp("experience")}>
            Open Experience
            <ArrowRight aria-hidden="true" />
          </button>
        </div>

        <div className="about-links">
          <a href={GITHUB} target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight aria-hidden="true" />
          </a>
          <a href={LINKEDIN} target="_blank" rel="noreferrer">
            LinkedIn <ArrowUpRight aria-hidden="true" />
          </a>
          <button type="button" onClick={() => openApp("contact")}>
            Get in touch <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  )
}

function WorksApp({ openApp }) {
  return (
    <article className="works-app">
      <header className="app-intro">
        <h2>Works</h2>
        <p>
          Selected student, collaborative, and independent projects, shown with the problem,
          stack choices, and decisions behind each build.
        </p>
      </header>

      <Panel title="PROJECT LIST" className="project-list-panel">
        <ul className="project-list">
          {projects.map((project) => (
            <li key={project.slug}>
              <button type="button" onClick={() => openApp(`project-${project.slug}`)}>
                <span>
                  <strong>{project.title}</strong>
                  <small>
                    <i aria-hidden="true">•</i> {project.role} <i aria-hidden="true">•</i>{" "}
                    {project.year} <i aria-hidden="true">•</i> {project.category}
                  </small>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="TIMELINE (FROM 2024)" className="timeline-panel">
        <div className="works-timeline" aria-label="Project timeline">
          <div className="timeline-canvas">
            <div className="timeline-grid-head">
              <span>PROJECTS</span>
              <span>2024</span>
              <span>2025</span>
              <span>2026</span>
            </div>
            {projects.map((project, index) => (
              <button
                type="button"
                className="timeline-row"
                key={project.slug}
                onClick={() => openApp(`project-${project.slug}`)}
              >
                <span>{project.shortTitle}</span>
                <span className="timeline-track">
                  <i className={`project-bar bar-${index + 1}`} />
                  {index === 0 ? <b>Today</b> : null}
                </span>
              </button>
            ))}
          </div>
        </div>
      </Panel>
    </article>
  )
}

function ProjectVisual({ project }) {
  if (project.visual === "nurse") {
    return (
      <div className="project-mockup mockup-nurse" aria-label="NurseTracer interface schematic">
        <div className="mockup-topbar">
          <b>CIT-U TRACER</b>
          <span>ALUMNI SURVEY</span>
        </div>
        <div className="ward-grid">
          {["01", "02", "03", "04"].map((step, index) => (
            <div key={step}>
              <small>STEP {step}</small>
              <strong>{["Consent", "Profile", "Employment", "Feedback"][index]}</strong>
              <i style={{ width: `${45 + index * 12}%` }} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (project.visual === "synapse") {
    return (
      <div className="project-mockup mockup-synapse" aria-label="Synapse team workspace schematic">
        <div className="component-nav">
          <b>SYNAPSE / TEAM</b>
          <span>LIVE WORKSPACE</span>
        </div>
        <div className="component-preview">
          <button type="button"># general</button>
          <button type="button">New document</button>
          <label>
            AI summary progress
            <input type="range" min="0" max="100" defaultValue="64" tabIndex="-1" />
          </label>
          <div>
            <i />
            <span>Realtime connected</span>
            <b>LIVE</b>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="project-mockup mockup-poultry" aria-label="Poultry Prophet analytics schematic">
      <div className="score-head">
        <span>READINESS</span>
        <strong>86.4</strong>
      </div>
      <div className="score-chart">
        {[44, 62, 50, 73, 68, 91, 86].map((height, index) => (
          <i key={index} style={{ height: `${height}%` }} />
        ))}
      </div>
      <div className="score-table">
        <span>BATCH A-12</span>
        <b>HEALTHY</b>
        <span>UPDATED NOW</span>
      </div>
    </div>
  )
}

function ProjectDetailApp({ project }) {
  return (
    <article className="project-case">
      <div className="case-copy">
        <header>
          <h2>{project.title}</h2>
          <p>
            {project.role} <i aria-hidden="true">•</i> {project.year}
          </p>
        </header>

        <div className="case-links">
          {project.links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
              {link.label}
              <ExternalLink aria-hidden="true" />
            </a>
          ))}
        </div>

        <div className="case-meta-block">
          <span className="micro-label">TECH STACK</span>
          <div className="chip-list">
            {project.tech.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        <div className="case-meta-block">
          <span className="micro-label">TASKS</span>
          <div className="chip-list task-list">
            {project.features.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        <section className="case-section">
          <h3>Problem</h3>
          <p>{project.problem}</p>
        </section>

        <section className="case-section">
          <h3>What I built</h3>
          <p>{project.description}</p>
          <ul>
            {project.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </section>

        <section className="case-section">
          <h3>Takeaway</h3>
          <p>{project.takeaway}</p>
        </section>
      </div>

      <aside className="case-visuals">
        <div className="visuals-heading">
          <span>VISUALS</span>
          <small>3 PANELS</small>
        </div>
        <figure>
          <ProjectVisual project={project} />
          <figcaption>SLIDE 1 <i aria-hidden="true">•</i> INTERFACE SCHEMATIC</figcaption>
        </figure>
        <figure className="visual-note">
          <div>
            <span>{project.id}</span>
            <h3>{project.category}</h3>
            <p>{project.description}</p>
          </div>
          <figcaption>SLIDE 2 <i aria-hidden="true">•</i> PROJECT NOTE</figcaption>
        </figure>
        <figure className="visual-stack">
          <div>
            {project.tech.map((item, index) => (
              <span key={item}>
                <b>{String(index + 1).padStart(2, "0")}</b>
                {item}
              </span>
            ))}
          </div>
          <figcaption>SLIDE 3 <i aria-hidden="true">•</i> BUILD STACK</figcaption>
        </figure>
      </aside>
    </article>
  )
}

function FolderApp({ project, openApp }) {
  const firstLink = project.links[0]
  const files = [
    {
      label: "README.md",
      type: "TEXT",
      icon: FileText,
      action: () => openApp(`project-${project.slug}`),
    },
    {
      label: "stack.json",
      type: "CODE",
      icon: FileCode2,
      action: () => openApp(`project-${project.slug}`),
    },
    {
      label: "project-notes.txt",
      type: "TEXT",
      icon: File,
      action: () => openApp(`project-${project.slug}`),
    },
    {
      label: firstLink.label.toLowerCase().replaceAll(" ", "-") + ".url",
      type: "LINK",
      icon: ExternalLink,
      href: firstLink.href,
    },
  ]

  return (
    <article className="folder-app">
      <header className="folder-heading">
        <h2>Folder Contents</h2>
        <p>{files.length} items</p>
      </header>
      <ul className="folder-list">
        {files.map((file) => {
          const Icon = file.icon
          const content = (
            <>
              <Icon aria-hidden="true" />
              <span>{file.label}</span>
              <small>{file.type}</small>
            </>
          )

          return (
            <li key={file.label}>
              {file.href ? (
                <a href={file.href} target="_blank" rel="noreferrer">
                  {content}
                </a>
              ) : (
                <button type="button" onClick={file.action}>
                  {content}
                </button>
              )}
            </li>
          )
        })}
      </ul>
      <footer>
        <span>{project.title}</span>
        <span>{project.year}</span>
      </footer>
    </article>
  )
}

function TextFileApp({ initialValue, label }) {
  const [value, setValue] = useState(initialValue)
  return (
    <div className="text-file-app">
      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        aria-label={`Editable ${label}`}
        spellCheck="false"
      />
      <footer>
        <span>PLAIN TEXT</span>
        <span>{value.length} CHARS</span>
        <span>UTF-8</span>
      </footer>
    </div>
  )
}

function BlogApp({ openApp }) {
  const notes = [
    {
      project: projects[0],
      title: "Designing a consent-first alumni tracer flow",
      summary:
        "A build note on privacy language, validation, and keeping a long graduate survey clear from consent through submission.",
    },
    {
      project: projects[1],
      title: "Keeping a real-time AI workspace coherent",
      summary:
        "What I learned while bringing chat, shared documents, AI actions, and live connection states into one interface.",
    },
    {
      project: projects[2],
      title: "Keeping readiness scores explainable",
      summary:
        "Why health records and scoring logic are easier to trust when the rules live in one testable place.",
    },
  ]

  return (
    <article className="blog-app">
      <header className="app-intro">
        <h2>Build Log</h2>
        <p>
          Notes from the work already in this portfolio. Open an entry to inspect the corresponding
          project and its decisions.
        </p>
      </header>
      <Panel title="POST LIST">
        <ul className="post-list">
          {notes.map((note) => (
            <li key={note.project.slug}>
              <button type="button" onClick={() => openApp(`project-${note.project.slug}`)}>
                <Folder aria-hidden="true" />
                <span>
                  <strong>{note.title}</strong>
                  <small>
                    {note.project.title} <i aria-hidden="true">•</i> {note.project.year}
                  </small>
                  <p>{note.summary}</p>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Panel>
    </article>
  )
}

function ExperienceApp() {
  return (
    <article className="experience-app">
      <header className="app-intro">
        <h2>Experience</h2>
        <p>A concise timeline of my education, project work, and current direction.</p>
      </header>

      <Panel title="CURRENT FOCUS">
        <ul className="dot-list">
          <li>Completing BS Information Technology at CIT-U.</li>
          <li>Shipping practical student, collaborative, and independent full-stack systems.</li>
          <li>Looking for internship, junior, and contract opportunities.</li>
        </ul>
      </Panel>

      <Panel title="TIMELINE" className="career-panel">
        <ol className="career-list">
          {experience.map((item) => {
            const Icon = item.icon
            return (
              <li key={`${item.period}-${item.title}`}>
                <span className="career-dot" aria-hidden="true" />
                <article>
                  <header>
                    <Icon aria-hidden="true" />
                    <h3>{item.title}</h3>
                    <span>{item.place}</span>
                    {item.current ? <b>Current</b> : null}
                  </header>
                  <p className="career-period">{item.period}</p>
                  <p>{item.detail}</p>
                </article>
              </li>
            )
          })}
        </ol>
      </Panel>
    </article>
  )
}

function ContactApp({ copyEmail, copied, showToast }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [status, setStatus] = useState("Fill in the form. Sending opens your email app.")
  const [showErrors, setShowErrors] = useState(false)

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const submit = (event) => {
    event.preventDefault()
    setShowErrors(true)
    if (!form.name || !form.email || !form.subject || !form.message) {
      setStatus("Please complete every field before continuing.")
      return
    }

    const body = `Hi Vincent,\n\n${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`
    const href = `mailto:${EMAIL}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`
    setShowErrors(false)
    setStatus("Your email app is opening with the message prepared.")
    showToast("Opening your email app")
    window.location.href = href
  }

  return (
    <article className="contact-app">
      <header className="app-intro">
        <h2>Contact</h2>
        <p>Send a project inquiry, collaboration note, or a simple hello.</p>
      </header>

      <form onSubmit={submit}>
        <p className="form-status" role="status" id="contact-form-status">
          {status}
        </p>
        <label>
          <span>Name</span>
          <input
            name="name"
            value={form.name}
            onChange={updateField}
            placeholder="Your name"
            autoComplete="name"
            required
            aria-invalid={showErrors && !form.name}
            aria-describedby="contact-form-status"
          />
        </label>
        <label>
          <span>Email</span>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={updateField}
            placeholder="you@example.com"
            autoComplete="email"
            required
            aria-invalid={showErrors && !form.email}
            aria-describedby="contact-form-status"
          />
        </label>
        <label>
          <span>Subject</span>
          <input
            name="subject"
            value={form.subject}
            onChange={updateField}
            placeholder="Project inquiry"
            required
            aria-invalid={showErrors && !form.subject}
            aria-describedby="contact-form-status"
          />
        </label>
        <label>
          <span>Message</span>
          <textarea
            name="message"
            value={form.message}
            onChange={updateField}
            placeholder="Tell me a bit about your project..."
            rows="6"
            required
            aria-invalid={showErrors && !form.message}
            aria-describedby="contact-form-status"
          />
        </label>
        <button type="submit" className="flat-button is-primary">
          Send message
          <Send aria-hidden="true" />
        </button>
      </form>

      <footer className="contact-directory">
        <button type="button" onClick={copyEmail}>
          {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
          {copied ? "Email copied" : EMAIL}
        </button>
        <a href={GITHUB} target="_blank" rel="noreferrer">
          <Github aria-hidden="true" /> GitHub
        </a>
        <a href={LINKEDIN} target="_blank" rel="noreferrer">
          <Linkedin aria-hidden="true" /> LinkedIn
        </a>
      </footer>
    </article>
  )
}

function SettingsApp({
  mode,
  setMode,
  palette,
  setPalette,
  wallpaper,
  setWallpaper,
  brightness,
  setBrightness,
}) {
  const paletteOptions = [
    { id: "moss", label: "Moss", color: "#315044" },
    { id: "pine", label: "Pine", color: "#17352d" },
    { id: "sage", label: "Sage", color: "#718675" },
  ]

  return (
    <article className="settings-app">
      <header className="app-intro">
        <h2>Settings</h2>
      </header>

      <Panel title="APPEARANCE">
        <div className="setting-row">
          <span>Theme mode</span>
          <div className="segmented">
            <button
              type="button"
              className={mode === "light" ? "is-selected" : ""}
              aria-pressed={mode === "light"}
              onClick={() => setMode("light")}
            >
              Light
            </button>
            <button
              type="button"
              className={mode === "dark" ? "is-selected" : ""}
              aria-pressed={mode === "dark"}
              onClick={() => setMode("dark")}
            >
              Dark
            </button>
          </div>
        </div>
        <div className="setting-row">
          <span>Theme color</span>
          <div className="palette-options">
            {paletteOptions.map((option) => (
              <button
                type="button"
                key={option.id}
                className={palette === option.id ? "is-selected" : ""}
                aria-pressed={palette === option.id}
                onClick={() => setPalette(option.id)}
              >
                <i style={{ background: option.color }} />
                {option.label}
              </button>
            ))}
          </div>
        </div>
        <label className="brightness-setting">
          <span>Brightness</span>
          <input
            type="range"
            min="80"
            max="110"
            value={brightness}
            onChange={(event) => setBrightness(Number(event.target.value))}
          />
          <b>{brightness}%</b>
        </label>
      </Panel>

      <Panel title="WALLPAPER">
        <p className="setting-help">
          Choose the sunrise landscape, a flat desktop, a subtle grid, or Vincent&apos;s archive photo.
        </p>
        <div className="wallpaper-options">
          {[
            { id: "nature", label: "Golden hills" },
            { id: "solid", label: "Solid moss" },
            { id: "grid", label: "System grid" },
            { id: "photo", label: "VPD archive" },
          ].map((option) => (
            <button
              type="button"
              key={option.id}
              className={[
                `wallpaper-preview preview-${option.id}`,
                wallpaper === option.id ? "is-selected" : "",
              ].join(" ")}
              aria-pressed={wallpaper === option.id}
              onClick={() => setWallpaper(option.id)}
            >
              <span aria-hidden="true" />
              <small>{option.label}</small>
            </button>
          ))}
        </div>
      </Panel>
    </article>
  )
}

function HelpApp() {
  return (
    <article className="help-app">
      <header className="app-intro">
        <h2>Portfolio Guide</h2>
        <p>
          This is a desktop-style portfolio. Open apps in draggable windows, browse project
          folders, search the workspace, or use commands in Terminal.
        </p>
      </header>

      <section>
        <h3>How To Open Apps</h3>
        <ul>
          <li>Click app icons in the bottom dock to open or focus a window.</li>
          <li>Open the folders and text files on the desktop to inspect Vincent&apos;s work.</li>
          <li>Use Search to find an app, project, skill, or contact link.</li>
          <li>Use Terminal commands for keyboard-driven navigation.</li>
        </ul>
      </section>

      <section>
        <h3>Search</h3>
        <p>Try: <code>show projects</code> <i>|</i> <code>open contact</code> <i>|</i>{" "}
          <code>find React</code> <i>|</i> <code>about Vincent</code>
        </p>
      </section>

      <section>
        <h3>CLI Quick Start</h3>
        <p>Open Terminal and run:</p>
        <code className="command-strip">
          help apps ls open &lt;app&gt; close &lt;app&gt; windows man &lt;command&gt;
        </code>
      </section>
    </article>
  )
}

function TerminalApp({ openApp, closeApp, closeAll, openWindows }) {
  const [lines, setLines] = useState([
    { type: "system", text: "Vincent Portfolio Terminal v1.1" },
    { type: "system", text: "Type help to list all available commands." },
    { type: "system", text: "Use open <app-id> to launch apps." },
  ])
  const [value, setValue] = useState("")
  const inputRef = useRef(null)
  const outputRef = useRef(null)

  useEffect(() => {
    outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight })
  }, [lines])

  const aliases = {
    about: "about",
    blog: "blog",
    "build-log": "blog",
    contact: "contact",
    experience: "experience",
    guide: "help",
    help: "help",
    settings: "settings",
    terminal: "terminal",
    work: "works",
    works: "works",
    projects: "works",
    "about.txt": "about-file",
    "build-log.md": "build-log-file",
  }

  const responseFor = (raw) => {
    const command = raw.toLowerCase().trim()
    if (command === "help") {
      return "help  apps  ls  open <app>  close <app>  windows  whoami  works  skills  contact  cat <file>  date  clear  man <command>"
    }
    if (command === "apps") {
      return "about  blog  contact  experience  help  settings  terminal  works"
    }
    if (command === "ls") {
      return "nurse-tracer/  synapse-ui/  poultry-prophet/  Contact.app  about.txt  build-log.md"
    }
    if (command === "whoami" || command === "about") {
      return "Vincent Paul Dumangcas - Cebu-based BSIT student and full-stack developer building practical web apps."
    }
    if (command === "works" || command === "work" || command === "projects") {
      return projects.map((project) => `${project.id} ${project.title}`).join("  /  ")
    }
    if (command === "skills" || command === "stack") {
      return stackGroups.map(([group, tools]) => `${group}: ${tools}`).join("  |  ")
    }
    if (command === "contact") return `${EMAIL}  |  github.com/VincentPaul434`
    if (command === "date") {
      return new Intl.DateTimeFormat("en-PH", {
        dateStyle: "full",
        timeStyle: "medium",
        timeZone: "Asia/Manila",
      }).format(new Date())
    }
    if (command === "windows") {
      return openWindows.length ? openWindows.map((id) => appMeta[id].label).join("  /  ") : "No open windows."
    }
    if (command === "cat about.txt") return aboutText
    if (command === "cat build-log.md") return buildLogText
    if (command.startsWith("open ")) {
      const target = command.slice(5).trim()
      const project = projects.find(
        (item) => item.slug === target || item.title.toLowerCase() === target,
      )
      const id = project ? `project-${project.slug}` : aliases[target]
      if (!id) return `No app named "${target}". Run apps or ls for available names.`
      openApp(id)
      return `Opening ${appMeta[id].label}...`
    }
    if (command === "close all") {
      closeAll()
      return "Closed all windows except this terminal session."
    }
    if (command.startsWith("close ")) {
      const target = command.slice(6).trim()
      const id = aliases[target]
      if (!id) return `No app named "${target}".`
      closeApp(id)
      return `Closed ${appMeta[id].label}.`
    }
    if (command.startsWith("man ")) {
      const target = command.slice(4).trim()
      const docs = {
        open: "open <app> - opens or focuses an app, project, or text file.",
        close: "close <app> - closes one app. close all closes every other window.",
        cat: "cat about.txt | cat build-log.md - reads a desktop text file.",
        windows: "windows - lists the windows that are currently open.",
      }
      return docs[target] ?? `No manual entry for ${target}. Try open, close, cat, or windows.`
    }
    return `Command not found: ${raw}. Type help for the command list.`
  }

  const submit = (event) => {
    event.preventDefault()
    const raw = value.trim()
    if (!raw) return
    setValue("")
    if (raw.toLowerCase() === "clear") {
      setLines([])
      return
    }
    const output = responseFor(raw)
    setLines((current) => [
      ...current,
      { type: "command", text: `vincent@portfolio:~$ ${raw}` },
      { type: "output", text: output },
    ])
  }

  return (
    <div className="terminal-app" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-output" ref={outputRef} aria-live="polite">
        {lines.map((line, index) => (
          <p key={`${line.type}-${index}`} className={`terminal-${line.type}`}>
            {line.text}
          </p>
        ))}
        <form onSubmit={submit}>
          <label htmlFor="terminal-input">vincent@portfolio:~$</label>
          <input
            ref={inputRef}
            id="terminal-input"
            aria-label="Terminal command"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") submit(event)
            }}
            autoComplete="off"
            spellCheck="false"
          />
        </form>
      </div>
    </div>
  )
}

function DesktopFile({ item, onOpen }) {
  const meta = appMeta[item.id]
  const Icon = meta.icon
  return (
    <button type="button" className="desktop-file" onClick={() => onOpen(item.id)}>
      <span className={`file-glyph glyph-${item.type}`} aria-hidden="true">
        {item.type === "folder" ? (
          <>
            <i />
            <b />
          </>
        ) : (
          <Icon />
        )}
      </span>
      <span>{item.label}</span>
    </button>
  )
}

function Dock({ openApp, openSearch, windows, activeId }) {
  const projectFocusId = Object.entries(windows)
    .filter(([id, state]) => id.startsWith("project-") && state.isOpen)
    .sort((a, b) => b[1].z - a[1].z)[0]?.[0]
  const projectWindowOpen = Boolean(projectFocusId)
  const activeDockId = activeId?.startsWith("project-") ? "works" : activeId

  return (
    <nav className="dock" aria-label="Desktop apps">
      <ul>
        {dockApps.map((id) => {
          const meta = dockMeta[id]
          const Icon = meta.icon
          const isOpen =
            id === "search"
              ? false
              : id === "works"
                ? Boolean(windows[id]?.isOpen || projectWindowOpen)
                : Boolean(windows[id]?.isOpen)
          return (
            <li key={id}>
              <button
                type="button"
                className={activeDockId === id ? "is-active" : ""}
                aria-label={`${isOpen ? "Focus" : "Open"} ${meta.label}`}
                aria-pressed={activeDockId === id}
                onClick={() => {
                  if (id === "search") {
                    openSearch()
                  } else if (id === "works" && !windows.works.isOpen && projectFocusId) {
                    openApp(projectFocusId)
                  } else {
                    openApp(id)
                  }
                }}
              >
                <Icon aria-hidden="true" />
              </button>
              <span className="dock-tooltip">{meta.label}</span>
              {isOpen ? <i className="open-indicator" aria-hidden="true" /> : null}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

function SearchDialog({ onClose, openApp }) {
  const [query, setQuery] = useState("")
  const inputRef = useRef(null)
  const dialogRef = useRef(null)

  const index = useMemo(
    () => [
      ...["about", "blog", "contact", "experience", "help", "settings", "terminal", "works"].map(
        (id) => ({
          id,
          label: appMeta[id].label,
          kind: "App",
          detail: id === "works" ? "Selected projects and timeline" : `Open ${appMeta[id].label}`,
          keywords: id === "about" ? "about vincent profile biography" : id,
        }),
      ),
      ...projects.map((project) => ({
        id: `project-${project.slug}`,
        label: project.title,
        kind: "Project",
        detail: project.description,
        keywords: `${project.slug} ${project.category} ${project.tech.join(" ")}`,
      })),
      {
        id: "about-file",
        label: "about.txt",
        kind: "File",
        detail: "Vincent's current focus in plain text",
        keywords: "now focus student cit-u",
      },
      {
        id: "build-log-file",
        label: "build-log.md",
        kind: "File",
        detail: "Plain-text notes from Vincent's three selected projects",
        keywords: "build notes nurse synapse poultry",
      },
    ],
    [],
  )

  const normalized = query.trim().toLowerCase()
  const queryTerms = normalized
    .split(/\s+/)
    .filter((term) => term && !["show", "find", "open", "please", "the", "my", "to"].includes(term))
  const results = queryTerms.length
    ? index
        .filter((item) => {
          const searchable =
            `${item.label} ${item.kind} ${item.detail} ${item.keywords}`.toLowerCase()
          return queryTerms.every((term) => searchable.includes(term))
        })
        .slice(0, 6)
    : []

  useEffect(() => {
    const previouslyFocused = document.activeElement
    inputRef.current?.focus()
    return () => previouslyFocused?.focus()
  }, [])

  const keepFocusInside = (event) => {
    if (event.key !== "Tab") return
    const focusable = [
      ...dialogRef.current.querySelectorAll(
        'button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
      ),
    ]
    if (!focusable.length) return
    const first = focusable[0]
    const last = focusable.at(-1)
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  const choose = (id) => {
    openApp(id)
    onClose()
  }

  return (
    <div className="search-overlay" role="presentation" onMouseDown={onClose}>
      <dialog
        ref={dialogRef}
        open
        className="search-dialog"
        aria-label="Search"
        aria-modal="true"
        onKeyDown={keepFocusInside}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header>
          <span>Search</span>
          <button type="button" aria-label="Close search" onClick={onClose}>
            <X aria-hidden="true" />
          </button>
        </header>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            if (results[0]) choose(results[0].id)
          }}
        >
          <p>Type a question or destination and press Enter to search.</p>
          <div className="search-input-row">
            <Search aria-hidden="true" />
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="What do you want to know or open?"
              aria-label="What do you want to know or open?"
            />
            <button type="submit" disabled={!results.length} aria-label="Submit search">
              ↵
            </button>
          </div>
        </form>
        {normalized ? (
          <ul className="search-results">
            {results.length ? (
              results.map((result) => (
                <li key={result.id}>
                  <button type="button" onClick={() => choose(result.id)}>
                    <span>
                      <strong>{result.label}</strong>
                      <small>{result.detail}</small>
                    </span>
                    <b>{result.kind}</b>
                  </button>
                </li>
              ))
            ) : (
              <li className="no-results">No match. Try projects, React, contact, or about.</li>
            )}
          </ul>
        ) : null}
      </dialog>
    </div>
  )
}

function WallpaperMark() {
  return (
    <div className="wallpaper-mark" aria-hidden="true">
      <span className="pixel-v">V</span>
      <span className="pixel-p">P</span>
      <small>CEBU / 10.3157 N</small>
    </div>
  )
}

function App() {
  const [desktop, setDesktop] = useState(createInitialDesktop)
  const [activeMenu, setActiveMenu] = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [displayOpen, setDisplayOpen] = useState(false)
  const [statsOpen, setStatsOpen] = useState(false)
  const saved = useMemo(readSavedDesktop, [])
  const [mode, setMode] = useState(saved?.mode === "dark" ? "dark" : "light")
  const [palette, setPalette] = useState(["moss", "pine", "sage"].includes(saved?.palette) ? saved.palette : "moss")
  const [wallpaper, setWallpaper] = useState(
    saved?.wallpaperVersion === 2 &&
      ["solid", "grid", "photo", "nature"].includes(saved?.wallpaper)
      ? saved.wallpaper
      : "nature",
  )
  const [brightness, setBrightness] = useState(
    Number.isFinite(saved?.brightness) ? saved.brightness : 100,
  )
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [toast, setToast] = useState("")
  const clock = useClock()
  const zRef = useRef(
    Math.max(10, ...Object.values(desktop.windows).map((item) => item.z || 1)),
  )

  const { windows, activeId } = desktop
  const pageSummary = useMemo(() => {
    const project = projects.find((item) => activeId === `project-${item.slug}`)
    if (project) {
      return {
        title: `${project.title} case study`,
        description: project.description,
      }
    }

    const summaries = {
      about: {
        title: "About Vincent Paul Dumangcas",
        description: "Background, current focus, and links for Vincent Paul Dumangcas.",
      },
      blog: {
        title: "Vincent's build log",
        description: "Notes from the three projects currently featured in this portfolio.",
      },
      contact: {
        title: "Contact Vincent Paul Dumangcas",
        description: "Email and professional links for project inquiries and opportunities.",
      },
      experience: {
        title: "Education and experience",
        description: "Vincent's education, project-building timeline, and current direction.",
      },
      help: {
        title: "Portfolio help and shortcuts",
        description: "Guidance for navigating the desktop, Search, and Terminal.",
      },
      settings: {
        title: "Portfolio display settings",
        description: "Theme, palette, brightness, and personalized wallpaper controls.",
      },
      terminal: {
        title: "Portfolio terminal",
        description: "A command-line interface for opening apps and reading portfolio files.",
      },
      works: {
        title: "Selected works and projects",
        description: "Project highlights, build decisions, and a compact delivery timeline.",
      },
    }

    return (
      summaries[activeId] ?? {
        title: "Vincent Paul Dumangcas portfolio desktop",
        description:
          "Selected full-stack projects, education, current focus, technical stack, and contact information.",
      }
    )
  }, [activeId])

  const syncRoute = (id, method = "push") => {
    const route = id ? routeForId(id) : "/"
    if (window.location.pathname === route) return
    window.history[method === "replace" ? "replaceState" : "pushState"]({}, "", route)
  }

  const showToast = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(""), 2200)
  }

  const focusApp = (id, updateRoute = true) => {
    if (!windows[id]) return
    zRef.current += 1
    setDesktop((current) => {
      const item = current.windows[id]
      const geometry =
        window.innerWidth > 640 && !item.maximized
          ? clampPosition(id, item.x, item.y, item.width, item.height)
          : {}
      return {
        windows: {
          ...current.windows,
          [id]: {
            ...item,
            ...geometry,
            isOpen: true,
            minimized: false,
            z: zRef.current,
          },
        },
        activeId: id,
      }
    })
    if (updateRoute) syncRoute(id)
  }

  const openApp = (id, updateRoute = true) => {
    if (!appMeta[id]) return
    focusApp(id, updateRoute)
    setActiveMenu(null)
    setDisplayOpen(false)
    setStatsOpen(false)
  }

  const closeApp = (id) => {
    setDesktop((current) => {
      const nextWindows = {
        ...current.windows,
        [id]: { ...current.windows[id], isOpen: false, minimized: false, maximized: false },
      }
      const nextActive =
        current.activeId === id ? topVisibleId(nextWindows, id) : current.activeId
      return { windows: nextWindows, activeId: nextActive }
    })
  }

  const closeAll = () => {
    setDesktop((current) => ({
      activeId: current.activeId === "terminal" ? "terminal" : null,
      windows: Object.fromEntries(
        Object.entries(current.windows).map(([id, state]) => [
          id,
          {
            ...state,
            isOpen: id === "terminal" && current.activeId === "terminal",
            minimized: false,
            maximized: false,
          },
        ]),
      ),
    }))
  }

  const minimizeApp = (id) => {
    const isRestoring = Boolean(windows[id]?.minimized)
    if (isRestoring) zRef.current += 1
    setDesktop((current) => {
      const willMinimize = !current.windows[id].minimized
      const nextWindows = {
        ...current.windows,
        [id]: {
          ...current.windows[id],
          minimized: willMinimize,
          z: willMinimize ? current.windows[id].z : zRef.current,
        },
      }
      const nextActive = willMinimize
        ? topVisibleId(nextWindows, id)
        : id
      return { windows: nextWindows, activeId: nextActive }
    })
  }

  const maximizeApp = (id) => {
    zRef.current += 1
    setDesktop((current) => ({
      windows: {
        ...current.windows,
        [id]: {
          ...current.windows[id],
          minimized: false,
          maximized: !current.windows[id].maximized,
          z: zRef.current,
        },
      },
      activeId: id,
    }))
  }

  const moveApp = (id, position) => {
    setDesktop((current) => {
      const item = current.windows[id]
      const next = clampPosition(id, position.x, position.y, item.width, item.height)
      return {
        ...current,
        windows: { ...current.windows, [id]: { ...item, x: next.x, y: next.y } },
      }
    })
  }

  const resizeApp = (id, size) => {
    setDesktop((current) => {
      const item = current.windows[id]
      const next = clampPosition(id, item.x, item.y, size.width, size.height)
      return {
        ...current,
        windows: {
          ...current.windows,
          [id]: { ...item, ...next },
        },
      }
    })
  }

  const centerActiveWindow = () => {
    if (!activeId) return
    setDesktop((current) => {
      const item = current.windows[activeId]
      const x = Math.max(8, (window.innerWidth - item.width) / 2)
      const y = Math.max(8, (window.innerHeight - 36 - 76 - item.height) / 2)
      return {
        ...current,
        windows: {
          ...current.windows,
          [activeId]: { ...item, x, y, maximized: false },
        },
      }
    })
    setActiveMenu(null)
  }

  const resetDesktop = () => {
    window.localStorage.removeItem(STORAGE_KEY)
    const next = createInitialDesktop()
    for (const id of Object.keys(next.windows)) {
      next.windows[id].isOpen = false
      next.windows[id].minimized = false
      next.windows[id].maximized = false
    }
    next.activeId = null
    setDesktop(next)
    setMode("light")
    setPalette("moss")
    setWallpaper("solid")
    setBrightness(100)
    syncRoute(null, "replace")
    setActiveMenu(null)
    showToast("Desktop reset")
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      showToast("Email copied")
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      showToast(EMAIL)
    }
  }

  const renderApp = (id) => {
    if (id === "about") return <AboutApp openApp={openApp} />
    if (id === "works") return <WorksApp openApp={openApp} />
    if (id === "blog") return <BlogApp openApp={openApp} />
    if (id === "experience") return <ExperienceApp />
    if (id === "contact") {
      return (
        <ContactApp
          copyEmail={copyEmail}
          copied={copied}
          showToast={showToast}
        />
      )
    }
    if (id === "settings") {
      return (
        <SettingsApp
          mode={mode}
          setMode={setMode}
          palette={palette}
          setPalette={setPalette}
          wallpaper={wallpaper}
          setWallpaper={setWallpaper}
          brightness={brightness}
          setBrightness={setBrightness}
        />
      )
    }
    if (id === "help") return <HelpApp />
    if (id === "terminal") {
      return (
        <TerminalApp
          openApp={openApp}
          closeApp={closeApp}
          closeAll={closeAll}
          openWindows={Object.entries(windows)
            .filter(([, item]) => item.isOpen)
            .map(([windowId]) => windowId)}
        />
      )
    }
    if (id === "about-file") {
      return <TextFileApp initialValue={aboutText} label="about text" />
    }
    if (id === "build-log-file") {
      return <TextFileApp initialValue={buildLogText} label="build log" />
    }

    const project = projects.find((item) => id.endsWith(item.slug))
    if (id.startsWith("folder-") && project) {
      return <FolderApp project={project} openApp={openApp} />
    }
    if (id.startsWith("project-") && project) {
      return <ProjectDetailApp project={project} />
    }
    return null
  }

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 520)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const persisted = {
      windows,
      activeId,
      mode,
      palette,
      wallpaper,
      wallpaperVersion: 2,
      brightness,
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted))
    } catch {
      // The portfolio remains fully usable when storage is blocked or unavailable.
    }
  }, [windows, activeId, mode, palette, wallpaper, brightness])

  useEffect(() => {
    const meta = activeId ? appMeta[activeId] : null
    document.title = meta
      ? `${meta.label} | Vincent Paul Dumangcas`
      : "Vincent Paul Dumangcas | Full-Stack Developer"
  }, [activeId])

  useEffect(() => {
    const route = activeId ? routeForId(activeId) : "/"
    if (window.location.pathname !== route) {
      window.history.replaceState({}, "", route)
    }
  }, [activeId])

  useEffect(() => {
    const onPopState = () => {
      const id = idFromPath(window.location.pathname)
      if (id) {
        openApp(id, false)
      } else {
        setDesktop((current) => ({ ...current, activeId: null }))
      }
    }
    window.addEventListener("popstate", onPopState)
    return () => window.removeEventListener("popstate", onPopState)
  })

  useEffect(() => {
    const onPointerDown = (event) => {
      if (!event.target.closest(".menu-cluster")) setActiveMenu(null)
      if (!event.target.closest(".display-cluster")) setDisplayOpen(false)
      if (!event.target.closest(".stats-cluster")) setStatsOpen(false)
    }
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveMenu(null)
        setDisplayOpen(false)
        setStatsOpen(false)
        setSearchOpen(false)
      }
      if (!(event.ctrlKey && event.altKey)) return
      const key = event.key.toLowerCase()
      if (["w", "f", "m", "c", "r"].includes(key)) event.preventDefault()
      if (key === "w" && activeId) closeApp(activeId)
      if (key === "f" && activeId) maximizeApp(activeId)
      if (key === "m" && activeId) minimizeApp(activeId)
      if (key === "c") centerActiveWindow()
      if (key === "r") resetDesktop()
    }
    window.addEventListener("pointerdown", onPointerDown)
    window.addEventListener("keydown", onKeyDown)
    return () => {
      window.removeEventListener("pointerdown", onPointerDown)
      window.removeEventListener("keydown", onKeyDown)
    }
  })

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth <= 640) return
      setDesktop((current) => ({
        ...current,
        windows: Object.fromEntries(
          Object.entries(current.windows).map(([id, item]) => {
            if (item.maximized) return [id, item]
            const next = clampPosition(id, item.x, item.y, item.width, item.height)
            return [id, { ...item, ...next }]
          }),
        ),
      }))
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  return (
    <div
      className="portfolio-os"
      data-mode={mode}
      data-palette={palette}
      data-wallpaper={wallpaper}
      style={{ "--desktop-brightness": `${brightness}%` }}
    >
      <a className="skip-link" href="#desktop-workspace">
        Skip to desktop
      </a>

      <nav className="semantic-navigation sr-only" aria-label="Primary site navigation">
        <a href="/" tabIndex="-1">Home</a>
        <a href="/about" tabIndex="-1">About</a>
        <a href="/works" tabIndex="-1">Works</a>
        <a href="/blog" tabIndex="-1">Blog</a>
        <a href="/contact" tabIndex="-1">Contact</a>
        <a href="/terminal" tabIndex="-1">Terminal</a>
        <a href="/help" tabIndex="-1">Help</a>
      </nav>

      <header className="menu-bar">
        <div className="menu-bar-left">
          <div className="stats-cluster">
            <button
              type="button"
              className="menu-logo"
              aria-label="Open portfolio stats"
              aria-expanded={statsOpen}
              onClick={() => {
                setStatsOpen((current) => !current)
                setActiveMenu(null)
                setDisplayOpen(false)
              }}
            >
              VP
            </button>
            {statsOpen ? (
              <div className="stats-popover">
                <span>VINCENT PAUL DUMANGCAS</span>
                <dl>
                  <div><dt>Selected builds</dt><dd>03</dd></div>
                  <div><dt>Base</dt><dd>Cebu, PH</dd></div>
                  <div><dt>Status</dt><dd>Open to work</dd></div>
                </dl>
              </div>
            ) : null}
          </div>

          <div className="menu-cluster">
            <button
              type="button"
              className={activeMenu === "portfolio" ? "is-active" : ""}
              aria-expanded={activeMenu === "portfolio"}
              onClick={() =>
                setActiveMenu((current) => (current === "portfolio" ? null : "portfolio"))
              }
              onMouseEnter={() => activeMenu && setActiveMenu("portfolio")}
            >
              Portfolio
            </button>
            {activeMenu === "portfolio" ? (
              <div className="menu-popover portfolio-menu" role="menu">
                <button type="button" role="menuitem" onClick={() => openApp("about")}>
                  About Vincent
                </button>
                <button type="button" role="menuitem" onClick={() => openApp("contact")}>
                  Contact
                </button>
                <button type="button" role="menuitem" onClick={() => openApp("help")}>
                  Portfolio Guide
                </button>
                <button type="button" role="menuitem" onClick={() => openApp("settings")}>
                  Settings
                </button>
                <span className="menu-separator" />
                <button type="button" role="menuitem" onClick={resetDesktop}>
                  Reset Desktop
                </button>
              </div>
            ) : null}
          </div>

          <div className="menu-cluster file-menu-cluster">
            <button
              type="button"
              className={activeMenu === "file" ? "is-active" : ""}
              aria-expanded={activeMenu === "file"}
              onClick={() => setActiveMenu((current) => (current === "file" ? null : "file"))}
              onMouseEnter={() => activeMenu && setActiveMenu("file")}
            >
              File
            </button>
            {activeMenu === "file" ? (
              <div className="menu-popover" role="menu">
                <button type="button" role="menuitem" onClick={() => openApp("about-file")}>
                  <span>Open about.txt</span>
                </button>
                <button type="button" role="menuitem" onClick={() => openApp("works")}>
                  <span>Open Works</span>
                </button>
                <span className="menu-separator" />
                <button
                  type="button"
                  role="menuitem"
                  disabled={!activeId}
                  onClick={() => activeId && closeApp(activeId)}
                >
                  <span>Close Window</span>
                  <kbd>Ctrl+Alt+W</kbd>
                </button>
              </div>
            ) : null}
          </div>

          <div className="menu-cluster">
            <button
              type="button"
              className={activeMenu === "view" ? "is-active" : ""}
              aria-expanded={activeMenu === "view"}
              onClick={() => setActiveMenu((current) => (current === "view" ? null : "view"))}
              onMouseEnter={() => activeMenu && setActiveMenu("view")}
            >
              View
            </button>
            {activeMenu === "view" ? (
              <div className="menu-popover" role="menu">
                <button type="button" role="menuitem" onClick={resetDesktop}>
                  <span>Refresh</span>
                  <kbd>Ctrl+Alt+R</kbd>
                </button>
                <button
                  type="button"
                  role="menuitem"
                  disabled={!activeId}
                  onClick={() => activeId && maximizeApp(activeId)}
                >
                  <span>Maximize</span>
                  <kbd>Ctrl+Alt+F</kbd>
                </button>
                <button
                  type="button"
                  role="menuitem"
                  disabled={!activeId}
                  onClick={() => activeId && minimizeApp(activeId)}
                >
                  <span>Minimize</span>
                  <kbd>Ctrl+Alt+M</kbd>
                </button>
                <button
                  type="button"
                  role="menuitem"
                  disabled={!activeId}
                  onClick={() => activeId && closeApp(activeId)}
                >
                  <span>Close</span>
                  <kbd>Ctrl+Alt+W</kbd>
                </button>
                <button
                  type="button"
                  role="menuitem"
                  disabled={!activeId}
                  onClick={centerActiveWindow}
                >
                  <span>Center Window</span>
                  <kbd>Ctrl+Alt+C</kbd>
                </button>
              </div>
            ) : null}
          </div>
        </div>

        <div className="menu-bar-right">
          <div className="display-cluster">
            <button
              type="button"
              className="display-button"
              aria-label="Display controls"
              aria-expanded={displayOpen}
              onClick={() => {
                setDisplayOpen((current) => !current)
                setActiveMenu(null)
                setStatsOpen(false)
              }}
            >
              {mode === "light" ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
            </button>
            {displayOpen ? (
              <div className="display-popover">
                <label>
                  <span>Brightness</span>
                  <b>{brightness}%</b>
                  <input
                    type="range"
                    min="80"
                    max="110"
                    value={brightness}
                    onChange={(event) => setBrightness(Number(event.target.value))}
                  />
                </label>
                <div className="quick-palettes" aria-label="Theme color">
                  {[
                    ["moss", "#315044"],
                    ["pine", "#17352d"],
                    ["sage", "#718675"],
                  ].map(([id, color]) => (
                    <button
                      type="button"
                      key={id}
                      aria-label={`${id} theme`}
                      aria-pressed={palette === id}
                      className={palette === id ? "is-selected" : ""}
                      style={{ background: color }}
                      onClick={() => setPalette(id)}
                    />
                  ))}
                </div>
                <div className="segmented">
                  <button
                    type="button"
                    className={mode === "light" ? "is-selected" : ""}
                    onClick={() => setMode("light")}
                  >
                    Light
                  </button>
                  <button
                    type="button"
                    className={mode === "dark" ? "is-selected" : ""}
                    onClick={() => setMode("dark")}
                  >
                    Dark
                  </button>
                </div>
                <button type="button" className="open-settings" onClick={() => openApp("settings")}>
                  <Settings2 aria-hidden="true" />
                  Open Settings
                </button>
              </div>
            ) : null}
          </div>

          <time dateTime={new Date().toISOString()} title={clock.full}>
            <span className="clock-date">{clock.date}</span>
            <span>{clock.time}</span>
          </time>
        </div>
      </header>

      <main id="desktop-workspace" className="desktop-workspace">
        <section className="page-summary sr-only" aria-label="Page summary">
          <h1>{pageSummary.title}</h1>
          <p>{pageSummary.description}</p>
        </section>

        <WallpaperMark />

        <nav className="desktop-files" aria-label="Desktop files">
          <ul>
            {desktopItems.map((item) => (
              <li key={`${item.id}-${item.label}`}>
                <DesktopFile item={item} onOpen={openApp} />
              </li>
            ))}
          </ul>
        </nav>

        <section className="window-layer" aria-label="Open windows">
          {Object.keys(appMeta).map((id) => (
            <WindowFrame
              key={id}
              id={id}
              state={windows[id]}
              active={activeId === id}
              onFocus={focusApp}
              onClose={closeApp}
              onMinimize={minimizeApp}
              onMaximize={maximizeApp}
              onMove={moveApp}
              onResize={resizeApp}
            >
              {renderApp(id)}
            </WindowFrame>
          ))}
        </section>

        <Dock
          openApp={openApp}
          openSearch={() => setSearchOpen(true)}
          windows={windows}
          activeId={activeId}
        />
      </main>

      {searchOpen ? <SearchDialog onClose={() => setSearchOpen(false)} openApp={openApp} /> : null}

      {toast ? (
        <div className="toast" role="status">
          {toast}
        </div>
      ) : null}

      <div className={`loading-screen ${loading ? "is-visible" : ""}`} aria-hidden={!loading}>
        <div>
          <span>LOADING WORKSPACE</span>
          <i><b /></i>
        </div>
      </div>
    </div>
  )
}

export default App
