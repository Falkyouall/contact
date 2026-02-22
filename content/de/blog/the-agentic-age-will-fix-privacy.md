---
title: Wie das agentische Zeitalter unsere Privatsphäre retten wird.
date: 2026-02-22
description: VPNs verschieben Vertrauen von deinem ISP zu einer VPN-Firma. AI Agents machen Vertrauen überflüssig, denn die Website wird dich nicht mehr persönlich begrüßen.
contactHeading: "Privacy-first Agent-Integrationen bauen?"
---

VPNs sollten Online-Privacy lösen. Du routest deinen Traffic durch einen VPN-Server, dein ISP sieht nicht was du machst, und die Ziel-Website sieht die IP des VPNs statt deiner. So der Pitch. Die Realität ist unordentlicher, und ein anderes Modell entsteht gerade, das den ganzen Ansatz möglicherweise obsolet macht.

## Das VPN-Vertrauensproblem

Ein VPN eliminiert Überwachung nicht. Es verschiebt sie. Statt dass dein ISP deinen Traffic sieht, sieht ihn der VPN-Anbieter. Wie [Privacy Guides](https://www.privacyguides.org/en/basics/vpn-overview/) es formuliert: "VPN providers can also see and modify your traffic the same way your ISP could, so there is still a level of trust you are placing in them."

Dieses Vertrauen wurde wiederholt gebrochen.

2017 hat [PureVPN](https://torrentfreak.com/purevpn-explains-how-it-helped-the-fbi-catch-a-cyberstalker-171016/) — ein Anbieter der eine "Zero Log Policy" bewarb — Verbindungsdaten ans FBI übergeben, die einen Nutzer direkt identifizierten. Die Logs zeigten welche IP-Adressen auf eine bestimmte VPN-Session zugriffen, wann, und welche Accounts genutzt wurden. 2016 hat [IPVanish](https://torrentfreak.com/ipvanish-no-logging-vpn-led-homeland-security-to-comcast-user-180505/) dem Department of Homeland Security zunächst gesagt, sie hätten keine Logs, dann auf eine zweite Vorladung mit detaillierten Verbindungs-Timestamps und Quell-IPs geantwortet. [HideMyAss](https://www.theregister.com/2011/09/26/hidemyass_lulzsec_controversy/) hat 2011 nach einer Gerichtsentscheidung einen Nutzer an das FBI ausgeliefert.

Das sind keine Einzelfälle. Es gibt [keinen Industriestandard](https://cyberinsider.com/vpn-logs-lies/) der definiert was "no logs" bedeutet. Jeder Anbieter definiert es anders, und es gibt keine Möglichkeit die Behauptung von außen zu verifizieren.

## Das Eigentümerproblem

Der VPN-Markt hat sich auf eine Weise konsolidiert, die privacy-bewusste Nutzer beunruhigen sollte. [Kape Technologies](https://cyberinsider.com/kape-technologies-owns-expressvpn-cyberghost-pia-zenmate-vpn-review-sites/) — ehemals Crossrider, eine Firma deren Plattform weitverbreitet zur Verbreitung von Adware genutzt wurde — besitzt jetzt ExpressVPN, CyberGhost, Private Internet Access und ZenMate. Das sind vier der beliebtesten VPN-Dienste unter einer Firma mit Adware-Vergangenheit. Kape hat auch [vpnMentor und Wizcase](https://www.theregister.com/2021/09/14/expressvpn_bought_kape/) übernommen — zwei große VPN-Review-Seiten die jetzt Kapes eigene Produkte in ihren Top Drei ranken.

Kostenlose VPNs sind schlimmer. Eine [CSIRO-Studie](https://research.csiro.au/isp/wp-content/uploads/sites/106/2016/08/paper-1.pdf) die 283 Android VPN Apps untersuchte, fand dass 38% Malware enthielten, 75% Third-Party Tracking Libraries nutzten und 18% den Traffic überhaupt nicht verschlüsselten. [SuperVPN](https://www.abijita.com/supervpn-data-breach-exposed-360-million-records-online/) hat 2023 360 Millionen Nutzerdaten geleakt. Facebooks [Onavo Protect](https://www.bitdefender.com/en-us/blog/hotforsecurity/facebook-pulls-its-vpn-from-the-ios-app-store-after-data-harvesting-accusations) wurde als Privacy-Tool vermarktet, während es den gesamten Nutzer-Traffic durch Facebooks Server für Analytics leitete.

## VPNs lösen Fingerprinting nicht

Selbst wenn du deinem VPN-Anbieter komplett vertraust, bist du trotzdem trackbar. VPNs ändern deine IP-Adresse. Das war's. Sie machen nichts gegen Browser Fingerprinting, und Fingerprinting ist wie modernes Tracking tatsächlich funktioniert.

Die [Panopticlick-Studie der EFF](https://coveryourtracks.eff.org/static/browser-uniqueness.pdf) fand heraus, dass 83,6% der Browser einen einzigartigen Fingerprint haben, basierend auf Canvas Rendering, WebGL Output, installierten Fonts, Bildschirmauflösung, Zeitzone, Sprache und Dutzenden weiterer Signale. Mit Flash oder Java stieg diese Zahl auf 94,2%. Jeder Browser trägt ungefähr 18 Bit identifizierende Entropie — genug um dich unter Hunderttausenden von Nutzern herauszupicken.

[WebGL Fingerprinting](https://roundproxies.com/blog/webgl-fingerprinting/) ist besonders schwer zu umgehen, weil es auf Hardware-Ebene arbeitet und GPU-Rendering-Charakteristiken über JavaScript extrahiert. Ein VPN hat darauf keinen Effekt. Inkognito-Modus auch nicht.

Laut dem [2025 Web Almanac](https://almanac.httparchive.org/en/2025/privacy) enthalten 75% der Desktop-Websites mindestens einen Third-Party Tracker, und Google Tracker sind auf 61% aller Webseiten präsent. Im Februar 2025 hat Google [seine Richtlinie gegen Fingerprinting-basiertes Tracking offiziell zurückgenommen](https://www.malwarebytes.com/blog/news/2025/02/google-now-allows-digital-fingerprinting-of-its-users) und Werbetreibenden erlaubt es zu nutzen. Das britische [Information Commissioner's Office](https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2024/12/our-response-to-google-s-policy-change-on-fingerprinting/) nannte den Schritt "verantwortungslos."

Der aktuelle Stand ist also: VPNs verstecken deine IP aber nicht deine Identität, der VPN-Anbieter wird ein neuer Überwachungspunkt den du nicht verifizieren kannst, die größten VPN-Marken gehören einer ehemaligen Adware-Firma, und die Tracking-Industrie hat gerade grünes Licht bekommen dich per Fingerprint zu verfolgen.

## Agents ändern das Modell

Wenn ein AI Agent in deinem Auftrag im Web surft, sieht die Website nie deinen Browser. Sie sieht nie deine IP-Adresse, deinen Canvas Fingerprint, deinen WebGL Output, deine installierten Fonts, deine Zeitzone. Sie sieht die Infrastruktur des Agents — einen [OpenAI](https://openai.com/index/introducing-chatgpt-agent/)- oder [Anthropic](https://www.anthropic.com)-Server irgendwo, mit einem generischen Fingerprint der über Millionen von Anfragen geteilt wird.

Das ist kein Privacy-Feature das absichtlich eingebaut wurde. Es ist ein architektureller Nebeneffekt. Der Agent betreibt seine eigene Browser-Umgebung serverseitig. Wenn [ChatGPT agent](https://help.openai.com/en/articles/11752874-chatgpt-agent) eine Website besucht um etwas für dich zu recherchieren, nutzt er seinen eigenen virtuellen Computer. [Perplexity](https://www.perplexity.ai/hub/blog/agents-or-bots-making-sense-of-ai-on-the-open-web) beschreibt seine Anfragen als "targeted, one-off requests to retrieve current information" — die Website sieht Perplexitys Infrastruktur, nicht dich.

Cross-Site Tracking via Fingerprinting wird bedeutungslos wenn der Fingerprint einem Agent gehört, der von Millionen Nutzern geteilt wird. Es gibt keine Einzelperson die man tracken könnte.

## Von Browser-Sessions zu strukturierten Queries

[MCP (Model Context Protocol)](https://modelcontextprotocol.io) treibt das weiter. Statt dass ein Agent eine Website navigiert wie ein Mensch es würde — Seiten laden, HTML parsen, Buttons klicken — lässt MCP Agents mit Services über strukturierte Tool Calls interagieren. Der Agent fragt spezifische Daten über eine API an. Der Service antwortet mit strukturierten Daten. Keine Browser Session, keine Cookies, keine Fingerprint-Oberfläche.

Es geht von "ein Nutzer surft auf einer Website" zu "ein Agent fragt einen Service ab." Deine Identität wird nicht hinter einem Proxy versteckt. Sie ist in der Interaktion schlicht nicht vorhanden. Der Service authentifiziert die Anfrage des Agents über [OAuth Tokens](https://modelcontextprotocol.io/specification/2025-11-25), nicht über Browser Cookies die an dein Gerät gebunden sind.

## Die neue Vertrauensgleichung

Das ist aber nicht umsonst. Agentic Browsing erzeugt sein eigenes Vertrauensproblem: du und dein AI-Anbieter. OpenAI, Anthropic, Google, wer auch immer den Agent betreibt, sitzt jetzt zwischen dir und dem Web. Sie wissen was du gefragt hast, auch wenn die Ziel-Website nicht weiß wer gefragt hat.

Und die Risiken sind konkret. [TechCrunch](https://techcrunch.com/2025/10/25/the-glaring-security-risks-with-ai-browser-agents/) hat angemerkt, dass Agents "the ability to view and take action in a user's email, calendar, and contact list" brauchen. Das [Future of Privacy Forum](https://fpf.org/blog/minding-mindful-machines-ai-agents-and-data-protection-considerations/) hat darauf hingewiesen, dass Agents "granular telemetry — user interactions, action logs, performance metrics" sammeln die als personenbezogene Daten gelten können. Forscher haben bereits [30 Schwachstellen](https://arxiv.org/abs/2512.07725) in 8 populären Browser Agents gefunden, darunter deaktivierte Privacy-Features und Agents die sensible persönliche Informationen in Formularfelder autocompleten.

Aber der Vergleich der zählt ist: was ersetzt du? Heute sieht jede Website die du besuchst deine IP, deinen Fingerprint, deine Cookies. Dein ISP sieht jede Domain mit der du dich verbindest. Wenn du ein VPN nutzt, sieht der VPN-Anbieter alles was der ISP gesehen hätte. Browser Fingerprinting trackt dich seitenübergreifend ob du zustimmst oder nicht, und 75% der Websites betreiben Tracker.

Mit Agentic Browsing sieht eine Entität — der AI-Anbieter — deine Absicht. Der Rest des Webs sieht nichts über dich. Das ist keine perfekte Privacy. Aber es verkleinert die Angriffsfläche im Vergleich zu dem was wir jetzt haben, wo deine Identität an jede Seite, jeden Tracker und jeden Mittelsmann in der Kette leckt.

## Wohin das führt

Das VPN-Modell war immer ein Pflaster. Man hat ein löchriges System genommen — deinen Browser der deine Identität an jeden Server sendet mit dem er sich verbindet — und einen Proxy davorgesetzt. Der Proxy hat seine eigenen Vertrauensprobleme eingeführt und Fingerprinting überhaupt nicht adressiert.

Das Agentic-Modell pflastert das System nicht. Es ersetzt die Interaktion. Der Nutzer bleibt zuhause. Der Agent geht raus. Die Websites, Tracker und Fingerprinting-Scripts haben keinen Nutzer den sie identifizieren können, weil kein Nutzer aufgetaucht ist.

Wir sind noch nicht soweit. Das meiste Surfen ist noch direkt. Agents übernehmen Recherche, Vergleiche, spezifische Aufgaben, nicht zielloses Browsen. Je mehr sie von dem übernehmen was aktuell über Browser läuft, desto kleiner wird die Angriffsfläche für Tracker. Nicht weil wir bessere Schilde gebaut haben, sondern weil wir aufgehört haben aufzutauchen.
