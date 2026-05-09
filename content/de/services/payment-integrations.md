---
title: Payment-Integrationen
subtitle: Geld bekommen, ohne dass der Checkout zum Albtraum wird
date: 2026-05-09
description: Stripe, LemonSqueezy, PayPal und Shopify richtig integriert — für Online-Shops, die sich keinen kaputten Checkout oder eine dreiwöchige Debug-Session über Webhook-Signaturen leisten können.
contactHeading: "Zahlungen, die dir nicht die Woche verderben?"
---

Jeder Online-Shop läuft gegen dieselbe Wand: die Demo-Integration funktioniert, dann fließt echtes Geld — und plötzlich kommen die Edge Cases ungebeten herein. Fehlgeschlagene Webhooks, doppelte Buchungen, Refunds, die nicht refunden, Abonnements in unmöglichen Zuständen, Steuern, die "fast" stimmen, in den falschen Ländern.

Ich verbinde Payment-Provider mit Shops so, dass die Edge Cases gefangen werden, bevor deine Kunden sie finden.

## Kennst du das?

- Dein Checkout funktioniert, aber du hast Angst, in die Failed-Payment-Queue zu schauen
- Du hast vor Monaten einen Provider gewählt und bist jetzt nicht mehr sicher, ob du wechseln solltest
- "Es ist doch nur eine Stripe-Integration" wurde zu einer dreiwöchigen Debug-Session über Webhook-Signaturen und Idempotenz
- Du brauchst Recurring Billing, Multi-Currency oder Steuern — und die Docs decken deine Realität nicht ab

## Was sich ändert

- Ein Checkout-Flow, der die langweiligen 95 % UND die schmerzhaften 5 % abdeckt — gescheiterte Zahlungen, Retries, Teil-Refunds, Währungsunterschiede
- Webhooks, die wirklich idempotent, signiert, replay-sicher sind und Kunden nicht doppelt belasten, wenn etwas hakt
- Abos und Recurring Billing, die Plan-Wechsel, Karten-Updates und Dunning überleben
- Eine klare Antwort darauf, welcher Provider zu deinem Shop passt — und eine ehrliche Einschätzung der Wechselkosten, wenn du dem aktuellen entwachsen bist

## Wie ich arbeite

Ich starte beim Geldfluss, nicht bei der Provider-Doku. Wo fließt das Geld wirklich? Wer muss wann welchen Status sehen? Was passiert, wenn ein Webhook zweimal kommt — oder nie? Die meisten "Payment-Integrationen" scheitern, weil sie nur den Happy Path modelliert haben.

Ich bin in den großen Providern unterwegs und wähle nach deinen tatsächlichen Bedürfnissen — nicht nach dem, mit dem ich am meisten gearbeitet habe.

---

*Tools, zu denen ich gerne greife: Stripe (Subscriptions, Marketplaces, komplexes Billing), LemonSqueezy (digitale Produkte, EU-VAT entspannt), PayPal (DACH und Kundenvertrauen), Shopify (Custom Apps, Headless Storefronts, App Extensions).*
