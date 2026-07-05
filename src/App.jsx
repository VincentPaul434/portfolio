import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Copy,
  Database,
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
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
]

const railItems = ["HOME", "ABOUT", "SKILLS", "PROJECTS", "EXPERIENCE", "CONTACT"]

const metrics = [
  { value: "03", label: "featured builds" },
  { value: "2021", label: "started IT at CIT-U" },
  { value: "Cebu", label: "open to remote work" },
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
    role: "Full-stack developer",
    period: "2025",
    tags: ["healthcare", "operations", "dashboard", "featured"],
    previewTone: "violet",
    description:
      "A ward-assignment app that makes nursing handoffs easier to follow than scattered chat updates.",
    problem:
      "Assignments were being tracked informally, which made it easy to lose context during a shift handoff.",
    features: [
      "Shift and ward assignment views",
      "Role-based access for staff",
      "Searchable activity history",
      "Mobile-friendly bedside layout",
    ],
    takeaway:
      "The biggest wins came from readable labels, sensible defaults, and reducing taps during stressful moments.",
    tech: ["React", "Tailwind", "Vercel"],
    link: "https://citnursetracer.vercel.app/",
    github: "",
  },
  {
    id: "02",
    title: "Synapse UI",
    type: "Open source",
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
      "Choosing strong defaults is harder than exposing more props. Every option becomes something to support later.",
    tech: ["React", "Tailwind", "Components"],
    link: "https://github.com/princeprog/synapse-ui",
    github: "https://github.com/princeprog/synapse-ui",
  },
  {
    id: "03",
    title: "Poultry Prophet",
    type: "Full stack",
    role: "Full-stack developer",
    period: "2025",
    tags: ["analytics", "scoring", "platform", "featured"],
    previewTone: "emerald",
    description:
      "A breeding-management platform for game fowl operations that tracks bird development and computes readiness scores.",
    problem:
      "Health and readiness were tracked manually, making month-five selection inconsistent and difficult to justify later.",
    features: [
      "Health records by batch and bird",
      "Computed indicators with alerts",
      "Ranked readiness scoring",
      "Exports plus real-time updates",
    ],
    takeaway:
      "Keeping the scoring logic on the back end made the system easier to trust, test, and reason about.",
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
      "Built my foundation through classwork, self-study, and experiments that slowly turned into real project work.",
  },
  {
    icon: Code2,
    period: "2025",
    title: "Started shipping full-stack student projects",
    detail:
      "Handled data models, authentication, UI states, and deployment instead of stopping at mockups or isolated screens.",
  },
  {
    icon: Target,
    period: "Now",
    title: "Looking for real product work",
    detail:
      "Aiming for an internship, junior role, or contract work where I can contribute and learn from stronger engineers.",
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
    title: "Backend integration",
    detail: "Spring Boot or Node-backed flows with auth, forms, tables, and database-connected features.",
  },
  {
    icon: Wrench,
    title: "Finishing incomplete builds",
    detail: "Cleaning up rough UI, fixing bugs, and getting half-done projects closer to shippable.",
  },
  {
    icon: Lightbulb,
    title: "Calm problem solving",
    detail: "Reading docs, tracing behavior, and working through unknowns with patience and accuracy.",
  },
]

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
    href: "https://www.linkedin.com/in/vincent-paul-dumangcas-74063a365/",
    label: "LinkedIn",
    value: "vincent-paul-dumangcas",
    icon: Linkedin,
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

function Reveal({ className = "", delay = 0, children, ...rest }) {
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
      { threshold: 0.14 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={`reveal ${className}`} {...rest}>
      {children}
    </div>
  )
}

function SectionRail({ active }) {
  return (
    <div className="section-rail" aria-hidden="true">
      {railItems.map((item) =>
        item === active ? (
          <span key={item} className="rail-active">
            <span>{item}</span>
            <i />
          </span>
        ) : (
          <span key={item} className="rail-dot" />
        ),
      )}
    </div>
  )
}

function SectionIntro({ eyebrow, title, muted, copy, dark = false, centered = false }) {
  const mutedIndex = muted ? title.indexOf(muted) : -1
  const before = mutedIndex >= 0 ? title.slice(0, mutedIndex) : title
  const after = mutedIndex >= 0 ? title.slice(mutedIndex + muted.length) : ""

  return (
    <div className={`section-intro ${centered ? "is-centered" : ""} ${dark ? "is-dark" : ""}`}>
      <p className="section-eyebrow">{eyebrow}</p>
      <h2>
        {before}
        {mutedIndex >= 0 ? <span>{muted}</span> : null}
        {after}
      </h2>
      {copy ? <p className="section-copy">{copy}</p> : null}
    </div>
  )
}

function BrandMark() {
  return (
    <a href="#top" className="brand-mark" aria-label="Go to top">
      <span className="brand-initials">VPD</span>
      <span className="brand-copy">
        <span className="brand-title">Vincent</span>
        <span className="brand-subtitle">web apps, end to end</span>
      </span>
    </a>
  )
}

function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <BrandMark />

        <nav className="desktop-nav" aria-label="Primary">
          {navItems.slice(1).map((item) => (
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
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="hero-shape shape-one" aria-hidden="true" />
      <div className="hero-shape shape-two" aria-hidden="true" />
      <div className="hero-shape shape-three" aria-hidden="true" />
      <div className="hero-shape shape-four" aria-hidden="true" />

      <div className="content-shell hero-shell">
        <Reveal className="hero-kicker-row">
          <span className="status-dot" aria-hidden="true" />
          <span>Cebu-based IT student building practical web apps</span>
        </Reveal>

        <Reveal delay={80} className="hero-stage">
          <h1 className="hero-name">
            <span>Vincent Paul</span>
            <span>Dumangcas</span>
          </h1>

          <div className="hero-portrait" aria-label="Portrait of Vincent Paul Dumangcas">
            <img src="/profile-photo.jpg" alt="Vincent Paul Dumangcas" />
          </div>

          <p className="hero-command">
            <span>$</span> building useful web apps
          </p>
        </Reveal>

        <Reveal delay={160} className="hero-bottom">
          <div className="hero-summary">
            <p>
              I build web apps from the database to the browser, with a strong pull toward clean
              structure, useful interfaces, and work that feels grounded in real use.
            </p>
          </div>

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
        </Reveal>

        <Reveal delay={220} className="hero-metrics">
          {metrics.map((item) => (
            <div key={item.label} className="metric-card">
              <span className="metric-value">{item.value}</span>
              <span className="metric-label">{item.label}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section id="about" className="band band-light">
      <SectionRail active="ABOUT" />
      <div className="content-shell">
        <Reveal>
          <SectionIntro
            eyebrow="Get to know me"
            title="About Me"
            muted="Me"
            copy="I am still early in my career, but I am already serious about building software that survives real use."
          />
        </Reveal>

        <div className="about-layout">
          <Reveal delay={100} className="about-visual">
            <div className="photo-deck" aria-hidden="true">
              <div className="photo-card photo-card-back" />
              <div className="photo-card photo-card-mid" />
              <img className="photo-card photo-card-front" src="/profile-photo.jpg" alt="" />
            </div>
          </Reveal>

          <Reveal delay={180} className="about-copy">
            <p className="lead-line">
              I care about software that reads clearly before it tries to impress.
            </p>
            <p>
              Most of my work so far has been around turning real requirements into frontend flows,
              backend logic, and deployable systems instead of polished screenshots only.
            </p>
            <p>
              I like projects where the small decisions matter: forms, tables, role-based access,
              labels, empty states, and the pieces that make software feel calm under actual use.
            </p>
            <blockquote>
              Currently seeking opportunities where I can contribute, learn, and grow in a
              professional engineering environment.
            </blockquote>

            <div className="about-actions">
              <Button asChild className="dark-button">
                <a href="mailto:dumangcasvincentpaul@gmail.com">
                  <Mail className="h-4 w-4" />
                  Get in touch
                </a>
              </Button>
              <a className="text-link" href="https://github.com/VincentPaul434" target="_blank" rel="noopener noreferrer">
                GitHub
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="about-meta">
              <span>
                <MapPin className="h-4 w-4" />
                Cebu City, Cebu
              </span>
              <span>
                <Code2 className="h-4 w-4" />
                React, Spring Boot, MySQL
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function StackLoop() {
  return (
    <div className="stack-loop-shell" aria-label="Animated technology stack">
      <div className="stack-loop-track">
        {stackMarqueeLoop.map((item, index) => (
          <figure key={`${item.label}-${index}`} className="stack-logo-mark" aria-label={item.label}>
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

function SkillsSection() {
  return (
    <section id="skills" className="band band-dark">
      <SectionRail active="SKILLS" />
      <div className="content-shell">
        <Reveal>
          <SectionIntro
            eyebrow="What I work with"
            title="My Skills"
            muted="Skills"
            copy="The stack I reach for most often when building full-stack products and practical frontend systems."
            dark
            centered
          />
        </Reveal>

        <Reveal delay={100}>
          <StackLoop />
        </Reveal>

        <div className="skills-layout">
          <div className="service-grid">
            {services.map((service, index) => (
              <Reveal key={service.title} delay={index * 90} className="service-reveal">
                <article className="service-card">
                  <span className="service-icon">
                    <service.icon className="h-4 w-4" />
                  </span>
                  <h3>{service.title}</h3>
                  <p>{service.detail}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={180} className="stack-panel">
            <div className="stack-panel-head">
              <Database className="h-4 w-4" />
              <span>Stack overview</span>
            </div>
            <div className="stack-cloud">
              {stack.map((item) => (
                <span key={item} className="stack-badge">
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
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
          <span className="preview-url">vincent.dev/{project.id}</span>
        </div>
        <div className="preview-body">
          <div className="preview-hero">
            <div className="preview-kicker">{project.title}</div>
            <div className="preview-title-line" />
            <div className="preview-title-line short" />
            <div className="preview-action-line" />
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

function ProjectsSection() {
  return (
    <section id="projects" className="band band-projects">
      <SectionRail active="PROJECTS" />
      <div className="content-shell projects-shell">
        <Reveal className="projects-heading-block">
          <p className="section-eyebrow">What I&apos;ve built</p>
          <h2 className="projects-title">
            <span>Software</span>
            <span>Projects</span>
          </h2>
          <p className="projects-intro">
            Hover the stacked previews to fan them out. Each project stays grounded in the actual
            problem, the build decisions, and what made the product useful.
          </p>
        </Reveal>

        <div className="projects-list">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 120} className="project-reveal">
              <article className={`project-showcase-row ${index % 2 === 1 ? "is-reverse" : ""}`}>
                <div className="project-showcase-visual">
                  <ProjectPreview project={project} reverse={index % 2 === 1} />
                </div>

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

                  <ul className="project-feature-list">
                    {project.features.slice(0, 3).map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>

                  <p className="project-takeaway">{project.takeaway}</p>

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
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-inline-link muted"
                      >
                        Source
                        <Github className="h-4 w-4" />
                      </a>
                    ) : null}
                  </div>
                </div>
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
      <SectionRail active="EXPERIENCE" />
      <div className="content-shell">
        <Reveal>
          <SectionIntro
            eyebrow="Background"
            title="Experience"
            copy="The short version of my path so far: build real things, improve quickly, and stay honest about what I am still learning."
          />
        </Reveal>

        <div className="experience-layout">
          <div className="timeline-list">
            {experience.map((item, index) => (
              <Reveal key={item.title} delay={index * 100} className="timeline-reveal">
                <article className="timeline-card">
                  <span className="timeline-icon">
                    <item.icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="timeline-period">{item.period}</p>
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={220} className="competency-panel">
            <p className="panel-eyebrow">Core competencies</p>
            <div className="competency-list">
              <span>React interfaces</span>
              <span>API integration</span>
              <span>Database-backed flows</span>
              <span>Responsive UI</span>
              <span>Deployment basics</span>
              <span>Documentation reading</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("dumangcasvincentpaul@gmail.com")
    } catch {
      window.prompt("Copy email:", "dumangcasvincentpaul@gmail.com")
    }
  }

  return (
    <section id="contact" className="band band-contact">
      <SectionRail active="CONTACT" />
      <div className="content-shell">
        <Reveal>
          <SectionIntro
            eyebrow="Let's talk"
            title="Contact Me"
            muted="Me"
            copy="I am open to work, collaboration, and interesting projects. Drop me a message and I will respond promptly."
            centered
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
                  <span className="contact-row-copy">
                    <span className="contact-row-label">{item.label}</span>
                    <span className="contact-row-value">{item.value}</span>
                  </span>
                  <ArrowRight className="contact-row-arrow h-4 w-4" />
                </a>
              ))}

              <button type="button" className="contact-copy-button" onClick={handleCopyEmail}>
                <Copy className="h-4 w-4" />
                Copy email
              </button>
            </div>
          </Reveal>

          <Reveal delay={220}>
            <div className="contact-cta-shell">
              <h3>Let&apos;s build something together.</h3>
              <p>
                Whether you have a project in mind, want to discuss opportunities, or just want to
                connect, I&apos;d love to hear from you.
              </p>
              <div className="contact-cta-actions">
                <Button asChild className="light-button">
                  <a href="mailto:dumangcasvincentpaul@gmail.com">Send me an email</a>
                </Button>
                <Button asChild variant="outline" className="contact-outline">
                  <a href="https://github.com/VincentPaul434" target="_blank" rel="noopener noreferrer">
                    View GitHub
                  </a>
                </Button>
              </div>
            </div>
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
        <BrandMark />
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
