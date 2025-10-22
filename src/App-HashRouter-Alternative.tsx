// ALTERNATIVE VERSION USING HASHROUTER
// Use this if you can't configure your hosting provider
// URLs will be: success.yak.media/#/companyname instead of success.yak.media/companyname

import { HashRouter, Routes, Route } from "react-router-dom";
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
  // Check if we're on the success subdomain
  const isSuccessSubdomain = window.location.hostname === 'success.yak.media';

  return (
    <HashRouter>
      <Toaster position="top-right" richColors />
      <Routes>
        {/* Admin routes - for main app domain */}
        {!isSuccessSubdomain && (
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
          </>
        )}
        
        {/* Public report routes - will be success.yak.media/#/slug */}
        <Route path="/:slug" element={<PublicReportPage />} />
        <Route path="*" element={<PublicReportPage />} />
      </Routes>
    </HashRouter>
  );
}

// If you use this version, also update these files to generate HashRouter URLs:

// In AuditFormPage.tsx, change line ~138:
// const generatedUrl = `https://success.yak.media/#/${prospect.company_slug}`;

// In TestPage.tsx, change:
// const publicUrl = `https://success.yak.media/#/${testSlug}`;

// In TestReportLink.tsx, change:
// const reportUrl = `https://success.yak.media/#/${companySlug}`;
