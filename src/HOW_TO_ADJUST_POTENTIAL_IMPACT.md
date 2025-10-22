# How to Adjust Potential Impact Numbers (Leads & Revenue)

The potential impact projections shown on each report can be customized per prospect based on their industry and business size. By default, reports show **40-60 leads** and **$25K-40K monthly revenue**, but you should adjust these to reflect accurate, industry-specific projections.

## Quick Setup (One-Time)

**Run this SQL in your Supabase SQL Editor** to add the new fields:

1. Go to: https://supabase.com/dashboard/project/YOUR_PROJECT/editor
2. Paste the contents of `/ADD_POTENTIAL_IMPACT_FIELDS.sql`
3. Click "Run"

This adds four new columns to your audits table:
- `potential_leads_min` (default: 40)
- `potential_leads_max` (default: 60)
- `potential_revenue_min` (default: 25000)
- `potential_revenue_max` (default: 40000)

## How to Customize for Each Prospect

### Option 1: During Audit Creation/Editing

When you're filling out an audit for a prospect:

1. Navigate to `/dashboard/audit/:prospectId`
2. Scroll down to the **"Potential Impact Projections"** card
3. Adjust the four fields:
   - **Leads Min**: Minimum expected new patient leads (e.g., 40)
   - **Leads Max**: Maximum expected new patient leads (e.g., 60)
   - **Revenue Min**: Minimum monthly revenue in dollars (e.g., 25000)
   - **Revenue Max**: Maximum monthly revenue in dollars (e.g., 40000)
4. See the live preview below the inputs
5. Click "Save & Publish Report"

The numbers will now appear on the public report at `success.yak.media/#/companyslug`

### Option 2: Directly in Database (Advanced)

If you need to bulk update or adjust via SQL:

```sql
-- Update a specific prospect's projections
UPDATE audits
SET 
  potential_leads_min = 50,
  potential_leads_max = 80,
  potential_revenue_min = 30000,
  potential_revenue_max = 50000
WHERE prospect_id = 'your-prospect-id-here';
```

## How to Research Industry-Specific Projections

Before setting potential impact numbers, consider these factors:

1. **Average Transaction Value**: Research typical sale/service prices in their industry
2. **Sales Cycle Length**: How long from lead to customer? (immediate vs. months)
3. **Conversion Rates**: Industry benchmarks for lead-to-customer conversion
4. **Client Lifetime Value**: One-time purchase vs. recurring revenue model
5. **Market Size**: Local vs. national, niche vs. broad market
6. **Competition Level**: Saturated markets need more conservative projections

### Research Resources:
- Industry trade publications and associations
- Google search: "[industry] average customer acquisition cost"
- Google search: "[industry] average customer lifetime value"
- Competitor analysis (what are similar businesses likely generating?)
- Your own past client results in this industry

## Examples by Business Type & Industry

### Healthcare & Medical (Chiropractors, Dentists, Med Spas)

**Small Practice (1-2 providers, new/struggling)**
- Leads: 20-35
- Revenue: $15K-25K
- Rationale: Lower patient volume, still building reputation

**Medium Practice (2-3 providers, established)**
- Leads: 40-60 (DEFAULT)
- Revenue: $25K-40K (DEFAULT)
- Rationale: Steady patient flow, moderate marketing

**Large Practice (3+ providers, thriving)**
- Leads: 60-100
- Revenue: $40K-70K
- Rationale: High patient capacity, optimized systems

**High-End Wellness/Aesthetic Center**
- Leads: 30-50
- Revenue: $50K-100K
- Rationale: Lower volume but higher ticket services ($500-2000 per treatment)

### Professional Services (Lawyers, Accountants, Consultants)

**Solo Practitioner**
- Leads: 10-20
- Revenue: $10K-25K
- Rationale: High-touch service, limited capacity

**Small Firm (2-5 professionals)**
- Leads: 20-40
- Revenue: $30K-60K
- Rationale: Higher fees, longer sales cycles

**Mid-Size Firm (6-15 professionals)**
- Leads: 40-80
- Revenue: $60K-150K
- Rationale: Substantial capacity, higher-value clients

### Home Services (HVAC, Plumbing, Roofing, Landscaping)

**Small Company (1-3 trucks)**
- Leads: 50-100
- Revenue: $20K-40K
- Rationale: High lead volume needed, moderate ticket ($300-1500)

**Medium Company (4-10 trucks)**
- Leads: 100-200
- Revenue: $50K-100K
- Rationale: Seasonal business, rapid response needed

**Large Company (10+ trucks)**
- Leads: 200-400
- Revenue: $100K-250K
- Rationale: High capacity, emergency services, higher-value projects

### Retail & E-commerce

**Brick & Mortar Retail Store**
- Leads: 100-300
- Revenue: $15K-50K
- Rationale: Lower AOV ($50-200), higher volume needed

**E-commerce (Small)**
- Leads: 200-500
- Revenue: $20K-60K
- Rationale: National reach, depends heavily on AOV

**E-commerce (Established)**
- Leads: 500-2000
- Revenue: $50K-200K
- Rationale: Scaled operations, email list, retargeting

### Restaurants & Food Service

**Single Location Restaurant**
- Leads: 100-300
- Revenue: $10K-30K
- Rationale: Lower AOV ($15-40), repeat customers important

**Multi-Location Restaurant**
- Leads: 300-800
- Revenue: $40K-120K
- Rationale: Multiple revenue streams, catering opportunities

### Real Estate

**Individual Agent**
- Leads: 15-30
- Revenue: $25K-60K
- Rationale: Long sales cycles, high commission per deal

**Small Team (2-5 agents)**
- Leads: 30-60
- Revenue: $60K-150K
- Rationale: More capacity, shared leads

**Brokerage/Large Team**
- Leads: 60-150
- Revenue: $150K-400K
- Rationale: Multiple agents, higher volume markets

### Fitness & Wellness

**Personal Trainer (Solo)**
- Leads: 20-40
- Revenue: $10K-25K
- Rationale: Limited 1-on-1 capacity

**Boutique Gym/Studio**
- Leads: 40-80
- Revenue: $20K-50K
- Rationale: Class-based model, membership revenue

**Full-Service Gym**
- Leads: 100-250
- Revenue: $30K-80K
- Rationale: Higher capacity, but lower rates

### SaaS & B2B Services

**Early-Stage Startup**
- Leads: 50-150
- Revenue: $5K-20K
- Rationale: Low conversion, long nurture, but scales fast

**Growth-Stage Company**
- Leads: 150-400
- Revenue: $25K-100K
- Rationale: Established product, higher MRR

**Enterprise B2B**
- Leads: 20-50
- Revenue: $50K-200K
- Rationale: Very high ACV, long sales cycles, fewer deals needed

## What Gets Displayed

On the public report, these numbers appear in the **"Potential"** card:

```
+50-80        ← Uses potential_leads_min and potential_leads_max
New Patient Leads

+$30K-50K     ← Uses potential_revenue_min and potential_revenue_max
Monthly Revenue
```

The format automatically converts dollars to "K" notation:
- 25000 → $25K
- 40000 → $40K
- 100000 → $100K

## Decision Framework: Setting Accurate Projections

Use this step-by-step process for each prospect:

### Step 1: Identify Their Business Model
- What do they sell? (product, service, subscription)
- What's their average price point?
- How often do customers buy? (one-time, monthly, annually)

### Step 2: Calculate Realistic Lead Conversion
Example: If they need $40K/month revenue and average sale is $1000:
- They need 40 customers/month
- If conversion rate is 20%, they need 200 leads
- **Set projection: 180-220 leads, $36K-44K revenue**

### Step 3: Check Against Industry Benchmarks
- Does your calculation align with the industry examples above?
- Adjust up for: Urban location, low competition, high-demand services
- Adjust down for: Rural location, saturated market, long sales cycles

### Step 4: Consider Current Marketing Maturity
- If they score 30/100 average: Use conservative projections (you're starting from scratch)
- If they score 50/100 average: Use moderate projections (fixing what's broken)
- If they score 70/100 average: Use aggressive projections (optimization opportunities)

## Best Practices

1. **Be Conservative**: It's better to under-promise and over-deliver
2. **Consider Geography**: Urban/suburban businesses typically have higher volume than rural
3. **Factor in Competition**: Saturated markets need more realistic (lower) projections
4. **Review Past Results**: Use your actual client results in similar industries to guide estimates
5. **Account for Seasonality**: Some industries (e.g., landscaping, tax prep) have major seasonal swings
6. **Update as Needed**: You can always edit projections later by re-saving the audit
7. **Show Your Work**: Add a note in the audit explaining your reasoning for the numbers

## Defaults for Existing Reports

All existing audits will automatically use the default values (40-60 leads, $25K-40K revenue) until you edit them.

## Troubleshooting

**Issue**: Changes aren't showing on the public report
- **Solution**: Make sure you clicked "Save & Publish Report" after changing the values

**Issue**: Fields show 0 or undefined
- **Solution**: Run the SQL migration from `/ADD_POTENTIAL_IMPACT_FIELDS.sql`

**Issue**: Can't find the input fields
- **Solution**: The "Potential Impact Projections" card appears on the audit form page, below "Top 3 Opportunities"

---

**Need help?** The preview in the form shows exactly how it will appear on the public report!
