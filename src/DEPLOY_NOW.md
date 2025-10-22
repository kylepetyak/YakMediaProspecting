# 🚀 DEPLOY NOW - Quick Reference

**Time to deploy: ~30 minutes**  
**Difficulty: Easy (just follow the steps)**

---

## 📋 What You Need

Before you start, have these ready:

- [ ] GitHub account
- [ ] Vercel account (sign up with GitHub)
- [ ] Supabase project URL: `https://vgttzxgulpgxoysogpfs.supabase.co`
- [ ] Access to GoDaddy DNS for yak.media domain
- [ ] 30 minutes of uninterrupted time

---

## ⚡ 5-Step Quick Deploy

### Step 1: Database (5 minutes)

1. Open: https://supabase.com/dashboard/project/vgttzxgulpgxoysogpfs/sql
2. Click "New Query"
3. Copy entire content from `/DATABASE_COMPLETE_SETUP.sql`
4. Paste and click "Run"
5. Verify: You should see ✅ success messages

**Done when:** You see "Setup Complete!" message

---

### Step 2: Edge Functions (5 minutes)

Open terminal and run:

```bash
# Install Supabase CLI (if not installed)
brew install supabase/tap/supabase

# Login
supabase login

# Link project
supabase link --project-ref vgttzxgulpgxoysogpfs

# Deploy
supabase functions deploy make-server-5e752b5e
```

**Test it works:**
Visit: https://vgttzxgulpgxoysogpfs.supabase.co/functions/v1/make-server-5e752b5e/health

Should show: `{"status":"ok"}`

**Done when:** Health check returns OK

---

### Step 3: GitHub Push (5 minutes)

```bash
# Make sure you're in project directory
cd /path/to/yak-media-prospecting

# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Deploy Yak Media Lead Prospecting System"

# Create repo on GitHub first, then:
git remote add origin https://github.com/YOUR-USERNAME/yak-media-prospecting.git
git branch -M main
git push -u origin main
```

**Done when:** Code is visible on GitHub

---

### Step 4: Vercel Deploy (10 minutes)

1. Go to: https://vercel.com
2. Click "Add New Project"
3. Select your GitHub repo
4. **Before clicking Deploy:**
   - Framework: Vite ✅
   - Build Command: `npm run build` ✅
   - Output Directory: `dist` ✅
5. Click "Environment Variables"
6. Add these TWO variables:

```
Name: VITE_SUPABASE_PROJECT_ID
Value: vgttzxgulpgxoysogpfs
```

```
Name: VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZndHR6eGd1bHBneG95c29ncGZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NTA5MzcsImV4cCI6MjA3NjAyNjkzN30.tmvqX0uMaPpWpbUhUkSKXRlkB4KqDkRl9wBZg_a53dA
```

7. Click "Deploy"
8. Wait 2-3 minutes for build

**Done when:** Build succeeds and you get a `.vercel.app` URL

---

### Step 5: Custom Domain (5 minutes)

1. In Vercel project → Settings → Domains
2. Click "Add Domain"
3. Enter: `success.yak.media`
4. Vercel shows DNS instructions

**Now go to GoDaddy:**

1. Open: https://dcc.godaddy.com/domains/yak.media/dns
2. Click "Add" new record
3. Create CNAME:
   - Type: CNAME
   - Name: success
   - Value: cname.vercel-dns.com
   - TTL: 1 Hour
4. Save

**Wait 5-15 minutes for DNS to propagate**

**Done when:** `https://success.yak.media` loads (shows login page)

---

## ✅ Verify Everything Works

### Test Checklist

Visit each URL and check:

- [ ] https://success.yak.media → Loads without errors
- [ ] https://success.yak.media/#/login → Shows login page
- [ ] https://vgttzxgulpgxoysogpfs.supabase.co/functions/v1/make-server-5e752b5e/health → Returns `{"status":"ok"}`

**All working?** Move to next step 👇

---

## 👤 Create First User

You need at least one user to login.

### Option A: Via Supabase Dashboard (Easiest)

1. Go to: https://supabase.com/dashboard/project/vgttzxgulpgxoysogpfs/auth/users
2. Click "Add user" → "Create new user"
3. Enter:
   - Email: your-email@example.com
   - Password: (make it strong!)
   - **Auto Confirm User: ✅ CHECK THIS BOX**
4. Click "Create user"

### Option B: Via SQL

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

---

## 🎉 Test End-to-End

### 1. Login
- Visit: https://success.yak.media/#/login
- Enter your email and password
- Should redirect to HomePage

### 2. Create First Prospect
- Go to Dashboard: https://success.yak.media/#/dashboard
- Click "Add New Prospect"
- Fill in: Test Chiropractic, Dr. Test, Phoenix, etc.
- Click "Create Prospect"

### 3. Complete Audit
- Click "Open Audit" on your test prospect
- Fill all 10 categories (pass/warning/fail)
- Add notes for each
- Click "Save & Publish Report"

### 4. View Public Report
- Click the URL in the success toast
- Should open: https://success.yak.media/#/testchiropractic
- See your complete audit report

**✅ If all 4 steps work, YOU'RE DONE!**

---

## 🎯 Next Steps

Now that it's deployed:

1. **Create more users** for your team
   - Go to: https://success.yak.media/#/create-user
   - Enter team member details

2. **Share login credentials** securely
   - Use 1Password, LastPass, or similar
   - Include: https://success.yak.media/#/login

3. **Review the User Guide**
   - Share `/USER_ACCESS_GUIDE.md` with team
   - Review audit workflow in `/HOW_TO_CREATE_FIRST_REPORT.md`

4. **Start prospecting!**
   - Goal: 5-10 audits per day per team member
   - System: Ongoing prospecting across all industries
   - Mission: Build a continuous pipeline of qualified leads

---

## 🆘 Something Broken?

### Quick Fixes

**Build failed in Vercel**
- Check build logs in Vercel dashboard
- Verify environment variables are set
- Try deploying again

**Can't login**
- Verify user exists in Supabase Auth
- Check email is confirmed (`email_confirmed_at` is set)
- See `/AUTH_SETUP.md`

**Reports show 404**
- Verify prospect exists in database
- Check slug matches URL
- Visit `/debug` page to see all reports

**Need more help?**
- Full troubleshooting: `/DEPLOYMENT_CHECKLIST.md#-troubleshooting`
- Setup verification: Visit https://success.yak.media/#/setup

---

## 📚 Documentation

- **Full Deployment:** `/DEPLOYMENT_CHECKLIST.md`
- **Pre-Push Check:** `/PRE_PUSH_CHECKLIST.md`
- **User Guide:** `/USER_ACCESS_GUIDE.md`
- **How to Audit:** `/HOW_TO_CREATE_FIRST_REPORT.md`
- **README:** `/README.md`

---

## 🎊 Congratulations!

Your Yak Media Lead Prospecting System is now:

✅ **Live** at success.yak.media  
✅ **Secure** with authentication  
✅ **Backed by** Supabase database  
✅ **Ready** for your team to use  

**Time to start prospecting and signing clients!** 🚀

---

**Deployed:** _______ (date)  
**Deployed by:** _______  
**Team size:** _______  
**Daily goal:** 5-10 audits per team member  
**System type:** Ongoing prospecting tool for all industries
