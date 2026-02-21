---
title: Die Kunst des Fragens
date: 2026-02-21
description: Die Agentic Trap Curve, Deep Thought und warum es wichtiger ist zu wissen was man fragt, als zu wissen wie man es baut.
contactHeading: "AI-Workflow deines Teams verbessern?"
---

In [Per Anhalter durch die Galaxis](https://en.wikipedia.org/wiki/The_Hitchhiker%27s_Guide_to_the_Galaxy) baut eine Zivilisation einen Supercomputer namens Deep Thought, um die ultimative Frage nach dem Leben, dem Universum und dem ganzen Rest zu beantworten. Deep Thought rechnet 7,5 Millionen Jahre und liefert die Antwort: 42. Das Problem ist natürlich, dass niemand weiß, was die eigentliche Frage war. Die Antwort ist perfekt. Die Frage wurde nie definiert.

Ich muss ständig an diese Szene denken, wenn ich beobachte, wie Entwickler mit AI Agents interagieren.

## Die Agentic Trap

[Peter Steinberger](https://steipete.me/posts/just-talk-to-it) hat im [Lex Fridman Podcast](https://lexfridman.com/peter-steinberger/) etwas beschrieben, das er die Agentic Trap nennt. Es ist eine Kurve. Auf der linken Seite fängt man mit einfachen Prompts an. "Please fix this." Dann entdeckt man, wie mächtig Agents sind und geht in die Tiefe. Acht parallele Agents, komplexe Orchestrierung, Multi-Checkouts, verkettete Agents, eigene Sub-Agent Workflows, eine Bibliothek von 18 verschiedenen Slash Commands. Man ist organisiert. Man ist ausgeklügelt. Man hat die volle Kontrolle.

Und dann, wenn man weitermacht, landet man irgendwo Unerwartetes. Wieder bei kurzen Prompts. "Hey, schau dir diese Dateien an und mach dann diese Änderungen." Das Elite-Level, wie Peter es nennt, ist Zen.

Diese Kurve ist nicht wegen der Prompts selbst interessant, sondern wegen dem, was sich zwischen der linken und der rechten Seite verändert. Die Prompts sehen gleich aus. Die Person dahinter nicht.

## Was Entwickler verlangen

Ich habe darauf geachtet, wie Entwickler um mich herum mit Agents reden. Nicht was die Agents produzieren — was die Entwickler verlangen. Und es gibt ein Muster.

Am Anfang fragen Leute nach Implementierungen. "Schreib mir eine React-Komponente die X macht mit Y und Z." Der Prompt ist eine Spezifikation. Jedes Detail ausformuliert, weil der Entwickler genau weiß wie der Code aussehen soll und ihn im Grunde durch natürliche Sprache diktiert. Der Agent ist ein Schreiber.

Dann fangen sie an, nach Lösungen zu fragen. "Der Login Flow ist kaputt, die Session läuft zu früh ab, fix das." Weniger Vorschrift, mehr Intent. Der Agent bekommt Raum zu untersuchen, einen Ansatz zu wählen und umzusetzen.

Aber die Leute, die am meisten aus Agents rausholen, fragen nach etwas ganz anderem. Sie stellen Fragen. "Hast du Fragen an mich?" Peter hat das im Interview erwähnt — er fragt den Agent ob er Fragen hat, überfliegt sie, und oft ist die Antwort einfach "lies mehr Code um deine eigenen Fragen zu beantworten." Er dirigiert nicht. Er führt ein Gespräch mit etwas, das die Codebase in jeder einzelnen Session von Null aus sieht.

Der Wandel liegt nicht in der Prompt-Komplexität. Er liegt darin, was der Entwickler als seine Aufgabe betrachtet. Spezifizierst du Code, löst du Probleme, oder definierst du Intent?

## Deep Thoughts eigentliches Problem

Der Witz im Anhalter funktioniert, weil er absurd ist. Aber der Punkt dahinter ist scharf. Deep Thought hat nicht versagt. Er hat exakt das geliefert, was verlangt wurde. Die Zivilisation hat versagt, weil sie Millionen von Jahren auf eine Antwort gewartet hat, deren Frage sie nie sauber formuliert hatte.

Eine Version davon spielt sich gerade in der Softwareentwicklung ab. Agents sind unfassbar fähig. [Claude](https://claude.ai), [Codex](https://openai.com/codex/), was auch immer du benutzt — sie können Codebases navigieren, Tests schreiben, Module refactoren, Features shippen. Der Engpass ist nicht die Fähigkeit der Maschine, Output zu produzieren. Der Engpass ist die Fähigkeit des Menschen zu definieren, was wichtig ist.

Und zu definieren was wichtig ist, ist kein Prompting Skill. Es ist ein Engineering Skill. Es ist eine Denkfähigkeit.

## Der Hintergrund, den man wirklich braucht

Peter hat eine Beobachtung über erfahrene Programmierer gemacht, die mir hängen geblieben ist. Er sagte, dass für manche erstklassige Programmierer ihre Expertise fast eine Last ist in ihrer Fähigkeit, sich in das System einzufühlen. Sie wissen genau wie der Code aussehen soll, bis hin zu Variablennamen und Edge Case Handling. Dieses Wissen macht es schwer, loszulassen und den Agent das Problem anders angehen zu lassen.

Aber es gibt eine Kehrseite. Wenn du nicht genug Hintergrund hast, weißt du nicht was du fragen sollst. Du bekommst vielleicht funktionierenden Code der das falsche Problem löst, oder es auf eine Art löst die bei Skalierung auseinanderfällt. Der Agent wird dir nicht sagen, dass deine Architektur falsch ist, wenn er deine Constraints nicht kennt. Er weiß nicht, was du nächsten Monat bauen willst.

Was muss man also im Zeitalter der AI-gestützten Entwicklung wirklich wissen? Ich denke es ist das: Man muss Systeme gut genug verstehen um die richtige Frage zu stellen, aber locker genug um die Antwort nicht zu diktieren.

Das bedeutet zu verstehen, wie eine Webanwendung zusammenpasst — was das Frontend macht, was das Backend macht, wo State lebt, wie Daten fließen. Nicht unbedingt, wie man jeden Teil davon von Hand schreibt. Zu verstehen warum man PostgreSQL statt Firebase für einen bestimmten Use Case wählt, auch wenn man selbst nie eine rohe SQL Migration geschrieben hat. Zu verstehen was WCAG Compliance für die Nutzer bedeutet, auch wenn der Agent das barrierefreie Markup generiert.

Architektur, Tradeoffs, Nutzerbedürfnisse, Constraints. Die Dinge, die sich nicht ändern wenn sich das Implementierungswerkzeug ändert.

## 42

Deep Thought hat am Ende offenbart, dass das Problem nicht war die Antwort zu berechnen — sondern dass ein viel größerer Computer nötig wäre um die eigentliche Frage herauszufinden. Dieser Computer stellte sich als die Erde selbst heraus. Die Frage erforderte, darin zu leben. Sie zu erfahren. Nicht sie zu berechnen.

Da steckt etwas Ehrliches drin. Die richtige Frage kommt nicht aus einem System Prompt oder einer sorgfältig gebauten Kette von Agents. Sie kommt aus dem Wissen über die eigene Domäne. Aus dem Meeting, in dem der Product Owner erklärt hat, womit Nutzer wirklich kämpfen. Aus dem Production Outage den man um 2 Uhr nachts debuggt hat und dabei ein Gespür dafür entwickelt hat, was wichtig ist und was nicht. Aus drei Versionen von etwas, die man gebaut hat, und dem Wissen welche Entscheidungen man anders treffen würde.

Peter spricht davon, das Handwerk der Programmierung zu betrauern, und ich verstehe das. Der Flow State beim Code Schreiben und eine elegante Lösung finden — das war echt. Aber er formuliert es auch um: Du bist nicht nur ein Programmierer. Du bist ein Builder. Und Bauen war nie nur Tippen.

Die Entwickler, die im Agentic Age erfolgreich sind, werden nicht die sein, die die detailliertesten Prompts schreiben oder die komplexesten Agent Pipelines orchestrieren. Es werden die sein, die wissen was sie bauen wollen und warum. Die, die auf eine Codebase schauen können, auf den Output eines Agents, auf ein Set von Anforderungen, und sagen — das ist nicht die richtige Frage. Lass mich das umformulieren.

Die Antwort war immer 42. Das Schwierige war immer die Frage.
