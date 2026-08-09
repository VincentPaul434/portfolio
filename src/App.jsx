import { createElement, useEffect, useRef, useState } from "react"
import {
  ArrowDown,
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react"

const navItems = [
  { label: "Home", href: "#top" },
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
]

const projects = [
  {
    id: "01",
    title: "CIT NurseTracer",
    type: "Healthcare operations",
    role: "Full-stack developer",
    period: "2025",
    description:
      "A ward-assignment app that makes nursing handoffs easier to follow than scattered chat updates.",
    tags: ["React", "Tailwind", "Vercel"],
    link: "https://citnursetracer.vercel.app/",
    visual: "nurse",
    visualLabel: "Ward / Trace",
  },
  {
    id: "02",
    title: "ETC Cars",
    type: "Dealership platform",
    role: "Full-stack developer",
    period: "2026",
    description:
      "A responsive dealership workspace that brings vehicles, leads, sales, expenses, and follow-ups into one clear system.",
    tags: ["React", "Dashboard", "Responsive UI"],
    image: "/projects/etc-cars.png",
    visual: "cars",
    featured: true,
  },
  {
    id: "03",
    title: "Poultry Prophet",
    type: "Breeding analytics",
    role: "Full-stack developer",
    period: "2025",
    description:
      "A management platform that tracks bird development and computes transparent readiness scores for month-five selection.",
    tags: ["Next.js", "Spring Boot", "Postgres"],
    link: "https://github.com/VincentPaul434/poultry-prophet-frontend",
    secondaryLink: "https://github.com/VincentPaul434/poultry-prophet-backend",
    visual: "poultry",
    visualLabel: "05 / Ready",
  },
]

const services = [
  {
    number: "01",
    title: "Frontend implementation",
    detail: "Responsive React interfaces with clear hierarchy, useful states, and steady behavior on real screens.",
  },
  {
    number: "02",
    title: "Backend integration",
    detail: "Spring Boot and Node-backed flows that connect authentication, forms, tables, and business logic.",
  },
  {
    number: "03",
    title: "Data systems",
    detail: "Practical persistence with PostgreSQL, MongoDB, and Firebase, shaped around how the product is actually used.",
  },
  {
    number: "04",
    title: "Responsive UI",
    detail: "Layouts that preserve meaning and momentum from compact phones to wide desktop workspaces.",
  },
  {
    number: "05",
    title: "Product debugging",
    detail: "Careful tracing across components, requests, permissions, and data until the real cause becomes visible.",
  },
  {
    number: "06",
    title: "Finishing builds",
    detail: "Turning rough or incomplete work into a coherent, maintainable release with fewer loose ends.",
  },
]

const experience = [
  {
    period: "2021 — present",
    title: "BS Information Technology at CIT-U",
    detail:
      "Building a foundation through coursework, self-study, and experiments that grew into real product work.",
  },
  {
    period: "2025",
    title: "Started shipping full-stack systems",
    detail:
      "Moved past isolated screens to handle data models, authentication, interface states, and deployment.",
  },
  {
    period: "Now",
    title: "Ready for the next real problem",
    detail:
      "Open to internships, junior roles, and contract work where I can contribute and keep learning quickly.",
  },
]

const stack = [
  "React",
  "Next.js",
  "JavaScript",
  "TypeScript",
  "Spring Boot",
  "Java",
  "Node.js",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "Firebase",
  "Figma",
]

function ScrollProgress() {
  const progressRef = useRef(null)

  useEffect(() => {
    const update = () => {
      const root = document.documentElement
      const available = root.scrollHeight - root.clientHeight
      const progress = available > 0 ? root.scrollTop / available : 0

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`
      }
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)

    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  return <span ref={progressRef} className="scroll-progress" aria-hidden="true" />
}

function Reveal({ as: Tag = "div", className = "", delay = 0, children, ...props }) {
  const revealRef = useRef(null)

  useEffect(() => {
    const element = revealRef.current
    if (!element) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.style.setProperty("--reveal-delay", `${delay}ms`)
          element.classList.add("is-visible")
          observer.unobserve(element)
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [delay])

  return createElement(
    Tag,
    { ref: revealRef, className: `reveal ${className}`, ...props },
    children,
  )
}

function SectionHeading({ number, title, light = false }) {
  return (
    <Reveal className={`section-heading ${light ? "is-light" : ""}`}>
      <div className="section-heading-copy">
        <span className="section-number">/{number}</span>
        <h2>{title}</h2>
      </div>
      <span className="section-rule" aria-hidden="true" />
    </Reveal>
  )
}

function BrandMark() {
  return (
    <a className="brand-mark" href="#top" aria-label="Vincent Paul Dumangcas — back to top">
      <span className="brand-symbol" aria-hidden="true">
        VP
      </span>
      <span className="brand-name">
        Vincent Paul
        <small>Full-stack developer</small>
      </span>
    </a>
  )
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef(null)

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen)

    const onKeyDown = (event) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.classList.remove("menu-open")
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <div className="header-inner">
        <BrandMark />

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.slice(1).map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          className="menu-button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <nav
        id="mobile-navigation"
        className={`mobile-navigation ${menuOpen ? "is-open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        <div className="mobile-navigation-inner">
          {navItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              tabIndex={menuOpen ? 0 : -1}
              onClick={closeMenu}
            >
              <span>0{index + 1}</span>
              {item.label}
            </a>
          ))}
          <p>Cebu, Philippines · Available for thoughtful product work.</p>
        </div>
      </nav>
    </header>
  )
}

function HeroSection() {
  return (
    <section id="top" className="hero-section">
      <div className="kinetic-type" aria-hidden="true">
        <span>V</span>
        <span>P</span>
        <span>D</span>
        <span>&#123;</span>
        <span>/</span>
        <span>&#125;</span>
      </div>

      <div className="page-shell hero-inner">
        <div className="hero-copy">
          <Reveal as="p" className="hero-greeting">
            Hi, I&apos;m Vincent Paul Dumangcas,
          </Reveal>
          <Reveal as="h1" className="hero-title" delay={80}>
            <span>Full-stack developer</span>
            <span className="accent-line">building useful systems</span>
            <span>from Cebu.</span>
          </Reveal>
        </div>

        <Reveal className="hero-footer" delay={160}>
          <p>
            I turn real requirements into clear interfaces, dependable backend logic, and products
            that hold together beyond the demo.
          </p>
          <a href="#projects" className="scroll-link">
            See selected work
            <ArrowDown aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}

function ProjectVisual({ project }) {
  if (project.image) {
    return (
      <figure className="project-visual has-image">
        <img
          src={project.image}
          alt="ETC Cars dealership dashboard shown on desktop, tablet, laptop, and mobile screens"
          width="1672"
          height="941"
          loading="lazy"
          decoding="async"
        />
      </figure>
    )
  }

  return (
    <figure className={`project-visual visual-${project.visual}`} aria-label={`${project.title} graphic preview`}>
      <span className="preview-index">{project.id}</span>
      <strong>{project.visualLabel}</strong>
      <div className="preview-window" aria-hidden="true">
        <span />
        <span />
        <span />
        <i />
        <i />
        <i />
      </div>
    </figure>
  )
}

function ProjectCard({ project, index }) {
  const cardContent = (
    <>
      <div className="project-card-heading">
        <div>
          <div className="project-meta-line">
            <span className="project-type">{project.type}</span>
            {project.featured ? <span className="project-featured">Featured project</span> : null}
          </div>
          <h3>{project.title}</h3>
        </div>
        <span className="project-year">{project.period}</span>
      </div>

      <ProjectVisual project={project} />

      <div className="project-card-footer">
        <p>{project.description}</p>
        <div className="project-tags" aria-label={`${project.title} technology stack`}>
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        {project.link ? (
          <span className="project-visit">
            View project
            <ArrowUpRight aria-hidden="true" />
          </span>
        ) : (
          <span className="project-visit is-muted">Private project</span>
        )}
      </div>
    </>
  )

  return (
    <Reveal
      as="article"
      delay={(index % 2) * 80}
      className={`project-card ${project.featured ? "is-featured" : ""} ${index === projects.length - 1 ? "is-wide" : ""}`}
    >
      {project.link ? (
        <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title}`}>
          {cardContent}
        </a>
      ) : (
        cardContent
      )}

      {project.secondaryLink ? (
        <a
          className="secondary-project-link"
          href={project.secondaryLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Backend source
          <ArrowUpRight aria-hidden="true" />
        </a>
      ) : null}
    </Reveal>
  )
}

function ProjectsSection() {
  return (
    <section id="projects" className="work-section">
      <div className="page-shell">
        <SectionHeading number="01" title="My work" light />

        <div className="project-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section id="about" className="approach-section">
      <div className="approach-type" aria-hidden="true">
        END TO END
      </div>

      <div className="page-shell approach-inner">
        <SectionHeading number="02" title="My approach" />

        <div className="approach-layout">
          <Reveal as="p" className="approach-statement">
            Software should read clearly before it tries to impress.
          </Reveal>

          <Reveal className="approach-copy" delay={100}>
            <p>
              I like projects where the small decisions matter: forms, tables, permissions, empty
              states, and the unglamorous details that make a product feel calm under real use.
            </p>
            <p>
              My work crosses the whole path from data and backend logic to responsive frontend
              flows. That wider view helps me keep the pieces understandable—and make better
              tradeoffs when requirements change.
            </p>
          </Reveal>
        </div>

        <div className="approach-metrics">
          <Reveal className="approach-metric">
            <strong>03</strong>
            <span>featured systems</span>
          </Reveal>
          <Reveal className="approach-metric" delay={70}>
            <strong>2021</strong>
            <span>started IT at CIT-U</span>
          </Reveal>
          <Reveal className="approach-metric" delay={140}>
            <strong>Cebu</strong>
            <span>open to remote work</span>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function SkillsSection() {
  return (
    <section id="skills" className="skills-section">
      <div className="page-shell">
        <SectionHeading number="03" title="What I do" light />

        <div className="services-grid">
          {services.map((service, index) => (
            <Reveal as="article" key={service.title} className="service-card" delay={(index % 3) * 70}>
              <span className="service-number">{service.number}</span>
              <div className="service-symbol" aria-hidden="true">
                <span />
                <span />
              </div>
              <h3>{service.title}</h3>
              <p>{service.detail}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="stack-marquee" aria-label={`Technology stack: ${stack.join(", ")}`}>
        <div className="stack-track">
          {[...stack, ...stack].map((item, index) => (
            <span key={`${item}-${index}`}>
              {item}
              <i aria-hidden="true">•</i>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function ExperienceSection() {
  return (
    <section id="experience" className="experience-section">
      <div className="page-shell">
        <SectionHeading number="04" title="Experience" />

        <div className="experience-grid">
          {experience.map((item, index) => (
            <Reveal as="article" key={item.title} className="experience-card" delay={index * 80}>
              <span>{item.period}</span>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="competency-wall">
          <p>
            React interfaces <i>•</i> API integration <i>•</i> database-backed flows <i>•</i>{" "}
            responsive UI <i>•</i> practical debugging <i>•</i> documentation reading
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function ContactFooter() {
  return (
    <footer id="contact" className="contact-footer">
      <div className="page-shell contact-footer-inner">
        <Reveal className="contact-footer-heading">
          <p>
            For internships, collaboration requests or project opportunities, don&apos;t hesitate
            to reach out.
          </p>
          <h2>Get in touch</h2>
        </Reveal>

        <Reveal className="contact-direct" delay={80}>
          <a href="mailto:dumangcasvincentpaul@gmail.com">
            dumangcasvincentpaul@gmail.com
          </a>
          <a href="tel:+639702909636" className="contact-phone">
            +63 970 290 9636
          </a>
        </Reveal>

        <div className="contact-footer-space" aria-hidden="true" />

        <div className="contact-footer-meta">
          <p>©{new Date().getFullYear()} Vincent Paul Dumangcas</p>
          <nav aria-label="Social links">
            <a href="https://github.com/VincentPaul434" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/vincent-paul-dumangcas-74063a365/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </nav>
          <p>Designed &amp; developed by Vincent</p>
        </div>
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
        <ProjectsSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
      </main>
      <ContactFooter />
    </div>
  )
}

export default App
