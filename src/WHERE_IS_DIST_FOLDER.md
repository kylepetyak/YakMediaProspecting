# Where is the `dist` folder?

## TL;DR: It doesn't exist in Figma Make

The `dist` folder is **created during the build process** and doesn't exist in this Figma Make environment.

---

## Understanding the Build Process

### What Figma Make Shows You:
- **Source code** (`.tsx` files, components, etc.)
- This is the **code you write**

### What the `dist` folder is:
- **Built/compiled code** ready for deployment
- Created by running `npm run build`
- Contains optimized HTML, CSS, JavaScript

---

## How to Get Your `dist` Folder

You have **2 options**:

### Option 1: Let Netlify/Vercel Build It For You (Easiest) ⭐

**This is what most people do.**

1. **Export your code from Figma Make** (download as ZIP or connect to GitHub)
2. **Deploy to Netlify or Vercel**
3. **They automatically run `npm run build`** and create the dist folder
4. **Your site goes live** at `success.yak.media`

**You never need to see or touch the dist folder.**

#### Netlify Steps:
```bash
# Option A: Deploy from Git
1. Push your code to GitHub
2. Connect Netlify to your GitHub repo
3. Netlify builds and deploys automatically

# Option B: Manual deploy
1. Download your Figma Make code as ZIP
2. Extract it
3. Run: npm install && npm run build
4. Drag the `dist` folder to Netlify
```

---

### Option 2: Build It Yourself Locally

If you want to build locally:

```bash
# 1. Download your code from Figma Make
# 2. Open terminal in the project folder
# 3. Install dependencies
npm install

# 4. Build the project (this creates the dist folder)
npm run build

# 5. The dist folder now exists!
ls dist/
```

---

## Why You Keep Breaking `_redirects`

### ⚠️ CRITICAL ISSUE

**STOP editing `/public/_redirects` in Figma Make!**

Every time you edit it here, Figma Make turns it into a **directory** with `.tsx` files inside. This breaks your routing.

### What happens:
```
❌ BAD (what Figma Make creates when you edit it):
/public/_redirects/
  ├── Code-component-40-47.tsx
  └── Code-component-40-8.tsx

✅ GOOD (what it should be):
/public/_redirects (a plain text file)
```

### The Solution:

**Don't touch `_redirects` in Figma Make.** It's already correct:
```
/* /index.html 200
```

That's it. One line. Done. Never edit it again.

---

## Your Deployment Workflow

Here's what you should actually do:

### Step 1: Finish Building in Figma Make
- Complete your app
- Test it with the preview
- DON'T touch `_redirects`

### Step 2: Export Your Code
Download your code as a ZIP or push to GitHub

### Step 3: Deploy to Netlify
```bash
# If using Git:
1. Push to GitHub
2. Go to Netlify
3. "Import from Git"
4. Select your repo
5. Build command: npm run build
6. Publish directory: dist
7. Deploy!

# If manual:
1. Extract your ZIP
2. cd into the folder
3. npm install
4. npm run build
5. Drag `dist` folder to Netlify
```

### Step 4: Add Custom Domain
1. In Netlify: Settings → Domains
2. Add `success.yak.media`
3. Update GoDaddy DNS with Netlify's instructions
4. Wait 5-30 minutes

### Step 5: Done! ✅
Visit `success.yak.media` - your app is live!

---

## Quick Reference

| Environment | Has `dist` folder? | Purpose |
|-------------|-------------------|---------|
| **Figma Make** | ❌ No | Write code |
| **Your computer (after `npm run build`)** | ✅ Yes | Local testing |
| **Netlify/Vercel** | ✅ Yes (auto-created) | Live deployment |

---

## Common Questions

**Q: Can I preview my app in Figma Make without deploying?**  
A: Yes, use the preview button. Clean URLs won't work in preview though.

**Q: Do I need to manually create the dist folder?**  
A: No, `npm run build` creates it automatically.

**Q: Can I skip Netlify and just upload the dist folder somewhere?**  
A: Yes, but you need a host that supports SPA routing (single page apps).

**Q: Why does Netlify need access to my GitHub?**  
A: So it can auto-deploy when you push code. You can also do manual uploads instead.

**Q: I just want to test, not deploy. What do I do?**  
A: Use Figma Make's preview. For clean URLs you'll need real hosting.

---

## Bottom Line

**You don't need the `dist` folder in Figma Make.**

When you're ready to deploy:
1. Export your code
2. Deploy to Netlify (it builds for you)
3. Done

That's it. Don't overthink it!
