import { STORAGE_KEY } from "../config/appConfig.js"
import { appMeta } from "../config/desktopConfig.jsx"

export function idFromPath(pathname) {
  if (pathname === "/" || pathname === "") return null
  const direct = Object.values(appMeta).find((item) => item.route === pathname)
  return direct?.id ?? null
}

export function routeForId(id) {
  return appMeta[id]?.route ?? "/"
}

export function createWindowState(meta) {
  return {
    x: meta.x,
    y: meta.y,
    width: meta.width,
    height: meta.height,
    isOpen: false,
    minimized: false,
    maximized: false,
    z: 1,
  }
}

export function readSavedDesktop() {
  if (typeof window === "undefined") return null
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "null")
  } catch {
    return null
  }
}

export function createInitialDesktop() {
  const saved = readSavedDesktop()
  const windows = Object.fromEntries(
    Object.entries(appMeta).map(([id, meta]) => {
      const base = createWindowState(meta)
      const persisted = saved?.windows?.[id]
      const restored = persisted
        ? {
            ...base,
            x: Number.isFinite(persisted.x) ? persisted.x : base.x,
            y: Number.isFinite(persisted.y) ? persisted.y : base.y,
            width: Number.isFinite(persisted.width) ? persisted.width : base.width,
            height: Number.isFinite(persisted.height) ? persisted.height : base.height,
            isOpen: Boolean(persisted.isOpen),
            minimized: Boolean(persisted.minimized),
            maximized: Boolean(persisted.maximized),
            z: Number.isFinite(persisted.z) ? persisted.z : base.z,
          }
        : base
      const geometry =
        typeof window !== "undefined" && window.innerWidth > 640
          ? clampPosition(id, restored.x, restored.y, restored.width, restored.height)
          : {}
      return [
        id,
        { ...restored, ...geometry },
      ]
    }),
  )

  const routeId = typeof window === "undefined" ? null : idFromPath(window.location.pathname)
  let activeId = saved?.activeId && windows[saved.activeId]?.isOpen ? saved.activeId : null

  if (routeId && windows[routeId]) {
    const nextZ = Math.max(2, ...Object.values(windows).map((item) => item.z)) + 1
    windows[routeId] = {
      ...windows[routeId],
      isOpen: true,
      minimized: false,
      z: nextZ,
    }
    activeId = routeId
  }

  return { windows, activeId }
}

export function topVisibleId(windows, excludedId) {
  return (
    Object.entries(windows)
      .filter(
        ([id, item]) => id !== excludedId && item.isOpen && !item.minimized,
      )
      .sort((a, b) => b[1].z - a[1].z)[0]?.[0] ?? null
  )
}

export function clampPosition(id, x, y, width, height) {
  const meta = appMeta[id]
  const workspaceWidth = window.innerWidth
  const workspaceHeight = window.innerHeight - 36
  const maxWidth = Math.max(1, workspaceWidth - 16)
  const maxHeight = Math.max(40, workspaceHeight - 88)
  const minWidth = Math.min(meta.minWidth, maxWidth)
  const minHeight = Math.min(meta.minHeight, maxHeight)
  const nextWidth = Math.min(maxWidth, Math.max(minWidth, width))
  const nextHeight = Math.min(maxHeight, Math.max(minHeight, height))
  return {
    x: Math.min(Math.max(8, x), Math.max(8, workspaceWidth - nextWidth - 8)),
    y: Math.min(Math.max(8, y), Math.max(8, workspaceHeight - nextHeight - 76)),
    width: nextWidth,
    height: nextHeight,
  }
}
