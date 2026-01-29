# Clawd Tools

Quick reference for all workspace tools.

## Development Tools

### Codex Context Fix
**Problem:** Codex CLI hits token limits with long prompts

**Solution:** Template system + chunking strategy

```bash
# Use pre-built templates (50-70% less tokens)
codex-templates.sh landing my-project | codex

# Analyze and chunk large tasks
codex-chunk.sh "Build full ecommerce site"

# Templates: landing, dashboard, minimal, webapp, mobile, api
```

**Docs:** `CODEX-CONTEXT-FIX.md`

---

## Email Tools

### Check Email
```bash
./check-email.sh          # Summary of unread emails
./check-email.sh --count   # Just the count
```

### Send Email
```bash
node send-email.js <to> <subject> <message_file>
```

### Morning Update
```bash
./morning-update.sh  # Generates and emails morning digest
```

---

## Security Tools

### Security Check
```bash
./security-check.sh       # Full security audit
```

### Secrets Scanner
```bash
./secrets-scanner.sh      # Scan for leaked secrets
```

### Input Validation
```bash
./validate-input.sh       # Test input sanitization
```

### Tool Firewall
```bash
./tool-firewall.sh        # Audit tool permissions
```

---

## Quick Links

- **CODING_RULES.md** - Frontend architecture standards
- **AGENTS.md** - Workspace conventions
- **MEMORY.md** - Long-term memory
- **TODO.md** - Current tasks
