import { useLayoutEffect, useState } from 'react'
import * as m from '~/paraglide/messages'

export function ThemeSwitcher() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useLayoutEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
    setMounted(true)

    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      const stored = localStorage.getItem('theme')
      if (stored !== 'light' && stored !== 'dark') {
        const dark = mq.matches
        document.documentElement.classList.toggle('dark', dark)
        setIsDark(dark)
      }
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  function toggle() {
    const next = !isDark
    setIsDark(next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', next)
  }

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? m.theme_light() : m.theme_dark()}
      className="rounded cursor-pointer px-2 py-1 text-sm font-medium bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
      style={{ visibility: mounted ? 'visible' : 'hidden' }}
    >
      {isDark ? '☀️' : '🌚'}
    </button>
  )
}
