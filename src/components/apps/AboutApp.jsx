import { ArrowRight, ArrowUpRight } from "lucide-react"
import { GITHUB, LINKEDIN } from "../../config/appConfig.js"
import { Panel } from "./Panel.jsx"

export function AboutApp({ openApp }) {
  return (
    <article className="about-app">
      <figure className="about-photo">
        <img src="/profile-photo.jpg" alt="A childhood photo of Vincent" />
        <figcaption>
          <span>VPD / ARCHIVE</span>
          <span>CEBU, PH</span>
        </figcaption>
      </figure>

      <div className="about-copy">
        <h2>Vincent Paul Dumangcas</h2>
        <p>
          I&apos;m an IT student at CIT-U who cares about the small decisions that make software
          feel calm under real use - forms, tables, permissions, empty states, and clear labels.
        </p>
        <p>
          I work across the full path from data and backend logic to responsive frontend flows. I
          care about finishing what I start and understanding why a system behaves the way it does.
        </p>

        <Panel title="CURRENT FOCUS" className="about-focus">
          <ul className="dot-list">
            <li>Completing BS Information Technology at CIT-U.</li>
            <li>Shipping practical full-stack student, collaborative, and independent projects.</li>
            <li>Looking for internship, junior, and contract opportunities.</li>
          </ul>
        </Panel>

        <div className="about-cta">
          <div>
            <span className="micro-label">FULL TIMELINE</span>
            <p>Education, current work, and the direction I&apos;m heading.</p>
          </div>
          <button type="button" className="flat-button" onClick={() => openApp("experience")}>
            Open Experience
            <ArrowRight aria-hidden="true" />
          </button>
        </div>

        <div className="about-links">
          <a href={GITHUB} target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight aria-hidden="true" />
          </a>
          <a href={LINKEDIN} target="_blank" rel="noreferrer">
            LinkedIn <ArrowUpRight aria-hidden="true" />
          </a>
          <button type="button" onClick={() => openApp("contact")}>
            Get in touch <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  )
}
