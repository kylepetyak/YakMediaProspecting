# Simple Deployment Guide

## ⚠️ CRITICAL: About the _redirects File

**DO NOT EDIT `/public/_redirects` IN FIGMA MAKE!**

When you edit it here, it gets turned into a directory with `.tsx` files inside, which breaks routing.

The file should contain exactly ONE line:
```
/* /index.html 200
```

## Option 1: Netlify (Recommended - 5 Minutes)

### Step 1: Build Your App
```bash
npm run build
```

### Step 2: Deploy to Netlify
1. Go to https://netlify.com and sign up (free)
2. Click "Add new site" → "Deploy manually"
3. Drag your `dist` folder to the upload area
4. Wait for deployment (1-2 minutes)

### Step 3: Add Your Custom Domain
1. In Netlify, go to Site settings → Domain management
2. Click "Add custom domain"
3. Enter: `success.yak.media`
4. Netlify will give you DNS records

### Step 4: Update GoDaddy DNS
1. Go to GoDaddy DNS settings for `yak.media`
2. Add a CNAME record:
   - **Name:** `success`
   - **Value:** `your-site.netlify.app`
   - **TTL:** 600 seconds
3. Save and wait 5-30 minutes for DNS propagation

### Done! ✅
- Your app will be live at `success.yak.media`
- Clean URLs will work: `success.yak.media/companyname`
- Netlify will automatically use your `_redirects` file

---

## Option 2: Vercel (Alternative)

### Step 1: Build Your App
```bash
npm run build
```

### Step 2: Deploy to Vercel
1. Go to https://vercel.com and sign up (free)
2. Click "Add New" → "Project"
3. Import your GitHub repo OR upload manually
4. Configure:
   - Build command: `npm run build`
   - Output directory: `dist`
5. Deploy

### Step 3: Create vercel.json (Do this in your code editor, NOT Figma Make)
Create a file called `vercel.json` in your project root:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Step 4: Add Custom Domain
1. In Vercel, go to Settings → Domains
2. Add `success.yak.media`
3. Follow DNS instructions (similar to Netlify)

---

## Option 3: Testing Locally (No Hosting)

If you just want to test locally without deploying:

1. Keep using HashRouter (with `#` in URLs)
2. Edit `/App.tsx` and change line 1:
   ```tsx
   import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
   ```
3. And change line 15:
   ```tsx
   <HashRouter>
   ```
4. URLs will be `localhost:5173/#/companyname` instead of `localhost:5173/companyname`

**Note:** This defeats the purpose of clean URLs, so only do this for local testing.

---

## What You Need Before Deploying

✅ Database migration run in Supabase (see `DATABASE_SETUP.sql`)  
✅ Supabase environment variables configured  
✅ First admin account created via `/initial-setup`  
✅ Custom domain configured in GoDaddy DNS  

## After Deployment

1. Visit `success.yak.media/initial-setup` to create your admin account
2. Login at `success.yak.media/login`
3. Create your first prospect in the dashboard
4. Share the public URL: `success.yak.media/their-company-slug`

---

## Troubleshooting

**Clean URLs don't work:**
- Make sure you deployed to Netlify/Vercel (not just running locally)
- Check that `_redirects` file exists and isn't a directory
- Clear browser cache

**404 on public report:**
- The company slug doesn't exist yet - create it in your dashboard first
- Check spelling of the slug

**Can't login:**
- Make sure you ran the database migration
- Check that you created a user via `/initial-setup` or `/create-user`
