import { useEffect } from 'react'

export function useGsapScrollMode(active = true) {
  useEffect(() => {
    if (!active) return

    document.documentElement.classList.add('gsap-scroll-active')
    return () => document.documentElement.classList.remove('gsap-scroll-active')
  }, [active])
}
