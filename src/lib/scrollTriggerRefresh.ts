/**
 * Coalesces ScrollTrigger.refresh calls so lazy sections mounting together
 * do not trigger a refresh storm during scroll.
 */
const pending = new Map<number, number>()
let flushRaf = 0

export function cancelScrollTriggerRefresh() {
  pending.forEach((timer) => window.clearTimeout(timer))
  pending.clear()
  if (flushRaf) {
    window.cancelAnimationFrame(flushRaf)
    flushRaf = 0
  }
}

function flushScrollTriggerRefresh() {
  if (flushRaf) return
  flushRaf = window.requestAnimationFrame(() => {
    flushRaf = 0
    void import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      ScrollTrigger.refresh()
    })
  })
}

export function scheduleScrollTriggerRefresh(delayMs = 0) {
  const queued = pending.get(delayMs)
  if (queued !== undefined) window.clearTimeout(queued)

  const timer = window.setTimeout(() => {
    pending.delete(delayMs)
    flushScrollTriggerRefresh()
  }, delayMs)

  pending.set(delayMs, timer)
}
