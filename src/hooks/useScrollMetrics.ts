import { useSyncExternalStore } from 'react'

type ScrollSnapshot = {
  scrollY: number
  progress: number
}

let snapshot: ScrollSnapshot = { scrollY: 0, progress: 0 }
let rafId = 0
let subscriberCount = 0
const listeners = new Set<() => void>()

function readSnapshot(): ScrollSnapshot {
  const max = document.documentElement.scrollHeight - window.innerHeight
  return {
    scrollY: window.scrollY,
    progress: max > 0 ? window.scrollY / max : 0,
  }
}

function notify() {
  snapshot = readSnapshot()
  listeners.forEach((listener) => listener())
}

function onScroll() {
  if (rafId) return
  rafId = window.requestAnimationFrame(() => {
    rafId = 0
    notify()
  })
}

function subscribe(listener: () => void) {
  if (subscriberCount === 0) {
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    notify()
  }

  subscriberCount += 1
  listeners.add(listener)

  return () => {
    listeners.delete(listener)
    subscriberCount -= 1

    if (subscriberCount === 0) {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafId) window.cancelAnimationFrame(rafId)
      rafId = 0
    }
  }
}

function getSnapshot() {
  return snapshot
}

export function useScrollY() {
  return useSyncExternalStore(subscribe, () => getSnapshot().scrollY, () => 0)
}

export function useScrollProgress() {
  return useSyncExternalStore(subscribe, () => getSnapshot().progress, () => 0)
}
