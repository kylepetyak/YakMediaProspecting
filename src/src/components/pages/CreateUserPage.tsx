import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import { UserPlus, CheckCircle, AlertCircle, Copy } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

export function CreateUserPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5e752b5e/auth/create-user`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password, name })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create user');
      }

      setSuccess(true);
      toast.success(`User account created for ${email}`, {
        description: 'They can now sign in at the login page',
        duration: 5000
      });
      
      // Clear form
      setEmail('');
      setPassword('');
      setName('');
    } catch (err: any) {
      console.error('Error creating user:', err);
      setError(err.message || 'Failed to create user account');
      toast.error('Failed to create user');
    } finally {
      setLoading(false);
    }
  }

  async function copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="mb-2">Create User Account</h1>
          <p className="text-muted-foreground">
            Create login accounts for your team members and VAs
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <UserPlus className="w-6 h-6 text-white" />
            </div>
            <CardTitle>Add New Team Member</CardTitle>
            <CardDescription>
              Create accounts for your team and VAs. They'll have full access to the dashboard and audit forms.
            </CardDescription>
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                🔒 <strong>Protected:</strong> Only authenticated users can access this page. No one else can create accounts.
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="bg-green-50 text-green-900 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription>
                    User account created successfully! They can now sign in at the login page.
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">Full Name (Optional)</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@yakmedia.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="text"
                  placeholder="Create a secure password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  minLength={6}
                />
                <p className="text-sm text-muted-foreground">
                  Minimum 6 characters. The user can change this after logging in.
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t space-y-3">
              <h4>Quick Copy URLs</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-slate-100 px-3 py-2 rounded text-sm">
                    https://success.yak.media/#/login
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard('https://success.yak.media/#/login')}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Share this login URL with team members
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex items-center justify-between">
          <Link to="/" className="text-blue-600 hover:underline">
            ← Back to Homepage
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/manage-users" className="text-blue-600 hover:underline">
              Manage Users
            </Link>
            <Link to="/dashboard" className="text-blue-600 hover:underline">
              Go to Dashboard →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
