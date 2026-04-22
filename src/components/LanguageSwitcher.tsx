import { useEffect, useState } from 'react'
import { locales, getLocale, setLocale } from '~/paraglide/runtime'
import * as m from '~/paraglide/messages'

const labels: Record<string, string> = {
  en: '🇬🇧',
  de: '🇩🇪',
  es: '🇪🇸',
}

const ariaLabels: Record<string, () => string> = {
  en: () => m.lang_en(),
  de: () => m.lang_de(),
  es: () => m.lang_es(),
}

export function LanguageSwitcher() {
  const currentLocale = getLocale()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const others = locales.filter((l) => l !== currentLocale)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={ariaLabels[currentLocale]?.() ?? currentLocale}
        aria-haspopup="menu"
        aria-expanded={open}
        className="relative z-50 rounded cursor-pointer px-2 py-1 text-sm font-medium bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
      >
        {labels[currentLocale] ?? currentLocale.toUpperCase()}
      </button>
      {open && (
        <>
          <div
            aria-hidden="true"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40"
          />
          <div
            role="menu"
            className="absolute right-0 top-full mt-1 z-50 flex flex-col gap-1 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1 shadow-lg"
          >
            {others.map((locale) => (
              <button
                key={locale}
                role="menuitem"
                onClick={() => {
                  setOpen(false)
                  setLocale(locale)
                }}
                aria-label={ariaLabels[locale]?.() ?? locale}
                className="rounded cursor-pointer px-2 py-1 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {labels[locale] ?? locale.toUpperCase()}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
