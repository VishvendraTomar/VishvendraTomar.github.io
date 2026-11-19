---
slug: workforce-infrastructure
title: A Belgian staffing platform
summary: "Picture 05:45. A worker calls in sick. The shift starts at 06:00. A colleague can cover, but the registration on file names the worker who just called. The manager has fifteen minutes to get the replacement declared before work starts."
figure: registration
order: 1
---
## My role

One of the two engineers on the platform. The founder led product direction; I built most of the backend.

I spent about a year and a half on the project at GeekyAnts. I worked remotely from Bengaluru and spent about 20 days in Belgium for final delivery. My part included Dimona registration, attendance verification and the rules that turned hours into wages, invoices and filings.

## Three decisions when a shift changes

### A different worker is a different filing

**Decision.** On a swap, check the replacement’s eligibility, cancel the outgoing assignment and create one for the incoming worker. Reconcile the outgoing worker’s registration against the work that remains. In the single-shift example above, the original period is now empty.

**Why.** Keeping the same venue, hours and job does nothing to change whose name is on the government record. Cancelling a whole registered period indiscriminately could also remove coverage for other work.

**Cost.** A manager sees one swap. The backend has two assignments to account for, and a successful cancellation says nothing about whether the replacement’s filing succeeded.

### The cancellation can arrive before the answer

**Decision.** When a shift is cancelled while its filing is in flight, keep tracking the government response. Once the outcome is known, compare the accepted period with the work still scheduled. If the period is empty, send a cancellation and track its response too.

**Why.** Deleting the shift locally cannot withdraw a declaration the government has already accepted. Sending a correction while the original outcome is unknown leaves two requests to untangle.

**Cost.** “Cancelled” can be true on the schedule while the external correction is still pending. The system has to carry that outstanding work across more than one response.

### A timeout leaves a question open

**Decision.** If the filing has a receipt, check its status. If a repeated submission is reported as a duplicate, reconcile it with the existing registration where a match can be established. Exhausted retries go to a dead-letter queue. Operations gets a signal when automatic handling cannot settle the filing.

**Why.** The government might have accepted the request just before the connection dropped. Another submission could repeat an action that already took effect.

**Cost.** Looking up the outcome adds a round trip. Parking an unresolved filing also leaves someone with work to investigate. Both costs are preferable to telling a manager that an unconfirmed worker is registered.

## What makes a clock-in harder to fake

A shared PIN can be passed to another person. A static QR code can be copied. A location reading gives geographic context, but it cannot establish on its own that someone interacted with the venue’s clock-in point.

I built the check around a secure NFC tap, venue Wi-Fi and location. The tap provides evidence of a physical interaction, Wi-Fi adds local network context, and location places the device geographically. Copying one value leaves the other observations unexplained. In the walkthrough, inconsistent evidence blocks the clock-in before any hours reach payroll.

The cost shows up at a real venue too. A genuine worker can have a weak location reading or an unavailable network signal. That is why the three observations have distinct roles in the check.

## After the shift

Recorded hours feed the wage and compliance engine. The worker’s pay and the client invoice use the same attendance record but answer different questions. For operations exposed through MCP, I kept business checks in the domain layer so an agent request still had to satisfy the staffing rules.

The platform grew from about **10,000 to 125,000+ shifts** and served **1,000+ companies**. Those figures describe platform use over time. My contribution was the backend work described above.

## The same problem in other countries

A founder building in another market can start with one question: what event creates the filing obligation? A new hire, a day of casual work and a call under an existing contract need different scheduling logic.

| Market and worker | What the backend needs to track |
|---|---|
| Belgium · occasional hospitality worker | The employer declares the worker for each workday through Dimona. The hourly and daily options require different time details. [Belgian social security guidance](https://www.socialsecurity.be/employer/instructions/dmfa/fr/latest/instructions/obligations/obligations_nsso/dimona/occasionalsdimona.html) |
| Austria · *fallweise Beschäftigte* | Each day of casual employment requires a registration before work starts. ELDA is a submission channel. [ELDA guidance](https://www.elda.at/cdscontent/?contentid=10007.838879&portal=eldaportal) |
| France · hospitality *extra* | The DPAE is tied to hiring and must precede the start of work. An extra’s contract can cover several consecutive days, so counting shifts alone gives the wrong trigger. [DPAE guidance](https://www.service-public.gouv.fr/entreprendre/vosdroits/R57098) · [Extra contracts](https://www.service-public.gouv.fr/particuliers/vosdroits/F33693) |
| Italy · intermittent worker | In addition to the hiring notice, the employer gives notice before the work begins. A single notice can cover an integrated cycle of work lasting up to 30 days. [Italian labour ministry](https://www.lavoro.gov.it/temi-e-priorita/rapporti-di-lavoro-e-relazioni-industriali/focus-on/disciplina-rapporto-lavoro/pagine/lavoro-intermittente) |
