import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { deLocalizeUrl, localizeUrl } from './paraglide/runtime'
import { getRequestNonce } from './lib/nonce'

export function getRouter() {
  const router = createRouter({
    routeTree,
    // Paraglide owns URL localization. The router matches against the
    // de-localized path (/de/about -> /about) and re-localizes outgoing hrefs
    // to the current locale (/about -> /de/about) so <Link> stays in-locale.
    rewrite: {
      input: ({ url }) => deLocalizeUrl(url),
      output: ({ url }) => localizeUrl(url),
    },
    // Per-request CSP nonce for SSR-injected inline scripts (undefined on the
    // client, where no nonce is needed after hydration).
    ssr: { nonce: getRequestNonce() },
  })
  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
