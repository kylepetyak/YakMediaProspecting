# 📱 Yak Media Prospecting App - Structure Guide

## 🏠 There is NO "Home Page" - Here's Why

The app is designed as a **dashboard-first application**. When you visit the root URL (`/` or `/#/`), it **automatically redirects to the dashboard**.

### Why This Design?

This is a **tool for your team**, not a marketing website. Everyone who logs in needs to get straight to work managing prospects and audits.

---

## 🗺️ Complete App Structure

### **Public Routes (No Login Required)**

| Route | Purpose |
|-------|---------|
| `/#/login` | Login page for team members |
| `/#/initial-setup` | One-time setup to create first admin account |
| `/#/arizona-pain-posture-scottsdale-chiropractor` | Public audit report (any company slug) |

### **Protected Routes (Login Required)**

| Route | Purpose | Access From |
|-------|---------|-------------|
| `/#/` or `/#/dashboard` | Main dashboard with all prospects | Default after login |
| `/#/dashboard/audit/:id` | Edit/complete audit for a prospect | Click "Edit Audit" on prospect card |
| `/#/audit-guide` | Complete guide for performing audits | Top navigation → "Audit Guide" |
| `/#/manage-users` | Add/remove team members | Top navigation → "Manage Users" |
| `/#/create-user` | Add a new user | From Manage Users page |

---

## 🎯 How to Use the App

### **1. Dashboard (Main Screen)**
- View all prospects in cards
- Search by company name, city, or owner
- Track progress toward 100 prospect goal
- Quick actions:
  - **"Edit Audit"** - Open the audit form
  - **"View Public Report"** - See the shareable report
  - **Delete icon** - Remove a prospect

### **2. Top Navigation Bar**
- **Audit Guide** - Step-by-step instructions for completing audits
- **Manage Users** - Add/remove team members and VAs

### **3. Creating a Prospect**
1. Click **"New Prospect"** button on dashboard
2. Fill in company details (only company name is required)
3. Auto-generates a unique URL slug
4. Click **"Create Prospect"**

### **4. Completing an Audit**
1. Click **"Edit Audit"** on any prospect card
2. Fill out the 10-point audit form:
   - Website UX
   - Offers
   - Facebook Ads
   - Google Ads
   - Social Media
   - Reviews
   - GMB Optimization
   - Tracking Pixels
   - Retargeting
   - Follow-up Systems
3. Set custom "Estimated Monthly Impact" for each category
4. Click **"Save & Publish"**

### **5. Sharing Reports**
- Each prospect gets a public URL: `success.yak.media/company-slug`
- Click **"View Public Report"** to preview
- Click **"Copy URL"** to share with the prospect
- Reports are beautiful, professional, and fully branded

### **6. Audit Guide**
- Click **"Audit Guide"** in top navigation
- Comprehensive instructions for all 10 audit categories
- Examples and tips for each section
- Best practices for scoring

---

## 🔐 Authentication Flow

```
┌─────────────┐
│ Visit App   │
└──────┬──────┘
       │
       ▼
┌─────────────────┐         ┌──────────────┐
│ First Time?     │───YES──▶│ Setup Page   │
│ (No users yet)  │         │ Create Admin │
└────────┬────────┘         └──────────────┘
         │
         NO
         │
         ▼
┌─────────────────┐
│ Login Page      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Dashboard       │◀─── Main App
└─────────────────┘
```

---

## ✅ Key Features

### **Dashboard**
- ✅ Real-time prospect count
- ✅ Progress tracking (X/100 goal)
- ✅ Search and filter
- ✅ Quick access to audits and reports

### **Audit System**
- ✅ 10-point comprehensive audit
- ✅ Custom impact estimates
- ✅ Scoring system (0-10 scale)
- ✅ Before/after projections

### **Public Reports**
- ✅ Clean URLs without `#` on production
- ✅ Professional design
- ✅ No login required for prospects
- ✅ Shareable links

### **Team Management**
- ✅ Multi-user support
- ✅ Password authentication
- ✅ Role-based access (everyone has same access currently)

---

## 🎨 Design Philosophy

1. **No distractions** - Straight to the dashboard
2. **Fast workflow** - Create → Audit → Share in minutes
3. **Clear navigation** - Top bar always accessible
4. **Visual feedback** - Cards, badges, progress indicators
5. **Mobile responsive** - Works on all devices

---

## 🚀 Production vs Preview

### **Figma Make Preview**
- Uses HashRouter → URLs have `#` symbol
- Example: `yourapp.figma.new/#/dashboard`

### **Vercel Production (success.yak.media)**
- Uses BrowserRouter → Clean URLs
- Example: `success.yak.media/dashboard`
- Public reports: `success.yak.media/arizona-chiro`

---

## ❓ Common Questions

**Q: Where is the home page?**
A: The dashboard IS the home page. It auto-redirects from `/` to `/dashboard`.

**Q: How do I access the audit guide?**
A: Click "Audit Guide" in the top navigation bar (visible on all pages).

**Q: Where are my public reports?**
A: Click "View Public Report" on any prospect card, or visit `success.yak.media/company-slug` directly.

**Q: Can I customize the welcome message?**
A: Yes! Edit the Alert component in `/components/pages/DashboardPage.tsx`.

**Q: How do I add team members?**
A: Click "Manage Users" in the top navigation → "Add New User" button.

---

## 🎯 Next Steps

1. **Create your first prospect** - Click "New Prospect"
2. **Complete an audit** - Click "Edit Audit"
3. **Preview the report** - Click "View Public Report"
4. **Share with client** - Copy the URL and send it

That's it! You're ready to prospect 🚀
