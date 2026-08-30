/**
 * Refreshes are keyed by delay so an immediate refresh is not cancelled by a
 * later one scheduled for a longer delay.
 */
const pending = new Map<number, number>()

export function cancelScrollTriggerRefresh() {
  pending.forEach((timer) => window.clearTimeout(timer))
  pending.clear()
}

export function scheduleScrollTriggerRefresh(delayMs = 0) {
  const queued = pending.get(delayMs)
  if (queued !== undefined) window.clearTimeout(queued)

  const timer = window.setTimeout(() => {
    pending.delete(delayMs)

    void import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      const refresh = () => ScrollTrigger.refresh()
      requestAnimationFrame(() => requestAnimationFrame(refresh))
    })
  }, delayMs)

  pending.set(delayMs, timer)
}
