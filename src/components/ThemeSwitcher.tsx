import { useState, useEffect } from 'react'

type Theme = 'system' | 'light' | 'dark'

function applyTheme(theme: Theme) {
  const isDark =
    theme === 'dark' ||
    (theme === 'system' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)

  document.documentElement.classList.toggle('dark', isDark)
}

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>('system')

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored)
    }
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      if (theme === 'system') applyTheme('system')
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [theme])

  function selectTheme(next: Theme) {
    setTheme(next)
    if (next === 'system') {
      localStorage.removeItem('theme')
    } else {
      localStorage.setItem('theme', next)
    }
    applyTheme(next)
  }

  const options: { value: Theme; label: string }[] = [
    { value: 'light', label: '☀' },
    { value: 'dark', label: '☾' },
  ]

  return (
    <div className="flex gap-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => selectTheme(opt.value)}
          className={`rounded px-2 py-1 text-sm font-medium transition-colors ${
            theme === opt.value
              ? 'bg-black text-white dark:bg-white dark:text-black'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
