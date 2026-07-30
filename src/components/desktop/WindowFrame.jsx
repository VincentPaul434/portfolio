import { useRef } from "react"
import { Minus, Square, X } from "lucide-react"
import { appMeta } from "../../config/desktopConfig.jsx"

export function WindowFrame({
  id,
  state,
  active,
  children,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onMove,
  onResize,
}) {
  const meta = appMeta[id]
  const interactionRef = useRef(null)

  const beginInteraction = (kind) => (event) => {
    if (event.button !== 0 || state.maximized || window.innerWidth <= 640) return
    event.preventDefault()
    event.stopPropagation()
    onFocus(id)
    event.currentTarget.setPointerCapture(event.pointerId)
    interactionRef.current = {
      kind,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      x: state.x,
      y: state.y,
      width: state.width,
      height: state.height,
    }
  }

  const continueInteraction = (event) => {
    const interaction = interactionRef.current
    if (!interaction || event.pointerId !== interaction.pointerId) return
    const deltaX = event.clientX - interaction.startX
    const deltaY = event.clientY - interaction.startY

    if (interaction.kind === "move") {
      onMove(id, {
        x: interaction.x + deltaX,
        y: interaction.y + deltaY,
      })
      return
    }

    onResize(id, {
      width:
        interaction.kind === "height"
          ? interaction.width
          : interaction.width + deltaX,
      height:
        interaction.kind === "width"
          ? interaction.height
          : interaction.height + deltaY,
    })
  }

  const endInteraction = (event) => {
    if (interactionRef.current?.pointerId !== event.pointerId) return
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    interactionRef.current = null
  }

  const pointerHandlers = (kind) => ({
    onPointerDown: beginInteraction(kind),
    onPointerMove: continueInteraction,
    onPointerUp: endInteraction,
    onPointerCancel: endInteraction,
  })

  if (!state.isOpen) return null

  return (
    <article
      className={[
        "os-window",
        active ? "is-active" : "",
        state.minimized ? "is-minimized" : "",
        state.maximized ? "is-maximized" : "",
        `window-${id.replaceAll(" ", "-")}`,
      ]
        .filter(Boolean)
        .join(" ")}
      style={
        state.maximized
          ? { zIndex: state.z }
          : {
              left: `${state.x}px`,
              top: `${state.y}px`,
              width: `${state.width}px`,
              height: state.minimized ? "40px" : `${state.height}px`,
              zIndex: state.z,
            }
      }
      onPointerDown={() => onFocus(id)}
      onFocusCapture={() => {
        if (!active && !state.minimized) onFocus(id)
      }}
      aria-label={meta.label}
    >
      <header
        className="window-titlebar"
        {...pointerHandlers("move")}
        onDoubleClick={() => onMaximize(id)}
      >
        <span className="window-title">{meta.label}</span>
        <span className="window-title-spacer" />
        {active ? <span className="active-diamond" aria-hidden="true" /> : null}
        {meta.meta ? <span className="window-meta">{meta.meta}</span> : null}
        <nav className="window-controls" aria-label={`${meta.label} window controls`}>
          <button
            type="button"
            className="window-control control-minimize"
            aria-label={`${state.minimized ? "Restore" : "Minimize"} ${meta.label}`}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation()
              onMinimize(id)
            }}
          >
            <Minus aria-hidden="true" />
          </button>
          <button
            type="button"
            className="window-control control-maximize"
            aria-label={`${state.maximized ? "Restore" : "Expand"} ${meta.label}`}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation()
              onMaximize(id)
            }}
          >
            <Square aria-hidden="true" />
          </button>
          <button
            type="button"
            className="window-control control-close"
            aria-label={`Close ${meta.label}`}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation()
              onClose(id)
            }}
          >
            <X aria-hidden="true" />
          </button>
        </nav>
      </header>

      <div className="window-body" hidden={state.minimized}>
        {children}
      </div>

      {!state.minimized && !state.maximized ? (
        <>
          <span
            className="resize-handle resize-width"
            aria-hidden="true"
            {...pointerHandlers("width")}
          />
          <span
            className="resize-handle resize-height"
            aria-hidden="true"
            {...pointerHandlers("height")}
          />
          <span
            className="resize-handle resize-corner"
            aria-hidden="true"
            {...pointerHandlers("both")}
          >
            <i />
            <i />
            <i />
          </span>
        </>
      ) : null}
    </article>
  )
}
