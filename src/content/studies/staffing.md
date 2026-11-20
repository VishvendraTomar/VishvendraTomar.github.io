---
slug: workforce-infrastructure
title: A Belgian staffing platform
summary: "Picture 05:45. A worker calls in sick. The shift starts at 06:00. A colleague can cover, but the registration on file names the worker who just called. The manager has fifteen minutes to get the replacement declared before work starts."
figure: registration
order: 1
stack: [Python, FastAPI, PostgreSQL, Celery, Flutter]
updated: 2026-11-20
before:
  - "The founder’s first version ran on Cloud Functions and Firestore."
  - "Failed Dimona filings were rerun by hand."
  - "About 10,000 shifts, and the system was already struggling to scale."
after:
  - "No lost filings, no duplicates, no manual reruns."
  - "Every filing ends accepted, retried or with a person."
  - "125,000+ shifts and 1,000+ companies on the new backend."
eyebrow: Government filings / Payroll
tagline: "A government system that goes down. Filings that can’t fail."
highlights:
  - title: "Three exits"
    text: "Every filing ends accepted, retried or with a person. None is silently lost."
  - title: "Safe to repeat"
    text: "A filing sent twice is recognised. The government never gets a duplicate."
  - title: "Ask before you send"
    text: "After a crash, the system first asks if the filing arrived. Then it decides."
  - title: "Pay that recalculates"
    text: "Pay rules are stored with their dates. Old payslips always give the same amount."
---
## My role

One of the two engineers on the platform. The founder led product direction. I built most of the backend and worked on the Flutter app.

I spent about a year and a half on the project at GeekyAnts. I worked remotely from Bengaluru and spent about 20 days in Belgium for final delivery. My part included Dimona registration, attendance verification and the rules that turned hours into wages, invoices and filings.

## Three exits, nothing silently dropped

Every filing ends in exactly one of three places. It is accepted, it is retried, or it lands in a dead-letter queue where a person picks it up. No other outcome exists, so no filing can disappear quietly.

<div class="exits" role="img" aria-label="A filing goes to Dimona and ends in one of three places: accepted, retried later, or the dead-letter queue for a person.">
  <span class="exits-source">Filing → Dimona</span>
  <div class="exits-list">
    <span class="exit-ok"><b>Accepted</b> Registration confirmed and recorded.</span>
    <span class="exit-retry"><b>Retried</b> Temporary failure. Back in the queue after a delay.</span>
    <span class="exit-dlq"><b>Dead-letter queue</b> Permanent error or retries exhausted. A person is alerted.</span>
  </div>
</div>

## Making a filing safe to repeat

The first version relied on someone noticing a failed filing and running it again. The rebuild made repeating a filing safe, so the system could do it on its own.

- **At-least-once delivery, plus idempotency.** The queue may hand the same job over twice. That is the price of never losing one. Each filing carries an identity, so a second attempt is recognised instead of creating a duplicate registration.
- **Transient and permanent errors are different problems.** A timeout or an unavailable service is worth retrying. A filing rejected for its content will be rejected again, so it goes straight to a person instead of burning retries.
- **After a crash, ask before you send.** A submitter can die after sending a filing and before saving the answer. The next attempt checks the filing’s status with the government first. It sends again only if nothing was accepted.
- **Backoff with jitter.** When the government service comes back, a burst of queued filings should not knock it over again. Retries wait longer each time, with randomness so they spread out.

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

## Wages that recalculate the same way twice

Worked hours become two things: pay for the worker and an invoice for the client. Both come from the same attendance record, but they answer different questions.

Pay rules change: rates, bonuses, legal thresholds. I stored the rules as data with effective dates instead of writing them into code. A payslip is calculated with the rules that applied on the day the work was done. Recalculating a payslip from last year gives the same amount it gave then, even after the rules have moved on.

Money is never stored as a floating-point number. Amounts are kept as exact decimals, because floating-point rounding lets a few cents drift between a payslip and an invoice.

For operations exposed through MCP, I kept business checks in the domain layer, so a request from an agent still had to satisfy the staffing rules.

## Scale, honestly

The platform started at about **10,000 shifts**, and the old system was already struggling. On the new backend it grew to **125,000+ shifts** and **1,000+ companies**.

The traffic was modest. The hard part was correctness: a duplicated filing, a lost registration or a wrong payslip is a problem at any volume.

## The same problem in other countries

Other countries have the same problem with different rules. Austria, France, Italy and Hungary all require a registration before work starts. [See the rules side by side](/countries/).
