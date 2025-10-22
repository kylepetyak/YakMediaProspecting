import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner@2.0.3";
import { HomePage } from "./components/pages/HomePage";
import { AuditGuidePage } from "./components/pages/AuditGuidePage";
import { SampleReportPage } from "./components/pages/SampleReportPage";
import { DashboardPage } from "./components/pages/DashboardPage";
import { AuditFormPage } from "./components/pages/AuditFormPage";
import { PublicReportPage } from "./components/pages/PublicReportPage";
import { TestPage } from "./components/pages/TestPage";
import { SetupCheckPage } from "./components/pages/SetupCheckPage";
import { DatabaseVerifyPage } from "./components/pages/DatabaseVerifyPage";
import { DebugReportPage } from "./components/pages/DebugReportPage";
import { QuickStartPage } from "./components/pages/QuickStartPage";

export default function App() {
  // Check if we're on the success subdomain or viewing a report
  const isSuccessSubdomain = window.location.hostname === 'success.yak.media';

  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Routes>
        {isSuccessSubdomain ? (
          /* Public report routes - for success.yak.media subdomain */
          <>
            <Route path="/:slug" element={<PublicReportPage />} />
            <Route path="*" element={<PublicReportPage />} />
          </>
        ) : (
          /* Admin routes - for main app domain */
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/guide" element={<AuditGuidePage />} />
            <Route path="/sample-report" element={<SampleReportPage />} />
            <Route path="/quick-start" element={<QuickStartPage />} />
            <Route path="/setup" element={<SetupCheckPage />} />
            <Route path="/verify" element={<DatabaseVerifyPage />} />
            <Route path="/debug" element={<DebugReportPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/audit/:prospectId" element={<AuditFormPage />} />
            <Route path="/test" element={<TestPage />} />
            {/* Allow viewing public reports on main domain too (for testing) */}
            <Route path="/report/:slug" element={<PublicReportPage />} />
            <Route path="*" element={<HomePage />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

// Sample data for reports
export const sampleAuditData = {
    businessName: "Peak Performance Chiropractic",
    ownerName: "Dr. Sarah Martinez",
    city: "Scottsdale, Arizona",
    auditDate: "October 2025",
    overallScore: 43,
    website: "www.peakperformancechiro.com",
    phone: "(480) 555-1234",
    
    auditPoints: [
      {
        id: 1,
        area: "Website UX",
        description: "Modern design, speed, mobile-friendly, clear CTAs",
        status: "warning" as const,
        score: 50,
        notes: "Website is dated (2018 design). Slow load time (4.2s). Mobile menu is broken. CTA buttons are not prominent.",
        screenshot: "homepage-screenshot.png"
      },
      {
        id: 2,
        area: "Offer",
        description: "Compelling new patient or consultation offer",
        status: "fail" as const,
        score: 20,
        notes: "No clear new patient offer visible. Generic 'Book Now' button with no incentive or value proposition.",
        screenshot: "offer-screenshot.png"
      },
      {
        id: 3,
        area: "Facebook Ads",
        description: "Active ad campaigns and targeting strategy",
        status: "fail" as const,
        score: 0,
        notes: "Not running any Facebook ads. Meta Ad Library shows no active campaigns in the past 90 days.",
        screenshot: "facebook-ads-screenshot.png"
      },
      {
        id: 4,
        area: "Google Ads",
        description: "Search and display advertising presence",
        status: "warning" as const,
        score: 40,
        notes: "Running basic search ads but no display/retargeting. Ad copy is generic. Not bidding on competitor keywords.",
        screenshot: "google-ads-screenshot.png"
      },
      {
        id: 5,
        area: "Social Media",
        description: "Content frequency, engagement, and quality",
        status: "warning" as const,
        score: 50,
        notes: "Instagram: 2-3 posts per month, low engagement. Facebook: Inconsistent posting. No video content strategy.",
        screenshot: "social-media-screenshot.png"
      },
      {
        id: 6,
        area: "Reviews",
        description: "Google review quantity and average rating",
        status: "pass" as const,
        score: 80,
        notes: "47 Google reviews, 4.6★ average. Good! But not actively requesting new reviews or responding to all feedback.",
        screenshot: "reviews-screenshot.png"
      },
      {
        id: 7,
        area: "GMB Optimization",
        description: "Photos, posts, updated business information",
        status: "warning" as const,
        score: 45,
        notes: "Basic info is complete but no recent posts. Only 12 photos (mostly outdated). Missing Q&A section optimization.",
        screenshot: "gmb-screenshot.png"
      },
      {
        id: 8,
        area: "Tracking",
        description: "Facebook Pixel and Google Tag implementation",
        status: "fail" as const,
        score: 30,
        notes: "Facebook Pixel installed but not firing correctly. Google Analytics present but no conversion tracking configured.",
        screenshot: "tracking-screenshot.png"
      },
      {
        id: 9,
        area: "Retargeting",
        description: "Retargeting campaigns to warm audiences",
        status: "fail" as const,
        score: 0,
        notes: "No retargeting campaigns active. Missing significant opportunity to re-engage website visitors and leads.",
        screenshot: "retargeting-screenshot.png"
      },
      {
        id: 10,
        area: "Follow-Up System",
        description: "Automated email/SMS lead nurture sequence",
        status: "fail" as const,
        score: 15,
        notes: "Basic contact form with no automation. No email confirmation sent. No SMS follow-up. Manual process only.",
        screenshot: "followup-screenshot.png"
      }
    ],
    
    topOpportunities: [
      {
        title: "Implement Retargeting Campaigns",
        impact: "High",
        description: "You're missing 70-80% of potential patients who visit your site. Retargeting can bring them back at 10x lower cost per acquisition."
      },
      {
        title: "Create Compelling New Patient Offer",
        impact: "High",
        description: "A strong offer (e.g., $49 New Patient Special) can increase conversion rates by 200-400%. Your competitors are using offers—you should too."
      },
      {
        title: "Launch Facebook Lead Campaigns",
        impact: "High",
        description: "Facebook ads targeting local back pain, sciatica, and wellness keywords can generate 20-40 qualified leads per month at $15-25 per lead."
      }
    ]
  };
