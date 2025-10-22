import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner@2.0.3";
import { AuthProvider } from "./components/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { HomePage } from "./components/pages/HomePage";
import { LoginPage } from "./components/pages/LoginPage";
import { DashboardPage } from "./components/pages/DashboardPage";
import { AuditFormPage } from "./components/pages/AuditFormPage";
import { PublicReportPage } from "./components/pages/PublicReportPage";
import { CreateUserPage } from "./components/pages/CreateUserPage";
import { ManageUsersPage } from "./components/pages/ManageUsersPage";
import { InitialSetupPage } from "./components/pages/InitialSetupPage";
import { AuditGuide } from "./components/AuditGuide";

export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <Toaster position="top-right" richColors />
        <Routes>
          {/* Home page (public) */}
          <Route path="/" element={<HomePage />} />
          
          {/* Initial setup - create first admin account (public) */}
          <Route path="/initial-setup" element={<InitialSetupPage />} />
          
          {/* Login page (public) */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* User management - protected */}
          <Route path="/create-user" element={<ProtectedRoute><CreateUserPage /></ProtectedRoute>} />
          <Route path="/manage-users" element={<ProtectedRoute><ManageUsersPage /></ProtectedRoute>} />
          
          {/* Audit Guide - protected */}
          <Route path="/audit-guide" element={<ProtectedRoute><AuditGuide /></ProtectedRoute>} />
          
          {/* Dashboard - protected */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/dashboard/audit/:prospectId" element={<ProtectedRoute><AuditFormPage /></ProtectedRoute>} />
          
          {/* Public report routes - must be after other routes to catch company slugs */}
          <Route path="/:slug" element={<PublicReportPage />} />
        </Routes>
      </AuthProvider>
    </HashRouter>
  );
}
