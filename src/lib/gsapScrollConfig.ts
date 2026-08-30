import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let configured = false

/** One-time ScrollTrigger tuning for smoother scrolling with many sections. */
export function configureGsapScroll() {
  if (configured || typeof window === 'undefined') return
  configured = true

  gsap.registerPlugin(ScrollTrigger)

  ScrollTrigger.config({
    limitCallbacks: true,
    ignoreMobileResize: true,
  })
}
