import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scheduleScrollTriggerRefresh } from '@/lib/scrollTriggerRefresh'

type RevealNodes = Element | Element[] | null | undefined

/** Ensures reveal targets are visible when GSAP cannot or should not animate. */
export function forceRevealVisible(...groups: RevealNodes[]) {
  const targets = groups.flatMap((group) => {
    if (!group) return []
    return Array.isArray(group) ? group : [group]
  })

  if (!targets.length) return

  gsap.set(targets, {
    opacity: 1,
    x: 0,
    y: 0,
    yPercent: 0,
    scale: 1,
    scaleX: 1,
    rotate: 0,
    clearProps: 'transform',
  })
}

/**
 * Lazy sections often mount already inside the viewport; ScrollTrigger then
 * never fires and leaves opacity-0 initial states on screen.
 */
export function bindRevealTimeline(
  timeline: gsap.core.Timeline,
  triggerEl: Element,
  options?: { fallbackMs?: number; viewportRatio?: number },
) {
  const fallbackMs = options?.fallbackMs ?? 1100
  const viewportRatio = options?.viewportRatio ?? 0.94

  const syncIfVisible = () => {
    scheduleScrollTriggerRefresh(0)
    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      const rect = triggerEl.getBoundingClientRect()
      if (rect.top < window.innerHeight * viewportRatio) {
        // Already on screen when the chunk mounts — play the entrance instead of
        // jumping to the end (which made GSAP upgrades feel invisible).
        if (timeline.progress() < 0.01) {
          timeline.play(0)
        }
      }
    })
  }

  syncIfVisible()

  const fallbackTimer = window.setTimeout(() => {
    if (timeline.progress() < 0.05) timeline.progress(1)
  }, fallbackMs)

  return () => window.clearTimeout(fallbackTimer)
}
