import { useRef } from "react"
import "./SpotlightCard.css"

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(255, 176, 32, 0.08)",
}) {
  const ref = useRef(null)

  const handleMouseMove = (event) => {
    const node = ref.current
    if (!node) return

    const rect = node.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    node.style.setProperty("--mouse-x", `${x}px`)
    node.style.setProperty("--mouse-y", `${y}px`)
    node.style.setProperty("--spotlight-color", spotlightColor)
  }

  return (
    <div ref={ref} onMouseMove={handleMouseMove} className={`spotlight-card ${className}`}>
      {children}
    </div>
  )
}
