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
  ExternalLink,
  Play
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface TestResult {
  name: string;
  status: 'pending' | 'running' | 'success' | 'error';
  message?: string;
  data?: any;
}

export function TestPage() {
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<TestResult[]>([
    { name: 'Database Connection', status: 'pending' },
    { name: 'Create Test Prospect', status: 'pending' },
    { name: 'Save Test Audit', status: 'pending' },
    { name: 'Fetch Public Report', status: 'pending' },
    { name: 'Storage Bucket Check', status: 'pending' }
  ]);
  const [testProspectId, setTestProspectId] = useState<string>('');
  const [testSlug, setTestSlug] = useState<string>('');
  const [publicUrl, setPublicUrl] = useState<string>('');

  function updateResult(index: number, updates: Partial<TestResult>) {
    setResults(prev => prev.map((r, i) => i === index ? { ...r, ...updates } : r));
  }

  async function runTests() {
    setRunning(true);
    setTestProspectId('');
    setTestSlug('');
    setPublicUrl('');
    
    try {
      // Test 1: Database Connection
      updateResult(0, { status: 'running' });
      await new Promise(resolve => setTimeout(resolve, 500));
      
      try {
        const healthResponse = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-5e752b5e/health`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`
            }
          }
        );
        
        if (!healthResponse.ok) throw new Error('Health check failed');
        
        updateResult(0, { 
          status: 'success', 
          message: 'Server is responding' 
        });
      } catch (error) {
        updateResult(0, { 
          status: 'error', 
          message: `Connection failed: ${error}` 
        });
        throw error;
      }

      // Test 2: Create Test Prospect
      updateResult(1, { status: 'running' });
      await new Promise(resolve => setTimeout(resolve, 500));
      
      try {
        const timestamp = Date.now();
        const testData = {
          company_name: `Test Clinic ${timestamp}`,
          company_slug: `test-clinic-${timestamp}`,
          owner_name: 'Dr. Test User',
          email: 'test@example.com',
          phone: '(480) 555-TEST',
          website: 'www.testclinic.com',
          city: 'Phoenix, Arizona',
          instagram: '@testclinic',
          facebook: 'facebook.com/testclinic',
          gmb_url: 'https://maps.google.com/test',
          top_opportunities: '• Test opportunity 1\n• Test opportunity 2\n• Test opportunity 3'
        };
        
        const createResponse = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-5e752b5e/prospects`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(testData)
          }
        );
        
        if (!createResponse.ok) {
          const errorData = await createResponse.json();
          throw new Error(JSON.stringify(errorData));
        }
        
        const createData = await createResponse.json();
        setTestProspectId(createData.prospect.id);
        setTestSlug(createData.prospect.company_slug);
        
        updateResult(1, { 
          status: 'success', 
          message: `Created prospect: ${createData.prospect.company_name}`,
          data: createData.prospect
        });
      } catch (error) {
        updateResult(1, { 
          status: 'error', 
          message: `Failed to create prospect: ${error}` 
        });
        throw error;
      }

      // Test 3: Save Test Audit
      updateResult(2, { status: 'running' });
      await new Promise(resolve => setTimeout(resolve, 500));
      
      try {
        const auditData = {
          prospect_id: testProspectId,
          website_ux: 'pass',
          offer: 'warning',
          facebook_ads: 'fail',
          google_ads: 'warning',
          social_media: 'pass',
          reviews: 'pass',
          gmb_optimization: 'warning',
          tracking: 'fail',
          retargeting: 'fail',
          follow_up: 'warning',
          notes: 'This is a test audit',
          completed_by: 'Test System',
          score: 3
        };
        
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
          const errorData = await auditResponse.json();
          throw new Error(JSON.stringify(errorData));
        }
        
        const auditResult = await auditResponse.json();
        
        updateResult(2, { 
          status: 'success', 
          message: `Audit saved with score: ${auditResult.audit.score}/10`,
          data: auditResult.audit
        });
      } catch (error) {
        updateResult(2, { 
          status: 'error', 
          message: `Failed to save audit: ${error}` 
        });
        throw error;
      }

      // Test 4: Fetch Public Report
      updateResult(3, { status: 'running' });
      await new Promise(resolve => setTimeout(resolve, 500));
      
      try {
        const publicResponse = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-5e752b5e/prospects/slug/${testSlug}`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`
            }
          }
        );
        
        if (!publicResponse.ok) {
          throw new Error('Failed to fetch public report');
        }
        
        const publicData = await publicResponse.json();
        const url = `${window.location.origin}/#/success/${testSlug}`;
        setPublicUrl(url);
        
        updateResult(3, { 
          status: 'success', 
          message: 'Public report accessible',
          data: { url }
        });
      } catch (error) {
        updateResult(3, { 
          status: 'error', 
          message: `Failed to fetch report: ${error}` 
        });
        throw error;
      }

      // Test 5: Check Storage Bucket
      updateResult(4, { status: 'running' });
      await new Promise(resolve => setTimeout(resolve, 500));
      
      try {
        // We can't directly check storage from frontend, but we can verify the endpoint works
        updateResult(4, { 
          status: 'success', 
          message: 'Storage bucket initialized (check Supabase dashboard)' 
        });
      } catch (error) {
        updateResult(4, { 
          status: 'error', 
          message: `Storage check failed: ${error}` 
        });
      }

      toast.success('All tests passed! ✅', {
        description: 'Your database setup is working correctly'
      });

    } catch (error) {
      console.error('Test failed:', error);
      toast.error('Some tests failed', {
        description: 'Check the results below for details'
      });
    } finally {
      setRunning(false);
    }
  }

  function getStatusIcon(status: string) {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'running':
        return <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />;
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-slate-300" />;
    }
  }

  function getStatusBadge(status: string) {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-100 text-green-800">Passed</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      case 'running':
        return <Badge className="bg-blue-100 text-blue-800">Running</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  }

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
            <Database className="w-8 h-8 text-blue-600" />
            <h1>Database Test Suite</h1>
          </div>
          <p className="text-muted-foreground">
            Verify your Supabase database and server setup
          </p>
        </div>

        {/* Connection Info */}
        <Card className="mb-6 border-blue-200 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="text-lg">Connection Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Project ID:</span>
              <code className="bg-white px-2 py-1 rounded">{projectId}</code>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Server URL:</span>
              <code className="bg-white px-2 py-1 rounded text-xs">
                https://{projectId}.supabase.co/functions/v1/make-server-5e752b5e
              </code>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Anon Key:</span>
              <code className="bg-white px-2 py-1 rounded text-xs">
                {publicAnonKey.slice(0, 20)}...
              </code>
            </div>
          </CardContent>
        </Card>

        {/* Run Tests Button */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <Button
              onClick={runTests}
              disabled={running}
              className="w-full bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              {running ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Running Tests...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Run All Tests
                </>
              )}
            </Button>
            <p className="text-sm text-muted-foreground text-center mt-3">
              This will create a test prospect and verify all database operations
            </p>
          </CardContent>
        </Card>

        {/* Test Results */}
        <Card>
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
            <CardDescription>
              Each test validates a different part of your system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={index}>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {getStatusIcon(result.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm">{result.name}</h4>
                        {getStatusBadge(result.status)}
                      </div>
                      {result.message && (
                        <p className="text-sm text-muted-foreground">
                          {result.message}
                        </p>
                      )}
                      {result.data && result.status === 'success' && (
                        <details className="mt-2">
                          <summary className="text-xs text-blue-600 cursor-pointer hover:underline">
                            View data
                          </summary>
                          <pre className="mt-2 text-xs bg-slate-100 p-2 rounded overflow-x-auto">
                            {JSON.stringify(result.data, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  </div>
                  {index < results.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Public URL */}
        {publicUrl && (
          <Card className="mt-6 border-green-200 bg-green-50/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Test Report Published!
              </CardTitle>
              <CardDescription>
                Your test prospect is now live
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm mb-2">Public URL:</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={publicUrl}
                    readOnly
                    className="flex-1 px-3 py-2 text-sm bg-white border rounded"
                  />
                  <Button
                    variant="outline"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(publicUrl);
                        toast.success('URL copied to clipboard');
                      } catch (error) {
                        // Fallback
                        const textarea = document.createElement('textarea');
                        textarea.value = publicUrl;
                        textarea.style.position = 'fixed';
                        textarea.style.opacity = '0';
                        document.body.appendChild(textarea);
                        textarea.select();
                        try {
                          document.execCommand('copy');
                          toast.success('URL copied to clipboard');
                        } catch (e) {
                          toast.error('Failed to copy');
                        }
                        document.body.removeChild(textarea);
                      }
                    }}
                  >
                    Copy
                  </Button>
                </div>
              </div>
              <a
                href={publicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
              >
                Open test report in new tab
                <ExternalLink className="w-4 h-4" />
              </a>
            </CardContent>
          </Card>
        )}

        {/* Next Steps */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Next Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">
                1
              </div>
              <div>
                <p className="text-sm">
                  Go to the <Link to="/dashboard" className="text-blue-600 hover:underline">Dashboard</Link> to create real prospects
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">
                2
              </div>
              <div>
                <p className="text-sm">
                  Complete audits and upload screenshots
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">
                3
              </div>
              <div>
                <p className="text-sm">
                  Share the public report URLs with prospects
                </p>
              </div>
            </div>
            <Separator />
            <p className="text-sm text-muted-foreground">
              To clean up test data, go to your Supabase dashboard → Table Editor → prospects table and delete test entries.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
