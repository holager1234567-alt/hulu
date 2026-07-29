import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export function useTheme() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('hulu-theme')
    const isDark = stored === 'dark'
    setDark(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

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
