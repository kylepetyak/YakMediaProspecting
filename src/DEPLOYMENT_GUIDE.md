# Deployment Guide for Custom Domain Setup

## Overview
Your app now supports clean URLs on your custom domain `success.yak.media`.

## URL Structure

### Public Reports (success.yak.media)
- **Format:** `https://success.yak.media/companyname`
- **Example:** `https://success.yak.media/peak-performance-chiropractic`

The company slug is automatically generated from the Company Name you enter in the prospect form:
- "Peak Performance Chiropractic" → `peak-performance-chiropractic`
- "Arizona Spine Center" → `arizona-spine-center`

### Admin Dashboard (your main domain)
- Your internal dashboard and audit forms stay on your main app domain
- Public reports are served from `success.yak.media`

## Deployment Steps

### 1. Deploy to Your Hosting Provider

The app now uses **BrowserRouter** instead of HashRouter, which requires server-side configuration.

### 2. Configure Your Hosting

#### **For Netlify:**
A `_redirects` file has been created in `/public/_redirects` with:
```
/*    /index.html   200
```

#### **For Vercel:**
Create a `vercel.json` file:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

#### **For Custom Server (Nginx):**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

### 3. DNS Configuration

Set up your subdomain in your DNS provider:

**For success.yak.media:**
- Type: `CNAME` or `A` record
- Name: `success`
- Value: Point to your hosting provider's address

### 4. SSL Certificate

Make sure `success.yak.media` has SSL enabled through your hosting provider.

## How It Works

1. **Create Prospect:** Enter "Peak Performance Chiropractic" in the company name field
2. **System Auto-Generates Slug:** `peak-performance-chiropractic`
3. **Complete Audit:** Fill out the 10-point audit
4. **Generate Report:** Click "Generate / Update Report"
5. **Public URL Created:** `https://success.yak.media/peak-performance-chiropractic`
6. **Share with Client:** Send them the clean URL

## Testing

Before deploying:
1. Test locally to ensure routing works
2. Verify the slug generation from company names
3. Check that public reports load correctly
4. Test with different company name formats (spaces, special characters, etc.)

## Important Notes

- The company slug is created from the **Company Name** field when you create a prospect
- Slugs are automatically converted to URL-safe format (lowercase, hyphens instead of spaces)
- Each company gets a unique slug based on their name
- If you change a company name, you'll need to regenerate the report for the new slug

## Troubleshooting

**404 on Public URLs:**
- Make sure your hosting provider's redirect/rewrite rules are configured
- Check that DNS for `success.yak.media` is properly set up
- Verify SSL certificate is active

**Wrong URL Generated:**
- Check that the company_slug is being created correctly in the database
- Verify the prospect was created with a valid company name

**Report Not Loading:**
- Check browser console for errors
- Verify the slug matches what's in your database
- Ensure the audit was saved for that prospect
