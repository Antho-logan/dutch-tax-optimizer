#!/bin/bash

# Codex Prompt Templates Library
# Reduces context window usage by providing reusable prompt templates

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

show_usage() {
    echo -e "${BLUE}Codex Prompt Templates${NC}"
    echo "Usage: codex-templates.sh [template] [project_name]"
    echo ""
    echo "Available templates:"
    echo "  landing      - Modern landing page with Tailwind"
    echo "  dashboard    - Admin dashboard with charts"
    echo "  webapp       - Full-stack web application"
    echo "  mobile       - Mobile-first responsive app"
    echo "  api          - REST API with Node/Express"
    echo "  minimal      - Minimal MVP (smallest context)"
    echo ""
    echo "Example:"
    echo "  codex-templates.sh landing my-product"
}

# Template: Modern Landing Page (optimized for minimal context)
template_landing() {
    local project=$1
    cat <<EOF
Build a modern, minimalist landing page for: $project

Tech Stack:
- Next.js 15 + TypeScript
- Tailwind CSS v4
- Custom CSS variables for unique design

Design Approach:
- Build CUSTOM components with Tailwind (not generic Shadcn!)
- Unique visual identity with custom colors
- Bespoke layouts (asymmetry, interesting grids)
- Smooth animations and micro-interactions
- High-end, premium feel

Design Principles:
- Intentional Minimalism (anti-generic, bespoke layouts)
- Hero section with strong visual impact
- 3-4 feature sections max
- Custom color scheme (no default blue/violet)
- Clean typography, lots of whitespace
- Mobile-first responsive

Structure:
1. Hero: Headline + subhead + CTA button
2. Features: 3-column grid of key features
3. Social proof: Simple testimonials or stats
4. CTA: Final conversion section
5. Footer: Minimal links

Requirements:
- Build ALL visual components from scratch with Tailwind
- Custom CSS variables for colors, spacing
- NO Shadcn unless for complex forms/modals
- Clean, semantic HTML5
- Smooth scroll animations
- Professional, unique design

Output: Complete working app in one shot
EOF
}

# Template: Minimal MVP (smallest context footprint)
template_minimal() {
    local project=$1
    cat <<EOF
Build minimal MVP for: $project

Tech: Next.js + Tailwind CSS

Design:
- Build custom UI with Tailwind (no generic libraries)
- Simple, clean, unique look
- Custom colors and spacing

Core Features Only:
- Single page app
- One main function
- Clean, simple UI
- Mobile responsive

Keep it small. Ship it fast.
EOF
}

# Template: Admin Dashboard
template_dashboard() {
    local project=$1
    cat <<EOF
Build admin dashboard for: $project

Tech Stack:
- Next.js 15 + TypeScript
- Tailwind CSS v4
- Recharts for charts

Design:
- Custom Tailwind components (no generic Shadcn)
- Clean, data-focused layout
- Good contrast and readability

Pages:
- Overview with key metrics
- Data table with filters
- Settings page

Design: Clean, professional, unique
EOF
}

# Template: Full-stack Web App
template_webapp() {
    local project=$1
    cat <<EOF
Build full-stack web app: $project

Tech Stack:
- Next.js 15 + TypeScript
- Tailwind CSS v4
- API routes
- Data fetching

Design:
- Build custom UI with Tailwind (unique look)
- Use Shadcn/Radix ONLY for complex forms/dialogs
- Focus on smooth, polished UX

Features:
- Authentication UI ready
- CRUD operations
- Responsive tables
- Form validation

Design: Professional, unique, not generic
EOF
}

# Template: Mobile-First App
template_mobile() {
    local project=$1
    cat <<EOF
Build mobile-first app: $project

Tech Stack:
- Next.js 15 + TypeScript
- Tailwind CSS v4
- Shadcn UI
- PWA ready

CRITICAL: DO NOT BUILD CUSTOM COMPONENTS
- All UI elements: Use Shadcn components
- Inputs: <Input>, <Textarea>
- Buttons: <Button>
- Forms: <Form>
- Navigation: <NavigationMenu>
- Mobile touches: Use Shadcn mobile patterns

Design:
- Mobile breakpoints first
- Touch-friendly UI
- Bottom navigation
- Smooth transitions

Performance:
- Fast initial load
- Optimized images
- Lazy loading
EOF
}

# Template: REST API
template_api() {
    local project=$1
    cat <<EOF
Build REST API: $project

Tech Stack:
- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL ready

Endpoints:
- CRUD for main resource
- Authentication middleware
- Error handling
- Request validation

Structure:
- Clean architecture
- Separated concerns
- Type safety
EOF
}

# Main execution
main() {
    if [ $# -lt 1 ]; then
        show_usage
        exit 1
    fi

    local template=$1
    local project=${2:-"my-project"}

    case $template in
        landing)
            echo -e "${GREEN}Using Landing Page template...${NC}"
            template_landing "$project"
            ;;
        minimal)
            echo -e "${GREEN}Using Minimal MVP template...${NC}"
            template_minimal "$project"
            ;;
        dashboard)
            echo -e "${GREEN}Using Dashboard template...${NC}"
            template_dashboard "$project"
            ;;
        webapp)
            echo -e "${GREEN}Using Web App template...${NC}"
            template_webapp "$project"
            ;;
        mobile)
            echo -e "${GREEN}Using Mobile App template...${NC}"
            template_mobile "$project"
            ;;
        api)
            echo -e "${GREEN}Using API template...${NC}"
            template_api "$project"
            ;;
        *)
            echo -e "${YELLOW}Unknown template: $template${NC}"
            show_usage
            exit 1
            ;;
    esac
}

main "$@"
