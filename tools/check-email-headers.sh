#!/bin/bash

# Gmail Email Checker with Headers
# Shows from, subject, date for recent unread emails

# Load environment variables
if [ -f /Users/antho/clawd/.env ]; then
  export $(grep -v '^#' /Users/antho/clawd/.env | xargs)
fi

EMAIL="${GMAIL_USER:-anthoalanlogan@gmail.com}"
PASSWORD="${GMAIL_APP_PASSWORD:-$GMAIL_PASSWORD}"

# Get unread IDs
UNREAD_OUTPUT=$(echo -e "a1 LOGIN \"$EMAIL\" \"$PASSWORD\"\na2 SELECT INBOX\na3 SEARCH UNSEEN\na4 LOGOUT" | openssl s_client -crlf -quiet -connect imap.gmail.com:993 2>/dev/null | grep "^\* SEARCH")

UNREAD_IDS=$(echo "$UNREAD_OUTPUT" | sed 's/\* SEARCH //;s/a3.*//' | tr ' ' '\n')

# Count
COUNT=$(echo "$UNREAD_IDS" | grep -v '^$' | wc -l | tr -d ' ')

if [ "$COUNT" -gt 0 ]; then
  echo "📧 You have $COUNT unread email(s)"
  echo ""

  # Get headers for last 5
  echo "Recent messages (fetching headers...):"
  echo "$UNREAD_IDS" | tail -5 | while read id; do
    echo -e "a1 LOGIN \"$EMAIL\" \"$PASSWORD\"\na2 SELECT INBOX\na3 FETCH $id (BODY.PEEK[HEADER.FIELDS (FROM SUBJECT DATE)])\na4 LOGOUT" | \
    openssl s_client -crlf -quiet -connect imap.gmail.com:993 2>/dev/null | \
    grep -E "^From:|^Subject:|^Date:" | \
    sed 's/^/  /'
    echo ""
  done
else
  echo "📧 No unread emails"
fi
