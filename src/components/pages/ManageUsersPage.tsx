import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { ArrowLeft, Trash2, AlertTriangle, Loader2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface User {
  id: string;
  email: string;
  name: string;
  created_at: string;
  last_sign_in_at: string | null;
}

export function ManageUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5e752b5e/auth/users`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data.users || []);
    } catch (error: any) {
      setError(error.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  }

  async function deleteUser(userId: string, email: string) {
    if (!confirm(`Are you sure you want to delete ${email}?`)) {
      return;
    }

    setDeleting(userId);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5e752b5e/auth/users/${userId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      toast.success(`Deleted user: ${email}`);
      setUsers(users.filter(u => u.id !== userId));
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete user');
    } finally {
      setDeleting(null);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="inline-block h-8 w-8 animate-spin text-blue-600 mb-4" />
          <p className="text-muted-foreground">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <div className="mb-6">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Manage Users</CardTitle>
                <CardDescription>
                  View and manage team members with access to the system
                </CardDescription>
              </div>
              <Link to="/create-user">
                <Button>Add New User</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {users.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No users found</p>
              </div>
            ) : (
              <div className="space-y-3">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="font-medium">{user.name || 'No name'}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        <span>Created: {new Date(user.created_at).toLocaleDateString()}</span>
                        {user.last_sign_in_at && (
                          <span className="ml-4">
                            Last login: {new Date(user.last_sign_in_at).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteUser(user.id, user.email)}
                      disabled={deleting === user.id}
                    >
                      {deleting === user.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
