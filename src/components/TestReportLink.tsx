import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ExternalLink, Copy } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface TestReportLinkProps {
  companySlug: string;
  companyName: string;
}

export function TestReportLink({ companySlug, companyName }: TestReportLinkProps) {
  const reportUrl = `https://success.yak.media/#/${companySlug}`;
  
  async function copyUrl() {
    try {
      await navigator.clipboard.writeText(reportUrl);
      toast.success('URL copied to clipboard!');
    } catch (error) {
      // Fallback for browsers that block clipboard API
      const textarea = document.createElement('textarea');
      textarea.value = reportUrl;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        toast.success('URL copied to clipboard!');
      } catch (e) {
        toast.error('Failed to copy. Please select and copy manually.');
      }
      document.body.removeChild(textarea);
    }
  }
  
  function openReport() {
    window.open(reportUrl, '_blank');
  }
  
  return (
    <Card className="border-blue-200 bg-blue-50/50">
      <CardHeader>
        <CardTitle className="text-lg">Public Report URL</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            Share this link with {companyName}:
          </p>
          <div className="bg-white rounded-lg p-3 border font-mono text-sm break-all">
            {reportUrl}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={openReport} className="flex-1 bg-blue-600 hover:bg-blue-700">
            <ExternalLink className="w-4 h-4 mr-2" />
            Open Report
          </Button>
          <Button onClick={copyUrl} variant="outline">
            <Copy className="w-4 h-4 mr-2" />
            Copy URL
          </Button>
        </div>
        
        <div className="text-xs text-muted-foreground">
          This is the public-facing audit report that prospects can view
        </div>
      </CardContent>
    </Card>
  );
}
