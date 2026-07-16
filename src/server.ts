import { AsyncLocalStorage } from 'node:async_hooks'
import { paraglideMiddleware } from './paraglide/server.js'
import handler from '@tanstack/react-start/server-entry'
import { handleContactApiRequest } from './lib/contact-api'
import { handleMarkdownRequest } from './lib/markdown'
import { setNonceStorage } from './lib/nonce'

// Per-request CSP nonce, delivered to the router (hydration scripts, head
// scripts) and the inline theme-init script in __root.tsx via ~/lib/nonce.
const nonceStorage = new AsyncLocalStorage<string>()
setNonceStorage(nonceStorage)

// Content Security Policy. script-src is nonce-based: the theme-init script and
// TanStack's hydration scripts carry the per-request nonce. 'unsafe-inline' on
// style-src remains for React inline style attributes.
function buildCsp(nonce: string): string {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}'`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "form-action 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    'upgrade-insecure-requests',
  ].join('; ')
}

const securityHeaders: Record<string, string> = {
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy':
    'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
}

// Permanent-redirect normalization for URL variants that would otherwise serve
// duplicate content at 200 (case variants) or bounce through temporary 307s
// (trailing slashes, /en prefix). Only page URLs are normalized: assets,
// file-like paths (.md, favicons), /api, and framework-internal paths like
// /_serverFn (whose Base64 payloads are case-sensitive) must pass through
// untouched. Returns the normalized path or null if already canonical.
function normalizePath(path: string): string | null {
  if (
    path.startsWith('/assets/') ||
    path.startsWith('/_') ||
    path.startsWith('/api/') ||
    path.includes('.')
  ) {
    return null
  }
  let p = path.toLowerCase()
  // English is the unprefixed base locale; /en/* is a duplicate surface.
  if (p === '/en') p = '/'
  else if (p.startsWith('/en/')) p = p.slice(3)
  // Locale roots canonically keep the trailing slash, everything else drops it.
  if (p.length > 1 && p.endsWith('/') && p !== '/de/' && p !== '/es/') {
    p = p.slice(0, -1)
  }
  if (p === '/de' || p === '/es') p = `${p}/`
  return p === path ? null : p
}

// Locale detection uses the URL prefix (/de, /es). Server-function calls hit
// /_serverFn/* with no prefix, so on client-side navigation they would always
// resolve to the base locale and return base-locale content under a localized
// page. Derive their locale from the originating page URL (Referer) instead, so
// loader content matches the page the user is actually on.
function localeDetectionUrl(request: Request): string {
  const url = new URL(request.url)
  if (url.pathname.startsWith('/_serverFn')) {
    const referer = request.headers.get('referer')
    if (referer) return referer
  }
  return request.url
}

export default {
  async fetch(req: Request): Promise<Response> {
    // Consolidate the duplicate www host onto the apex domain. Without this,
    // www.falkmichel.com serves every page at 200 and only the canonical tag
    // hints at the preferred host; a 301 is the authoritative signal.
    const reqUrl = new URL(req.url)
    if (reqUrl.hostname.startsWith('www.')) {
      reqUrl.hostname = reqUrl.hostname.slice(4)
      return Response.redirect(reqUrl.toString(), 301)
    }
    // Only GET/HEAD are safe to 301 (a redirected POST would drop its body).
    if (req.method === 'GET' || req.method === 'HEAD') {
      const normalized = normalizePath(reqUrl.pathname)
      if (normalized !== null) {
        reqUrl.pathname = normalized
        return Response.redirect(reqUrl.toString(), 301)
      }
    }

    // Agent-facing endpoints, served with their own CORS headers so they bypass
    // the localization middleware and the page security headers (CSP /
    // frame-ancestors would only hinder cross-origin agent access).

    // Open contact endpoint: one JSON POST, no install, no protocol handshake.
    if (reqUrl.pathname === '/api/contact') {
      return handleContactApiRequest(req)
    }
    // Raw Markdown source for content URLs (e.g. /about.md, /services/x.md).
    const markdown = handleMarkdownRequest(req)
    if (markdown) return markdown

    const nonce = crypto.randomUUID().replace(/-/g, '')
    const res = await nonceStorage.run(nonce, () =>
      paraglideMiddleware(req, () => handler.fetch(req), {
        effectiveRequestUrl: localeDetectionUrl,
      }),
    )
    const headers = new Headers(res.headers)
    for (const [key, value] of Object.entries(securityHeaders)) {
      headers.set(key, value)
    }
    headers.set('Content-Security-Policy', buildCsp(nonce))

    // TanStack Router's hydration payload embeds raw NUL bytes (U+0000) as ID
    // separators inside JS string literals. That is non-conformant HTML and
    // makes the response look binary to text tools. Escape them as \u0000,
    // which parses to the identical string value.
    const contentType = headers.get('content-type') ?? ''
    if (contentType.includes('text/html')) {
      const text = await res.text()
      headers.delete('content-length')
      return new Response(text.replaceAll('\u0000', '\\u0000'), {
        status: res.status,
        statusText: res.statusText,
        headers,
      })
    }
    return new Response(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers,
    })
  },
}
