import { useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'

export function useSmoothAnchorScroll(enabled = true) {
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!enabled || reducedMotion) return

    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest('a[href^="#"]')
      if (!(anchor instanceof HTMLAnchorElement)) return

      const hash = anchor.getAttribute('href')
      if (!hash || hash === '#') return

      const target = document.querySelector(hash)
      if (!(target instanceof HTMLElement)) return

      event.preventDefault()

      // `gsap-scroll-active` keeps html scroll-behavior auto so ScrollTrigger's own
      // scroll writes stay instant, but user-initiated jumps should still glide.
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.history.pushState(null, '', hash)
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [enabled, reducedMotion])
}
