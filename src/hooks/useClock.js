import { useEffect, useMemo, useState } from "react"

export function useClock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  return useMemo(() => {
    const parts = new Intl.DateTimeFormat("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Manila",
    }).formatToParts(now)
    const value = (type) =>
      parts.find((part) => part.type === type)?.value ?? ""

    return {
      date: `${value("weekday")} ${value("day")} ${value("month")}`,
      time: `${value("hour")}:${value("minute")} PHT`,
      full: new Intl.DateTimeFormat("en-PH", {
        dateStyle: "full",
        timeStyle: "medium",
        timeZone: "Asia/Manila",
      }).format(now),
    }
  }, [now])
}
