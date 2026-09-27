import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'

let lenis: Lenis | null = null
let raf: ((time: number) => void) | null = null

export function getLenis() {
  return lenis
}

export function startSmoothScroll() {
  if (lenis) return lenis

  const instance = new Lenis({
    autoRaf: false,
    lerp: 0.09,
    smoothWheel: true,
    syncTouch: false,
    stopInertiaOnNavigate: true,
  })

  instance.on('scroll', ScrollTrigger.update)
  raf = (time: number) => instance.raf(time * 1000)
  gsap.ticker.add(raf)
  gsap.ticker.lagSmoothing(0)
  lenis = instance
  return instance
}

export function stopSmoothScroll() {
  if (raf) gsap.ticker.remove(raf)
  raf = null
  lenis?.destroy()
  lenis = null
  gsap.ticker.lagSmoothing(500, 33)
}

export function scrollToElement(target: HTMLElement, offset = 0) {
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.35 })
    return
  }

  const top = target.getBoundingClientRect().top + window.scrollY + offset
  window.scrollTo({ top, behavior: 'smooth' })
}
