import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, ExternalLink, Code, Palette, Database, Globe } from "lucide-react"

function App() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <header className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance">Vincent Paul Dumangcas</h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-pretty">
            Full-Stack Developer & IT Student
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty">
            Resourceful and detail-oriented Information Technology student with experience in building responsive web applications using ReactJS, Spring Boot, and MySQL. Passionate about creating solutions that make a difference in healthcare and service industries.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="gap-2" asChild>
              <a href="mailto:dumangcasvincentpaul@gmail.com">
                <Mail className="w-4 h-4" />
                Get In Touch
              </a>
            </Button>
            <Button variant="outline" size="lg" className="gap-2 bg-transparent" asChild>
              <a href="#projects">
                <Github className="w-4 h-4" />
                View My Work
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Skills Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-balance">Skills & Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: Code, 
                title: "Frontend Development", 
                skills: ["React", "Vue.js", "HTML/CSS", "Tailwind CSS"] 
              },
              { 
                icon: Database, 
                title: "Backend Development", 
                skills: ["Spring Boot", "Node.js", "MySQL", "REST APIs"] 
              },
              { 
                icon: Palette, 
                title: "Tools & Technologies", 
                skills: ["Git & GitHub", "Vercel", "Google Workspace", "Microsoft Office"] 
              },
              { 
                icon: Globe, 
                title: "AI & Productivity", 
                skills: ["ChatGPT", "AI Tools", "Problem-solving", "Efficiency"] 
              },
            ].map((category, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <category.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {category.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-balance">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "MediFlow Website",
                description: "Healthcare management system with patient information, appointments, and medical records.",
                // use images placed in public/projects/*.png (see note)
                image: "/projects/mediflow.png",
                tech: ["React", "Spring Boot", "MySQL", "Tailwind"],
                github: "https://github.com/asherpaquit/MediFlow",
                live: "https://medi-flow-alpha.vercel.app/",
              },
              {
                title: "Rykzmotocare",
                description: "Motorcycle service and maintenance platform with booking system.",
                image: "/projects/rykzmotocare.png",
                tech: ["React", "Node.js", "MySQL", "REST API"],
                github: "https://github.com/VincentPaul434/Rykzmotocare",
                live: "#",
              },
              {
                title: "Wash Connect",
                description: "Laundry service connection platform for customers and service providers.",
                image: "/projects/wash-connect.png",
                tech: ["React", "Spring Boot", "MySQL", "Vercel"],
                github: "https://github.com/VincentPaul434/wash-connect",
                live: "#",
              },
            ].map((project, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <Button size="sm" variant="secondary" className="gap-2" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                    </Button>
                    {/* Live Demo removed */}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="text-pretty">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-balance">Experience & Education</h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
            {[
              {
                title: "MediFlow Website Project",
                company: "Full-Stack Developer",
                period: "Feb 2025 - May 2025",
                description: "Designed and implemented responsive user interfaces using ReactJS and Tailwind CSS. Developed RESTful API integrations using Spring Boot and MySQL for patient information storage with secure authentication and role-based access control.",
              },
              {
                title: "Cebu Institute of Technology-University",
                company: "Bachelor of Science in Information Technology",
                period: "2021 - Present",
                description: "Currently pursuing degree in Information Technology with focus on full-stack web development.",
              },
              {
                title: "Nissi Academy International School",
                company: "Secondary Education",
                period: "2019 - 2021",
                description: "Completed secondary education with focus on technology and computer science.",
              },
            ].map((item, index) => (
              <div key={index} className="relative flex items-start mb-8">
                <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                <div className="ml-16">
                  <Card>
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        <Badge variant="secondary">{item.period}</Badge>
                      </div>
                      <CardDescription className="font-medium text-accent">{item.company}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-pretty">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-balance">Let's Work Together</h2>
          <p className="text-center text-muted-foreground mb-12 text-pretty">
            Have a project in mind? I'd love to hear about it and discuss how we can bring your ideas to life.
          </p>
          <Card>
            <CardContent className="p-6">
              <form className="space-y-6" netlify>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <Input id="name" name="name" placeholder="Your name" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <Input id="email" name="email" type="email" placeholder="your@email.com" required />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <Input id="subject" name="subject" placeholder="Project inquiry" required />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea id="message" name="message" rows={5} placeholder="Tell me about your project..." required />
                </div>
                <Button type="submit" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <h3 className="font-bold text-lg mb-2">Vincent Paul Dumangcas</h3>
              <p className="text-muted-foreground">Full-Stack Developer & IT Student</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://github.com/VincentPaul434" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://www.linkedin.com/in/vincent-paul-dumangcas-74063a365/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-5 h-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="mailto:dumangcasvincentpaul@gmail.com">
                  <Mail className="w-5 h-5" />
                  <span className="sr-only">Email</span>
                </a>
              </Button>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Vincent Paul Dumangcas. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App;