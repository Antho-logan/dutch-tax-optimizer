#!/bin/bash

# Gmail Email Checker
# Usage: ./check-email.sh [--summary] [--count]

# Load environment variables
if [ -f /Users/antho/clawd/.env ]; then
  export $(grep -v '^#' /Users/antho/clawd/.env | xargs)
fi

EMAIL="${GMAIL_USER:-anthoalanlogan@gmail.com}"
PASSWORD="${GMAIL_APP_PASSWORD:-$GMAIL_PASSWORD}"
IMAP_SERVER="imap.gmail.com"
IMAP_PORT=993

MODE="count"

# Parse arguments
for arg in "$@"; do
  case $arg in
    --summary) MODE="summary" ;;
    --count) MODE="count" ;;
    *) ;;
  esac
done

# Create temp file for IMAP commands
CMDS=$(mktemp)
cat > "$CMDS" <<EOF
a1 LOGIN "$EMAIL" "$PASSWORD"
a2 SELECT INBOX
a3 SEARCH UNSEEN
a4 LOGOUT
EOF

# Execute IMAP commands and capture output
OUTPUT=$(openssl s_client -crlf -quiet -connect "$IMAP_SERVER:$IMAP_PORT" 2>/dev/null < "$CMDS")

# Clean up
rm "$CMDS"

# Extract unread message IDs
UNREAD_IDS=$(echo "$OUTPUT" | grep "^\* SEARCH" | sed 's/\* SEARCH //;s/a3.*//' | tr ' ' '\n')

# Count unread
COUNT=$(echo "$UNREAD_IDS" | grep -v '^$' | wc -l | tr -d ' ')

if [ "$MODE" == "count" ]; then
  echo "$COUNT"
elif [ "$MODE" == "summary" ]; then
  if [ "$COUNT" -gt 0 ]; then
    echo "📧 You have $COUNT unread email(s)"
    echo ""
    echo "Message IDs (most recent 5):"
    echo "$UNREAD_IDS" | tail -5 | while read id; do
      echo "  - #$id"
    done
    echo ""
    echo "🌐 View at: https://mail.google.com"
  else
    echo "📧 No unread emails"
  fi
fi
