import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { projectId, publicAnonKey } from "../../utils/supabase/info";
import { Prospect, Audit, Asset, CheckValue } from "../../utils/supabase/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Upload, 
  Trash2, 
  ExternalLink,
  Copy,
  Loader2
} from "lucide-react";
import { toast } from "sonner@2.0.3";

const AUDIT_FIELDS = [
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

export function AuditFormPage() {
  const { prospectId } = useParams<{ prospectId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [prospect, setProspect] = useState<Prospect | null>(null);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [topOpportunities, setTopOpportunities] = useState("");
  const [notes, setNotes] = useState("");
  const [completedBy, setCompletedBy] = useState("");
  const [publicUrl, setPublicUrl] = useState("");
  
  const [auditValues, setAuditValues] = useState<Record<string, CheckValue>>({
    website_ux: 'fail',
    offer: 'fail',
    facebook_ads: 'fail',
    google_ads: 'fail',
    social_media: 'fail',
    reviews: 'fail',
    gmb_optimization: 'fail',
    tracking: 'fail',
    retargeting: 'fail',
    follow_up: 'fail'
  });
  
  const [auditNotes, setAuditNotes] = useState<Record<string, string>>({
    website_ux: '',
    offer: '',
    facebook_ads: '',
    google_ads: '',
    social_media: '',
    reviews: '',
    gmb_optimization: '',
    tracking: '',
    retargeting: '',
    follow_up: ''
  });

  useEffect(() => {
    if (prospectId) {
      fetchProspectData();
    }
  }, [prospectId]);

  async function fetchProspectData() {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5e752b5e/prospects/${prospectId}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );
      
      const data = await response.json();
      setProspect(data.prospect);
      setAssets(data.assets || []);
      
      if (data.prospect.top_opportunities) {
        setTopOpportunities(data.prospect.top_opportunities);
      }
      
      if (data.audit) {
        // Populate audit values from existing audit
        const newValues: Record<string, CheckValue> = {};
        const newNotes: Record<string, string> = {};
        AUDIT_FIELDS.forEach(field => {
          newValues[field.key] = (data.audit[field.key] as CheckValue) || 'fail';
          newNotes[field.key] = data.audit[`${field.key}_notes`] || '';
        });
        setAuditValues(newValues);
        setAuditNotes(newNotes);
        setNotes(data.audit.notes || '');
        setCompletedBy(data.audit.completed_by || '');
      }
      
      setPublicUrl(`https://success.yak.media/${data.prospect.company_slug}`);
    } catch (error) {
      console.error('Error fetching prospect:', error);
      toast.error('Failed to load prospect data');
    } finally {
      setLoading(false);
    }
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>, fieldKey: string) {
    const file = e.target.files?.[0];
    if (!file || !prospect) return;
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('prospect_id', prospect.id);
      formData.append('company_slug', prospect.company_slug);
      formData.append('label', fieldKey);
      formData.append('kind', 'screenshot');
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5e752b5e/upload`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: formData
        }
      );
      
      if (!response.ok) throw new Error('Upload failed');
      
      const data = await response.json();
      setAssets([...assets, data.asset]);
      toast.success('Screenshot uploaded');
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload screenshot');
    }
  }

  async function handleDeleteAsset(assetId: string) {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5e752b5e/assets/${assetId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );
      
      if (!response.ok) throw new Error('Delete failed');
      
      setAssets(assets.filter(a => a.id !== assetId));
      toast.success('Screenshot deleted');
    } catch (error) {
      console.error('Error deleting asset:', error);
      toast.error('Failed to delete screenshot');
    }
  }

  async function handleSaveAndPublish() {
    if (!prospect) return;
    
    setSaving(true);
    try {
      // Calculate score (count of 'pass')
      const score = Object.values(auditValues).filter(v => v === 'pass').length;
      
      // Update prospect with top opportunities
      await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5e752b5e/prospects/${prospect.id}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            top_opportunities: topOpportunities
          })
        }
      );
      
      // Prepare audit data with notes
      const auditData: any = {
        prospect_id: prospect.id,
        notes,
        completed_by: completedBy,
        score
      };
      
      // Add audit values and notes
      AUDIT_FIELDS.forEach(field => {
        auditData[field.key] = auditValues[field.key];
        auditData[`${field.key}_notes`] = auditNotes[field.key];
      });
      
      // Save audit
      const auditResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5e752b5e/audits`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(auditData)
        }
      );
      
      if (!auditResponse.ok) throw new Error('Failed to save audit');
      
      // Generate URL for custom domain
      const generatedUrl = `https://success.yak.media/${prospect.company_slug}`;
      setPublicUrl(generatedUrl);
      
      toast.success('Report published successfully! 🎉', {
        description: `View at: success.yak.media/${prospect.company_slug}`,
        duration: 8000,
        action: {
          label: 'Open Report',
          onClick: () => window.open(generatedUrl, '_blank')
        }
      });
    } catch (error) {
      console.error('Error saving audit:', error);
      toast.error('Failed to publish report');
    } finally {
      setSaving(false);
    }
  }

  async function copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard');
    } catch (error) {
      // Fallback for browsers that block clipboard API
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        toast.success('Copied to clipboard');
      } catch (e) {
        toast.error('Failed to copy. Please copy manually.');
      }
      document.body.removeChild(textarea);
    }
  }

  function getStatusIcon(value: CheckValue) {
    switch (value) {
      case 'pass': return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'fail': return <XCircle className="w-5 h-5 text-red-600" />;
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent mb-4"></div>
          <p className="text-muted-foreground">Loading audit...</p>
        </div>
      </div>
    );
  }

  if (!prospect) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <h3 className="mb-2">Prospect not found</h3>
            <Link to="/dashboard">
              <Button>← Back to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentScore = Object.values(auditValues).filter(v => v === 'pass').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="mb-6">
          <Link to="/dashboard">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="mb-2">{prospect.company_name}</h1>
              <p className="text-muted-foreground">
                {prospect.city && `${prospect.city} • `}
                Complete the 10-point audit
              </p>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-muted-foreground mb-1">Current Score</div>
              <div className="text-3xl">{currentScore}/10</div>
              <Badge className={
                currentScore >= 7 ? "bg-green-100 text-green-800" :
                currentScore >= 4 ? "bg-amber-100 text-amber-800" :
                "bg-red-100 text-red-800"
              }>
                {currentScore >= 7 ? "Strong" : currentScore >= 4 ? "Needs Work" : "Critical"}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* 10-Point Audit */}
            <Card>
              <CardHeader>
                <CardTitle>10-Point Marketing Audit</CardTitle>
                <CardDescription>
                  Evaluate each category: ✅ Pass | ⚠️ Warning | ❌ Fail
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {AUDIT_FIELDS.map((field, index) => {
                  const fieldAssets = assets.filter(a => a.label === field.key);
                  
                  return (
                    <div key={field.key} className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm text-muted-foreground">#{index + 1}</span>
                            <h4>{field.label}</h4>
                            {getStatusIcon(auditValues[field.key])}
                          </div>
                          <p className="text-sm text-muted-foreground">{field.description}</p>
                        </div>
                      </div>
                      
                      <RadioGroup
                        value={auditValues[field.key]}
                        onValueChange={(value) => setAuditValues({ ...auditValues, [field.key]: value as CheckValue })}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="pass" id={`${field.key}-pass`} />
                          <Label htmlFor={`${field.key}-pass`} className="cursor-pointer">
                            ✅ Pass
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="warning" id={`${field.key}-warning`} />
                          <Label htmlFor={`${field.key}-warning`} className="cursor-pointer">
                            ⚠️ Warning
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="fail" id={`${field.key}-fail`} />
                          <Label htmlFor={`${field.key}-fail`} className="cursor-pointer">
                            ❌ Fail
                          </Label>
                        </div>
                      </RadioGroup>
                      
                      {/* Notes */}
                      <div className="space-y-2">
                        <Label htmlFor={`${field.key}-notes`} className="text-sm">
                          Detailed Notes
                        </Label>
                        <Textarea
                          id={`${field.key}-notes`}
                          value={auditNotes[field.key]}
                          onChange={(e) => setAuditNotes({ ...auditNotes, [field.key]: e.target.value })}
                          placeholder="e.g., Load time 4.2s, mobile menu broken, no clear CTA..."
                          rows={3}
                          className="text-sm"
                        />
                      </div>
                      
                      {/* Screenshots */}
                      <div className="space-y-2">
                        <Label className="text-sm">Screenshots</Label>
                        <div className="flex flex-wrap gap-2">
                          {fieldAssets.map(asset => (
                            <div key={asset.id} className="relative group">
                              <img 
                                src={asset.url} 
                                alt={asset.label}
                                className="w-20 h-20 object-cover rounded border"
                              />
                              <button
                                onClick={() => handleDeleteAsset(asset.id)}
                                className="absolute -top-2 -right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                          
                          <label className="w-20 h-20 border-2 border-dashed rounded flex items-center justify-center cursor-pointer hover:border-blue-600 hover:bg-blue-50 transition-colors">
                            <Upload className="w-5 h-5 text-muted-foreground" />
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, field.key)}
                            />
                          </label>
                        </div>
                      </div>
                      
                      {index < AUDIT_FIELDS.length - 1 && <Separator />}
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Top Opportunities */}
            <Card>
              <CardHeader>
                <CardTitle>Top 3 Opportunities</CardTitle>
                <CardDescription>
                  Brief bullet points on biggest wins (one per line)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={topOpportunities}
                  onChange={(e) => setTopOpportunities(e.target.value)}
                  placeholder="• Implement retargeting campaigns&#10;• Create compelling new patient offer&#10;• Launch Facebook lead campaigns"
                  rows={5}
                  className="font-mono text-sm"
                />
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Notes</CardTitle>
                <CardDescription>
                  Internal notes (not shown on public report)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any additional observations..."
                    rows={4}
                  />
                </div>
                
                <div>
                  <Label htmlFor="completed_by">Completed By</Label>
                  <Input
                    id="completed_by"
                    value={completedBy}
                    onChange={(e) => setCompletedBy(e.target.value)}
                    placeholder="Your name"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {prospect.owner_name && (
                  <div>
                    <div className="text-muted-foreground">Owner</div>
                    <div>{prospect.owner_name}</div>
                  </div>
                )}
                {prospect.email && (
                  <div>
                    <div className="text-muted-foreground">Email</div>
                    <div>{prospect.email}</div>
                  </div>
                )}
                {prospect.phone && (
                  <div>
                    <div className="text-muted-foreground">Phone</div>
                    <div>{prospect.phone}</div>
                  </div>
                )}
                {prospect.website && (
                  <div>
                    <div className="text-muted-foreground">Website</div>
                    <a 
                      href={prospect.website.startsWith('http') ? prospect.website : `https://${prospect.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      {prospect.website}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Publish */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle>Publish Report</CardTitle>
                <CardDescription>
                  Generate the public audit page
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={handleSaveAndPublish}
                  disabled={saving}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    'Generate / Update Report'
                  )}
                </Button>
                
                {publicUrl && (
                  <div className="space-y-3 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 text-green-800 mb-2">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="font-medium">Report Published!</span>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Public URL</Label>
                      <div className="flex gap-2">
                        <Input
                          value={publicUrl}
                          readOnly
                          className="text-sm bg-white"
                        />
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => copyToClipboard(publicUrl)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      <a
                        href={publicUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline font-medium"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Open Report in New Tab
                      </a>
                    </div>
                    <div className="text-xs text-muted-foreground pt-2 border-t">
                      Share this URL with {prospect?.company_name} to show their audit results
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Assets Count */}
            <Card>
              <CardHeader>
                <CardTitle>Uploaded Assets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{assets.length}</div>
                <p className="text-sm text-muted-foreground">
                  {assets.length !== 1 ? 'Screenshots' : 'Screenshot'} uploaded
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
