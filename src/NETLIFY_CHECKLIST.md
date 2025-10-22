# Netlify Deployment Checklist

Use this to make sure your Netlify deployment succeeds.

---

## Before Deployment

### 1. ✅ Fix the `_redirects` File

**Check your local repo:**
```bash
ls -la public/
```

You should see:
```
_redirects  (file)
```

NOT:
```
_redirects/ (directory)
```

**If it's a directory, fix it:**
```bash
cd public
rm -rf _redirects
echo "/* /index.html 200" > _redirects
```

---

### 2. ✅ Set Up Environment Variables in Netlify

Your app needs these to work:

| Variable | Where to Find It |
|----------|------------------|
| `VITE_SUPABASE_URL` | Your Supabase project dashboard |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase project dashboard |

**How to add them in Netlify:**
1. Go to Netlify dashboard
2. Click your site
3. Go to **Site settings** → **Environment variables**
4. Click **Add a variable**
5. Add both variables above
6. Save
7. **Trigger a new deploy** (Netlify → Deploys → Trigger deploy → Clear cache and deploy)

---

### 3. ✅ Verify Build Settings

In Netlify, check **Site settings** → **Build & deploy**:

| Setting | Value |
|---------|-------|
| Base directory | (leave empty) |
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node version | 18 or higher |

---

## During Deployment

### Watch the Build Log

1. Go to Netlify dashboard
2. Click **Deploys**
3. Click the running deployment
4. Watch the build log

**Look for:**
- ✅ `npm install` succeeds
- ✅ `npm run build` succeeds
- ✅ No errors about missing files
- ✅ "Site is live" message

**Common errors:**

| Error | Solution |
|-------|----------|
| Module not found | Run `npm install` locally, commit package-lock.json |
| Build failed | Check build log for specific error |
| _redirects not found | You didn't push the fixed _redirects file |

---

## After Deployment

### 1. ✅ Test Your Routes

Try these URLs (replace with your actual domain):

| URL | Expected Result |
|-----|-----------------|
| `https://your-site.netlify.app/` | Redirects to `/dashboard` or `/login` |
| `https://your-site.netlify.app/login` | Shows login page |
| `https://your-site.netlify.app/initial-setup` | Shows setup page |
| `https://your-site.netlify.app/dashboard` | Login required → shows dashboard |
| `https://your-site.netlify.app/test-company` | Shows "Report not found" (until you create it) |

**If you get 404s:**
- Check browser console for errors
- Verify `_redirects` file exists in your deploy
- Clear browser cache and try again

---

### 2. ✅ Set Up Your Database

Your app won't work until you set up Supabase:

1. **Run the SQL migration:**
   - Go to Supabase dashboard
   - SQL Editor
   - Copy/paste from `/DATABASE_SETUP.sql`
   - Run it

2. **Create your first user:**
   - Go to `https://your-site.netlify.app/initial-setup`
   - Create admin account
   - Login

---

### 3. ✅ Add Your Custom Domain

1. In Netlify: **Site settings** → **Domain management**
2. Click **Add custom domain**
3. Enter: `success.yak.media`
4. Netlify gives you DNS records
5. Add them to GoDaddy:
   - Type: `CNAME`
   - Name: `success`
   - Value: `your-site.netlify.app`
   - TTL: `600`
6. Wait 5-30 minutes for DNS propagation

---

### 4. ✅ Enable HTTPS

Netlify does this automatically, but verify:
1. **Site settings** → **Domain management**
2. Under your custom domain, check **HTTPS**
3. Should show: "✅ Netlify provides free HTTPS"

---

## Verify Everything Works

### Test Checklist:

- [ ] Site loads at `https://your-site.netlify.app`
- [ ] Redirects from `/` to `/dashboard` or `/login` work
- [ ] Login page works
- [ ] Initial setup page works
- [ ] Dashboard loads after login
- [ ] Can create a new prospect
- [ ] Public report shows at `/:slug`
- [ ] Custom domain `success.yak.media` works (after DNS propagation)
- [ ] HTTPS works on custom domain
- [ ] Clean URLs work (no 404 on page refresh)

---

## Common Issues

### "Site shows blank page"
- **Check browser console** for errors
- **Check Netlify build logs** for build errors
- **Verify environment variables** are set

### "404 on all routes"
- **`_redirects` file is broken** - see `/FIX_YOUR_GITHUB_NOW.md`
- **Clear browser cache**
- **Try incognito mode**

### "Can't login / Database error"
- **Environment variables not set** in Netlify
- **Database migration not run** - see `/DATABASE_SETUP.sql`
- **Check browser console** for specific error

### "Clean URLs don't work"
- **`_redirects` file missing or broken**
- **Not deployed to Netlify** (won't work in preview)
- **Clear browser cache**

### "Custom domain doesn't work"
- **DNS not propagated yet** - wait 30 minutes
- **Wrong DNS settings** - check GoDaddy CNAME
- **Try from incognito mode** (might be cached)

---

## Monitoring Your Deployment

### Build Notifications

Set up notifications in Netlify:
1. **Site settings** → **Build & deploy** → **Deploy notifications**
2. Add email or Slack notifications
3. Get notified when builds fail

### Check Deploy Status

```
✅ Published: Your site is live
🔄 Building: Deploy in progress
❌ Failed: Check build logs
```

---

## Redeploying

If you need to redeploy:

### Option 1: Push to GitHub
```bash
git add .
git commit -m "Your changes"
git push
```
Netlify automatically rebuilds.

### Option 2: Manual Trigger
1. Netlify dashboard
2. **Deploys** tab
3. **Trigger deploy** button
4. Choose:
   - **Deploy site**: Normal rebuild
   - **Clear cache and deploy**: Fresh rebuild

---

## Success! 🎉

If all checks pass:
- ✅ Your app is live at `success.yak.media`
- ✅ Clean URLs work
- ✅ Authentication works
- ✅ Database works
- ✅ Public reports work

**Now you can start prospecting!**

Create your first prospect in the dashboard and share their public report URL.
