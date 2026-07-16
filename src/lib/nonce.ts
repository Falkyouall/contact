// Per-request CSP nonce hand-off between the server entry and the router.
// server.ts registers an AsyncLocalStorage here; on the client no storage is
// ever registered, so getRequestNonce() returns undefined (no nonce needed
// after hydration). This indirection keeps node:async_hooks out of the
// client bundle.
type NonceStore = { getStore(): string | undefined }

let storage: NonceStore | null = null

export function setNonceStorage(s: NonceStore) {
  storage = s
}

export function getRequestNonce(): string | undefined {
  return storage?.getStore()
}
