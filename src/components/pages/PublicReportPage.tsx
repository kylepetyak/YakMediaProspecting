import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { projectId, publicAnonKey } from "../../utils/supabase/info";
import { Prospect, Audit, Asset } from "../../utils/supabase/types";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { XCircle, AlertTriangle, Mail, Search } from "lucide-react";
import { AuditReport } from "../AuditReport";

export function PublicReportPage() {
  const { slug } = useParams<{ slug: string }>();
  const [loading, setLoading] = useState(true);
  const [prospect, setProspect] = useState<Prospect | null>(null);
  const [audit, setAudit] = useState<Audit | null>(null);
  const [assets, setAssets] = useState<Asset[]>([]);

  useEffect(() => {
    console.log('PublicReportPage loaded with slug:', slug);
    console.log('Current URL hash:', window.location.hash);
    if (slug) {
      fetchReportData();
    } else {
      console.error('No slug provided to PublicReportPage');
      setLoading(false);
    }
  }, [slug]);

  async function fetchReportData() {
    if (!slug) {
      console.error('No slug provided');
      setLoading(false);
      return;
    }

    try {
      console.log('Fetching report for slug:', slug);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5e752b5e/prospects/slug/${slug}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error('Error response:', data);
        console.log('Make sure you have created a prospect with the company slug:', slug);
        throw new Error(data.message || 'Report not found');
      }

      console.log('Report data loaded:', data);
      setProspect(data.prospect);
      setAudit(data.audit);
      setAssets(data.assets || []);
    } catch (error) {
      console.error('Error fetching report:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent mb-4"></div>
          <p className="text-muted-foreground">Loading report...</p>
        </div>
      </div>
    );
  }

  if (!prospect) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <Card className="max-w-2xl">
          <CardContent className="pt-6">
            <XCircle className="w-16 h-16 mx-auto text-red-600 mb-4" />
            <h2 className="mb-2 text-center">Report Not Found</h2>
            <p className="text-muted-foreground mb-6 text-center">
              The audit report you're looking for doesn't exist or hasn't been published yet.
            </p>
            
            {slug && (
              <div className="bg-red-50 border-2 border-red-200 p-4 rounded-lg mb-4">
                <div className="flex items-start gap-3 mb-3">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-red-900 mb-1">No Prospect Found</h4>
                    <p className="text-sm text-red-800">
                      Looking for slug: <code className="bg-white px-2 py-1 rounded font-mono">{slug}</code>
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">
                  ℹ️
                </div>
                <div>
                  <h4 className="mb-2">This report doesn't exist yet</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    To create this report, you need to:
                  </p>
                  <ol className="text-sm text-muted-foreground ml-4 list-decimal space-y-1">
                    <li>Go to your Dashboard</li>
                    <li>Click "Add New Prospect"</li>
                    <li>Enter the company name (it will generate the slug automatically)</li>
                    <li>Complete the 10-point audit</li>
                    <li>Click "Generate / Update Report"</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border mb-4">
              <h4 className="mb-2">💡 Tip: Check What Reports Exist</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Go to <code className="bg-white px-2 py-1 rounded">/debug</code> to see all available reports and their URLs.
              </p>
              <a 
                href="/debug"
                className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
              >
                <Search className="w-4 h-4" />
                View Debug Page
              </a>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg text-center">
              <h4 className="mb-2">Want Your Own Marketing Audit?</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Get a comprehensive 10-point analysis of your chiropractic practice's marketing
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Mail className="w-4 h-4 mr-2" />
                Contact Yak Media
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!audit) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <Card className="max-w-2xl">
          <CardContent className="pt-6">
            <AlertTriangle className="w-16 h-16 mx-auto text-amber-600 mb-4" />
            <h2 className="mb-2 text-center">Audit Not Completed</h2>
            <p className="text-muted-foreground mb-6 text-center">
              The prospect <strong>{prospect.company_name}</strong> exists, but the audit hasn't been completed yet.
            </p>
            
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="mb-2">To publish this report:</h4>
                  <ol className="text-sm text-muted-foreground ml-4 list-decimal space-y-1">
                    <li>Go to the Dashboard</li>
                    <li>Click "Open Audit" for {prospect.company_name}</li>
                    <li>Complete all 10 audit categories</li>
                    <li>Click "Generate / Update Report"</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="text-center">
              <a href="/#/dashboard" className="inline-flex items-center gap-2 text-blue-600 hover:underline">
                Go to Dashboard →
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Transform data to match AuditReport component format
  const auditFields = [
    { key: 'website_ux', label: 'Website UX', description: 'Modern design, speed, mobile-friendly, clear CTAs' },
    { key: 'offer', label: 'Offer', description: 'Compelling new patient or consultation offer' },
    { key: 'facebook_ads', label: 'Facebook Ads', description: 'Active ad campaigns and targeting strategy' },
    { key: 'google_ads', label: 'Google Ads', description: 'Search and display advertising presence' },
    { key: 'social_media', label: 'Social Media', description: 'Content frequency, engagement, and quality' },
    { key: 'reviews', label: 'Reviews', description: 'Google review quantity and average rating' },
    { key: 'gmb_optimization', label: 'GMB Optimization', description: 'Photos, posts, updated business information' },
    { key: 'tracking', label: 'Tracking', description: 'Facebook Pixel and Google Tag implementation' },
    { key: 'retargeting', label: 'Retargeting', description: 'Retargeting campaigns to warm audiences' },
    { key: 'follow_up', label: 'Follow-Up System', description: 'Automated email/SMS lead nurture sequence' }
  ];

  const auditPoints = auditFields.map((field, index) => {
    const status = (audit as any)[field.key] || 'fail';
    // Use custom score if available, otherwise use default based on status
    const customScore = (audit as any)[`${field.key}_score`];
    const score = customScore !== undefined && customScore !== null 
      ? customScore 
      : (status === 'pass' ? 100 : status === 'warning' ? 50 : 20);
    
    return {
      id: index + 1,
      area: field.label,
      description: field.description,
      status: status as "pass" | "warning" | "fail",
      score: score,
      notes: (audit as any)[`${field.key}_notes`] || 'No detailed findings provided.',
      screenshot: ''
    };
  });

  // Parse top opportunities
  const opportunitiesText = prospect.top_opportunities || '';
  const opportunitiesList = opportunitiesText
    .split('\n')
    .filter(o => o.trim())
    .map(o => o.replace(/^[•\-*]\s*/, ''));

  const topOpportunities = opportunitiesList.slice(0, 3).map((opp, index) => ({
    title: opp,
    impact: "High",
    description: opp
  }));

  // Ensure we have exactly 3 opportunities (fill with defaults if needed)
  while (topOpportunities.length < 3) {
    topOpportunities.push({
      title: "Optimization Opportunity Available",
      impact: "High",
      description: "Additional growth opportunity identified during audit."
    });
  }

  const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const reportData = {
    businessName: prospect.company_name,
    ownerName: prospect.owner_name || '',
    city: prospect.city || '',
    auditDate: currentDate,
    overallScore: audit.score * 10, // Convert from /10 to /100
    website: prospect.website || '',
    phone: prospect.phone || '',
    auditPoints: auditPoints,
    topOpportunities: topOpportunities,
    potentialLeadsMin: (audit as any).potential_leads_min || 40,
    potentialLeadsMax: (audit as any).potential_leads_max || 60,
    potentialRevenueMin: (audit as any).potential_revenue_min || 25000,
    potentialRevenueMax: (audit as any).potential_revenue_max || 40000
  };

  const metaDescription = topOpportunities.length > 0
    ? `Quick wins for ${prospect.company_name}: ${topOpportunities[0].title}. See 10-point marketing audit with insights.`
    : `Comprehensive marketing audit for ${prospect.company_name} - 10-point analysis by Yak Media.`;

  return (
    <>
      <Helmet>
        <title>{prospect.company_name} Marketing Audit | Yak Media</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={`${prospect.company_name} Marketing Audit | Yak Media`} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <AuditReport data={reportData} />
      </div>
    </>
  );
}
