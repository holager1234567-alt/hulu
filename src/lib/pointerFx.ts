import { gsap } from '@/lib/gsap'

type QuickSetter = ReturnType<typeof gsap.quickTo>

/**
 * Delegated desktop pointer effects.
 * [data-magnetic] pulls toward the pointer ([data-magnetic-inner] follows a little further).
 * [data-tilt] receives --tilt-x / --tilt-y / --glare-x / --glare-y custom properties.
 */
export function startPointerFx() {
  let magnet: HTMLElement | null = null
  let inner: HTMLElement | null = null
  let setters: QuickSetter[] = []
  let tilt: HTMLElement | null = null

  const releaseMagnet = () => {
    if (!magnet) return
    const targets = inner ? [magnet, inner] : [magnet]
    gsap.to(targets, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.42)', overwrite: true })
    magnet = null
    inner = null
    setters = []
  }

  const releaseTilt = () => {
    if (!tilt) return
    tilt.classList.remove('is-tilting')
    tilt.style.setProperty('--tilt-x', '0deg')
    tilt.style.setProperty('--tilt-y', '0deg')
    tilt = null
  }

  const onMove = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') return
    const target = event.target instanceof Element ? event.target : null

    const nextMagnet = target?.closest<HTMLElement>('[data-magnetic]') ?? null
    if (nextMagnet !== magnet) {
      releaseMagnet()
      if (nextMagnet) {
        magnet = nextMagnet
        inner = nextMagnet.querySelector<HTMLElement>('[data-magnetic-inner]')
        const opts = { duration: 0.55, ease: 'power3.out' }
        setters = [gsap.quickTo(magnet, 'x', opts), gsap.quickTo(magnet, 'y', opts)]
        if (inner) setters.push(gsap.quickTo(inner, 'x', opts), gsap.quickTo(inner, 'y', opts))
      }
    }

    if (magnet) {
      const rect = magnet.getBoundingClientRect()
      const dx = event.clientX - (rect.left + rect.width / 2)
      const dy = event.clientY - (rect.top + rect.height / 2)
      setters[0]?.(dx * 0.2)
      setters[1]?.(dy * 0.3)
      setters[2]?.(dx * 0.08)
      setters[3]?.(dy * 0.12)
    }

    const nextTilt = target?.closest<HTMLElement>('[data-tilt]') ?? null
    if (nextTilt !== tilt) {
      releaseTilt()
      tilt = nextTilt
      tilt?.classList.add('is-tilting')
    }

    if (tilt) {
      const rect = tilt.getBoundingClientRect()
      const px = (event.clientX - rect.left) / rect.width
      const py = (event.clientY - rect.top) / rect.height
      tilt.style.setProperty('--tilt-x', `${((0.5 - py) * 7).toFixed(2)}deg`)
      tilt.style.setProperty('--tilt-y', `${((px - 0.5) * 9).toFixed(2)}deg`)
      tilt.style.setProperty('--glare-x', `${(px * 100).toFixed(1)}%`)
      tilt.style.setProperty('--glare-y', `${(py * 100).toFixed(1)}%`)
    }
  }

  const onOut = (event: MouseEvent) => {
    if (event.relatedTarget) return
    releaseMagnet()
    releaseTilt()
  }

  document.addEventListener('pointermove', onMove, { passive: true })
  document.addEventListener('mouseout', onOut)

  return () => {
    document.removeEventListener('pointermove', onMove)
    document.removeEventListener('mouseout', onOut)
    releaseMagnet()
    releaseTilt()
  }
}
