# 🚀 Complete Deployment Checklist for Yak Media Lead Prospecting

This is your step-by-step guide to deploy the app from GitHub to Vercel with success.yak.media.

---

## ✅ Phase 1: Database Setup (Supabase)

### Step 1.1: Run SQL Migrations in Order

Go to your Supabase SQL Editor: https://supabase.com/dashboard/project/vgttzxgulpgxoysogpfs/sql

Run these SQL files **in this exact order**:

#### 1️⃣ First: `DATABASE_SETUP.sql`
This creates the core tables: `prospects`, `audits`, `assets`

```sql
-- Copy and paste the entire content of DATABASE_SETUP.sql
-- This creates:
-- ✅ prospects table
-- ✅ audits table  
-- ✅ assets table
-- ✅ Row Level Security policies
-- ✅ Indexes
```

**Verify it worked:**
```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('prospects', 'audits', 'assets');
```
You should see all 3 tables.

---

#### 2️⃣ Second: `ADD_CUSTOM_SCORES.sql`
This adds custom scoring fields to the audits table.

```sql
-- Copy and paste the entire content of ADD_CUSTOM_SCORES.sql
-- This adds score columns for each audit point
```

**Verify it worked:**
```sql
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'audits' 
AND column_name LIKE '%_score';
```
You should see 10 score columns (website_ux_score, offer_score, etc.)

---

#### 3️⃣ Third: `ADD_POTENTIAL_IMPACT_FIELDS.sql`
This adds customizable potential impact numbers.

```sql
-- Copy and paste the entire content of ADD_POTENTIAL_IMPACT_FIELDS.sql
-- Adds: potential_leads_min, potential_leads_max, 
--       potential_revenue_min, potential_revenue_max
```

**Verify it worked:**
```sql
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'audits' 
AND column_name LIKE 'potential%';
```
You should see 4 potential impact columns.

---

### Step 1.2: Get Your Supabase Credentials

1. Go to: https://supabase.com/dashboard/project/vgttzxgulpgxoysogpfs/settings/api
2. Copy these values (you'll need them for Vercel):
   - **Project ID**: `vgttzxgulpgxoysogpfs`
   - **Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (long string)
   - **Service Role Key**: Keep this SECRET - only for server side

---

## ✅ Phase 2: Deploy Supabase Edge Functions

Your backend server needs to be deployed to Supabase.

### Step 2.1: Install Supabase CLI (if not already installed)

```bash
# macOS/Linux
brew install supabase/tap/supabase

# Windows
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

### Step 2.2: Login to Supabase

```bash
supabase login
```

This will open your browser to authenticate.

### Step 2.3: Link Your Project

```bash
supabase link --project-ref vgttzxgulpgxoysogpfs
```

### Step 2.4: Deploy the Edge Function

```bash
supabase functions deploy make-server-5e752b5e
```

**Verify it worked:**
Visit: https://vgttzxgulpgxoysogpfs.supabase.co/functions/v1/make-server-5e752b5e/health

You should see: `{"status":"ok"}`

---

## ✅ Phase 3: GitHub Setup

### Step 3.1: Initialize Git (if not already done)

```bash
git init
git add .
git commit -m "Initial commit - Yak Media Lead Prospecting System"
```

### Step 3.2: Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository (e.g., `yak-media-prospecting`)
3. **Do NOT** initialize with README (you already have files)

### Step 3.3: Push to GitHub

```bash
git remote add origin https://github.com/YOUR-USERNAME/yak-media-prospecting.git
git branch -M main
git push -u origin main
```

**✅ Checkpoint:** Your code is now on GitHub!

---

## ✅ Phase 4: Vercel Deployment

### Step 4.1: Connect GitHub to Vercel

1. Go to https://vercel.com
2. Sign in (use GitHub to sign in for easier integration)
3. Click **"Add New Project"**
4. Select **"Import Git Repository"**
5. Find and select your `yak-media-prospecting` repository
6. Click **"Import"**

### Step 4.2: Configure Project Settings

Vercel should auto-detect it's a Vite app. Verify these settings:

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Step 4.3: Add Environment Variables

In the Vercel project settings, before deploying:

1. Click **"Environment Variables"**
2. Add these variables (for **Production**, **Preview**, and **Development**):

```
VITE_SUPABASE_PROJECT_ID=vgttzxgulpgxoysogpfs
```

```
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZndHR6eGd1bHBneG95c29ncGZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NTA5MzcsImV4cCI6MjA3NjAyNjkzN30.tmvqX0uMaPpWpbUhUkSKXRlkB4KqDkRl9wBZg_a53dA
```

**IMPORTANT:** Replace with your actual keys from Step 1.2!

### Step 4.4: Deploy!

Click **"Deploy"**

Vercel will:
1. Install dependencies
2. Run the build
3. Deploy to a temporary URL like `yak-media-prospecting.vercel.app`

Wait 2-3 minutes for the build to complete.

**✅ Checkpoint:** Your app is live on a Vercel URL!

---

## ✅ Phase 5: Custom Domain Setup (success.yak.media)

### Step 5.1: Add Domain in Vercel

1. In your Vercel project, go to **Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter: `success.yak.media`
4. Click **"Add"**

Vercel will show you DNS records to add.

### Step 5.2: Configure DNS Records

Go to your domain provider (GoDaddy) DNS settings:

#### For GoDaddy:
1. Go to: https://dcc.godaddy.com/domains/yak.media/dns
2. Click **"Add"** and create a new record:

**CNAME Record:**
```
Type: CNAME
Name: success
Value: cname.vercel-dns.com
TTL: 1 Hour (3600)
```

3. Click **"Save"**

### Step 5.3: Wait for DNS Propagation

- **Usually takes**: 5-15 minutes
- **Can take up to**: 48 hours

Check status in Vercel:
- It will show "Pending" while propagating
- Will change to "Valid" when ready

**Test DNS propagation:**
```bash
nslookup success.yak.media
# or
dig success.yak.media
```

### Step 5.4: Enable HTTPS

Vercel automatically provisions SSL certificates. Once DNS is valid:
- ✅ `https://success.yak.media` will work
- ✅ Auto-redirects from `http://` to `https://`

**✅ Checkpoint:** success.yak.media is live and secure!

---

## ✅ Phase 6: Create First User and Test

### Step 6.1: Create Admin User

Since your app requires authentication, you need to create the first user.

**Option A: Via Supabase Dashboard (Recommended)**

1. Go to: https://supabase.com/dashboard/project/vgttzxgulpgxoysogpfs/auth/users
2. Click **"Add user"** → **"Create new user"**
3. Enter:
   - Email: `your-email@example.com`
   - Password: `YourSecurePassword123!`
   - Auto Confirm User: ✅ **YES** (check this box!)
4. Click **"Create user"**

**Option B: Via SQL**

```sql
-- In Supabase SQL Editor
INSERT INTO auth.users (
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  role,
  aud
) VALUES (
  'your-email@example.com',
  crypt('YourPassword123!', gen_salt('bf')),
  NOW(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{}'::jsonb,
  NOW(),
  NOW(),
  'authenticated',
  'authenticated'
);
```

### Step 6.2: Test Login

1. Go to: `https://success.yak.media/#/login`
2. Enter your email and password
3. You should be redirected to the HomePage

If login doesn't work:
- Check Supabase Auth logs
- Verify email_confirmed_at is set
- See `/AUTH_SETUP.md` for troubleshooting

### Step 6.3: Create Your First Prospect

1. Navigate to: `https://success.yak.media/#/dashboard`
2. Click **"Add New Prospect"**
3. Fill in:
   - Company Name: Test Chiropractic
   - Owner Name: Dr. Test
   - City: Phoenix
   - Phone, website, etc.
4. Click **"Create Prospect"**

### Step 6.4: Complete an Audit

1. From the dashboard, click **"Open Audit"** on your test prospect
2. Fill out all 10 audit categories
3. Add top opportunities
4. Adjust potential impact numbers (optional)
5. Click **"Save & Publish Report"**

### Step 6.5: View Public Report

The toast notification will show you the URL. Visit:
`https://success.yak.media/#/testchiropractic`

**✅ Checkpoint:** End-to-end flow works!

---

## ✅ Phase 7: Invite Your Team

### Step 7.1: Create Additional Users

Use the Create User page in your app:

1. Go to: `https://success.yak.media/#/create-user`
2. Enter team member's:
   - Name
   - Email  
   - Password
3. Click **"Create User"**

Share login credentials with your team via secure channel (1Password, LastPass, etc.)

### Step 7.2: Team Members Can Access

Your team can now:
- Login at: `https://success.yak.media/#/login`
- Access dashboard
- Create prospects
- Complete audits
- Generate reports

---

## 🎯 Quick Reference URLs

After deployment, bookmark these:

| Purpose | URL |
|---------|-----|
| **Login** | https://success.yak.media/#/login |
| **Dashboard** | https://success.yak.media/#/dashboard |
| **Audit Guide** | https://success.yak.media/#/guide |
| **Create User** | https://success.yak.media/#/create-user |
| **Manage Users** | https://success.yak.media/#/manage-users |
| **Setup Check** | https://success.yak.media/#/setup |
| **Debug** | https://success.yak.media/#/debug |
| **Sample Report** | https://success.yak.media/#/sample-report |
| **Supabase Dashboard** | https://supabase.com/dashboard/project/vgttzxgulpgxoysogpfs |
| **Vercel Dashboard** | https://vercel.com/dashboard |

---

## 🔧 Troubleshooting

### Issue: Build fails on Vercel

**Solution:**
1. Check the build logs in Vercel dashboard
2. Verify `package.json` has all dependencies
3. Make sure environment variables are set
4. Try deploying again (sometimes transient issues)

### Issue: "Cannot connect to Supabase"

**Solution:**
1. Verify environment variables are correct
2. Check Supabase project is not paused
3. Test edge function: https://vgttzxgulpgxoysogpfs.supabase.co/functions/v1/make-server-5e752b5e/health
4. Check CORS settings in Supabase

### Issue: Login doesn't work

**Solution:**
1. Verify user exists in Supabase Auth Users
2. Check email_confirmed_at is set
3. Verify password is correct
4. See `/AUTH_SETUP.md` for detailed auth troubleshooting

### Issue: Public reports show 404

**Solution:**
1. Verify DNS is properly configured
2. Check vercel.json has the rewrites configuration
3. Make sure prospect exists with that slug in database
4. Visit `/debug` page to see all available reports

### Issue: Domain not working

**Solution:**
1. Verify CNAME record is correct in GoDaddy DNS
2. Wait up to 48 hours for DNS propagation
3. Check domain status in Vercel (should show "Valid")
4. Try clearing browser cache or using incognito mode

### Issue: "Table does not exist" errors

**Solution:**
1. Run all SQL migrations in order (Phase 1)
2. Verify tables exist in Supabase Table Editor
3. Check RLS policies are enabled
4. Make sure edge function is deployed

---

## 📊 Post-Deployment Monitoring

### Weekly Tasks:
- [ ] Check Vercel Analytics for traffic
- [ ] Review Supabase logs for errors
- [ ] Backup database (Supabase auto-backups daily)
- [ ] Review audit completion rate

### Monthly Tasks:
- [ ] Update dependencies (`npm outdated`)
- [ ] Review and optimize database queries
- [ ] Check SSL certificate status (auto-renews)
- [ ] Gather team feedback for improvements

---

## 🎉 You're Done!

Your Yak Media Lead Prospecting system is now:
- ✅ Deployed to Vercel
- ✅ Accessible at success.yak.media
- ✅ Connected to Supabase database
- ✅ Protected with authentication
- ✅ Ready for your team to use

**Next Steps:**
1. Read `/HOW_TO_CREATE_FIRST_REPORT.md` for audit workflow
2. Share login credentials with your team
3. Start prospecting and generating reports!
4. Review `/USER_MANAGEMENT_GUIDE.md` for managing team access

---

**Need Help?**
- Check `/TROUBLESHOOTING.md`
- Review Supabase docs: https://supabase.com/docs
- Review Vercel docs: https://vercel.com/docs
- Check the `/setup` page in your app for system health
