"use client"

import { useEffect, useRef, useState } from "react"

interface AnimatedCounterProps {
  target: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
  formatter?: (val: number) => string
}

export function AnimatedCounter({
  target,
  duration = 1500,
  prefix = "",
  suffix = "",
  className = "",
  formatter,
}: AnimatedCounterProps) {
  const [current, setCurrent] = useState(0)
  const startTimeRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)
  const hasStarted = useRef(false)

  useEffect(() => {
    const element = document.createElement("div")
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true
          const animate = (timestamp: number) => {
            if (!startTimeRef.current) startTimeRef.current = timestamp
            const elapsed = timestamp - startTimeRef.current
            const progress = Math.min(elapsed / duration, 1)
            const ease = 1 - Math.pow(1 - progress, 3)
            setCurrent(Math.round(ease * target))
            if (progress < 1) {
              rafRef.current = requestAnimationFrame(animate)
            }
          }
          rafRef.current = requestAnimationFrame(animate)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(element)
    document.body.appendChild(element)
    return () => {
      observer.disconnect()
      document.body.removeChild(element)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [target, duration])

  // trigger on mount
  useEffect(() => {
    if (!hasStarted.current) {
      hasStarted.current = true
      const animate = (timestamp: number) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp
        const elapsed = timestamp - startTimeRef.current
        const progress = Math.min(elapsed / duration, 1)
        const ease = 1 - Math.pow(1 - progress, 3)
        setCurrent(Math.round(ease * target))
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate)
        }
      }
      const timer = setTimeout(() => {
        rafRef.current = requestAnimationFrame(animate)
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [])

  const display = formatter ? formatter(current) : current.toLocaleString("en-IN")

  return (
    <span className={className}>
      {prefix}{display}{suffix}
    </span>
  )
}
