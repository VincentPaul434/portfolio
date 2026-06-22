/*
 * ─────────────────────────────────────────────────────────────────────────
 *  CO-STAR design brief for this portfolio
 * ─────────────────────────────────────────────────────────────────────────
 *  Context    A CIT-U Information Technology student / junior full-stack dev
 *             in Cebu, PH. Limited but real shipping experience.
 *  Objective  Earn an internship, junior role, or small contract by reading
 *             as credible and human — not as a generated template.
 *  Style      Dark technical. Charcoal canvas, one amber accent, monospace
 *             detailing, code-as-content. Opinionated, not decorative.
 *  Tone       Honest and plainspoken, first person. No invented metrics.
 *  Audience   Recruiters, hiring managers, and small-business clients.
 *  Response   A single dark page that reads like an engineer's tool.
 * ─────────────────────────────────────────────────────────────────────────
 */

import { useEffect, useRef } from "react"
import { NavLink, Navigate, Route, Routes, useLocation } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DarkVeil from "@/components/ui/DarkVeil"
import { Input } from "@/components/ui/input"
import SplitText from "@/components/ui/SplitText"
import SpotlightCard from "@/components/ui/SpotlightCard"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Download,
  Github,
  Globe,
  GraduationCap,
  Layers,
  Lightbulb,
  Linkedin,
  Mail,
  MapPin,
  Server,
  Target,
  Wrench,
} from "lucide-react"

const navItems = [
  { label: "about", to: "/about" },
  { label: "works", to: "/works" },
  { label: "services", to: "/services" },
  { label: "contact", to: "/contact" },
]

const projects = [
  {
    id: "01",
    title: "CIT NurseTracer",
    description:
      "A web app that helps a nursing team see who is assigned where, so shift handoffs don't depend on a whiteboard and a group chat.",
    problem:
      "Assignments were tracked informally, which made it easy to lose track of who was covering which ward during a handoff.",
    features: [
      "Shift and ward assignment views",
      "Login with role-based access",
      "Activity log you can search by time",
      "Layout that works on a phone at the bedside",
    ],
    learned:
      "Most of the work was in the small stuff — clear labels, sensible defaults, and not making the user think twice about a tap.",
    tech: ["react", "tailwind", "vercel"],
    link: "https://citnursetracer.vercel.app/",
    type: "live",
    year: "2025",
  },
  {
    id: "02",
    title: "Synapse UI",
    description:
      "A small React component kit I help maintain — a handful of reusable pieces I reach for instead of restyling buttons and inputs on every new project.",
    problem:
      "Starting each project from scratch meant rebuilding the same components, slightly differently, every time.",
    features: [
      "Composable components with sane defaults",
      "Keyboard-friendly focus states",
      "Theming through CSS variables",
      "Copy-paste usage examples",
    ],
    learned:
      "Picking a strong default is harder than adding another prop. Every option you expose is something you have to support later.",
    tech: ["react", "tailwind", "components"],
    link: "https://github.com/princeprog/synapse-ui",
    github: "https://github.com/princeprog/synapse-ui",
    type: "open source",
    year: "2025",
  },
  {
    id: "03",
    title: "Poultry Prophet",
    description:
      "A full-stack tool for game fowl breeding operations — it tracks each bird through its brooding and ranging phases and scores how ready it is, so the month-5 selection isn't down to a gut call.",
    problem:
      "Breeders tracked health and development by hand, which made the month-5 advancement decision inconsistent and hard to justify after the fact.",
    features: [
      "Daily and weekly health records per batch and per bird",
      "Computed indicators (BHI, BSI, WFR) with threshold alerts",
      "Readiness scoring that ranks birds with a sub-score breakdown",
      "Real-time updates over WebSocket and PDF/CSV exports",
      "Login with manager and handler roles",
    ],
    learned:
      "Splitting a real app into a typed front end and a Spring Boot API — and keeping the scoring logic on the server where it's testable — made the whole thing easier to reason about.",
    tech: ["next.js", "react", "spring boot", "postgres"],
    link: "https://github.com/VincentPaul434/poultry-prophet-frontend",
    github: "https://github.com/VincentPaul434/poultry-prophet-backend",
    type: "open source",
    year: "2025",
  },
]

const stack = [
  "react", "javascript", "spring boot", "java", "mysql",
  "tailwind", "node.js", "git", "vite", "figma",
]

const facts = [
  { value: "02", label: "deployed" },
  { value: "2021", label: "at cit-u since" },
  { value: "<24h", label: "reply time" },
]

const journey = [
  {
    icon: GraduationCap,
    period: "2021",
    title: "Started IT at CIT-U",
    detail:
      "Enrolled in Information Technology at Cebu Institute of Technology — University. Learned the fundamentals and kept building past the coursework.",
  },
  {
    icon: Code2,
    period: "2025",
    title: "Shipped MediFlow",
    detail:
      "Built a full-stack project (Feb–May 2025): React + Tailwind on the front end, Spring Boot and MySQL behind it, with login and role-based access.",
  },
  {
    icon: Server,
    period: "now",
    title: "Looking for the next step",
    detail:
      "Open to an internship or junior role. I'd rather work on something real with people who'll tell me when I'm wrong.",
  },
]

const specialties = [
  {
    icon: Layers,
    title: "Front-end with React",
    detail:
      "Building pages and components that hold up on different screens, and that other people can read in code.",
  },
  {
    icon: Server,
    title: "Spring Boot APIs",
    detail:
      "REST endpoints with a clear data model, login, and role-based access — using MySQL underneath.",
  },
  {
    icon: Lightbulb,
    title: "Figuring things out",
    detail:
      "I'm comfortable reading docs, tracing a bug, and asking the right question instead of guessing.",
  },
  {
    icon: Target,
    title: "Finishing things",
    detail:
      "Small commits, working builds, and getting something deployed rather than perfect-but-unshipped.",
  },
]

const socials = [
  { href: "https://github.com/VincentPaul434", label: "github", icon: Github },
  { href: "https://www.linkedin.com/in/vincent-paul-dumangcas-74063a365/", label: "linkedin", icon: Linkedin },
  { href: "mailto:dumangcasvincentpaul@gmail.com", label: "email", icon: Mail },
]

/* ---------- Scroll progress (amber) ---------- */
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

/* ---------- Logo mark: a prompt in a box ---------- */
function PromptMark({ className = "" }) {
  return (
    <span
      className={`inline-flex h-7 w-7 items-center justify-center border border-border bg-card font-mono text-sm font-semibold text-primary ${className}`}
      aria-hidden="true"
    >
      {">"}
    </span>
  )
}

/* ---------- Section marker  // 01 · label ---------- */
function SectionMarker({ index, children }) {
  return (
    <div className="section-marker mb-4">
      <span className="t-punc">// </span>
      <span className="text-primary">{index}</span>
      <span className="t-punc"> · </span>
      <span className="text-muted-foreground">{children}</span>
    </div>
  )
}

/* ---------- Terminal window chrome ---------- */
function TermWindow({ title, children, className = "" }) {
  return (
    <div className={`term ${className}`}>
      <div className="term-bar">
        <span className="term-dot" style={{ background: "#f0506e" }} />
        <span className="term-dot" style={{ background: "#ffb020" }} />
        <span className="term-dot" style={{ background: "#3fb950" }} />
        <span className="term-title">{title}</span>
      </div>
      <div className="term-body">{children}</div>
    </div>
  )
}

/* ---------- About / hero page ---------- */
function AboutPage() {
  return (
    <section className="page-enter section-stack pt-8 pb-16">
      {/* HERO */}
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <span className="status-dot" aria-hidden="true" />
              open to internships &amp; junior roles
            </span>
          </Reveal>

          <Reveal delay={90}>
            <SplitText
              as="h1"
              delay={0}
              stagger={38}
              className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight md:text-[3.25rem]"
              text="I build web apps from the database to the browser."
            />
          </Reveal>

          <Reveal delay={170}>
            <p className="mt-6 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              I&apos;m an IT student at CIT-U in Cebu. Mostly React on the front end,
              Spring Boot and MySQL behind it. I&apos;ve shipped a couple of real projects
              and I&apos;m looking for a role where I can keep learning from people who
              build things properly.
            </p>
          </Reveal>

          <Reveal delay={230}>
            <div className="mt-6 flex items-center gap-2 font-mono text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              Cebu, Philippines
            </div>
          </Reveal>

          <Reveal delay={290}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild className="group h-11 rounded-md px-6 font-mono text-sm font-medium">
                <NavLink to="/works">
                  see my work
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </NavLink>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-11 rounded-md border-border px-6 font-mono text-sm transition hover:border-primary/60 hover:text-primary"
              >
                <a href="/r/Resume_Vincent_Paul_Dumangcas.docx" download="Resume_Vincent_Paul_Dumangcas.docx">
                  <Download className="h-4 w-4" />
                  résumé
                </a>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={360}>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-6 font-mono text-sm">
              {facts.map((f, i) => (
                <div key={f.label} className="flex items-center gap-3">
                  {i > 0 && <span className="t-punc">·</span>}
                  <span>
                    <span className="text-primary">{f.value}</span>{" "}
                    <span className="text-muted-foreground">{f.label}</span>
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Code-block hero */}
        <Reveal delay={140}>
          <div className="hero-veil-shell">
            <div className="hero-veil-layer" aria-hidden="true">
              <DarkVeil
                hueShift={-34}
                noiseIntensity={0.02}
                scanlineIntensity={0.1}
                speed={0.3}
                scanlineFrequency={1.6}
                warpAmount={0.35}
                resolutionScale={1}
              />
            </div>
            <div className="hero-veil-tint" aria-hidden="true" />
            <TermWindow title="~/vincent — zsh" className="hero-term-window">
              <pre className="whitespace-pre">
                <code>
                  <span className="t-kw">const</span> <span className="t-var">vincent</span> <span className="t-punc">= {"{"}</span>{"\n"}
                  {"  "}<span className="t-key">role</span><span className="t-punc">:</span>     <span className="t-str">&quot;full-stack developer&quot;</span><span className="t-punc">,</span>{"\n"}
                  {"  "}<span className="t-key">studies</span><span className="t-punc">:</span>  <span className="t-str">&quot;BS Information Tech, CIT-U&quot;</span><span className="t-punc">,</span>{"\n"}
                  {"  "}<span className="t-key">stack</span><span className="t-punc">:</span>    <span className="t-punc">[</span><span className="t-str">&quot;react&quot;</span><span className="t-punc">,</span> <span className="t-str">&quot;spring&quot;</span><span className="t-punc">,</span> <span className="t-str">&quot;mysql&quot;</span><span className="t-punc">]</span><span className="t-punc">,</span>{"\n"}
                  {"  "}<span className="t-key">location</span><span className="t-punc">:</span> <span className="t-str">&quot;Cebu, PH&quot;</span><span className="t-punc">,</span>{"\n"}
                  {"  "}<span className="t-key">status</span><span className="t-punc">:</span>   <span className="t-str">&quot;open to work&quot;</span><span className="t-punc">,</span>{"\n"}
                  <span className="t-punc">{"}"}</span>
                </code>
              </pre>
            </TermWindow>
          </div>
        </Reveal>
      </div>

      {/* BACKGROUND */}
      <div>
        <Reveal>
          <SectionMarker index="01">background</SectionMarker>
          <h2 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">
            How I got here.
          </h2>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            I started where most people do — tutorials and broken builds. Over a few years
            it turned into shipping real things: handling logins, modeling data, and getting
            a project actually deployed instead of leaving it on my laptop.
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {journey.map((step, i) => (
            <Reveal key={step.title} delay={i * 80}>
              <div className="panel panel-hover h-full p-5">
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-9 w-9 items-center justify-center border border-border bg-secondary text-primary">
                    <step.icon className="h-4 w-4" />
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">{step.period}</span>
                </div>
                <h3 className="mt-4 font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* SPECIALTIES */}
      <div>
        <Reveal>
          <SectionMarker index="02">what i&apos;m good at</SectionMarker>
          <h2 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">
            Where I&apos;m useful right now.
          </h2>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {specialties.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <div className="panel panel-hover h-full p-5">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-border bg-secondary text-primary">
                    <s.icon className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="font-semibold tracking-tight">{s.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.detail}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* TOOLCHAIN */}
      <Reveal>
        <SectionMarker index="03">tools i reach for</SectionMarker>
        <div className="flex flex-wrap gap-2">
          {stack.map((s) => (
            <span
              key={s}
              className="border border-border bg-card px-3 py-1.5 font-mono text-xs text-muted-foreground transition hover:border-primary/60 hover:text-foreground"
            >
              {s}
            </span>
          ))}
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
        <SectionMarker index="01">selected work</SectionMarker>
        <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
          Three projects, honestly written up.
        </h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          What the problem was, what I built, and what I took away. One&apos;s deployed,
          one&apos;s open source.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-6">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={i * 90}>
            <SpotlightCard className="spotlight-project">
              <article className="panel panel-hover spotlight-project-panel overflow-hidden">
              {/* title bar */}
              <div className="flex items-center justify-between border-b border-border bg-secondary/40 px-5 py-3">
                <div className="flex items-center gap-3 font-mono text-sm">
                  <span className="text-primary">[{project.id}]</span>
                  <span className="font-semibold tracking-tight">{project.title}</span>
                </div>
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: project.type === "live" ? "var(--status)" : "var(--primary)" }}
                  />
                  {project.type} · {project.year}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-0 md:grid-cols-[1fr_1.1fr]">
                <div className="border-b border-border p-6 md:border-b-0 md:border-r">
                  <p className="leading-relaxed text-muted-foreground">{project.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <Badge
                        key={t}
                        variant="outline"
                        className="rounded-none border-border bg-background/40 font-mono text-[0.68rem] font-normal"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <Button asChild className="group/btn rounded-md font-mono text-sm">
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        {project.type === "live" ? "visit site" : "view project"}
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </a>
                    </Button>
                    {project.github && (
                      <Button
                        asChild
                        variant="outline"
                        className="rounded-md border-border font-mono text-sm transition hover:border-primary/60 hover:text-primary"
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                          source
                        </a>
                      </Button>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-5">
                    <div>
                      <div className="eyebrow mb-1.5 text-primary">// the problem</div>
                      <p className="text-sm leading-relaxed text-foreground/80">{project.problem}</p>
                    </div>
                    <div>
                      <div className="eyebrow mb-1.5 text-primary">// what it does</div>
                      <ul className="space-y-1.5">
                        {project.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="eyebrow mb-1.5 text-primary">// what i took away</div>
                      <p className="text-sm leading-relaxed text-foreground/80">{project.learned}</p>
                    </div>
                  </div>
                </div>
              </div>
              </article>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ---------- Services page ---------- */
function ServicesPage() {
  const services = [
    {
      icon: Globe,
      title: "Building a small web app",
      description: "A focused React front end for a school project, a tool, or a small business idea.",
    },
    {
      icon: Code2,
      title: "Front end + a simple API",
      description: "React paired with a Spring Boot or Node API and a MySQL database, with login if you need it.",
    },
    {
      icon: Layers,
      title: "Reusable components",
      description: "Cleaning up an interface into components you can reuse, so the next page is faster to build.",
    },
    {
      icon: Wrench,
      title: "Fixing and finishing",
      description: "Picking up a half-done project, sorting out bugs, and getting it to a state you can ship.",
    },
  ]

  return (
    <section className="page-enter pt-8 pb-16">
      <Reveal className="mb-8">
        <SectionMarker index="01">what i can help with</SectionMarker>
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Work I&apos;m happy to take on.
        </h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          I&apos;m a student, so I keep things small and realistic — usually one clear goal at a time.
          If it&apos;s out of my depth, I&apos;ll tell you.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {services.map((service, i) => (
          <Reveal key={service.title} delay={i * 90}>
            <Card className="panel panel-hover h-full rounded-md border-0">
              <CardHeader>
                <div className="mb-2 inline-flex h-10 w-10 items-center justify-center border border-border bg-secondary">
                  <service.icon className="h-4 w-4 text-primary" />
                </div>
                <CardTitle className="text-lg">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-muted-foreground">{service.description}</p>
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
      <Reveal className="mb-8">
        <SectionMarker index="01">get in touch</SectionMarker>
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Want to talk? Email is best.
        </h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          Tell me what you&apos;re working on or what role you&apos;re hiring for. I usually reply
          within a day.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <Card className="panel h-full rounded-md border-0">
            <CardHeader>
              <CardTitle className="text-xl">Where to reach me</CardTitle>
              <CardDescription className="leading-relaxed">
                Email for anything specific. LinkedIn works too.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 font-mono text-sm">
              <a
                className="group flex items-center gap-3 rounded-md p-2 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                href="mailto:dumangcasvincentpaul@gmail.com"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center border border-border bg-secondary text-primary">
                  <Mail className="h-4 w-4" />
                </span>
                dumangcasvincentpaul@gmail.com
              </a>
              <a
                className="group flex items-center gap-3 rounded-md p-2 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                href="https://www.linkedin.com/in/vincent-paul-dumangcas-74063a365/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center border border-border bg-secondary text-primary">
                  <Linkedin className="h-4 w-4" />
                </span>
                linkedin profile
              </a>
              <a
                className="group flex items-center gap-3 rounded-md p-2 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                href="https://github.com/VincentPaul434"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center border border-border bg-secondary text-primary">
                  <Github className="h-4 w-4" />
                </span>
                github @VincentPaul434
              </a>

              <div className="mt-2 flex items-center gap-2 border border-border bg-secondary/50 p-3">
                <span className="status-dot" aria-hidden="true" />
                <span className="text-xs text-muted-foreground">
                  currently <span className="text-foreground">open</span> to internships &amp; part-time work
                </span>
              </div>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={120}>
          <Card className="panel rounded-md border-0">
            <CardContent className="p-6 md:p-8">
              <form className="space-y-4" name="contact" method="post" data-netlify="true">
                <input type="hidden" name="form-name" value="contact" />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Input name="name" placeholder="your name" required className="h-11 rounded-md font-mono text-sm focus-visible:ring-2 focus-visible:ring-primary/50" />
                  <Input name="email" type="email" placeholder="email address" required className="h-11 rounded-md font-mono text-sm focus-visible:ring-2 focus-visible:ring-primary/50" />
                </div>
                <Input name="subject" placeholder="what's this about?" required className="h-11 rounded-md font-mono text-sm focus-visible:ring-2 focus-visible:ring-primary/50" />
                <Textarea name="message" rows={6} placeholder="a few sentences about the role or project." required className="rounded-md font-mono text-sm focus-visible:ring-2 focus-visible:ring-primary/50" />
                <Button type="submit" className="h-11 w-full rounded-md font-mono text-sm font-medium">
                  send message
                </Button>
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
    <footer className="panel mt-6 px-6 py-9 md:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <PromptMark />
            <div className="flex flex-col leading-none">
              <span className="font-mono text-sm font-semibold">vincent.dev</span>
              <span className="eyebrow mt-1 text-muted-foreground">full-stack · it student</span>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            IT student at CIT-U, Cebu. Open to internships and junior roles, and small projects
            on the side.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <span className="status-dot" aria-hidden="true" />
            open to opportunities
          </div>
        </div>

        <div>
          <div className="eyebrow mb-3 text-muted-foreground">pages</div>
          <ul className="space-y-2 font-mono text-sm">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className="text-foreground/80 transition hover:text-primary">
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="eyebrow mb-3 text-muted-foreground">elsewhere</div>
          <ul className="space-y-2 font-mono text-sm">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group inline-flex items-center gap-2 text-foreground/80 transition hover:text-primary"
                >
                  <s.icon className="h-4 w-4" />
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/r/Resume_Vincent_Paul_Dumangcas.docx"
                download="Resume_Vincent_Paul_Dumangcas.docx"
                className="group inline-flex items-center gap-2 text-foreground/80 transition hover:text-primary"
              >
                <Download className="h-4 w-4" />
                résumé
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-9 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 font-mono text-xs text-muted-foreground sm:flex-row sm:items-center">
        <span>© {new Date().getFullYear()} vincent paul dumangcas · react + tailwind</span>
        <span>cebu, ph</span>
      </div>
    </footer>
  )
}

/* ---------- App shell ---------- */
function App() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" })
  }, [location.pathname])

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="tech-grid" aria-hidden="true" />
      <ScrollProgress />

      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
          <NavLink to="/about" className="group flex items-center gap-2.5">
            <PromptMark className="transition-colors group-hover:border-primary/60" />
            <span className="font-mono text-sm font-semibold tracking-tight transition-colors group-hover:text-primary">
              vincent.dev
            </span>
          </NavLink>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `nav-link rounded-md py-2 pl-5 pr-3 text-sm transition ${
                    isActive ? "is-active text-primary" : "text-muted-foreground hover:text-foreground"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Button
            variant="outline"
            className="hidden h-9 rounded-md border-border font-mono text-xs transition hover:border-primary/60 hover:text-primary md:inline-flex"
            asChild
          >
            <a href="/r/Resume_Vincent_Paul_Dumangcas.docx" download="Resume_Vincent_Paul_Dumangcas.docx">
              <Download className="h-3.5 w-3.5" />
              résumé
            </a>
          </Button>
        </div>

        <div className="border-t border-border px-4 py-2 md:hidden">
          <nav className="mx-auto flex w-full max-w-5xl gap-2 overflow-x-auto" aria-label="Mobile primary">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `whitespace-nowrap rounded-md px-3 py-2 font-mono text-sm transition ${
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

      <main key={location.pathname} className="relative z-[2] mx-auto w-full max-w-5xl px-6">
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
