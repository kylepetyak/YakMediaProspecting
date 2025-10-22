import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { projectId, publicAnonKey } from "../../utils/supabase/info";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  FileText, 
  BookOpen, 
  Target, 
  Users, 
  TrendingUp,
  CheckCircle,
  Calendar,
  Eye,
  Database,
  AlertTriangle
} from "lucide-react";

export function HomePage() {
  const navigate = useNavigate();
  const [checkingDb, setCheckingDb] = useState(true);
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    checkDatabaseSetup();
  }, []);

  async function checkDatabaseSetup() {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5e752b5e/prospects`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        
        // Check if it's a table not found error
        if (errorData.code === 'PGRST205' || errorData.message?.includes('Could not find the table')) {
          setDbReady(false);
          setCheckingDb(false);
          return;
        }
      }
      
      // Database is ready
      setDbReady(true);
    } catch (error) {
      console.error('Error checking database:', error);
      setDbReady(false);
    } finally {
      setCheckingDb(false);
    }
  }

  if (checkingDb) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent mb-4"></div>
          <p className="text-muted-foreground">Checking database setup...</p>
        </div>
      </div>
    );
  }

  if (!dbReady) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <Card className="max-w-2xl border-amber-200 bg-amber-50/50">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-8 h-8 text-amber-600" />
              <CardTitle>Database Setup Required</CardTitle>
            </div>
            <CardDescription>
              Your database tables need to be created before you can use the app
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white rounded-lg p-4 border-l-4 border-amber-600">
              <h4 className="mb-3 text-amber-900">⚠️ Error: Table 'prospects' not found</h4>
              <p className="text-sm mb-3">
                <strong>You need to run the SQL setup script in Supabase.</strong>
              </p>
              <p className="text-sm mb-3">
                This is a <strong>one-time setup</strong> that takes less than 1 minute:
              </p>
              <ol className="text-sm space-y-2 ml-4 list-decimal">
                <li>Click "Setup Instructions" below</li>
                <li>Copy the SQL script</li>
                <li>Paste it in Supabase SQL Editor</li>
                <li>Run it</li>
                <li>Come back and refresh</li>
              </ol>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                💡 <strong>Tip:</strong> The setup page has step-by-step instructions and a copy button for the SQL script.
              </p>
            </div>
            
            <div className="flex flex-col gap-2">
              <Link to="/setup" className="w-full">
                <Button className="w-full bg-amber-600 hover:bg-amber-700" size="lg">
                  <Database className="w-5 h-5 mr-2" />
                  Go to Setup Instructions
                </Button>
              </Link>
              
              <Button
                variant="outline"
                onClick={checkDatabaseSetup}
                className="w-full"
              >
                ✅ I've Run the SQL - Check Again
              </Button>
            </div>
            
            <div className="text-xs text-muted-foreground text-center pt-2 border-t">
              See <code className="bg-white px-2 py-0.5 rounded">/DATABASE_SETUP.sql</code> or <code className="bg-white px-2 py-0.5 rounded">/QUICK_START.md</code> for details
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="mb-2">Arizona Chiropractic Marketing Audit Project</h1>
              <p className="text-muted-foreground">
                10-Point Marketing Analysis • 100 Chiropractors • Yak Media
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/setup">
                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 cursor-pointer">
                  <Database className="w-3 h-3 mr-1" />
                  Setup DB
                </Badge>
              </Link>
              <Link to="/verify">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verify Schema
                </Badge>
              </Link>
              <Link to="/debug">
                <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200 cursor-pointer">
                  <Eye className="w-3 h-3 mr-1" />
                  Debug Reports
                </Badge>
              </Link>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active Project</Badge>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-slate-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Goal</p>
                  <div className="text-2xl">100</div>
                </div>
                <Target className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Daily Goal</p>
                  <div className="text-2xl">10</div>
                </div>
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Time per Audit</p>
                  <div className="text-2xl">10-15<span className="text-sm text-muted-foreground ml-1">min</span></div>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Project Duration</p>
                  <div className="text-2xl">10<span className="text-sm text-muted-foreground ml-1">days</span></div>
                </div>
                <TrendingUp className="w-8 h-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-green-200 bg-green-50/50 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-600 rounded-lg">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle>Prospect Dashboard</CardTitle>
                    <CardDescription>Manage audits</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Create prospects, fill out audits, and generate public reports. The main workspace for completing your marketing audits.
              </p>
              <Link to="/dashboard">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Open Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50/50 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-600 rounded-lg">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle>Audit Guide</CardTitle>
                    <CardDescription>Step-by-step instructions</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Complete walkthrough of the 10-point marketing audit process, including tools, resources, and what to look for in each category.
              </p>
              <Link to="/guide">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Open Audit Guide
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50/50 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-600 rounded-lg">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle>Sample Report</CardTitle>
                    <CardDescription>Preview completed audit</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                View a sample audit report to see what the final deliverable looks like for prospects. This is what Kyle will customize for each chiropractor.
              </p>
              <Link to="/sample-report">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  View Sample Report
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Project Overview */}
        <Card className="mb-8 border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Project Overview
            </CardTitle>
            <CardDescription>
              What we're building and why it matters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="mb-2">Mission</h4>
                <p className="text-sm text-muted-foreground">
                  We are performing comprehensive 10-point marketing audits for 100 chiropractic clinics in Arizona. 
                  The goal is to gather clear data, screenshots, and notes that demonstrate where Yak Media can create 
                  better marketing outcomes.
                </p>
              </div>

              <div>
                <h4 className="mb-2">Your Role</h4>
                <p className="text-sm text-muted-foreground">
                  Your job is to make sure the information is accurate, visual, and actionable. Kyle will use the data 
                  you collect to build each chiropractor's personalized webpage audit and Loom video.
                </p>
              </div>

              <div>
                <h4 className="mb-2">Success Criteria</h4>
                <ul className="text-sm text-muted-foreground space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
                    <span>All 10 audit points scored and documented with screenshots</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
                    <span>Contact information verified (email, phone, website)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
                    <span>Notes written clearly with actionable insights</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
                    <span>Top 3 opportunities highlighted for each clinic</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resources */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Key Resources
            </CardTitle>
            <CardDescription>
              Tools and links you'll need
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-lg">
                <h4 className="mb-2">Data Collection</h4>
                <ul className="text-sm space-y-1">
                  <li>
                    • <a 
                      href="https://docs.google.com/spreadsheets/d/1iP-9HVn7zig3lbgTvJoKY0jmJ5qcNqy0QJqGyUIC33Y/edit?usp=sharing" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      Google Sheet
                    </a> <span className="text-muted-foreground">(for tracking)</span>
                  </li>
                  <li>
                    • <a 
                      href="https://drive.google.com/drive/folders/1Ch9BPZJJUV0_7po8pmVM0LZVowQ_Ew9q?usp=sharing" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      Google Drive
                    </a> <span className="text-muted-foreground">(for screenshots)</span>
                  </li>
                  <li className="text-muted-foreground">• Hunter.io / NeverBounce (email verification)</li>
                </ul>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg">
                <h4 className="mb-2">Research Tools</h4>
                <ul className="text-sm space-y-1">
                  <li>
                    • <a 
                      href="https://www.facebook.com/ads/library/?active_status=active&ad_type=political_and_issue_ads&country=US&is_targeted_country=false&media_type=all" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      Meta Ad Library
                    </a>
                  </li>
                  <li>
                    • <a 
                      href="https://adstransparency.google.com/?region=US" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      Google Ad Transparency
                    </a>
                  </li>
                  <li>
                    • <a 
                      href="https://pagespeed.web.dev/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      Google PageSpeed
                    </a>
                  </li>
                  <li className="text-muted-foreground">• Facebook Pixel Helper (Chrome Extension)</li>
                  <li className="text-muted-foreground">• Tag Assistant (Chrome Extension)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-100 rounded-lg flex-shrink-0">
              <Target className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h4 className="text-amber-900 mb-1">Important Reminder</h4>
              <p className="text-sm text-amber-800">
                Quality over speed. Each audit should be thorough and accurate. Skip any businesses that look inactive 
                or spammy. Every data point we collect will be used to create personalized outreach that wins clients.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
