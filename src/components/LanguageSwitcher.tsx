import { locales, getLocale, setLocale } from '~/paraglide/runtime'

const labels: Record<string, string> = {
  en: 'EN',
  de: 'DE',
  es: 'ES',
}

export function LanguageSwitcher() {
  const currentLocale = getLocale()

  return (
    <div className="flex gap-1">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => setLocale(locale)}
          className={`rounded cursor-pointer px-2 py-1 text-sm font-medium transition-colors ${
            locale === currentLocale
              ? 'bg-black text-white dark:bg-white dark:text-black'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          {labels[locale] ?? locale.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
