import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!root || !dot || !ring || !label) return

    const html = document.documentElement
    html.classList.add('has-lux-cursor')

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3.out' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3.out' })
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.42, ease: 'power3.out' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.42, ease: 'power3.out' })

    let visible = false
    let currentLabel = ''

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return

      if (!visible) {
        visible = true
        gsap.set([dot, ring], { x: event.clientX, y: event.clientY })
        root.classList.add('is-visible')
      }

      dotX(event.clientX)
      dotY(event.clientY)
      ringX(event.clientX)
      ringY(event.clientY)

      const target = event.target instanceof Element ? event.target : null
      const labelled = target?.closest<HTMLElement>('[data-cursor-label]')
      const interactive = target?.closest('a, button, [role="button"], summary')
      const nextLabel = labelled?.dataset.cursorLabel ?? ''

      root.classList.toggle('is-hover', Boolean(interactive) && !nextLabel)
      root.classList.toggle('is-on-dark', Boolean(target?.closest('[data-surface="dark"]')))

      if (nextLabel !== currentLabel) {
        currentLabel = nextLabel
        label.textContent = nextLabel
        root.classList.toggle('has-label', Boolean(nextLabel))
      }
    }

    const onDown = () => root.classList.add('is-down')
    const onUp = () => root.classList.remove('is-down')
    const onOut = (event: MouseEvent) => {
      if (event.relatedTarget) return
      visible = false
      root.classList.remove('is-visible')
    }

    document.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerdown', onDown, { passive: true })
    document.addEventListener('pointerup', onUp, { passive: true })
    document.addEventListener('mouseout', onOut)

    return () => {
      html.classList.remove('has-lux-cursor')
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('pointerup', onUp)
      document.removeEventListener('mouseout', onOut)
    }
  }, [])

  return (
    <div ref={rootRef} className="lux-cursor" aria-hidden>
      <div ref={ringRef} className="lux-cursor-ring">
        <span className="lux-cursor-ring-shape" />
        <span ref={labelRef} className="lux-cursor-label" />
      </div>
      <div ref={dotRef} className="lux-cursor-dot" />
    </div>
  )
}
