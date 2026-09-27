import { useEffect, useState, type RefObject } from 'react'

/** `near` latches once the element is within `nearMargin`; `visible` tracks live intersection. */
export function useViewportPresence(ref: RefObject<Element | null>, nearMargin = '480px 0px') {
  const [near, setNear] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const nearObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        setNear(true)
        nearObserver.disconnect()
      },
      { rootMargin: nearMargin },
    )
    const visibleObserver = new IntersectionObserver(([entry]) => {
      setVisible(Boolean(entry?.isIntersecting))
    })

    nearObserver.observe(el)
    visibleObserver.observe(el)
    return () => {
      nearObserver.disconnect()
      visibleObserver.disconnect()
    }
  }, [ref, nearMargin])

  return { near, visible }
}
