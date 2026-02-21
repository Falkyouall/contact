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
import appCss from "../styles/app.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: m.site_title() },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
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
      <body>
        <header className="fixed top-0 left-0 right-0 z-50 flex items-start justify-between p-6">
          <Link
            to="/"
            className="leading-none font-black text-xl tracking-tight"
          >
            <span className="block">FA</span>
            <span className="block">LK</span>
          </Link>
          <div className="flex flex-col items-end gap-2">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </header>
        {children}
        <Toaster richColors />
        <Scripts />
      </body>
    </html>
  );
}
