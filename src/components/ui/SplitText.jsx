import { useEffect, useRef, useState } from "react"

function useInViewOnce(delay) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || visible) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        window.setTimeout(() => setVisible(true), delay)
        observer.unobserve(node)
      },
      { threshold: 0.2 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [delay, visible])

  return [ref, visible]
}

export default function SplitText({
  text,
  as: Tag = "p",
  className = "",
  splitBy = "words",
  delay = 0,
  stagger = 32,
}) {
  const [ref, visible] = useInViewOnce(delay)
  const parts =
    splitBy === "chars"
      ? Array.from(text)
      : text.split(/(\s+)/).filter((part) => part.length > 0)

  return (
    <Tag ref={ref} className={`split-text ${className}`}>
      {parts.map((part, index) => {
        const isWhitespace = /^\s+$/.test(part)

        if (isWhitespace) {
          return <span key={`space-${index}`}>{part}</span>
        }

        return (
          <span
            key={`${part}-${index}`}
            className={`split-text-piece ${visible ? "is-visible" : ""}`}
            style={{ transitionDelay: `${index * stagger}ms` }}
          >
            {part}
          </span>
        )
      })}
    </Tag>
  )
}
