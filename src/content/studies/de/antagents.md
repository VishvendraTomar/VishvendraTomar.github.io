---
slug: antagents
title: Ant Agents
summary: "Eine robuste Laufzeitumgebung für LLM-Agenten bei GeekyAnts. Sie hat Onboarding, Compliance-Prüfungen und das Nachfassen von Stundenzetteln per E-Mail abgelöst und betreibt heute über 20 Workflows für mehr als 300 Mitarbeitende."
figure: automation
order: 2
stack: [AWS, MCP, Durable Execution]
before:
  - "Onboarding, Homeoffice-Compliance-Prüfungen und das Nachfassen von Stundenzetteln liefen von Hand, per E-Mail."
  - "Prozesse dauerten Tage."
  - "Ausfälle waren häufig."
after:
  - "Über 20 produktive Workflows für mehr als 300 Mitarbeitende."
  - "Prozesse, die Tage dauerten, sind innerhalb eines Tages erledigt."
  - "Ausfälle sanken von häufig auf nahezu null."
eyebrow: Robuste Agenten-Laufzeitumgebung
tagline: "LLM-Agenten kommen vom Kurs ab, stürzen ab und verbrennen Geld. Diese nicht."
highlights:
  - title: Fortsetzen statt neu starten
    text: Ein Worker stirbt bei Schritt 4 von 7. Ein anderer macht am Checkpoint weiter, ohne Schritte 1–3 zu wiederholen.
  - title: Deterministisches Replay
    text: Aufgezeichnete Modell- und Tool-Ausgaben spielen einen fehlgeschlagenen Lauf exakt nach – ein einmaliger Fehler wird untersuchbar.
  - title: Kontext statt Verlauf
    text: Eine Kostenspitze kam von aufgeblähtem Kontext. Ein Context Builder gibt jedem Schritt nur noch, was er braucht.
  - title: Guardrails in Schichten
    text: Tool-Berechtigungen, Limits, Schemaprüfungen, menschliche Freigabe und ein Audit-Log. Ein Prompt bittet; eine Guardrail setzt durch.
---
## Meine Rolle

Die Agenten-Infrastruktur und die Modellierung habe ich allein verantwortet und den Großteil des Backends gebaut. Business Analysts stellten auf der Plattform Prozesse aus vorhandenen Agenten zusammen. Entwickler konnten sie um einen neuen Agenten erweitern, wenn ein Prozess eine weitere Fähigkeit brauchte. Die Plattform lief intern auf AWS; die Agenten erreichten andere Systeme über MCP-Tools.

## Das Problem

Neue Mitarbeitende einarbeiten, Homeoffice-Compliance prüfen und fehlenden Stundenzetteln hinterherlaufen – all das erledigten Menschen, die E-Mails schrieben. Jeder Prozess dauerte Tage, weil jeder Schritt darauf wartete, dass jemand an den nächsten dachte.

Übergibt man diese Arbeit an LLM-Agenten, kommen drei neue Probleme hinzu. Ein Agent kann vom Kurs abkommen. Ein Lauf kann mittendrin abstürzen. Und ein Lauf kann weit mehr kosten als nötig, ohne dass es jemand merkt, bis die Rechnung kommt. Die Laufzeitumgebung existiert, um genau diese drei Dinge verlässlich zu machen.

## Ein Workflow von Anfang bis Ende

Ignoriert jemand eine Erinnerung an den Stundenzettel, liest ein Agent über ein MCP-Tool die GitHub-Commits der Person aus dieser Woche. Daraus entwirft er den Eintrag und schickt den Entwurf zur Freigabe an einen Menschen. Niemand muss hinterherlaufen, und ohne Ja wird nichts eingereicht.

## Ein Absturz bei Schritt 4 von 7

Ein Workflow kann zwischen den Schritten auf Menschen warten, und in der Zwischenzeit starten Worker neu, werden neu ausgerollt oder fallen aus. Stirbt die Maschine, die einen Workflow ausführt, bei Schritt 4 von 7, ist ein Neustart keine Option: Schritt 2 hat bereits jemandem eine E-Mail geschickt.

Jeder abgeschlossene Schritt wird mit seinem Ergebnis als Checkpoint gesichert. Verschwindet ein Worker, übernimmt ein anderer den Lauf, lädt den letzten Checkpoint und macht bei Schritt 4 weiter. Schritte 1–3 laufen nicht erneut. Die Simulation oben zeigt beide Varianten.

> **Entscheidung.** Den Zustand eines laufenden Workflows getrennt halten vom Kontext, der einem Modellaufruf mitgegeben wird. Ein Prozess kann eine lange Geschichte haben, auch wenn der nächste Agent nur einen kleinen Teil davon braucht.

## Ein Modell debuggen, das nie zweimal gleich antwortet

Ein LLM-Aufruf ist nicht deterministisch. Schlägt ein Lauf fehl, reproduziert ein erneuter Modellaufruf den Fehler nur selten. Deshalb zeichnet die Laufzeitumgebung jede Modellausgabe und jedes Tool-Ergebnis während des Laufs auf.

Zum Debuggen spiele ich den Lauf aus dieser Aufzeichnung ab. Dieselben Eingaben führen Schritt für Schritt zum selben Pfad – ohne das Modell aufzurufen oder echte Systeme zu berühren. Ein Fehler, der einmal passiert ist, lässt sich so oft untersuchen wie nötig.

## Die Kostenspitze

Irgendwann stiegen die Kosten stark an. Die Ursache war aufgeblähter Kontext: Jeder Schritt schickte dem Modell mehr und mehr vom Verlauf des Workflows, das meiste davon ohne Bezug zum aktuellen Schritt.

Die Lösung war ein Context Builder. Er stellt aus dem Workflow-Zustand nur zusammen, was der nächste Schritt braucht, statt den ganzen Verlauf weiterzureichen. Das ist die Entscheidung oben, in der Praxis.

## Guardrails sind Schichten, kein Prompt

Ein Prompt bittet; eine Guardrail setzt durch. Einem Modell zu sagen „reiche nichts ohne Freigabe ein“ ist eine Bitte. Die Laufzeitumgebung macht daraus eine Regel:

- **Tool-Berechtigungen.** Jeder Agent darf nur die Tools aufrufen, die sein Workflow freigibt.
- **Limits.** Läufe sind begrenzt, sodass ein verwirrter Agent anhält, statt in einer Schleife zu laufen.
- **Schemaprüfungen.** Modellausgaben, die nicht der erwarteten Struktur entsprechen, werden abgewiesen, bevor sie ein anderes System erreichen.
- **Menschliche Freigabe.** Folgenreiche Aktionen warten auf einen Menschen.
- **Audit-Log.** Jeder Schritt, jeder Tool-Aufruf und jede Entscheidung wird aufgezeichnet.

## Wo Menschen beteiligt blieben

Ein Prozess bereitete Abrechnungsinformationen vor, die ein Mensch freigeben musste. Diese Grenze war wichtig: Die Vorbereitung zu automatisieren sparte Nacharbeit, während die endgültige Entscheidung bei der verantwortlichen Person blieb.

## Was ich heute anders machen würde

Die Durable-Execution-Schicht habe ich selbst geschrieben: Checkpoints, das Übernehmen verwaister Läufe und deren Fortsetzung. Heute würde ich auf einer bestehenden Durable-Execution-Engine aufbauen und die Zeit in die agentenspezifischen Teile stecken: Context Building, Guardrails und Replay.
