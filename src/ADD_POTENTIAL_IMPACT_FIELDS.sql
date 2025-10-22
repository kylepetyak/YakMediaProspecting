-- Add potential impact fields to the audits table
-- Run this in your Supabase SQL Editor

ALTER TABLE public.audits
ADD COLUMN IF NOT EXISTS potential_leads_min INTEGER DEFAULT 40,
ADD COLUMN IF NOT EXISTS potential_leads_max INTEGER DEFAULT 60,
ADD COLUMN IF NOT EXISTS potential_revenue_min INTEGER DEFAULT 25000,
ADD COLUMN IF NOT EXISTS potential_revenue_max INTEGER DEFAULT 40000;

-- Update existing records to have default values
UPDATE public.audits
SET 
  potential_leads_min = 40,
  potential_leads_max = 60,
  potential_revenue_min = 25000,
  potential_revenue_max = 40000
WHERE potential_leads_min IS NULL;
