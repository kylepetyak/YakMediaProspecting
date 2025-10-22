# How Your Prospecting System Works

## Quick Overview

This is a **lead prospecting tool** that creates personalized marketing audit reports for potential clients. Each company gets its own public URL at `success.yak.media/companyname`.

## The Workflow

### Step 1: Initial Setup (One-time)
1. Deploy app to Netlify
2. Run database migration in Supabase
3. Visit `/initial-setup` to create your first admin account

### Step 2: Create Prospects (Daily Work)
1. Log into `/dashboard`
2. Click "Add New Prospect"
3. Enter company details (name, contact info)
4. System auto-generates a URL slug (e.g., "acme-chiropractic")

### Step 3: Complete Audits
1. Click "Open Audit" for any prospect
2. Fill out 10 marketing checkpoints:
   - Website UX
   - Offer quality
   - Facebook/Google Ads
   - Social media presence
   - Reviews
   - GMB optimization
   - Tracking pixels
   - Retargeting
   - Follow-up systems
3. Add screenshots and notes for each category
4. Customize scores and monthly impact estimates
5. Click "Generate / Update Report"

### Step 4: Share Reports
- Public URL is automatically created at `success.yak.media/[company-slug]`
- Send this URL to prospects in your outreach
- No login required for prospects to view their report

## Understanding the Errors You Saw

The errors you saw earlier were **EXPECTED** and **NOT BUGS**:

```
Error: Cannot coerce the result to a single JSON object
Code: PGRST116 - The result contains 0 rows
```

**What this means:** You tried to visit a URL like `success.yak.media/some-company` but no prospect with that slug exists in the database yet.

**This is normal!** It's like going to a webpage that hasn't been created yet. Once you create a prospect in the dashboard with that company name, the URL will work.

## Files You Should NEVER Edit Manually

1. **`/public/_redirects`** - This is a plain text file for Netlify routing
   - If you accidentally turn it into a directory, delete it and let me recreate it
   - Contains one line: `/* /index.html 200`

## Core Pages

- `/initial-setup` - Create first admin (public, one-time)
- `/login` - Team login
- `/dashboard` - Main workspace (protected)
- `/dashboard/audit/:id` - Audit form (protected)
- `/create-user` - Add team members (protected)
- `/manage-users` - Manage team (protected)
- `/:slug` - Public report (anyone can view)

## Your Goal

**5-10 detailed audits daily → 50-100 audits per 10 days → 25 signed retainer clients**

Focus on accuracy and detail over speed. Each audit should be thorough with clear screenshots and actionable insights.
