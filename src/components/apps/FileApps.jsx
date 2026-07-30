import { useState } from "react"
import { ExternalLink, File, FileCode2, FileText } from "lucide-react"

export function FolderApp({ project, openApp }) {
  const firstLink = project.links[0]
  const files = [
    {
      label: "README.md",
      type: "TEXT",
      icon: FileText,
      action: () => openApp(`project-${project.slug}`),
    },
    {
      label: "stack.json",
      type: "CODE",
      icon: FileCode2,
      action: () => openApp(`project-${project.slug}`),
    },
    {
      label: "project-notes.txt",
      type: "TEXT",
      icon: File,
      action: () => openApp(`project-${project.slug}`),
    },
    {
      label: firstLink.label.toLowerCase().replaceAll(" ", "-") + ".url",
      type: "LINK",
      icon: ExternalLink,
      href: firstLink.href,
    },
  ]

  return (
    <article className="folder-app">
      <header className="folder-heading">
        <h2>Folder Contents</h2>
        <p>{files.length} items</p>
      </header>
      <ul className="folder-list">
        {files.map((file) => {
          const Icon = file.icon
          const content = (
            <>
              <Icon aria-hidden="true" />
              <span>{file.label}</span>
              <small>{file.type}</small>
            </>
          )

          return (
            <li key={file.label}>
              {file.href ? (
                <a href={file.href} target="_blank" rel="noreferrer">
                  {content}
                </a>
              ) : (
                <button type="button" onClick={file.action}>
                  {content}
                </button>
              )}
            </li>
          )
        })}
      </ul>
      <footer>
        <span>{project.title}</span>
        <span>{project.year}</span>
      </footer>
    </article>
  )
}

export function TextFileApp({ initialValue, label }) {
  const [value, setValue] = useState(initialValue)
  return (
    <div className="text-file-app">
      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        aria-label={`Editable ${label}`}
        spellCheck="false"
      />
      <footer>
        <span>PLAIN TEXT</span>
        <span>{value.length} CHARS</span>
        <span>UTF-8</span>
      </footer>
    </div>
  )
}
