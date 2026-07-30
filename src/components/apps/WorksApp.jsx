import { ExternalLink } from "lucide-react"
import { projects } from "../../data/portfolioData.js"
import { Panel } from "./Panel.jsx"

export function WorksApp({ openApp }) {
  return (
    <article className="works-app">
      <header className="app-intro">
        <h2>Works</h2>
        <p>
          Selected student, collaborative, and independent projects, shown with the problem,
          stack choices, and decisions behind each build.
        </p>
      </header>

      <Panel title="PROJECT LIST" className="project-list-panel">
        <ul className="project-list">
          {projects.map((project) => (
            <li key={project.slug}>
              <button type="button" onClick={() => openApp(`project-${project.slug}`)}>
                <span>
                  <strong>{project.title}</strong>
                  <small>
                    <i aria-hidden="true">•</i> {project.role} <i aria-hidden="true">•</i>{" "}
                    {project.year} <i aria-hidden="true">•</i> {project.category}
                  </small>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="TIMELINE (FROM 2024)" className="timeline-panel">
        <div className="works-timeline" aria-label="Project timeline">
          <div className="timeline-canvas">
            <div className="timeline-grid-head">
              <span>PROJECTS</span>
              <span>2024</span>
              <span>2025</span>
              <span>2026</span>
            </div>
            {projects.map((project, index) => (
              <button
                type="button"
                className="timeline-row"
                key={project.slug}
                onClick={() => openApp(`project-${project.slug}`)}
              >
                <span>{project.shortTitle}</span>
                <span className="timeline-track">
                  <i className={`project-bar bar-${index + 1}`} />
                  {index === 0 ? <b>Today</b> : null}
                </span>
              </button>
            ))}
          </div>
        </div>
      </Panel>
    </article>
  )
}

function ProjectVisual({ project }) {
  if (project.visual === "nurse") {
    return (
      <div className="project-mockup mockup-nurse" aria-label="NurseTracer interface schematic">
        <div className="mockup-topbar">
          <b>CIT-U TRACER</b>
          <span>ALUMNI SURVEY</span>
        </div>
        <div className="ward-grid">
          {["01", "02", "03", "04"].map((step, index) => (
            <div key={step}>
              <small>STEP {step}</small>
              <strong>{["Consent", "Profile", "Employment", "Feedback"][index]}</strong>
              <i style={{ width: `${45 + index * 12}%` }} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (project.visual === "synapse") {
    return (
      <div className="project-mockup mockup-synapse" aria-label="Synapse team workspace schematic">
        <div className="component-nav">
          <b>SYNAPSE / TEAM</b>
          <span>LIVE WORKSPACE</span>
        </div>
        <div className="component-preview">
          <button type="button"># general</button>
          <button type="button">New document</button>
          <label>
            AI summary progress
            <input type="range" min="0" max="100" defaultValue="64" tabIndex="-1" />
          </label>
          <div>
            <i />
            <span>Realtime connected</span>
            <b>LIVE</b>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="project-mockup mockup-poultry" aria-label="Poultry Prophet analytics schematic">
      <div className="score-head">
        <span>READINESS</span>
        <strong>86.4</strong>
      </div>
      <div className="score-chart">
        {[44, 62, 50, 73, 68, 91, 86].map((height, index) => (
          <i key={index} style={{ height: `${height}%` }} />
        ))}
      </div>
      <div className="score-table">
        <span>BATCH A-12</span>
        <b>HEALTHY</b>
        <span>UPDATED NOW</span>
      </div>
    </div>
  )
}

export function ProjectDetailApp({ project }) {
  return (
    <article className="project-case">
      <div className="case-copy">
        <header>
          <h2>{project.title}</h2>
          <p>
            {project.role} <i aria-hidden="true">•</i> {project.year}
          </p>
        </header>

        <div className="case-links">
          {project.links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
              {link.label}
              <ExternalLink aria-hidden="true" />
            </a>
          ))}
        </div>

        <div className="case-meta-block">
          <span className="micro-label">TECH STACK</span>
          <div className="chip-list">
            {project.tech.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        <div className="case-meta-block">
          <span className="micro-label">TASKS</span>
          <div className="chip-list task-list">
            {project.features.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        <section className="case-section">
          <h3>Problem</h3>
          <p>{project.problem}</p>
        </section>

        <section className="case-section">
          <h3>What I built</h3>
          <p>{project.description}</p>
          <ul>
            {project.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </section>

        <section className="case-section">
          <h3>Takeaway</h3>
          <p>{project.takeaway}</p>
        </section>
      </div>

      <aside className="case-visuals">
        <div className="visuals-heading">
          <span>VISUALS</span>
          <small>3 PANELS</small>
        </div>
        <figure>
          <ProjectVisual project={project} />
          <figcaption>SLIDE 1 <i aria-hidden="true">•</i> INTERFACE SCHEMATIC</figcaption>
        </figure>
        <figure className="visual-note">
          <div>
            <span>{project.id}</span>
            <h3>{project.category}</h3>
            <p>{project.description}</p>
          </div>
          <figcaption>SLIDE 2 <i aria-hidden="true">•</i> PROJECT NOTE</figcaption>
        </figure>
        <figure className="visual-stack">
          <div>
            {project.tech.map((item, index) => (
              <span key={item}>
                <b>{String(index + 1).padStart(2, "0")}</b>
                {item}
              </span>
            ))}
          </div>
          <figcaption>SLIDE 3 <i aria-hidden="true">•</i> BUILD STACK</figcaption>
        </figure>
      </aside>
    </article>
  )
}
