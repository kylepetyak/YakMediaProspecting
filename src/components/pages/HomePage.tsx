import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { 
  FileText, 
  BarChart3, 
  Users, 
  Target, 
  CheckCircle2, 
  ArrowRight,
  Building2,
  Zap,
  TrendingUp
} from "lucide-react";

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
            <Building2 className="w-4 h-4" />
            <span className="text-sm">Yak Media Prospecting System</span>
          </div>
          
          <h1 className="mb-6 bg-gradient-to-r from-blue-600 to-slate-800 bg-clip-text text-transparent">
            Professional Marketing Audits
            <br />
            That Close Clients
          </h1>
          
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Perform comprehensive 10-point marketing audits for chiropractors and generate 
            professional, shareable reports that showcase your expertise.
          </p>

          <div className="flex gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8">
                Go to Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/audit-guide">
              <Button size="lg" variant="outline" className="text-lg px-8">
                <FileText className="w-5 h-5 mr-2" />
                View Audit Guide
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="border-blue-200 bg-white/50 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <Target className="w-8 h-8 text-blue-600" />
                <span className="text-3xl">100</span>
              </div>
              <p className="text-slate-600">Prospect Goal (10 days)</p>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-white/50 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-8 h-8 text-green-600" />
                <span className="text-3xl">25</span>
              </div>
              <p className="text-slate-600">Target Retainer Clients</p>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-white/50 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <Zap className="w-8 h-8 text-purple-600" />
                <span className="text-3xl">5-10</span>
              </div>
              <p className="text-slate-600">Daily Audits</p>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-blue-600">1</span>
              </div>
              <h3 className="mb-3">Create Prospect</h3>
              <p className="text-slate-600">
                Add company details and generate a unique URL slug for their public report
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-green-600">2</span>
              </div>
              <h3 className="mb-3">Complete Audit</h3>
              <p className="text-slate-600">
                Fill out the comprehensive 10-point marketing audit using our guided system
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-purple-600">3</span>
              </div>
              <h3 className="mb-3">Share Report</h3>
              <p className="text-slate-600">
                Send the professional public report to prospects and convert them to clients
              </p>
            </div>
          </div>
        </div>

        {/* 10-Point Audit System */}
        <div className="mb-16">
          <h2 className="text-center mb-8">10-Point Marketing Audit</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[
              "Website UX & Design",
              "Compelling Offers",
              "Facebook Advertising",
              "Google Ads & PPC",
              "Social Media Presence",
              "Online Reviews & Reputation",
              "Google My Business",
              "Tracking & Analytics",
              "Retargeting Strategy",
              "Follow-up Systems"
            ].map((item, index) => (
              <Card key={index} className="border-slate-200 hover:border-blue-300 transition-colors">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                Professional Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Generate beautiful, branded audit reports with visual score charts, 
                detailed analysis, and customizable monthly impact estimates.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-green-600" />
                Team Collaboration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Invite team members and VAs to help with audits. Everyone works 
                from the same system with protected access and role management.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-600" />
                Guided Audit System
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Follow our comprehensive audit guide with detailed instructions, 
                scoring criteria, and examples for every category.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-orange-600" />
                Public Sharing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Each prospect gets a clean, professional URL (success.yak.media/company-name) 
                that you can share directly with them.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-12">
          <h2 className="text-white mb-4">Ready to Start Prospecting?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Jump into the dashboard and create your first prospect, or review the audit 
            guide to understand the complete system.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Open Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/audit-guide">
              <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-lg px-8">
                Read Guide
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
