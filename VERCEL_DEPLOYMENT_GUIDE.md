# Vercel Deployment Guide for YakMedia Prospecting Tool

## What Was Fixed

Your Figma Make-generated code had several critical issues preventing deployment:

### Issues Resolved ✅
1. **Invalid Import Syntax** - Imports had version numbers (e.g., `import { Toaster } from "sonner@2.0.3"`)
2. **Missing TypeScript Config** - No `tsconfig.json` file
3. **Overly Complex Vite Config** - Unnecessary version aliases
4. **JSR Registry Issue** - Using JSR packages instead of npm
5. **No .gitignore** - Would have committed node_modules
6. **Missing Vercel Config** - Needed for React Router SPA support

All of these have been fixed and the build now works successfully!

---

## Prerequisites

Before deploying, ensure you have:
- [ ] A GitHub account
- [ ] A Vercel account (free tier is fine - sign up at vercel.com)
- [ ] Access to your Supabase project (already configured in the code)

---

## Step 1: Merge Your Branch

The fixes are currently on branch `claude/fix-typo-011CUPaZRALEYhFhpY32g3To`.

**Option A: Merge to Main via GitHub**
1. Go to: https://github.com/kylepetyak/YakMediaProspecting
2. You'll see a prompt to create a Pull Request
3. Click "Compare & pull request"
4. Review the changes and click "Create pull request"
5. Click "Merge pull request" then "Confirm merge"

**Option B: Merge Locally**
```bash
git checkout main
git merge claude/fix-typo-011CUPaZRALEYhFhpY32g3To
git push origin main
```

---

## Step 2: Deploy to Vercel

### First-Time Setup

1. **Go to Vercel**: https://vercel.com/new

2. **Import Your Repository**
   - Click "Import Project"
   - Select "Import Git Repository"
   - Choose `kylepetyak/YakMediaProspecting`
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Vite (should auto-detect)
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `npm run build` (should auto-fill)
   - **Output Directory**: `dist` (should auto-fill)
   - **Install Command**: `npm install` (should auto-fill)

4. **Environment Variables** (if needed in future)
   - Currently, Supabase credentials are in the code
   - For production, you may want to add:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
   - Leave blank for now

5. **Click "Deploy"**
   - Vercel will build your project
   - This takes 1-3 minutes
   - You'll get a live URL like: `your-project.vercel.app`

---

## Step 3: Verify Deployment

Once deployed, test these pages:

1. **Login Page**: `https://your-project.vercel.app/login`
2. **Sample Report**: `https://your-project.vercel.app/sample-report`
3. **Home/Dashboard** (requires login): `https://your-project.vercel.app/`

---

## Step 4: Set Up Your Team

### Create Your First Admin User

You'll need to create users in Supabase directly (since the create-user page requires authentication):

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/vgttzxgulpgxoysogpfs
2. Click "Authentication" → "Users"
3. Click "Add User" → "Create New User"
4. Enter email and password
5. Click "Create User"

### Share with Your Team

Once deployed, share these URLs with your team:
- **App URL**: `https://your-project.vercel.app`
- **Login Page**: `https://your-project.vercel.app/login`
- **Guide**: `https://your-project.vercel.app/guide` (after login)

---

## Automatic Deployments

Vercel automatically redeploys when you push to your main branch:

1. Make changes to your code
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your update message"
   git push origin main
   ```
3. Vercel automatically builds and deploys (1-3 mins)
4. Check deployment status at: https://vercel.com/dashboard

---

## Custom Domain (Optional)

To use your own domain (e.g., `prospecting.yakmedia.com`):

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain
3. Update your DNS records as instructed
4. Wait for SSL certificate (automatic, takes 5-10 mins)

---

## Troubleshooting

### Build Fails on Vercel

**Check the build logs** in Vercel dashboard. Common issues:
- Environment variables not set
- TypeScript errors (shouldn't happen after our fixes)

### Pages Show 404 Error

Make sure `vercel.json` exists with SPA routing config (already added):
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

### Can't Log In

1. Check Supabase is running: https://supabase.com/dashboard
2. Verify user exists in Authentication → Users
3. Check browser console for errors
4. Ensure Supabase credentials in `src/utils/supabase/info.tsx` are correct

---

## Next Steps

### Security Improvements (Recommended)

1. **Move Supabase credentials to environment variables**:
   ```bash
   # In Vercel Dashboard → Settings → Environment Variables
   VITE_SUPABASE_URL=https://vgttzxgulpgxoysogpfs.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

2. **Update `src/utils/supabase/info.tsx`**:
   ```typescript
   export const projectId = import.meta.env.VITE_SUPABASE_URL?.split('//')[1]?.split('.')[0] || "vgttzxgulpgxoysogpfs"
   export const publicAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "your_current_key"
   ```

### Performance Optimization

The build showed a warning about large bundle size. To optimize:

1. **Code splitting** - Use React.lazy() for page components
2. **Manual chunks** - Configure Vite to split vendor code
3. **Image optimization** - Compress screenshots/images

This is not urgent but will improve load times.

---

## Summary

✅ All build errors fixed
✅ Code committed to GitHub
✅ Ready for Vercel deployment
✅ Supabase already configured

**You're ready to deploy!** Follow Steps 1-4 above to get your prospecting tool live for your team.

Questions? Check the Vercel docs: https://vercel.com/docs
