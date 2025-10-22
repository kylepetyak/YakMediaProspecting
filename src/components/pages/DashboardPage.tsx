import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createClient } from "../../utils/supabase/client";
import { projectId, publicAnonKey } from "../../utils/supabase/info";
import { Prospect } from "../../utils/supabase/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Label } from "../ui/label";
import { Search, Plus, FileText, Calendar, Building2, AlertTriangle, Database, Play, RefreshCw, ArrowLeft, Trash2, ExternalLink, Lightbulb } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { slugify, generateUniqueSlug } from "../../utils/slugify";

export function DashboardPage() {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [filteredProspects, setFilteredProspects] = useState<Prospect[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [prospectToDelete, setProspectToDelete] = useState<Prospect | null>(null);
  const [formData, setFormData] = useState({
    company_name: "",
    owner_name: "",
    email: "",
    phone: "",
    website: "",
    city: "",
    instagram: "",
    facebook: "",
    gmb_url: ""
  });

  useEffect(() => {
    fetchProspects();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProspects(prospects);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredProspects(
        prospects.filter(p => 
          p.company_name.toLowerCase().includes(query) ||
          p.city?.toLowerCase().includes(query) ||
          p.owner_name?.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery, prospects]);

  async function fetchProspects() {
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
          toast.error('Database not set up', {
            description: 'Redirecting to setup page...',
            duration: 3000
          });
          setTimeout(() => {
            window.location.href = '/initial-setup';
          }, 1500);
          setLoading(false);
          return;
        }
        
        throw new Error(JSON.stringify(errorData));
      }
      
      const data = await response.json();
      setProspects(data.prospects || []);
      setFilteredProspects(data.prospects || []);
    } catch (error) {
      console.error('Error fetching prospects:', error);
      toast.error('Failed to load prospects', {
        description: 'Check console for details'
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateProspect(e: React.FormEvent) {
    e.preventDefault();
    
    try {
      // Generate unique slug
      const baseSlug = slugify(formData.company_name);
      const checkSlugExists = async (slug: string) => {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-5e752b5e/prospects/check-slug/${slug}`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`
            }
          }
        );
        const data = await response.json();
        return data.exists;
      };
      
      const uniqueSlug = await generateUniqueSlug(baseSlug, checkSlugExists);
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5e752b5e/prospects`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...formData,
            company_slug: uniqueSlug
          })
        }
      );
      
      if (!response.ok) throw new Error('Failed to create prospect');
      
      toast.success('Prospect created successfully');
      setDialogOpen(false);
      setFormData({
        company_name: "",
        owner_name: "",
        email: "",
        phone: "",
        website: "",
        city: "",
        instagram: "",
        facebook: "",
        gmb_url: ""
      });
      fetchProspects();
    } catch (error) {
      console.error('Error creating prospect:', error);
      toast.error('Failed to create prospect');
    }
  }

  const handleDeleteClick = (prospect: Prospect) => {
    setProspectToDelete(prospect);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!prospectToDelete) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5e752b5e/prospects/${prospectToDelete.id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete prospect');
      }

      toast.success(`${prospectToDelete.company_name} deleted successfully`);
      
      // Refresh the prospects list
      fetchProspects();
      
      // Close dialog and clear state
      setDeleteDialogOpen(false);
      setProspectToDelete(null);
    } catch (error) {
      console.error('Error deleting prospect:', error);
      toast.error('Failed to delete prospect');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent mb-4"></div>
          <p className="text-muted-foreground">Loading prospects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="w-6 h-6 text-blue-600" />
              <span className="font-semibold">Yak Media - Prospect System</span>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/audit-guide">
                <Button variant="ghost" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Audit Guide
                </Button>
              </Link>
              <Link to="/manage-users">
                <Button variant="ghost" size="sm">
                  Manage Users
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="mb-2">Prospect Dashboard</h1>
            <p className="text-muted-foreground">
              Manage prospect audits and generate professional public reports
            </p>
          </div>
        </div>

        {/* Quick Start Guide */}
        {prospects.length === 0 && (
          <Alert className="mb-6 bg-blue-50 border-blue-200">
            <Lightbulb className="w-4 h-4 text-blue-600" />
            <AlertTitle>Welcome to Yak Media Prospecting System</AlertTitle>
            <AlertDescription>
              <div className="mt-2 space-y-2 text-sm">
                <p>Get started by creating your first prospect, then:</p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>Click "Edit Audit" to fill out the 10-point marketing audit</li>
                  <li>Click "View Public Report" to see the shareable report</li>
                  <li>Share the public URL (success.yak.media/company-slug) with prospects</li>
                </ol>
                <p className="mt-3">
                  Need help? Check the <Link to="/audit-guide" className="text-blue-600 hover:underline font-medium">Audit Guide</Link> for detailed instructions on completing audits.
                </p>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Prospects</p>
                  <div className="text-2xl">{prospects.length}</div>
                </div>
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">60-Day Goal</p>
                  <div className="text-2xl">25 Retainers</div>
                </div>
                <FileText className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Daily Target</p>
                  <div className="text-2xl">5-10 Audits</div>
                </div>
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Actions */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>All Prospects</CardTitle>
                <CardDescription>Search and manage your prospect list</CardDescription>
              </div>
              
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    New Prospect
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create New Prospect</DialogTitle>
                    <DialogDescription>
                      Add a new business to audit and win as a client
                    </DialogDescription>
                  </DialogHeader>
                  
                  <form onSubmit={handleCreateProspect} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="company_name">Company Name *</Label>
                        <Input
                          id="company_name"
                          required
                          value={formData.company_name}
                          onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                          placeholder="Peak Performance Chiropractic"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="owner_name">Owner Name</Label>
                        <Input
                          id="owner_name"
                          value={formData.owner_name}
                          onChange={(e) => setFormData({ ...formData, owner_name: e.target.value })}
                          placeholder="Dr. Sarah Martinez"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          placeholder="Scottsdale, Arizona"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="contact@clinic.com"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="(480) 555-1234"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          value={formData.website}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                          placeholder="www.clinic.com"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="instagram">Instagram</Label>
                        <Input
                          id="instagram"
                          value={formData.instagram}
                          onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                          placeholder="@clinicname"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="facebook">Facebook</Label>
                        <Input
                          id="facebook"
                          value={formData.facebook}
                          onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                          placeholder="facebook.com/clinicname"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <Label htmlFor="gmb_url">Google Business Profile URL</Label>
                        <Input
                          id="gmb_url"
                          value={formData.gmb_url}
                          onChange={(e) => setFormData({ ...formData, gmb_url: e.target.value })}
                          placeholder="https://maps.google.com/..."
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2 pt-4">
                      <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                        Create Prospect
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by company name, city, or owner..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Prospects Grid */}
        {filteredProspects.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Building2 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="mb-2">No prospects found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery ? "Try a different search term" : "Create your first prospect to get started"}
              </p>
              {!searchQuery && (
                <Button onClick={() => setDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  New Prospect
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProspects.map((prospect) => (
              <Card key={prospect.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">{prospect.company_name}</CardTitle>
                      {prospect.city && (
                        <CardDescription className="flex items-center gap-1">
                          <Building2 className="w-3 h-3" />
                          {prospect.city}
                        </CardDescription>
                      )}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {prospect.company_slug}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  {prospect.owner_name && (
                    <p className="text-sm text-muted-foreground">{prospect.owner_name}</p>
                  )}
                  
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Link to={`/dashboard/audit/${prospect.id}`} className="flex-1">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          <FileText className="w-4 h-4 mr-2" />
                          Edit Audit
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDeleteClick(prospect)}
                        title="Delete prospect"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <Link to={`/${prospect.company_slug}`} className="block">
                      <Button variant="outline" className="w-full">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Public Report
                      </Button>
                    </Link>
                  </div>
                  
                  {prospect.website && (
                    <a
                      href={prospect.website.startsWith('http') ? prospect.website : `https://${prospect.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline block truncate"
                    >
                      {prospect.website}
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete <strong>{prospectToDelete?.company_name}</strong> and all associated data including:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Audit responses</li>
                <li>Screenshots and assets</li>
                <li>Published report</li>
              </ul>
              <p className="mt-3 text-red-600">This action cannot be undone.</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Prospect
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
