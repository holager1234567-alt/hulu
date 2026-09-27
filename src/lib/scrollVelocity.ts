import { gsap } from '@/lib/gsap'

let velocity = 0
let lastY = 0
let users = 0

function tick(_time: number, deltaTime: number) {
  const y = window.scrollY
  const frames = Math.max(deltaTime, 1) / 16.667
  const raw = (y - lastY) / frames
  lastY = y
  velocity += (raw - velocity) * 0.2
  if (Math.abs(velocity) < 0.002) velocity = 0
}

/** Smoothed scroll speed in px per 60fps frame (positive = scrolling down). */
export function getScrollVelocity() {
  return velocity
}

export function retainScrollVelocity() {
  if (users === 0) {
    lastY = window.scrollY
    gsap.ticker.add(tick)
  }
  users += 1

  return () => {
    users -= 1
    if (users === 0) {
      gsap.ticker.remove(tick)
      velocity = 0
    }
  }
}
