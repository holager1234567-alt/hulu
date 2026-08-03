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

      const useNativeSmooth =
        !document.documentElement.classList.contains('gsap-scroll-active')

      target.scrollIntoView({
        behavior: useNativeSmooth ? 'smooth' : 'auto',
        block: 'start',
      })
      window.history.pushState(null, '', hash)
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [enabled, reducedMotion])
}
