import { useEffect, useMemo, useRef, useState } from "react"
import { Moon, Settings2, Sun } from "lucide-react"
import {
  AboutApp,
  BlogApp,
  ContactApp,
  ExperienceApp,
  FolderApp,
  HelpApp,
  ProjectDetailApp,
  SettingsApp,
  TerminalApp,
  TextFileApp,
  WorksApp,
} from "../../components/apps/index.js"
import {
  DesktopFile,
  Dock,
  SearchDialog,
  WallpaperMark,
} from "../../components/desktop/DesktopChrome.jsx"
import { WindowFrame } from "../../components/desktop/WindowFrame.jsx"
import { EMAIL, STORAGE_KEY } from "../../config/appConfig.js"
import {
  appMeta,
  desktopItems,
} from "../../config/desktopConfig.jsx"
import {
  aboutText,
  buildLogText,
  projects,
} from "../../data/portfolioData.js"
import { useClock } from "../../hooks/useClock.js"
import {
  clampPosition,
  createInitialDesktop,
  idFromPath,
  readSavedDesktop,
  routeForId,
  topVisibleId,
} from "../../utils/desktop.js"

function PortfolioPage() {
  const [desktop, setDesktop] = useState(createInitialDesktop)
  const [activeMenu, setActiveMenu] = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [displayOpen, setDisplayOpen] = useState(false)
  const [statsOpen, setStatsOpen] = useState(false)
  const saved = useMemo(readSavedDesktop, [])
  const [mode, setMode] = useState(saved?.mode === "dark" ? "dark" : "light")
  const [palette, setPalette] = useState(["moss", "pine", "sage"].includes(saved?.palette) ? saved.palette : "moss")
  const [wallpaper, setWallpaper] = useState(
    saved?.wallpaperVersion === 2 &&
      ["solid", "grid", "photo", "nature"].includes(saved?.wallpaper)
      ? saved.wallpaper
      : "nature",
  )
  const [brightness, setBrightness] = useState(
    Number.isFinite(saved?.brightness) ? saved.brightness : 100,
  )
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [toast, setToast] = useState("")
  const clock = useClock()
  const zRef = useRef(
    Math.max(10, ...Object.values(desktop.windows).map((item) => item.z || 1)),
  )

  const { windows, activeId } = desktop
  const pageSummary = useMemo(() => {
    const project = projects.find((item) => activeId === `project-${item.slug}`)
    if (project) {
      return {
        title: `${project.title} case study`,
        description: project.description,
      }
    }

    const summaries = {
      about: {
        title: "About Vincent Paul Dumangcas",
        description: "Background, current focus, and links for Vincent Paul Dumangcas.",
      },
      blog: {
        title: "Vincent's build log",
        description: "Notes from the three projects currently featured in this portfolio.",
      },
      contact: {
        title: "Contact Vincent Paul Dumangcas",
        description: "Email and professional links for project inquiries and opportunities.",
      },
      experience: {
        title: "Education and experience",
        description: "Vincent's education, project-building timeline, and current direction.",
      },
      help: {
        title: "Portfolio help and shortcuts",
        description: "Guidance for navigating the desktop, Search, and Terminal.",
      },
      settings: {
        title: "Portfolio display settings",
        description: "Theme, palette, brightness, and personalized wallpaper controls.",
      },
      terminal: {
        title: "Portfolio terminal",
        description: "A command-line interface for opening apps and reading portfolio files.",
      },
      works: {
        title: "Selected works and projects",
        description: "Project highlights, build decisions, and a compact delivery timeline.",
      },
    }

    return (
      summaries[activeId] ?? {
        title: "Vincent Paul Dumangcas portfolio desktop",
        description:
          "Selected full-stack projects, education, current focus, technical stack, and contact information.",
      }
    )
  }, [activeId])

  const syncRoute = (id, method = "push") => {
    const route = id ? routeForId(id) : "/"
    if (window.location.pathname === route) return
    window.history[method === "replace" ? "replaceState" : "pushState"]({}, "", route)
  }

  const showToast = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(""), 2200)
  }

  const focusApp = (id, updateRoute = true) => {
    if (!windows[id]) return
    zRef.current += 1
    setDesktop((current) => {
      const item = current.windows[id]
      const geometry =
        window.innerWidth > 640 && !item.maximized
          ? clampPosition(id, item.x, item.y, item.width, item.height)
          : {}
      return {
        windows: {
          ...current.windows,
          [id]: {
            ...item,
            ...geometry,
            isOpen: true,
            minimized: false,
            z: zRef.current,
          },
        },
        activeId: id,
      }
    })
    if (updateRoute) syncRoute(id)
  }

  const openApp = (id, updateRoute = true) => {
    if (!appMeta[id]) return
    focusApp(id, updateRoute)
    setActiveMenu(null)
    setDisplayOpen(false)
    setStatsOpen(false)
  }

  const closeApp = (id) => {
    setDesktop((current) => {
      const nextWindows = {
        ...current.windows,
        [id]: { ...current.windows[id], isOpen: false, minimized: false, maximized: false },
      }
      const nextActive =
        current.activeId === id ? topVisibleId(nextWindows, id) : current.activeId
      return { windows: nextWindows, activeId: nextActive }
    })
  }

  const closeAll = () => {
    setDesktop((current) => ({
      activeId: current.activeId === "terminal" ? "terminal" : null,
      windows: Object.fromEntries(
        Object.entries(current.windows).map(([id, state]) => [
          id,
          {
            ...state,
            isOpen: id === "terminal" && current.activeId === "terminal",
            minimized: false,
            maximized: false,
          },
        ]),
      ),
    }))
  }

  const minimizeApp = (id) => {
    const isRestoring = Boolean(windows[id]?.minimized)
    if (isRestoring) zRef.current += 1
    setDesktop((current) => {
      const willMinimize = !current.windows[id].minimized
      const nextWindows = {
        ...current.windows,
        [id]: {
          ...current.windows[id],
          minimized: willMinimize,
          z: willMinimize ? current.windows[id].z : zRef.current,
        },
      }
      const nextActive = willMinimize
        ? topVisibleId(nextWindows, id)
        : id
      return { windows: nextWindows, activeId: nextActive }
    })
  }

  const maximizeApp = (id) => {
    zRef.current += 1
    setDesktop((current) => ({
      windows: {
        ...current.windows,
        [id]: {
          ...current.windows[id],
          minimized: false,
          maximized: !current.windows[id].maximized,
          z: zRef.current,
        },
      },
      activeId: id,
    }))
  }

  const moveApp = (id, position) => {
    setDesktop((current) => {
      const item = current.windows[id]
      const next = clampPosition(id, position.x, position.y, item.width, item.height)
      return {
        ...current,
        windows: { ...current.windows, [id]: { ...item, x: next.x, y: next.y } },
      }
    })
  }

  const resizeApp = (id, size) => {
    setDesktop((current) => {
      const item = current.windows[id]
      const next = clampPosition(id, item.x, item.y, size.width, size.height)
      return {
        ...current,
        windows: {
          ...current.windows,
          [id]: { ...item, ...next },
        },
      }
    })
  }

  const centerActiveWindow = () => {
    if (!activeId) return
    setDesktop((current) => {
      const item = current.windows[activeId]
      const x = Math.max(8, (window.innerWidth - item.width) / 2)
      const y = Math.max(8, (window.innerHeight - 36 - 76 - item.height) / 2)
      return {
        ...current,
        windows: {
          ...current.windows,
          [activeId]: { ...item, x, y, maximized: false },
        },
      }
    })
    setActiveMenu(null)
  }

  const resetDesktop = () => {
    window.localStorage.removeItem(STORAGE_KEY)
    const next = createInitialDesktop()
    for (const id of Object.keys(next.windows)) {
      next.windows[id].isOpen = false
      next.windows[id].minimized = false
      next.windows[id].maximized = false
    }
    next.activeId = null
    setDesktop(next)
    setMode("light")
    setPalette("moss")
    setWallpaper("solid")
    setBrightness(100)
    syncRoute(null, "replace")
    setActiveMenu(null)
    showToast("Desktop reset")
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      showToast("Email copied")
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      showToast(EMAIL)
    }
  }

  const renderApp = (id) => {
    if (id === "about") return <AboutApp openApp={openApp} />
    if (id === "works") return <WorksApp openApp={openApp} />
    if (id === "blog") return <BlogApp openApp={openApp} />
    if (id === "experience") return <ExperienceApp />
    if (id === "contact") {
      return (
        <ContactApp
          copyEmail={copyEmail}
          copied={copied}
          showToast={showToast}
        />
      )
    }
    if (id === "settings") {
      return (
        <SettingsApp
          mode={mode}
          setMode={setMode}
          palette={palette}
          setPalette={setPalette}
          wallpaper={wallpaper}
          setWallpaper={setWallpaper}
          brightness={brightness}
          setBrightness={setBrightness}
        />
      )
    }
    if (id === "help") return <HelpApp />
    if (id === "terminal") {
      return (
        <TerminalApp
          openApp={openApp}
          closeApp={closeApp}
          closeAll={closeAll}
          openWindows={Object.entries(windows)
            .filter(([, item]) => item.isOpen)
            .map(([windowId]) => windowId)}
        />
      )
    }
    if (id === "about-file") {
      return <TextFileApp initialValue={aboutText} label="about text" />
    }
    if (id === "build-log-file") {
      return <TextFileApp initialValue={buildLogText} label="build log" />
    }

    const project = projects.find((item) => id.endsWith(item.slug))
    if (id.startsWith("folder-") && project) {
      return <FolderApp project={project} openApp={openApp} />
    }
    if (id.startsWith("project-") && project) {
      return <ProjectDetailApp project={project} />
    }
    return null
  }

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 520)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const persisted = {
      windows,
      activeId,
      mode,
      palette,
      wallpaper,
      wallpaperVersion: 2,
      brightness,
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted))
    } catch {
      // The portfolio remains fully usable when storage is blocked or unavailable.
    }
  }, [windows, activeId, mode, palette, wallpaper, brightness])

  useEffect(() => {
    const meta = activeId ? appMeta[activeId] : null
    document.title = meta
      ? `${meta.label} | Vincent Paul Dumangcas`
      : "Vincent Paul Dumangcas | Full-Stack Developer"
  }, [activeId])

  useEffect(() => {
    const route = activeId ? routeForId(activeId) : "/"
    if (window.location.pathname !== route) {
      window.history.replaceState({}, "", route)
    }
  }, [activeId])

  useEffect(() => {
    const onPopState = () => {
      const id = idFromPath(window.location.pathname)
      if (id) {
        openApp(id, false)
      } else {
        setDesktop((current) => ({ ...current, activeId: null }))
      }
    }
    window.addEventListener("popstate", onPopState)
    return () => window.removeEventListener("popstate", onPopState)
  })

  useEffect(() => {
    const onPointerDown = (event) => {
      if (!event.target.closest(".menu-cluster")) setActiveMenu(null)
      if (!event.target.closest(".display-cluster")) setDisplayOpen(false)
      if (!event.target.closest(".stats-cluster")) setStatsOpen(false)
    }
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveMenu(null)
        setDisplayOpen(false)
        setStatsOpen(false)
        setSearchOpen(false)
      }
      if (!(event.ctrlKey && event.altKey)) return
      const key = event.key.toLowerCase()
      if (["w", "f", "m", "c", "r"].includes(key)) event.preventDefault()
      if (key === "w" && activeId) closeApp(activeId)
      if (key === "f" && activeId) maximizeApp(activeId)
      if (key === "m" && activeId) minimizeApp(activeId)
      if (key === "c") centerActiveWindow()
      if (key === "r") resetDesktop()
    }
    window.addEventListener("pointerdown", onPointerDown)
    window.addEventListener("keydown", onKeyDown)
    return () => {
      window.removeEventListener("pointerdown", onPointerDown)
      window.removeEventListener("keydown", onKeyDown)
    }
  })

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth <= 640) return
      setDesktop((current) => ({
        ...current,
        windows: Object.fromEntries(
          Object.entries(current.windows).map(([id, item]) => {
            if (item.maximized) return [id, item]
            const next = clampPosition(id, item.x, item.y, item.width, item.height)
            return [id, { ...item, ...next }]
          }),
        ),
      }))
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  return (
    <div
      className="portfolio-os"
      data-mode={mode}
      data-palette={palette}
      data-wallpaper={wallpaper}
      style={{ "--desktop-brightness": `${brightness}%` }}
    >
      <a className="skip-link" href="#desktop-workspace">
        Skip to desktop
      </a>

      <nav className="semantic-navigation sr-only" aria-label="Primary site navigation">
        <a href="/" tabIndex="-1">Home</a>
        <a href="/about" tabIndex="-1">About</a>
        <a href="/works" tabIndex="-1">Works</a>
        <a href="/blog" tabIndex="-1">Blog</a>
        <a href="/contact" tabIndex="-1">Contact</a>
        <a href="/terminal" tabIndex="-1">Terminal</a>
        <a href="/help" tabIndex="-1">Help</a>
      </nav>

      <header className="menu-bar">
        <div className="menu-bar-left">
          <div className="stats-cluster">
            <button
              type="button"
              className="menu-logo"
              aria-label="Open portfolio stats"
              aria-expanded={statsOpen}
              onClick={() => {
                setStatsOpen((current) => !current)
                setActiveMenu(null)
                setDisplayOpen(false)
              }}
            >
              VP
            </button>
            {statsOpen ? (
              <div className="stats-popover">
                <span>VINCENT PAUL DUMANGCAS</span>
                <dl>
                  <div><dt>Selected builds</dt><dd>03</dd></div>
                  <div><dt>Base</dt><dd>Cebu, PH</dd></div>
                  <div><dt>Status</dt><dd>Open to work</dd></div>
                </dl>
              </div>
            ) : null}
          </div>

          <div className="menu-cluster">
            <button
              type="button"
              className={activeMenu === "portfolio" ? "is-active" : ""}
              aria-expanded={activeMenu === "portfolio"}
              onClick={() =>
                setActiveMenu((current) => (current === "portfolio" ? null : "portfolio"))
              }
              onMouseEnter={() => activeMenu && setActiveMenu("portfolio")}
            >
              Portfolio
            </button>
            {activeMenu === "portfolio" ? (
              <div className="menu-popover portfolio-menu" role="menu">
                <button type="button" role="menuitem" onClick={() => openApp("about")}>
                  About Vincent
                </button>
                <button type="button" role="menuitem" onClick={() => openApp("contact")}>
                  Contact
                </button>
                <button type="button" role="menuitem" onClick={() => openApp("help")}>
                  Portfolio Guide
                </button>
                <button type="button" role="menuitem" onClick={() => openApp("settings")}>
                  Settings
                </button>
                <span className="menu-separator" />
                <button type="button" role="menuitem" onClick={resetDesktop}>
                  Reset Desktop
                </button>
              </div>
            ) : null}
          </div>

          <div className="menu-cluster file-menu-cluster">
            <button
              type="button"
              className={activeMenu === "file" ? "is-active" : ""}
              aria-expanded={activeMenu === "file"}
              onClick={() => setActiveMenu((current) => (current === "file" ? null : "file"))}
              onMouseEnter={() => activeMenu && setActiveMenu("file")}
            >
              File
            </button>
            {activeMenu === "file" ? (
              <div className="menu-popover" role="menu">
                <button type="button" role="menuitem" onClick={() => openApp("about-file")}>
                  <span>Open about.txt</span>
                </button>
                <button type="button" role="menuitem" onClick={() => openApp("works")}>
                  <span>Open Works</span>
                </button>
                <span className="menu-separator" />
                <button
                  type="button"
                  role="menuitem"
                  disabled={!activeId}
                  onClick={() => activeId && closeApp(activeId)}
                >
                  <span>Close Window</span>
                  <kbd>Ctrl+Alt+W</kbd>
                </button>
              </div>
            ) : null}
          </div>

          <div className="menu-cluster">
            <button
              type="button"
              className={activeMenu === "view" ? "is-active" : ""}
              aria-expanded={activeMenu === "view"}
              onClick={() => setActiveMenu((current) => (current === "view" ? null : "view"))}
              onMouseEnter={() => activeMenu && setActiveMenu("view")}
            >
              View
            </button>
            {activeMenu === "view" ? (
              <div className="menu-popover" role="menu">
                <button type="button" role="menuitem" onClick={resetDesktop}>
                  <span>Refresh</span>
                  <kbd>Ctrl+Alt+R</kbd>
                </button>
                <button
                  type="button"
                  role="menuitem"
                  disabled={!activeId}
                  onClick={() => activeId && maximizeApp(activeId)}
                >
                  <span>Maximize</span>
                  <kbd>Ctrl+Alt+F</kbd>
                </button>
                <button
                  type="button"
                  role="menuitem"
                  disabled={!activeId}
                  onClick={() => activeId && minimizeApp(activeId)}
                >
                  <span>Minimize</span>
                  <kbd>Ctrl+Alt+M</kbd>
                </button>
                <button
                  type="button"
                  role="menuitem"
                  disabled={!activeId}
                  onClick={() => activeId && closeApp(activeId)}
                >
                  <span>Close</span>
                  <kbd>Ctrl+Alt+W</kbd>
                </button>
                <button
                  type="button"
                  role="menuitem"
                  disabled={!activeId}
                  onClick={centerActiveWindow}
                >
                  <span>Center Window</span>
                  <kbd>Ctrl+Alt+C</kbd>
                </button>
              </div>
            ) : null}
          </div>
        </div>

        <div className="menu-bar-right">
          <div className="display-cluster">
            <button
              type="button"
              className="display-button"
              aria-label="Display controls"
              aria-expanded={displayOpen}
              onClick={() => {
                setDisplayOpen((current) => !current)
                setActiveMenu(null)
                setStatsOpen(false)
              }}
            >
              {mode === "light" ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
            </button>
            {displayOpen ? (
              <div className="display-popover">
                <label>
                  <span>Brightness</span>
                  <b>{brightness}%</b>
                  <input
                    type="range"
                    min="80"
                    max="110"
                    value={brightness}
                    onChange={(event) => setBrightness(Number(event.target.value))}
                  />
                </label>
                <div className="quick-palettes" aria-label="Theme color">
                  {[
                    ["moss", "#315044"],
                    ["pine", "#17352d"],
                    ["sage", "#718675"],
                  ].map(([id, color]) => (
                    <button
                      type="button"
                      key={id}
                      aria-label={`${id} theme`}
                      aria-pressed={palette === id}
                      className={palette === id ? "is-selected" : ""}
                      style={{ background: color }}
                      onClick={() => setPalette(id)}
                    />
                  ))}
                </div>
                <div className="segmented">
                  <button
                    type="button"
                    className={mode === "light" ? "is-selected" : ""}
                    onClick={() => setMode("light")}
                  >
                    Light
                  </button>
                  <button
                    type="button"
                    className={mode === "dark" ? "is-selected" : ""}
                    onClick={() => setMode("dark")}
                  >
                    Dark
                  </button>
                </div>
                <button type="button" className="open-settings" onClick={() => openApp("settings")}>
                  <Settings2 aria-hidden="true" />
                  Open Settings
                </button>
              </div>
            ) : null}
          </div>

          <time dateTime={new Date().toISOString()} title={clock.full}>
            <span className="clock-date">{clock.date}</span>
            <span>{clock.time}</span>
          </time>
        </div>
      </header>

      <main id="desktop-workspace" className="desktop-workspace">
        <section className="page-summary sr-only" aria-label="Page summary">
          <h1>{pageSummary.title}</h1>
          <p>{pageSummary.description}</p>
        </section>

        <WallpaperMark />

        <nav className="desktop-files" aria-label="Desktop files">
          <ul>
            {desktopItems.map((item) => (
              <li key={`${item.id}-${item.label}`}>
                <DesktopFile item={item} onOpen={openApp} />
              </li>
            ))}
          </ul>
        </nav>

        <section className="window-layer" aria-label="Open windows">
          {Object.keys(appMeta).map((id) => (
            <WindowFrame
              key={id}
              id={id}
              state={windows[id]}
              active={activeId === id}
              onFocus={focusApp}
              onClose={closeApp}
              onMinimize={minimizeApp}
              onMaximize={maximizeApp}
              onMove={moveApp}
              onResize={resizeApp}
            >
              {renderApp(id)}
            </WindowFrame>
          ))}
        </section>

        <Dock
          openApp={openApp}
          openSearch={() => setSearchOpen(true)}
          windows={windows}
          activeId={activeId}
        />
      </main>

      {searchOpen ? <SearchDialog onClose={() => setSearchOpen(false)} openApp={openApp} /> : null}

      {toast ? (
        <div className="toast" role="status">
          {toast}
        </div>
      ) : null}

      <div className={`loading-screen ${loading ? "is-visible" : ""}`} aria-hidden={!loading}>
        <div>
          <span>LOADING WORKSPACE</span>
          <i><b /></i>
        </div>
      </div>
    </div>
  )
}

export default PortfolioPage
