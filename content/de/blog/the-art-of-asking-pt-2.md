---
title: Die Kunst des Fragens Pt. 2
date: 2026-04-22
description: Komplexe Tickets, schwindende Scham, und warum einen AI nach einer Erklärung zu fragen derselbe Skill ist wie nach einer Lösung.
contactHeading: "AI-Workflow deines Teams verbessern?"
---

Vor ein paar Monaten habe ich [Die Kunst des Fragens](/blog/the-art-of-asking) geschrieben — darüber, dass die Entwickler die am meisten aus Agents rausholen, keinen Code spezifizieren sondern Intent definieren. Der Post ging darum, wie du mit Agents sprichst wenn du willst dass sie etwas bauen.

Dieser geht darum, wie du mit ihnen sprichst wenn du etwas verstehen willst.

## Die Frage, die du nicht gestellt hast

Jeder Entwickler mit dem ich gearbeitet habe, hat die Erinnerung an ein Ticket, das er nicht öffnen wollte. Ein Knäuel aus Akzeptanzkriterien, drei Kommentar-Threads die in verschiedene Richtungen zeigen, ein Figma-Link von 2021, und eine Beschreibung die mit "Wie im Refinement besprochen" anfängt. Du starrst eine Stunde drauf und schaffst nichts. Im Channel fragen willst du auch nicht, weil es Dienstag ist und du diese Woche schon zweimal was gefragt hast. Also schließt du das Ticket und nimmst was Einfacheres.

Dieser Reflex hat nichts mit Skill zu tun. Er hat mit Scham zu tun.

## Fragen kostete mal wirklich was

Es gab ein soziales Konto. Zu viele Fragen im Standup und du wirktest junior. Den Senior in DMs zu fragen fühlte sich an als würdest du seine Zeit klauen. In #dev-help posten und warten, und währenddessen so tun als würdest du an was anderem arbeiten während du Slack refreshst. Wenn du es nicht innerhalb des ungeschriebenen Fensters hingekriegt hast — vielleicht ein Tag, vielleicht weniger — warst du jemandem einen Kaffee schuldig.

Die meisten von uns haben das internalisiert. Wir haben unterm Tisch gegoogelt, Stack Overflow Antworten von 2014 durchgescrollt, drei Sachen probiert die nicht funktioniert haben bevor wir aufgegeben haben.

Diese Kosten sind weg.

## Fragen um zu verstehen, nicht um bauen zu lassen

Der ursprüngliche Post ging um eine Verschiebung darin, wie du Agents promptest zu bauen. Von Spezifikation ("schreib mir eine React-Komponente die X macht") zu Lösung ("fix den Login Flow") zu Intent ("hast du Fragen an mich?"). Verschiedene Modi, der gleiche Skill darunter — zu definieren was wichtig ist.

Die zweite Verschiebung ist subtiler. Es ist, Agents zu bitten dir beim *Denken* zu helfen, nicht nur beim Bauen. Bevor du überhaupt einen Prompt schreibst der nach Code fragt, kannst du zwanzig Minuten damit verbringen nach Klarheit zu fragen.

"Fass dieses Ticket in zwei Sätzen zusammen. Was ist das eigentliche Nutzerproblem?"
"Liste jede unausgesprochene Annahme in dieser Beschreibung auf."
"Was müsstest du wissen bevor du hier anfängst?"
"Brich das in die kleinsten Teile runter die unabhängig shippable sind."
"Welche Fragen würde ein Senior Engineer zu diesem Ticket stellen bevor er etwas anfasst?"

Nichts davon produziert Code. Es produziert Verständnis. Der Code kommt danach.

## Ein Jira-Ticket, in der Praxis

Letzte Woche hab ich mir ein Ticket angeschaut mit fünf Akzeptanzkriterien, von denen drei auf interne Docs verwiesen die ich nicht gelesen hatte. Der alte Instinkt wäre gewesen, erst alle Docs zu lesen, über zwei Stunden ein Mental Model aufzubauen, und dann anzufangen. Der neue Instinkt ist ein anderer.

Ich hab das Ticket in [Claude](https://claude.ai) reingepastet und gefragt:

- Was fragt dieses Ticket eigentlich in einem Satz?
- Was ist die kleinste Änderung die mindestens eines der Akzeptanzkriterien erfüllt?
- Welche Kriterien hängen voneinander ab, welche sind unabhängig?
- Welche Annahmen trifft der Autor die vielleicht nicht stimmen?
- Was würdest du den Ticket-Autor fragen wenn du könntest?

Fünf Minuten später hatte ich einen Split: drei Subtasks die unabhängig shippable waren, zwei Fragen an den Product Owner, und einen Startpunkt der nicht erforderte erst noch etwas anderes zu lesen. Das Ticket war nicht einfacher geworden. Ich wusste nur wie ich anfange.

Der Agent hat das Problem nicht gelöst. Er hat mir geholfen, seine Form zu sehen.

## Die Frage vor der Frage

Das ist für Juniors wichtiger als für Seniors, aber nicht so wie du denken würdest. Juniors verlieren keine Tage mehr an "Ich weiß nicht wo ich anfangen soll" — die versteckte Steuer davon neu zu sein. Seniors bekommen etwas anderes: die Erlaubnis etwas nicht zu wissen. Das unbekannte Framework, der Teil der Codebase den sie zwei Jahre nicht angefasst haben, die Domäne in der sie noch nie gearbeitet haben — sie können fragen ohne junior zu wirken, weil der Agent kein Konto führt.

Beide Enden der Seniority-Kurve bekommen dasselbe: die Reibung beim Zugeben "das verstehe ich noch nicht" geht auf Null. Das ist kein Produktivitäts-Boost. Es ist ein kultureller Shift. Der Grund warum sich die meisten komplexen Aufgaben lähmend anfühlen ist nicht, dass sie tatsächlich komplex sind — sondern dass die Kosten dumm anzufangen zu hoch sind. Wenn diese Kosten auf Null fallen, fängst du an.

Teil 1 hat gesagt, das Schwierige war zu definieren was wichtig ist. Das stimmt noch. Aber bevor du definieren kannst was wichtig ist, musst du oft verstehen was gefragt ist — und historisch trug dieser Schritt soziale Kosten, die die meisten nicht laut bezahlen wollten. Jetzt nicht mehr. Du kannst die dumme Frage so oft stellen wie du brauchst, in jeder Formulierung, ohne Urteil, und iterieren bis du es wirklich verstehst. Dieser Schritt war früher privat, beschämend und langsam. Jetzt ist er schnell und kostenlos.

Die Antwort war immer 42. Die Frage war immer das Schwierige. Was sich geändert hat: die Frage herauszufinden ist billiger geworden.
