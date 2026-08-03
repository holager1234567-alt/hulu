import { useEffect } from 'react'

let lockCount = 0
let savedScrollY = 0
let prevOverflow = ''
let prevPaddingRight = ''

function applyBodyLock() {
  const { body } = document
  const { documentElement } = document

  savedScrollY = window.scrollY
  prevOverflow = body.style.overflow
  prevPaddingRight = body.style.paddingRight

  const scrollbarWidth = window.innerWidth - documentElement.clientWidth
  body.style.overflow = 'hidden'

  if (scrollbarWidth > 0) {
    body.style.paddingRight = `${scrollbarWidth}px`
  }
}

function releaseBodyLock() {
  const { body } = document

  body.style.overflow = prevOverflow
  body.style.paddingRight = prevPaddingRight
  window.scrollTo(0, savedScrollY)
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
