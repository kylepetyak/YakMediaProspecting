import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createClient } from "../../utils/supabase/client";
import { projectId, publicAnonKey } from "../../utils/supabase/info";
import { Prospect } from "../../utils/supabase/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Search, Plus, FileText, Calendar, Building2, AlertTriangle, Database, Play, RefreshCw, ArrowLeft } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { slugify, generateUniqueSlug } from "../../utils/slugify";

export function DashboardPage() {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [filteredProspects, setFilteredProspects] = useState<Prospect[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
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
            window.location.href = '/#/setup';
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
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="mb-2">Prospect Dashboard</h1>
            <p className="text-muted-foreground">
              Manage chiropractor audits and generate public reports
            </p>
          </div>
          <Link to="/">
            <Button variant="outline">
              ← Back to Home
            </Button>
          </Link>
        </div>

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
                  <p className="text-sm text-muted-foreground">Goal Progress</p>
                  <div className="text-2xl">{prospects.length}/100</div>
                </div>
                <FileText className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Days Remaining</p>
                  <div className="text-2xl">{Math.max(0, 10 - Math.floor(prospects.length / 10))}</div>
                </div>
                <Calendar className="w-8 h-8 text-green-600" />
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
                      Add a new chiropractor clinic to audit
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
                  
                  <div className="flex gap-2">
                    <Link to={`/dashboard/audit/${prospect.id}`} className="flex-1">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        <FileText className="w-4 h-4 mr-2" />
                        Open Audit
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
    </div>
  );
}
