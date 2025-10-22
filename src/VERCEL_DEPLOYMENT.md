# Vercel Deployment Guide for Yak Media Lead Prospecting

This guide will help you deploy your lead prospecting app to Vercel with custom domain support.

## Prerequisites

1. GitHub account with your code pushed to a repository
2. Vercel account (sign up at vercel.com)
3. Custom domain access (yak.media and success.yak.media)
4. Supabase project set up and running

## Step 1: Push Code to GitHub

```bash
git init
git add .
git commit -m "Initial commit - Yak Media Lead Prospecting System"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/yak-media-prospecting.git
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Option B: Deploy via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

Follow the prompts to link your project.

## Step 3: Configure Environment Variables

In your Vercel project dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add the following variables:

```
VITE_SUPABASE_PROJECT_ID=vgttzxgulpgxoysogpfs
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Get these values from your Supabase project settings:
- Go to https://supabase.com/dashboard/project/vgttzxgulpgxoysogpfs/settings/api
- Copy the "Project URL" (extract the project ID)
- Copy the "anon public" API key

3. Click **Save** for each variable
4. Redeploy your project for changes to take effect

## Step 4: Configure Custom Domains

### Main Domain (yak.media or app.yak.media)

1. In Vercel Dashboard → **Settings** → **Domains**
2. Add your primary domain (e.g., `app.yak.media`)
3. Follow Vercel's DNS instructions:
   - Add a CNAME record: `app` → `cname.vercel-dns.com`
   - Or add A records to your DNS provider

### Success Subdomain (success.yak.media)

1. In the same **Domains** section
2. Click **Add Domain**
3. Enter `success.yak.media`
4. Add DNS records:
   - CNAME: `success` → `cname.vercel-dns.com`

**Important**: Both domains should point to the **same Vercel project**. The app uses JavaScript to detect which subdomain is being accessed and shows the appropriate content.

### DNS Configuration Example

In your DNS provider (e.g., Cloudflare, GoDaddy, Namecheap):

```
Type    Name       Value
----    ----       -----
CNAME   app        cname.vercel-dns.com
CNAME   success    cname.vercel-dns.com
```

## Step 5: Verify Deployment

1. **Main App**: Visit `https://app.yak.media` (or your chosen domain)
   - Should show the HomePage
   - Navigate to `/dashboard`, `/guide`, etc.

2. **Public Reports**: Visit `https://success.yak.media/companyname`
   - Should show the PublicReportPage
   - Test with: `https://success.yak.media/test`

3. **Check Logs**: In Vercel Dashboard → **Deployments** → Click deployment → **Functions** tab
   - Monitor for any errors

## Step 6: Supabase Configuration

Your Supabase edge functions are separate from Vercel. They continue to run on Supabase infrastructure.

1. Ensure your database is set up (run `DATABASE_SETUP.sql`)
2. Deploy your edge functions:

```bash
cd supabase
supabase functions deploy make-server-5e752b5e
```

3. Test the connection:
   - Visit `/setup` on your deployed app
   - It will check the database connection

## Step 7: Set Up CORS (if needed)

If you encounter CORS issues between Vercel and Supabase:

1. Go to Supabase Dashboard → **Settings** → **API**
2. Add your Vercel domains to allowed origins:
   - `https://app.yak.media`
   - `https://success.yak.media`

## Common Issues

### Issue: "Module not found" errors
**Solution**: Ensure all imports use the correct paths. Vite uses `/` as the root.

### Issue: 404 on page refresh
**Solution**: The `vercel.json` rewrites configuration handles this. Make sure it's committed.

### Issue: Environment variables not working
**Solution**: 
- Ensure they're prefixed with `VITE_`
- Redeploy after adding variables
- Check logs in Vercel Dashboard

### Issue: Subdomain not routing correctly
**Solution**: 
- Verify DNS records are pointing to Vercel
- Wait up to 48 hours for DNS propagation
- Check that both domains are added in Vercel Settings

### Issue: Supabase connection fails
**Solution**:
- Verify environment variables are set correctly
- Check Supabase project is not paused
- Test connection from `/setup` page

## Performance Optimization

Your build is already optimized with:
- Code splitting (React, UI libraries, Supabase chunked separately)
- Tree shaking
- Minification
- No sourcemaps in production

## Monitoring

1. **Vercel Analytics**: Enable in Settings → Analytics
2. **Error Tracking**: Check Functions → Runtime Logs
3. **Supabase Logs**: Check Supabase Dashboard → Logs

## Updating the App

After making changes:

```bash
git add .
git commit -m "Your update message"
git push
```

Vercel will automatically deploy the new version.

## Rollback

If something goes wrong:

1. Go to Vercel Dashboard → **Deployments**
2. Find a working deployment
3. Click "..." → **Promote to Production**

## Local Development

To test locally with production environment variables:

```bash
# Create .env.local file
cp .env.example .env.local

# Add your values
echo "VITE_SUPABASE_PROJECT_ID=vgttzxgulpgxoysogpfs" >> .env.local
echo "VITE_SUPABASE_ANON_KEY=your-key-here" >> .env.local

# Run dev server
npm run dev
```

## Security Checklist

- ✅ Environment variables are set in Vercel (not hardcoded)
- ✅ SUPABASE_SERVICE_ROLE_KEY is ONLY on the server (Supabase Edge Functions)
- ✅ Public routes (success.yak.media) don't require auth
- ✅ Admin routes will require auth (to be implemented)
- ✅ HTTPS enforced by Vercel automatically

## Next Steps

1. ✅ Deploy to Vercel
2. ✅ Configure domains
3. ✅ Set environment variables
4. ⏳ Run database setup (DATABASE_SETUP.sql in Supabase SQL Editor)
5. ⏳ Create your first prospect and audit
6. ⏳ Test public report URL
7. ⏳ Set up authentication for admin pages
8. ⏳ Monitor usage and performance

---

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs
- Check `/SETUP_INSTRUCTIONS.md` for database setup
