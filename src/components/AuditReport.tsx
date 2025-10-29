import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
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
  Zap
} from "lucide-react";
import { ScoreChart } from "./ScoreChart";

interface AuditPoint {
  id: number;
  area: string;
  description: string;
  status: "pass" | "warning" | "fail";
  score: number;
  notes: string;
  screenshot: string; // Keep for backward compatibility
  screenshots?: string[]; // Add this line
}

interface Opportunity {
  title: string;
  impact: string;
  description: string;
}

interface AuditData {
  businessName: string;
  ownerName: string;
  city: string;
  auditDate: string;
  overallScore: number;
  website: string;
  phone: string;
  auditPoints: AuditPoint[];
  topOpportunities: Opportunity[];
  potentialLeadsMin?: number;
  potentialLeadsMax?: number;
  potentialRevenueMin?: number;
  potentialRevenueMax?: number;
}

interface AuditReportProps {
  data: AuditData;
}

 const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState('');

  const openLightbox = (imageUrl: string) => {
    setLightboxImage(imageUrl);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxImage('');
  };

export function AuditReport({ data }: AuditReportProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pass":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case "fail":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pass":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Optimized</Badge>;
      case "warning":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Needs Work</Badge>;
      case "fail":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Missing</Badge>;
      default:
        return null;
    }
  };

  const getImpactBadge = (impact: string) => {
    return impact === "High" 
      ? <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">High Impact</Badge>
      : <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Medium Impact</Badge>;
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-xl p-8 mb-8 shadow-xl">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="text-sm text-slate-300 mb-2">Marketing Performance Audit</div>
            <h1 className="mb-2">{data.businessName}</h1>
            <p className="text-slate-300">{data.ownerName}</p>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{data.auditDate}</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-slate-400" />
            <span>{data.city}</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-slate-400" />
            <span>{data.website}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-slate-400" />
            <span>{data.phone}</span>
          </div>
        </div>
      </div>

      {/* Overall Score */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="col-span-1 md:col-span-2 border-slate-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Overall Marketing Score
            </CardTitle>
            <CardDescription>
              Your current marketing performance across 10 key areas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-6">
              <div>
                <div className="text-6xl mb-2">{data.overallScore}</div>
                <div className="text-sm text-muted-foreground">out of 100</div>
              </div>
              <div className="flex-1 pb-4">
                <Progress value={data.overallScore} className="h-3" />
                <p className="text-sm text-muted-foreground mt-3">
                  There's significant room for improvement. Most of our clients score 75+ after implementing our recommendations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Potential
            </CardTitle>
            <CardDescription>
              Estimated monthly impact
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-2xl text-green-600">
                  +{data.potentialLeadsMin || 40}-{data.potentialLeadsMax || 60}
                </div>
                <div className="text-sm text-muted-foreground">New Patient Leads</div>
              </div>
              <div>
                <div className="text-2xl text-blue-600">
                  +${((data.potentialRevenueMin || 25000) / 1000).toFixed(0)}K-
                  {((data.potentialRevenueMax || 40000) / 1000).toFixed(0)}K
                </div>
                <div className="text-sm text-muted-foreground">Monthly Revenue</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Score Breakdown Chart */}
      <Card className="mb-8 border-slate-200 shadow-lg">
        <CardHeader>
          <CardTitle>Performance Breakdown</CardTitle>
          <CardDescription>Visual overview of your marketing audit scores</CardDescription>
        </CardHeader>
        <CardContent>
          <ScoreChart data={data.auditPoints} />
        </CardContent>
      </Card>

      {/* Top Opportunities */}
      <Card className="mb-8 border-purple-200 bg-purple-50/50 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-600" />
            Top 3 Opportunities for Growth
          </CardTitle>
          <CardDescription>
            Quick wins that will have the biggest impact on your patient acquisition
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.topOpportunities.map((opp, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-purple-200">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-600 text-white text-sm">
                      {index + 1}
                    </div>
                    <h4>{opp.title}</h4>
                  </div>
                  {getImpactBadge(opp.impact)}
                </div>
                <p className="text-sm text-muted-foreground ml-8">{opp.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Audit Points */}
      <Card className="mb-8 border-slate-200 shadow-lg">
        <CardHeader>
          <CardTitle>10-Point Marketing Audit Details</CardTitle>
          <CardDescription>
            Comprehensive analysis of your digital marketing presence
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.auditPoints.map((point, index) => (
              <div key={point.id}>
                <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex-shrink-0 mt-1">
                    {getStatusIcon(point.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h4>{point.id}. {point.area}</h4>
                          {getStatusBadge(point.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">{point.description}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-2xl">{point.score}</div>
                        <div className="text-xs text-muted-foreground">/ 100</div>
                      </div>
                    </div>
                    <div className="bg-slate-100 p-3 rounded text-sm mt-2">
                      <strong>Findings / Recommendations:</strong> {point.notes}
                    </div>
                    {point.screenshots && point.screenshots.length > 0 && (
  <div className="mt-3">
    <div className={`grid gap-3 ${
      point.screenshots.length === 1 
        ? 'grid-cols-1' 
        : point.screenshots.length === 2 
        ? 'grid-cols-2' 
        : 'grid-cols-2 md:grid-cols-3'
    }`}>
      {point.screenshots.map((screenshot: string, idx: number) => (
        <div key={idx} className="relative group">
          <img
            src={screenshot}
            alt={`Screenshot ${idx + 1} for ${point.area}`}
            className="w-full rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            loading="lazy"
            onClick={() => openLightbox(screenshot)}
          />
          <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            Click to enlarge
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {index < data.auditPoints.length - 1 && <Separator className="my-2" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <Card className="border-slate-900 bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl">
        <CardContent className="p-8">
          <div className="text-center max-w-2xl mx-auto">
            <TrendingUp className="w-12 h-12 mx-auto mb-4 text-green-400" />
            <h2 className="mb-3 text-white">Ready to Transform Your Marketing?</h2>
            <p className="mb-6 text-slate-300">
              Yak Media specializes in helping chiropractors like you fill your schedule with qualified new patients. 
              Let's discuss how we can implement these improvements and grow your practice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                Schedule Your Free Strategy Call
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                Watch Your Custom Video Audit
              </Button>
            </div>
            <p className="text-xs text-slate-400 mt-6">
              This audit was personally prepared for {data.businessName} by Kyle at Yak Media
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center mt-8 text-sm text-muted-foreground">
        <p>© 2025 Yak Media • Helping Chiropractors Grow Through Smart Marketing</p>
      </div>
        {/* Image Lightbox */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-in fade-in"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 text-4xl font-light leading-none"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            ×
          </button>
          <img
            src={lightboxImage}
            alt="Enlarged view"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
            Click outside to close
          </div>
        </div>
      )}
    </div>
  );
}
