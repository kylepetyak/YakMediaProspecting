# 🚀 Quick Start - Database Setup

## You're seeing an error because the database isn't set up yet!

Don't worry - this is a **one-time setup** that takes less than 1 minute.

---

## ✅ Follow These Steps:

### **Step 1: Copy the SQL**
Copy all the SQL code from `/DATABASE_SETUP.sql` (the entire file)

### **Step 2: Open Supabase SQL Editor**
1. Go to https://supabase.com/dashboard
2. Select your project
3. Click **"SQL Editor"** in the left sidebar (or go to the "Editor" section)

### **Step 3: Paste & Run**
1. Create a new query
2. Paste the SQL from `DATABASE_SETUP.sql`
3. Click **"Run"** (or press Cmd/Ctrl + Enter)

### **Step 4: Verify**
Once the SQL runs successfully, refresh your app. The homepage should now work!

---

## 🎯 What This Does:

The SQL creates 3 tables in your database:
- **prospects** - Stores chiropractor clinic information
- **audits** - Stores the 10-point audit results
- **assets** - Stores uploaded screenshots

It also sets up proper permissions and indexes.

---

## ✨ Alternative: Use the Built-in Setup Page

Your app has a built-in quick start page at:
- **`/#/quick-start`** - Step-by-step instructions and reference documentation

---

## ❓ Need Help?

If you see any errors when running the SQL:
1. Make sure you're in the SQL Editor (not the Table Editor)
2. Make sure you copied the ENTIRE SQL file
3. Check that you selected the correct project in Supabase

Once setup is complete, you'll be able to:
✅ Create prospects in the dashboard
✅ Complete audits with screenshots and notes
✅ Generate public report pages
✅ Share reports with prospects
