# Yak Media Prospecting Tool - Setup Instructions

## Prerequisites
You have already created the Supabase project and have the following:
- ✅ Supabase Project ID
- ✅ Supabase Anon Key
- ✅ Configured in `/utils/supabase/info.tsx`

## Setup Steps

### 1. Create Database Tables

1. Go to your Supabase Dashboard: `https://supabase.com/dashboard/project/YOUR_PROJECT`
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire contents of `/DATABASE_SETUP.sql` file
5. Paste into the SQL Editor
6. Click **Run** (or press Cmd/Ctrl + Enter)

You should see a success message. This creates:
- ✅ `prospects` table - stores company information
- ✅ `audits` table - stores 10-point audit results
- ✅ `assets` table - stores screenshot metadata
- ✅ Indexes for performance
- ✅ Row Level Security policies (allows public access)

### 2. Create Storage Bucket

The storage bucket for screenshots will be **automatically created** when you first run the application. However, if you want to create it manually:

1. Go to **Storage** in the Supabase dashboard
2. Click **New bucket**
3. Name it: `screens`
4. Set it to **Public bucket** (toggle on)
5. Click **Create bucket**

### 3. Verify Setup

To verify everything is working:

1. Navigate to `/dashboard` in your app
2. Click **New Prospect**
3. Fill in a test prospect (e.g., "Test Chiro Clinic")
4. Click **Create Prospect**
5. You should see the prospect appear in the dashboard

If you see errors:
- Check browser console for specific error messages
- Verify tables were created in Supabase Table Editor
- Verify your Supabase URL and Anon Key are correct in `/utils/supabase/info.tsx`

## Application Flow

### For Team Members:

1. **Visit `/dashboard`** - View all prospects
2. **Click "New Prospect"** - Add a chiropractor clinic
3. **Click "Open Audit"** - Fill out the 10-point audit
   - Select ✅ Pass, ⚠️ Warning, or ❌ Fail for each category
   - Upload screenshots for each category
   - Add "Top 3 Opportunities" notes
   - Fill in your name in "Completed By"
4. **Click "Generate/Update Report"** - Publishes the report
5. **Copy the public URL** - Share with prospects

### Public Report URL Format:
```
https://your-app.com/#/success/company-slug
```

Example:
```
https://your-app.com/#/success/peak-performance-chiropractic
```

## Database Schema

### prospects
- `id` - UUID (auto-generated)
- `company_name` - Company name
- `company_slug` - URL-safe slug (auto-generated from company name)
- `owner_name` - Owner/doctor name
- `email` - Contact email
- `phone` - Contact phone
- `website` - Company website
- `instagram` - Instagram handle
- `facebook` - Facebook page
- `gmb_url` - Google Business Profile URL
- `city` - City, State
- `top_opportunities` - Top 3 quick wins (newline separated)
- `created_at` - Creation timestamp

### audits
- `id` - UUID (auto-generated)
- `prospect_id` - Foreign key to prospects
- `website_ux` - pass/warning/fail
- `offer` - pass/warning/fail
- `facebook_ads` - pass/warning/fail
- `google_ads` - pass/warning/fail
- `social_media` - pass/warning/fail
- `reviews` - pass/warning/fail
- `gmb_optimization` - pass/warning/fail
- `tracking` - pass/warning/fail
- `retargeting` - pass/warning/fail
- `follow_up` - pass/warning/fail
- `notes` - Internal notes (not shown publicly)
- `completed_by` - Team member name
- `completed_at` - Completion timestamp
- `score` - Calculated score (0-10, count of "pass")

### assets
- `id` - UUID (auto-generated)
- `prospect_id` - Foreign key to prospects
- `kind` - Asset type (e.g., "screenshot", "loom")
- `label` - Category label (matches audit field key)
- `url` - Public URL to the file
- `created_at` - Upload timestamp

## Storage Structure

Screenshots are stored in the `screens` bucket with this path structure:
```
screens/
  ├── company-slug-1/
  │   ├── 1234567890_website_ux.png
  │   ├── 1234567890_offer.png
  │   └── ...
  ├── company-slug-2/
  │   └── ...
```

## Troubleshooting

### "Could not find the table 'public.prospects'"
- Run the SQL from `/DATABASE_SETUP.sql` in Supabase SQL Editor

### "Failed to create prospect"
- Check that RLS policies are created (they're in the SQL file)
- Verify your anon key has permissions

### "Upload failed"
- Check that the `screens` bucket exists and is public
- Verify file is under 10MB and is an image (jpg/png/gif/webp)

### React ref warnings in console
- These are harmless warnings from Radix UI components
- They don't affect functionality

## Next Steps

Once setup is complete:
1. Create your first real prospect in `/dashboard`
2. Complete an audit for them
3. Generate and share the public report
4. Repeat for all 100 chiropractors!

## Support

For issues, check:
- Browser console for error details
- Supabase logs in Dashboard → Logs
- Network tab to see API request/response details
