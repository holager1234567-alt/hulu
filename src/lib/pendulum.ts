import { gsap } from '@/lib/gsap'
import { getScrollVelocity } from '@/lib/scrollVelocity'

export type PendulumOptions = {
  /** Idle sway amplitude in degrees. */
  amplitude?: number
  /** Idle sway angular speed (rad/s). */
  speed?: number
  phase?: number
  /** How strongly scroll speed pushes the card; sign sets the swing direction. */
  wind?: number
  interactive?: boolean
}

type Body = {
  el: HTMLElement
  shadow: HTMLElement | null
  angle: number
  velocity: number
  twist: number
  twistTarget: number
  lift: number
  liftTarget: number
  amplitude: number
  speed: number
  phase: number
  wind: number
  visible: boolean
}

export const PENDULUM_KICK = 'pendulum:kick'

const STIFFNESS = 16
const DAMPING = 1.9
const bodies = new Set<Body>()
let ticking = false

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

function render(body: Body) {
  const { angle, twist, lift } = body
  body.el.style.transform = `perspective(1200px) translate3d(0, ${(-lift * 7).toFixed(2)}px, 0) rotateY(${twist.toFixed(2)}deg) rotate(${angle.toFixed(3)}deg) scale(${(1 + lift * 0.018).toFixed(4)})`
  if (body.shadow) {
    body.shadow.style.transform = `translate3d(${(angle * 1.8).toFixed(2)}px, ${(10 + lift * 12).toFixed(2)}px, 0) rotate(${(angle * 0.8).toFixed(3)}deg) scale(${(0.96 + lift * 0.05).toFixed(4)})`
    body.shadow.style.opacity = (0.55 + lift * 0.25).toFixed(3)
  }
}

function step(time: number, deltaMs: number) {
  const dt = Math.min(deltaMs, 48) / 1000
  const velocity = clamp(getScrollVelocity(), -80, 80)
  const ease = 1 - Math.exp(-dt * 7)

  bodies.forEach((body) => {
    if (!body.visible) return
    const idle =
      (Math.sin(time * body.speed + body.phase) * 0.72 +
        Math.sin(time * body.speed * 0.47 + body.phase * 1.9) * 0.28) *
      body.amplitude
    const force = -STIFFNESS * (body.angle - idle) - DAMPING * body.velocity + velocity * body.wind
    body.velocity += force * dt
    body.angle = clamp(body.angle + body.velocity * dt, -16, 16)
    body.twist += (body.twistTarget - body.twist) * ease
    body.lift += (body.liftTarget - body.lift) * ease
    render(body)
  })
}

function ensureTicker() {
  if (!ticking && bodies.size) {
    gsap.ticker.add(step)
    ticking = true
  } else if (ticking && !bodies.size) {
    gsap.ticker.remove(step)
    ticking = false
  }
}

export function attachPendulum(el: HTMLElement, shadow: HTMLElement | null, options: PendulumOptions = {}) {
  const body: Body = {
    el,
    shadow,
    angle: 0,
    velocity: 0,
    twist: 0,
    twistTarget: 0,
    lift: 0,
    liftTarget: 0,
    amplitude: options.amplitude ?? 2.6,
    speed: options.speed ?? 0.62,
    phase: options.phase ?? 0,
    wind: options.wind ?? 0.9,
    visible: false,
  }

  el.classList.add('is-physics')
  bodies.add(body)
  ensureTicker()

  const observer = new IntersectionObserver(
    ([entry]) => {
      body.visible = Boolean(entry?.isIntersecting)
    },
    { rootMargin: '120px 0px' },
  )
  observer.observe(el)

  const onKick = (event: Event) => {
    const detail = (event as CustomEvent<number>).detail
    body.velocity += typeof detail === 'number' ? detail : 40
  }

  let lastX: number | null = null
  const onEnter = () => {
    body.liftTarget = 1
  }
  const onMove = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') return
    const rect = el.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    body.twistTarget = (px - 0.5) * 16
    if (lastX !== null) body.velocity += clamp(event.clientX - lastX, -30, 30) * 0.9
    lastX = event.clientX
  }
  const onLeave = () => {
    body.liftTarget = 0
    body.twistTarget = 0
    lastX = null
  }

  el.addEventListener(PENDULUM_KICK, onKick)
  if (options.interactive !== false) {
    el.addEventListener('pointerenter', onEnter)
    el.addEventListener('pointermove', onMove, { passive: true })
    el.addEventListener('pointerleave', onLeave)
  }

  return () => {
    observer.disconnect()
    el.removeEventListener(PENDULUM_KICK, onKick)
    el.removeEventListener('pointerenter', onEnter)
    el.removeEventListener('pointermove', onMove)
    el.removeEventListener('pointerleave', onLeave)
    el.classList.remove('is-physics')
    el.style.transform = ''
    if (shadow) {
      shadow.style.transform = ''
      shadow.style.opacity = ''
    }
    bodies.delete(body)
    ensureTicker()
  }
}

export function kickPendulum(el: Element | null | undefined, impulse = 40) {
  el?.dispatchEvent(new CustomEvent(PENDULUM_KICK, { detail: impulse }))
}
