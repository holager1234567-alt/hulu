import { useEffect, useState } from 'react'

const MOBILE_QUERY = '(max-width: 767px)'

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia(MOBILE_QUERY).matches
      : false,
  )

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY)
    const update = () => setIsMobile(mq.matches)
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return isMobile
}
