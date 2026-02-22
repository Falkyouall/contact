import {
  createRootRoute,
  HeadContent,
  Link,
  Scripts,
} from "@tanstack/react-router";
import { Toaster } from "sonner";
import * as m from "~/paraglide/messages";
import { getLocale } from "~/paraglide/runtime";
import { LanguageSwitcher } from "~/components/LanguageSwitcher";
import { ThemeSwitcher } from "~/components/ThemeSwitcher";
import { siteConfig } from "~/lib/seo";
import appCss from "../styles/app.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${m.site_title()} | ${siteConfig.siteName}` },
      { name: "description", content: siteConfig.defaultDescription },
      { name: "author", content: siteConfig.author },
      { property: "og:site_name", content: siteConfig.siteName },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: siteConfig.twitter },
      { name: "twitter:creator", content: siteConfig.twitter },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { rel: "apple-touch-icon", href: "/favicon-192.png", sizes: "192x192" },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang={getLocale()} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme:dark)').matches);if(d)document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
        <HeadContent />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded focus:bg-black focus:px-4 focus:py-2 focus:text-white dark:focus:bg-white dark:focus:text-black"
        >
          {m.skip_to_content()}
        </a>
        <header className="fixed top-0 left-0 right-0 z-50 flex items-start justify-between p-6">
          <Link
            to="/"
            className="leading-none font-black text-5xl tracking-tight"
          >
            <span className="block tracking-widest">FA</span>
            <span className="block tracking-widest">LK</span>
          </Link>
          <nav aria-label={m.nav_home()}>
            <div className="flex flex-col items-end gap-2">
              <LanguageSwitcher />
              <ThemeSwitcher />
            </div>
          </nav>
        </header>
        <main id="main-content" className="flex flex-1 pt-36">
          {children}
        </main>
        <footer className="border-t border-gray-200 dark:border-gray-800 py-8 px-6">
          <div className="mx-auto max-w-2xl flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>&copy; {new Date().getFullYear()} {siteConfig.author}</span>
            <div className="flex items-center gap-4">
              <a href="https://github.com/Falkyouall" target="_blank" rel="noopener noreferrer me" className="hover:text-gray-900 dark:hover:text-gray-100">
                GitHub<span className="sr-only"> {m.opens_new_tab()}</span>
              </a>
              <a href="https://www.linkedin.com/in/falk-mich%C3%A9l-b48ba753/" target="_blank" rel="noopener noreferrer me" className="hover:text-gray-900 dark:hover:text-gray-100">
                LinkedIn<span className="sr-only"> {m.opens_new_tab()}</span>
              </a>
              <a href="https://x.com/falk_approves" target="_blank" rel="noopener noreferrer me" className="hover:text-gray-900 dark:hover:text-gray-100">
                X<span className="sr-only"> {m.opens_new_tab()}</span>
              </a>
            </div>
          </div>
        </footer>
        <Toaster richColors />
        <Scripts />
      </body>
    </html>
  );
}
