-- Run this SQL in your Supabase SQL Editor to create the required tables
-- Go to: https://supabase.com/dashboard/project/YOUR_PROJECT/editor

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

-- Create policies to allow all operations (adjust based on your auth needs)
-- These policies allow anonymous access - modify if you add authentication

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

-- Enable realtime (optional, for live updates)
-- ALTER PUBLICATION supabase_realtime ADD TABLE public.prospects;
-- ALTER PUBLICATION supabase_realtime ADD TABLE public.audits;
-- ALTER PUBLICATION supabase_realtime ADD TABLE public.assets;
