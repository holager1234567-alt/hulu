import { useEffect, useRef, type ReactNode } from 'react'

import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference'
import { attachPendulum, type PendulumOptions } from '@/lib/pendulum'
import { cn } from '@/lib/utils'

type PinnedCardProps = {
  as?: 'li' | 'div'
  className?: string
  bodyClassName?: string
  physics?: PendulumOptions
  children: ReactNode
}

/** Cream card hung from the signature nail; sways like a real pendulum. */
export function PinnedCard({ as: Tag = 'div', className, bodyClassName, physics, children }: PinnedCardProps) {
  const bodyRef = useRef<HTMLDivElement>(null)
  const shadowRef = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotionPreference()
  const options = useRef(physics)

  useEffect(() => {
    if (reduced || !bodyRef.current) return
    return attachPendulum(bodyRef.current, shadowRef.current, options.current)
  }, [reduced])

  return (
    <Tag className={cn('pin-card', className)}>
      <span ref={shadowRef} className="pin-card-shadow" aria-hidden />
      <div ref={bodyRef} className={cn('pin-card-body', bodyClassName)}>
        {children}
      </div>
      <img
        src="/images/editorial-nail.png"
        alt=""
        className="editorial-value-card-nail pin-card-nail"
        aria-hidden
        width={232}
        height={281}
        decoding="async"
      />
    </Tag>
  )
}
