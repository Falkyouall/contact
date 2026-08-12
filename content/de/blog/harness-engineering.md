---
title: "Harness Engineering: Dein Modell ist gut genug. Deine Umgebung nicht."
date: 2026-08-05
description: "Dasselbe KI-Modell, doppelte Erfolgsquote nur durch eine bessere Umgebung? Was Harness Engineering ist und wie du es konkret umsetzt."
contactHeading: "Lass uns zusammen einen Harness-Prototypen entwickeln!"
---

Jedes Mal, wenn ein neues Modell erscheint, passiert das Gleiche. Benchmarks werden geteilt, Threads geschrieben, irgendwer erklärt, dass jetzt wirklich alles anders wird. Dann bauen Teams das neue Modell in ihre Agents ein und stellen fest: besser, ja. Aber nicht *so viel* besser.

Der größte Hebel liegt woanders. Dasselbe Modell kann seine Erfolgsquote verdoppeln, ohne dass am Modell irgendetwas geändert wird. Verändert wird nur die Umgebung drumherum. Das Harness.

## Was ein Harness überhaupt ist

Der Begriff kommt eigentlich vom Geschirr, mit dem man ein Zugpferd lenkt. Warum das Pferd wechseln, wenn man das Geschirr noch nicht richtig eingestellt hat?
Hier wird gerne mal ein wichtiger Schritt übersprungen. Aber genug von Pferden, wie machen wir das für die KI!?

Übersetzt auf Agents ist das Harness ganz einfach gesagt alles zwischen Modell und Ergebnis: die Instructions, die der Agent liest. Die Tools, die er benutzen darf. Der Kontext, den er sieht, die Checks, die seine Arbeit validieren, und die Schleifen, über die Feedback zu ihm zurückfließt. Das Modell selbst bleibt unangetastet, und genau das macht Harness Engineering so attraktiv. Du musst nicht auf das nächste Release warten. Du kannst heute anfangen, und sparst dabei auch wertvolle Tokens, weil du nicht sofort das neueste Frontier-Modell aktivieren musst, sobald es released wurde!

## Gleiches Modell, doppelte Leistung

Auf das Konzept gestoßen bin ich über [OpenClaw](https://openclaw.ai), genauer über [Pi](https://pi.dev), das minimalistische Harness von Mario Zechner, auf dem OpenClaw basiert. Vier Tools. Ein System-Prompt unter tausend Tokens. Alles Weitere sind Extensions, die im Harness laufen statt außerhalb - und dieses bewusst kleine Harness trägt einen Agent, der in wenigen Wochen über 300.000 GitHub-Stars gesammelt hat. Richtig gepackt hat mich das Thema dann auf der OpenClaw-Konferenz in München, wo ich Robert Glaser ([Exxeta](https://exxeta.com)) und viele kreative Köpfe kennengelernt und mich mit ihnen über Harness Engineering ausgetauscht habe.

Wie groß der Hebel messbar ist, zeigt ein [Artikel von Exxeta](https://exxeta.com/blog/harness-engineering-ki-agenten-optimieren), in dem Glaser das Konzept erklärt: Auf dem Holistic Agent Leaderboard von Princeton verdoppelte dasselbe Modell seine Erfolgsquote von 34 auf 68 Prozent, allein durch Harness-Optimierung. LangChain maß auf einem anspruchsvollen Benchmark ein Plus von 13,7 Punkten. Kein neues Modell, kein Fine-Tuning. Nur ein besseres Geschirr.

Das deckt sich mit dem, was ich [im Post über CLIs](/de/blog/the-case-for-clis-in-the-agentic-age) beschrieben habe: Vercel ersetzte den Großteil seines Custom Agent Toolings durch ein Filesystem- und ein Bash-Tool und wurde damit 3,5x schneller, verbrauchte 37 % weniger Tokens, und die Erfolgsquote stieg von 80 auf 100 Prozent. Das war Harness Engineering, bevor ich ein Wort dafür hatte.

## Die Stellschrauben in der Praxis

Klingt abstrakt, ist es aber nicht. In einer echten Codebasis sind es vier Dinge:

- **Kontext und Konventionen.** Eine `CLAUDE.md` oder `AGENTS.md`, in der Projektstruktur, Konventionen und No-Gos dokumentiert sind. Der Agent orientiert sich selbst, statt in jedem Prompt alles neu erklärt zu bekommen. Strukturierte Doku schlägt lange Prompts, jedes Mal.
- **Kuratiertes Tooling.** Jedes Tool, das ein Agent kennt, kostet Context — noch bevor er angefangen hat zu arbeiten. Weniger, dafür passende Tools machen Agents schneller und zuverlässiger für den Task.
- **Memory und State.** Was bleibt über Sessions hinweg erhalten? Projekt-Kontext, getroffene Entscheidungen, Patterns, die funktioniert haben. Ohne Gedächtnis fängt unser Zugpferd immer wieder bei null an. Fortgeschrittene Harnesses staffeln das Gedächtnis sogar in Schichten — Arbeitskontext, frühere Läufe, Faktenwissen — mit hartem Zeichenbudget statt endlosem Anhäufen.
- **Fehlerpfade.** Was passiert, wenn etwas schiefgeht? Retry, Fallback, kontrollierter Abbruch? Ein Agent, der bei Unsicherheit rät, ist gefährlicher als einer, der stehen bleibt und meldet - Fail fast nennen wir das im Software Engineering, wenn immer etwas Essenzielles fehlt oder fehlschlägt, muss das System direkt laut fehlschlagen, bevor es zu Folgefehlern kommen kann, die hinterher wirklich teuer werden!

## Backpressure: der unterschätzte Teil

Der interessanteste Teil des Harness ist der Gegendruck. Tests, Linter, Type Checker, CI, alles, was dem Agent *während* der Arbeit widerspricht, nicht erst im Review danach. Der Agent schreibt Code, der Test schlägt fehl, der Agent korrigiert. Ohne dass ein Mensch involviert war.

Und Backpressure muss nicht intelligent sein. Ein striktes Namensschema, gegen das ein Validator prüft, ist Backpressure. Ein Schema, das unvollständige Metadaten ablehnt, auch. Manche der zuverlässigsten Harnesses, die ich kenne, sind komplett deterministisch: Das Ergebnis entspricht der definierten Struktur, oder es wird nicht weiterverarbeitet und landet in einem Report. Binär. Kein LLM-Judge nötig.

Die Königsdisziplin ist Outcome Grading: nicht die Arbeitsschritte bewerten, sondern das Ergebnis selbst maschinell prüfen. Je näher deine Checks am tatsächlichen Geschäftsergebnis sind, desto autonomer kann der Agent arbeiten.

## Vom Loop zum System

Wie weit man diesen Gedanken treiben kann, zeigt ein [technischer Deep Dive von Data For Science](https://data4sci.com/blog/building-an-advanced-agentic-harness). Die Kernaussage dort: Ein fortgeschrittenes Harness ist kein Framework, sondern Komposition. Kleine, einzeln testbare Bausteine, dazwischen ein bewusst dünner Orchestrator.

Ein paar dieser Bausteine lohnen sich als Anregung auch im Kleinen. Tools mit typisierten, validierten Argumenten, damit Fehler an der Schemagrenze auffliegen statt mitten im Tool-Call. Ein Plan als Abhängigkeitsgraph, damit unabhängige Schritte parallel laufen können. Getrennte Rollen für Planen, Ausführen und Bewerten, die sich einzeln testen und austauschen lassen. Und ein Budget, das mehr kennt als `max_steps`: Tokens, Tool-Calls, Zeit und Kosten ergeben zusammen einen Druckwert. Steigt der Druck, degradiert das System kontrolliert. Erst übernehmen die günstigen deterministischen Checks allein, dann wird sauber gestoppt. Alles mit Trace, damit man hinterher nachvollziehen kann, was wann warum passiert ist.

Keiner dieser Bausteine braucht die anderen gezwungenermaßen. Aber zusammen machen sie aus einem LLM-Loop ein System, das planen, handeln, sich erholen und belegen kann, dass es das Richtige getan hat.

## Wo der Mensch bleibt

Ein gutes Harness schafft Menschen nicht ab. Es sortiert neu, wo wir gebraucht werden.

Routine-Feedback läuft automatisiert: Kompiliert es? Bestehen die Tests? Hält es die Sicherheitsregeln ein? Menschen sitzen an definierten Gates und treiben Architekturentscheidungen, fachliche Abnahmen und riskante Änderungen. Nicht bei jedem Zwischenschritt, aber da wo es wirklich wichtig ist.

Damit verschiebt sich die zentrale Frage. Sie lautet nicht mehr „[Wie schreibe ich den perfekten Prompt?](/de/blog/the-art-of-asking)", sondern: **Woran erkennen wir, dass das Ergebnis gut ist?** Das ist keine KI-Frage, sondern eine Team-Frage. Product Owner definieren Erfolgskriterien, Fachexpert:innen liefern Messkriterien, QA formuliert Qualitätskriterien. Wer das beantworten kann, kann es in Checks gießen. Und wer Checks hat, hat ein Harness.

## Das Harness ist der Wettbewerbsvorteil

Wenn Agents mit gutem Harness zuverlässig liefern, ändert sich mehr als die Geschwindigkeit. Es werden mehr Experimente möglich: mehrere Lösungsvarianten parallel bauen und die beste nehmen, statt vorher zu diskutieren, welche es werden soll. Mutigere Ideen werden getestet, weil ein Versuch fast nichts mehr kostet.

Die Modelle sind für alle gleich. Jeder kann dieselbe API aufrufen. Der Unterschied zwischen Teams, die mit Agents beeindruckende Demos bauen, und Teams, die damit verlässliche Prozesse betreiben, liegt nicht im Modell - er liegt im [Harness](/de/services/harness-engineering).

Die Frage ist nicht mehr, ob du Agents einsetzt. Die Frage ist, wie gut dein Harness sitzt.
