---
slug: antagents
title: Ant Agents
summary: Agent infrastructure for business workflows defined by analysts at GeekyAnts.
figure: automation
order: 2
stack: [AWS, MCP]
---
## My role

At GeekyAnts, I owned the agent infrastructure and scaling work and built most of the backend. Business analysts used the platform to put processes together from existing agents. Developers could extend it with a new agent when a process needed another capability.

## The problem

An agent might finish one task while the next task still needed information from a tool or a person. The platform had to keep track of where a process was, what had already happened and which step could run next.

## How execution worked

A workflow definition described the steps. The orchestrator tracked progress and dependencies. Agents used MCP tools to work with other systems. The platform ran internally on AWS.

> **Decision.** Keep the state of a running workflow separate from the context supplied to a model call. A process can have a long history even when the next agent needs only a small part of it.

## Scaling and recovery

Agents could perform independent work in parallel. Checkpoints supported recovery after an interruption. Tracking tool calls and task state helped narrow an investigation to a particular step. I designed the execution layer for horizontal scaling. Its measured throughput was outside the scope of this case study.

## Where people stayed involved

One process prepared billing information for a person to sign off. That boundary mattered. Automating the preparation could save follow-up work while leaving the final decision with the person responsible.
