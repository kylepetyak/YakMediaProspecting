# Fix Your Local Repo (Do This NOW)

These are the commands you need to run on your computer in your project folder.

---

## Step 1: Delete the Broken `_redirects` Directory

```bash
# Navigate to your project
cd /path/to/your/project

# Delete the bad _redirects directory
rm -rf public/_redirects

# Vercel doesn't need _redirects (it uses vercel.json instead)
```

---

## Step 2: Download Latest Code from Figma Make

Export your code from Figma Make to get:
- ✅ `vercel.json` (routing config)
- ✅ Latest component code
- ✅ All your files

---

## Step 3: Verify Required Files Exist

Check that you have these files in your project root:

### A. `package.json`

```bash
cat package.json
```

If it doesn't exist or is incomplete, create/replace it:

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
    "sonner": "^1.4.0"
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

### B. `vite.config.ts`

```bash
cat vite.config.ts
```

If it doesn't exist, create it:

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

### C. `vercel.json`

```bash
cat vercel.json
```

Should contain:

```json
{
  "buildCommand": "npm install && npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### D. `tsconfig.json`

```bash
cat tsconfig.json
```

If it doesn't exist, create it:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### E. `tsconfig.node.json`

```bash
cat tsconfig.node.json
```

If it doesn't exist, create it:

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

### F. `index.html`

```bash
cat index.html
```

If it doesn't exist, create it:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Yak Media - Marketing Audit</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/main.tsx"></script>
  </body>
</html>
```

### G. `main.tsx`

```bash
cat main.tsx
```

If it doesn't exist, create it:

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

---

## Step 4: Test Build Locally

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Check if dist folder was created
ls -la dist/
```

**If the build succeeds**, you should see:
```
dist/
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
└── index.html
```

**If the build fails**, you'll see error messages. Read them carefully.

---

## Step 5: Commit and Push

```bash
# Check what changed
git status

# Add all changes
git add .

# Commit
git commit -m "Fix build configuration for Vercel deployment"

# Push to GitHub
git push
```

---

## Step 6: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Select your GitHub repository
4. Vercel should auto-detect settings from `vercel.json`
5. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Click "Deploy"

---

## Step 7: Watch the Build

In Vercel dashboard:
1. Click on your deployment
2. Watch the build logs
3. If it fails, **scroll to the top** to see the first error

---

## Common Issues

### "npm install failed"

**Cause:** Bad `package.json`

**Fix:** Make sure `package.json` is valid JSON and includes all dependencies

---

### "vite: command not found"

**Cause:** Vite not in `devDependencies`

**Fix:** 
```bash
npm install --save-dev vite @vitejs/plugin-react
```

---

### "Cannot find module 'react'"

**Cause:** Missing dependencies

**Fix:**
```bash
npm install react react-dom react-router-dom
```

---

### "Build failed" (generic)

**Cause:** Could be anything

**Fix:** Read the full error message in the build logs. The first error is usually the real problem.

---

## Quick Verification Script

Run this to check if you have all required files:

```bash
echo "Checking required files..."
test -f package.json && echo "✅ package.json" || echo "❌ package.json MISSING"
test -f vite.config.ts && echo "✅ vite.config.ts" || echo "❌ vite.config.ts MISSING"
test -f vercel.json && echo "✅ vercel.json" || echo "❌ vercel.json MISSING"
test -f tsconfig.json && echo "✅ tsconfig.json" || echo "❌ tsconfig.json MISSING"
test -f index.html && echo "✅ index.html" || echo "❌ index.html MISSING"
test -f main.tsx && echo "✅ main.tsx" || echo "❌ main.tsx MISSING"
test -f App.tsx && echo "✅ App.tsx" || echo "❌ App.tsx MISSING"
test -d public/_redirects && echo "❌ public/_redirects is a DIRECTORY (DELETE IT)" || echo "✅ _redirects not a directory"
```

---

## After Everything is Fixed

Your file structure should look like:

```
your-project/
├── index.html
├── main.tsx
├── App.tsx
├── package.json
├── package-lock.json
├── vite.config.ts
├── vercel.json
├── tsconfig.json
├── tsconfig.node.json
├── components/
├── styles/
│   └── globals.css
├── utils/
└── supabase/
```

**NOT like this:**
```
your-project/
├── public/
│   └── _redirects/  ← DELETE THIS
```

---

## Summary

1. ✅ Delete `public/_redirects` directory
2. ✅ Download latest code from Figma Make
3. ✅ Verify all config files exist
4. ✅ Test build locally (`npm run build`)
5. ✅ Push to GitHub
6. ✅ Deploy to Vercel
7. ✅ Add environment variables
8. ✅ Your app goes live!

**The key is testing the build locally BEFORE pushing to Vercel.** If it builds locally, it will build on Vercel.
