import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { projectId, publicAnonKey } from "../../utils/supabase/info";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  ExternalLink,
  ArrowRight,
  Database,
  Copy,
  RefreshCw
} from "lucide-react";
import { toast } from "sonner@2.0.3";

export function SetupCheckPage() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [tablesExist, setTablesExist] = useState(false);
  const [sqlCopied, setSqlCopied] = useState(false);

  useEffect(() => {
    checkDatabaseSetup();
  }, []);

  async function checkDatabaseSetup() {
    setChecking(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5e752b5e/prospects`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      // If we get a successful response or even an empty array, tables exist
      if (response.ok) {
        setTablesExist(true);
      } else {
        const errorData = await response.json();
        // PGRST205 = table not found
        if (errorData.code === 'PGRST205') {
          setTablesExist(false);
        } else {
          // Some other error, but tables might exist
          setTablesExist(true);
        }
      }
    } catch (error) {
      console.error('Error checking database:', error);
      setTablesExist(false);
    } finally {
      setChecking(false);
    }
  }

  const sqlSetup = `-- Run this in Supabase SQL Editor
-- Go to: https://supabase.com/dashboard/project/${projectId}/editor

CREATE TABLE IF NOT EXISTS public.prospects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  company_slug TEXT UNIQUE NOT NULL,
  owner_name TEXT,
  email TEXT,
  phone TEXT,
  website TEXT,
  instagram TEXT,
  facebook TEXT,
  gmb_url TEXT,
  city TEXT,
  top_opportunities TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.audits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prospect_id UUID REFERENCES public.prospects(id) ON DELETE CASCADE,
  website_ux TEXT CHECK (website_ux IN ('pass', 'warning', 'fail')),
  offer TEXT CHECK (offer IN ('pass', 'warning', 'fail')),
  facebook_ads TEXT CHECK (facebook_ads IN ('pass', 'warning', 'fail')),
  google_ads TEXT CHECK (google_ads IN ('pass', 'warning', 'fail')),
  social_media TEXT CHECK (social_media IN ('pass', 'warning', 'fail')),
  reviews TEXT CHECK (reviews IN ('pass', 'warning', 'fail')),
  gmb_optimization TEXT CHECK (gmb_optimization IN ('pass', 'warning', 'fail')),
  tracking TEXT CHECK (tracking IN ('pass', 'warning', 'fail')),
  retargeting TEXT CHECK (retargeting IN ('pass', 'warning', 'fail')),
  follow_up TEXT CHECK (follow_up IN ('pass', 'warning', 'fail')),
  notes TEXT,
  completed_by TEXT,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  score INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prospect_id UUID REFERENCES public.prospects(id) ON DELETE CASCADE,
  kind TEXT NOT NULL,
  label TEXT NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_prospects_slug ON public.prospects(company_slug);
CREATE INDEX IF NOT EXISTS idx_audits_prospect ON public.audits(prospect_id);
CREATE INDEX IF NOT EXISTS idx_assets_prospect ON public.assets(prospect_id);

ALTER TABLE public.prospects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all access to prospects" ON public.prospects
  FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to audits" ON public.audits
  FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to assets" ON public.assets
  FOR ALL USING (true) WITH CHECK (true);

GRANT ALL ON public.prospects TO anon, authenticated;
GRANT ALL ON public.audits TO anon, authenticated;
GRANT ALL ON public.assets TO anon, authenticated;`;

  async function copySQL() {
    try {
      await navigator.clipboard.writeText(sqlSetup);
      setSqlCopied(true);
      toast.success('SQL copied to clipboard!');
      setTimeout(() => setSqlCopied(false), 3000);
    } catch (error) {
      // Fallback for browsers that block clipboard API
      const textarea = document.createElement('textarea');
      textarea.value = sqlSetup;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        setSqlCopied(true);
        toast.success('SQL copied to clipboard!');
        setTimeout(() => setSqlCopied(false), 3000);
      } catch (e) {
        toast.error('Failed to copy. Please select and copy manually.');
      }
      document.body.removeChild(textarea);
    }
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent mb-4"></div>
            <p className="text-muted-foreground">Checking database setup...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (tablesExist) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <Card className="max-w-md border-green-200 bg-green-50/50">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
              <CardTitle>Database Ready!</CardTitle>
            </div>
            <CardDescription>
              Your Supabase database is configured correctly
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white rounded-lg p-4">
              <h4 className="mb-2">✅ Tables Created</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• prospects</li>
                <li>• audits</li>
                <li>• assets</li>
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <Link to="/dashboard" className="w-full">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              
              <Link to="/test">
                <Button variant="outline" className="w-full">
                  Run Full Test Suite
                </Button>
              </Link>
              
              <Link to="/">
                <Button variant="ghost" className="w-full">
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <Card className="border-amber-200 bg-amber-50/50 mb-6">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-8 h-8 text-amber-600" />
              <CardTitle>Database Setup Required</CardTitle>
            </div>
            <CardDescription>
              Your database tables need to be created before you can use the app
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm mb-4">
                Follow these steps to set up your database:
              </p>
              <ol className="text-sm space-y-3">
                <li className="flex items-start gap-2">
                  <Badge className="mt-0.5">1</Badge>
                  <div className="flex-1">
                    <p>Copy the SQL below (click the copy button)</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Badge className="mt-0.5">2</Badge>
                  <div className="flex-1">
                    <p>Open your Supabase SQL Editor</p>
                    <a 
                      href={`https://supabase.com/dashboard/project/${projectId}/editor`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-xs flex items-center gap-1 mt-1"
                    >
                      Open SQL Editor
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Badge className="mt-0.5">3</Badge>
                  <div className="flex-1">
                    <p>Paste the SQL and click "Run" (or press Cmd/Ctrl + Enter)</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Badge className="mt-0.5">4</Badge>
                  <div className="flex-1">
                    <p>Come back here and click "Check Again"</p>
                  </div>
                </li>
              </ol>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  SQL Setup Script
                </CardTitle>
                <CardDescription>Copy and paste this into Supabase SQL Editor</CardDescription>
              </div>
              <Button
                onClick={copySQL}
                variant={sqlCopied ? "default" : "outline"}
                className={sqlCopied ? "bg-green-600 hover:bg-green-700" : ""}
              >
                {sqlCopied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy SQL
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-xs">
              {sqlSetup}
            </pre>
          </CardContent>
        </Card>

        <div className="flex gap-3 mt-6">
          <Button
            onClick={checkDatabaseSetup}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Check Again
          </Button>
          <Link to="/" className="flex-1">
            <Button variant="outline" className="w-full">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
