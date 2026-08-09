import { useEffect, useRef, useState } from "react"
import { ArrowDown, ArrowUpRight, Menu, X } from "lucide-react"

const navItems = [
  { label: "Home", href: "#hero-section" },
  { label: "About me", href: "#about-section" },
  { label: "Services", href: "#services" },
  { label: "Works", href: "#projects" },
  { label: "Contact", href: "#contact" },
]

const projects = [
  {
    id: "01",
    title: "ETC Cars",
    type: "Dealership platform",
    detail: "A responsive workspace for vehicles, leads, sales, expenses, and follow-ups.",
    tags: ["React", "Dashboard", "Responsive UI"],
    image: "/projects/etc-cars.png",
  },
  {
    id: "02",
    title: "CIT NurseTracer",
    type: "Healthcare operations",
    detail: "A ward-assignment app that makes nursing handoffs easier to follow.",
    tags: ["React", "Tailwind", "Vercel"],
    link: "https://citnursetracer.vercel.app/",
    visual: "nurse",
    visualLabel: "WARD / TRACE",
  },
  {
    id: "03",
    title: "Poultry Prophet",
    type: "Breeding analytics",
    detail: "A management platform that turns bird development into transparent readiness scores.",
    tags: ["Next.js", "Spring Boot", "Postgres"],
    link: "https://github.com/VincentPaul434/poultry-prophet-frontend",
    secondaryLink: "https://github.com/VincentPaul434/poultry-prophet-backend",
    visual: "poultry",
    visualLabel: "05 / READY",
  },
]

const services = [
  {
    title: "Frontend implementation",
    tags: ["React", "Responsive layouts", "Useful states"],
  },
  {
    title: "Backend integration",
    tags: ["Spring Boot", "Node.js", "Authentication"],
  },
  {
    title: "Data systems",
    tags: ["PostgreSQL", "MongoDB", "Firebase"],
  },
  {
    title: "Product debugging",
    tags: ["Tracing", "Permissions", "Real-world fixes"],
  },
]

const principles = [
  {
    title: "Clarity first",
    quote: "Make the important path obvious before making it impressive.",
  },
  {
    title: "Whole-system thinking",
    quote: "A good interface is only as dependable as the logic behind it.",
  },
  {
    title: "Built for use",
    quote: "The details matter most when the product leaves the demo.",
  },
]

const notes = [
  {
    date: "NOW",
    title: "Shipping full-stack systems",
    detail: "Moving from isolated screens to products with data, permissions, and real flows.",
  },
  {
    date: "2021 — PRESENT",
    title: "Learning at CIT-U",
    detail: "Building a foundation through coursework, self-study, and experiments that ship.",
  },
  {
    date: "OPEN TO",
    title: "The next real problem",
    detail: "Internships, junior roles, and collaborations where I can contribute and grow quickly.",
  },
]

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
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [delay])

  return (
    <Tag ref={revealRef} className={`reveal ${className}`} {...props}>
      {children}
    </Tag>
  )
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef(null)

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen)

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      document.body.classList.remove("menu-open")
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [menuOpen])

  return (
    <>
      <header className="floating-header">
        <a className="floating-brand" href="#hero-section" aria-label="Vincent Paul — back to top">
          Vincent
        </a>
        <button
          ref={menuButtonRef}
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-controls="site-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </header>

      <nav
        id="site-navigation"
        className={`floating-navigation ${menuOpen ? "is-open" : ""}`}
        aria-label="Primary navigation"
        aria-hidden={!menuOpen}
      >
        {navItems.map((item, index) => (
          <a
            key={item.href}
            href={item.href}
            tabIndex={menuOpen ? 0 : -1}
            onClick={() => setMenuOpen(false)}
          >
            <span>0{index + 1}</span>
            {item.label}
          </a>
        ))}
      </nav>
    </>
  )
}

function HeroSection() {
  return (
    <section id="hero-section" className="hero-section">
      <div className="page-shell hero-inner">
        <Reveal className="hero-kicker">/ FULL-STACK DEVELOPER · CEBU</Reveal>
        <Reveal as="h1" className="hero-title" delay={80}>
          <span>Full-stack</span>
          <span>developer</span>
        </Reveal>

        <div className="hero-meta">
          <Reveal as="h2" delay={140}>©2026</Reveal>
          <Reveal as="p" delay={180}>/ CREATING SINCE 2021</Reveal>
        </div>

        <a href="#about-section" className="hero-scroll" aria-label="Scroll to about section">
          <ArrowDown aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section id="about-section" className="about-section page-section">
      <div className="page-shell">
        <Reveal as="h2" className="section-title">Hey!</Reveal>

        <div className="about-grid">
          <Reveal as="p" className="about-lead">
            I&apos;m Vincent, a builder based in Cebu, creating practical products from the database to the browser.
          </Reveal>

          <Reveal className="about-shot" delay={80}>
            <img
              src="/projects/etc-cars.png"
              alt="ETC Cars dashboard displayed across multiple devices"
              width="1672"
              height="941"
            />
            <span>Vincent Paul / Full-stack developer</span>
          </Reveal>

          <Reveal className="about-copy" delay={140}>
            <p>
              I work across responsive interfaces, backend logic, and the data systems that keep a product understandable under real use.
            </p>
            <p>
              I like the unglamorous details: forms, tables, permissions, empty states, and the small decisions that make a product feel calm.
            </p>
            <a className="text-link" href="#projects">
              See selected work <ArrowUpRight aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function StatementSection() {
  return (
    <section className="statement-section page-section" aria-label="Design approach">
      <Reveal as="p" className="statement-copy">
        <span className="statement-focus">From requirements to release.</span>{" "}
        <span className="statement-muted">Clear, scalable digital products built to move fast, stay simple, and perform in real-world use.</span>
      </Reveal>
    </section>
  )
}

function ServicesSection() {
  return (
    <section id="services" className="services-section page-section">
      <div className="page-shell">
        <Reveal as="h2" className="section-title">Services</Reveal>
        <div className="service-list">
          {services.map((service, index) => (
            <Reveal as="article" className="service-row" key={service.title} delay={index * 60}>
              <h3>{service.title}</h3>
              <div className="service-tags">
                {service.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectVisual({ project }) {
  if (project.image) {
    return (
      <div className="project-art has-image">
        <img src={project.image} alt="ETC Cars dealership dashboard" width="1672" height="941" loading="lazy" />
      </div>
    )
  }

  return (
    <div className={`project-art visual-${project.visual}`}>
      <span className="project-art-index">{project.id}</span>
      <strong>{project.visualLabel}</strong>
      <div className="abstract-window" aria-hidden="true">
        <span />
        <span />
        <span />
        <i />
        <i />
        <i />
      </div>
    </div>
  )
}

function ProjectCard({ project, index }) {
  const content = (
    <>
      <ProjectVisual project={project} />
      <div className="project-card-meta">
        <span>{project.type}</span>
        <span>{project.id}</span>
      </div>
      <h3>{project.title}</h3>
      <p>{project.detail}</p>
      <div className="project-card-bottom">
        <div className="project-tags">
          {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        {project.link ? <span className="text-link">View project <ArrowUpRight aria-hidden="true" /></span> : <span className="project-status">Private build</span>}
      </div>
    </>
  )

  return (
    <Reveal as="article" className="project-card" delay={(index % 2) * 70}>
      {project.link ? (
        <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title}`}>
          {content}
        </a>
      ) : content}
      {project.secondaryLink ? (
        <a className="secondary-project-link" href={project.secondaryLink} target="_blank" rel="noopener noreferrer">
          Backend source <ArrowUpRight aria-hidden="true" />
        </a>
      ) : null}
    </Reveal>
  )
}

function ProjectsSection() {
  return (
    <section id="projects" className="projects-section page-section">
      <div className="page-shell">
        <div className="section-intro">
          <Reveal as="h2" className="section-title section-title-stacked">
            <span>Featured</span>
            <span>projects</span>
          </Reveal>
          <Reveal delay={100}>
            <a className="text-link" href="#contact">Let&apos;s work together <ArrowUpRight aria-hidden="true" /></a>
          </Reveal>
        </div>

        <div className="project-grid">
          {projects.map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}
        </div>
      </div>
    </section>
  )
}

function PrinciplesSection() {
  return (
    <section className="principles-section page-section">
      <div className="page-shell">
        <Reveal as="h2" className="section-title section-title-light">How I work</Reveal>
        <div className="principles-grid">
          {principles.map((principle, index) => (
            <Reveal as="article" className="principle-card" key={principle.title} delay={index * 70}>
              <span>{principle.title}</span>
              <p>“{principle.quote}”</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function NotesSection() {
  return (
    <section className="notes-section page-section">
      <div className="page-shell">
        <Reveal as="h2" className="section-title">Now</Reveal>
        <div className="notes-grid">
          {notes.map((note, index) => (
            <Reveal as="article" className={`note-card ${index === 2 ? "is-dark" : ""}`} key={note.title} delay={index * 70}>
              <span>{note.date}</span>
              <h3>{note.title}</h3>
              <p>{note.detail}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactForm() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.get("name")}`)
    const body = encodeURIComponent(`Name: ${form.get("name")}\nEmail: ${form.get("email")}\n\n${form.get("project")}`)
    window.location.href = `mailto:dumangcasvincentpaul@gmail.com?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input id="name" name="name" type="text" placeholder="Enter your name" required />
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" placeholder="Enter your email" required />
      <label htmlFor="project">Your project</label>
      <textarea id="project" name="project" placeholder="Tell me about your project" rows="5" required />
      <button type="submit">{sent ? "Opening email" : "Send inquiry"} <ArrowUpRight aria-hidden="true" /></button>
    </form>
  )
}

function ContactSection() {
  return (
    <section id="contact" className="contact-section page-section">
      <div className="page-shell contact-grid">
        <div className="contact-copy">
          <Reveal as="h2" className="section-title">Let&apos;s<br />talk.</Reveal>
          <Reveal as="p" delay={80}>
            Have a project, an opportunity, or a problem worth thinking through? Send a note and I&apos;ll get back to you soon.
          </Reveal>
          <Reveal className="social-links" delay={140}>
            <a href="https://github.com/VincentPaul434" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/vincent-paul-dumangcas-74063a365/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="mailto:dumangcasvincentpaul@gmail.com">Email</a>
          </Reveal>
        </div>
        <Reveal delay={100}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell">
        <div className="footer-grid">
          <h2>Building useful systems that hold together.</h2>
          <div>
            <h3>/Quick links</h3>
            <nav className="footer-links" aria-label="Footer navigation">
              {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
            </nav>
          </div>
          <div>
            <h3>/Contact</h3>
            <a className="footer-email" href="mailto:dumangcasvincentpaul@gmail.com">dumangcasvincentpaul@gmail.com</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>©2026 Vincent Paul Dumangcas</span>
          <span>Cebu, Philippines</span>
          <span>Designed &amp; developed by Vincent</span>
        </div>
      </div>
    </footer>
  )
}

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <StatementSection />
        <ServicesSection />
        <ProjectsSection />
        <PrinciplesSection />
        <NotesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
