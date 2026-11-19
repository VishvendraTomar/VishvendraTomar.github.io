---
slug: workforce-infrastructure
title: A Belgian staffing platform
summary: From a scheduled shift to a government declaration, checked hours and an invoice.
figure: registration
order: 1
stack: [Python, FastAPI, MCP]
---
## My role

One of the two engineers on the platform. The founder led product direction; I built most of the backend.

I worked on the platform at GeekyAnts for about a year and a half. I built from Bengaluru and spent about 20 days in Belgium for final delivery.

## The problem

A business could know who was working a shift and still have work to do before that person started. The staffing platform handled per-shift government registration through Dimona. After the shift, recorded hours fed wages, filings and the client invoice.

Those steps run on different clocks. A manager can change a shift while an external service is slow to respond. Clock-in happens at the venue. The company needs a record it can use later when it prepares the invoice.

## Registration and failure handling

I put registration work on a queue. A shift change created a job, and a submitter sent the declaration to the government service. The queue supported retries when the external service was unreliable. Jobs that exhausted their retries went to a dead-letter queue.

> **Trade-off.** Queuing separated a scheduling action from the external response. It also created two facts the system had to keep distinct. A shift could be saved while its filing still needed attention.

## Recording attendance

I built a layered check using secure NFC taps, venue Wi-Fi and location. Each signal answers a different question. A tap links the interaction to a physical tag. Wi-Fi adds venue context. Location adds geographic context. Together they help assess a clock-in before its hours enter the rest of the workflow.

> **Trade-off.** Each additional signal gives the backend another piece of evidence to interpret. A check involving several signals also has to account for information that may be unavailable at the venue.

## Applying pay rules

A wage and compliance engine brought shift data and applicable rules together. That gave hours a common path into pay calculations and downstream records. The worker’s wage and the company’s invoice are distinct outputs even when they begin with the same hours.

I also exposed operations through MCP tools with checks in the domain layer. An agent could request an operation through a tool. The backend still had to decide whether the operation made sense for that part of the staffing workflow.

## Platform results

The platform grew from about 10,000 shifts to **125,000+ shifts** and served **1,000+ companies**. These are platform figures. My contribution was the backend work described here.
