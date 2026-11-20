---
slug: workforce-infrastructure
title: Een Belgisch uitzendplatform
summary: "Het is 05:45. Een werknemer meldt zich ziek; de shift begint om 06:00. Een collega kan invallen, maar de aangifte op naam staat nog op de persoon die net belde. De manager heeft vijftien minuten om de vervanger aan te geven voordat het werk begint."
figure: registration
order: 1
stack: [Python, FastAPI, PostgreSQL, Celery, Flutter]
updated: 2026-11-20
before:
  - "De eerste versie van de oprichter draaide op Cloud Functions en Firestore."
  - "Mislukte Dimona-aangiftes werden met de hand opnieuw verstuurd."
  - "Zo’n 10.000 shifts, en het systeem kreeg het al moeilijk."
after:
  - "Geen verloren aangiftes, geen dubbele, geen handmatig herhalen."
  - "Elke aangifte eindigt aanvaard, opnieuw geprobeerd of bij een mens."
  - "Meer dan 125.000 shifts draaiden op de backend die ik grotendeels bouwde. Het platform groeide naar meer dan 1.000 bedrijven."
eyebrow: Overheidsaangiftes / Loonverwerking
tagline: "Een overheidssysteem dat uitvalt. Aangiftes die niet mogen mislukken."
highlights:
  - title: "Drie uitgangen"
    text: "Elke aangifte eindigt aanvaard, opnieuw geprobeerd of bij een mens. Geen enkele verdwijnt ongemerkt."
  - title: "Veilig te herhalen"
    text: "Een aangifte die twee keer vertrekt, wordt herkend. De overheid krijgt nooit een dubbel."
  - title: "Eerst vragen, dan sturen"
    text: "Na een crash vraagt het systeem eerst of de aangifte aankwam. Dan pas beslist het."
  - title: "Lonen die kloppen"
    text: "Loonregels worden met hun datum opgeslagen. Oude loonstroken geven altijd hetzelfde bedrag."
---
## Mijn rol

Een van de twee engineers op het platform. De oprichter bepaalde de productrichting. Ik bouwde het grootste deel van de backend en werkte mee aan de Flutter-app.

Ik werkte ongeveer anderhalf jaar aan dit project bij GeekyAnts, op afstand vanuit Bengaluru, en was zo’n 20 dagen in België voor de oplevering. Mijn deel omvatte de Dimona-aangifte, de aanwezigheidscontrole en de regels die van uren lonen, facturen en aangiftes maken.

## Drie uitgangen, niets verdwijnt ongemerkt

Elke aangifte eindigt op precies één van drie plekken: ze wordt aanvaard, ze wordt opnieuw geprobeerd, of ze komt in een dead-letter queue waar een mens haar oppakt. Een andere uitkomst bestaat niet, dus geen enkele aangifte kan stilletjes verdwijnen.

<div class="exits" role="img" aria-label="Een aangifte gaat naar Dimona en eindigt op een van drie plekken: aanvaard, later opnieuw geprobeerd, of in de dead-letter queue voor een mens.">
  <span class="exits-source">Aangifte → Dimona</span>
  <div class="exits-list">
    <span class="exit-ok"><b>Aanvaard</b> Aangifte bevestigd en vastgelegd.</span>
    <span class="exit-retry"><b>Opnieuw geprobeerd</b> Tijdelijke fout. Na een pauze terug in de wachtrij.</span>
    <span class="exit-dlq"><b>Dead-letter queue</b> Blijvende fout of pogingen op. Een mens wordt gewaarschuwd.</span>
  </div>
</div>

## Een aangifte veilig herhaalbaar maken

De eerste versie rekende erop dat iemand een mislukte aangifte opmerkte en opnieuw startte. De herbouw maakte herhalen veilig, zodat het systeem het zelf kan.

- **Minstens-één-keer-levering, plus idempotentie.** De wachtrij kan dezelfde taak twee keer afleveren: dat is de prijs om er nooit een te verliezen. Elke aangifte heeft een identiteit, dus een tweede poging wordt herkend in plaats van een dubbele aangifte te maken.
- **Tijdelijke en blijvende fouten zijn verschillende problemen.** Een time-out of een onbereikbare dienst is een nieuwe poging waard. Een aangifte die inhoudelijk geweigerd wordt, wordt opnieuw geweigerd. Die gaat meteen naar een mens in plaats van pogingen op te souperen.
- **Na een crash eerst vragen, dan sturen.** Een verzender kan sterven nadat hij een aangifte verstuurde en voordat hij het antwoord opsloeg. De volgende poging vraagt eerst de status op bij de overheid en verstuurt alleen opnieuw als er niets aanvaard is.
- **Backoff met jitter.** Als de overheidsdienst terugkomt, mag een golf wachtende aangiftes hem niet meteen weer onderuit halen. Pogingen wachten telkens langer, met wat willekeur zodat ze zich spreiden.

## Drie beslissingen als een shift verandert

### Een andere werknemer is een andere aangifte

**Beslissing.** Bij een wissel de inzetbaarheid van de vervanger controleren, de vertrekkende toewijzing annuleren en een nieuwe maken voor wie invalt. De aangifte van de vertrekkende werknemer afstemmen op het werk dat overblijft. In het voorbeeld hierboven is de oorspronkelijke periode nu leeg.

**Waarom.** Dezelfde locatie, uren en functie veranderen niets aan wiens naam bij de overheid geregistreerd staat. Een hele aangegeven periode zomaar annuleren kan ook de dekking voor ander werk weghalen.

**Prijs.** De manager ziet één wissel. De backend moet twee toewijzingen bijhouden, en een geslaagde annulering zegt niets over of de aangifte van de vervanger lukte.

### De annulering kan vóór het antwoord komen

**Beslissing.** Wordt een shift geannuleerd terwijl de aangifte onderweg is, dan volgen we het antwoord van de overheid verder. Zodra de uitkomst bekend is, vergelijken we de aanvaarde periode met het werk dat nog gepland staat. Is die leeg, dan gaat er een annulering uit, en ook dat antwoord volgen we.

**Waarom.** De shift lokaal verwijderen trekt geen aangifte in die de overheid al aanvaard heeft. Een correctie sturen terwijl de oorspronkelijke uitkomst onbekend is, laat twee verzoeken achter om te ontwarren.

**Prijs.** „Geannuleerd” kan in de planning kloppen terwijl de externe correctie nog loopt. Het systeem moet dat openstaande werk over meer dan één antwoord heen dragen.

### Een time-out laat een vraag open

**Beslissing.** Heeft de aangifte een ontvangstbewijs, dan vragen we de status op. Wordt een herhaalde indiening als dubbel gemeld, dan stemmen we die af op de bestaande aangifte als er een match te vinden is. Uitgeputte pogingen gaan naar een dead-letter queue. Operations krijgt een signaal als de automatische afhandeling de aangifte niet kan afronden.

**Waarom.** De overheid kan het verzoek net voor de verbinding wegviel aanvaard hebben. Een nieuwe indiening kan een handeling herhalen die al effect had.

**Prijs.** De uitkomst opzoeken kost een extra rondgang. Een onopgeloste aangifte parkeren geeft iemand werk om uit te zoeken. Beide zijn beter dan een manager vertellen dat een niet-bevestigde werknemer aangegeven is.

## Wat inklokken moeilijk te vervalsen maakt

Een gedeelde pincode kan worden doorgegeven. Een statische QR-code kan worden gekopieerd. Een locatie geeft geografische context, maar bewijst op zich niet dat iemand de inklokpaal op de locatie gebruikte.

Ik bouwde de controle rond een beveiligde NFC-tik, de wifi van de locatie en de positie. De tik bewijst een fysieke handeling, wifi geeft lokale netwerkcontext en de positie plaatst het toestel geografisch. Wie één waarde kopieert, kan de andere waarnemingen niet verklaren. In de simulatie blokkeert tegenstrijdig bewijs het inklokken voordat er uren in de loonverwerking terechtkomen.

De prijs zie je ook op een echte locatie: een eerlijke werknemer kan een zwakke positie of geen netwerk hebben. Daarom hebben de drie waarnemingen elk een eigen rol.

## Lonen die twee keer hetzelfde uitkomen

Gewerkte uren worden twee dingen: het loon voor de werknemer en een factuur voor de klant. Beide komen uit dezelfde aanwezigheidsregistratie, maar beantwoorden andere vragen.

Loonregels veranderen: tarieven, toeslagen, wettelijke grenzen. Ik sloeg de regels op als data met een ingangsdatum, in plaats van ze in de code te schrijven. Een loonstrook wordt berekend met de regels die golden op de dag van het werk. Een loonstrook van vorig jaar herberekenen geeft hetzelfde bedrag als toen, ook als de regels intussen veranderd zijn.

Geld wordt nooit als kommagetal (floating point) opgeslagen. Bedragen zijn exacte decimalen, want afronding met floating point laat een paar cent wegdrijven tussen loonstrook en factuur.

Voor handelingen die via MCP beschikbaar waren, bleven de bedrijfscontroles in de domeinlaag: ook een verzoek van een agent moest aan de regels van de uitzendsector voldoen.

## Schaal, eerlijk gezegd

Het platform begon bij zo’n **10.000 shifts**, en het oude systeem had het al moeilijk. Op de nieuwe backend groeide het naar **meer dan 125.000 shifts** en **meer dan 1.000 bedrijven**.

Dit zijn cijfers van het platform, niet van mij alleen. De oprichter leidde het product en het bedrijf. Mijn deel was de backend waarop die shifts draaiden.

Het verkeer was bescheiden. Het moeilijke was correctheid: een dubbele aangifte, een verloren aangifte of een foute loonstrook is bij elk volume een probleem.

## Hetzelfde probleem in andere landen

Andere landen hebben hetzelfde probleem met andere regels. Oostenrijk, Frankrijk, Italië en Hongarije vragen allemaal een aangifte vóór het werk begint. [Bekijk de regels naast elkaar](/nl/countries/).
