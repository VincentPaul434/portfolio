import { Folder } from "lucide-react"
import { experience, projects } from "../../data/portfolioData.js"
import { Panel } from "./Panel.jsx"

export function BlogApp({ openApp }) {
  const notes = [
    {
      project: projects[0],
      title: "Designing a consent-first alumni tracer flow",
      summary:
        "A build note on privacy language, validation, and keeping a long graduate survey clear from consent through submission.",
    },
    {
      project: projects[1],
      title: "Keeping a real-time AI workspace coherent",
      summary:
        "What I learned while bringing chat, shared documents, AI actions, and live connection states into one interface.",
    },
    {
      project: projects[2],
      title: "Keeping readiness scores explainable",
      summary:
        "Why health records and scoring logic are easier to trust when the rules live in one testable place.",
    },
  ]

  return (
    <article className="blog-app">
      <header className="app-intro">
        <h2>Build Log</h2>
        <p>
          Notes from the work already in this portfolio. Open an entry to inspect the corresponding
          project and its decisions.
        </p>
      </header>
      <Panel title="POST LIST">
        <ul className="post-list">
          {notes.map((note) => (
            <li key={note.project.slug}>
              <button type="button" onClick={() => openApp(`project-${note.project.slug}`)}>
                <Folder aria-hidden="true" />
                <span>
                  <strong>{note.title}</strong>
                  <small>
                    {note.project.title} <i aria-hidden="true">•</i> {note.project.year}
                  </small>
                  <p>{note.summary}</p>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Panel>
    </article>
  )
}

export function ExperienceApp() {
  return (
    <article className="experience-app">
      <header className="app-intro">
        <h2>Experience</h2>
        <p>A concise timeline of my education, project work, and current direction.</p>
      </header>

      <Panel title="CURRENT FOCUS">
        <ul className="dot-list">
          <li>Completing BS Information Technology at CIT-U.</li>
          <li>Shipping practical student, collaborative, and independent full-stack systems.</li>
          <li>Looking for internship, junior, and contract opportunities.</li>
        </ul>
      </Panel>

      <Panel title="TIMELINE" className="career-panel">
        <ol className="career-list">
          {experience.map((item) => {
            const Icon = item.icon
            return (
              <li key={`${item.period}-${item.title}`}>
                <span className="career-dot" aria-hidden="true" />
                <article>
                  <header>
                    <Icon aria-hidden="true" />
                    <h3>{item.title}</h3>
                    <span>{item.place}</span>
                    {item.current ? <b>Current</b> : null}
                  </header>
                  <p className="career-period">{item.period}</p>
                  <p>{item.detail}</p>
                </article>
              </li>
            )
          })}
        </ol>
      </Panel>
    </article>
  )
}
