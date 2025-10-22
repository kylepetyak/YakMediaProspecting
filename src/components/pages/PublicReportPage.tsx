import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { projectId, publicAnonKey } from "../../utils/supabase/info";
import { Prospect, Audit, Asset } from "../../utils/supabase/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Calendar,
  MapPin,
  Phone,
  Globe,
  BarChart3,
  Target,
  Zap,
  Mail,
  Search
} from "lucide-react";
import { ScoreChart } from "../ScoreChart";

export function PublicReportPage() {
  const { slug } = useParams<{ slug: string }>();
  const [loading, setLoading] = useState(true);
  const [prospect, setProspect] = useState<Prospect | null>(null);
  const [audit, setAudit] = useState<Audit | null>(null);
  const [assets, setAssets] = useState<Asset[]>([]);

  useEffect(() => {
    if (slug) {
      fetchReportData();
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
                href={window.location.hostname === 'localhost' || window.location.hostname.includes('127.0.0.1') 
                  ? '/debug' 
                  : `${window.location.protocol}//${window.location.hostname.replace('success.', '')}/debug`}
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

  const auditPoints = auditFields.map((field, index) => ({
    id: index + 1,
    area: field.label,
    description: field.description,
    status: (audit as any)[field.key] || 'fail',
    score: (audit as any)[field.key] === 'pass' ? 100 : (audit as any)[field.key] === 'warning' ? 50 : 0,
    notes: (audit as any)[`${field.key}_notes`] || '',
    screenshot: ''
  }));

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'fail':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pass':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Optimized</Badge>;
      case 'warning':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Needs Work</Badge>;
      case 'fail':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Missing</Badge>;
      default:
        return null;
    }
  };

  const opportunities = prospect.top_opportunities
    ? prospect.top_opportunities.split('\n').filter(o => o.trim()).map(o => o.replace(/^[•\-*]\s*/, ''))
    : [];

  const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-6xl mx-auto p-4 md:p-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-xl p-8 mb-8 shadow-xl">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="text-sm text-slate-300 mb-2">Marketing Performance Audit</div>
                <h1 className="mb-2">{prospect.company_name}</h1>
                {prospect.owner_name && <p className="text-slate-300">{prospect.owner_name}</p>}
              </div>
              <div className="text-right">
                <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{currentDate}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {prospect.city && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span className="text-sm">{prospect.city}</span>
                </div>
              )}
              {prospect.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span className="text-sm">{prospect.phone}</span>
                </div>
              )}
              {prospect.website && (
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-slate-400" />
                  <a
                    href={prospect.website.startsWith('http') ? prospect.website : `https://${prospect.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:underline"
                  >
                    {prospect.website}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Overall Score */}
          <Card className="mb-8 border-2 border-blue-200 bg-blue-50/50">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <BarChart3 className="w-8 h-8 text-blue-600" />
                    <div>
                      <h3>Overall Marketing Score</h3>
                      <p className="text-sm text-muted-foreground">Based on 10-point analysis</p>
                    </div>
                  </div>
                  <div className="flex items-end gap-3 mb-3">
                    <div className="text-5xl">{audit.score}</div>
                    <div className="text-2xl text-muted-foreground mb-1">/10</div>
                  </div>
                  <Progress value={audit.score * 10} className="h-3" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Optimized</span>
                    </div>
                    <div className="text-right">
                      <span className="font-medium">
                        {auditPoints.filter(p => p.status === 'pass').length} areas
                      </span>
                      <div className="text-xs text-green-600">100 pts each</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      <span>Needs Work</span>
                    </div>
                    <div className="text-right">
                      <span className="font-medium">
                        {auditPoints.filter(p => p.status === 'warning').length} areas
                      </span>
                      <div className="text-xs text-amber-600">~50 pts each</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-600" />
                      <span>Missing</span>
                    </div>
                    <div className="text-right">
                      <span className="font-medium">
                        {auditPoints.filter(p => p.status === 'fail').length} areas
                      </span>
                      <div className="text-xs text-red-600">~20 pts each</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-white rounded-lg border">
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="mb-1 text-sm">Your Growth Potential</h4>
                      <p className="text-xs text-muted-foreground">
                        Each "Needs Work" or "Missing" area represents untapped revenue. 
                        Fixing these issues typically increases patient acquisition by 200-400%.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Opportunities */}
          {opportunities.length > 0 && (
            <Card className="mb-8 border-purple-200 bg-purple-50/50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-600" />
                  <CardTitle>Top 3 Opportunities for Growth</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {opportunities.map((opp, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center">
                        {index + 1}
                      </div>
                      <div className="flex-1 pt-1">
                        <p>{opp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Performance Breakdown Chart */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Performance Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScoreChart data={auditPoints} />
            </CardContent>
          </Card>

          {/* Detailed Results */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>10-Point Marketing Audit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {auditPoints.map((point, index) => {
                  const fieldAssets = assets.filter(a => a.label === auditFields[index].key);

                  return (
                    <div key={point.id}>
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                          <span className="text-sm">{point.id}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h4 className="mb-1">{point.area}</h4>
                              <p className="text-sm text-muted-foreground">{point.description}</p>
                            </div>
                            <div className="ml-4 text-right flex-shrink-0">
                              <div className="flex items-center gap-2 mb-2">
                                {getStatusIcon(point.status)}
                                {getStatusBadge(point.status)}
                              </div>
                              {point.status !== 'pass' && point.score !== undefined && (
                                <div>
                                  <div className={`text-2xl ${point.score >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
                                    {point.score}/100
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {point.score >= 50 ? 'Fair' : point.score >= 30 ? 'Poor' : 'Critical'}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Score Progress Bar for non-passing items */}
                          {point.status !== 'pass' && point.score !== undefined && (
                            <div className="mt-3 mb-3">
                              <div className="w-full bg-white rounded-full h-2.5 border">
                                <div 
                                  className={`h-2.5 rounded-full ${
                                    point.score >= 50 ? 'bg-amber-500' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${point.score}%` }}
                                ></div>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {100 - point.score} points needed to reach optimized status
                              </p>
                            </div>
                          )}

                          {/* Detailed Notes */}
                          {point.notes && (
                            <div className="mt-3 p-3 bg-slate-50 rounded-lg border">
                              <p className="text-sm">{point.notes}</p>
                            </div>
                          )}

                          {/* Screenshots */}
                          {fieldAssets.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {fieldAssets.map(asset => (
                                <img
                                  key={asset.id}
                                  src={asset.url}
                                  alt={asset.label}
                                  className="w-full md:w-48 h-auto rounded-lg border shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                                  onClick={() => window.open(asset.url, '_blank')}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {index < auditPoints.length - 1 && <Separator />}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0">
            <CardContent className="p-8 text-center">
              <Zap className="w-12 h-12 mx-auto mb-4" />
              <h2 className="mb-3">Ready to Transform Your Marketing?</h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                We've identified clear opportunities to grow your practice. Let's discuss how Yak Media
                can help you turn these insights into new patients and revenue.
              </p>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                <Mail className="w-4 h-4 mr-2" />
                Schedule a Free Consultation
              </Button>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              Audit prepared by <span className="font-medium">Yak Media</span> • Marketing for Chiropractors in Arizona
            </p>
          </div>
        </div>
      </div>
  );
}
