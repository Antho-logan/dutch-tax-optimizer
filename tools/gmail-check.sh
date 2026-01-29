#!/bin/bash

# Gmail Unread Email Checker
# Usage: ./gmail-check.sh [--summary]

EMAIL="anthoalanlogan@gmail.com"
PASSWORD="uzlg gzoa njqq laln"
IMAP_SERVER="imap.gmail.com"
IMAP_PORT=993

MODE="count"
if [ "$1" == "--summary" ]; then
  MODE="summary"
fi

# Build IMAP commands
cat <<EOF | openssl s_client -crlf -quiet -connect "$IMAP_SERVER:$IMAP_PORT" 2>/dev/null | grep -A 100 "a2 OK" | grep -E "SEARCH|a3"
a1 LOGIN "$EMAIL" "$PASSWORD"
a2 SELECT INBOX
a3 SEARCH UNSEEN
a4 LOGOUT
EOF
