#!/bin/bash

# Codex Task Chunker - Split large tasks to avoid context overflow
# Usage: codex-chunk.sh [task_description]

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

show_usage() {
    echo -e "${BLUE}Codex Task Chunker${NC}"
    echo "Usage: codex-chunk.sh \"[task_description]\""
    echo ""
    echo "Splits large tasks into manageable chunks to avoid context overflow"
    echo ""
    echo "Example:"
    echo "  codex-chunk.sh \"Build a full ecommerce site with checkout\""
}

# Analyze task complexity and suggest chunks
suggest_chunks() {
    local task="$1"

    echo -e "${GREEN}📊 Task Analysis${NC}"
    echo ""
    echo "Task: $task"
    echo ""

    # Detect task type and suggest chunks
    if echo "$task" | grep -iq "ecommerce\|shop\|store\|checkout"; then
        suggest_ecommerce_chunks
    elif echo "$task" | grep -iq "dashboard\|admin\|analytics"; then
        suggest_dashboard_chunks
    elif echo "$task" | grep -iq "api\|backend\|server"; then
        suggest_api_chunks
    elif echo "$task" | grep -iq "landing\|page\|website"; then
        suggest_landing_chunks
    else
        suggest_generic_chunks
    fi
}

suggest_ecommerce_chunks() {
    echo -e "${YELLOW}Type: Ecommerce${NC}"
    echo "Suggested chunks:"
    echo ""
    echo "1️⃣  Setup + Product Listing"
    echo "   codex templates landing my-shop --add 'product grid with cards'"
    echo ""
    echo "2️⃣  Product Details Page"
    echo "   codex 'Add product detail page with image gallery, specs, add to cart'"
    echo ""
    echo "3️⃣  Shopping Cart"
    echo "   codex 'Build cart sidebar with items, quantities, total, remove button'"
    echo ""
    echo "4️⃣  Checkout Flow"
    echo "   codex 'Create checkout form with shipping, payment, order summary'"
    echo ""
    echo "5️⃣  Order Confirmation"
    echo "   codex 'Add order success page with order details and continue shopping'"
    echo ""
    echo -e "${GREEN}💡 Tip: Run each chunk in sequence, building on the previous${NC}"
}

suggest_dashboard_chunks() {
    echo -e "${YELLOW}Type: Dashboard${NC}"
    echo "Suggested chunks:"
    echo ""
    echo "1️⃣  Layout + Navigation"
    echo "   codex templates dashboard my-app"
    echo ""
    echo "2️⃣  Overview Page"
    echo "   codex 'Add overview page with metric cards and key stats'"
    echo ""
    echo "3️⃣  Data Table"
    echo "   codex 'Build sortable data table with filters and pagination'"
    echo ""
    echo "4️⃣  Charts/Visualizations"
    echo "   codex 'Add line chart and bar chart using Recharts'"
    echo ""
    echo "5️⃣  Settings Page"
    echo "   codex 'Create settings form with tabs for different config sections'"
    echo ""
    echo -e "${GREEN}💡 Tip: Test each chunk before moving to the next${NC}"
}

suggest_api_chunks() {
    echo -e "${YELLOW}Type: API${NC}"
    echo "Suggested chunks:"
    echo ""
    echo "1️⃣  Project Setup"
    echo "   codex templates api my-api"
    echo ""
    echo "2️⃣  Core CRUD"
    echo "   codex 'Add CRUD endpoints for main resource with validation'"
    echo ""
    echo "3️⃣  Authentication"
    echo "   codex 'Add JWT auth middleware with login/register endpoints'"
    echo ""
    echo "4️⃣  Error Handling"
    echo "   codex 'Add global error handler and proper HTTP status codes'"
    echo ""
    echo "5️⃣  Documentation"
    echo "   codex 'Add OpenAPI/Swagger docs for all endpoints'"
    echo ""
    echo -e "${GREEN}💡 Tip: Test endpoints with curl after each chunk${NC}"
}

suggest_landing_chunks() {
    echo -e "${YELLOW}Type: Landing Page${NC}"
    echo "Suggested chunks:"
    echo ""
    echo "1️⃣  Core Landing"
    echo "   codex templates landing my-product"
    echo ""
    echo "2️⃣  Extra Sections (if needed)"
    echo "   codex 'Add pricing section with 3 tiers'"
    echo ""
    echo "3️⃣  Polish"
    echo "   codex 'Add smooth scroll animations and hover effects'"
    echo ""
    echo -e "${GREEN}💡 Tip: Landing pages usually fit in one chunk, use templates${NC}"
}

suggest_generic_chunks() {
    echo -e "${YELLOW}Type: Generic${NC}"
    echo "Suggested chunks:"
    echo ""
    echo "1️⃣  Foundation"
    echo "   codex 'Set up Next.js project with TypeScript, Tailwind, and basic layout'"
    echo ""
    echo "2️⃣  Core Features"
    echo "   codex 'Add main feature components and pages'"
    echo ""
    echo "3️⃣  Integration"
    echo "   codex 'Connect API routes and data fetching'"
    echo ""
    echo "4️⃣  Polish"
    echo "   codex 'Add final touches: animations, error handling, loading states'"
    echo ""
    echo -e "${GREEN}💡 Tip: Keep each chunk focused on one aspect${NC}"
}

# Estimate context usage
estimate_context() {
    local task="$1"
    local word_count=$(echo "$task" | wc -w | tr -d ' ')

    echo -e "${BLUE}📏 Context Estimate${NC}"
    echo "Words: $word_count"
    echo "Estimated tokens: ~$((word_count * 4 / 3))"
    echo ""

    if [ $word_count -gt 100 ]; then
        echo -e "${YELLOW}⚠️  Task is complex. Consider chunking it.${NC}"
    else
        echo -e "${GREEN}✅ Task size is OK for single run${NC}"
    fi
    echo ""
}

# Main execution
main() {
    if [ $# -lt 1 ]; then
        show_usage
        exit 1
    fi

    local task="$1"

    estimate_context "$task"
    suggest_chunks "$task"

    echo ""
    echo -e "${BLUE}▶️  Ready to build?${NC}"
    echo "Copy the chunk commands above and run them in sequence"
    echo ""
    echo "Or use the template directly:"
    echo "  codex-templates.sh [template] [project-name] | codex"
}

main "$@"
