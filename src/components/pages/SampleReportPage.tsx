import { Link } from "react-router-dom";
import { AuditReport } from "../AuditReport";
import { sampleAuditData } from "../../App";

export function SampleReportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Link 
            to="/"
            className="text-sm text-slate-600 hover:text-slate-900 flex items-center gap-2"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
      <AuditReport data={sampleAuditData} />
    </div>
  );
}
