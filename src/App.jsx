import { useEffect, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DarkVeil from "@/components/ui/DarkVeil"
import SplitText from "@/components/ui/SplitText"
import SpotlightCard from "@/components/ui/SpotlightCard"
import {
  Copy,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Download,
  Github,
  GraduationCap,
  Layers,
  Lightbulb,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Server,
  Target,
  Wrench,
} from "lucide-react"

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
]

const metrics = [
  { value: "03", label: "solid portfolio pieces" },
  { value: "2021", label: "started IT at CIT-U" },
  { value: "<24h", label: "usual reply time" },
]

const stack = [
  "React",
  "Next.js",
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "Spring Boot",
  "Tailwind",
  "Node.js",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "Git",
  "Firebase",
  "Vite",
  "Figma",
]

const stackMarqueeItems = [
  { label: "React", icon: "react" },
  { label: "Next.js", icon: "nextjs" },
  { label: "JavaScript", icon: "javascript" },
  { label: "TypeScript", icon: "typescript" },
  { label: "Python", icon: "python" },
  { label: "Java", icon: "java" },
  { label: "Spring Boot", icon: "spring" },
  { label: "Tailwind CSS", icon: "tailwind" },
  { label: "Node.js", icon: "nodejs" },
  { label: "PostgreSQL", icon: "postgres" },
  { label: "MongoDB", icon: "mongodb" },
  { label: "Docker", icon: "docker" },
  { label: "Git", icon: "git" },
  { label: "Firebase", icon: "firebase" },
  { label: "Vite", icon: "vite" },
  { label: "Figma", icon: "figma" },
]

const stackMarqueeLoop = [...stackMarqueeItems, ...stackMarqueeItems]

const projects = [
  {
    id: "01",
    title: "CIT NurseTracer",
    type: "Live system",
    year: "2025",
    role: "Full-stack developer",
    period: "2025",
    tags: ["healthcare", "operations", "dashboard", "featured"],
    previewTone: "violet",
    description:
      "A ward-assignment app that makes nursing handoffs easier to follow than a whiteboard and scattered chat updates.",
    problem:
      "Assignments were being tracked informally, which made it easy to lose context during a shift handoff.",
    features: [
      "Shift and ward assignment views",
      "Role-based access for staff",
      "Searchable activity history",
      "Mobile-friendly bedside layout",
    ],
    takeaway:
      "The biggest wins came from practical details like readable labels, sensible defaults, and reducing taps during stressful moments.",
    tech: ["React", "Tailwind", "Vercel"],
    link: "https://citnursetracer.vercel.app/",
    github: "",
  },
  {
    id: "02",
    title: "Synapse UI",
    type: "Open source",
    year: "2025",
    role: "Component system",
    period: "2025",
    tags: ["ui kit", "frontend", "design system", "featured"],
    previewTone: "amber",
    description:
      "A reusable component kit for React projects so I am not redesigning basic interface patterns from scratch every time.",
    problem:
      "Starting fresh on every project meant rebuilding the same primitives with slight inconsistencies.",
    features: [
      "Composable components with sane defaults",
      "Keyboard-friendly interactions",
      "Theming with CSS variables",
      "Usage examples for quick reuse",
    ],
    takeaway:
      "Choosing strong defaults is harder than exposing more props. Every option you add becomes something you need to support later.",
    tech: ["React", "Tailwind", "Components"],
    link: "https://github.com/princeprog/synapse-ui",
    github: "https://github.com/princeprog/synapse-ui",
  },
  {
    id: "03",
    title: "Poultry Prophet",
    type: "Full stack",
    year: "2025",
    role: "Full-stack developer",
    period: "2025",
    tags: ["analytics", "scoring", "platform", "featured"],
    previewTone: "emerald",
    description:
      "A breeding-management platform for game fowl operations that tracks bird development and computes readiness scores instead of relying on gut feel.",
    problem:
      "Health and readiness were tracked manually, making month-five selection inconsistent and difficult to justify later.",
    features: [
      "Health records by batch and bird",
      "Computed indicators with alerts",
      "Ranked readiness scoring",
      "Exports plus real-time updates",
    ],
    takeaway:
      "Keeping the scoring logic on the back end made the system easier to trust, test, and reason about as the app grew.",
    tech: ["Next.js", "React", "Spring Boot", "Postgres"],
    link: "https://github.com/VincentPaul434/poultry-prophet-frontend",
    github: "https://github.com/VincentPaul434/poultry-prophet-backend",
  },
]

const experience = [
  {
    icon: GraduationCap,
    period: "2021 to present",
    title: "BS Information Technology at CIT-U",
    detail:
      "I built my foundation through classwork, self-study, and a lot of small experiments that slowly turned into real project work.",
  },
  {
    icon: Code2,
    period: "2025",
    title: "Started shipping full-stack student projects",
    detail:
      "That meant handling actual data models, authentication, UI states, and deployment instead of stopping at mockups or isolated screens.",
  },
  {
    icon: Target,
    period: "Now",
    title: "Looking for real product work",
    detail:
      "I am aiming for an internship, junior role, or contract work where I can contribute, get better feedback, and keep learning from stronger engineers.",
  },
]

const services = [
  {
    icon: Layers,
    title: "Frontend implementation",
    detail: "Responsive React interfaces that feel clear, structured, and usable on real screens.",
  },
  {
    icon: Server,
    title: "Simple backend integration",
    detail: "Spring Boot or Node-backed flows with auth, forms, tables, and database-connected features.",
  },
  {
    icon: Wrench,
    title: "Finishing incomplete builds",
    detail: "Cleaning up rough UI, fixing bugs, and getting half-done projects closer to something shippable.",
  },
  {
    icon: Lightbulb,
    title: "Calm problem solving",
    detail: "Reading docs, tracing behavior, and working through unknowns without pretending I know more than I do.",
  },
]

const socials = [
  {
    href: "https://github.com/VincentPaul434",
    label: "GitHub",
    detail: "github.com/VincentPaul434",
    icon: Github,
  },
  {
    href: "https://www.linkedin.com/in/vincent-paul-dumangcas-74063a365/",
    label: "LinkedIn",
    detail: "vincent-paul-dumangcas",
    icon: Linkedin,
  },
  {
    href: "mailto:dumangcasvincentpaul@gmail.com",
    label: "Email",
    detail: "dumangcasvincentpaul@gmail.com",
    icon: Mail,
  },
]

function ScrollProgress() {
  const ref = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      const progress = max > 0 ? doc.scrollTop / max : 0
      if (ref.current) {
        ref.current.style.transform = `scaleX(${progress})`
      }
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return <div ref={ref} className="scroll-progress" aria-hidden="true" />
}

function Reveal({ as: Tag = "div", className = "", delay = 0, children, ...rest }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}ms`
          el.classList.add("in-view")
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <Tag ref={ref} className={`reveal ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

function PromptMark({ className = "" }) {
  return (
    <span
      className={`inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card font-mono text-sm font-semibold text-primary ${className}`}
      aria-hidden="true"
    >
      {">"}
    </span>
  )
}

function SectionHeading({ tag, title, subtitle, accent = "light" }) {
  return (
    <div className="section-heading">
      <p className={`section-tag ${accent === "dark" ? "section-tag-dark" : ""}`}>{tag}</p>
      <SplitText as="h2" text={title} delay={0} stagger={12} className="section-title" />
      {subtitle ? <p className="section-copy">{subtitle}</p> : null}
    </div>
  )
}

function HeroTerminal() {
  return (
    <div className="hero-terminal">
      <div className="hero-terminal-bar">
        <span className="hero-dot bg-[#f0506e]" />
        <span className="hero-dot bg-[#ffb020]" />
        <span className="hero-dot bg-[#3fb950]" />
        <span className="hero-terminal-title">portfolio/identity.ts</span>
      </div>

      <div className="hero-terminal-body">
        <pre className="hero-code">
          <code>
            <span className="t-kw">const</span> <span className="t-var">vincent</span> <span className="t-punc">= {"{"}</span>
            {"\n  "}
            <span className="t-key">focus</span>
            <span className="t-punc">:</span> <span className="t-str">"full-stack web apps"</span>
            <span className="t-punc">,</span>
            {"\n  "}
            <span className="t-key">frontend</span>
            <span className="t-punc">:</span> <span className="t-str">["react", "tailwind", "vite"]</span>
            <span className="t-punc">,</span>
            {"\n  "}
            <span className="t-key">backend</span>
            <span className="t-punc">:</span> <span className="t-str">["spring boot", "mysql", "apis"]</span>
            <span className="t-punc">,</span>
            {"\n  "}
            <span className="t-key">location</span>
            <span className="t-punc">:</span> <span className="t-str">"Cebu, Philippines"</span>
            <span className="t-punc">,</span>
            {"\n  "}
            <span className="t-key">status</span>
            <span className="t-punc">:</span> <span className="t-str">"open to internships and junior roles"</span>
            {"\n"}
            <span className="t-punc">{"}"}</span>
          </code>
        </pre>
      </div>
    </div>
  )
}

function StackLoop() {
  return (
    <div className="stack-loop-shell" aria-label="Animated technology stack">
      <div className="stack-loop-track">
        {stackMarqueeLoop.map((item, index) => (
          <figure
            key={`${item.label}-${index}`}
            className="stack-logo-mark"
            aria-label={item.label}
          >
            <img
              src={`https://skillicons.dev/icons?i=${item.icon}&theme=dark`}
              alt={item.label}
              loading="lazy"
              decoding="async"
              className="stack-logo-image"
            />
          </figure>
        ))}
      </div>
    </div>
  )
}

function ProjectPreview({ project, reverse = false }) {
  return (
    <div className={`project-preview-stack ${reverse ? "is-reverse" : ""} tone-${project.previewTone}`}>
      <div className="project-preview-card layer-back" aria-hidden="true" />
      <div className="project-preview-card layer-mid" aria-hidden="true" />
      <div className="project-preview-card layer-front">
        <div className="preview-topbar">
          <span className="preview-dot" />
          <span className="preview-dot" />
          <span className="preview-dot" />
        </div>
        <div className="preview-body">
          <div className="preview-hero">
            <div className="preview-kicker">{project.title}</div>
            <div className="preview-title-line" />
            <div className="preview-title-line short" />
          </div>
          <div className="preview-grid">
            <div className="preview-block tall" />
            <div className="preview-column">
              <div className="preview-block" />
              <div className="preview-block" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a href="#top" className="brand-mark" aria-label="Go to top">
          <PromptMark />
          <span className="brand-copy">
            <span className="brand-title">vincent.dev</span>
            <span className="brand-subtitle">full-stack builder</span>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Primary">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="nav-pill">
              {item.label}
            </a>
          ))}
        </nav>

        <Button asChild className="header-cta">
          <a href="/r/Resume_Vincent_Paul_Dumangcas.docx" download="Resume_Vincent_Paul_Dumangcas.docx">
            Resume
            <Download className="h-4 w-4" />
          </a>
        </Button>
      </div>

      <nav className="mobile-nav" aria-label="Mobile primary">
        {navItems.map((item) => (
          <a key={item.href} href={item.href} className="nav-pill mobile-nav-pill">
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}

function HeroSection() {
  return (
    <section id="top" className="hero-section">
      <div className="hero-grid">
        <Reveal className="hero-copy-wrap">
          <p className="hero-kicker">
            <span className="status-dot" aria-hidden="true" />
            Cebu-based IT student building practical web apps
          </p>

          <p className="hero-overline">Full-stack developer</p>

          <SplitText
            as="h1"
            delay={0}
            stagger={18}
            text="Vincent Paul Dumangcas"
            className="hero-title"
          />

          <p className="hero-subtitle">
            I build web apps from the database to the browser, with a strong pull toward clean
            structure, useful interfaces, and work that feels grounded in real use.
          </p>

          <div className="hero-actions">
            <Button asChild className="hero-primary">
              <a href="#projects">
                See projects
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>

            <Button asChild variant="outline" className="hero-secondary">
              <a href="#contact">Let&apos;s talk</a>
            </Button>
          </div>

          <div className="hero-meta">
            <span>
              <MapPin className="h-4 w-4 text-primary" />
              Cebu, Philippines
            </span>
            <span>
              <Code2 className="h-4 w-4 text-primary" />
              React, Spring Boot, MySQL
            </span>
          </div>
        </Reveal>

        <Reveal delay={120} className="hero-visual">
          <div className="hero-veil-shell">
            <div className="hero-veil-layer" aria-hidden="true">
              <DarkVeil
                hueShift={-34}
                noiseIntensity={0.02}
                scanlineIntensity={0.1}
                speed={0.32}
                scanlineFrequency={1.6}
                warpAmount={0.34}
                resolutionScale={1}
              />
            </div>
            <div className="hero-veil-tint" aria-hidden="true" />
            <HeroTerminal />
          </div>
        </Reveal>
      </div>

      <Reveal delay={220} className="hero-metrics">
        {metrics.map((item) => (
          <div key={item.label} className="metric-card">
            <span className="metric-value">{item.value}</span>
            <span className="metric-label">{item.label}</span>
          </div>
        ))}
      </Reveal>
    </section>
  )
}

function AboutSection() {
  return (
    <section id="about" className="band band-dark">
      <div className="content-shell two-column-band">
        <Reveal>
          <SectionHeading
            tag="About me"
            title="A grounded builder, still early, already serious."
            subtitle="I am an IT student at CIT-U in Cebu. Most of my work so far has been around turning real requirements into usable frontend flows, backend logic, and deployable systems instead of just polished screenshots."
            accent="dark"
          />
        </Reveal>

        <Reveal delay={120} className="about-story">
          <div className="story-panel">
            <p className="story-lead">I care about software that reads clearly before it tries to impress.</p>
            <p>
              I like projects where the work has to hold up under actual use. That usually means forms,
              tables, role-based access, and the small decisions that make software feel clear instead of tiring.
            </p>
            <p>
              I am not trying to sell myself as a senior engineer. I am looking for the next step where I can
              contribute well, learn faster, and keep building the kind of judgment that only comes from real work.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function SkillsSection() {
  return (
    <section id="skills" className="band band-light">
      <div className="content-shell">
        <Reveal className="skills-heading-block">
          <p className="section-tag">What I work with</p>
          <h2 className="skills-title">My Skills</h2>
          <p className="skills-subtitle">
            The stack I reach for most often when building full-stack products and practical frontend systems.
          </p>
        </Reveal>

        <Reveal delay={110}>
          <StackLoop />
        </Reveal>

        <div className="skills-layout skills-layout-vertical">
          <div className="service-grid">
            {services.map((service, index) => (
              <Reveal key={service.title} delay={index * 110} className="service-reveal">
                <Card className="service-card">
                  <CardHeader>
                    <div className="service-icon">
                      <service.icon className="h-4 w-4" />
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{service.detail}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>

          <Reveal delay={220} className="stack-block">
            <div className="stack-panel">
              <p className="stack-label">Stack overview</p>
              <div className="stack-cloud">
                {stack.map((item) => (
                  <Badge key={item} variant="outline" className="stack-badge">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function ProjectsSection() {
  return (
    <section id="projects" className="band band-projects">
      <div className="content-shell">
        <Reveal>
          <SectionHeading
            tag="What I've built"
            title="Software Projects"
            subtitle="Hover the stacked previews to fan them out. Each project write-up stays grounded in the actual problem, the build decisions, and what made the product useful."
            accent="dark"
          />
        </Reveal>

        <div className="projects-list">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 130} className="project-reveal">
              <article className={`project-showcase-row ${index % 2 === 1 ? "is-reverse" : ""}`}>
                <div className="project-showcase-visual">
                  <ProjectPreview project={project} reverse={index % 2 === 1} />
                </div>

                <SpotlightCard className="project-spotlight">
                  <div className="project-showcase-copy">
                    <div className="project-showcase-meta">
                      <span className="project-showcase-index">{project.id}</span>
                      <div className="project-showcase-tags">
                        {project.tags.map((tag) => (
                          <span key={tag} className={`project-tag ${tag === "featured" ? "is-featured" : ""}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="project-showcase-head">
                      <div>
                        <h3>{project.title}</h3>
                        <p className="project-role">{project.role}</p>
                      </div>
                      <span className="project-period">{project.period}</span>
                    </div>

                    <p className="project-description">{project.description}</p>

                    <div className="project-detail-block">
                      <p className="project-detail-label">Why it mattered</p>
                      <p>{project.problem}</p>
                    </div>

                    <div className="project-detail-block">
                      <p className="project-detail-label">What it does</p>
                      <ul className="project-feature-list">
                        {project.features.map((feature) => (
                          <li key={feature}>
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="project-detail-block">
                      <p className="project-detail-label">What I learned</p>
                      <p>{project.takeaway}</p>
                    </div>

                    <div className="project-tech">
                      {project.tech.map((item) => (
                        <span key={item} className="project-stack-item">
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="project-links">
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-inline-link">
                        Visit project
                        <ArrowUpRight className="h-4 w-4" />
                      </a>

                      {project.github ? (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-inline-link muted">
                          Source
                          <Github className="h-4 w-4" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </SpotlightCard>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ExperienceSection() {
  return (
    <section id="experience" className="band band-light">
      <div className="content-shell">
        <Reveal>
          <SectionHeading
            tag="Experience"
            title="The short version of my path so far."
            subtitle="I am still early in my career, but the direction is clear: build real things, improve quickly, and stay honest about what I know and what I am still learning."
          />
        </Reveal>

        <div className="timeline-grid">
          {experience.map((item, index) => (
            <Reveal key={item.title} delay={index * 110} className="timeline-reveal">
              <div className="timeline-card">
                <div className="timeline-head">
                  <span className="timeline-icon">
                    <item.icon className="h-4 w-4" />
                  </span>
                  <span className="timeline-period">{item.period}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  const contactItems = [
    {
      href: "mailto:dumangcasvincentpaul@gmail.com",
      label: "Email",
      value: "dumangcasvincentpaul@gmail.com",
      icon: Mail,
    },
    {
      href: "tel:+639702909636",
      label: "Phone",
      value: "0970 290 9636",
      icon: Phone,
    },
    {
      href: "https://github.com/VincentPaul434",
      label: "GitHub",
      value: "github.com/VincentPaul434",
      icon: Github,
    },
    {
      href: "#top",
      label: "Location",
      value: "Cebu City, Cebu, PH",
      icon: MapPin,
    },
  ]

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("dumangcasvincentpaul@gmail.com")
    } catch {
      window.prompt("Copy email:", "dumangcasvincentpaul@gmail.com")
    }
  }

  return (
    <section id="contact" className="band band-contact">
      <div className="content-shell">
        <Reveal>
          <SectionHeading
            tag="Let's talk"
            title="Contact Me"
            subtitle="I'm open to work, collaboration, and interesting projects. Drop me a message and I'll respond promptly."
            accent="dark"
          />
        </Reveal>

        <div className="contact-layout">
          <Reveal delay={120}>
            <div className="contact-list">
              {contactItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="contact-row"
                >
                  <span className="contact-row-icon">
                    <item.icon className="h-4 w-4" />
                  </span>
                  <div className="contact-row-copy">
                    <span className="contact-row-label">{item.label}</span>
                    <span className="contact-row-value">{item.value}</span>
                  </div>
                  <ArrowRight className="contact-row-arrow h-4 w-4" />
                </a>
              ))}

              <button type="button" className="contact-copy-button" onClick={handleCopyEmail}>
                <Copy className="h-4 w-4" />
                Click to copy email
              </button>
            </div>
          </Reveal>

          <Reveal delay={220}>
            <Card className="contact-cta-shell">
              <CardHeader className="contact-cta-head">
                <CardTitle className="contact-cta-title">Let&apos;s build something together.</CardTitle>
                <CardDescription className="contact-cta-copy">
                  Whether you have a project in mind, want to discuss opportunities, or just want to
                  connect, I&apos;d love to hear from you.
                </CardDescription>
              </CardHeader>
              <CardContent className="contact-cta-actions">
                <Button asChild className="contact-cta-primary">
                  <a href="mailto:dumangcasvincentpaul@gmail.com">Send Me an Email</a>
                </Button>
                <Button asChild variant="outline" className="contact-cta-secondary">
                  <a href="https://github.com/VincentPaul434" target="_blank" rel="noopener noreferrer">
                    View GitHub
                  </a>
                </Button>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="content-shell footer-inner">
        <div className="footer-brand">
          <PromptMark />
          <div>
            <p className="footer-title">Vincent Paul Dumangcas</p>
            <p className="footer-copy">Built with React and Tailwind in Cebu, Philippines.</p>
          </div>
        </div>

        <a
          href="/r/Resume_Vincent_Paul_Dumangcas.docx"
          download="Resume_Vincent_Paul_Dumangcas.docx"
          className="footer-resume"
        >
          Download resume
          <Download className="h-4 w-4" />
        </a>
      </div>
    </footer>
  )
}

function App() {
  return (
    <div className="app-shell">
      <div className="tech-grid" aria-hidden="true" />
      <ScrollProgress />
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
