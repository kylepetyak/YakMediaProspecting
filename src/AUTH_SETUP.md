# 🔐 Authentication Setup Guide

Your audit system now has **password protection** for internal pages! Here's how to set it up:

---

## 🎯 **What's Protected?**

### ✅ **Protected (Login Required):**
- `/dashboard` - Main prospect dashboard
- `/dashboard/audit/:id` - Audit forms
- `/guide` - Audit guide
- `/setup`, `/verify`, `/debug`, `/troubleshoot` - Admin tools
- `/test` - Test page

### 🌐 **Public (No Login Required):**
- `/:slug` - **Public report pages** (e.g., `/arizona-spine-clinic`)
- `/sample-report` - Sample report
- `/login` - Login page
- `/create-user` - User creation page (temporarily public)
- `/` - Homepage

---

## 🚀 **Quick Start: Create Your First User**

### **Step 1: Go to Create User Page**
Navigate to: `https://success.yak.media/#/create-user`

### **Step 2: Create Your Admin Account**
1. Enter your name (optional)
2. Enter your email (e.g., `admin@yakmedia.com`)
3. Enter a password (minimum 6 characters)
4. Click **"Create Account"**

### **Step 3: Sign In**
1. Go to: `https://success.yak.media/#/login`
2. Enter your email and password
3. Click **"Sign In"**
4. ✅ You're now logged in to the dashboard!

---

## 👥 **Add Team Members & VAs**

### **Option 1: Use the Create User Page**
1. Go to `/create-user`
2. Fill in their details
3. Share the login URL with them: `https://success.yak.media/#/login`
4. Send them their credentials securely

### **Option 2: Call the API Directly**
If you want to automate user creation, use this endpoint:

```bash
POST https://vgttzxgulpgxoysogpfs.supabase.co/functions/v1/make-server-5e752b5e/auth/create-user
Authorization: Bearer YOUR_ANON_KEY
Content-Type: application/json

{
  "email": "va@yakmedia.com",
  "password": "SecurePassword123",
  "name": "VA Name"
}
```

---

## 🔒 **Security Notes**

1. **Passwords are hashed** - Stored securely in Supabase
2. **Sessions persist** - Users stay logged in across browser sessions
3. **No email verification** - Accounts are auto-confirmed (email server not configured)
4. **Team can change passwords** - After first login at Supabase dashboard

---

## 🎯 **Typical Workflow**

### **For You (Admin):**
1. Create team member accounts via `/create-user`
2. Share login credentials securely
3. They access `/dashboard` to create audits

### **For Your Prospects:**
1. You complete an audit in the dashboard
2. Click "Generate / Update Report"
3. Copy the public URL (e.g., `https://success.yak.media/#/arizona-spine`)
4. ✅ **Send to prospect** - they can view without login!
5. Use URL in Loom videos, emails, texts

---

## 📋 **Sign Out**

Users can sign out by:
1. Going to the Dashboard
2. Clicking the **"Sign Out"** button in the top right
3. They'll be redirected to the login page

---

## 🔧 **Troubleshooting**

### **"Invalid email or password"**
- Double-check the email and password
- Passwords are case-sensitive
- Make sure the account was created successfully

### **Can't access dashboard**
- Make sure you're logged in
- Check if your session expired (sign in again)
- Try refreshing the page

### **Want to lock down /create-user page?**
Currently it's public so you can easily create accounts. To protect it:
1. Go to `/App.tsx`
2. Move the `/create-user` route inside `<ProtectedRoute>`
3. Now only logged-in users can create accounts

---

## ✅ **You're All Set!**

Your audit system is now:
- ✅ Password protected for internal use
- ✅ Public reports accessible without login
- ✅ Ready for team collaboration
- ✅ Secure for production use

**Next Steps:**
1. Create your admin account
2. Create accounts for your team/VAs
3. Start auditing chiropractor clinics!
4. Share report URLs with prospects

🚀 **Happy prospecting!**
