---
title: Harness Engineering
subtitle: Damit deine KI-Agenten zuverlässig liefern — mit den Modellen, die du schon hast
date: 2026-08-05
description: "Harness Engineering für KI-Agenten: Kontext, kuratiertes Tooling, automatisierte Checks und messbare Erfolgskriterien. Damit aus Agent-Demos verlässliche Prozesse werden."
contactHeading: "Bereit für ein Harness um deine Agents?"
---

Wenn ein Agent enttäuscht, bekommt das Modell die Schuld. Meistens zu Unrecht. Dasselbe Modell kann seine Erfolgsquote verdoppeln, wenn die Umgebung stimmt: Kontext, Tools, Checks, Feedback-Schleifen. Diese Umgebung heißt Harness, und sie ist baubar — [warum das funktioniert, steht im Blogpost](/de/blog/harness-engineering).

## Kennst du das?

- Der Agent liefert beeindruckende Demos, aber im Alltag ist jedes Ergebnis Glückssache
- Jeder im Team nutzt Agents anders, und die Resultate sehen entsprechend unterschiedlich aus
- Fehler fallen erst auf, wenn jemand das Ergebnis braucht, nicht wenn sie passieren
- Auf die Frage „Woran erkennen wir, dass das Ergebnis gut ist?" gibt es keine Antwort

## Was sich ändert

- Ein dokumentiertes Agent-Setup: Instructions und Konventionen, die im Repo leben statt in Köpfen
- Ein kuratiertes Toolset statt Tool-Wildwuchs, der nur Context frisst
- Automatisierte Checks als Gegendruck, die validieren, während der Agent arbeitet — nicht als Review danach
- Definierte Punkte, an denen Menschen eingreifen, und nur dort
- Erfolgskriterien, die man messen kann, statt Bauchgefühl

## Wie ich arbeite

Ich fange nicht mit Architektur-Diagrammen an, sondern mit eurem echten Workflow: wo ein Agent heute scheitert, was ein gutes Ergebnis ausmacht, und welche Checks das automatisch prüfen können. Dann entsteht das Harness Stück für Stück, messbar, mit Vorher/Nachher.

Ich bin selbst Tech Lead und denke das von innen: was den Alltag übersteht, was zur Gewohnheit wird, was nur Hype war.

## Aus der Praxis

Aktuell baue ich mit einem Kunden eine automatisierte Dokumenten-Pipeline: Analyse, Zuordnung, Ablage. Das Harness dahinter ist bewusst deterministisch. Jedes Dokument wird nach einer festen Namensstruktur umbenannt und genau gegen diese Struktur geprüft. Passt sie, wird abgelegt. Passt sie nicht, wird das Dokument nicht weiterverarbeitet — stattdessen landet der Dateiname in einem automatischen E-Mail-Report an den Kunden. Ein Mensch korrigiert die Datei, und der Cronjob nimmt sie am nächsten Tag wieder mit in die Pipeline. Kein Dokument verschwindet still im falschen Ordner, und niemand kontrolliert Ablagen, die ohnehin stimmen.

## Wie Preise entstehen

Keine Stundensätze, keine Preisliste. Am Anfang steht ein Gespräch über das Problem, und darüber, was seine Lösung für dein Geschäft wert ist. Danach bekommst du ein Festpreis-Angebot in drei Zuschnitten (schlank, komplett, premium), damit du Umfang und Budget selbst austarieren kannst.

---

*Das ist kein Prompt-Workshop. Das ist Infrastruktur für Agents, die man messen kann.*
