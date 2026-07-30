export function Panel({ title, children, className = "" }) {
  return (
    <section className={`lined-panel ${className}`}>
      <div className="panel-label">{title}</div>
      <div className="panel-content">{children}</div>
    </section>
  )
}
