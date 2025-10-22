import { useState } from "react";
import { Link } from "react-router-dom";
import { projectId, publicAnonKey } from "../../utils/supabase/info";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { 
  CheckCircle2, 
  XCircle, 
  Loader2, 
  Database,
  ArrowLeft,
  Play,
  Copy,
  AlertTriangle,
  ExternalLink
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface ColumnCheck {
  column: string;
  exists: boolean;
  checked: boolean;
}

export function DatabaseVerifyPage() {
  const [checking, setChecking] = useState(false);
  const [results, setResults] = useState<ColumnCheck[]>([]);
  const [testPassed, setTestPassed] = useState(false);

  const requiredColumns = [
    'website_ux_notes',
    'offer_notes',
    'facebook_ads_notes',
    'google_ads_notes',
    'social_media_notes',
    'reviews_notes',
    'gmb_optimization_notes',
    'tracking_notes',
    'retargeting_notes',
    'follow_up_notes'
  ];

  const alterTableSQL = `-- Add note columns to audits table
ALTER TABLE public.audits 
  ADD COLUMN IF NOT EXISTS website_ux_notes TEXT,
  ADD COLUMN IF NOT EXISTS offer_notes TEXT,
  ADD COLUMN IF NOT EXISTS facebook_ads_notes TEXT,
  ADD COLUMN IF NOT EXISTS google_ads_notes TEXT,
  ADD COLUMN IF NOT EXISTS social_media_notes TEXT,
  ADD COLUMN IF NOT EXISTS reviews_notes TEXT,
  ADD COLUMN IF NOT EXISTS gmb_optimization_notes TEXT,
  ADD COLUMN IF NOT EXISTS tracking_notes TEXT,
  ADD COLUMN IF NOT EXISTS retargeting_notes TEXT,
  ADD COLUMN IF NOT EXISTS follow_up_notes TEXT;`;

  async function verifyDatabase() {
    setChecking(true);
    setResults([]);
    setTestPassed(false);

    try {
      // Create a test prospect with all note fields
      const timestamp = Date.now();
      const testProspect = {
        company_name: `Schema Test ${timestamp}`,
        company_slug: `schema-test-${timestamp}`,
        city: 'Test City'
      };

      // Create prospect
      const prospectResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5e752b5e/prospects`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(testProspect)
        }
      );

      if (!prospectResponse.ok) {
        throw new Error('Failed to create test prospect');
      }

      const { prospect } = await prospectResponse.json();

      // Try to create an audit with all note fields
      const auditData: any = {
        prospect_id: prospect.id,
        website_ux: 'pass',
        offer: 'pass',
        facebook_ads: 'pass',
        google_ads: 'pass',
        social_media: 'pass',
        reviews: 'pass',
        gmb_optimization: 'pass',
        tracking: 'pass',
        retargeting: 'pass',
        follow_up: 'pass',
        score: 10
      };

      // Add all note fields
      requiredColumns.forEach(column => {
        auditData[column] = `Test note for ${column}`;
      });

      // Try to insert
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

      if (!auditResponse.ok) {
        const error = await auditResponse.json();
        console.error('Audit creation error:', error);
        
        // Parse error to find missing columns
        const errorMessage = error.message || JSON.stringify(error);
        const columnResults: ColumnCheck[] = requiredColumns.map(col => ({
          column: col,
          exists: !errorMessage.includes(col),
          checked: true
        }));
        
        setResults(columnResults);
        
        const allExist = columnResults.every(r => r.exists);
        setTestPassed(allExist);
        
        if (!allExist) {
          toast.error('Missing columns detected', {
            description: 'Some note columns need to be added to the database'
          });
        }
        
        return;
      }

      const { audit } = await auditResponse.json();

      // Verify all columns were saved
      const columnResults: ColumnCheck[] = requiredColumns.map(col => ({
        column: col,
        exists: audit[col] !== undefined && audit[col] !== null,
        checked: true
      }));

      setResults(columnResults);
      const allExist = columnResults.every(r => r.exists);
      setTestPassed(allExist);

      if (allExist) {
        toast.success('All columns verified! ✅', {
          description: 'Database schema is up to date'
        });
      } else {
        toast.error('Missing columns detected', {
          description: 'Some note columns are missing from the database'
        });
      }

    } catch (error) {
      console.error('Verification error:', error);
      toast.error('Verification failed', {
        description: String(error)
      });
    } finally {
      setChecking(false);
    }
  }

  async function copySQL() {
    try {
      await navigator.clipboard.writeText(alterTableSQL);
      toast.success('SQL copied to clipboard!');
    } catch (error) {
      // Fallback for browsers that block clipboard API
      const textarea = document.createElement('textarea');
      textarea.value = alterTableSQL;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        toast.success('SQL copied to clipboard!');
      } catch (e) {
        toast.error('Failed to copy. Please select and copy manually.');
      }
      document.body.removeChild(textarea);
    }
  }

  const missingColumns = results.filter(r => !r.exists);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <div className="flex items-center gap-3 mb-2">
            <Database className="w-8 h-8 text-purple-600" />
            <h1>Database Schema Verification</h1>
          </div>
          <p className="text-muted-foreground">
            Verify that all note columns have been added to the audits table
          </p>
        </div>

        {/* Connection Info */}
        <Card className="mb-6 border-purple-200 bg-purple-50/50">
          <CardHeader>
            <CardTitle className="text-lg">What This Checks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              This verification tool tests if the 10 new note columns have been successfully added to your <code className="bg-white px-1 py-0.5 rounded">audits</code> table:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {requiredColumns.map(col => (
                <div key={col} className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-1 h-1 rounded-full bg-purple-600"></div>
                  <code>{col}</code>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Run Verification */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <Button
              onClick={verifyDatabase}
              disabled={checking}
              className="w-full bg-purple-600 hover:bg-purple-700"
              size="lg"
            >
              {checking ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Checking Database...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Run Schema Verification
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {results.length > 0 && (
          <Card className={`mb-6 ${testPassed ? 'border-green-200 bg-green-50/50' : 'border-amber-200 bg-amber-50/50'}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {testPassed ? (
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  ) : (
                    <AlertTriangle className="w-6 h-6 text-amber-600" />
                  )}
                  <div>
                    <CardTitle>
                      {testPassed ? 'All Columns Present ✅' : 'Missing Columns Detected'}
                    </CardTitle>
                    <CardDescription>
                      {testPassed 
                        ? 'Your database schema is up to date'
                        : `${missingColumns.length} column${missingColumns.length !== 1 ? 's' : ''} need${missingColumns.length === 1 ? 's' : ''} to be added`
                      }
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {results.map((result, index) => (
                  <div key={result.column}>
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        {result.exists ? (
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-600" />
                        )}
                        <code className="text-sm">{result.column}</code>
                      </div>
                      <Badge 
                        className={result.exists 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                        }
                      >
                        {result.exists ? 'Present' : 'Missing'}
                      </Badge>
                    </div>
                    {index < results.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* SQL Script */}
        {(!testPassed && results.length > 0) && (
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    Run This SQL to Fix
                  </CardTitle>
                  <CardDescription>
                    Copy and run this in Supabase SQL Editor
                  </CardDescription>
                </div>
                <Button onClick={copySQL} variant="outline">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy SQL
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-xs">
                {alterTableSQL}
              </pre>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="mb-2 flex items-center gap-2 text-sm">
                  <AlertTriangle className="w-4 h-4 text-blue-600" />
                  How to Apply
                </h4>
                <ol className="text-sm space-y-2 ml-6 list-decimal">
                  <li>Click "Copy SQL" button above</li>
                  <li>
                    <a 
                      href={`https://supabase.com/dashboard/project/${projectId}/editor`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline inline-flex items-center gap-1"
                    >
                      Open Supabase SQL Editor
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                  <li>Paste the SQL and click "Run"</li>
                  <li>Come back here and click "Run Schema Verification" again</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Success Actions */}
        {testPassed && results.length > 0 && (
          <Card className="border-green-200 bg-green-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                You're All Set!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                Your database has all the required columns. You can now use the detailed notes feature when completing audits.
              </p>
              <div className="flex gap-2">
                <Link to="/dashboard" className="flex-1">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Go to Dashboard
                  </Button>
                </Link>
                <Link to="/test" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Run Full Tests
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">About Note Columns</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>
              These columns store detailed observations for each of the 10 audit categories. When your team completes an audit, they can now add:
            </p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Specific findings (e.g., "Load time 4.2s, mobile menu broken")</li>
              <li>Technical details from the audit guide</li>
              <li>Actionable insights for prospects</li>
            </ul>
            <p>
              These notes appear on the public report page, making the audit more valuable and detailed.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
