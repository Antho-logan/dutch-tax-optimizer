# 🇳🇱 Dutch Tax Optimizer

AI-powered tax optimization tool for Dutch freelancers. Maximize your deductions, check WBSO eligibility, and project your tax savings.

## ✨ Features

- **📄 Receipt Scanner** - Upload receipts and let AI extract expense data automatically
- **🔍 Deductions Finder** - Discover all eligible Dutch tax deductions for freelancers
- **💼 WBSO Checker** - Check your 2026 WBSO (R&D tax credit) eligibility
- **📊 Tax Projections** - Calculate your potential tax savings and plan ahead

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + Custom CSS Variables
- **Design:** Custom components (no generic UI libraries!)
- **State:** React hooks

## 🎨 Design Philosophy

**Premium Custom Design:**
- Unique color scheme (orange/red/purple gradients)
- Smooth animations and micro-interactions
- Bespoke layouts with visual personality
- Mobile-first responsive design
- High-end, non-generic look

**No Template Feel:**
- All components built from scratch with Tailwind
- Custom CSS variables for design system
- Unique visual identity
- Intentional Minimalism applied

## 📋 Features in Detail

### Receipt Scanner
- Drag-and-drop receipt upload
- AI-powered data extraction
- Automatic categorization
- Tax deductible detection

### Deductions Finder
- Searchable deduction database
- Category filtering
- Popularity indicators
- Detailed descriptions

### WBSO Checker
- Interactive questionnaire
- Instant eligibility assessment
- Personalized recommendations
- Application guidance

### Tax Projections
- Income tax calculator
- Deduction optimizer
- WBSO benefit integration
- Effective tax rate analysis

## 🇳🇱 Dutch Tax Context

Built specifically for Dutch freelancers (ZZP'ers):
- Box 1 income tax rates (2026)
- WBSO R&D tax credit support
- Common freelancer deductions
- Dutch tax authority guidelines

## 📦 Project Structure

```
dutch-tax-optimizer/
├── app/
│   ├── page.tsx              # Home page
│   ├── scan-receipts/        # Receipt scanner
│   ├── deductions/           # Deductions finder
│   ├── wbso-checker/         # WBSO eligibility checker
│   └── projections/          # Tax projections
├── components/               # Custom Tailwind components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   ├── Textarea.tsx
│   └── Badge.tsx
└── public/                   # Static assets
```

## 🎯 Why Custom Design?

Generic UI libraries (Shadcn, Bootstrap) make everything look the same. This project uses **custom Tailwind components** for:
- ✅ Unique visual identity
- ✅ Premium feel and polish
- ✅ Better brand differentiation
- ✅ More control over UX
- ✅ No template fatigue

## 📄 License

MIT License - feel free to use for your own tax optimization needs!

## 🙏 Disclaimer

This tool provides estimates and general guidance. For complex tax situations, always consult a qualified Dutch tax advisor.

## 🔗 Resources

- [Dutch Tax Authority (Belastingdienst)](https://belastingdienst.nl)
- [WBSO Information (RVO.nl)](https://rvo.nl/subsidies-regelingen/wbso)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)

---

Made with ❤️ for Dutch freelancers | Custom design with Next.js 15 + Tailwind CSS
