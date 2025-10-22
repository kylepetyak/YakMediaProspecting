import { useState } from "react";
import { Link } from "react-router-dom";
import { projectId, publicAnonKey } from "../../utils/supabase/info";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { 
  Search, 
  ArrowLeft, 
  CheckCircle2, 
  XCircle,
  ExternalLink,
  Database
} from "lucide-react";

interface Prospect {
  id: string;
  company_name: string;
  company_slug: string;
  city: string;
  created_at: string;
}

export function DebugReportPage() {
  const [slug, setSlug] = useState("");
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [allProspects, setAllProspects] = useState<Prospect[]>([]);
  const [loadingAll, setLoadingAll] = useState(false);

  async function checkSlug() {
    if (!slug.trim()) return;
    
    setChecking(true);
    setResult(null);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5e752b5e/prospects/slug/${slug}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      const data = await response.json();

      setResult({
        status: response.ok ? 'success' : 'error',
        data: data,
        url: `https://success.yak.media/${slug}`
      });
    } catch (error) {
      setResult({
        status: 'error',
        error: String(error)
      });
    } finally {
      setChecking(false);
    }
  }

  async function loadAllProspects() {
    setLoadingAll(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5e752b5e/prospects`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      const data = await response.json();
      setAllProspects(data.prospects || []);
    } catch (error) {
      console.error('Error loading prospects:', error);
    } finally {
      setLoadingAll(false);
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
            <Search className="w-8 h-8 text-blue-600" />
            <h1>Report URL Debugger</h1>
          </div>
          <p className="text-muted-foreground">
            Check if a report exists and debug URL issues
          </p>
        </div>

        {/* Slug Checker */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Check Report URL</CardTitle>
            <CardDescription>
              Enter a company slug to see if the report exists
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="slug">Company Slug</Label>
              <div className="flex gap-2">
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="test-clinic"
                  onKeyDown={(e) => e.key === 'Enter' && checkSlug()}
                />
                <Button onClick={checkSlug} disabled={checking || !slug.trim()}>
                  {checking ? 'Checking...' : 'Check'}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Example: "test-clinic" or "peak-performance-chiropractic"
              </p>
            </div>

            {result && (
              <div className={`p-4 rounded-lg border ${
                result.status === 'success' 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center gap-2 mb-3">
                  {result.status === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <h4 className={result.status === 'success' ? 'text-green-800' : 'text-red-800'}>
                    {result.status === 'success' ? 'Report Found!' : 'Report Not Found'}
                  </h4>
                </div>

                {result.status === 'success' ? (
                  <>
                    <div className="space-y-2 mb-4">
                      <div className="text-sm">
                        <strong>Company:</strong> {result.data.prospect?.company_name}
                      </div>
                      <div className="text-sm">
                        <strong>Slug:</strong> {result.data.prospect?.company_slug}
                      </div>
                      <div className="text-sm">
                        <strong>Audit Exists:</strong> {result.data.audit ? '✅ Yes' : '❌ No (not generated yet)'}
                      </div>
                      <div className="text-sm">
                        <strong>Assets:</strong> {result.data.assets?.length || 0} screenshots
                      </div>
                    </div>
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open: {result.url}
                    </a>
                  </>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm text-red-800">
                      {result.data?.message || result.data?.error || 'No prospect found with this slug'}
                    </p>
                    <div className="bg-white rounded p-3 mt-3">
                      <p className="text-sm mb-2"><strong>To create this report:</strong></p>
                      <ol className="text-sm space-y-1 ml-4 list-decimal">
                        <li>Go to the Dashboard</li>
                        <li>Click "Add New Prospect"</li>
                        <li>Enter a company name that creates slug: <code className="bg-slate-100 px-1 rounded">{slug}</code></li>
                        <li>Complete the audit</li>
                        <li>Click "Generate / Update Report"</li>
                      </ol>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* All Prospects */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Available Reports</CardTitle>
                <CardDescription>
                  See all prospects in your database
                </CardDescription>
              </div>
              <Button onClick={loadAllProspects} disabled={loadingAll} variant="outline">
                <Database className="w-4 h-4 mr-2" />
                {loadingAll ? 'Loading...' : 'Load Prospects'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {allProspects.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                Click "Load Prospects" to see all available reports
              </p>
            ) : (
              <div className="space-y-3">
                {allProspects.map((prospect, index) => (
                  <div key={prospect.id}>
                    <div className="flex items-start justify-between py-2">
                      <div className="flex-1">
                        <h4 className="mb-1">{prospect.company_name}</h4>
                        <div className="space-y-1">
                          <div className="text-sm text-muted-foreground">
                            <strong>Slug:</strong> <code className="bg-slate-100 px-1 rounded">{prospect.company_slug}</code>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <strong>URL:</strong> <code className="text-xs">success.yak.media/{prospect.company_slug}</code>
                          </div>
                          {prospect.city && (
                            <div className="text-sm text-muted-foreground">
                              <strong>City:</strong> {prospect.city}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSlug(prospect.company_slug);
                            checkSlug();
                          }}
                        >
                          <Search className="w-4 h-4 mr-1" />
                          Check
                        </Button>
                        <a
                          href={`https://success.yak.media/${prospect.company_slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button size="sm">
                            <ExternalLink className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </a>
                      </div>
                    </div>
                    {index < allProspects.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Help */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">How Report URLs Work</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="mb-2">URL Format</h4>
              <code className="text-xs bg-white px-2 py-1 rounded">
                https://success.yak.media/[company-slug]
              </code>
            </div>

            <div>
              <h4 className="mb-2">Slug Generation</h4>
              <p className="text-muted-foreground mb-2">
                Company names are automatically converted to URL-safe slugs:
              </p>
              <ul className="space-y-1 ml-4 list-disc text-muted-foreground">
                <li>"Test Clinic" → <code>test-clinic</code></li>
                <li>"Peak Performance Chiropractic" → <code>peak-performance-chiropractic</code></li>
                <li>"Dr. Smith's Office" → <code>dr-smiths-office</code></li>
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="mb-2">⚠️ Important</h4>
              <p className="text-muted-foreground">
                Reports only work AFTER you:
              </p>
              <ol className="ml-4 list-decimal space-y-1 mt-2 text-muted-foreground">
                <li>Create a prospect in the dashboard</li>
                <li>Complete the audit form</li>
                <li>Click "Generate / Update Report"</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
