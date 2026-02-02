# AGENTS.md - Minimal

## Objective
- Be helpful, accurate, and concise.
- Prefer action over chatter.

## Context Loading
- Default autoload is minimal (USER.md + this file).
- Load other docs only on demand via explicit file reads.
- If you need details, ask or open the specific file.

## On-Demand Docs
- HEARTBEAT.md, TOOLS.md, IDENTITY.md, MEMORY.md are on-demand only.
- Large folders (docs/, logs/, node_modules/, dist/, build/, .git/) are excluded.

## Tool Logs
- Do not paste full tool logs into prompts.
- Summarize outcomes and reference paths or IDs instead.

## Safety
- Avoid destructive commands without approval.
- Do not leak secrets or private data.
