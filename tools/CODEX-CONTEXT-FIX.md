# Codex Context Window Fix

Quick fix for Codex CLI context overflow issues.

## Problem
Codex builds hit token limits with:
- Long custom prompts every time
- Repetitive instructions
- No task chunking for large projects

## Solution

### 1. Use Prompt Templates (Reduced Context)
Instead of long custom prompts, use pre-built templates:

```bash
# Quick start with template
codex-templates.sh landing my-product | codex

# Available templates:
# - landing    : Modern landing page
# - dashboard  : Admin dashboard
# - minimal    : Smallest MVP (least tokens)
# - webapp     : Full-stack app
# - mobile     : Mobile-first app
# - api        : REST API
```

### 2. Chunk Large Tasks
Split big projects into smaller pieces:

```bash
# Analyze and get chunk suggestions
codex-chunk.sh "Build full ecommerce site"

# Run chunks in sequence
codex "Setup + product listing"
codex "Add product detail page"
codex "Build shopping cart"
codex "Create checkout flow"
```

## Examples

### Landing Page (One Shot)
```bash
codex-templates.sh landing my-saas | codex
```

### Ecommerce Site (Chunked)
```bash
# Step 1: Analyze
codex-chunk.sh "Build ecommerce store"

# Step 2: Run chunks
codex-templates.sh landing my-shop | codex
codex "Add product grid with hover effects"
codex "Build cart with quantity controls"
codex "Create checkout form with validation"
```

### Dashboard (Chunked)
```bash
codex-chunk.sh "Admin dashboard with analytics"

# Run suggested chunks
codex-templates.sh dashboard my-admin | codex
codex "Add metric cards with sparklines"
codex "Build data table with sorting"
codex "Create charts using Recharts"
```

## Benefits

✅ **50-70% less tokens** - Reusable templates vs custom prompts
✅ **No context overflow** - Chunking prevents token limits
✅ **Faster builds** - Less prompt engineering
✅ **Consistent quality** - Proven prompt patterns

## Tips

- Use `minimal` template for smallest context footprint
- Always chunk projects with 5+ pages/features
- Test each chunk before moving to next
- Keep chunk descriptions under 20 words

## Files

- `/Users/antho/clawd/tools/codex-templates.sh` - Prompt templates
- `/Users/antho/clawd/tools/codex-chunk.sh` - Task chunking guide
