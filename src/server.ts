import { paraglideMiddleware } from './paraglide/server.js'
import handler from '@tanstack/react-start/server-entry'
import { handleMcpRequest } from './lib/mcp'

// Content Security Policy.
// 'unsafe-inline' on script-src is required for the inline theme-init script in
// __root.tsx, the JSON-LD <script> tags, and TanStack Start's hydration scripts.
// Tighten to a nonce-based policy if those are ever made nonce-aware.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
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

const securityHeaders: Record<string, string> = {
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy':
    'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  'Content-Security-Policy': csp,
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
    // MCP endpoint for external agents — locale-agnostic JSON-RPC, served with
    // its own CORS headers, so it bypasses the localization middleware and the
    // page security headers (CSP/frame-ancestors would only hinder cross-origin
    // agent access).
    if (new URL(req.url).pathname === '/mcp') {
      return handleMcpRequest(req)
    }

    const res = await paraglideMiddleware(req, () => handler.fetch(req), {
      effectiveRequestUrl: localeDetectionUrl,
    })
    const headers = new Headers(res.headers)
    for (const [key, value] of Object.entries(securityHeaders)) {
      headers.set(key, value)
    }
    return new Response(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers,
    })
  },
}
