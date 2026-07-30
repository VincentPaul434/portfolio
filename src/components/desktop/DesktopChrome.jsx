import { useEffect, useMemo, useRef, useState } from "react"
import { Search, X } from "lucide-react"
import {
  appMeta,
  dockApps,
  dockMeta,
} from "../../config/desktopConfig.jsx"
import { projects } from "../../data/portfolioData.js"

function DesktopFile({ item, onOpen }) {
  const meta = appMeta[item.id]
  const Icon = meta.icon
  return (
    <button type="button" className="desktop-file" onClick={() => onOpen(item.id)}>
      <span className={`file-glyph glyph-${item.type}`} aria-hidden="true">
        {item.type === "folder" ? (
          <>
            <i />
            <b />
          </>
        ) : (
          <Icon />
        )}
      </span>
      <span>{item.label}</span>
    </button>
  )
}

function Dock({ openApp, openSearch, windows, activeId }) {
  const projectFocusId = Object.entries(windows)
    .filter(([id, state]) => id.startsWith("project-") && state.isOpen)
    .sort((a, b) => b[1].z - a[1].z)[0]?.[0]
  const projectWindowOpen = Boolean(projectFocusId)
  const activeDockId = activeId?.startsWith("project-") ? "works" : activeId

  return (
    <nav className="dock" aria-label="Desktop apps">
      <ul>
        {dockApps.map((id) => {
          const meta = dockMeta[id]
          const Icon = meta.icon
          const isOpen =
            id === "search"
              ? false
              : id === "works"
                ? Boolean(windows[id]?.isOpen || projectWindowOpen)
                : Boolean(windows[id]?.isOpen)
          return (
            <li key={id}>
              <button
                type="button"
                className={activeDockId === id ? "is-active" : ""}
                aria-label={`${isOpen ? "Focus" : "Open"} ${meta.label}`}
                aria-pressed={activeDockId === id}
                onClick={() => {
                  if (id === "search") {
                    openSearch()
                  } else if (id === "works" && !windows.works.isOpen && projectFocusId) {
                    openApp(projectFocusId)
                  } else {
                    openApp(id)
                  }
                }}
              >
                <Icon aria-hidden="true" />
              </button>
              <span className="dock-tooltip">{meta.label}</span>
              {isOpen ? <i className="open-indicator" aria-hidden="true" /> : null}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

function SearchDialog({ onClose, openApp }) {
  const [query, setQuery] = useState("")
  const inputRef = useRef(null)
  const dialogRef = useRef(null)

  const index = useMemo(
    () => [
      ...["about", "blog", "contact", "experience", "help", "settings", "terminal", "works"].map(
        (id) => ({
          id,
          label: appMeta[id].label,
          kind: "App",
          detail: id === "works" ? "Selected projects and timeline" : `Open ${appMeta[id].label}`,
          keywords: id === "about" ? "about vincent profile biography" : id,
        }),
      ),
      ...projects.map((project) => ({
        id: `project-${project.slug}`,
        label: project.title,
        kind: "Project",
        detail: project.description,
        keywords: `${project.slug} ${project.category} ${project.tech.join(" ")}`,
      })),
      {
        id: "about-file",
        label: "about.txt",
        kind: "File",
        detail: "Vincent's current focus in plain text",
        keywords: "now focus student cit-u",
      },
      {
        id: "build-log-file",
        label: "build-log.md",
        kind: "File",
        detail: "Plain-text notes from Vincent's three selected projects",
        keywords: "build notes nurse synapse poultry",
      },
    ],
    [],
  )

  const normalized = query.trim().toLowerCase()
  const queryTerms = normalized
    .split(/\s+/)
    .filter((term) => term && !["show", "find", "open", "please", "the", "my", "to"].includes(term))
  const results = queryTerms.length
    ? index
        .filter((item) => {
          const searchable =
            `${item.label} ${item.kind} ${item.detail} ${item.keywords}`.toLowerCase()
          return queryTerms.every((term) => searchable.includes(term))
        })
        .slice(0, 6)
    : []

  useEffect(() => {
    const previouslyFocused = document.activeElement
    inputRef.current?.focus()
    return () => previouslyFocused?.focus()
  }, [])

  const keepFocusInside = (event) => {
    if (event.key !== "Tab") return
    const focusable = [
      ...dialogRef.current.querySelectorAll(
        'button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
      ),
    ]
    if (!focusable.length) return
    const first = focusable[0]
    const last = focusable.at(-1)
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  const choose = (id) => {
    openApp(id)
    onClose()
  }

  return (
    <div className="search-overlay" role="presentation" onMouseDown={onClose}>
      <dialog
        ref={dialogRef}
        open
        className="search-dialog"
        aria-label="Search"
        aria-modal="true"
        onKeyDown={keepFocusInside}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header>
          <span>Search</span>
          <button type="button" aria-label="Close search" onClick={onClose}>
            <X aria-hidden="true" />
          </button>
        </header>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            if (results[0]) choose(results[0].id)
          }}
        >
          <p>Type a question or destination and press Enter to search.</p>
          <div className="search-input-row">
            <Search aria-hidden="true" />
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="What do you want to know or open?"
              aria-label="What do you want to know or open?"
            />
            <button type="submit" disabled={!results.length} aria-label="Submit search">
              ↵
            </button>
          </div>
        </form>
        {normalized ? (
          <ul className="search-results">
            {results.length ? (
              results.map((result) => (
                <li key={result.id}>
                  <button type="button" onClick={() => choose(result.id)}>
                    <span>
                      <strong>{result.label}</strong>
                      <small>{result.detail}</small>
                    </span>
                    <b>{result.kind}</b>
                  </button>
                </li>
              ))
            ) : (
              <li className="no-results">No match. Try projects, React, contact, or about.</li>
            )}
          </ul>
        ) : null}
      </dialog>
    </div>
  )
}

function WallpaperMark() {
  return (
    <div className="wallpaper-mark" aria-hidden="true">
      <span className="pixel-v">V</span>
      <span className="pixel-p">P</span>
      <small>CEBU / 10.3157 N</small>
    </div>
  )
}

export { DesktopFile, Dock, SearchDialog, WallpaperMark }
