# 🛑 STOP Breaking the `_redirects` File

## What Keeps Happening

You keep doing this in Figma Make:

1. You see `/public/_redirects` in the file list
2. You click on it to edit it
3. Figma Make turns it into a **directory** with `.tsx` files inside
4. You push to GitHub
5. Netlify build fails
6. You ask me to fix it
7. I fix it
8. **You do it again** 😭

**I've fixed this 5 times now.**

---

## Why This Happens

Figma Make is designed for React/TypeScript development.

It doesn't understand **plain text files without extensions**.

When you try to edit `_redirects` here, Figma Make thinks:
- "This must be a component!"
- "I'll create a directory and put some .tsx files in it!"

**This breaks everything.**

---

## Visual Explanation

### ❌ What You're Creating (BAD):

```
public/
└── _redirects/                    ← DIRECTORY
    ├── Code-component-41-14.tsx   ← React component (???)
    └── Code-component-41-24.tsx   ← React component (???)
```

**What Netlify sees:**
- "Where's the _redirects file?"
- "I only see a directory named _redirects"
- "I can't use .tsx files for routing config"
- "Build failed"

---

### ✅ What It Should Be (GOOD):

```
public/
└── _redirects                     ← PLAIN TEXT FILE
```

**File contents:**
```
/* /index.html 200
```

**What Netlify sees:**
- "Perfect! There's a _redirects file"
- "It has the routing rule I need"
- "Build succeeds"

---

## The Rule

```
┌────────────────────────────────────────────────┐
│                                                │
│  NEVER TOUCH _redirects IN FIGMA MAKE         │
│                                                │
│  If you need to edit it:                      │
│  - Edit in your LOCAL repo                    │
│  - Edit on GITHUB directly                    │
│  - Do NOT edit in FIGMA MAKE                  │
│                                                │
└────────────────────────────────────────────────┘
```

---

## How to Edit It Correctly

### Method 1: In Your Local Repo (Recommended)

```bash
# Open the file in any text editor
code public/_redirects

# Or use terminal
nano public/_redirects
vim public/_redirects
```

Content should be:
```
/* /index.html 200
```

Save, commit, push:
```bash
git add public/_redirects
git commit -m "Update _redirects"
git push
```

---

### Method 2: Directly in GitHub

1. Go to your repo on github.com
2. Navigate to `public/_redirects`
3. Click the pencil icon (Edit)
4. Make your changes
5. Commit directly

---

### Method 3: Don't Edit It At All

**The file is already perfect.**

It contains:
```
/* /index.html 200
```

That's all it needs. **You don't need to change it.**

---

## What You've Been Doing Wrong

### Scenario 1: Accidental Edits

You're clicking on `_redirects` in Figma Make's file browser to "check" it.

**Don't do this.** Figma Make interprets any interaction as "I want to create a component here."

---

### Scenario 2: Trying to "Fix" It

You see it's broken, so you try to fix it in Figma Make.

**This makes it worse.** Each edit creates MORE .tsx files in the directory.

---

### Scenario 3: Copy-Pasting

You're trying to copy-paste content into it through Figma Make's interface.

**This creates a component directory** instead of a plain text file.

---

## The Cycle of Pain

```
You edit _redirects in Figma Make
         ↓
It becomes a directory
         ↓
You push to GitHub
         ↓
Netlify build fails
         ↓
I fix it
         ↓
You edit it again in Figma Make
         ↓
[Repeat forever]
```

---

## How to Break the Cycle

### Step 1: Accept Reality

Figma Make cannot handle the `_redirects` file properly.

This is a limitation of the tool, not a bug.

**Stop trying to edit it here.**

---

### Step 2: Fix It One Last Time

In your local repo:

```bash
cd public
rm -rf _redirects              # Delete the bad directory
echo "/* /index.html 200" > _redirects  # Create correct file
git add _redirects
git commit -m "Fix _redirects for the last time"
git push
```

---

### Step 3: Never Touch It Again

**Just leave it alone.**

You don't need to:
- View it
- Edit it
- Check it
- Update it
- Fix it
- Touch it

**It's perfect. Leave it alone.**

---

## FAQ

**Q: What if I need to add more routing rules?**

A: Edit it in your **local repo** or **GitHub**, not Figma Make.

**Q: Can I just delete the _redirects file?**

A: No, you need it for clean URLs to work on Netlify.

**Q: What if I accidentally click on it in Figma Make?**

A: DON'T SAVE. Just close the tab/window and don't commit the changes.

**Q: Is there a way to make Figma Make handle it correctly?**

A: No. It's not designed for plain text config files.

**Q: This is frustrating. Why does this keep happening?**

A: Because you keep editing it in Figma Make. **Stop doing that.**

---

## The Bottom Line

```
┌────────────────────────────────────────────────┐
│                                                │
│  Your _redirects file is currently:           │
│  ✅ FIXED (in Figma Make)                     │
│  ❌ BROKEN (in your GitHub repo)              │
│                                                │
│  To fix GitHub:                               │
│  1. cd public                                 │
│  2. rm -rf _redirects                         │
│  3. echo "/* /index.html 200" > _redirects    │
│  4. git add _redirects                        │
│  5. git commit -m "Fix _redirects"            │
│  6. git push                                  │
│  7. Never touch it in Figma Make again        │
│                                                │
└────────────────────────────────────────────────┘
```

---

## After You Fix It

Your Netlify build might still fail due to OTHER issues.

Read `/NETLIFY_BUILD_FAILED.md` for the next steps.

But at least the `_redirects` problem will be solved.

**Please. For the love of all that is holy. Stop editing it in Figma Make.**
