import { useEffect } from 'react'
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference'
import { scrollToElement } from '@/lib/smoothScroll'

export function useSmoothAnchorScroll(enabled = true) {
  const reducedMotion = useReducedMotionPreference()

  useEffect(() => {
    if (!enabled || reducedMotion) return

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const anchor = (event.target as Element | null)?.closest('a[href^="#"]')
      if (!(anchor instanceof HTMLAnchorElement)) return

      const hash = anchor.getAttribute('href')
      if (!hash || hash === '#') return

      const target = document.querySelector(hash)
      if (!(target instanceof HTMLElement)) return

      event.preventDefault()
      const margin = Number.parseFloat(window.getComputedStyle(target).scrollMarginTop) || 0
      scrollToElement(target, -margin)
      window.history.pushState(null, '', hash)
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [enabled, reducedMotion])
}
