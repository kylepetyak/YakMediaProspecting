import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  CheckCircle, 
  ArrowRight, 
  FileText, 
  Upload, 
  Send,
  AlertCircle
} from "lucide-react";

export function QuickStartPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="mb-3">Quick Start Guide</h1>
          <p className="text-lg text-muted-foreground">
            Create your first prospect report in 5 minutes
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {/* Step 1 */}
          <Card className="border-2 hover:border-blue-300 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center">
                  1
                </div>
                <div>
                  <CardTitle>Create a New Prospect</CardTitle>
                  <CardDescription>Add your chiropractor clinic to the system</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="ml-13 space-y-3">
                <p className="text-sm text-muted-foreground">
                  Go to the Dashboard and click "Add New Prospect"
                </p>
                <div className="bg-slate-50 p-3 rounded-lg border">
                  <p className="text-sm mb-2"><strong>Required:</strong></p>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                    <li><strong>Company Name:</strong> "Peak Performance Chiropractic"</li>
                    <li><strong>City:</strong> "Phoenix, AZ" (optional but recommended)</li>
                  </ul>
                  <p className="text-xs text-muted-foreground mt-2">
                    💡 The system automatically creates a URL slug from the company name
                  </p>
                </div>
                <Link to="/dashboard">
                  <Button className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    Go to Dashboard
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Step 2 */}
          <Card className="border-2 hover:border-blue-300 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center">
                  2
                </div>
                <div>
                  <CardTitle>Complete the 10-Point Audit</CardTitle>
                  <CardDescription>Evaluate their marketing across all channels</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="ml-13 space-y-3">
                <p className="text-sm text-muted-foreground">
                  Click "Complete Audit" on your prospect, then for each category:
                </p>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="bg-green-50 border border-green-200 p-2 rounded text-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mx-auto mb-1" />
                    <div className="text-xs">✅ Pass</div>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 p-2 rounded text-center">
                    <AlertCircle className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                    <div className="text-xs">⚠️ Warning</div>
                  </div>
                  <div className="bg-red-50 border border-red-200 p-2 rounded text-center">
                    <AlertCircle className="w-4 h-4 text-red-600 mx-auto mb-1" />
                    <div className="text-xs">❌ Fail</div>
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                  <p className="text-sm mb-2"><strong>Pro Tips:</strong></p>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                    <li>Add detailed notes for each category</li>
                    <li>Upload screenshots (optional but impactful)</li>
                    <li>Fill out "Top 3 Opportunities" at the bottom</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 3 */}
          <Card className="border-2 hover:border-blue-300 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center">
                  3
                </div>
                <div>
                  <CardTitle>Generate the Public Report</CardTitle>
                  <CardDescription>Create the shareable URL</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="ml-13 space-y-3">
                <p className="text-sm text-muted-foreground">
                  Scroll to the bottom of the audit form and click:
                </p>
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-lg text-center">
                  <Send className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-medium">Generate / Update Report</div>
                </div>
                <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                  <p className="text-sm mb-2"><strong>✅ Success! You'll see:</strong></p>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                    <li>A green box with your public URL</li>
                    <li>Format: <code className="bg-white px-1 rounded">success.yak.media/company-name</code></li>
                    <li>Copy button to share with your prospect</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 4 */}
          <Card className="border-2 border-green-300 bg-green-50/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center">
                  ✓
                </div>
                <div>
                  <CardTitle>Share with Your Prospect</CardTitle>
                  <CardDescription>Send them the personalized audit report</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="ml-13 space-y-3">
                <p className="text-sm text-muted-foreground">
                  The report is now live! You can:
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 ml-4 list-disc">
                  <li>Copy the URL and send via email</li>
                  <li>Include it in a Loom video</li>
                  <li>Reference it during sales calls</li>
                  <li>Update it anytime by re-generating</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Example */}
        <Card className="mt-8 border-2 border-purple-200 bg-purple-50/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>📝</span> Example
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Badge className="mb-2">Input</Badge>
                <div className="bg-white p-3 rounded-lg border text-sm">
                  <strong>Company Name:</strong> Peak Performance Chiropractic<br />
                  <strong>City:</strong> Phoenix, AZ
                </div>
              </div>
              <div>
                <Badge className="mb-2 bg-green-100 text-green-800">Output</Badge>
                <div className="bg-white p-3 rounded-lg border text-sm">
                  <strong>Slug:</strong> <code>peak-performance-chiropractic</code><br />
                  <strong>URL:</strong> <code className="text-xs">success.yak.media/peak-performance-chiropractic</code>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Common Issues */}
        <Card className="mt-8 border-2 border-amber-200 bg-amber-50/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              Common Issues
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="text-sm mb-1">❌ "Report Not Found" Error</h4>
              <p className="text-sm text-muted-foreground">
                This means you haven't created a prospect with that slug yet. Create the prospect first, then the URL will work.
              </p>
            </div>
            <div>
              <h4 className="text-sm mb-1">🔍 Not Sure What Reports Exist?</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Use the Debug page to see all created reports and their URLs.
              </p>
              <Link to="/debug">
                <Button variant="outline" size="sm">
                  Go to Debug Page <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link to="/dashboard">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <FileText className="w-5 h-5 mr-2" />
              Create Your First Prospect
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
