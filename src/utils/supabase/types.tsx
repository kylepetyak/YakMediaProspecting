export interface Prospect {
  id: string;
  company_name: string;
  company_slug: string;
  owner_name: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  instagram: string | null;
  facebook: string | null;
  gmb_url: string | null;
  city: string | null;
  top_opportunities: string | null;
  created_at: string;
}

export interface Audit {
  id: string;
  prospect_id: string;
  website_ux: 'pass' | 'warning' | 'fail' | null;
  website_ux_notes: string | null;
  offer: 'pass' | 'warning' | 'fail' | null;
  offer_notes: string | null;
  facebook_ads: 'pass' | 'warning' | 'fail' | null;
  facebook_ads_notes: string | null;
  google_ads: 'pass' | 'warning' | 'fail' | null;
  google_ads_notes: string | null;
  social_media: 'pass' | 'warning' | 'fail' | null;
  social_media_notes: string | null;
  reviews: 'pass' | 'warning' | 'fail' | null;
  reviews_notes: string | null;
  gmb_optimization: 'pass' | 'warning' | 'fail' | null;
  gmb_optimization_notes: string | null;
  tracking: 'pass' | 'warning' | 'fail' | null;
  tracking_notes: string | null;
  retargeting: 'pass' | 'warning' | 'fail' | null;
  retargeting_notes: string | null;
  follow_up: 'pass' | 'warning' | 'fail' | null;
  follow_up_notes: string | null;
  notes: string | null;
  completed_by: string | null;
  completed_at: string;
  score: number;
}

export interface Asset {
  id: string;
  prospect_id: string;
  kind: string;
  label: string;
  url: string;
  created_at: string;
}

export type CheckValue = 'pass' | 'warning' | 'fail';
