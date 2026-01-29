#!/bin/bash

# Gmail IMAP Checker
# Usage: ./check-gmail.sh [--unread] [--summary]

# Config - load from environment
if [ -f /Users/antho/clawd/.env ]; then
  export $(grep -v '^#' /Users/antho/clawd/.env | xargs)
fi

EMAIL="${GMAIL_USER:-anthoalanlogan@gmail.com}"
PASSWORD="${GMAIL_PASSWORD:-$GMAIL_APP_PASSWORD}"
IMAP_SERVER="imap.gmail.com"
IMAP_PORT=993

# Parse args
MODE="unread"
if [ "$1" == "--summary" ]; then
  MODE="summary"
fi

# Temporary file for credentials
CREDS_FILE=$(mktemp)
echo "a1 LOGIN $EMAIL $PASSWORD" > "$CREDS_FILE"
echo "a2 SELECT INBOX" >> "$CREDS_FILE"
echo "a3 SEARCH UNSEEN" >> "$CREDS_FILE"
echo "a4 LOGOUT" >> "$CREDS_FILE"

# Connect via openssl and parse response
response=$(openssl s_client -crlf -connect "$IMAP_SERVER:$IMAP_PORT" 2>/dev/null < "$CREDS_FILE" | grep -E "^a3 SEARCH")

# Clean up
rm "$CREDS_FILE"

# Extract email IDs
email_ids=$(echo "$response" | sed 's/a3 SEARCH //; s/\r$//' | tr ' ' '\n' | grep -v '^$')

# Count unread
unread_count=$(echo "$email_ids" | wc -l | tr -d ' ')

if [ "$MODE" == "unread" ]; then
  echo "$unread_count"
elif [ "$MODE" == "summary" ]; then
  if [ "$unread_count" -gt 0 ]; then
    echo "📧 You have $unread_count unread email(s)"
    echo ""
    echo "Recent senders (top 5):"
    echo "$email_ids" | head -5 | while read id; do
      # Fetch from headers (simplified - would need full IMAP session for real data)
      echo "  - Message #$id (details via web interface)"
    done
  else
    echo "📧 No unread emails"
  fi
fi

exit 0
