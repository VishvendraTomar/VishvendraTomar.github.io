---
slug: antagents
title: Ant Agents
summary: "Picture Friday afternoon. Timesheets are missing again. Someone has to email each person, then chase them again on Monday. I built the system that now does this with AI agents, for 300+ employees."
figure: automation
order: 2
updated: 2026-11-20
stack: [AWS, MCP, Durable execution]
before:
  - "Onboarding, work-from-home compliance checks and timesheet chasing were done by hand, over email."
  - "Processes took days."
  - "Failures were frequent."
after:
  - "20+ live workflows on the runtime I built, serving 300+ employees."
  - "Processes that took days finish within a day."
  - "Failures went from frequent to near zero."
eyebrow: Durable agent runtime
tagline: "AI agents that finish the job, even after a crash."
highlights:
  - title: "Resume, don’t restart"
    text: "A worker crashes at step 4 of 7. Another picks up at step 4. Nothing runs twice."
  - title: "Replay any failure"
    text: "Every model answer is recorded. A failed run can be replayed exactly, step by step."
  - title: "Context, not history"
    text: "Costs spiked when each step got the full history. Now each step gets only what it needs."
  - title: "Guardrails as layers"
    text: "Permissions, limits, checks, human approval and an audit log. A prompt asks; a guardrail enforces."
---
## My role

I owned the agent infrastructure and the modelling alone, and built most of the backend. Business analysts used the platform to put processes together from existing agents. Developers could extend it with a new agent when a process needed another capability. The platform ran internally on AWS, and agents reached other systems through MCP tools.

## The problem

Onboarding a new joiner, checking work-from-home compliance and chasing missing timesheets were all handled by people writing emails. Each process took days because every step waited on someone remembering to do the next one.

Handing that work to LLM agents brings three new problems. An agent can go off track. A run can crash halfway through. And a run can cost far more than it should, without anyone noticing until the bill arrives. The runtime exists to make those three things dependable.

## One workflow, end to end

When an employee ignores a timesheet follow-up, an agent reads their GitHub commits for the week through an MCP tool. It drafts the timesheet entry from that work and sends the draft to a person for approval. Nobody has to chase anyone, and nothing is filed without a yes.

## A crash at step 4 of 7

A workflow can wait on people between steps, and workers restart, get redeployed and fail in the meantime. If the machine running a workflow dies at step 4 of 7, starting over is not acceptable: step 2 already emailed someone.

Each completed step is checkpointed with its result. When a worker disappears, another worker claims the run, loads the last checkpoint and resumes at step 4. Steps 1–3 are not run again. The simulator above shows both versions.

> **Decision.** Keep the state of a running workflow separate from the context supplied to a model call. A process can have a long history even when the next agent needs only a small part of it.

## Debugging a model that never answers the same way twice

An AI model can answer differently each time. So a failure often won’t happen again when you retry. That makes it hard to debug. The runtime therefore records every model output and tool result as the run happens.

To debug, I replay the run from that recording. The same inputs produce the same path, step by step, without calling the model or touching real systems. A failure that happened once can be studied as often as needed.

## The cost spike

At one point costs rose sharply. Each step was sending the model more and more text, and most of it was irrelevant. This is known as context bloat: the workflow’s whole history went along with every call.

The fix was a context builder. It assembles only what the next step needs from the workflow’s state, rather than passing the whole history along. That is the decision above, in practice.

## Guardrails are layers, not a prompt

A prompt asks; a guardrail enforces. Telling a model “don’t file anything without approval” is a request. The runtime makes it a rule:

- **Tool permissions.** Each agent can call only the tools its workflow grants.
- **Limits.** Runs are bounded, so a confused agent stops instead of looping.
- **Schema checks.** Model output that doesn’t match the expected structure is rejected before it reaches another system.
- **Human approval.** Consequential actions wait for a person.
- **Audit log.** Every step, tool call and decision is recorded.

## Where people stayed involved

One process prepared billing information for a person to sign off. That boundary mattered. Automating the preparation saved follow-up work while leaving the final decision with the person responsible.

## What I’d do differently

I wrote the durable-execution layer myself: checkpoints, claiming abandoned runs and resuming them. Today I would build on an existing durable-execution engine and spend that time on the parts specific to agents: context building, guardrails and replay.
