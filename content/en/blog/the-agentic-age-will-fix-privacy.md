---
title: The Agentic Age Will Fix Privacy
date: 2026-02-22
description: VPNs shift trust from your ISP to a VPN company. AI agents eliminate the need for trust altogether — the website never sees you.
contactHeading: "Want to build privacy-first agent integrations?"
---

VPNs were supposed to solve online privacy. You route your traffic through a VPN server, your ISP can't see what you're doing, and the destination website sees the VPN's IP instead of yours. That's the pitch. The reality is messier, and a different model is emerging that makes the whole thing obsolete.

## The VPN trust problem

A VPN doesn't eliminate surveillance. It moves it. Instead of your ISP seeing your traffic, the VPN provider sees it. As [Privacy Guides](https://www.privacyguides.org/en/basics/vpn-overview/) puts it: "VPN providers can also see and modify your traffic the same way your ISP could, so there is still a level of trust you are placing in them."

That trust has been broken repeatedly.

In 2017, [PureVPN](https://torrentfreak.com/purevpn-explains-how-it-helped-the-fbi-catch-a-cyberstalker-171016/) — a provider that marketed a "zero log policy" — handed over connection records to the FBI that directly identified a user. The logs showed which IP addresses accessed a specific VPN session, when, and which accounts were used. In 2016, [IPVanish](https://torrentfreak.com/ipvanish-no-logging-vpn-led-homeland-security-to-comcast-user-180505/) initially told the Department of Homeland Security they had no logs, then responded to a second summons with detailed connection timestamps and source IPs. [HideMyAss](https://www.theregister.com/2011/09/26/hidemyass_lulzsec_controversy/) gave up a user to the FBI after a court order in 2011.

These aren't edge cases. There's [no industry standard](https://cyberinsider.com/vpn-logs-lies/) that defines what "no logs" means. Each provider defines it differently, and there's no way to verify the claim from the outside.

## The ownership problem

The VPN market has consolidated in ways that should make privacy-conscious users uncomfortable. [Kape Technologies](https://cyberinsider.com/kape-technologies-owns-expressvpn-cyberghost-pia-zenmate-vpn-review-sites/) — formerly Crossrider, a company whose platform was widely used to distribute adware — now owns ExpressVPN, CyberGhost, Private Internet Access, and ZenMate. That's four of the most popular VPN services under one company with an adware history. Kape also acquired [vpnMentor and Wizcase](https://www.theregister.com/2021/09/14/expressvpn_bought_kape/) — two major VPN review sites that now rank Kape's own products in their top three.

Free VPNs are worse. A [CSIRO study](https://research.csiro.au/isp/wp-content/uploads/sites/106/2016/08/paper-1.pdf) examining 283 Android VPN apps found that 38% contained malware, 75% used third-party tracking libraries, and 18% didn't encrypt traffic at all. [SuperVPN](https://www.abijita.com/supervpn-data-breach-exposed-360-million-records-online/) leaked 360 million user records in 2023. Facebook's [Onavo Protect](https://www.bitdefender.com/en-us/blog/hotforsecurity/facebook-pulls-its-vpn-from-the-ios-app-store-after-data-harvesting-accusations) was marketed as a privacy tool while funneling all user traffic through Facebook's servers for analytics.

## VPNs don't solve fingerprinting

Even if you trust your VPN provider completely, you're still trackable. VPNs change your IP address. That's it. They do nothing about browser fingerprinting, and fingerprinting is how modern tracking actually works.

The [EFF's Panopticlick study](https://coveryourtracks.eff.org/static/browser-uniqueness.pdf) found that 83.6% of browsers have a unique fingerprint based on their canvas rendering, WebGL output, installed fonts, screen resolution, timezone, language, and dozens of other signals. With Flash or Java, that number reached 94.2%. Each browser carries roughly 18 bits of identifying entropy — enough to single you out from hundreds of thousands of users.

[WebGL fingerprinting](https://roundproxies.com/blog/webgl-fingerprinting/) is particularly hard to defeat because it operates at the hardware level, extracting GPU rendering characteristics through JavaScript. A VPN has no effect on this. Neither does incognito mode.

According to the [2025 Web Almanac](https://almanac.httparchive.org/en/2025/privacy), 75% of desktop websites contain at least one third-party tracker, and Google trackers are present on 61% of all webpages. In February 2025, Google [officially reversed its policy](https://www.malwarebytes.com/blog/news/2025/02/google-now-allows-digital-fingerprinting-of-its-users) against fingerprinting-based tracking, allowing advertisers to use it. The UK's [Information Commissioner's Office](https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2024/12/our-response-to-google-s-policy-change-on-fingerprinting/) called the move "irresponsible."

So the state of play is: VPNs hide your IP but not your identity, the VPN provider becomes a new surveillance point you can't verify, the biggest VPN brands are owned by a former adware company, and the tracking industry just got the green light to fingerprint you regardless.

## Agents change the model

When an AI agent browses the web on your behalf, the website never sees your browser. It never sees your IP address, your canvas fingerprint, your WebGL output, your installed fonts, your timezone. It sees the agent's infrastructure — an [OpenAI](https://openai.com/index/introducing-chatgpt-agent/) or [Anthropic](https://www.anthropic.com) server somewhere, with a generic fingerprint shared across millions of requests.

This isn't a privacy feature that was designed in. It's an architectural side effect. The agent runs its own browser environment server-side. When [ChatGPT agent](https://help.openai.com/en/articles/11752874-chatgpt-agent) visits a website to research something for you, it uses its own virtual computer. [Perplexity](https://www.perplexity.ai/hub/blog/agents-or-bots-making-sense-of-ai-on-the-open-web) describes its requests as "targeted, one-off requests to retrieve current information" — the website sees Perplexity's infrastructure, not you.

Cross-site tracking via fingerprinting becomes meaningless when the fingerprint belongs to an agent shared by millions of users. There's no individual to track.

## From browser sessions to structured queries

[MCP (Model Context Protocol)](https://modelcontextprotocol.io) pushes this further. Instead of an agent navigating a website like a human would — loading pages, parsing HTML, clicking buttons — MCP lets agents interact with services through structured tool calls. The agent asks for specific data through an API. The service responds with structured data. No browser session, no cookies, no fingerprint surface at all.

It goes from "a user browses a website" to "an agent queries a service." Your identity isn't hidden behind a proxy. It's absent from the interaction entirely. The service authenticates the agent's request through [OAuth tokens](https://modelcontextprotocol.io/specification/2025-11-25), not browser cookies tied to your device.

## The new trust equation

This isn't free, though. Agentic browsing creates its own trust problem: you and your AI provider. OpenAI, Anthropic, Google, whoever runs the agent, now sits between you and the web. They know what you asked for, even if the destination website doesn't know who asked.

And the risks are specific. [TechCrunch](https://techcrunch.com/2025/10/25/the-glaring-security-risks-with-ai-browser-agents/) noted that agents require "the ability to view and take action in a user's email, calendar, and contact list." The [Future of Privacy Forum](https://fpf.org/blog/minding-mindful-machines-ai-agents-and-data-protection-considerations/) flagged that agents collect "granular telemetry — user interactions, action logs, performance metrics" that may qualify as personal data. Researchers have already found [30 vulnerabilities](https://arxiv.org/abs/2512.07725) across 8 popular browser agents, including disabled privacy features and agents that autocomplete sensitive personal information.

But the comparison that matters is: what are you replacing? Today, every website you visit sees your IP, your fingerprint, your cookies. Your ISP sees every domain you connect to. If you use a VPN, the VPN provider sees everything the ISP would have. Browser fingerprinting tracks you across sites whether you consent or not, and 75% of websites run trackers.

With agentic browsing, one entity — the AI provider — sees your intent. The rest of the web sees nothing about you. That's not perfect privacy. But it shrinks the attack surface compared to what we have now, where your identity leaks to every site, tracker, and middleman in the chain.

## Where this goes

The VPN model was always a patch. You took a leaky system — your browser broadcasting your identity to every server it connects to — and added a proxy in front of it. The proxy introduced its own trust problems, and it didn't address fingerprinting at all.

The agentic model doesn't patch the system. It replaces the interaction. The user stays home. The agent goes out. The websites, trackers, and fingerprinting scripts have no user to identify because no user showed up.

We're not there yet. Most browsing is still direct. Agents take on research, comparisons, specific tasks, not idle browsing. As they absorb more of what currently happens through browsers, the surface area for trackers shrinks. Not because we built better shields, but because we stopped showing up.
