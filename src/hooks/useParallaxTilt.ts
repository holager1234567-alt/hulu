import { useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useCallback, useRef, type RefObject } from 'react'

type UseParallaxTiltOptions = {
  enabled: boolean
  maxTilt?: number
}

export function useParallaxTilt({
  enabled,
  maxTilt = 12,
}: UseParallaxTiltOptions) {
  const sceneRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const spring = { stiffness: 150, damping: 24, mass: 0.6 }

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], enabled ? [maxTilt * 0.65, -maxTilt * 0.65] : [0, 0]),
    spring,
  )
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], enabled ? [-maxTilt, maxTilt] : [0, 0]),
    spring,
  )
  const sphereX = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-28, 28]),
    spring,
  )
  const sphereY = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [-22, 22]),
    spring,
  )

  const updatePointer = useCallback(
    (clientX: number, clientY: number) => {
      if (!enabled || !sceneRef.current) return
      const rect = sceneRef.current.getBoundingClientRect()
      mouseX.set((clientX - rect.left) / rect.width - 0.5)
      mouseY.set((clientY - rect.top) / rect.height - 0.5)
    },
    [enabled, mouseX, mouseY],
  )

  const resetPointer = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
  }, [mouseX, mouseY])

  const onMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    updatePointer(event.clientX, event.clientY)
  }

  const onMouseLeave = () => {
    resetPointer()
  }

  const onTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0]
    if (!touch) return
    updatePointer(touch.clientX, touch.clientY)
  }

  const onTouchEnd = () => {
    resetPointer()
  }

  return {
    sceneRef: sceneRef as RefObject<HTMLDivElement>,
    rotateX,
    rotateY,
    sphereX,
    sphereY,
    onMouseMove,
    onMouseLeave,
    onTouchMove,
    onTouchEnd,
  }
}
