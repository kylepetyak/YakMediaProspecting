# 🎯 Yak Media Lead Prospecting System

> A comprehensive marketing audit platform for generating personalized prospect reports across all industries. An ongoing tool designed to continuously build your client pipeline with data-driven marketing audits.

**Live App:** https://success.yak.media  
**Status:** Ready for Deployment ✅

---

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [Support](#support)

---

## 🚀 Quick Start

### 🎯 Ready to Deploy?

**Start here:** [`/START_HERE.md`](/START_HERE.md) - 30-minute deployment guide

**Or detailed guide:** [`/DEPLOYMENT_CHECKLIST.md`](/DEPLOYMENT_CHECKLIST.md)

### For Team Members (Using the App)

1. **Login:** https://success.yak.media/#/login
2. **Dashboard:** https://success.yak.media/#/dashboard
3. **Guide:** https://success.yak.media/#/guide

See [`/USER_ACCESS_GUIDE.md`](/USER_ACCESS_GUIDE.md) for detailed instructions.

---

## ✨ Features

### 🎯 Core Functionality
- **10-Point Marketing Audit** - Comprehensive evaluation across key areas
- **Prospect Management** - Track 300+ companies with detailed information
- **Public Report URLs** - Beautiful, shareable reports at `success.yak.media/companyname`
- **Custom Scoring** - Adjust individual scores for each audit category
- **Potential Impact** - Customize lead and revenue projections per prospect
- **Screenshot Management** - Upload and organize audit evidence
- **Team Collaboration** - Multi-user access with authentication

### 📊 Audit Categories
1. Website UX - Design, speed, mobile-friendly, CTAs
2. Offer - New patient or consultation offers
3. Facebook Ads - Campaign presence and strategy
4. Google Ads - Search and display advertising
5. Social Media - Content frequency and engagement
6. Reviews - Google review quantity and rating
7. GMB Optimization - Photos, posts, business info
8. Tracking - Pixel and analytics implementation
9. Retargeting - Warm audience campaigns
10. Follow-Up System - Automated lead nurture

### 🎨 Professional Reports
- Branded design with gradient headers
- Visual score breakdown with charts
- Top 3 opportunities highlighted
- Potential monthly impact projections
- CTA buttons for strategy calls
- Mobile-responsive layout

### 🔐 Security & Access Control
- **Protected Admin Routes** - Dashboard, audit forms, user management
- **Public Report Routes** - Shareable without login
- **Authentication** - Powered by Supabase Auth
- **Row Level Security** - Database-level access control

---

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Styling with design tokens
- **React Router v6** - HashRouter for client-side routing
- **Lucide Icons** - Beautiful iconography
- **Recharts** - Interactive charts
- **Sonner** - Toast notifications
- **Radix UI** - Accessible components (via shadcn/ui)

### Backend
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Edge Functions (Deno + Hono)
  - Authentication
  - File Storage
  - Row Level Security
- **Hono** - Lightweight web framework for edge functions

### Deployment
- **Vercel** - Frontend hosting with custom domain
- **GitHub** - Version control and CI/CD
- **GoDaddy** - Domain management (yak.media)

---

## 📁 Project Structure

```
yak-media-prospecting/
├── App.tsx                    # Main app with routing
├── main.tsx                   # React entry point
├── index.html                 # HTML template
├── package.json               # Dependencies
├── vite.config.ts            # Vite configuration
├── vercel.json               # Vercel deployment config
├── styles/
│   └── globals.css           # Tailwind v4 + design tokens
├── components/
│   ├── pages/                # Page components
│   │   ├── LoginPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── AuditFormPage.tsx
│   │   ├── PublicReportPage.tsx
│   │   └── ...
│   ├── ui/                   # shadcn/ui components
│   ├── AuthContext.tsx       # Authentication context
│   ├── ProtectedRoute.tsx    # Route guard
│   ├── AuditReport.tsx       # Main report component
│   └── ...
├── utils/
│   ├── supabase/
│   │   ├── client.tsx        # Supabase client singleton
│   │   ├── info.tsx          # Project credentials
│   │   └── types.tsx         # TypeScript types
│   └── slugify.tsx           # URL slug generation
├── supabase/
│   └── functions/
│       └── server/           # Edge function backend
│           ├── index.tsx     # API routes
│           ├── database.tsx  # Supabase client
│           └── kv_store.tsx  # KV operations
├── DATABASE_COMPLETE_SETUP.sql  # All-in-one DB setup
└── [documentation files]
```

---

## 🚢 Deployment

### Prerequisites
- [x] GitHub repository
- [x] Supabase account with project created
- [x] Vercel account
- [x] Custom domain (success.yak.media)

### Deployment Steps

**Option 1: Quick Deploy (Recommended)**

Follow the comprehensive guide:
📄 **[`/DEPLOYMENT_CHECKLIST.md`](/DEPLOYMENT_CHECKLIST.md)**

This covers:
1. Database setup (SQL migrations)
2. Edge function deployment
3. GitHub → Vercel connection
4. Domain configuration
5. First user creation
6. End-to-end testing

**Option 2: Manual Deploy**

```bash
# 1. Install dependencies
npm install

# 2. Build locally (test)
npm run build

# 3. Push to GitHub
git add .
git commit -m "Deploy Yak Media system"
git push origin main

# 4. Connect Vercel to GitHub repo
# (via Vercel dashboard)

# 5. Set environment variables in Vercel:
# VITE_SUPABASE_PROJECT_ID
# VITE_SUPABASE_ANON_KEY

# 6. Deploy Supabase functions
supabase functions deploy make-server-5e752b5e
```

### Pre-Push Checklist

Before pushing to GitHub:
📄 **[`/PRE_PUSH_CHECKLIST.md`](/PRE_PUSH_CHECKLIST.md)**

Verifies:
- All required files present
- No sensitive data in repo
- .gitignore configured correctly
- Build passes locally
- Environment variables setup

---

## 📚 Documentation

### Setup Guides
- [`/DEPLOYMENT_CHECKLIST.md`](/DEPLOYMENT_CHECKLIST.md) - Complete deployment walkthrough
- [`/PRE_PUSH_CHECKLIST.md`](/PRE_PUSH_CHECKLIST.md) - Pre-deployment verification
- [`/DATABASE_COMPLETE_SETUP.sql`](/DATABASE_COMPLETE_SETUP.sql) - All-in-one database setup
- [`/AUTH_SETUP.md`](/AUTH_SETUP.md) - Authentication configuration
- [`/GODADDY_SETUP.md`](/GODADDY_SETUP.md) - DNS configuration for custom domain

### User Guides
- [`/USER_ACCESS_GUIDE.md`](/USER_ACCESS_GUIDE.md) - How to use the app
- [`/HOW_TO_CREATE_FIRST_REPORT.md`](/HOW_TO_CREATE_FIRST_REPORT.md) - Step-by-step audit workflow
- [`/HOW_TO_ADJUST_POTENTIAL_IMPACT.md`](/HOW_TO_ADJUST_POTENTIAL_IMPACT.md) - Customize projections
- [`/USER_MANAGEMENT_GUIDE.md`](/USER_MANAGEMENT_GUIDE.md) - Managing team access
- [`/QUICK_START.md`](/QUICK_START.md) - Getting started quickly

### Technical Docs
- [`/SETUP_INSTRUCTIONS.md`](/SETUP_INSTRUCTIONS.md) - Technical setup details
- [`/SECURITY_SUMMARY.md`](/SECURITY_SUMMARY.md) - Security architecture
- [`/HOSTING_SETUP.md`](/HOSTING_SETUP.md) - Hosting options comparison
- [`/guidelines/Guidelines.md`](/guidelines/Guidelines.md) - Development guidelines

---

## 🎯 Usage

### Creating Your First Report

1. **Login** to the dashboard
2. **Add New Prospect** with company details
3. **Open Audit** and complete all 10 categories
4. **Adjust Scoring** for each category (0-100)
5. **Add Screenshots** for visual evidence
6. **Set Potential Impact** (leads and revenue)
7. **Save & Publish Report**
8. **Share URL**: `success.yak.media/#/companyname`

See detailed walkthrough: [`/HOW_TO_CREATE_FIRST_REPORT.md`](/HOW_TO_CREATE_FIRST_REPORT.md)

### Daily Workflow (Target: 5-10 audits/day)

1. **Morning:** Review dashboard, assign audits to team
2. **Research:** Gather prospect information
3. **Audit:** Complete 10-point evaluation
4. **Review:** QA check for accuracy and detail
5. **Publish:** Generate and send report
6. **Follow-up:** Track opens and responses

### Team Collaboration

- **Admin:** Full access to all features
- **Auditors:** Can create/edit prospects and audits
- **Viewers:** Read-only access to dashboard

Manage users at: [`/manage-users`](https://success.yak.media/#/manage-users)

---

## 🔧 Development

### Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Visit http://localhost:3000
```

### Environment Variables

Create `.env.local` (never commit this):

```env
VITE_SUPABASE_PROJECT_ID=vgttzxgulpgxoysogpfs
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Get these from: https://supabase.com/dashboard/project/vgttzxgulpgxoysogpfs/settings/api

### Database Migrations

When making schema changes:

1. Test SQL in Supabase SQL Editor
2. Add to migration file (e.g., `ADD_NEW_FEATURE.sql`)
3. Document in `/DEPLOYMENT_CHECKLIST.md`
4. Run on production Supabase project

### Edge Function Development

```bash
# Serve locally
supabase functions serve make-server-5e752b5e

# Deploy to production
supabase functions deploy make-server-5e752b5e
```

---

## 🎨 Customization

### Branding
- Update colors in `/styles/globals.css`
- Replace logo/branding in components
- Customize CTA buttons in `AuditReport.tsx`

### Audit Categories
- Modify `AUDIT_FIELDS` array in `AuditFormPage.tsx`
- Update database schema if adding fields
- Update `PublicReportPage.tsx` to match

### Scoring Logic
- Default: Pass = 100, Warning = 50, Fail = 20
- Customize in audit form with custom scores
- Adjust in `AuditFormPage.tsx` state management

---

## 📊 Analytics & Monitoring

### Built-in Tools
- **Quick Start:** [`/quick-start`](https://success.yak.media/#/quick-start) - Setup guide and instructions
- **Audit Guide:** [`/guide`](https://success.yak.media/#/guide) - Step-by-step audit methodology
- **User Management:** [`/manage-users`](https://success.yak.media/#/manage-users) - Team access control

### External Monitoring
- **Vercel Analytics** - Page views, performance
- **Supabase Logs** - API calls, errors
- **Supabase Auth** - User logins, sessions

---

## ⚠️ Troubleshooting

### Common Issues

**Build fails on Vercel**
- Check environment variables are set
- Verify all dependencies in `package.json`
- Review build logs in Vercel dashboard

**Login doesn't work**
- Verify user exists in Supabase Auth
- Check `email_confirmed_at` is set
- See [`/AUTH_SETUP.md`](/AUTH_SETUP.md)

**Reports show 404**
- Confirm prospect exists with correct slug
- Check DNS is configured (CNAME to vercel)
- Verify `vercel.json` has rewrites

**"Table does not exist"**
- Run `/DATABASE_COMPLETE_SETUP.sql` in Supabase
- Verify tables in Supabase Table Editor
- Check RLS policies are enabled

**More help:** [`/DEPLOYMENT_CHECKLIST.md`](/DEPLOYMENT_CHECKLIST.md#-troubleshooting)

---

## 📞 Support

### Internal Resources
- **Quick Start Guide:** [`/QUICK_START.md`](/QUICK_START.md)
- **User Access Guide:** [`/USER_ACCESS_GUIDE.md`](/USER_ACCESS_GUIDE.md)
- **Troubleshooting:** [`/DEPLOYMENT_CHECKLIST.md`](/DEPLOYMENT_CHECKLIST.md#-troubleshooting)

### External Resources
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [React Router Docs](https://reactrouter.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

## 🎯 Goals & Metrics

**Mission:** Ongoing prospecting system to continuously generate qualified leads and sign retainer clients across all industries

### Key Metrics
- **Daily Target:** 5-10 audits completed per team member
- **Quality Focus:** Detailed, accurate findings with industry-specific insights
- **Report Format:** Public URLs (`success.yak.media/companyname`)
- **Customization:** Tailored potential impact projections for each industry

### Success Criteria
- [ ] Steady pipeline of prospects in database
- [ ] High-quality, comprehensive audits
- [ ] All reports published with public URLs
- [ ] Continuous client acquisition
- [ ] Average audit completion time: 10-15 minutes
- [ ] Team trained and productive across multiple industries

---

## 📝 License

Proprietary - Yak Media Internal Use Only

---

## 🙏 Acknowledgments

Built with:
- React ecosystem
- Supabase for backend
- Tailwind CSS for styling
- shadcn/ui for components
- Vercel for hosting

---

**Ready to deploy?** Start here: [`/DEPLOYMENT_CHECKLIST.md`](/DEPLOYMENT_CHECKLIST.md)

**Need help?** Check: [`/QUICK_START.md`](/QUICK_START.md)

**For team members:** [`/USER_ACCESS_GUIDE.md`](/USER_ACCESS_GUIDE.md)
