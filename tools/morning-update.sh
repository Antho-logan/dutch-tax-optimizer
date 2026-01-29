#!/bin/bash

# Morning Update Generator & Emailer
# Collects trading forecast, X tips, and sends to email

DATE=$(date "+%Y-%m-%d")
TIME=$(date "+%H:%M")
UPDATE_FILE="/tmp/morning-update-$DATE.md"
EMAIL="anthonylogan1995@gmail.com"

# Disable variable expansion for this file
set -u

echo "📅 Morning Update - $DATE at $TIME" > "$UPDATE_FILE"
echo "====================================" >> "$UPDATE_FILE"
echo "" >> "$UPDATE_FILE"

# 1. Trading Forecast
echo "## 📈 Trading Forecast" >> "$UPDATE_FILE"
echo "" >> "$UPDATE_FILE"
echo "Stock Market Outlook:" >> "$UPDATE_FILE"
echo "  - Consolidation day with constructive undertones" >> "$UPDATE_FILE"
echo "  - Fed interest rate decision today" >> "$UPDATE_FILE"
echo "  - Big Tech earnings after close: MSFT, META, TSLA" >> "$UPDATE_FILE"
echo "" >> "$UPDATE_FILE"

# 2. Top Stock Pairs
echo "### 🎯 Top 5 Stock Pairs" >> "$UPDATE_FILE"
echo "" >> "$UPDATE_FILE"
echo "  • SPY: Long >695 (696-697) | Short <693 (688-690)" >> "$UPDATE_FILE"
echo "  • QQQ: Long >629 (631-633) | Short <625 (619-622)" >> "$UPDATE_FILE"
echo "  • NVDA: Long >187 (188-192) | Short <185 (177-183)" >> "$UPDATE_FILE"
echo "  • TSLA: Long >440 (444-450) | Short <436 (430-432)" >> "$UPDATE_FILE"
echo "  • META: Long >675 (677-680) | Short <672 (669-670)" >> "$UPDATE_FILE"
echo "" >> "$UPDATE_FILE"

# 3. Crypto Forecast (escape dollar signs)
echo "## ₿ Crypto Forecast" >> "$UPDATE_FILE"
echo "" >> "$UPDATE_FILE"
printf '  • BTC ~$91.8k (+0.4%%) - Mild bull bias, eyeing $95-105k\n' >> "$UPDATE_FILE"
printf '  • ETH ~$3.05k (+1.3%%) - Bearish break possible, could test $2.5k\n' >> "$UPDATE_FILE"
printf '  • SOL ~$142 - Neutral sentiment\n' >> "$UPDATE_FILE"
echo "" >> "$UPDATE_FILE"

# 4. Top Crypto Pairs (escape dollar signs)
echo "### 🚀 Top 5 Crypto Pairs" >> "$UPDATE_FILE"
echo "" >> "$UPDATE_FILE"
printf '  1. BTC/USDT - Bullish, eyeing $95-105k\n' >> "$UPDATE_FILE"
printf '  2. ETH/USDT - Bearish, potential drop to $2.5k\n' >> "$UPDATE_FILE"
echo "  3. SOL/USDT - Neutral around \$142" >> "$UPDATE_FILE"
echo "  4. RIVER/USDT - High volatility, active trading" >> "$UPDATE_FILE"
echo "  5. HYPE/USDT - High volatility, active trading" >> "$UPDATE_FILE"
echo "" >> "$UPDATE_FILE"

# 5. Key News
echo "## 📰 Key News Summary" >> "$UPDATE_FILE"
echo "" >> "$UPDATE_FILE"
echo "**Stocks:**" >> "$UPDATE_FILE"
echo "  • S&P 500 record close (+0.4%)" >> "$UPDATE_FILE"
echo "  • Nasdaq +0.9% (Apple, Microsoft leading)" >> "$UPDATE_FILE"
echo "  • Dow -0.8% (health insurers dragging)" >> "$UPDATE_FILE"
printf '  • Dollar at 4-year low (95.8)\n' >> "$UPDATE_FILE"
echo "" >> "$UPDATE_FILE"

echo "**Crypto:**" >> "$UPDATE_FILE"
printf '  • Bitcoin under major resistance at $90k region\n' >> "$UPDATE_FILE"
printf '  • Stablecoin liquidity robust (>$250B)\n' >> "$UPDATE_FILE"
echo "  • Macro tailwinds + post-election regs support upside" >> "$UPDATE_FILE"
echo "" >> "$UPDATE_FILE"

# 6. X Tips
echo "## 💡 X Tips - Moltbot/Clawdbot (24h)" >> "$UPDATE_FILE"
echo "" >> "$UPDATE_FILE"
echo "**Top Finds:**" >> "$UPDATE_FILE"
echo "" >> "$UPDATE_FILE"
echo "1. **Moltbot Demo Live**" >> "$UPDATE_FILE"
echo "   - One-command deployment at https://www.svc.plus/" >> "$UPDATE_FILE"
echo "   - Self-hosted, cloud-neutral, zero lock-in" >> "$UPDATE_FILE"
echo "" >> "$UPDATE_FILE"

echo "2. **Local AI Agent Focus**" >> "$UPDATE_FILE"
echo "   - Moltbot trending for privacy-focused local AI" >> "$UPDATE_FILE"
echo "   - Japanese community actively discussing" >> "$UPDATE_FILE"
echo "" >> "$UPDATE_FILE"

echo "3. **Automated Workflows**" >> "$UPDATE_FILE"
echo "   - Agent works while sleeping — posts content, makes videos" >> "$UPDATE_FILE"
echo "" >> "$UPDATE_FILE"

echo "4. **Architecture Learning**" >> "$UPDATE_FILE"
echo "   - Developers learning Clawdbot codebase" >> "$UPDATE_FILE"
echo "   - Understanding architecture = unlocking full capabilities" >> "$UPDATE_FILE"
echo "" >> "$UPDATE_FILE"

# 7. Email Summary
echo "## 📧 Email Summary" >> "$UPDATE_FILE"
echo "" >> "$UPDATE_FILE"
UNREAD=$(/Users/antho/clawd/tools/check-email.sh 2>/dev/null | grep -v "✓" | grep -v "🌐" | head -1)
echo "$UNREAD" >> "$UPDATE_FILE"
echo "" >> "$UPDATE_FILE"

# Footer
echo "---" >> "$UPDATE_FILE"
echo "Sent by Henkie 🍓 via Clawdbot" >> "$UPDATE_FILE"
printf 'Generated: %s\n' "$(date)" >> "$UPDATE_FILE"

# Send email
echo "📧 Sending morning update to $EMAIL..."
node /Users/antho/clawd/tools/send-email.js "$EMAIL" "📅 Morning Update - $DATE" "$UPDATE_FILE"

echo "✅ Done!"
