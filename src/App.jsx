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
  Atom,
  CheckCircle2,
  Code2,
  Download,
  Github,
  Globe,
  GraduationCap,
  Heart,
  Layers,
  Lightbulb,
  Linkedin,
  Mail,
  Moon,
  Palette,
  Server,
  Sparkles,
  Sun,
  Target,
  Wrench,
} from "lucide-react"

const navItems = [
  { label: "About", to: "/about" },
  { label: "Works", to: "/works" },
  { label: "Services", to: "/services" },
  { label: "Contact", to: "/contact" },
]

const heroChips = [
  { label: "React", icon: Atom },
  { label: "TypeScript", icon: Code2 },
  { label: "Spring Boot", icon: Server },
  { label: "Tailwind", icon: Palette },
  { label: "PostgreSQL", icon: Layers },
  { label: "Design Systems", icon: Sparkles },
]

const projects = [
  {
    title: "CIT NurseTracer",
    tagline: "Tracing nurses, calmly.",
    description:
      "A coordination tool that gives nursing teams a single, low-noise view of who is where and what needs to happen next.",
    problem:
      "Hospital floors were tracking nurse assignments on whiteboards and group chats, making handoffs slow and easy to miss.",
    features: [
      "Live shift and ward assignments",
      "Role-based access for charge nurses and admins",
      "Searchable activity log with timestamps",
      "Mobile-first layout for bedside use",
    ],
    challenges:
      "Designing for high-stress environments where a tap should never feel ambiguous, while keeping the UI calm and unobtrusive.",
    impact: "Cut handoff coordination chatter for pilot wards.",
    tech: ["React", "Tailwind", "Vercel", "Healthcare"],
    link: "https://citnursetracer.vercel.app/",
    type: "Live Product",
    year: "2025",
  },
  {
    title: "Synapse UI",
    tagline: "A small, opinionated component kit.",
    description:
      "A growing component library built around clarity and accessibility — designed to be readable in code and quiet on screen.",
    problem:
      "Most starter UI kits feel either too sterile or too noisy. I wanted a small set that gets out of the way and composes well.",
    features: [
      "Composable primitives with sensible defaults",
      "Accessible focus rings and keyboard paths",
      "Theming via CSS variables, no runtime cost",
      "Documented usage with copy-paste examples",
    ],
    challenges:
      "Drawing the line between flexibility and a strong default. Every prop is a decision that future-me has to live with.",
    impact: "Reusable across personal projects, shrinking setup time.",
    tech: ["React", "Tailwind", "Design Systems", "Accessibility"],
    link: "https://github.com/princeprog/synapse-ui",
    github: "https://github.com/princeprog/synapse-ui",
    type: "Open Source",
    year: "2025",
  },
  {
    title: "ProPath Backend",
    tagline: "A career-path API, kept boring on purpose.",
    description:
      "REST API powering a career-planning platform — predictable endpoints, clear data shapes, and migrations that won't keep you up at night.",
    problem:
      "Career-planning data is messy: roles, skills, prerequisites, and progressions don't fit into one table without pain.",
    features: [
      "Domain-modeled entities for roles and skills",
      "Token-based authentication with role guards",
      "Paginated, filterable listing endpoints",
      "Test-friendly service layer separation",
    ],
    challenges:
      "Resisting the urge to over-abstract early. I kept the data model close to the product until usage patterns made the seams obvious.",
    impact: "Stable contract the frontend could build against without churn.",
    tech: ["Spring Boot", "MySQL", "REST API", "Java"],
    link: "https://github.com/princeprog/propath-backend",
    github: "https://github.com/princeprog/propath-backend",
    type: "Backend Service",
    year: "2024",
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

const journey = [
  {
    icon: GraduationCap,
    period: "2021 →",
    title: "Studying IT at CIT-U",
    detail: "Cebu Institute of Technology — University. Picked up the fundamentals, then kept building beyond the syllabus.",
  },
  {
    icon: Code2,
    period: "2022 →",
    title: "First real shipped product",
    detail: "Went from tutorial-mode to production-mode: deploys, dashboards, on-call. The gap is real, and worth crossing.",
  },
  {
    icon: Heart,
    period: "2025 →",
    title: "Healthcare & service tools",
    detail: "Drawn to interfaces where calm matters — nurses, coordinators, small teams. Software that lowers stress, not adds to it.",
  },
]

const specialties = [
  {
    icon: Layers,
    title: "Interface Systems",
    detail: "Composable components, design tokens, and patterns that scale past the first three screens.",
  },
  {
    icon: Server,
    title: "Pragmatic Backends",
    detail: "Spring Boot APIs with clear data models, sensible auth, and migrations that don't surprise anyone.",
  },
  {
    icon: Lightbulb,
    title: "Product Sense",
    detail: "Reading what a user actually needs vs. what the ticket says — and pushing back gently when those disagree.",
  },
  {
    icon: Target,
    title: "Shipping Discipline",
    detail: "Small, reversible commits. Boring deploys. Features behind flags when they should be.",
  },
]

const socials = [
  { href: "https://github.com/VincentPaul434", label: "GitHub", icon: Github },
  { href: "https://www.linkedin.com/in/vincent-paul-dumangcas-74063a365/", label: "LinkedIn", icon: Linkedin },
  { href: "mailto:dumangcasvincentpaul@gmail.com", label: "Email", icon: Mail },
]

/* ---------- Custom cursor with glow follower ---------- */
function CustomCursor() {
  const dotRef = useRef(null)
  const glowRef = useRef(null)
  const target = useRef({ x: -100, y: -100 })
  const current = useRef({ x: -100, y: -100 })
  const glowPos = useRef({ x: -100, y: -100 })
  const [supported, setSupported] = useState(true)

  useEffect(() => {
    if (typeof window === "undefined") return
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!fine || reduced) {
      setSupported(false)
      return
    }
    document.documentElement.classList.add("has-custom-cursor")

    const onMove = (e) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
    }
    const onOver = (e) => {
      const el = e.target.closest("a, button, [data-cursor='hover'], input, textarea")
      if (el) {
        dotRef.current?.classList.add("is-hover")
        glowRef.current?.classList.add("is-hover")
      } else {
        dotRef.current?.classList.remove("is-hover")
        glowRef.current?.classList.remove("is-hover")
      }
    }
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseover", onOver)

    let frame
    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.32
      current.current.y += (target.current.y - current.current.y) * 0.32
      glowPos.current.x += (target.current.x - glowPos.current.x) * 0.12
      glowPos.current.y += (target.current.y - glowPos.current.y) * 0.12
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowPos.current.x}px, ${glowPos.current.y}px, 0) translate(-50%, -50%)`
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseover", onOver)
      cancelAnimationFrame(frame)
      document.documentElement.classList.remove("has-custom-cursor")
    }
  }, [])

  if (!supported) return null
  return (
    <>
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  )
}

/* ---------- Scroll progress bar ---------- */
function ScrollProgress() {
  const ref = useRef(null)
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      const p = max > 0 ? doc.scrollTop / max : 0
      if (ref.current) ref.current.style.transform = `scaleX(${p})`
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])
  return <div ref={ref} className="scroll-progress w-full" aria-hidden="true" />
}

/* ---------- Magnetic wrapper ---------- */
function Magnetic({ children, strength = 0.35, className = "" }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(hover: none)").matches) return
    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - (rect.left + rect.width / 2)
      const y = e.clientY - (rect.top + rect.height / 2)
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
    }
    const onLeave = () => { el.style.transform = "translate(0, 0)" }
    el.addEventListener("mousemove", onMove)
    el.addEventListener("mouseleave", onLeave)
    return () => {
      el.removeEventListener("mousemove", onMove)
      el.removeEventListener("mouseleave", onLeave)
    }
  }, [strength])
  return (
    <span ref={ref} className={`magnetic ${className}`}>
      {children}
    </span>
  )
}

/* ---------- Spotlight wrapper (light follows pointer) ---------- */
function Spotlight({ children, className = "" }) {
  const ref = useRef(null)
  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`)
    el.style.setProperty("--my", `${e.clientY - rect.top}px`)
  }
  return (
    <div ref={ref} onMouseMove={onMove} className={`spotlight ${className}`}>
      {children}
    </div>
  )
}

/* ---------- Monogram (custom brand mark) ---------- */
function Monogram({ size = 28, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="vp-mono" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.5 0.15 162.4)" />
          <stop offset="100%" stopColor="oklch(0.7 0.18 200)" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="38" height="38" rx="10" fill="url(#vp-mono)" />
      <path
        d="M11 12 L20 28 L29 12"
        fill="none"
        stroke="white"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="32" r="1.6" fill="white" />
    </svg>
  )
}

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
    const rx = (py - 0.5) * -6
    const ry = (px - 0.5) * 8
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`
  }
  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)"
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

/* ---------- Parallax wrapper (scroll-driven) ---------- */
function Parallax({ speed = 0.08, className = "", children }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let frame
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed
        el.style.transform = `translate3d(0, ${offset * -1}px, 0)`
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(frame)
    }
  }, [speed])
  return (
    <div ref={ref} className={`parallax ${className}`}>
      {children}
    </div>
  )
}

/* ---------- Section header ---------- */
function SectionEyebrow({ index, children }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <span className="eyebrow text-primary">{index}</span>
      <span className="h-px w-10 bg-primary/40" />
      <span className="eyebrow text-muted-foreground">{children}</span>
    </div>
  )
}

/* ---------- Status indicator pill ---------- */
function StatusBadge({ label = "Open to opportunities" }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1 backdrop-blur">
      <span className="status-dot" aria-hidden="true" />
      <span className="eyebrow !text-[0.62rem] !tracking-[0.2em] text-foreground/80">
        {label}
      </span>
    </span>
  )
}

/* ---------- Floating tech chip ---------- */
function TechChip({ icon: Icon, label }) {
  return (
    <span className="chip-float inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/70 px-3 py-1.5 text-xs font-medium text-foreground/80 backdrop-blur transition hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary">
      <Icon className="h-3.5 w-3.5 text-primary" />
      {label}
    </span>
  )
}

/* ---------- About / hero page ---------- */
function AboutPage() {
  return (
    <section className="page-enter section-stack pt-8 pb-16">
      {/* HERO */}
      <div className="glass glow-ring relative overflow-hidden rounded-3xl">
        <div className="blob-drift pointer-events-none absolute -left-24 top-12 h-64 w-64 rounded-full bg-primary/25 blur-3xl" />
        <div className="blob-drift-slow pointer-events-none absolute -right-16 -bottom-16 h-72 w-72 rounded-full bg-accent/25 blur-3xl" />

        <div className="grid grid-cols-1 items-center gap-12 px-8 py-12 md:grid-cols-[1.1fr_0.9fr] md:px-14 md:py-16">
          <div>
            <Reveal>
              <StatusBadge label="Open to opportunities · Portfolio 2026" />
            </Reveal>

            <Reveal delay={70}>
              <p className="mt-5 font-mono text-xs uppercase tracking-[0.22em] text-primary/80">
                Hi, I&apos;m Vincent Paul — full-stack &amp; design eng.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <h1 className="mt-3 text-balance text-4xl font-extrabold leading-[1.02] tracking-tight md:text-[4.25rem]">
                Building digital
                <br />
                <span className="font-serif-display font-medium text-foreground">
                  products
                </span>{" "}
                that{" "}
                <span className="gradient-text">
                  <Typewriter
                    words={["build trust.", "feel calm.", "ship fast.", "scale well."]}
                  />
                </span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                I design thoughtful frontends, wire reliable backends, and ship products that are easy to use — with a soft spot for{" "}
                <span className="font-medium text-foreground">healthcare and service teams</span> who deserve calmer software.
              </p>
            </Reveal>

            {/* Floating tech chips */}
            <Reveal delay={260}>
              <div className="mt-7 flex flex-wrap gap-2">
                {heroChips.map((c) => (
                  <TechChip key={c.label} icon={c.icon} label={c.label} />
                ))}
              </div>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Magnetic strength={0.22}>
                  <Button asChild className="shine-on-hover group h-12 rounded-full px-7 font-semibold transition-transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30">
                    <NavLink to="/works">
                      View My Work
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </NavLink>
                  </Button>
                </Magnetic>
                <Magnetic strength={0.18}>
                  <Button
                    asChild
                    variant="outline"
                    className="h-12 rounded-full border-border/70 px-6 font-medium backdrop-blur transition hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary"
                  >
                      <a href="/r/Resume_Vincent_Paul_Dumangcas.docx" download="Resume_Vincent_Paul_Dumangcas.docx">
                        <Download className="h-4 w-4" />
                        Download Resume
                      </a>
                  </Button>
                </Magnetic>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border/60 pt-6">
                {stats.map((s) => (
                  <div key={s.label} className="group text-center">
                    <div className="text-2xl font-bold tracking-tight transition-colors group-hover:text-primary md:text-3xl">
                      <Counter to={s.value} suffix={s.suffix} />
                    </div>
                    <div className="mt-1 eyebrow text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={140} className="relative mx-auto w-full max-w-[420px]">
            <Parallax speed={0.05}>
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary/35 via-accent/20 to-transparent blur-2xl" />
              <div className="float-soft glow-ring relative overflow-hidden rounded-[2rem] border bg-background/80 p-3 shadow-xl depth-hover">
                <img
                  src="/profile-photo.jpg"
                  alt="Portrait of Vincent Paul Dumangcas"
                  loading="eager"
                  fetchPriority="high"
                  width="420"
                  height="420"
                  className="h-[420px] w-full rounded-[1.6rem] object-cover transition-transform duration-700 hover:scale-[1.04]"
                />
                <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-border/60 bg-background/85 px-3 py-1.5 backdrop-blur">
                  <Monogram size={18} />
                  <span className="eyebrow text-foreground/80">VP · est. 2022</span>
                </div>
                <div className="absolute right-5 top-5">
                  <StatusBadge label="Available" />
                </div>
              </div>
            </Parallax>
          </Reveal>
        </div>
      </div>

      {/* THE STORY */}
      <div>
        <Reveal>
          <SectionEyebrow index="01">The short version</SectionEyebrow>
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
            From{" "}
            <span className="font-serif-display font-medium">tutorial tabs</span>{" "}
            to{" "}
            <span className="brand-underline">
              <span className="font-serif-display font-medium">production</span>
            </span>{" "}
            tickets.
          </h2>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            I started by copying snippets, broke a few things in public, and slowly learned what
            actually matters: small commits, honest error messages, and interfaces that respect
            the person on the other side of the screen.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {journey.map((step, i) => (
            <Reveal key={step.title} delay={i * 90}>
              <Spotlight className="rounded-2xl h-full">
                <div className="glass case-card depth-hover group h-full rounded-2xl p-6">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/12 text-primary transition group-hover:scale-105">
                      <step.icon className="h-5 w-5" />
                    </span>
                    <span className="kpi-pill">{step.period}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.detail}</p>
                </div>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </div>

      {/* SPECIALTIES */}
      <div>
        <Reveal>
          <SectionEyebrow index="02">What I&apos;m into</SectionEyebrow>
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Specialties &amp;{" "}
            <span className="font-serif-display font-medium">soft preferences</span>.
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {specialties.map((s, i) => (
            <Reveal key={s.title} delay={i * 90}>
              <Spotlight className="rounded-2xl h-full">
                <div className="glass case-card group h-full rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary transition group-hover:rotate-6 group-hover:bg-primary/20">
                      <s.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold tracking-tight transition-colors group-hover:text-primary">{s.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.detail}</p>
                    </div>
                  </div>
                </div>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </div>

      {/* TOOLCHAIN MARQUEE */}
      <Reveal>
        <SectionEyebrow index="03">Toolchain</SectionEyebrow>
        <div className="marquee-mask relative overflow-hidden">
          <div className="marquee-track flex w-max gap-3">
            {[...stack, ...stack].map((s, i) => (
              <span
                key={`${s}-${i}`}
                className="rounded-full border border-border/70 bg-card/60 px-4 py-2 font-mono text-xs uppercase tracking-wider text-muted-foreground transition hover:border-primary/60 hover:text-foreground"
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

/* ---------- Works page (case studies) ---------- */
function WorksPage() {
  return (
    <section className="page-enter pt-8 pb-16">
      <Reveal className="mb-12">
        <SectionEyebrow index="02">Selected case studies</SectionEyebrow>
        <h2 className="text-balance text-3xl font-bold tracking-tight md:text-5xl">
          A few things I&apos;ve{" "}
          <span className="brand-underline">
            <span className="font-serif-display font-medium">shipped</span>
          </span>{" "}
          recently.
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground leading-relaxed">
          Short write-ups: what the problem was, what I built, what I&apos;d do differently. No marketing fluff.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-8">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={i * 100}>
            <Spotlight className="rounded-3xl">
              <article className="glass case-card group glow-ring rounded-3xl">
                <div className="grid grid-cols-1 gap-0 md:grid-cols-[1.05fr_1fr]">
                  {/* Visual / mock panel */}
                  <div className="relative overflow-hidden rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent" />
                    <div className="blob-drift absolute -left-8 -top-8 h-40 w-40 rounded-full bg-primary/30 blur-3xl" />
                    <div className="blob-drift-slow absolute -right-6 -bottom-6 h-36 w-36 rounded-full bg-accent/25 blur-3xl" />

                    <div className="relative flex h-full min-h-[260px] flex-col justify-between p-7">
                      <div className="flex items-center justify-between">
                        <span className="kpi-pill">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {project.type}
                        </span>
                        <span className="font-mono text-[0.7rem] tracking-wider text-muted-foreground">
                          {project.year}
                        </span>
                      </div>

                      <div className="mt-8">
                        <div className="font-serif-display text-2xl text-foreground/85 md:text-3xl">
                          “{project.tagline}”
                        </div>
                        <div className="mt-6 flex flex-wrap gap-2">
                          {project.tech.map((t) => (
                            <Badge
                              key={t}
                              variant="outline"
                              className="rounded-full border-border/70 bg-background/60 font-mono text-[0.68rem] tracking-wide backdrop-blur transition hover:border-primary hover:bg-primary/10 hover:text-primary"
                            >
                              {t}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content panel */}
                  <div className="p-7 md:p-9">
                    <h3 className="text-2xl font-bold tracking-tight transition-colors group-hover:text-primary md:text-3xl">
                      {project.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>

                    <div className="mt-6 grid grid-cols-1 gap-5">
                      <div>
                        <div className="eyebrow mb-1.5 text-primary/80">Problem</div>
                        <p className="text-sm leading-relaxed text-foreground/80">{project.problem}</p>
                      </div>

                      <div>
                        <div className="eyebrow mb-1.5 text-primary/80">Key features</div>
                        <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                          {project.features.map((f) => (
                            <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                          <div className="eyebrow mb-1.5 text-primary/80">Challenge</div>
                          <p className="text-sm leading-relaxed text-foreground/80">{project.challenges}</p>
                        </div>
                        <div>
                          <div className="eyebrow mb-1.5 text-primary/80">Impact</div>
                          <p className="text-sm leading-relaxed text-foreground/80">{project.impact}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-7 flex flex-wrap gap-3">
                      <Magnetic strength={0.18}>
                        <Button asChild className="shine-on-hover group/btn rounded-full">
                          <a href={project.link} target="_blank" rel="noopener noreferrer">
                            {project.type === "Live Product" ? "Visit Site" : "View Project"}
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                          </a>
                        </Button>
                      </Magnetic>
                      {project.github && (
                        <Button
                          asChild
                          variant="outline"
                          className="rounded-full border-border/70 backdrop-blur transition hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary"
                        >
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                            Source
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            </Spotlight>
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
      <Reveal className="mb-10">
        <SectionEyebrow index="03">What I do</SectionEyebrow>
        <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tight md:text-5xl">
          <Sparkles className="h-7 w-7 text-primary" />
          <span>
            <span className="font-serif-display font-medium">Services</span> &amp; craft
          </span>
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground leading-relaxed">
          Engagements I take on — usually small, focused, and time-boxed. I prefer doing a few
          things well over doing many things at all.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {services.map((service, i) => (
          <Reveal key={service.title} delay={i * 100}>
            <Spotlight className="rounded-3xl">
              <Card className="glass case-card group relative h-full overflow-hidden rounded-3xl border-border/70 transition-colors hover:border-primary/50">
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <CardHeader>
                  <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-primary/25">
                    <service.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl transition-colors group-hover:text-primary">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            </Spotlight>
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
      <Reveal className="mb-10">
        <SectionEyebrow index="04">Get in touch</SectionEyebrow>
        <h2 className="text-balance text-3xl font-bold tracking-tight md:text-5xl">
          Let&apos;s{" "}
          <span className="brand-underline">
            <span className="font-serif-display font-medium">build</span>
          </span>{" "}
          something useful.
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground leading-relaxed">
          Tell me what you&apos;re working on. Replies usually within 24 hours, in the same week at worst.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <Spotlight className="rounded-3xl">
            <Card className="glass case-card rounded-3xl">
              <CardHeader>
                <CardTitle className="text-balance text-2xl md:text-3xl">
                  Direct &amp;{" "}
                  <span className="font-serif-display font-medium">honest</span>{" "}
                  channels
                </CardTitle>
                <CardDescription className="leading-relaxed">
                  Email is best for a brief. LinkedIn for everything else.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
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
                <a
                  className="group flex items-center gap-3 rounded-xl p-2 text-muted-foreground transition hover:bg-primary/10 hover:text-foreground"
                  href="https://github.com/VincentPaul434"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary transition group-hover:rotate-6">
                    <Github className="h-4 w-4" />
                  </span>
                  GitHub @VincentPaul434
                </a>

                <div className="mt-2 flex items-center gap-2 rounded-xl border border-border/60 bg-background/60 p-3">
                  <span className="status-dot" aria-hidden="true" />
                  <span className="text-xs text-muted-foreground">
                    Currently <span className="font-medium text-foreground">open</span> to part-time or contract work.
                  </span>
                </div>
              </CardContent>
            </Card>
          </Spotlight>
        </Reveal>

        <Reveal delay={120}>
          <Card className="glass case-card rounded-3xl border-border/70">
            <CardContent className="p-6 md:p-8">
              <form className="space-y-5" name="contact" method="post" data-netlify="true">
                <input type="hidden" name="form-name" value="contact" />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Input name="name" placeholder="Your name" required className="h-11 rounded-xl transition focus-visible:ring-2 focus-visible:ring-primary/50" />
                  <Input name="email" type="email" placeholder="Email address" required className="h-11 rounded-xl transition focus-visible:ring-2 focus-visible:ring-primary/50" />
                </div>
                <Input name="subject" placeholder="Project subject" required className="h-11 rounded-xl transition focus-visible:ring-2 focus-visible:ring-primary/50" />
                <Textarea name="message" rows={6} placeholder="A few sentences on what you're building." required className="rounded-xl transition focus-visible:ring-2 focus-visible:ring-primary/50" />
                <Magnetic strength={0.15}>
                  <Button type="submit" className="shine-on-hover h-11 w-full rounded-xl font-semibold transition-transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30">
                    Send Message
                  </Button>
                </Magnetic>
              </form>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- Footer ---------- */
function SiteFooter() {
  return (
    <footer className="relative mt-6 overflow-hidden rounded-3xl border border-border/60 bg-card/50 px-7 py-10 backdrop-blur md:px-10">
      <div className="blob-drift pointer-events-none absolute -left-16 -top-16 h-44 w-44 rounded-full bg-primary/15 blur-3xl" />
      <div className="blob-drift-slow pointer-events-none absolute -right-16 -bottom-16 h-52 w-52 rounded-full bg-accent/15 blur-3xl" />

      <div className="relative grid grid-cols-1 gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <Monogram size={26} />
            <div className="flex flex-col leading-none">
              <span className="text-sm font-semibold">Vincent Paul Dumangcas</span>
              <span className="eyebrow !text-[0.6rem] !tracking-[0.22em] text-muted-foreground">
                Full-stack · Design eng.
              </span>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Calm, modern web products. Available for select part-time and contract engagements through 2026.
          </p>
          <div className="mt-5">
            <StatusBadge label="Open to opportunities" />
          </div>
        </div>

        <div>
          <div className="eyebrow mb-3 text-muted-foreground">Sitemap</div>
          <ul className="space-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className="text-foreground/80 transition hover:text-primary"
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="eyebrow mb-3 text-muted-foreground">Elsewhere</div>
          <ul className="space-y-2 text-sm">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group inline-flex items-center gap-2 text-foreground/80 transition hover:text-primary"
                >
                  <s.icon className="h-4 w-4 transition group-hover:rotate-6" />
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/resume.pdf"
                download
                className="group inline-flex items-center gap-2 text-foreground/80 transition hover:text-primary"
              >
                <Download className="h-4 w-4 transition group-hover:translate-y-0.5" />
                Resume (PDF)
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative mt-10 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 text-xs sm:flex-row sm:items-center">
        <span className="font-mono text-muted-foreground">
          © {new Date().getFullYear()} Vincent Paul Dumangcas · Built with React + Tailwind
        </span>
        <span className="eyebrow text-muted-foreground">Crafted in PH · v2026</span>
      </div>
    </footer>
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

  // Reset scroll on route change so case studies start at the top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" })
  }, [location.pathname])

  const particleColors = useMemo(
    () => (isDark ? ["#34d399", "#a7f3d0", "#10b981"] : ["#10b981", "#34d399", "#6ee7b7"]),
    [isDark],
  )

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Subtle grid backdrop */}
      <div className="mesh-grid" aria-hidden="true" />

      {/* Animated background layers */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="blob-drift absolute -left-24 -top-16 h-80 w-80 rounded-full bg-primary/25 blur-3xl" />
        <div className="blob-drift-slow absolute right-0 top-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="blob-drift absolute bottom-0 left-1/2 h-64 w-[34rem] -translate-x-1/2 rounded-full bg-muted/70 blur-3xl" />
      </div>

      {/* Particle field */}
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-60">
        <Particles
          particleCount={120}
          particleSpread={12}
          speed={0.08}
          particleColors={particleColors}
          alphaParticles
          particleBaseSize={90}
          sizeRandomness={1}
          cameraDistance={22}
        />
      </div>

      {/* Noise overlay (on top of background, under content) */}
      <div className="noise-layer" aria-hidden="true" />

      {/* Scroll progress + custom cursor */}
      <ScrollProgress />
      <CustomCursor />

      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/60 backdrop-blur-xl">
        <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-6">
          <NavLink to="/about" className="group flex items-center gap-2.5 font-bold tracking-tight">
            <Monogram size={28} className="transition-transform duration-500 group-hover:rotate-[12deg]" />
            <span className="flex flex-col leading-none">
              <span className="text-[15px] transition-colors group-hover:text-primary">Vincent Paul Dumangcas</span>
              <span className="eyebrow !text-[0.6rem] !tracking-[0.22em] text-muted-foreground">
                Full-stack · Design eng.
              </span>
            </span>
          </NavLink>

          <nav className="hidden items-center gap-1 rounded-full border border-border/70 bg-card/60 p-1 backdrop-blur md:flex" aria-label="Primary">
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
            <Magnetic strength={0.2} className="hidden md:inline-block">
              <Button
                variant="outline"
                className="shine-on-hover rounded-full border-border/70 transition-transform hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary"
                asChild
              >
                <a href="/resume.pdf" download>
                  <Download className="h-4 w-4" />
                  Resume
                </a>
              </Button>
            </Magnetic>
          </div>
        </div>

        <div className="border-t border-border/50 px-4 py-2 md:hidden">
          <nav className="mx-auto flex w-full max-w-6xl gap-2 overflow-x-auto" aria-label="Mobile primary">
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

      <main key={location.pathname} className="relative z-[2] mx-auto w-full max-w-6xl px-6">
        <Routes location={location}>
          <Route path="/" element={<Navigate to="/about" replace />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/works" element={<WorksPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/about" replace />} />
        </Routes>

        <div className="section-rule my-10" aria-hidden="true" />

        <SiteFooter />

        <div className="pb-10" />
      </main>
    </div>
  )
}

export default App
