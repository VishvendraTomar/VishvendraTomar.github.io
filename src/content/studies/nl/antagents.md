---
slug: antagents
title: Ant Agents
summary: "Vrijdagmiddag. Er ontbreken weer urenstaten. Iemand moet elke persoon mailen en maandag opnieuw navragen. Ik bouwde het systeem dat dit nu met AI-agents doet, voor meer dan 300 medewerkers."
figure: automation
order: 2
updated: 2026-11-20
stack: [AWS, MCP, Durable execution]
before:
  - "Onboarding, compliancecontroles voor thuiswerk en het najagen van urenstaten gebeurden met de hand, via e-mail."
  - "Processen duurden dagen."
  - "Fouten kwamen vaak voor."
after:
  - "Meer dan 20 live workflows op de runtime die ik bouwde, voor meer dan 300 medewerkers."
  - "Processen die dagen duurden, zijn binnen een dag klaar."
  - "Fouten gingen van vaak naar bijna nul."
eyebrow: Robuuste agent-runtime
tagline: "AI-agents die hun werk afmaken, ook na een crash."
highlights:
  - title: "Hervatten, niet herstarten"
    text: "Een worker crasht bij stap 4 van 7. Een andere gaat verder bij stap 4. Niets loopt twee keer."
  - title: "Elke fout naspelen"
    text: "Elk modelantwoord wordt opgenomen. Een mislukte run kan stap voor stap exact opnieuw worden afgespeeld."
  - title: "Context, geen geschiedenis"
    text: "De kosten stegen toen elke stap de hele geschiedenis kreeg. Nu krijgt elke stap alleen wat hij nodig heeft."
  - title: "Guardrails in lagen"
    text: "Rechten, limieten, controles, menselijke goedkeuring en een auditlog. Een prompt vraagt; een guardrail dwingt af."
---
## Mijn rol

Ik was alleen verantwoordelijk voor de agent-infrastructuur en de modellering, en bouwde het grootste deel van de backend. Business analysts stelden op het platform processen samen uit bestaande agents. Ontwikkelaars konden een nieuwe agent toevoegen als een proces een extra vaardigheid nodig had. Het platform draaide intern op AWS, en agents bereikten andere systemen via MCP-tools.

## Het probleem

Nieuwe collega’s onboarden, thuiswerkcompliance controleren en ontbrekende urenstaten najagen: dat deden mensen die e-mails schreven. Elk proces duurde dagen, omdat elke stap wachtte tot iemand aan de volgende dacht.

Wie dat werk aan LLM-agents geeft, krijgt drie nieuwe problemen. Een agent kan ontsporen. Een run kan halverwege crashen. En een run kan veel meer kosten dan nodig, zonder dat iemand het merkt tot de rekening komt. De runtime bestaat om die drie dingen betrouwbaar te maken.

## Eén workflow van begin tot eind

Negeert een medewerker een herinnering voor de urenstaat, dan leest een agent via een MCP-tool de GitHub-commits van die week. Daarmee stelt hij de urenstaat op en stuurt het concept ter goedkeuring naar een mens. Niemand hoeft iemand na te jagen, en zonder ja wordt niets ingediend.

## Een crash bij stap 4 van 7

Een workflow kan tussen stappen op mensen wachten, en ondertussen herstarten workers, worden ze opnieuw uitgerold of vallen ze uit. Sterft de machine die een workflow uitvoert bij stap 4 van 7, dan is opnieuw beginnen geen optie: stap 2 heeft al iemand gemaild.

Elke afgeronde stap wordt met zijn resultaat als checkpoint opgeslagen. Verdwijnt een worker, dan neemt een andere de run over, laadt het laatste checkpoint en gaat verder bij stap 4. Stappen 1–3 lopen niet opnieuw. De simulatie hierboven toont beide varianten.

> **Beslissing.** Houd de toestand van een lopende workflow gescheiden van de context die je aan een modelaanroep meegeeft. Een proces kan een lange geschiedenis hebben, ook als de volgende agent maar een klein deel nodig heeft.

## Een model debuggen dat nooit twee keer hetzelfde antwoordt

Een AI-model kan elke keer anders antwoorden. Een fout komt bij een nieuwe poging dus vaak niet terug. Dat maakt debuggen lastig. Daarom neemt de runtime elke modeluitvoer en elk toolresultaat op terwijl de run loopt.

Om te debuggen speel ik de run af vanaf die opname. Dezelfde invoer levert stap voor stap hetzelfde pad op, zonder het model aan te roepen of echte systemen aan te raken. Een fout die één keer gebeurde, kan zo vaak als nodig worden onderzocht.

## De kostenpiek

Op een gegeven moment stegen de kosten sterk. Elke stap stuurde het model steeds meer tekst, en het meeste was overbodig. Dat heet opgeblazen context: de hele workflowgeschiedenis ging bij elke aanroep mee.

De oplossing was een context builder. Die stelt uit de workflowtoestand alleen samen wat de volgende stap nodig heeft, in plaats van de hele geschiedenis door te geven. Dat is de beslissing hierboven, in de praktijk.

## Guardrails zijn lagen, geen prompt

Een prompt vraagt; een guardrail dwingt af. Een model zeggen „dien niets in zonder goedkeuring” is een verzoek. De runtime maakt er een regel van:

- **Toolrechten.** Elke agent mag alleen de tools aanroepen die zijn workflow toestaat.
- **Limieten.** Runs zijn begrensd, zodat een verwarde agent stopt in plaats van rond te blijven draaien.
- **Schemacontroles.** Modeluitvoer die niet aan de verwachte structuur voldoet, wordt geweigerd voordat ze een ander systeem bereikt.
- **Menselijke goedkeuring.** Ingrijpende acties wachten op een mens.
- **Auditlog.** Elke stap, elke toolaanroep en elke beslissing wordt vastgelegd.

## Waar mensen betrokken bleven

Eén proces bereidde factuurgegevens voor die een mens moest aftekenen. Die grens was belangrijk: de voorbereiding automatiseren spaarde opvolgwerk, terwijl de eindbeslissing bij de verantwoordelijke persoon bleef.

## Wat ik anders zou doen

De durable-execution-laag heb ik zelf geschreven: checkpoints, het overnemen van verlaten runs en ze hervatten. Vandaag zou ik bouwen op een bestaande durable-execution-engine en die tijd besteden aan wat specifiek is voor agents: context opbouwen, guardrails en replay.
