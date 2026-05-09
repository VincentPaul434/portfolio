import React, { useEffect, useMemo, useState } from "react"
import { NavLink, Navigate, Route, Routes } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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

function AboutPage() {
  return (
    <section className="pt-8 pb-16">
      <div className="relative overflow-hidden rounded-3xl border bg-card/80 backdrop-blur">
        <div className="pointer-events-none absolute -left-24 top-12 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 -bottom-16 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />

        <div className="grid grid-cols-1 items-center gap-12 px-8 py-10 md:grid-cols-[1.1fr_0.9fr] md:px-14 md:py-14">
          <div>
            <Badge className="mb-4 rounded-full bg-primary/15 text-primary hover:bg-primary/20">Portfolio 2026</Badge>
            <h1 className="text-balance text-4xl font-extrabold leading-[1.03] tracking-tight md:text-6xl">
              Building digital products, brands, and clean developer experiences.
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-base text-muted-foreground md:text-lg">
              I am Vincent Paul, a full-stack developer focused on practical software for healthcare and service teams.
              I design thoughtful frontends, wire reliable backends, and ship products that are easy to use.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Input placeholder="Email address" className="h-12 rounded-full bg-background/70" />
              <Button className="h-12 rounded-full px-7 font-semibold">
                Connect With Me
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[420px]">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary/25 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border bg-background/80 p-3">
              <img
                src="/profile-photo.jpg"
                alt="Professional portrait"
                className="h-[420px] w-full rounded-[1.6rem] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function WorksPage() {
  return (
    <section className="pt-8 pb-16">
      <div className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Selected Works</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Projects focused on useful experiences, scalable structure, and polished interface details.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.title} className="group border-border/70 bg-card/80 backdrop-blur transition-all hover:-translate-y-1 hover:shadow-xl">
            <CardHeader>
              <CardDescription>{project.type}</CardDescription>
              <CardTitle className="text-xl">{project.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{project.description}</p>
            </CardHeader>
            <CardContent>
              <div className="mb-5 flex flex-wrap gap-2">
                {project.tech.map((item) => (
                  <Badge key={item} variant="outline" className="rounded-full">
                    {item}
                  </Badge>
                ))}
              </div>
              <Button asChild className="w-full rounded-full">
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  Visit Project
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

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
    <section className="pt-8 pb-16">
      <div className="mb-10 flex items-center gap-3">
        <Sparkles className="h-6 w-6 text-primary" />
        <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Services</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {services.map((service) => (
          <Card key={service.title} className="rounded-3xl border-border/70 bg-card/80">
            <CardHeader>
              <div className="mb-2 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15">
                <service.icon className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

function ContactPage() {
  return (
    <section className="pt-8 pb-16">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="rounded-3xl bg-card/80">
          <CardHeader>
            <CardTitle className="text-3xl">Let us build together</CardTitle>
            <CardDescription>
              Tell me what you are building and I can help you shape the product and ship it cleanly.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <a className="flex items-center gap-3 text-muted-foreground hover:text-foreground" href="mailto:dumangcasvincentpaul@gmail.com">
              <Mail className="h-4 w-4" />
              dumangcasvincentpaul@gmail.com
            </a>
            <a className="flex items-center gap-3 text-muted-foreground hover:text-foreground" href="https://www.linkedin.com/in/vincent-paul-dumangcas-74063a365/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-4 w-4" />
              LinkedIn profile
            </a>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-border/70 bg-card/80">
          <CardContent className="p-6 md:p-8">
            <form className="space-y-5" name="contact" method="post" data-netlify="true">
              <input type="hidden" name="form-name" value="contact" />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input name="name" placeholder="Your name" required className="h-11 rounded-xl" />
                <Input name="email" type="email" placeholder="Email address" required className="h-11 rounded-xl" />
              </div>
              <Input name="subject" placeholder="Project subject" required className="h-11 rounded-xl" />
              <Textarea name="message" rows={6} placeholder="Write your message" required className="rounded-xl" />
              <Button type="submit" className="h-11 w-full rounded-xl font-semibold">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

function App() {
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-24 -top-16 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute right-0 top-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-64 w-[34rem] -translate-x-1/2 rounded-full bg-muted/70 blur-3xl" />
      </div>

      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/75 backdrop-blur-xl">
        <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-6">
          <NavLink to="/about" className="font-bold tracking-tight text-lg">
            Vincent Paul
          </NavLink>

          <nav className="hidden items-center gap-1 rounded-full border border-border/70 bg-card/60 p-1 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm transition ${isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"} onClick={() => setIsDark(!isDark)}>
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="outline" className="hidden rounded-full md:inline-flex" asChild>
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
                  `whitespace-nowrap rounded-full px-4 py-2 text-sm ${isActive ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground"}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6">
        <Routes>
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
