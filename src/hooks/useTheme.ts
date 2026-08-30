import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export function useTheme() {
  // Read synchronously: index.html already applied the class before first paint.
  const [dark, setDark] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.localStorage.getItem('hulu-theme') === 'dark',
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const toggle = () => {
    setDark((prev) => {
      const next = !prev
      document.documentElement.classList.toggle('dark', next)
      localStorage.setItem('hulu-theme', next ? 'dark' : 'light')
      return next
    })
  }

  return { dark, toggle, Icon: dark ? Sun : Moon }
}
