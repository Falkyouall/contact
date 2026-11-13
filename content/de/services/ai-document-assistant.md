---
title: KI-Assistent für Firmendokumente
subtitle: Fragen in normaler Sprache, Antworten mit Quelle aus den eigenen Dokumenten, betrieben im eigenen Netz
date: 2026-11-13
description: "Ein Chat-Assistent wie ChatGPT, der Firmendokumente sucht, liest und mit Quelle zitiert. Im eigenen Netz, mit sicherem SSO-Login, Rollen, Kostenlimits und Sprachmodellen von Microsoft Azure in der EU. Vom Anbinden eines bestehenden DMS bis zum kompletten Aufbau."
contactHeading: "Dokumente befragen statt durchsuchen?"
---

Die Dokumente sind alle da. Verträge, Berichte, Schriftwechsel, abgelegt im Dokumentenmanagementsystem, auf Laufwerken, in Postfächern. Nur rankommen ist mühsam: Wer etwas finden will, muss wissen, wie es heißt, wo es liegt und welches Wort genau so im Text steht. Wer das nicht weiß, fragt eine Kollegin. Oder lässt es.

Ich baue einen Assistenten, den man fragt wie ChatGPT. Er sucht in den Firmendokumenten, liest die passenden und antwortet mit Quellenangabe, sodass sich jede Aussage mit einem Klick nachprüfen lässt.

## Typische Ausgangslage

- Die Suche findet nur, was man wörtlich eintippt, und auch nur, wenn man weiß, wo man suchen muss
- Ein KI-Assistent wäre praktisch, aber Firmendokumente sollen nicht in irgendeinem fremden Chat-Tool landen
- Datenschutz, Zugriffsrechte, laufende Kosten: Die Fragen sind gestellt, beantwortet hat sie noch niemand
- Die KI-Rechnung kommt als eine Summe, und niemand weiß, wer was verbraucht hat

## Leistungsumfang

- **Chat-Oberfläche, die sich wie ChatGPT bedient**, betrieben auf einem eigenen Server im Firmennetz und nur intern erreichbar
- **Sichere Anmeldung per Single Sign-on** mit dem bestehenden Firmenkonto, inklusive Mehr-Faktor-Anmeldung. Kein separates Passwort-Login; Gruppen und Rollen kommen aus der vorhandenen Benutzerverwaltung
- **Rein lesender Zugriff auf die Dokumente.** Rollen steuern, wer suchen darf, wer Volltexte lesen darf und welche Bereiche geschützt bleiben
- **Sprachmodelle von Microsoft Azure in der EU**, in einem Abo im Besitz des Unternehmens (Details im Abschnitt Datenschutz)
- **Kostenkontrolle:** Monatsbudget mit Warnungen, Limits pro Gruppe, Verbrauch pro Mitarbeiter sichtbar
- **Vollständige Übergabe:** Quellcode, Dokumentation, Betriebshandbuch, Kurzanleitung, Einweisung für Team und Admin

Steht die Basis, lässt sie sich ausbauen. Weitere Datenquellen. Word-, Excel- und PDF-Dateien direkt im Chat erzeugen und bearbeiten. Eine semantische Suche, die auch die Klausel findet, in der kein einziges Wort der Frage vorkommt. Oder ein Gateway, das die Kosten in Euro pro Mitarbeiter aufschlüsselt. Jedes davon einzeln, und erst dann, wenn sich zeigt, dass es gebraucht wird.

## Ausgangspunkte

Vorhanden sein muss nichts. Der Einstieg richtet sich danach, was schon steht:

- **Ein DMS mit Suchindex ist vorhanden.** Dann wird der Assistent angebunden, und was schon läuft, bleibt, wie es ist.
- **Die Dokumente sind da, aber nicht durchsuchbar.** Dann baue ich die Indexierung auf, damit der Assistent überhaupt etwas finden kann.
- **Es gibt noch gar nichts.** Dann umfasst das Projekt das volle Programm: Dokumentenmanagement, Indexierung, Server, Login, Azure-Abo und darauf den Assistenten.

Die meisten Unternehmen liegen irgendwo dazwischen. Das klärt sich im ersten Gespräch.

## Volltextsuche oder Vektorsuche?

Damit der Assistent etwas findet, müssen die Dokumente indexiert sein. Dafür gibt es zwei Wege, und sie lösen unterschiedliche Probleme.

**Volltextsuche** findet Dokumente, in denen die gesuchten Wörter wörtlich vorkommen. Für Rechnungsnummern, Namen, Beträge oder Aktenzeichen ist das genau richtig, denn dort zählt der exakte Treffer, nicht die Bedeutung. Neue Dokumente sind sofort auffindbar. Und wo bereits ein Suchindex existiert, kommt nichts Zusätzliches dazu. Die Grenze: Wer die Begriffe des Dokuments nicht kennt, findet es nicht. Der Assistent gleicht das teilweise aus, indem er selbstständig mehrere Suchbegriffe und Synonyme ausprobiert, was oft zu ähnlich guten Ergebnissen führt.

**Vektorsuche** findet zusätzlich Dokumente, die dasselbe meinen, aber anders formuliert sind. Die Frage „Wie kommen wir aus dem Vertrag heraus?“ findet dann auch die Klausel „Beendigung des Vertragsverhältnisses“, obwohl kein einziges Wort übereinstimmt. Das lohnt sich bei inhaltlichen Fragen an lange Texte wie Verträge, Berichte oder Schriftwechsel. Technisch werden die Dokumente dafür in Abschnitte zerlegt, über ein Embedding-Modell bei Azure in der EU eingebettet und in einem eigenen Vektorindex abgelegt, mit denselben Rollen- und Bereichsfiltern wie bei der Volltextsuche. Zu bedenken:

- Beim ersten Einbetten wird der gesamte Dokumentbestand einmal an Azure in der EU übertragen
- Einmalige Kosten für den Bestand, danach geringe laufende Kosten nur für neue und geänderte Dokumente
- Neue Dokumente sind in der Vektorsuche erst nach dem nächsten Abgleich auffindbar, in der Volltextsuche sofort

**In der Praxis laufen beide zusammen**, als hybride Suche: Volltext für das Exakte, Vektoren für die Bedeutung. Der sinnvolle Weg ist meistens, mit der Volltextsuche zu starten und anhand der Testfragen und des Pilots zu entscheiden, ob die Vektorsuche den Aufwand wert ist. Ist sie es nicht, spart man sich Kosten und Komplexität.

## Datenschutz: Microsoft Azure in der EU, im eigenen Abo

Die Sprachmodelle laufen über Azure OpenAI von Microsoft, in einer EU-Region bzw. der EU-Datenzone. Und zwar in einem Azure-Abo, das dem Unternehmen gehört: entweder im bestehenden oder in einem neu eingerichteten. Nicht in meinem, und ohne Drittanbieter dazwischen. Das klingt nach einem Detail. Es ist die Grundlage für alles Weitere:

- **Vertragspartner ist Microsoft.** Ressource, Schlüssel und Rechnung liegen beim Unternehmen, der Vertrag zur Auftragsverarbeitung läuft direkt mit Microsoft. Nach der Übergabe hängt nichts mehr an mir.
- **Dokumentinhalte verlassen das Firmennetz nur in eine Richtung:** zu den Modellen in der EU. Oberfläche, Datenbank, Chats und hochgeladene Dateien bleiben auf dem eigenen Server.
- **Keine Websuche im Dokumenten-Assistenten.** Funktionen, die Anfragen ins offene Netz schicken, bleiben dort abgeschaltet, damit keine Dokumentinhalte in Suchanfragen landen.
- **Chats werden automatisch gelöscht**, samt hochgeladener und im Chat erstellter Dateien, nach einer frei festgelegten Frist. Backups sind verschlüsselt.
- **Admins lesen nicht mit**, sofern das nicht ausdrücklich gewünscht ist. Ausgewertet werden dann nur Verbrauch und Kosten.
- **Unterlagen für den Datenschutzbeauftragten:** Datenflüsse, Speicherorte, Aufbewahrung und Löschkonzept, technisch beschrieben.

Eine Rechtsberatung ersetzt das nicht. Aber der Datenschutzbeauftragte bekommt etwas Konkretes zum Prüfen statt einer Blackbox.

## Warum der Assistent nicht rät

Ein Assistent, der halluziniert, ist schlimmer als gar keiner. Deshalb steckt die meiste Arbeit nicht im Modell, sondern in der Umgebung drumherum, dem [Harness](/de/blog/harness-engineering).

Konkret heißt das: Der Assistent bekommt nur die Werkzeuge, die er wirklich braucht, etwa suchen, lesen und die Quelle öffnen. Jedes weitere würde nur Kontext fressen. Seine Anweisung lautet „suchen statt raten“, Quelle nennen, bei fehlenden Treffern nachfragen. Und ohne gültige Anmeldung oder passende Rolle bekommt er schlicht keine Dokumente zu sehen. Kein Fallback, kein Vielleicht.

Ob die Antworten taugen, entscheidet auch kein Bauchgefühl. Grundlage sind typische Fragen aus dem Arbeitsalltag, an denen der Assistent abgestimmt und getestet wird; danach läuft ein Pilot mit wenigen Mitarbeitenden, und erst nach der Abnahme geht er an alle.

## Vorgehen

Am Anfang steht ein Kick-off mit den Entscheidungen, die vor dem Bau fallen müssen: Wer darf was sehen? Welche Modelle? Wie lange bleiben Chats gespeichert, und wie hoch ist das Monatsbudget? Danach geht es Schritt für Schritt weiter, von der Plattform über den Assistenten bis zu Pilot, Schulung und Übergabe. Jeder Schritt endet mit einem Ergebnis, das man anfassen kann.

Ich arbeite remote und stimme mich direkt mit dem IT-Dienstleister ab, wenn Netzwerk oder Benutzerverwaltung extern betreut werden.

## Wie Preise entstehen

Am Anfang steht ein Gespräch: Welche Dokumente, welche Fragen, wer soll was sehen dürfen, und was steht schon? Daraus entsteht ein Angebot mit einzelnen Arbeitspaketen und einer Aufwandsspanne pro Paket. Abgerechnet wird nach tatsächlichem Aufwand, mit einer Obergrenze, die ohne Abstimmung nicht überschritten wird. Erweiterungen sind einzeln beauftragbar, gleich zu Beginn oder später.

Die laufenden Kosten für die Sprachmodelle rechnet Microsoft direkt über das Azure-Abo des Unternehmens ab, ohne Umweg über mich. Für die Chat-Oberfläche fallen keine Lizenzgebühren an. Der Quellcode der Eigenentwicklungen wird mit einem unbefristeten Nutzungsrecht übergeben.

---

*Kein Chatbot-Experiment. Ein Assistent, der weiß, wo es steht, und es belegen kann.*
