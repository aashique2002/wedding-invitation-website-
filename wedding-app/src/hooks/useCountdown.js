import { useState, useEffect, useRef } from 'react'

const TARGET = new Date('2026-11-22T07:45:00+05:30').getTime()

function calc() {
  const diff = TARGET - Date.now()
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 }
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  }
}

export function useCountdown() {
  const [time, setTime] = useState(calc)
  const [flipped, setFlipped] = useState({ d: false, h: false, m: false, s: false })
  const prev = useRef(time)

  useEffect(() => {
    const id = setInterval(() => {
      const next = calc()
      const newFlip = {}
      ;['d', 'h', 'm', 's'].forEach(k => {
        newFlip[k] = prev.current[k] !== next[k]
      })
      prev.current = next
      setTime(next)
      setFlipped(newFlip)
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return { time, flipped }
}
