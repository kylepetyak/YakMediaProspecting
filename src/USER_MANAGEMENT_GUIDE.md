# User Management Guide

## 🎯 Overview

Your system now has complete user management capabilities! You can view all team members, edit their information, and delete users when needed.

---

## 📍 How to Access

### From Homepage:
1. Sign in to your account
2. On the homepage, find the **"Team Access"** card
3. Click **"Manage Users"** button

### Direct URL:
- Visit: `success.yak.media/#/manage-users`

---

## 👥 User Management Features

### **1. View All Users**

The Manage Users page shows a complete list of all team members with:
- ✅ Name and email
- ✅ Account creation date
- ✅ Last login time
- ✅ Visual indicator for your own account ("You" badge)
- ✅ Total user count

### **2. Edit User Information**

Click the **"Edit"** button next to any user to:
- ✅ Update their name
- ✅ Change their email address
- ✅ Reset their password (optional - leave blank to keep current)

**Features:**
- Password must be at least 6 characters
- Email validation
- Real-time error handling
- Success notifications

### **3. Delete Users**

Click the **"Delete"** button next to any user to remove them:
- ✅ Confirmation dialog prevents accidents
- ✅ Cannot delete your own account (safety feature)
- ✅ Immediate access revocation
- ✅ Permanent deletion (cannot be undone)

### **4. Add New Users**

Click **"Add New User"** button to:
- ✅ Create new team member accounts
- ✅ Takes you to the Create User page
- ✅ Quick navigation back to user list

---

## 🔐 Security Features

### **Protected Routes:**
- Only authenticated users can access user management
- All user operations require admin access
- Your own account cannot be self-deleted

### **Backend Security:**
- Uses Supabase Auth Admin API
- Server-side validation
- Secure token-based authentication
- Detailed error logging

---

## 📋 Common Tasks

### **Adding a New Team Member:**

1. **From Homepage:**
   - Click "Team Access" → "Add New User"
   
2. **From Manage Users page:**
   - Click "Add New User" button in header
   
3. **Fill in details:**
   - Name (optional but recommended)
   - Email (required)
   - Password (required, min 6 characters)
   
4. **Share credentials:**
   - Give them the login URL
   - They can sign in immediately

---

### **Updating User Information:**

1. **Find the user** in the list
2. Click **"Edit"** button
3. **Update fields:**
   - Change name
   - Update email
   - Reset password (optional)
4. Click **"Save Changes"**

**Pro tip:** Leave password blank if you only want to update name/email

---

### **Removing a Team Member:**

1. **Find the user** in the list
2. Click **"Delete"** button
3. **Confirm deletion** in the dialog
4. User loses access immediately

**Warning:** This cannot be undone. The user will need a new account to regain access.

---

## 🎨 User Interface

### **Main Page Layout:**

```
┌─────────────────────────────────────────┐
│ Manage Users                            │
│ View, edit, and manage team accounts    │
│                                         │
│ [Add New User] [Back to Home]          │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Team Members (3)                        │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ 👤 John Smith                  You  │ │
│ │    john@yakmedia.com               │ │
│ │    Created: Oct 14, 2025           │ │
│ │    Last login: Oct 14, 2025 2:30pm │ │
│ │                    [Edit] [Delete] │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ [More users...]                         │
└─────────────────────────────────────────┘
```

---

## 🚀 Quick Navigation

### **From Manage Users Page:**

- **"Add New User"** → Create User page
- **"Back to Home"** → Homepage
- **"Edit"** → Edit user dialog
- **"Delete"** → Delete confirmation dialog

### **From Create User Page:**

- **"Back to Homepage"** → Homepage
- **"Manage Users"** → User management
- **"Go to Dashboard"** → Dashboard

---

## ⚡ API Endpoints (Backend)

Your server now includes these endpoints:

### **GET** `/auth/users`
- Lists all users
- Returns: user ID, email, name, created_at, last_sign_in_at

### **PATCH** `/auth/users/:id`
- Updates user information
- Body: `{ email?, name?, password? }`
- Returns: updated user object

### **DELETE** `/auth/users/:id`
- Deletes user account
- Permanent deletion
- Returns: success status

All endpoints use the Supabase Admin API and require authentication.

---

## 🛡️ Safety Features

1. **Cannot delete yourself** - Prevents account lockout
2. **Confirmation dialogs** - Double-check before destructive actions
3. **Password validation** - Minimum 6 characters
4. **Email validation** - Proper format checking
5. **Error handling** - Clear error messages
6. **Success feedback** - Toast notifications for all actions

---

## 📊 User Information Displayed

For each user, you can see:

| Field | Description |
|-------|-------------|
| **Name** | Full name (if provided) |
| **Email** | Login email address |
| **Created** | When account was created |
| **Last Login** | Most recent sign-in time |
| **Status** | "You" badge for your account |

---

## 🎯 Best Practices

### **When Adding Users:**
- ✅ Use descriptive names
- ✅ Use company email addresses
- ✅ Create strong temporary passwords
- ✅ Tell them to change password after first login

### **When Editing Users:**
- ✅ Verify email changes with the user first
- ✅ Only reset password when requested
- ✅ Update names to match official records

### **When Deleting Users:**
- ✅ Confirm they no longer need access
- ✅ Check with your team first
- ✅ Export any important work they completed
- ✅ Remember it's permanent!

---

## 🔧 Troubleshooting

### **"Failed to fetch users"**
- Check your internet connection
- Verify Supabase is running
- Check browser console for errors

### **"Failed to update user"**
- Ensure email format is valid
- Password must be 6+ characters
- Check for duplicate email addresses

### **"Failed to delete user"**
- Cannot delete your own account
- User might not exist
- Check server logs for details

---

## 📱 Responsive Design

The Manage Users page works great on:
- ✅ Desktop computers
- ✅ Tablets
- ✅ Mobile devices

The layout automatically adapts to screen size.

---

## 🎉 Summary

You now have a **complete user management system** that allows you to:

1. ✅ **View** all team members with detailed information
2. ✅ **Edit** user details including name, email, and password
3. ✅ **Delete** users when they leave your team
4. ✅ **Add** new users via integrated navigation
5. ✅ **Manage** access with full security

All while keeping your prospect reports publicly accessible at `success.yak.media/#/company-name`!

---

## 🚀 Next Steps

1. **Sign in** to your account
2. **Visit** `/manage-users` page
3. **Review** your current team members
4. **Add** any missing team members
5. **Update** information as needed

Your user management system is production-ready! 🎊
