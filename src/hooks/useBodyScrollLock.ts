import { useEffect } from 'react'

let lockCount = 0
let savedScrollY = 0
let prevBodyStyles: {
  overflow: string
  paddingRight: string
  position: string
  top: string
  width: string
} | null = null

function applyBodyLock() {
  const { body } = document
  const { documentElement } = document

  savedScrollY = window.scrollY
  const scrollbarWidth = window.innerWidth - documentElement.clientWidth

  prevBodyStyles = {
    overflow: body.style.overflow,
    paddingRight: body.style.paddingRight,
    position: body.style.position,
    top: body.style.top,
    width: body.style.width,
  }

  body.style.overflow = 'hidden'
  body.style.position = 'fixed'
  body.style.top = `-${savedScrollY}px`
  body.style.width = '100%'

  if (scrollbarWidth > 0) {
    body.style.paddingRight = `${scrollbarWidth}px`
  }
}

function releaseBodyLock() {
  if (!prevBodyStyles) return

  const { body } = document

  body.style.overflow = prevBodyStyles.overflow
  body.style.paddingRight = prevBodyStyles.paddingRight
  body.style.position = prevBodyStyles.position
  body.style.top = prevBodyStyles.top
  body.style.width = prevBodyStyles.width

  window.scrollTo(0, savedScrollY)
  prevBodyStyles = null
}

export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return

    lockCount += 1
    if (lockCount === 1) {
      applyBodyLock()
    }

    return () => {
      lockCount = Math.max(0, lockCount - 1)
      if (lockCount === 0) {
        releaseBodyLock()
      }
    }
  }, [locked])
}
