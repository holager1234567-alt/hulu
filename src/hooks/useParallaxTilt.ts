import { useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'

type UseParallaxTiltOptions = {
  enabled: boolean
  maxTilt?: number
}

function useCoarsePointer() {
  const [coarse, setCoarse] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(pointer: coarse)').matches
      : false,
  )

  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)')
    const update = () => setCoarse(mq.matches)
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return coarse
}

export function useParallaxTilt({
  enabled,
  maxTilt = 12,
}: UseParallaxTiltOptions) {
  const sceneRef = useRef<HTMLDivElement>(null)
  const coarsePointer = useCoarsePointer()
  const tiltActive = enabled && !coarsePointer
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const spring = { stiffness: 150, damping: 24, mass: 0.6 }

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], tiltActive ? [maxTilt * 0.65, -maxTilt * 0.65] : [0, 0]),
    spring,
  )
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], tiltActive ? [-maxTilt, maxTilt] : [0, 0]),
    spring,
  )
  const cursorNormX = useMotionValue(0.58)
  const cursorNormY = useMotionValue(0.42)
  const cursorSpring = { stiffness: 110, damping: 22, mass: 0.55 }

  const cursorLeft = useSpring(
    useTransform(
      cursorNormX,
      [0, 1],
      enabled ? [8, 86] : [58, 58],
    ),
    cursorSpring,
  )
  const cursorTop = useSpring(
    useTransform(
      cursorNormY,
      [0, 1],
      enabled ? [14, 88] : [42, 42],
    ),
    cursorSpring,
  )

  const updatePointer = useCallback(
    (clientX: number, clientY: number) => {
      if (!tiltActive || !sceneRef.current) return
      const rect = sceneRef.current.getBoundingClientRect()
      mouseX.set((clientX - rect.left) / rect.width - 0.5)
      mouseY.set((clientY - rect.top) / rect.height - 0.5)
    },
    [tiltActive, mouseX, mouseY],
  )

  const resetPointer = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
  }, [mouseX, mouseY])

  useEffect(() => {
    const node = sceneRef.current
    if (!node || !tiltActive) return

    const onMouseMove = (event: MouseEvent) => {
      updatePointer(event.clientX, event.clientY)
    }

    const onMouseLeave = () => {
      resetPointer()
    }

    node.addEventListener('mousemove', onMouseMove, { passive: true })
    node.addEventListener('mouseleave', onMouseLeave, { passive: true })

    return () => {
      node.removeEventListener('mousemove', onMouseMove)
      node.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [tiltActive, updatePointer, resetPointer])

  useEffect(() => {
    if (!enabled) return

    const syncCursor = (clientX: number, clientY: number) => {
      cursorNormX.set(clientX / window.innerWidth)
      cursorNormY.set(clientY / window.innerHeight)
    }

    const onMouseMove = (event: MouseEvent) => {
      syncCursor(event.clientX, event.clientY)
    }

    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0]
      if (touch) syncCursor(touch.clientX, touch.clientY)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [enabled, cursorNormX, cursorNormY])

  return {
    sceneRef: sceneRef as RefObject<HTMLDivElement>,
    rotateX,
    rotateY,
    cursorLeft,
    cursorTop,
    tiltActive,
  }
}
