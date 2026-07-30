import { useState } from "react"
import { Check, Copy, Github, Linkedin, Send } from "lucide-react"
import { EMAIL, GITHUB, LINKEDIN } from "../../config/appConfig.js"

export function ContactApp({ copyEmail, copied, showToast }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [status, setStatus] = useState("Fill in the form. Sending opens your email app.")
  const [showErrors, setShowErrors] = useState(false)

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const submit = (event) => {
    event.preventDefault()
    setShowErrors(true)
    if (!form.name || !form.email || !form.subject || !form.message) {
      setStatus("Please complete every field before continuing.")
      return
    }

    const body = `Hi Vincent,\n\n${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`
    const href = `mailto:${EMAIL}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`
    setShowErrors(false)
    setStatus("Your email app is opening with the message prepared.")
    showToast("Opening your email app")
    window.location.href = href
  }

  return (
    <article className="contact-app">
      <header className="app-intro">
        <h2>Contact</h2>
        <p>Send a project inquiry, collaboration note, or a simple hello.</p>
      </header>

      <form onSubmit={submit}>
        <p className="form-status" role="status" id="contact-form-status">
          {status}
        </p>
        <label>
          <span>Name</span>
          <input
            name="name"
            value={form.name}
            onChange={updateField}
            placeholder="Your name"
            autoComplete="name"
            required
            aria-invalid={showErrors && !form.name}
            aria-describedby="contact-form-status"
          />
        </label>
        <label>
          <span>Email</span>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={updateField}
            placeholder="you@example.com"
            autoComplete="email"
            required
            aria-invalid={showErrors && !form.email}
            aria-describedby="contact-form-status"
          />
        </label>
        <label>
          <span>Subject</span>
          <input
            name="subject"
            value={form.subject}
            onChange={updateField}
            placeholder="Project inquiry"
            required
            aria-invalid={showErrors && !form.subject}
            aria-describedby="contact-form-status"
          />
        </label>
        <label>
          <span>Message</span>
          <textarea
            name="message"
            value={form.message}
            onChange={updateField}
            placeholder="Tell me a bit about your project..."
            rows="6"
            required
            aria-invalid={showErrors && !form.message}
            aria-describedby="contact-form-status"
          />
        </label>
        <button type="submit" className="flat-button is-primary">
          Send message
          <Send aria-hidden="true" />
        </button>
      </form>

      <footer className="contact-directory">
        <button type="button" onClick={copyEmail}>
          {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
          {copied ? "Email copied" : EMAIL}
        </button>
        <a href={GITHUB} target="_blank" rel="noreferrer">
          <Github aria-hidden="true" /> GitHub
        </a>
        <a href={LINKEDIN} target="_blank" rel="noreferrer">
          <Linkedin aria-hidden="true" /> LinkedIn
        </a>
      </footer>
    </article>
  )
}
