---
title: Warum CLIs in der Agentic-Ära zurückkommen
date: 2026-02-21
description: AI Agents können besser mit Unix Commands umgehen als mit grafischen Oberflächen. Das hat Konsequenzen für den Toolbau.
contactHeading: "Hilfe beim Bau von CLI-first Tools?"
---

Es passiert gerade eine leise Verschiebung in der Art, wie Developer Tools gebaut werden. Das letzte Jahrzehnt war die Richtung klar: pack alles in ein GUI, bau ein Dashboard, vielleicht ein Web Interface. CLIs waren das, was man widerwillig für CI Pipelines und Power User gewartet hat. Das dreht sich gerade um, und der Grund ist überraschend mechanisch.

AI Agents sind richtig gut darin, Command-Line Tools zu benutzen. Sie sind schlecht darin, grafische Oberflächen zu bedienen. Und je mehr Entwicklungsarbeit an Agents delegiert wird, desto besser überleben die Tools, die Agents tatsächlich bedienen können.

## Agents denken in Text

Large Language Models verarbeiten Text. Sie produzieren Text. Wenn ein Agent mit einem System interagieren muss, ist das natürlichste Interface eines, bei dem sowohl Input als auch Output Text sind. Das ist ein CLI.

Das ist kein theoretisches Argument. Das Engineering Team von [Vercel](https://vercel.com/blog/we-removed-80-percent-of-our-agents-tools) hat darüber geschrieben, wie sie den Großteil ihres Custom Agent Toolings durch ein Filesystem Tool und ein Bash Tool ersetzt haben. Die Ergebnisse waren konkret: Die Ausführungszeit fiel von 274,8 Sekunden auf 77,4 Sekunden (3,5x schneller), der Token-Verbrauch sank von rund 102k auf 61k Tokens (37% weniger), die Anzahl der Schritte ging von etwa 12 auf 7 runter, und die Erfolgsquote stieg von 80% auf 100%. Sie stellten fest, dass `grep`, `find`, `cat` und `ls` ausreichten, damit Agents komplexe Datenstrukturen navigieren konnten, die vorher eigens gebaute Retrieval-Systeme brauchten.

Ihr Fazit war direkt: "Grep is 50 years old and still does exactly what we need. We were building custom tools for what Unix already solves."

[Peter Steinberger](https://steipete.me/posts/just-talk-to-it) hat eine ähnliche Beobachtung über seinen eigenen Workflow gemacht. Er schrieb, dass er in seinen Agent Instructions einfach auf ein CLI per Name verweisen kann. Der Agent probiert irgendwas, das CLI zeigt das Help Menü, der Context hat jetzt die vollständige Info wie das Tool funktioniert, und ab da läuft alles. Keine Schema Definitionen, kein Tool Registration Overhead.

## Die Context Window Steuer

Hier wird es praktisch. Jedes Tool, auf das ein Agent Zugriff hat, kostet Tokens. Die Beschreibung des Tools, seine Parameter, sein Schema — all das wird ins Context Window geladen, bevor der Agent überhaupt angefangen hat zu arbeiten.

[MCP (Model Context Protocol)](https://modelcontextprotocol.io) Server sind ein gutes Beispiel für diesen Tradeoff. Sie bieten strukturierte, typisierte Interfaces, über die Agents mit externen Services interagieren können. Das ist nützlich. Aber es hat seinen Preis. Der [GitHub MCP Server](https://github.com/github/github-mcp-server) zum Beispiel verbraucht Zehntausende von Tokens allein durch die Registrierung. Ein Entwickler berichtete, dass er in [Claude Code](https://claude.ai/download) von 34k auf 80k Tokens kam, nur durch das Hinzufügen des GitHub MCP. Eine andere Analyse ergab, dass MCP Tools allein 16,3% des verfügbaren Context Windows verbrauchen — bevor eine einzige Nachricht gesendet wurde.

Peter Steinberger hat es direkt formuliert: "I don't have to pay a price for any tools, unlike MCPs which are a constant cost and garbage in my context. Use GitHub's MCP and see 23k tokens gone. Or use the `gh` cli which has basically the same feature set, models already know how to use it, and pay zero context tax."

Das [`gh` CLI](https://cli.github.com) und der GitHub MCP Server machen ungefähr das Gleiche. Eins kostet null Tokens. Das andere verbrennt Context allein durch seine Existenz.

## Warum das wirtschaftlich relevant ist

Context Window Tokens sind nicht kostenlos. Bei API-basierter Abrechnung wird jeder Token im Context Window bei jedem Request berechnet. Ein Overhead von 30k Tokens durch Tool Definitionen bedeutet 30k zusätzliche Input Tokens bei jeder einzelnen Nachricht in einer Konversation. Über eine lange Session mit Dutzenden Hin-und-Her-Nachrichten summiert sich das.

Token Pricing ist deutlich gefallen — laut einigen Analysen um rund 80% seit 2023 — aber das Volumen der Tokens, die Agents verbrauchen, ist im gleichen Zeitraum drastisch gestiegen. Agents machen mehrere Tool Calls pro Task, führen lange Konversationen und arbeiten über große Codebases hinweg. Der Preis pro Token ist gesunken, aber der Gesamtverbrauch gestiegen.

CLI Tools umgehen einen Großteil davon. Der Agent weiß bereits aus seinen Trainingsdaten, wie man `git`, `npm`, `docker`, `curl` und Hunderte andere Standard-Unix-Tools benutzt. Keine Tool Description nötig. Keine Schema Definition. Kein Context Overhead. Der Agent ruft einfach den Befehl auf, liest stdout, und macht weiter.

## Strukturierte Daten, ohne die Struktursteuer

Ein Argument für GUIs und strukturierte APIs ist, dass sie saubere, vorhersagbare Ausgabeformate liefern. Aber CLIs machen das auch, nur anders. Unix Commands pipen Text. Sie geben JSON aus wenn man fragt (`gh pr list --json`). Sie unterstützen Flags, die die Ausgabe steuern. Und Agents sind bemerkenswert gut darin, deren Output zu parsen.

Die Unix-Philosophie — kleine Tools die eine Sache machen, komponierbar durch Pipes — passt fast perfekt dazu, wie Agents denken. Ein Agent kann `ls | grep | head` verketten, um einzugrenzen was er sich anschaut, bevor er Tokens fürs Lesen ganzer Dateien investiert. Er kann `git log --oneline -5` ausführen, um die letzte History zu verstehen, ohne den gesamten Commit Graph zu laden.

Diese Art von inkrementellem, lazym Context Loading ist genau das, was den Token-Verbrauch niedrig hält. Der Agent entscheidet was er braucht, holt genau das, und macht weiter. Vergleich das mit einem MCP Server, der sein gesamtes Schema ins Context Window lädt, egal ob der Agent davon irgendwas braucht oder nicht.

## Das `gh` vs GitHub MCP Beispiel

Das lohnt sich genauer anzuschauen, weil es den Punkt so klar illustriert.

Der GitHub MCP Server stellt Dutzende Tools bereit: Issues erstellen, PRs auflisten, Dateien lesen, Releases verwalten. Jedes Tool kommt mit einer JSON Schema Definition. All diese Definitionen werden sofort in den Context geladen. Der gesamte Overhead liegt im Bereich von Zehntausenden von Tokens.

Das `gh` CLI macht all das Gleiche. `gh pr list`, `gh issue create`, `gh api repos/owner/repo/pulls/123/comments`. Der Agent kennt die Syntax aus den Trainingsdaten. Der Overhead ist null Tokens, bis der Agent tatsächlich einen Befehl aufruft. Und wenn er einen Befehl aufruft, bekommt er Plain Text zurück, der einfach zu parsen und günstig im Context ist.

Gleiche Funktionalität. Dramatisch unterschiedliche Context-Kosten.

## Was das für Tool-Entwickler bedeutet

Wenn du 2026 Developer Tools baust, ist das CLI nicht ein Legacy Interface das du aus Abwärtskompatibilität pflegst. Es ist das primäre Interface für eine wachsende Nutzergruppe — AI Agents.

Ein paar Dinge folgen daraus:

- **Text rein, Text raus.** Wenn dein Tool komplett über stdin/stdout bedienbar ist, können Agents es ohne Adapter Layer nutzen.
- **Guter Help Text ist wichtiger als je zuvor.** Wenn ein Agent auf ein unbekanntes CLI trifft, führt er `--help` aus. Wenn dein Help Text klar und vollständig ist, onboarded sich der Agent selbst.
- **JSON Output Flags sind Standard.** `--json` oder `--output json` lässt Agents strukturierte Daten bekommen, ohne formatierte Tabellen zu scrapen.
- **Kein interaktiver Input.** Agents können keine Prompts oder Menüs navigieren. Jede Operation sollte als einzelner Befehl mit Flags ausdrückbar sein.

Nichts davon ist neuer Rat für CLI Design. Die Unix-Philosophie sagt das seit fünfzig Jahren. Was neu ist: Es gibt jetzt eine massive und wachsende Nutzerbasis — AI Agents — die genau diese Eigenschaften belohnt.

## Das Pendel schwingt

Wir haben schon Zyklen erlebt. Mainframes zu PCs, Desktop Apps zu Web Apps, Monolithen zu Microservices. Jeder Wechsel verändert, welche Interfaces optimal sind.

Der Agentic Shift bevorzugt Text Interfaces, komponierbare Tools und lazy Context Loading. Er bevorzugt CLIs. Nicht weil GUIs verschwinden — Menschen müssen weiterhin Dinge sehen — sondern weil der am schnellsten wachsende Konsument von Developer Tools keine Augen hat.

Die Tools die in der Agentic-Ära gewinnen, werden die sein, mit denen man einfach reden kann. Und das Einfachste, womit man reden kann, ist ein gut designtes Command-Line Interface das Unix spricht.
