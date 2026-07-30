import { Panel } from "./Panel.jsx"

export function SettingsApp({
  mode,
  setMode,
  palette,
  setPalette,
  wallpaper,
  setWallpaper,
  brightness,
  setBrightness,
}) {
  const paletteOptions = [
    { id: "moss", label: "Moss", color: "#315044" },
    { id: "pine", label: "Pine", color: "#17352d" },
    { id: "sage", label: "Sage", color: "#718675" },
  ]

  return (
    <article className="settings-app">
      <header className="app-intro">
        <h2>Settings</h2>
      </header>

      <Panel title="APPEARANCE">
        <div className="setting-row">
          <span>Theme mode</span>
          <div className="segmented">
            <button
              type="button"
              className={mode === "light" ? "is-selected" : ""}
              aria-pressed={mode === "light"}
              onClick={() => setMode("light")}
            >
              Light
            </button>
            <button
              type="button"
              className={mode === "dark" ? "is-selected" : ""}
              aria-pressed={mode === "dark"}
              onClick={() => setMode("dark")}
            >
              Dark
            </button>
          </div>
        </div>
        <div className="setting-row">
          <span>Theme color</span>
          <div className="palette-options">
            {paletteOptions.map((option) => (
              <button
                type="button"
                key={option.id}
                className={palette === option.id ? "is-selected" : ""}
                aria-pressed={palette === option.id}
                onClick={() => setPalette(option.id)}
              >
                <i style={{ background: option.color }} />
                {option.label}
              </button>
            ))}
          </div>
        </div>
        <label className="brightness-setting">
          <span>Brightness</span>
          <input
            type="range"
            min="80"
            max="110"
            value={brightness}
            onChange={(event) => setBrightness(Number(event.target.value))}
          />
          <b>{brightness}%</b>
        </label>
      </Panel>

      <Panel title="WALLPAPER">
        <p className="setting-help">
          Choose the sunrise landscape, a flat desktop, a subtle grid, or Vincent&apos;s archive photo.
        </p>
        <div className="wallpaper-options">
          {[
            { id: "nature", label: "Golden hills" },
            { id: "solid", label: "Solid moss" },
            { id: "grid", label: "System grid" },
            { id: "photo", label: "VPD archive" },
          ].map((option) => (
            <button
              type="button"
              key={option.id}
              className={[
                `wallpaper-preview preview-${option.id}`,
                wallpaper === option.id ? "is-selected" : "",
              ].join(" ")}
              aria-pressed={wallpaper === option.id}
              onClick={() => setWallpaper(option.id)}
            >
              <span aria-hidden="true" />
              <small>{option.label}</small>
            </button>
          ))}
        </div>
      </Panel>
    </article>
  )
}

export function HelpApp() {
  return (
    <article className="help-app">
      <header className="app-intro">
        <h2>Portfolio Guide</h2>
        <p>
          This is a desktop-style portfolio. Open apps in draggable windows, browse project
          folders, search the workspace, or use commands in Terminal.
        </p>
      </header>

      <section>
        <h3>How To Open Apps</h3>
        <ul>
          <li>Click app icons in the bottom dock to open or focus a window.</li>
          <li>Open the folders and text files on the desktop to inspect Vincent&apos;s work.</li>
          <li>Use Search to find an app, project, skill, or contact link.</li>
          <li>Use Terminal commands for keyboard-driven navigation.</li>
        </ul>
      </section>

      <section>
        <h3>Search</h3>
        <p>Try: <code>show projects</code> <i>|</i> <code>open contact</code> <i>|</i>{" "}
          <code>find React</code> <i>|</i> <code>about Vincent</code>
        </p>
      </section>

      <section>
        <h3>CLI Quick Start</h3>
        <p>Open Terminal and run:</p>
        <code className="command-strip">
          help apps ls open &lt;app&gt; close &lt;app&gt; windows man &lt;command&gt;
        </code>
      </section>
    </article>
  )
}
