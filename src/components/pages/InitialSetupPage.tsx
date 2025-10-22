import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import { CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';

export function InitialSetupPage() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [hasUsers, setHasUsers] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkExistingUsers();
  }, []);

  async function checkExistingUsers() {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5e752b5e/auth/users`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        setHasUsers(data.users && data.users.length > 0);
      }
    } catch (error) {
      console.error('Error checking users:', error);
    } finally {
      setChecking(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5e752b5e/auth/create-user`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({ name, email, password })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create user');
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error: any) {
      setError(error.message || 'Failed to create account');
      setLoading(false);
    }
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="inline-block h-8 w-8 animate-spin text-blue-600 mb-4" />
          <p className="text-muted-foreground">Checking setup status...</p>
        </div>
      </div>
    );
  }

  if (hasUsers) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <CheckCircle className="w-16 h-16 mx-auto text-green-600 mb-4" />
            <h2 className="mb-2 text-center">Setup Already Complete</h2>
            <p className="text-muted-foreground mb-6 text-center">
              Your admin account has already been created.
            </p>
            <Button
              className="w-full"
              onClick={() => navigate('/login')}
            >
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle>Initial Setup</CardTitle>
          <CardDescription>
            Create your first admin account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <div className="text-center">
              <CheckCircle className="w-16 h-16 mx-auto text-green-600 mb-4" />
              <h3 className="mb-2">Account Created!</h3>
              <p className="text-muted-foreground">Redirecting to login...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@yak.media"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  placeholder="••••••••"
                />
                <p className="text-xs text-muted-foreground">
                  Minimum 6 characters
                </p>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Create Admin Account'}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
