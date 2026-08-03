import { useEffect, useRef, useState } from 'react'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'

const SCROLL_TOP_THRESHOLD = 24
const SCROLL_DELTA = 8

export function useHeaderScrollState() {
  const reducedMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const lastScrollY = useRef(0)
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)

  useMotionValueEvent(scrollY, 'change', (currentScrollY) => {
    if (reducedMotion) {
      setScrolled(currentScrollY > SCROLL_TOP_THRESHOLD)
      setVisible(true)
      return
    }

    setScrolled(currentScrollY > SCROLL_TOP_THRESHOLD)

    if (currentScrollY <= SCROLL_TOP_THRESHOLD) {
      setVisible(true)
    } else if (currentScrollY > lastScrollY.current + SCROLL_DELTA) {
      setVisible(false)
    } else if (currentScrollY < lastScrollY.current - SCROLL_DELTA) {
      setVisible(true)
    }

    lastScrollY.current = currentScrollY
  })

  useEffect(() => {
    const initial = scrollY.get()
    lastScrollY.current = initial
    setScrolled(initial > SCROLL_TOP_THRESHOLD)
  }, [scrollY])

  return { scrolled, visible, setVisible }
}
