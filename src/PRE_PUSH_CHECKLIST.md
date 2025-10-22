# ✅ Pre-Push Checklist - Verify Before Committing

Run through this quick checklist before pushing to GitHub.

## Files That MUST Exist

Check that these files are present:

```bash
# Core app files
✅ /App.tsx
✅ /main.tsx  
✅ /index.html
✅ /styles/globals.css

# Build configuration
✅ /package.json
✅ /vite.config.ts
✅ /vercel.json

# Environment
✅ /.env.example
✅ /.gitignore

# Database migrations
✅ /DATABASE_SETUP.sql
✅ /ADD_CUSTOM_SCORES.sql
✅ /ADD_POTENTIAL_IMPACT_FIELDS.sql

# Documentation
✅ /DEPLOYMENT_CHECKLIST.md
✅ /AUTH_SETUP.md
✅ /HOW_TO_CREATE_FIRST_REPORT.md

# Components (sample check)
✅ /components/pages/DashboardPage.tsx
✅ /components/pages/AuditFormPage.tsx
✅ /components/pages/PublicReportPage.tsx
✅ /components/AuthContext.tsx

# Server code
✅ /supabase/functions/server/index.tsx
✅ /supabase/functions/server/database.tsx

# Utils
✅ /utils/supabase/client.tsx
✅ /utils/supabase/info.tsx
```

## Quick File Content Verification

### 1. Check package.json has all dependencies

```bash
grep -q "react-router-dom" package.json && echo "✅ React Router" || echo "❌ Missing React Router"
grep -q "@supabase/supabase-js" package.json && echo "✅ Supabase Client" || echo "❌ Missing Supabase"
grep -q "lucide-react" package.json && echo "✅ Icons" || echo "❌ Missing Icons"
grep -q "recharts" package.json && echo "✅ Charts" || echo "❌ Missing Charts"
grep -q "sonner" package.json && echo "✅ Toasts" || echo "❌ Missing Toasts"
```

### 2. Check App.tsx has HashRouter

```bash
grep -q "HashRouter" App.tsx && echo "✅ Using HashRouter" || echo "❌ Wrong router!"
```

### 3. Check vercel.json exists and has rewrites

```bash
grep -q "rewrites" vercel.json && echo "✅ Vercel config correct" || echo "❌ Missing rewrites"
```

### 4. Verify .gitignore excludes sensitive files

```bash
grep -q "node_modules" .gitignore && echo "✅ Ignoring node_modules" || echo "❌ Add node_modules"
grep -q ".env" .gitignore && echo "✅ Ignoring .env files" || echo "❌ Add .env files"
grep -q "dist" .gitignore && echo "✅ Ignoring build output" || echo "❌ Add dist"
```

## Files That Should NOT Be Committed

Make sure these are NOT in your Git repo:

```bash
❌ /node_modules/          # Dependencies (should be in .gitignore)
❌ /dist/                  # Build output (should be in .gitignore)
❌ /.env                   # Environment secrets (should be in .gitignore)
❌ /.env.local            # Local env (should be in .gitignore)
❌ /.vercel               # Vercel cache (should be in .gitignore)
❌ /.DS_Store             # macOS files (should be in .gitignore)
```

Check what Git is tracking:
```bash
git status
```

If you see any of the above, add them to .gitignore:
```bash
echo "node_modules" >> .gitignore
echo "dist" >> .gitignore
echo ".env" >> .gitignore
```

## Environment Variables Check

⚠️ **CRITICAL:** Never commit real API keys!

### What should be in the repo:
✅ `.env.example` - Template with placeholder values

### What should NOT be in the repo:
❌ `.env` - Real API keys
❌ `.env.local` - Real API keys

### Verify no secrets in code:

```bash
# Check for hardcoded Supabase keys (should only be in utils/supabase/info.tsx with fallbacks)
grep -r "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" --exclude-dir=node_modules --exclude-dir=dist . | grep -v ".tsx:" | grep -v ".md:"

# Should only appear in:
# - utils/supabase/info.tsx (as fallback)
# - Documentation files (.md)
```

## Test Locally Before Pushing

### 1. Install dependencies

```bash
npm install
```

Should complete without errors.

### 2. Try to build

```bash
npm run build
```

Should output: `✓ built in XXXXms`

### 3. Preview the build

```bash
npm run preview
```

Visit http://localhost:4173 and verify:
- ✅ App loads without console errors
- ✅ Login page appears
- ✅ Routes work

## Git Commands to Push

Once everything checks out:

```bash
# Stage all files
git add .

# Check what's being committed
git status

# Make sure no sensitive files are staged!
# If you see .env or node_modules, STOP and fix .gitignore

# Commit with descriptive message
git commit -m "Ready for deployment - complete lead prospecting system"

# Push to GitHub
git push origin main
```

## After Push - Verify on GitHub

1. Go to your GitHub repo
2. Check that these files are visible:
   - ✅ package.json
   - ✅ vercel.json
   - ✅ App.tsx
   - ✅ All component files
   
3. Check that these files are NOT visible:
   - ❌ .env
   - ❌ node_modules/
   - ❌ dist/

## Final Pre-Deploy Check

Before connecting to Vercel:

- [ ] All files committed and pushed
- [ ] No build errors locally
- [ ] .gitignore properly configured
- [ ] .env.example exists (but not .env)
- [ ] Database migrations are in the repo
- [ ] Documentation files are in the repo

## Ready to Deploy?

If all checks pass, proceed to:
📄 `/DEPLOYMENT_CHECKLIST.md`

This will guide you through:
1. Setting up Supabase database
2. Deploying edge functions
3. Connecting GitHub to Vercel
4. Configuring custom domain
5. Creating first user
6. Testing end-to-end

---

**Common Mistakes to Avoid:**
- ❌ Pushing node_modules (always in .gitignore)
- ❌ Committing .env with real secrets
- ❌ Forgetting to run database migrations
- ❌ Not deploying edge functions
- ❌ Skipping environment variables in Vercel
