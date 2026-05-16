import React, { useEffect, useMemo, useRef, useState } from "react"
import { NavLink, Navigate, Route, Routes, useLocation } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Particles from "@/components/ui/Particles"
import {
  ArrowUpRight,
  Code2,
  Globe,
  Linkedin,
  Mail,
  Moon,
  Palette,
  Sparkles,
  Sun,
  Wrench,
} from "lucide-react"

const navItems = [
  { label: "About", to: "/about" },
  { label: "Works", to: "/works" },
  { label: "Services", to: "/services" },
  { label: "Contact", to: "/contact" },
]

const projects = [
  {
    title: "CIT NurseTracer",
    description: "Nurse tracing and coordination web application for healthcare workflows.",
    tech: ["React", "Healthcare", "Vercel"],
    link: "https://citnursetracer.vercel.app/",
    type: "Live Website",
  },
  {
    title: "Synapse UI",
    description: "Modern UI component library and interface toolkit.",
    tech: ["React", "Design Systems", "Components"],
    link: "https://github.com/princeprog/synapse-ui",
    type: "GitHub Repository",
  },
  {
    title: "ProPath Backend",
    description: "Backend API for a career platform with scalable endpoint design.",
    tech: ["Spring Boot", "MySQL", "REST API"],
    link: "https://github.com/princeprog/propath-backend",
    type: "GitHub Repository",
  },
]

const stack = [
  "React", "TypeScript", "Spring Boot", "Tailwind", "Node.js",
  "MySQL", "PostgreSQL", "Figma", "Vite", "Git",
]

const stats = [
  { value: 30, suffix: "+", label: "Projects shipped" },
  { value: 4, suffix: "+", label: "Years of practice" },
  { value: 12, suffix: "k", label: "Hours of code" },
]

/* ---------- Reveal on scroll ---------- */
function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}ms`
          el.classList.add("in-view")
          io.unobserve(el)
        }
      },
      { threshold: 0.12 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [delay])
  return (
    <Tag ref={ref} className={`reveal ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

/* ---------- Typewriter rotating words ---------- */
function Typewriter({ words, className = "" }) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState("")
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[index % words.length]
    const speed = deleting ? 45 : 95
    const t = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1)
        setText(next)
        if (next === current) {
          setTimeout(() => setDeleting(true), 1400)
        }
      } else {
        const next = current.slice(0, text.length - 1)
        setText(next)
        if (next.length === 0) {
          setDeleting(false)
          setIndex((i) => i + 1)
        }
      }
    }, speed)
    return () => clearTimeout(t)
  }, [text, deleting, index, words])

  return (
    <span className={className}>
      {text}
      <span className="caret-blink ml-0.5 inline-block w-[2px] h-[0.9em] -mb-1 bg-primary align-middle" />
    </span>
  )
}

/* ---------- Tilt card ---------- */
function TiltCard({ children, className = "" }) {
  const ref = useRef(null)
  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rx = (py - 0.5) * -8
    const ry = (px - 0.5) * 10
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`
  }
  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateY(0)"
  }
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`tilt-card ${className}`}
    >
      {children}
    </div>
  )
}

/* ---------- Animated counter ---------- */
function Counter({ to, suffix = "", duration = 1400 }) {
  const ref = useRef(null)
  const [val, setVal] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const tick = (now) => {
            const t = Math.min(1, (now - start) / duration)
            const eased = 1 - Math.pow(1 - t, 3)
            setVal(Math.round(to * eased))
            if (t < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
          io.unobserve(el)
        }
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [to, duration])

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  )
}

/* ---------- About page ---------- */
function AboutPage() {
  return (
    <section className="page-enter pt-8 pb-16">
      <div className="relative overflow-hidden rounded-3xl border bg-card/80 backdrop-blur">
        <div className="blob-drift pointer-events-none absolute -left-24 top-12 h-64 w-64 rounded-full bg-primary/25 blur-3xl" />
        <div className="blob-drift-slow pointer-events-none absolute -right-16 -bottom-16 h-72 w-72 rounded-full bg-accent/25 blur-3xl" />

        <div className="grid grid-cols-1 items-center gap-12 px-8 py-10 md:grid-cols-[1.1fr_0.9fr] md:px-14 md:py-14">
          <div>
            <Reveal>
              <Badge className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/15 text-primary hover:bg-primary/20">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-primary pulse-ring" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                Available for work · Portfolio 2026
              </Badge>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="text-balance text-4xl font-extrabold leading-[1.03] tracking-tight md:text-6xl">
                Building digital products,
                <br />
                <span className="gradient-text">
                  <Typewriter
                    words={["brands.", "clean code.", "developer tools.", "delightful UI."]}
                  />
                </span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-pretty text-base text-muted-foreground md:text-lg">
                I am Vincent Paul, a full-stack developer focused on practical software for healthcare and service teams.
                I design thoughtful frontends, wire reliable backends, and ship products that are easy to use.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Input placeholder="Email address" className="h-12 rounded-full bg-background/70 transition focus-visible:ring-2 focus-visible:ring-primary/50" />
                <Button className="shine-on-hover group h-12 rounded-full px-7 font-semibold transition-transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30">
                  Connect With Me
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border/60 pt-6">
                {stats.map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-2xl font-bold tracking-tight md:text-3xl">
                      <Counter to={s.value} suffix={s.suffix} />
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground md:text-sm">{s.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="relative mx-auto w-full max-w-[420px]">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary/35 via-accent/20 to-transparent blur-2xl" />
            <div className="float-soft relative overflow-hidden rounded-[2rem] border bg-background/80 p-3 shadow-xl">
              <img
                src="/profile-photo.jpg"
                alt="Professional portrait"
                className="h-[420px] w-full rounded-[1.6rem] object-cover transition-transform duration-700 hover:scale-[1.04]"
              />
            </div>
          </Reveal>
        </div>
      </div>

      {/* Marquee tech stack */}
      <Reveal delay={120} className="mt-12">
        <p className="mb-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">Tech I build with</p>
        <div className="marquee-mask relative overflow-hidden">
          <div className="marquee-track flex w-max gap-3">
            {[...stack, ...stack].map((s, i) => (
              <span
                key={`${s}-${i}`}
                className="rounded-full border border-border/70 bg-card/60 px-4 py-2 text-sm text-muted-foreground transition hover:border-primary/60 hover:text-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}

/* ---------- Works page ---------- */
function WorksPage() {
  return (
    <section className="page-enter pt-8 pb-16">
      <Reveal className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
          Selected <span className="gradient-text">Works</span>
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Projects focused on useful experiences, scalable structure, and polished interface details.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={i * 90}>
            <TiltCard>
              <Card className="group h-full border-border/70 bg-card/80 backdrop-blur transition-all hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10">
                <CardHeader className="tilt-inner">
                  <CardDescription className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {project.type}
                  </CardDescription>
                  <CardTitle className="text-xl transition-colors group-hover:text-primary">
                    {project.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                </CardHeader>
                <CardContent className="tilt-inner">
                  <div className="mb-5 flex flex-wrap gap-2">
                    {project.tech.map((item) => (
                      <Badge
                        key={item}
                        variant="outline"
                        className="rounded-full transition hover:border-primary hover:bg-primary/10 hover:text-primary"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                  <Button asChild className="shine-on-hover group/btn w-full rounded-full">
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      Visit Project
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ---------- Services page ---------- */
function ServicesPage() {
  const services = useMemo(
    () => [
      {
        icon: Globe,
        title: "Web Product Design",
        description: "Interface architecture, visual hierarchy, and responsive page systems for modern products.",
      },
      {
        icon: Code2,
        title: "Full-Stack Development",
        description: "React frontends and Spring Boot APIs with practical data modeling and maintainable code.",
      },
      {
        icon: Palette,
        title: "UI Systems",
        description: "Reusable components, design tokens, and polished interaction patterns for fast iteration.",
      },
      {
        icon: Wrench,
        title: "Technical Support",
        description: "Refactors, bug fixing, and feature cleanup to stabilize projects before release.",
      },
    ],
    [],
  )

  return (
    <section className="page-enter pt-8 pb-16">
      <Reveal className="mb-10 flex items-center gap-3">
        <Sparkles className="h-6 w-6 text-primary" />
        <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
          <span className="gradient-text">Services</span>
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {services.map((service, i) => (
          <Reveal key={service.title} delay={i * 100}>
            <Card className="group relative h-full overflow-hidden rounded-3xl border-border/70 bg-card/80 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <CardHeader>
                <div className="mb-2 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <service.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="transition-colors group-hover:text-primary">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ---------- Contact page ---------- */
function ContactPage() {
  return (
    <section className="page-enter pt-8 pb-16">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <Card className="rounded-3xl bg-card/80">
            <CardHeader>
              <CardTitle className="text-3xl">
                Let us <span className="gradient-text">build</span> together
              </CardTitle>
              <CardDescription>
                Tell me what you are building and I can help you shape the product and ship it cleanly.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <a
                className="group flex items-center gap-3 rounded-xl p-2 text-muted-foreground transition hover:bg-primary/10 hover:text-foreground"
                href="mailto:dumangcasvincentpaul@gmail.com"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary transition group-hover:rotate-6">
                  <Mail className="h-4 w-4" />
                </span>
                dumangcasvincentpaul@gmail.com
              </a>
              <a
                className="group flex items-center gap-3 rounded-xl p-2 text-muted-foreground transition hover:bg-primary/10 hover:text-foreground"
                href="https://www.linkedin.com/in/vincent-paul-dumangcas-74063a365/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary transition group-hover:rotate-6">
                  <Linkedin className="h-4 w-4" />
                </span>
                LinkedIn profile
              </a>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={120}>
          <Card className="rounded-3xl border-border/70 bg-card/80">
            <CardContent className="p-6 md:p-8">
              <form className="space-y-5" name="contact" method="post" data-netlify="true">
                <input type="hidden" name="form-name" value="contact" />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Input name="name" placeholder="Your name" required className="h-11 rounded-xl transition focus-visible:ring-2 focus-visible:ring-primary/50" />
                  <Input name="email" type="email" placeholder="Email address" required className="h-11 rounded-xl transition focus-visible:ring-2 focus-visible:ring-primary/50" />
                </div>
                <Input name="subject" placeholder="Project subject" required className="h-11 rounded-xl transition focus-visible:ring-2 focus-visible:ring-primary/50" />
                <Textarea name="message" rows={6} placeholder="Write your message" required className="rounded-xl transition focus-visible:ring-2 focus-visible:ring-primary/50" />
                <Button type="submit" className="shine-on-hover h-11 w-full rounded-xl font-semibold transition-transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- App shell ---------- */
function App() {
  const location = useLocation()
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false
    const stored = localStorage.getItem("theme")
    if (stored) return stored === "dark"
    return false
  })

  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark")
    else document.documentElement.classList.remove("dark")
    localStorage.setItem("theme", isDark ? "dark" : "light")
  }, [isDark])

  const particleColors = useMemo(
    () => (isDark ? ["#34d399", "#a7f3d0", "#10b981"] : ["#10b981", "#34d399", "#6ee7b7"]),
    [isDark],
  )

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Animated background layers */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="blob-drift absolute -left-24 -top-16 h-80 w-80 rounded-full bg-primary/25 blur-3xl" />
        <div className="blob-drift-slow absolute right-0 top-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="blob-drift absolute bottom-0 left-1/2 h-64 w-[34rem] -translate-x-1/2 rounded-full bg-muted/70 blur-3xl" />
      </div>

      {/* Particle field */}
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-60">
        <Particles
          particleCount={140}
          particleSpread={12}
          speed={0.08}
          particleColors={particleColors}
          alphaParticles
          particleBaseSize={90}
          sizeRandomness={1}
          cameraDistance={22}
        />
      </div>

      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-6">
          <NavLink to="/about" className="group flex items-center gap-2 font-bold tracking-tight text-lg">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform duration-500 group-hover:rotate-[20deg]">
              VP
            </span>
            <span className="transition-colors group-hover:text-primary">Vincent Paul Dumangcas</span>
          </NavLink>

          <nav className="hidden items-center gap-1 rounded-full border border-border/70 bg-card/60 p-1 backdrop-blur md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `nav-link rounded-full px-4 py-2 text-sm transition ${
                    isActive ? "is-active bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              onClick={() => setIsDark(!isDark)}
              className="transition-transform duration-500 hover:rotate-[20deg]"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="outline" className="shine-on-hover hidden rounded-full transition-transform hover:-translate-y-0.5 md:inline-flex" asChild>
              <a href="mailto:dumangcasvincentpaul@gmail.com">Hire Me</a>
            </Button>
          </div>
        </div>

        <div className="border-t border-border/50 px-4 py-2 md:hidden">
          <nav className="mx-auto flex w-full max-w-6xl gap-2 overflow-x-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `whitespace-nowrap rounded-full px-4 py-2 text-sm transition ${
                    isActive ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main key={location.pathname} className="mx-auto w-full max-w-6xl px-6">
        <Routes location={location}>
          <Route path="/" element={<Navigate to="/about" replace />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/works" element={<WorksPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/about" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
