import { useEffect, useRef, useState } from 'react'
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference'
import { useScrollY } from '@/hooks/useScrollMetrics'

const SCROLL_TOP_THRESHOLD = 24
const SCROLL_DELTA = 8

export function useHeaderScrollState() {
  const reducedMotion = useReducedMotionPreference()
  const scrollY = useScrollY()
  const lastScrollY = useRef(0)
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (reducedMotion) {
      setScrolled(scrollY > SCROLL_TOP_THRESHOLD)
      setVisible(true)
      return
    }

    setScrolled(scrollY > SCROLL_TOP_THRESHOLD)

    if (scrollY <= SCROLL_TOP_THRESHOLD) {
      setVisible(true)
    } else if (scrollY > lastScrollY.current + SCROLL_DELTA) {
      setVisible(false)
    } else if (scrollY < lastScrollY.current - SCROLL_DELTA) {
      setVisible(true)
    }

    lastScrollY.current = scrollY
  }, [scrollY, reducedMotion])

  return { scrolled, visible, setVisible }
}
