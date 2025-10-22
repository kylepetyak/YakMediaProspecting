-- ============================================================================
-- COMPLETE DATABASE SETUP FOR YAK MEDIA LEAD PROSPECTING
-- ============================================================================
-- Run this entire file in your Supabase SQL Editor
-- Go to: https://supabase.com/dashboard/project/YOUR_PROJECT/sql
--
-- This file combines:
-- 1. DATABASE_SETUP.sql (core tables)
-- 2. ADD_CUSTOM_SCORES.sql (custom scoring fields)
-- 3. ADD_POTENTIAL_IMPACT_FIELDS.sql (potential impact projections)
-- ============================================================================

-- ============================================================================
-- PART 1: CORE TABLES SETUP
-- ============================================================================

-- Create prospects table
CREATE TABLE IF NOT EXISTS public.prospects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  company_slug TEXT UNIQUE NOT NULL,
  owner_name TEXT,
  email TEXT,
  phone TEXT,
  website TEXT,
  instagram TEXT,
  facebook TEXT,
  gmb_url TEXT,
  city TEXT,
  top_opportunities TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create audits table
CREATE TABLE IF NOT EXISTS public.audits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prospect_id UUID REFERENCES public.prospects(id) ON DELETE CASCADE,
  website_ux TEXT CHECK (website_ux IN ('pass', 'warning', 'fail')),
  website_ux_notes TEXT,
  offer TEXT CHECK (offer IN ('pass', 'warning', 'fail')),
  offer_notes TEXT,
  facebook_ads TEXT CHECK (facebook_ads IN ('pass', 'warning', 'fail')),
  facebook_ads_notes TEXT,
  google_ads TEXT CHECK (google_ads IN ('pass', 'warning', 'fail')),
  google_ads_notes TEXT,
  social_media TEXT CHECK (social_media IN ('pass', 'warning', 'fail')),
  social_media_notes TEXT,
  reviews TEXT CHECK (reviews IN ('pass', 'warning', 'fail')),
  reviews_notes TEXT,
  gmb_optimization TEXT CHECK (gmb_optimization IN ('pass', 'warning', 'fail')),
  gmb_optimization_notes TEXT,
  tracking TEXT CHECK (tracking IN ('pass', 'warning', 'fail')),
  tracking_notes TEXT,
  retargeting TEXT CHECK (retargeting IN ('pass', 'warning', 'fail')),
  retargeting_notes TEXT,
  follow_up TEXT CHECK (follow_up IN ('pass', 'warning', 'fail')),
  follow_up_notes TEXT,
  notes TEXT,
  completed_by TEXT,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  score INTEGER DEFAULT 0
);

-- Create assets table
CREATE TABLE IF NOT EXISTS public.assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prospect_id UUID REFERENCES public.prospects(id) ON DELETE CASCADE,
  kind TEXT NOT NULL,
  label TEXT NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_prospects_slug ON public.prospects(company_slug);
CREATE INDEX IF NOT EXISTS idx_audits_prospect ON public.audits(prospect_id);
CREATE INDEX IF NOT EXISTS idx_assets_prospect ON public.assets(prospect_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.prospects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assets ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow all access to prospects" ON public.prospects;
DROP POLICY IF EXISTS "Allow all access to audits" ON public.audits;
DROP POLICY IF EXISTS "Allow all access to assets" ON public.assets;

-- Create policies to allow all operations
-- These policies allow anonymous access for public reports
-- Adjust based on your auth needs

-- Prospects policies
CREATE POLICY "Allow all access to prospects" ON public.prospects
  FOR ALL USING (true) WITH CHECK (true);

-- Audits policies
CREATE POLICY "Allow all access to audits" ON public.audits
  FOR ALL USING (true) WITH CHECK (true);

-- Assets policies
CREATE POLICY "Allow all access to assets" ON public.assets
  FOR ALL USING (true) WITH CHECK (true);

-- Grant permissions to anon and authenticated roles
GRANT ALL ON public.prospects TO anon, authenticated;
GRANT ALL ON public.audits TO anon, authenticated;
GRANT ALL ON public.assets TO anon, authenticated;

-- Grant usage on sequences (for UUID generation)
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- ============================================================================
-- PART 2: ADD CUSTOM SCORE FIELDS
-- ============================================================================

-- Add custom score columns for each audit point
-- These allow you to set scores independently of pass/warning/fail status

-- Check if columns exist before adding them
DO $$ 
BEGIN
  -- website_ux_score
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='audits' AND column_name='website_ux_score') THEN
    ALTER TABLE public.audits ADD COLUMN website_ux_score INTEGER;
  END IF;

  -- offer_score
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='audits' AND column_name='offer_score') THEN
    ALTER TABLE public.audits ADD COLUMN offer_score INTEGER;
  END IF;

  -- facebook_ads_score
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='audits' AND column_name='facebook_ads_score') THEN
    ALTER TABLE public.audits ADD COLUMN facebook_ads_score INTEGER;
  END IF;

  -- google_ads_score
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='audits' AND column_name='google_ads_score') THEN
    ALTER TABLE public.audits ADD COLUMN google_ads_score INTEGER;
  END IF;

  -- social_media_score
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='audits' AND column_name='social_media_score') THEN
    ALTER TABLE public.audits ADD COLUMN social_media_score INTEGER;
  END IF;

  -- reviews_score
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='audits' AND column_name='reviews_score') THEN
    ALTER TABLE public.audits ADD COLUMN reviews_score INTEGER;
  END IF;

  -- gmb_optimization_score
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='audits' AND column_name='gmb_optimization_score') THEN
    ALTER TABLE public.audits ADD COLUMN gmb_optimization_score INTEGER;
  END IF;

  -- tracking_score
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='audits' AND column_name='tracking_score') THEN
    ALTER TABLE public.audits ADD COLUMN tracking_score INTEGER;
  END IF;

  -- retargeting_score
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='audits' AND column_name='retargeting_score') THEN
    ALTER TABLE public.audits ADD COLUMN retargeting_score INTEGER;
  END IF;

  -- follow_up_score
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='audits' AND column_name='follow_up_score') THEN
    ALTER TABLE public.audits ADD COLUMN follow_up_score INTEGER;
  END IF;
END $$;

-- ============================================================================
-- PART 3: ADD POTENTIAL IMPACT FIELDS
-- ============================================================================

-- Add potential impact projection fields
-- These allow customizing the estimated leads and revenue for each prospect

DO $$ 
BEGIN
  -- potential_leads_min
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='audits' AND column_name='potential_leads_min') THEN
    ALTER TABLE public.audits ADD COLUMN potential_leads_min INTEGER DEFAULT 40;
  END IF;

  -- potential_leads_max
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='audits' AND column_name='potential_leads_max') THEN
    ALTER TABLE public.audits ADD COLUMN potential_leads_max INTEGER DEFAULT 60;
  END IF;

  -- potential_revenue_min
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='audits' AND column_name='potential_revenue_min') THEN
    ALTER TABLE public.audits ADD COLUMN potential_revenue_min INTEGER DEFAULT 25000;
  END IF;

  -- potential_revenue_max
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='audits' AND column_name='potential_revenue_max') THEN
    ALTER TABLE public.audits ADD COLUMN potential_revenue_max INTEGER DEFAULT 40000;
  END IF;
END $$;

-- Update existing records to have default values for potential impact
UPDATE public.audits
SET 
  potential_leads_min = COALESCE(potential_leads_min, 40),
  potential_leads_max = COALESCE(potential_leads_max, 60),
  potential_revenue_min = COALESCE(potential_revenue_min, 25000),
  potential_revenue_max = COALESCE(potential_revenue_max, 40000)
WHERE potential_leads_min IS NULL 
   OR potential_leads_max IS NULL 
   OR potential_revenue_min IS NULL 
   OR potential_revenue_max IS NULL;

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Run these to verify everything was created successfully:

-- Check all tables exist
SELECT 'Tables created successfully!' as status
WHERE EXISTS (
  SELECT 1 FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name IN ('prospects', 'audits', 'assets')
  GROUP BY table_schema
  HAVING COUNT(*) = 3
);

-- Check all score columns exist
SELECT 'Score columns added successfully!' as status
WHERE (
  SELECT COUNT(*) FROM information_schema.columns 
  WHERE table_name = 'audits' 
  AND column_name LIKE '%_score'
) = 10;

-- Check potential impact columns exist
SELECT 'Potential impact columns added successfully!' as status
WHERE (
  SELECT COUNT(*) FROM information_schema.columns 
  WHERE table_name = 'audits' 
  AND column_name LIKE 'potential%'
) = 4;

-- Check RLS is enabled
SELECT 'RLS enabled successfully!' as status
WHERE (
  SELECT COUNT(*) FROM pg_tables 
  WHERE schemaname = 'public' 
  AND tablename IN ('prospects', 'audits', 'assets')
  AND rowsecurity = true
) = 3;

-- Show all policies
SELECT tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename;

-- ============================================================================
-- SETUP COMPLETE!
-- ============================================================================
-- 
-- ✅ Tables created: prospects, audits, assets
-- ✅ Indexes created for performance
-- ✅ RLS enabled with open policies
-- ✅ Custom score fields added
-- ✅ Potential impact fields added
-- ✅ Default values set
--
-- Next steps:
-- 1. Deploy your Supabase Edge Functions
-- 2. Deploy to Vercel
-- 3. Create your first user via Supabase Auth
-- 4. Start creating prospects and audits!
--
-- ============================================================================
