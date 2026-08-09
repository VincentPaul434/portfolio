import { useState } from "react"
import { ArrowRight, ArrowUpRight, Menu, Plus, Volume2, VolumeX, X } from "lucide-react"

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
]

const projects = [
  {
    title: "ETC Cars",
    category: "Dealership platform",
    description: "A calm operating system for vehicles, leads, sales, expenses, and follow-ups.",
    image: "/projects/etc-cars.png",
    number: "01",
  },
  {
    title: "Pulse Studio",
    category: "Creative direction",
    description: "A bold digital stage for artists, projects, and culture built around sound.",
    image: "/projects/trionn/pulse-studio.jpg",
    number: "02",
  },
  {
    title: "MyWorker AI",
    category: "AI workforce platform",
    description: "An interface for hiring, managing, and scaling digital workers with clarity.",
    image: "/projects/trionn/myworker.jpg",
    number: "03",
  },
  {
    title: "Loftloom",
    category: "Real estate platform",
    description: "A seamless property discovery experience for the next place to call home.",
    image: "/projects/trionn/loftloom.jpg",
    number: "04",
  },
]

const services = [
  {
    title: "Product design",
    description: "Thoughtful product design that captures attention, deepens engagement, and builds lasting loyalty.",
    label: "01",
  },
  {
    title: "Website & mobile design",
    description: "High-quality website and app experiences designed to attract users and keep them coming back.",
    label: "02",
  },
  {
    title: "Full-stack development",
    description: "Interfaces, backend systems, and data flows designed to stay clear and dependable under real use.",
    label: "03",
  },
  {
    title: "Branding",
    description: "Impactful visual systems that give products credibility, clarity, and a memorable point of view.",
    label: "04",
  },
]

const testimonials = [
  {
    quote: "The best work is the work that makes the next decision feel obvious. Vincent brings that clarity to every layer of a product.",
    name: "Malte Smith",
    role: "Founder & CEO · USA",
    tag: "LUXURY PRESENCE",
  },
  {
    quote: "A reliable, thoughtful builder who can take an idea and turn it into something people actually enjoy using.",
    name: "Stephen Dash",
    role: "Founder & CEO · USA",
    tag: "CREDIBLE",
  },
  {
    quote: "From the first conversation to the final detail, the work stays flexible, professional, and beautifully considered.",
    name: "Jean-Baptiste Biolay",
    role: "General Manager · UAE",
    tag: "FAST RESUME",
  },
]

function ArrowLink({ children, href = "#contact", light = false }) {
  return (
    <a className={`arrow-link${light ? " arrow-link-light" : ""}`} href={href}>
      <span>{children}</span>
      <ArrowRight aria-hidden="true" />
    </a>
  )
}

function SiteHeader({ menuOpen, setMenuOpen, soundOn, setSoundOn }) {
  return (
    <>
      <header className="site-header">
        <a className="site-logo" href="#top" aria-label="Vincent Paul home">
          <img src="/trionn/logo.svg" alt="Vincent Paul" />
        </a>
        <div className="header-actions">
          <button className="sound-button" type="button" onClick={() => setSoundOn((value) => !value)} aria-label={soundOn ? "Mute sound" : "Enable sound"}>
            {soundOn ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}
          </button>
          <a className="header-talk" href="#contact">Let&apos;s talk</a>
          <button className="menu-button" type="button" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-controls="main-navigation">
            <span>Menu</span>
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </header>

      {menuOpen ? (
        <nav id="main-navigation" className="menu-panel" aria-label="Main navigation">
          <span className="menu-panel-label">Navigate</span>
          {navItems.map((item, index) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              <small>0{index + 1}</small>
              {item.label}
              <ArrowUpRight aria-hidden="true" />
            </a>
          ))}
        </nav>
      ) : null}
    </>
  )
}

function Hero() {
  return (
    <section id="top" className="hero-section">
      <div className="hero-grid-lines" aria-hidden="true" />
      <div className="hero-orbit" aria-hidden="true">
        <span className="orbit-line orbit-line-one" />
        <span className="orbit-line orbit-line-two" />
        <span className="orbit-line orbit-line-three" />
        <span className="orbit-node orbit-node-one" />
        <span className="orbit-node orbit-node-two" />
        <div className="orbit-mark"><span /><span /><span /></div>
      </div>

      <div className="hero-content shell">
        <p className="eyebrow">Inspire <i>·</i> Innovate <i>·</i> Impact</p>
        <div className="hero-heading-wrap">
          <h1 className="hero-heading"><span>Designed to</span><span>mean <em>intention.</em></span></h1>
          <ArrowLink href="#contact">Start a project</ArrowLink>
        </div>
        <div className="hero-bottom">
          <div className="hero-metric">
            <span className="metric-icon">◎</span>
            <span><b>Est. 2021</b><small>5+ years building<br />digital direction.</small></span>
          </div>
          <div className="hero-blurb">Websites, AI products, brands, and systems built for clarity, scale and impact.</div>
        </div>
      </div>

      <div className="hero-footnote">
        <span>Hold to <b>✦</b> blast</span>
        <span>Dare <b>✦</b> to touch the lines.</span>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="about-section dark-section">
      <div className="about-background-mark" aria-hidden="true">✦</div>
      <div className="shell">
        <div className="about-topline"><span>About</span><span>01 / 06</span></div>
        <div className="about-main">
          <h2>Vincent is an independent digital <span>builder crafting meaningful product</span> experiences through strategy, design, and technology.</h2>
          <div className="about-side">
            <p className="about-lead">We design for longevity. Clarity first, craft always, built to scale.</p>
            <p>My mission is to make technology feel human by creating digital products that are intuitive, purposeful, and meaningful to people.</p>
            <ArrowLink href="#work" light>More about this work</ArrowLink>
          </div>
        </div>
      </div>
    </section>
  )
}

function Vision() {
  return (
    <section className="vision-section dark-section">
      <div className="vision-rule" aria-hidden="true" />
      <div className="vision-statement shell">
        <p>Focused vision.<br />Measured execution.</p>
        <span>✦ From idea to outcome.</span>
      </div>
      <div className="vision-marquee" aria-label="Inspire innovate impact">
        <span>Inspire <i>·</i> Innovate <i>·</i> Impact</span>
        <span>Inspire <i>·</i> Innovate <i>·</i> Impact</span>
      </div>
    </section>
  )
}

function FactCard({ value, label, children }) {
  return (
    <article className="fact-card">
      <span className="fact-label">{label}</span>
      <strong>{value}</strong>
      {children ? <p>{children}</p> : null}
    </article>
  )
}

function Facts() {
  const awardNames = ["Awwwards", "CSS Design Awards", "The FWA", "CSS Winner", "A' Design Award", "GSAP"]
  const partnerNames = ["CIT-U", "Vercel", "GitHub", "Spring", "OpenAI"]

  return (
    <section className="facts-section light-section">
      <div className="shell">
        <div className="section-heading-row">
          <div>
            <span className="section-kicker">✦ Key facts</span>
            <h2>A snapshot of<br />experience and impact.</h2>
          </div>
          <span className="section-index">02 / 06</span>
        </div>
        <div className="facts-grid">
          <FactCard label="Projects completed" value="20+" />
          <FactCard label="Client retention" value="90%">of clients return for a second project.</FactCard>
          <FactCard label="Years building" value="05+" />
          <FactCard label="Technologies" value="12+">Different tools. One standard of craft.</FactCard>
        </div>
        <div className="recognition-grid">
          <div><span className="mini-label">Featured &amp; awards</span><p>Recognized by the platforms that celebrate thoughtful digital work.</p></div>
          <div className="logo-row">{awardNames.map((name) => <span key={name}>{name}</span>)}</div>
        </div>
        <div className="recognition-grid partners-row">
          <div><span className="mini-label">Partners</span><p>Different skills. One standard.</p></div>
          <div className="logo-row logo-row-dark">{partnerNames.map((name) => <span key={name}>{name}</span>)}</div>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-image-wrap">
        <img src={project.image} alt={`${project.title} project preview`} loading="lazy" />
        <span className="project-number">{project.number}</span>
        <span className="project-image-caption">✦ Designed with intent</span>
      </div>
      <div className="project-card-meta"><span>{project.category}</span><span>{project.number}</span></div>
      <div className="project-card-title"><h3>{project.title}</h3><ArrowUpRight aria-hidden="true" /></div>
      <p>{project.description}</p>
      <a className="project-link" href="#contact">Explore project <ArrowRight aria-hidden="true" /></a>
    </article>
  )
}

function Work() {
  return (
    <section id="work" className="work-section light-section">
      <div className="shell">
        <div className="section-heading-row work-heading-row">
          <div>
            <span className="section-kicker">Selected work</span>
            <h2>Built to be<br /><em>remembered.</em></h2>
          </div>
          <ArrowLink href="#contact">View all projects</ArrowLink>
        </div>
        <div className="project-grid">{projects.map((project) => <ProjectCard key={project.title} project={project} />)}</div>
        <div className="project-endcap"><span>✦</span><p>Discover the complete collection of digital experiences, brands, and platforms.</p><ArrowLink href="#contact">Explore project</ArrowLink></div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section id="services" className="services-section dark-section">
      <div className="shell">
        <div className="section-heading-row services-heading-row">
          <div><span className="section-kicker">Our services</span><h2>Different disciplines.<br /><em>One standard of craft.</em></h2></div>
          <span className="section-index">04 / 06</span>
        </div>
        <div className="service-list">
          {services.map((service) => (
            <article className="service-row" key={service.title}>
              <span className="service-number">{service.label}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <Plus aria-hidden="true" />
            </article>
          ))}
        </div>
        <div className="services-endnote"><span>✦</span><p>Design with intent. Built to work.</p><ArrowLink href="#contact" light>View services</ArrowLink></div>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="testimonials-section light-section">
      <div className="shell">
        <div className="section-heading-row">
          <div><span className="section-kicker">Client notes</span><h2>Great work is built through<br /><em>partnership.</em></h2></div>
          <span className="section-index">05 / 06</span>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
            <article className="testimonial-card" key={testimonial.name}>
              <span className="testimonial-tag">{testimonial.tag}</span>
              <div className="quote-mark">“</div>
              <p>{testimonial.quote}</p>
              <footer><strong>{testimonial.name}</strong><span>{testimonial.role}</span></footer>
              <div className="listen-line"><span>▷</span> Listen to him <ArrowRight aria-hidden="true" /></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact({ cookieVisible, setCookieVisible }) {
  const [sent, setSent] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.get("name")}`)
    const body = encodeURIComponent(`Name: ${form.get("name")}\nEmail: ${form.get("email")}\n\n${form.get("message")}`)
    window.location.href = `mailto:dumangcasvincentpaul@gmail.com?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <>
      <section id="contact" className="contact-section dark-section">
        <div className="shell">
          <div className="contact-topline"><span>Let&apos;s build work that inspires.</span><span>PH / 19:44</span></div>
          <div className="contact-heading"><h2>Ready to build<br /><em>something bold?</em></h2><span className="contact-time">Cebu, PH · 2026</span></div>
          <div className="contact-grid">
            <div className="contact-copy"><p>Have a project, an opportunity, or a problem worth thinking through? Send a note and let&apos;s make the next move clear.</p><ArrowLink href="mailto:dumangcasvincentpaul@gmail.com" light>Start a collaboration</ArrowLink></div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <label htmlFor="name">Your name</label><input id="name" name="name" type="text" placeholder="Name" required />
              <label htmlFor="email">Email address</label><input id="email" name="email" type="email" placeholder="you@email.com" required />
              <label htmlFor="message">Tell me about the project</label><textarea id="message" name="message" rows="4" placeholder="A few words about what you are building..." required />
              <button type="submit">{sent ? "Opening email" : "Start a conversation"}<ArrowUpRight aria-hidden="true" /></button>
            </form>
          </div>
          {cookieVisible ? <div className="cookie-bar"><span>We use cookies to enhance your experience.</span><div><button type="button" onClick={() => setCookieVisible(false)}>Decline</button><button type="button" onClick={() => setCookieVisible(false)}>Accept</button></div></div> : null}
        </div>
      </section>
      <footer className="site-footer dark-section">
        <div className="shell footer-grid">
          <div><a className="footer-logo" href="#top"><img src="/trionn/logo.svg" alt="Vincent Paul" /></a><p>©2026 Vincent Paul Dumangcas</p></div>
          <div><span className="mini-label">Business enquiry</span><a className="footer-email" href="mailto:dumangcasvincentpaul@gmail.com">dumangcasvincentpaul@gmail.com</a><a className="footer-phone" href="tel:+639824182099">+63 982 418 2099</a></div>
          <div><span className="mini-label">Social</span><div className="footer-socials"><a href="https://github.com/VincentPaul434" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.linkedin.com/in/vincent-paul-dumangcas-74063a365/" target="_blank" rel="noreferrer">LinkedIn</a><a href="mailto:dumangcasvincentpaul@gmail.com">Email</a></div></div>
        </div>
        <div className="shell footer-bottom"><span>Designed &amp; developed by Vincent</span><span>Cebu, Philippines</span><span>Back to top ↑</span></div>
      </footer>
    </>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [soundOn, setSoundOn] = useState(false)
  const [cookieVisible, setCookieVisible] = useState(true)

  return (
    <div className="app-shell">
      <SiteHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} soundOn={soundOn} setSoundOn={setSoundOn} />
      <main>
        <Hero />
        <About />
        <Vision />
        <Facts />
        <Work />
        <Services />
        <Testimonials />
        <Contact cookieVisible={cookieVisible} setCookieVisible={setCookieVisible} />
      </main>
    </div>
  )
}

export default App
