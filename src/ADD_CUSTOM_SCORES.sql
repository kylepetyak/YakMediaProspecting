-- Add custom score columns to audits table
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/YOUR_PROJECT/sql/new

-- Add score columns for each audit field
ALTER TABLE audits ADD COLUMN IF NOT EXISTS website_ux_score INTEGER DEFAULT 100;
ALTER TABLE audits ADD COLUMN IF NOT EXISTS offer_score INTEGER DEFAULT 100;
ALTER TABLE audits ADD COLUMN IF NOT EXISTS facebook_ads_score INTEGER DEFAULT 100;
ALTER TABLE audits ADD COLUMN IF NOT EXISTS google_ads_score INTEGER DEFAULT 100;
ALTER TABLE audits ADD COLUMN IF NOT EXISTS social_media_score INTEGER DEFAULT 100;
ALTER TABLE audits ADD COLUMN IF NOT EXISTS reviews_score INTEGER DEFAULT 100;
ALTER TABLE audits ADD COLUMN IF NOT EXISTS gmb_optimization_score INTEGER DEFAULT 100;
ALTER TABLE audits ADD COLUMN IF NOT EXISTS tracking_score INTEGER DEFAULT 100;
ALTER TABLE audits ADD COLUMN IF NOT EXISTS retargeting_score INTEGER DEFAULT 100;
ALTER TABLE audits ADD COLUMN IF NOT EXISTS follow_up_score INTEGER DEFAULT 100;

-- Verify the columns were added
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'audits'
AND column_name LIKE '%_score'
ORDER BY column_name;
