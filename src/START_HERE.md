# 🚀 START HERE - Deploy in 30 Minutes

**You're about to deploy the Yak Media Lead Prospecting System!**

This guide will get you from code → production in **30 minutes**.

---

## 📋 What You'll Do

1. **Push to GitHub** (5 min)
2. **Setup Supabase Database** (5 min)
3. **Deploy Edge Functions** (5 min)
4. **Connect Vercel** (10 min)
5. **Configure Domain** (5 min)

**Total:** ~30 minutes

---

## ✅ Prerequisites Check

Before starting, ensure you have:

- [ ] GitHub account
- [ ] Vercel account (free - sign up at vercel.com)
- [ ] Supabase credentials (you already have project ID: vgttzxgulpgxoysogpfs)
- [ ] GoDaddy DNS access for yak.media

**All set?** Let's go! 👇

---

## 🚀 Step 1: Push to GitHub (5 min)

### Initialize and Commit

```bash
# In your project directory
git init
git add .
git commit -m "Deploy Yak Media Lead Prospecting System"
```

### Create GitHub Repository

1. Go to https://github.com/new
2. Name: `yak-media-prospecting`
3. Visibility: **Private** (recommended)
4. **Don't** initialize with README (you already have one)
5. Click "Create repository"

### Push Your Code

```bash
# Add GitHub as remote (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/yak-media-prospecting.git
git branch -M main
git push -u origin main
```

**✅ Verify:** Refresh GitHub - your files should be visible

---

## 🗄️ Step 2: Setup Supabase Database (5 min)

### Run Database Setup

1. Open: https://supabase.com/dashboard/project/vgttzxgulpgxoysogpfs/sql
2. Click "New Query"
3. Copy entire content of `/DATABASE_COMPLETE_SETUP.sql` from your project
4. Paste and click **"Run"**

**✅ Verify:** You should see success messages and "Setup Complete!"

This creates:
- ✅ `prospects` table
- ✅ `audits` table  
- ✅ `assets` table
- ✅ Custom score fields
- ✅ Potential impact fields
- ✅ Row Level Security policies

---

## 🔧 Step 3: Deploy Edge Functions (5 min)

### Install Supabase CLI (if needed)

**macOS:**
```bash
brew install supabase/tap/supabase
```

**Windows:**
```bash
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

### Deploy the Backend

```bash
# Login to Supabase
supabase login

# Link your project
supabase link --project-ref vgttzxgulpgxoysogpfs

# Deploy edge function
supabase functions deploy make-server-5e752b5e
```

**✅ Verify:** 
Visit https://vgttzxgulpgxoysogpfs.supabase.co/functions/v1/make-server-5e752b5e/health

Should return: `{"status":"ok"}`

---

## 🌐 Step 4: Deploy to Vercel (10 min)

### Connect GitHub to Vercel

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "Add New Project"
4. Select `yak-media-prospecting` repository
5. Click "Import"

### Configure Build Settings

Vercel should auto-detect:
- ✅ Framework: Vite
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `dist`

### Add Environment Variables

**CRITICAL STEP:** Before deploying, add these variables:

Click "Environment Variables" and add:

**Variable 1:**
```
Name: VITE_SUPABASE_PROJECT_ID
Value: vgttzxgulpgxoysogpfs
Environment: Production, Preview, Development (check all)
```

**Variable 2:**
```
Name: VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZndHR6eGd1bHBneG95c29ncGZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NTA5MzcsImV4cCI6MjA3NjAyNjkzN30.tmvqX0uMaPpWpbUhUkSKXRlkB4KqDkRl9wBZg_a53dA
Environment: Production, Preview, Development (check all)
```

### Deploy!

Click **"Deploy"**

Wait 2-3 minutes. You'll get a URL like: `yak-media-prospecting.vercel.app`

**✅ Verify:** Click the URL - should show your app (login page)

---

## 🌍 Step 5: Configure Custom Domain (5 min)

### Add Domain in Vercel

1. In Vercel project → Settings → Domains
2. Click "Add Domain"  
3. Enter: `success.yak.media`
4. Click "Add"

### Update DNS in GoDaddy

1. Go to: https://dcc.godaddy.com/domains/yak.media/dns
2. Click "Add" to create new record
3. Add CNAME:
   ```
   Type: CNAME
   Name: success
   Value: cname.vercel-dns.com
   TTL: 1 Hour
   ```
4. Click "Save"

### Wait for Propagation

**Usually:** 5-15 minutes  
**Can take:** Up to 48 hours

Check status in Vercel - will change from "Pending" to "Valid"

**✅ Verify:** Visit https://success.yak.media (will work once DNS propagates)

---

## 👤 Create Your First User

### Via Supabase Dashboard (Easiest)

1. Go to: https://supabase.com/dashboard/project/vgttzxgulpgxoysogpfs/auth/users
2. Click "Add user" → "Create new user"
3. Enter your email and password
4. **IMPORTANT:** Check "Auto Confirm User" ✅
5. Click "Create user"

---

## 🎉 Test Everything!

### 1. Login
Visit: https://success.yak.media/#/login  
Use your credentials from above

### 2. Create First Prospect
- Go to Dashboard
- Click "Add New Prospect"
- Fill in: Test Chiropractic, Dr. Test, Phoenix, etc.
- Save

### 3. Complete Audit
- Click "Open Audit"
- Fill all 10 categories
- Add notes
- Click "Save & Publish Report"

### 4. View Public Report
Click the URL in the success toast  
Should open: https://success.yak.media/#/testchiropractic

**✅ If all 4 steps work, YOU'RE LIVE!** 🎊

---

## 🎯 Next Steps for Your Team

### Add Team Members

1. Login as admin
2. Go to: https://success.yak.media/#/create-user
3. Enter team member details
4. Share credentials securely

### Start Prospecting!

**Daily Goal:** 5-10 audits per team member  
**System Type:** Ongoing prospecting across all industries  
**Mission:** Build continuous pipeline of qualified leads

**Team Resources:**
- User Guide: `/USER_ACCESS_GUIDE.md`
- Audit How-To: `/HOW_TO_CREATE_FIRST_REPORT.md`
- Adjust Impact Numbers: `/HOW_TO_ADJUST_POTENTIAL_IMPACT.md`

---

## 🔧 Admin Tools

Your app includes helpful admin pages:

- **/quick-start** - Quick start guide and setup instructions
- **/guide** - Audit methodology reference
- **/manage-users** - User management
- **/create-user** - Add new team members

---

## 🆘 Something Wrong?

### Common Issues

**Build failed?**
- Check environment variables are set correctly
- Review build logs in Vercel dashboard

**Can't login?**
- Verify user exists in Supabase Auth
- Check "Auto Confirm User" was enabled
- See `/AUTH_SETUP.md`

**Reports show 404?**
- Verify prospect exists with that slug
- Check DNS propagated
- Check the dashboard to see all your prospects and reports

**More help?**
- Full guide: `/DEPLOYMENT_CHECKLIST.md`
- Pre-push check: `/PRE_PUSH_CHECKLIST.md`
- Auth help: `/AUTH_SETUP.md`

---

## 📊 Success Metrics

Track your progress:

- [ ] App deployed at success.yak.media
- [ ] Team members can login
- [ ] First prospect created
- [ ] First audit completed
- [ ] First public report live
- [ ] Team trained on workflow

**Goals:**
- 📅 5-10 audits/day per team member
- 📊 Ongoing prospecting system
- 🎯 Continuous client acquisition pipeline

---

## 🎊 You Did It!

Your Yak Media Lead Prospecting System is:

✅ **Live** at success.yak.media  
✅ **Secure** with authentication  
✅ **Connected** to Supabase  
✅ **Ready** for your team

**Now go sign those 25 clients!** 💪

---

**Deployed:** ________ (date)  
**Team size:** ________  
**First audit:** ________  
**First client signed:** ________
