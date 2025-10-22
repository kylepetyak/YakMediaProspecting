import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Separator } from "./ui/separator";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { 
  ArrowLeft,
  ClipboardCheck,
  Search,
  Globe,
  Facebook,
  Chrome,
  Mail,
  Camera,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Star,
  MapPin,
  Target,
  BarChart,
  Zap,
  MessageSquare,
  TrendingUp,
  Database
} from "lucide-react";

export function AuditGuide() {
  const auditSteps = [
    {
      id: 1,
      title: "Website UX",
      icon: Globe,
      description: "Modern design, speed, mobile-friendly, clear CTAs",
      whatToLookFor: [
        "Is the design modern or outdated? (Check copyright year in footer)",
        "Page load speed (use PageSpeed Insights or just observe)",
        "Mobile responsiveness (resize browser or check on phone)",
        "Clear call-to-action buttons (Book Appointment, New Patient Special, etc.)",
        "Navigation menu functionality",
        "Overall user experience and professionalism"
      ],
      deliverable: "Screenshot of homepage + note speed/UX issues",
      scoringGuide: {
        pass: "Modern design (2020+), fast load (<2s), mobile-friendly, clear CTAs",
        warning: "Decent but dated (2015-2019), moderate speed, some UX issues",
        fail: "Very old design (<2015), slow (>4s), broken mobile, no clear CTAs"
      },
      tools: ["Google PageSpeed Insights", "Browser DevTools", "Mobile device"]
    },
    {
      id: 2,
      title: "Offer",
      icon: Star,
      description: "Compelling new patient or consultation offer",
      whatToLookFor: [
        "Is there a specific dollar amount offer? ($49 New Patient Special)",
        "Free consultation or exam offer?",
        "Value proposition clearly stated?",
        "Offer visible on homepage or requires searching?",
        "Urgency or scarcity elements? (Limited time, first-time patients only)",
        "Clear next steps to claim the offer?"
      ],
      deliverable: "Screenshot of offer (or note that none exists)",
      scoringGuide: {
        pass: "Clear, compelling offer with specific value ($X off, free exam, etc.)",
        warning: "Generic offer or unclear value proposition",
        fail: "No offer visible or just 'Book Now' with no incentive"
      },
      tools: ["Manual website review"]
    },
    {
      id: 3,
      title: "Facebook Ads",
      icon: Facebook,
      description: "Active ad campaigns and targeting strategy",
      whatToLookFor: [
        "Are they running any ads? (Check Meta Ad Library)",
        "How many ads are currently active?",
        "What type of ads? (Image, video, carousel, lead gen)",
        "Ad messaging and offers",
        "Ad creative quality (professional vs. DIY)",
        "How long have ads been running?"
      ],
      deliverable: "Screenshot of Meta Ad Library results",
      scoringGuide: {
        pass: "Active campaigns with multiple ads, professional creative, clear offers",
        warning: "Running ads but limited quantity or poor quality",
        fail: "No active ads in past 90 days"
      },
      tools: ["Meta Ad Library (https://www.facebook.com/ads/library)"]
    },
    {
      id: 4,
      title: "Google Ads",
      icon: Search,
      description: "Search and display advertising presence",
      whatToLookFor: [
        "Are they running Google Search ads? (Check Ad Transparency)",
        "Search their business name + industry keyword in Google",
        "Do they appear in ads for competitor searches?",
        "Display/banner ads running?",
        "Ad copy quality and relevance",
        "Call extensions and location extensions visible?"
      ],
      deliverable: "Screenshot of Google Ad Transparency Center or search results",
      scoringGuide: {
        pass: "Active search and display campaigns, good ad copy, extensions used",
        warning: "Running basic search ads but limited strategy",
        fail: "No Google Ads presence"
      },
      tools: ["Google Ad Transparency Center", "Google Search"]
    },
    {
      id: 5,
      title: "Social Media",
      icon: MessageSquare,
      description: "Content frequency, engagement, and quality",
      whatToLookFor: [
        "Instagram: Post frequency (daily, weekly, monthly?)",
        "Facebook: Post frequency and types (photos, videos, links)",
        "Content quality (professional photos vs. phone snapshots)",
        "Engagement rates (likes, comments, shares per post)",
        "Stories and reels being used?",
        "Consistent branding across platforms?",
        "Bio/About section optimized with offers?"
      ],
      deliverable: "Screenshot of Instagram/Facebook feed",
      scoringGuide: {
        pass: "3+ posts per week, high engagement, professional content, video strategy",
        warning: "2-3 posts per month, moderate engagement, inconsistent quality",
        fail: "Less than monthly posting, very low engagement, or inactive"
      },
      tools: ["Instagram app/website", "Facebook business page"]
    },
    {
      id: 6,
      title: "Reviews",
      icon: Star,
      description: "Google review quantity and average rating",
      whatToLookFor: [
        "Total number of Google reviews",
        "Average star rating (out of 5)",
        "Recency of reviews (getting new ones regularly?)",
        "Response rate to reviews (do they reply?)",
        "Quality of responses to negative reviews",
        "Reviews on other platforms (Yelp, Facebook)"
      ],
      deliverable: "Screenshot of GMB reviews section with count and rating visible",
      scoringGuide: {
        pass: "50+ reviews, 4.5+ stars, recent reviews, responds to feedback",
        warning: "20-50 reviews, 4.0-4.4 stars, some responses",
        fail: "Less than 20 reviews, below 4.0 stars, or no responses"
      },
      tools: ["Google My Business listing", "Google Search"]
    },
    {
      id: 7,
      title: "GMB Optimization",
      icon: MapPin,
      description: "Photos, posts, updated business information",
      whatToLookFor: [
        "Business information complete? (hours, phone, website, services)",
        "Number of photos (exterior, interior, team, patients)",
        "Photo quality and recency",
        "Google Posts being used? (weekly posts with offers/updates)",
        "Q&A section populated and managed?",
        "Business description optimized with keywords?",
        "Categories correctly selected?"
      ],
      deliverable: "Screenshot of GMB profile showing photos, posts, and info",
      scoringGuide: {
        pass: "Complete info, 30+ recent photos, weekly posts, active Q&A",
        warning: "Basic info complete but limited photos (<15), occasional posts",
        fail: "Incomplete info, few/old photos, no posts"
      },
      tools: ["Google My Business listing via Google Search/Maps"]
    },
    {
      id: 8,
      title: "Tracking",
      icon: BarChart,
      description: "Facebook Pixel and Google Tag implementation",
      whatToLookFor: [
        "Facebook Pixel installed? (Use Pixel Helper)",
        "Is Pixel firing correctly on key pages?",
        "What events are being tracked? (PageView, Lead, etc.)",
        "Google Analytics or Google Tag Manager present?",
        "Conversion tracking configured?",
        "Any other tracking codes? (CallRail, etc.)"
      ],
      deliverable: "Screenshot from Tag Assistant or Pixel Helper showing active tags",
      scoringGuide: {
        pass: "Pixel and GA4 installed correctly, tracking conversions, events configured",
        warning: "Tracking installed but not optimized or limited events",
        fail: "No tracking pixels/tags or incorrectly installed"
      },
      tools: ["Facebook Pixel Helper (Chrome Extension)", "Google Tag Assistant (Chrome Extension)"]
    },
    {
      id: 9,
      title: "Retargeting",
      icon: Target,
      description: "Retargeting campaigns to warm audiences",
      whatToLookFor: [
        "Evidence of retargeting ads running (check Ad Library for 'custom audiences')",
        "Do you see their ads after visiting their website? (Browse site, then check Facebook/Instagram)",
        "Pixel installed correctly to build audiences?",
        "Google retargeting/remarketing ads active?",
        "Audience size sufficient for retargeting?"
      ],
      deliverable: "Note observations (Yes/No retargeting detected)",
      scoringGuide: {
        pass: "Active retargeting on Facebook and Google with proper pixel setup",
        warning: "Pixel installed but no active retargeting campaigns",
        fail: "No retargeting detected or pixel missing"
      },
      tools: ["Meta Ad Library", "Observation after visiting website"]
    },
    {
      id: 10,
      title: "Follow-Up System",
      icon: Zap,
      description: "Automated email/SMS lead nurture sequence",
      whatToLookFor: [
        "Submit test form with fake info (use test email you control)",
        "Do you receive an immediate confirmation email?",
        "Any automated follow-up emails in the next 24 hours?",
        "SMS/text message confirmation or follow-up?",
        "What's the delay before human contact?",
        "Quality of automated messages (branded, professional?)",
        "Is the form even working?"
      ],
      deliverable: "Submit test form and document what happens",
      scoringGuide: {
        pass: "Instant email confirmation + automated sequence + SMS within 5 min",
        warning: "Basic confirmation email but limited automation",
        fail: "No confirmation, no automation, or form doesn't work"
      },
      tools: ["Use a test email address", "Your phone for SMS testing"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link to="/dashboard">
            <Button
              variant="ghost"
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mb-4">
            <ClipboardCheck className="w-4 h-4" />
            Complete Audit Guide
          </div>
          <h1 className="mb-3">10-Point Marketing Audit Guide</h1>
          <p className="text-muted-foreground">
            Follow this step-by-step guide to conduct thorough marketing audits for any business. 
            Each audit should take 10-15 minutes.
          </p>
        </div>

        {/* Important Note */}
        <Alert className="mb-8 bg-blue-50 border-blue-200">
          <Database className="w-4 h-4 text-blue-600" />
          <AlertTitle>Everything Lives in the Dashboard</AlertTitle>
          <AlertDescription>
            All prospect information, audit scores, notes, and screenshots are managed directly in the dashboard. 
            No Google Sheets or Drive needed - the system handles everything automatically and generates 
            professional public reports at success.yak.media/company-slug.
          </AlertDescription>
        </Alert>

        {/* Quick Reference */}
        <Card className="mb-8 border-green-200 bg-green-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              Quick Workflow
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white text-sm">1</div>
                  <h4>Create Prospect</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Add business to dashboard with contact info, website, and social handles
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white text-sm">2</div>
                  <h4>Complete Audit</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Score all 10 categories, add notes, and upload screenshots in the audit form
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white text-sm">3</div>
                  <h4>Share Report</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  System auto-generates public report URL - click "View Public Report" and share with prospect
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scoring System */}
        <Card className="mb-8 border-slate-200">
          <CardHeader>
            <CardTitle>Scoring System</CardTitle>
            <CardDescription>How to score each audit point</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">✓ Optimized</Badge>
                    <span className="text-sm">Score: 70-100</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This area is well-executed and professional. Minor improvements possible.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">⚠ Needs Work</Badge>
                    <span className="text-sm">Score: 30-69</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Basic implementation but significant room for improvement. Opportunity for growth.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
                <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-100">✕ Missing</Badge>
                    <span className="text-sm">Score: 0-29</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Not implemented or severely lacking. Major opportunity for Yak Media to add value.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Audit Steps */}
        <Card className="mb-8 border-slate-200">
          <CardHeader>
            <CardTitle>Detailed Audit Steps</CardTitle>
            <CardDescription>
              Click each section to expand and view detailed instructions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {auditSteps.map((step, index) => (
                <AccordionItem key={step.id} value={`item-${step.id}`}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3 text-left">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100">
                        <step.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span>{step.id}. {step.title}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-11 space-y-4 pt-4">
                      {/* What to Look For */}
                      <div>
                        <h4 className="mb-2 flex items-center gap-2">
                          <Camera className="w-4 h-4" />
                          What to Look For
                        </h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {step.whatToLookFor.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-slate-400 mt-0.5">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Separator />

                      {/* Deliverable */}
                      <div>
                        <h4 className="mb-2 flex items-center gap-2">
                          <ClipboardCheck className="w-4 h-4" />
                          Deliverable
                        </h4>
                        <p className="text-sm text-muted-foreground bg-slate-50 p-3 rounded-lg">
                          {step.deliverable}
                        </p>
                      </div>

                      <Separator />

                      {/* Scoring Guide */}
                      <div>
                        <h4 className="mb-3 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          Scoring Guide
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="text-green-700">Optimized (70-100):</span>
                              <span className="text-muted-foreground ml-1">{step.scoringGuide.pass}</span>
                            </div>
                          </div>
                          <div className="flex items-start gap-2 text-sm">
                            <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="text-amber-700">Needs Work (30-69):</span>
                              <span className="text-muted-foreground ml-1">{step.scoringGuide.warning}</span>
                            </div>
                          </div>
                          <div className="flex items-start gap-2 text-sm">
                            <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="text-red-700">Missing (0-29):</span>
                              <span className="text-muted-foreground ml-1">{step.scoringGuide.fail}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Tools */}
                      {step.tools && (
                        <>
                          <Separator />
                          <div>
                            <h4 className="mb-2 flex items-center gap-2">
                              <Chrome className="w-4 h-4" />
                              Tools Needed
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {step.tools.map((tool, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {tool}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Lead Identification Section */}
        <Card className="mb-8 border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Step 1: Lead Identification
            </CardTitle>
            <CardDescription>
              Finding and gathering contact information for potential clients
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="mb-2">Required Information for Each Lead</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm p-2 bg-slate-50 rounded">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Business Name</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm p-2 bg-slate-50 rounded">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Owner or Lead Doctor Name</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm p-2 bg-slate-50 rounded">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Email Address (verified)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm p-2 bg-slate-50 rounded">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Phone Number</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm p-2 bg-slate-50 rounded">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Website URL</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm p-2 bg-slate-50 rounded">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Instagram Handle</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm p-2 bg-slate-50 rounded">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Facebook Page</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm p-2 bg-slate-50 rounded">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Google My Business Link</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm p-2 bg-slate-50 rounded">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>City</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Verification
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Use Hunter.io or NeverBounce to verify email addresses before adding to the dashboard.
                  Invalid emails waste time and hurt deliverability.
                </p>
                <Badge variant="outline" className="text-xs">Required Step</Badge>
              </div>

              <Separator />

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="mb-2 flex items-center gap-2 text-amber-900">
                  <AlertTriangle className="w-4 h-4" />
                  Skip These Businesses
                </h4>
                <ul className="text-sm text-amber-800 space-y-1">
                  <li>• Businesses that look inactive or permanently closed</li>
                  <li>• Spammy or low-quality websites</li>
                  <li>• Businesses outside your target market/region</li>
                  <li>• Corporate chains (focus on independent businesses)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quality Control Checklist */}
        <Card className="mb-8 border-green-200 bg-green-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              Quality Control Checklist
            </CardTitle>
            <CardDescription>
              Before marking an audit as complete, verify:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>All 10 audit points have been scored (0-100)</span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>At least 1 screenshot captured for each audit category (10 total minimum)</span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Screenshots uploaded directly in the dashboard audit form</span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Notes written in clear English with specific, actionable insights</span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Contact information verified (email checked with Hunter.io)</span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Top 3 biggest opportunities highlighted in notes section</span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>All audit fields completed in the dashboard (no blank fields)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips for Writing Good Notes */}
        <Card className="mb-8 border-slate-200">
          <CardHeader>
            <CardTitle>Writing Effective Audit Notes</CardTitle>
            <CardDescription>
              How to document findings that Kyle can use for personalized outreach
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 text-green-700">✓ Good Notes Example</h4>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm">
                  "Website is dated (2018 design). Slow load time (4.2s). Mobile menu is broken. 
                  CTA buttons are not prominent. Could improve with modern redesign, speed optimization, 
                  and clearer New Patient Special offer above the fold."
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-red-700">✗ Bad Notes Example</h4>
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm">
                  "Website needs work."
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="mb-2">Notes Writing Guidelines</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>Be specific with numbers, dates, and metrics where possible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>Identify concrete problems AND suggest improvements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>Use short, clear sentences in English</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>Focus on what can be improved (opportunities for Yak Media)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>Mention what's working well too (builds credibility)</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resource Links */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Chrome className="w-5 h-5" />
              Essential Tools & Links
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-sm">Research Tools</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>• Meta Ad Library: facebook.com/ads/library</p>
                  <p>• Google Ad Transparency Center</p>
                  <p>• Google PageSpeed Insights</p>
                  <p>• Hunter.io / NeverBounce</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm">Browser Extensions</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>• Facebook Pixel Helper (Chrome)</p>
                  <p>• Google Tag Assistant (Chrome)</p>
                  <p>• Check My Links (Chrome)</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
