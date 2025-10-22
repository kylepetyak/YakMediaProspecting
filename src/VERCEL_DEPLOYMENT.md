# Vercel Deployment Guide

## The Problem You're Seeing

```
Error: No Output Directory named "dist" found after the Build completed.
```

This means the build failed BEFORE creating the `dist` folder.

---

## Root Causes

### 1. The `_redirects` File is Still a Directory

In your GitHub repo, `public/_redirects` is still a **directory** with `.tsx` files instead of a plain text file.

**This must be fixed in your local repo** - it cannot be fixed in Figma Make.

### 2. Missing or Incorrect Build Configuration

Vercel might not be detecting the correct build settings.

---

## Fix It Step-by-Step

### Step 1: Fix `_redirects` in Your Local Repo

**You MUST do this on your computer, not in Figma Make.**

Open terminal in your project folder:

```bash
# Navigate to public directory
cd public

# Delete the bad directory
rm -rf _redirects

# For Vercel, you actually don't need _redirects
# (vercel.json handles routing instead)
# So just leave it deleted

# Go back to project root
cd ..
```

---

### Step 2: Verify Your `package.json` Exists

Check if you have a `package.json` file in your project root:

```bash
ls -la package.json
```

**If it doesn't exist**, create it:

```json
{
  "name": "yak-media-prospecting",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.22.0",
    "@supabase/supabase-js": "^2.39.3",
    "recharts": "^2.12.0",
    "lucide-react": "^0.344.0",
    "sonner": "^1.4.0",
    "motion": "^11.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.55",
    "@types/react-dom": "^18.2.19",
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.1.0",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.3.3"
  }
}
```

---

### Step 3: Verify Your `vite.config.ts` Exists

Check if you have `vite.config.ts`:

```bash
ls -la vite.config.ts
```

**If it doesn't exist**, create it:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
})
```

---

### Step 4: Add `vercel.json` (Already Created)

I've created a `vercel.json` file for you in Figma Make. Download it with your code.

It contains:
```json
{
  "buildCommand": "npm install && npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This tells Vercel:
- How to build your app
- Where to find the built files
- How to handle routing (for clean URLs)

---

### Step 5: Commit and Push

```bash
# Remove the bad _redirects directory (if you haven't already)
git rm -rf public/_redirects

# Add vercel.json
git add vercel.json

# Commit
git commit -m "Add Vercel config and remove broken _redirects"

# Push
git push
```

---

### Step 6: Configure Vercel

1. **Go to [vercel.com](https://vercel.com)** and sign in
2. **Import your GitHub repository**
3. **Vercel should auto-detect** the settings from `vercel.json`
4. **Add environment variables**:
   - `VITE_SUPABASE_URL` = your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key

5. **Deploy!**

---

### Step 7: Add Custom Domain

1. In Vercel dashboard, go to **Settings** → **Domains**
2. Add `success.yak.media`
3. Vercel will give you DNS records
4. Add them to GoDaddy:
   ```
   Type: CNAME
   Name: success
   Value: cname.vercel-dns.com
   ```
5. Wait 5-30 minutes for DNS propagation

---

## Vercel vs Netlify

Both work the same way, but configuration is different:

| Feature | Netlify | Vercel |
|---------|---------|--------|
| Routing config | `public/_redirects` file | `vercel.json` file |
| Auto-detection | Good | Better |
| Environment vars | Site settings | Project settings |
| Custom domains | Easy | Easy |

**For this project, Vercel is actually easier** because `vercel.json` handles routing configuration and is a proper JSON file (not a plain text file that Figma Make doesn't support).

---

## Common Vercel Errors

### Error: "No Output Directory named 'dist' found"

**Causes:**
- Build failed before creating `dist`
- Wrong build command
- Missing dependencies

**Solutions:**
1. Check the **full build logs** in Vercel (scroll to the top)
2. Look for the FIRST error (usually about missing packages)
3. Make sure `package.json` has all dependencies
4. Make sure `vite.config.ts` exists

---

### Error: "Module not found"

**Causes:**
- Missing package in `package.json`
- Wrong import path

**Solutions:**
1. Add the missing package to `package.json`
2. Run `npm install` locally to test
3. Push `package-lock.json` to GitHub

---

### Error: "Routes return 404"

**Causes:**
- `vercel.json` rewrites not working
- Missing `vercel.json`

**Solutions:**
1. Make sure `vercel.json` exists in project root
2. Make sure it has the `rewrites` configuration
3. Redeploy after adding `vercel.json`

---

## Debugging Your Build

### View Full Build Logs

1. Go to Vercel dashboard
2. Click on your deployment
3. Click **Build Logs**
4. **Scroll to the top** to see the first error

### Common Build Log Errors

```bash
# Missing package.json
Error: Cannot find package.json
→ Create package.json in project root

# Missing vite
Error: Cannot find module 'vite'
→ Add vite to devDependencies in package.json

# Build command failed
Error: vite build failed
→ Check for syntax errors in your code
→ Look at the specific error message above this

# Missing environment variable
Warning: VITE_SUPABASE_URL is undefined
→ Add environment variables in Vercel project settings
```

---

## Test Locally First

Before deploying, test the build locally:

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Check if dist folder was created
ls -la dist/

# Preview the built app
npm run preview
```

If this works locally, it should work on Vercel.

---

## Your Build Checklist

Before deploying to Vercel, verify:

- [ ] `public/_redirects` is deleted (not needed for Vercel)
- [ ] `vercel.json` exists in project root
- [ ] `package.json` exists with correct dependencies
- [ ] `vite.config.ts` exists
- [ ] Local build succeeds (`npm run build`)
- [ ] Environment variables are set in Vercel
- [ ] Code is pushed to GitHub

---

## After Successful Deployment

Once your build succeeds:

1. ✅ Your site is live at `your-project.vercel.app`
2. ✅ Test the routes:
   - `/login` - login page
   - `/dashboard` - dashboard (protected)
   - `/initial-setup` - first user setup
   - `/test-company` - public report (after creating it)
3. ✅ Add custom domain `success.yak.media`
4. ✅ Test custom domain works
5. ✅ Start prospecting!

---

## Need More Help?

If the build still fails:

1. **Copy the FULL build logs** from Vercel (scroll to the very top)
2. Look for the FIRST error message
3. The error at the bottom ("dist not found") is just the result, not the cause

The actual error will be in the middle of the logs, usually showing:
- Missing package
- Syntax error in code
- Missing configuration file
- Wrong import path

---

## Summary

**Vercel is actually BETTER for your project** than Netlify because:
- ✅ No need for plain text `_redirects` file
- ✅ `vercel.json` handles routing (proper JSON file)
- ✅ Better auto-detection
- ✅ Easier configuration

**Steps to success:**
1. Delete `public/_redirects` directory in your local repo
2. Make sure `package.json` and `vite.config.ts` exist
3. Make sure `vercel.json` exists (I created it for you)
4. Push to GitHub
5. Deploy to Vercel
6. Add environment variables
7. Done!
