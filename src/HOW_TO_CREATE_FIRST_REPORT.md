# How to Create Your First Public Report

## ⚠️ **Why You're Seeing "Report Not Found"**

The error `"Cannot coerce the result to a single JSON object"` means:
**There is no prospect with that slug in your database yet.**

You're trying to access `success.yak.media/somecompany` but you haven't created a prospect called "somecompany" in your dashboard yet.

---

## ✅ **Step-by-Step: Create Your First Report**

### **Step 1: Go to Your Dashboard**
Navigate to your main app domain (NOT success.yak.media) and go to:
```
/dashboard
```

### **Step 2: Add a New Prospect**
1. Click the **"Add New Prospect"** button
2. Fill out the form:
   - **Company Name:** `Test Clinic` (REQUIRED)
   - **City:** `Phoenix, AZ`
   - **Owner Name:** `Dr. John Smith` (optional)
   - **Email, Phone, Website:** (all optional)
3. Click **"Create Prospect"**

The system will automatically create a slug from the company name:
- "Test Clinic" → `test-clinic`
- "Peak Performance Chiropractic" → `peak-performance-chiropractic`

### **Step 3: Complete the Audit**
1. Find your new prospect in the dashboard
2. Click **"Complete Audit"**
3. You'll be taken to the audit form
4. For each of the 10 categories:
   - Select ✅ Pass, ⚠️ Warning, or ❌ Fail
   - Add detailed notes (optional but recommended)
   - Upload screenshots (optional)

### **Step 4: Generate the Report**
1. Scroll to the bottom of the audit form
2. In the "Top 3 Opportunities" section, add insights
3. Click **"Generate / Update Report"**
4. A green box will appear with your public URL:
   ```
   https://success.yak.media/test-clinic
   ```

### **Step 5: Share the Report**
- Copy the URL from the green box
- Open it in a new tab to verify it works
- Share it with your prospect!

---

## 🎯 **What Company Names Create Which URLs**

| Company Name | Generated Slug | Public URL |
|--------------|----------------|------------|
| Test Clinic | `test-clinic` | `success.yak.media/test-clinic` |
| Peak Performance Chiropractic | `peak-performance-chiropractic` | `success.yak.media/peak-performance-chiropractic` |
| Arizona Spine & Wellness | `arizona-spine-wellness` | `success.yak.media/arizona-spine-wellness` |
| Dr. Smith's Office | `dr-smiths-office` | `success.yak.media/dr-smiths-office` |

---

## 🔍 **How to Check What Prospects Exist**

If you're not sure what slugs are in your database:

1. **Option 1:** Check the Dashboard
   - Go to `/dashboard`
   - All your prospects are listed there
   - The slug is shown in the table

2. **Option 2:** Check Supabase
   - Go to your Supabase dashboard
   - Table Editor → `prospects` table
   - Look at the `company_slug` column

3. **Option 3:** Use the API
   - Open browser console
   - Go to: `https://YOUR_PROJECT.supabase.co/functions/v1/make-server-5e752b5e/prospects`
   - You'll see all prospects and their slugs

---

## ❌ **Common Mistakes**

### **Mistake 1: Trying to Access a Report Before Creating It**
❌ Going to `success.yak.media/some-company` before creating "Some Company" in dashboard
✅ Create the prospect first, THEN visit the URL

### **Mistake 2: Wrong Slug**
❌ Creating "Test Clinic" but trying to access `success.yak.media/testclinic` (no hyphen)
✅ The slug is `test-clinic` (with hyphen)

### **Mistake 3: Not Generating the Report**
❌ Creating a prospect but not clicking "Generate / Update Report"
✅ You must complete the audit AND click the generate button

---

## 🚀 **Quick Test**

To test the system right now:

1. **Create a test prospect:**
   ```
   Company Name: Demo Test
   City: Phoenix, AZ
   ```

2. **Complete a simple audit:**
   - Mark 5 items as "Pass"
   - Mark 5 items as "Fail"
   - Add at least one note
   - Skip screenshots for now

3. **Generate report:**
   - Click "Generate / Update Report"

4. **Visit:**
   ```
   https://success.yak.media/demo-test
   ```

5. **It should work!** 🎉

---

## 🆘 **Still Not Working?**

If you've created a prospect but the URL still shows "Report Not Found":

1. **Check the browser console** for error messages
2. **Verify the slug** matches exactly (case-sensitive in database)
3. **Make sure you clicked "Generate / Update Report"**
4. **Try refreshing** the page
5. **Check your database** in Supabase to confirm the prospect exists

### Debug Checklist:
- [ ] Database tables are created (`/setup`)
- [ ] Prospect exists in dashboard
- [ ] Audit is completed
- [ ] "Generate Report" button was clicked
- [ ] Using the correct slug in the URL
- [ ] URL is: `success.yak.media/slug` (not `/success/slug`)

---

## 💡 **Pro Tips**

1. **Keep slugs simple:** Use short, clear company names
2. **Test locally first:** Create a test prospect to verify everything works
3. **Check the dashboard:** Your prospects list shows which reports exist
4. **Copy the URL:** After generating, use the copy button instead of typing the URL manually

Once you create your first prospect and generate a report, the system works perfectly! 🚀
