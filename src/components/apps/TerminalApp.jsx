import { useEffect, useRef, useState } from "react"
import { EMAIL } from "../../config/appConfig.js"
import { appMeta } from "../../config/desktopConfig.jsx"
import {
  aboutText,
  buildLogText,
  projects,
  stackGroups,
} from "../../data/portfolioData.js"

export function TerminalApp({ openApp, closeApp, closeAll, openWindows }) {
  const [lines, setLines] = useState([
    { type: "system", text: "Vincent Portfolio Terminal v1.1" },
    { type: "system", text: "Type help to list all available commands." },
    { type: "system", text: "Use open <app-id> to launch apps." },
  ])
  const [value, setValue] = useState("")
  const inputRef = useRef(null)
  const outputRef = useRef(null)

  useEffect(() => {
    outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight })
  }, [lines])

  const aliases = {
    about: "about",
    blog: "blog",
    "build-log": "blog",
    contact: "contact",
    experience: "experience",
    guide: "help",
    help: "help",
    settings: "settings",
    terminal: "terminal",
    work: "works",
    works: "works",
    projects: "works",
    "about.txt": "about-file",
    "build-log.md": "build-log-file",
  }

  const responseFor = (raw) => {
    const command = raw.toLowerCase().trim()
    if (command === "help") {
      return "help  apps  ls  open <app>  close <app>  windows  whoami  works  skills  contact  cat <file>  date  clear  man <command>"
    }
    if (command === "apps") {
      return "about  blog  contact  experience  help  settings  terminal  works"
    }
    if (command === "ls") {
      return "nurse-tracer/  synapse-ui/  poultry-prophet/  Contact.app  about.txt  build-log.md"
    }
    if (command === "whoami" || command === "about") {
      return "Vincent Paul Dumangcas - Cebu-based BSIT student and full-stack developer building practical web apps."
    }
    if (command === "works" || command === "work" || command === "projects") {
      return projects.map((project) => `${project.id} ${project.title}`).join("  /  ")
    }
    if (command === "skills" || command === "stack") {
      return stackGroups.map(([group, tools]) => `${group}: ${tools}`).join("  |  ")
    }
    if (command === "contact") return `${EMAIL}  |  github.com/VincentPaul434`
    if (command === "date") {
      return new Intl.DateTimeFormat("en-PH", {
        dateStyle: "full",
        timeStyle: "medium",
        timeZone: "Asia/Manila",
      }).format(new Date())
    }
    if (command === "windows") {
      return openWindows.length ? openWindows.map((id) => appMeta[id].label).join("  /  ") : "No open windows."
    }
    if (command === "cat about.txt") return aboutText
    if (command === "cat build-log.md") return buildLogText
    if (command.startsWith("open ")) {
      const target = command.slice(5).trim()
      const project = projects.find(
        (item) => item.slug === target || item.title.toLowerCase() === target,
      )
      const id = project ? `project-${project.slug}` : aliases[target]
      if (!id) return `No app named "${target}". Run apps or ls for available names.`
      openApp(id)
      return `Opening ${appMeta[id].label}...`
    }
    if (command === "close all") {
      closeAll()
      return "Closed all windows except this terminal session."
    }
    if (command.startsWith("close ")) {
      const target = command.slice(6).trim()
      const id = aliases[target]
      if (!id) return `No app named "${target}".`
      closeApp(id)
      return `Closed ${appMeta[id].label}.`
    }
    if (command.startsWith("man ")) {
      const target = command.slice(4).trim()
      const docs = {
        open: "open <app> - opens or focuses an app, project, or text file.",
        close: "close <app> - closes one app. close all closes every other window.",
        cat: "cat about.txt | cat build-log.md - reads a desktop text file.",
        windows: "windows - lists the windows that are currently open.",
      }
      return docs[target] ?? `No manual entry for ${target}. Try open, close, cat, or windows.`
    }
    return `Command not found: ${raw}. Type help for the command list.`
  }

  const submit = (event) => {
    event.preventDefault()
    const raw = value.trim()
    if (!raw) return
    setValue("")
    if (raw.toLowerCase() === "clear") {
      setLines([])
      return
    }
    const output = responseFor(raw)
    setLines((current) => [
      ...current,
      { type: "command", text: `vincent@portfolio:~$ ${raw}` },
      { type: "output", text: output },
    ])
  }

  return (
    <div className="terminal-app" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-output" ref={outputRef} aria-live="polite">
        {lines.map((line, index) => (
          <p key={`${line.type}-${index}`} className={`terminal-${line.type}`}>
            {line.text}
          </p>
        ))}
        <form onSubmit={submit}>
          <label htmlFor="terminal-input">vincent@portfolio:~$</label>
          <input
            ref={inputRef}
            id="terminal-input"
            aria-label="Terminal command"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") submit(event)
            }}
            autoComplete="off"
            spellCheck="false"
          />
        </form>
      </div>
    </div>
  )
}
