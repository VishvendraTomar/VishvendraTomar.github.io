---
slug: workforce-infrastructure
title: Eine belgische Personaldienstleistungs-Plattform
summary: "05:45 Uhr. Eine Arbeitskraft meldet sich krank, die Schicht beginnt um 06:00. Ein Kollege könnte einspringen, aber die hinterlegte Anmeldung nennt die Person, die gerade abgesagt hat. Die Leitung hat fünfzehn Minuten, um den Ersatz vor Arbeitsbeginn anzumelden."
figure: registration
order: 1
stack: [Python, FastAPI, PostgreSQL, Celery, Flutter]
updated: 2026-11-20
before:
  - "Die erste Version des Gründers lief auf Cloud Functions und Firestore."
  - "Fehlgeschlagene Dimona-Meldungen wurden von Hand wiederholt."
  - "Rund 10.000 Schichten – und das System stieß bereits an seine Grenzen."
after:
  - "Keine verlorenen Meldungen, keine Duplikate, keine manuellen Wiederholungen."
  - "Jede Meldung endet angenommen, wiederholt oder bei einem Menschen."
  - "Über 125.000 Schichten und mehr als 1.000 Unternehmen auf dem neuen Backend."
eyebrow: Behördenmeldungen / Lohnabrechnung
tagline: "Ein Behördensystem, das ausfällt. Meldungen, die nicht scheitern dürfen."
highlights:
  - title: "Drei Ausgänge"
    text: "Jede Meldung endet angenommen, wiederholt oder bei einem Menschen. Keine geht still verloren."
  - title: "Sicher wiederholbar"
    text: "Eine doppelt gesendete Meldung wird erkannt. Die Behörde bekommt nie ein Duplikat."
  - title: "Erst fragen, dann senden"
    text: "Nach einem Absturz fragt das System zuerst, ob die Meldung angekommen ist. Dann entscheidet es."
  - title: "Löhne, die gleich bleiben"
    text: "Lohnregeln werden mit Datum gespeichert. Alte Abrechnungen ergeben immer denselben Betrag."
---
## Meine Rolle

Einer von zwei Entwicklern auf der Plattform. Der Gründer bestimmte die Produktrichtung. Ich habe den Großteil des Backends gebaut und an der Flutter-App mitgearbeitet.

Rund anderthalb Jahre war ich bei GeekyAnts auf diesem Projekt – remote aus Bengaluru und für die finale Auslieferung etwa 20 Tage in Belgien. Mein Teil umfasste die Dimona-Anmeldung, die Anwesenheitsprüfung und die Regeln, die aus Stunden Löhne, Rechnungen und Meldungen machen.

## Drei Ausgänge, nichts geht still verloren

Jede Meldung endet an genau einem von drei Orten: Sie wird angenommen, sie wird wiederholt, oder sie landet in einer Dead-Letter-Queue, wo ein Mensch sie übernimmt. Ein anderes Ergebnis gibt es nicht – also kann keine Meldung unbemerkt verschwinden.

<div class="exits" role="img" aria-label="Eine Meldung geht an Dimona und endet an einem von drei Orten: angenommen, später wiederholt oder in der Dead-Letter-Queue bei einem Menschen.">
  <span class="exits-source">Meldung → Dimona</span>
  <div class="exits-list">
    <span class="exit-ok"><b>Angenommen</b> Anmeldung bestätigt und gespeichert.</span>
    <span class="exit-retry"><b>Wiederholt</b> Vorübergehender Fehler. Nach einer Wartezeit zurück in der Queue.</span>
    <span class="exit-dlq"><b>Dead-Letter-Queue</b> Dauerhafter Fehler oder Wiederholungen erschöpft. Ein Mensch wird alarmiert.</span>
  </div>
</div>

## Eine Meldung sicher wiederholbar machen

Die erste Version verließ sich darauf, dass jemand eine fehlgeschlagene Meldung bemerkt und neu startet. Der Neubau machte das Wiederholen sicher, sodass das System es selbst tun kann.

- **Mindestens-einmal-Zustellung plus Idempotenz.** Die Queue kann denselben Auftrag zweimal ausliefern. Das ist der Preis dafür, nie einen zu verlieren. Jede Meldung trägt eine Identität, also wird ein zweiter Versuch erkannt, statt eine doppelte Anmeldung zu erzeugen.
- **Vorübergehende und dauerhafte Fehler sind verschiedene Probleme.** Ein Timeout oder ein nicht erreichbarer Dienst lohnt einen neuen Versuch. Eine inhaltlich abgelehnte Meldung wird wieder abgelehnt – sie geht direkt an einen Menschen, statt Wiederholungen zu verbrauchen.
- **Nach einem Absturz erst fragen, dann senden.** Ein Submitter kann sterben, nachdem er eine Meldung gesendet, aber bevor er die Antwort gespeichert hat. Der nächste Versuch prüft zuerst den Status bei der Behörde und sendet nur, wenn nichts angenommen wurde.
- **Backoff mit Jitter.** Wenn der Behördendienst zurückkommt, darf ihn ein Schwall wartender Meldungen nicht gleich wieder umwerfen. Wiederholungen warten jedes Mal länger, mit Zufallsanteil, damit sie sich verteilen.

## Drei Entscheidungen, wenn sich eine Schicht ändert

### Eine andere Person ist eine andere Meldung

**Entscheidung.** Bei einem Tausch die Berechtigung des Ersatzes prüfen, die bisherige Zuweisung stornieren und eine neue für die einspringende Person anlegen. Die Anmeldung der ausfallenden Person wird mit der verbleibenden Arbeit abgeglichen. Im Ein-Schicht-Beispiel oben ist der ursprüngliche Zeitraum nun leer.

**Warum.** Gleicher Ort, gleiche Stunden und gleiche Tätigkeit ändern nichts daran, wessen Name im Behördenregister steht. Einen ganzen angemeldeten Zeitraum pauschal zu stornieren, könnte außerdem die Abdeckung für andere Arbeit entfernen.

**Preis.** Die Leitung sieht einen Tausch. Das Backend hat zwei Zuweisungen zu verfolgen, und eine erfolgreiche Stornierung sagt nichts darüber, ob die Meldung des Ersatzes durchging.

### Die Absage kann vor der Antwort kommen

**Entscheidung.** Wird eine Schicht abgesagt, während ihre Meldung noch unterwegs ist, wird die Antwort der Behörde weiter verfolgt. Steht das Ergebnis fest, wird der angenommene Zeitraum mit der noch geplanten Arbeit verglichen. Ist er leer, geht eine Stornierung raus – und auch deren Antwort wird verfolgt.

**Warum.** Die Schicht lokal zu löschen, zieht keine Meldung zurück, die die Behörde schon angenommen hat. Eine Korrektur zu senden, solange das ursprüngliche Ergebnis offen ist, hinterlässt zwei Anfragen, die man entwirren muss.

**Preis.** „Abgesagt“ kann im Dienstplan stimmen, während die externe Korrektur noch aussteht. Das System muss diese offene Arbeit über mehr als eine Antwort hinweg tragen.

### Ein Timeout lässt eine Frage offen

**Entscheidung.** Hat die Meldung eine Quittung, wird ihr Status geprüft. Wird eine wiederholte Übermittlung als Duplikat gemeldet, wird sie mit der bestehenden Anmeldung abgeglichen, sofern sich eine Übereinstimmung herstellen lässt. Erschöpfte Wiederholungen gehen in eine Dead-Letter-Queue. Der Betrieb bekommt ein Signal, wenn die Automatik die Meldung nicht klären kann.

**Warum.** Die Behörde könnte die Anfrage kurz vor dem Verbindungsabbruch angenommen haben. Eine weitere Übermittlung könnte eine Aktion wiederholen, die längst wirksam ist.

**Preis.** Das Nachschlagen kostet einen weiteren Aufruf. Eine geparkte, ungeklärte Meldung lässt jemandem Arbeit zum Nachforschen. Beides ist besser, als einer Leitung zu sagen, eine unbestätigte Person sei angemeldet.

## Was das Einstempeln schwer fälschbar macht

Eine geteilte PIN lässt sich weitergeben. Ein statischer QR-Code lässt sich kopieren. Ein Standort liefert geografischen Kontext, kann aber allein nicht belegen, dass jemand mit dem Stempelpunkt vor Ort interagiert hat.

Ich habe die Prüfung um einen sicheren NFC-Tap, das WLAN des Einsatzorts und den Standort herum gebaut. Der Tap belegt eine physische Interaktion, das WLAN liefert lokalen Netzwerkkontext, der Standort verortet das Gerät. Wer einen Wert kopiert, kann die anderen Beobachtungen nicht erklären. In der Simulation blockieren widersprüchliche Belege das Einstempeln, bevor Stunden in die Lohnabrechnung gelangen.

Der Preis zeigt sich auch an echten Einsatzorten: Eine ehrliche Arbeitskraft kann schwachen Standortempfang oder kein Netzwerksignal haben. Deshalb haben die drei Beobachtungen in der Prüfung unterschiedliche Rollen.

## Löhne, die zweimal gleich herauskommen

Aus geleisteten Stunden werden zwei Dinge: der Lohn der Arbeitskraft und die Rechnung an die Kundschaft. Beide stammen aus demselben Anwesenheitsnachweis, beantworten aber unterschiedliche Fragen.

Lohnregeln ändern sich: Sätze, Zuschläge, gesetzliche Grenzen. Ich habe die Regeln als Daten mit Gültigkeitsdatum gespeichert, statt sie in den Code zu schreiben. Eine Lohnabrechnung wird mit den Regeln berechnet, die am Arbeitstag galten. Wer eine Abrechnung vom letzten Jahr neu berechnet, erhält denselben Betrag wie damals – auch wenn sich die Regeln inzwischen geändert haben.

Geld wird nie als Gleitkommazahl gespeichert. Beträge sind exakte Dezimalzahlen, denn Gleitkomma-Rundung lässt zwischen Lohnabrechnung und Rechnung ein paar Cent abwandern.

Für Operationen, die über MCP angeboten werden, blieben die fachlichen Prüfungen in der Domänenschicht – auch eine Anfrage eines Agenten musste die Regeln der Personaldienstleistung erfüllen.

## Ehrlich zur Größenordnung

Die Plattform startete bei rund **10.000 Schichten**, und das alte System kam bereits an seine Grenzen. Auf dem neuen Backend wuchs sie auf **über 125.000 Schichten** und **mehr als 1.000 Unternehmen**.

Der Traffic war überschaubar. Schwierig war die Korrektheit: Eine doppelte Meldung, eine verlorene Anmeldung oder eine falsche Lohnabrechnung ist bei jedem Volumen ein Problem.

## Dasselbe Problem in anderen Ländern

Andere Länder haben dasselbe Problem mit anderen Regeln. Österreich, Frankreich, Italien und Ungarn verlangen alle eine Anmeldung vor Arbeitsbeginn. [Die Regeln im Vergleich](/de/countries/).
