# Standex 2.0 - AI Data Analysis & Modeling Platform

**AI-powered data readiness platform.** Schema profiling, data quality diagnostics, and model-readiness scoring for regulated industries.

---

## 🚀 What's New in 2.0

StandexAI has been completely transformed from a simple form-based SEO generator into a **professional enterprise data readiness platform**:

### **Before (v1.0)**
- Basic form to generate SEO content
- Simple website scanner
- Single-page interface

### **After (v2.0)**
- ✨ **Schema-Aware Editor** (PromptLab) - define data model intents
- 🧪 **Live Data Diagnostics** - detect quality risks and schema drift
- 📊 **Multi-Score Dashboard** - readiness, quality, and governance scores
- 🧭 **Modeling Briefs** - AI-powered feature and KPI suggestions
- 👥 **Team Collaboration** - built-in workflows and approvals
- 🏢 **Industry-Specific** - Healthcare, FinTech, Insurance, and more
- 🔄 **Project Management** - track datasets, versions, and releases

---

## 🎨 Core Features

### 1. **Modern Dashboard**
- Dataset overview with status tracking
- Readiness analytics (Quality/Governance/Model-fit)
- Quick actions and filtering
- Real-time updates

### 2. **Schema Editor (PromptLab)**
- TipTap-powered modeling brief editor
- **AI Co-Pilot** - dataset and schema suggestions
- **Live Diagnostics Sidebar** - flags quality risks
- **Multi-score tracking** - readiness, quality, governance
- Format toolbar with shortcuts
- Auto-save and version history ready

### 3. **Data Governance System**
- Industry-specific rule sets (HIPAA, FTC, SEC)
- Real-time flagging with severity levels
- Automatic suggestions for fixes
- Data contracts & lineage (coming soon)
- Regulatory reference citations

### 4. **Modeling Briefs**
- Feature suggestions powered by AI
- KPI definitions and metric registry
- Recommended schema structure
- Data gap analysis
- Performance benchmarks

### 5. **Team Workflow**
- Role-based access (Admin, Analyst, Reviewer, Viewer)
- Draft → Review → Approve → Publish pipeline
- Comments and collaboration (coming soon)
- Activity tracking and audit trail

---

## 🏗️ Architecture

### **Tech Stack**
- **Framework:** Next.js 16 (App Router)
- **Database:** PostgreSQL (Neon) with Prisma ORM
- **Editor:** TipTap (ProseMirror)
- **UI:** Tailwind CSS + Radix UI
- **AI:** Azure OpenAI (chat + optional Whisper)
- **Auth:** NextAuth.js (schema ready)

### **Database Schema**
Comprehensive schema supporting:
- Users & Teams with role-based access
- Datasets with version control
- Data rules & flags
- Quality analysis & tracking
- Modeling briefs & templates
- Comments & approvals
- API keys & integrations

---

## 📂 Project Structure

```
standexai/
├── app/
│   ├── (platform)/          # Main application
│   │   ├── console/         # Main hub (tools & shortcuts)
│   │   ├── studio/
│   │   │   ├── editor/      # Rich text editor
│   │   │   └── briefs/      # Content briefs
│   │   ├── settings/        # User settings
│   │   └── layout.tsx       # Sidebar navigation
│   ├── api/
│   │   ├── content/         # Content CRUD
│   │   ├── generate/        # Legacy SEO generator
│   │   └── scan/            # Website scanner
│   ├── page.tsx             # Landing page
│   └── layout.tsx           # Root layout
├── components/
│   └── ui/                  # Radix UI components
├── lib/
│   └── prisma.ts            # Database client
└── prisma/
    └── schema.prisma        # Full enterprise schema
```

---

## 🚦 Getting Started

### **1. Install Dependencies**
```bash
npm install
```

### **2. Set Environment Variables**
Create `.env` file:
```env
DATABASE_URL="postgresql://..."
# Bare resource host only — do NOT include /openai or /openai/v1
AZURE_OPENAI_ENDPOINT="https://YOUR_RESOURCE.openai.azure.com"
AZURE_OPENAI_API_KEY="..."
AZURE_OPENAI_DEPLOYMENT_TEXT="your-chat-deployment"
# Optional: Whisper / speech transcription (separate deployment)
# AZURE_OPENAI_DEPLOYMENT_SPEECH="your-whisper-deployment"
# Optional: text-to-speech deployment (defaults to "tts-1" if unset)
# AZURE_OPENAI_DEPLOYMENT_TTS="your-tts-deployment"
# Optional: separate voice resource for speech/TTS (both required together)
# AZURE_OPENAI_SPEECH_ENDPOINT="https://YOUR_VOICE_RESOURCE.openai.azure.com"
# AZURE_OPENAI_SPEECH_API_KEY="..."
# AZURE_OPENAI_API_VERSION="2024-08-01-preview"
NEXTAUTH_SECRET="your-secret"  # For auth (optional)
```

### **3. Setup Database**
```bash
# Generate Prisma Client
npm run prisma:generate

# Push schema to database
npm run prisma:push

# Optional: Seed with sample data
npm run db:seed
```

### **4. Run Development Server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🎯 Navigation Guide

### **Main Routes**
- `/` - Landing page with feature overview
- `/console` - Main console (hub into tools & workflows)
- `/studio/editor` - Schema editor with AI assistance
- `/studio/briefs` - Modeling brief generator
- `/settings` - Account and governance settings
### **Data Routes**
- `/data-diagnostics` - Live data diagnostics

### **Legacy Routes (Still Available)**
- Original form-based generator is preserved in the codebase
- Access via API: `POST /api/generate`
- Website scanner: `POST /api/scan`

---

## 🔐 Security & Compliance

### **Built-in Compliance Rules**
- **Healthcare (HIPAA):** Medical claims, PHI handling
- **Finance (SEC/FTC):** Investment advice, performance claims
- **Insurance:** State regulations, disclosure requirements
- **General:** Advertising guidelines, truthful marketing

### **Compliance Features**
- Real-time data quality scanning
- Severity-based flagging (Critical, Warning, Info)
- Contextual suggestions
- Regulatory reference linking
- Custom rule builder (enterprise)

---

## 📊 Scoring System

### **Readiness Score (0-100)**
- Schema integrity
- Missingness thresholds
- Join stability
- Data freshness
- Governance coverage

### **Quality Score (0-100)**
- Outlier detection
- Consistency checks
- Distribution drift
- Duplicate detection
- Validation pass rate

### **Governance Score (0-100)**
- Regulatory adherence
- Risk level assessment
- Flag severity weighting
- Industry-specific rules

---

## 🛠️ Development

### **Database Commands**
```bash
npm run prisma:generate    # Generate Prisma Client
npm run prisma:migrate     # Create migration
npm run prisma:push        # Push schema changes
npm run prisma:seed        # Seed database
```

### **Build**
```bash
npm run build
npm run start
```

---

## 🗺️ Roadmap

### **Phase 1 (Current)**
- ✅ Dashboard & navigation
- ✅ Schema editor (PromptLab)
- ✅ Data diagnostics
- ✅ Multi-score system
- ✅ Modeling briefs

### **Phase 2 (Next)**
- 🔄 Real authentication (NextAuth)
- 🔄 Team management UI
- 🔄 Comments & collaboration
- 🔄 Approval workflows
- 🔄 Export to CMS integrations

### **Phase 3 (Future)**
- 📋 Custom compliance rules
- 📋 Advanced analytics
- 📋 Template library
- 📋 API documentation
- 📋 Webhook integrations

---

## 📝 License

Proprietary - All rights reserved

---

## 🤝 Contributing

This is a private project. For questions or support, contact the development team.

---

**Built with ❤️ for teams creating compliant, high-performing content at scale.**
