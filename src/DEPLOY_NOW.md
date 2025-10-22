# Deploy Your App Now (5 Minutes)

## You Have 2 Choices

### Option A: Netlify (Recommended)
**Best for: Most people. Free. Easy. Fast.**

### Option B: Keep Testing in Figma Make
**Best for: Not ready to deploy yet. Just testing.**

---

## Option A: Deploy to Netlify

### Step 1: Get Your Code Out of Figma Make

**Method 1: GitHub (Recommended)**
1. Click "Export" in Figma Make
2. Connect to GitHub
3. Push your code

**Method 2: Download ZIP**
1. Download your code as ZIP
2. Extract it to a folder

---

### Step 2: Deploy to Netlify

#### If You Used GitHub:
1. Go to [netlify.com](https://netlify.com)
2. Sign up (free)
3. Click "Add new site" → "Import an existing project"
4. Connect GitHub
5. Select your repository
6. Use these settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
7. Click "Deploy site"
8. Wait 2-3 minutes

#### If You Downloaded ZIP:
1. Open terminal/command prompt in your extracted folder
2. Run:
   ```bash
   npm install
   npm run build
   ```
3. Go to [netlify.com](https://netlify.com) and sign up
4. Click "Add new site" → "Deploy manually"
5. Drag the `dist` folder to the upload area
6. Wait 2-3 minutes

---

### Step 3: Add Your Custom Domain

1. In Netlify, go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter: `success.yak.media`
4. Netlify will show you DNS records
5. Go to **GoDaddy** (your domain registrar)
6. Add a **CNAME record**:
   ```
   Type: CNAME
   Name: success
   Value: your-site-name.netlify.app
   TTL: 600
   ```
7. Save and wait 5-30 minutes for DNS to propagate

---

### Step 4: Test Your Site

1. Visit `https://success.yak.media/initial-setup`
2. Create your first admin account
3. Login at `https://success.yak.media/login`
4. Create a prospect in the dashboard
5. Share `https://success.yak.media/company-name` with them

**Done! Your app is live!** ✅

---

## Option B: Keep Testing in Figma Make

If you're not ready to deploy yet:

1. **Use the preview** in Figma Make
2. Clean URLs won't work (`/#/company` instead of `/company`)
3. Share preview links for testing
4. Deploy to Netlify when ready

---

## ⚠️ IMPORTANT: Stop Editing `_redirects`

**DO NOT edit `/public/_redirects` in Figma Make ever again.**

It keeps turning into a directory with `.tsx` files which breaks routing.

The file is already correct:
```
/* /index.html 200
```

Leave it alone. I've fixed it (again). Don't touch it.

---

## Troubleshooting

### "My site shows a blank page"
- Check browser console for errors
- Make sure you ran `npm install` before `npm run build`
- Make sure you deployed the `dist` folder, not the source code

### "Clean URLs don't work (getting 404s)"
- Make sure `_redirects` file exists in the `dist/` folder
- Check Netlify build logs
- Clear browser cache

### "Can't login"
- Make sure you set up Supabase (see `DATABASE_SETUP.sql`)
- Check your environment variables in Netlify
- Go to `/initial-setup` first to create admin account

### "Public reports show 404"
- The prospect doesn't exist in your database yet
- Create the prospect in your dashboard first
- Check the slug matches the URL

---

## Need Help?

Read the detailed guides:
- `/WHERE_IS_DIST_FOLDER.md` - Explains the build process
- `/SIMPLE_DEPLOYMENT.md` - Step-by-step Netlify guide
- `/DATABASE_SETUP.sql` - Database setup instructions

---

## Summary

1. ✅ Your code is ready
2. ✅ The `_redirects` file is fixed (don't touch it)
3. ✅ Just deploy to Netlify
4. ✅ Add your custom domain
5. ✅ Go live!

**5 minutes. That's it. You've got this!** 🚀
