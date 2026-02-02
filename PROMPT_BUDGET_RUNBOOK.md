# Prompt Budget Runbook

## Tests
Run all three budgeting tests:

```sh
node /Users/antho/clawd/test-prompt-budgeting.js
node /Users/antho/clawd/test-prompt-budgeting-integration.js
node /Users/antho/clawd/test-prompt-budgeting-e2e.js
```

## Dry-run verification
Dry-run builds the full payload and aborts right before the model call. Use this to validate size enforcement without spending tokens.

```sh
PROMPT_BUDGET_DRY_RUN=1 node /Users/antho/clawd/test-prompt-budgeting-e2e.js
```

## Operator launch (required)
Always start Clawdbot via the repo-controlled wrapper so the budgeter hook is enforced:

```sh
node /Users/antho/clawd/scripts/run-clawdbot-with-budgeter.js
```

This sets conservative defaults and installs the repo hook via `NODE_OPTIONS=--require /Users/antho/clawd/prompt-budget-hook.js`.

Look for these log lines:
- `[PromptBudget] final_chars=... approx_tokens=... headroom_tokens=... headroom_ratio=... source=final`
- `[PromptBudget] dry_run=1 skipping model call`
- `[PromptBudget] trim: ...` (one line per trim reason)
- `[PromptBudgetHook] active repo_budgeter=...` (confirms repo-controlled budgeter path)

## Launchctl fallback
If LaunchAgent reloads fail (bootout/bootstrap/kickstart), use the user-level scripts:

```sh
/Users/antho/clawd/scripts/start-gateway.sh
/Users/antho/clawd/scripts/stop-gateway.sh
```

These write logs to `/tmp/clawdbot/gateway.log` and the PID to `/tmp/clawdbot/gateway.pid`.

## Tuning guidance
All knobs are environment variables and can be set per-run.

```text
MAX_PROMPT_CHARS=120000
HEADROOM_RATIO=0.30
MIN_PLAN_CHARS=2000
MAX_FILES=8
MAX_FILE_CHARS=12000
MAX_LOG_CHARS=12000
MAX_HISTORY_MSGS=10
```

Safe tuning tips:
- If you raise `MAX_PROMPT_CHARS`, keep `HEADROOM_RATIO` at 0.25 to 0.35 to preserve completion space.
- If the model still hits limits, lower `MAX_FILES`, `MAX_FILE_CHARS`, or `MAX_HISTORY_MSGS` to reduce context volume.
- For very noisy tools, lower `MAX_LOG_CHARS` to force aggressive trimming.

## Operational log checks
When trimming happens you should see:
- `[PromptBudget] trim: dropped tool logs to fit prompt budget`
- `[PromptBudget] trim: trimmed history to last ... messages`
- `[PromptBudget] trim: dropped file ... to fit prompt budget`

If overflow errors appear in production:
- Confirm `[PromptBudget] ... source=final` appears on every model call.
- Confirm `final_chars` stays under `MAX_PROMPT_CHARS`.
- Reduce `MAX_PROMPT_CHARS` or increase `HEADROOM_RATIO` if the provider still rejects the request.
