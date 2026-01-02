import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { supabase, NewsletterSubscription } from '@/lib/supabase';
import { LoadingScreen } from '@/components/ui/loading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Download, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const AdminNewsletter = () => {
  const [subscriptions, setSubscriptions] = useState<NewsletterSubscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const { data, error } = await supabase
        .from('newsletter_subscriptions')
        .select('*')
        .order('subscribed_at', { ascending: false });

      if (error) throw error;
      setSubscriptions(data || []);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: NewsletterSubscription['status']) => {
    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      fetchSubscriptions();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const exportEmails = () => {
    const activeEmails = subscriptions
      .filter(sub => sub.status === 'active')
      .map(sub => sub.email)
      .join('\n');

    const blob = new Blob([activeEmails], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredSubscriptions = subscriptions.filter(sub =>
    sub.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeCount = subscriptions.filter(sub => sub.status === 'active').length;
  const unsubscribedCount = subscriptions.filter(sub => sub.status === 'unsubscribed').length;

  if (loading) {
    return (
      <AdminLayout>
        <LoadingScreen message="Loading subscribers..." fullScreen={false} />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold">Newsletter Subscriptions</h1>
            <p className="text-muted-foreground">Manage email subscribers</p>
          </div>
          <Button onClick={exportEmails} className="gap-2">
            <Download className="w-4 h-4" />
            Export Active Emails
          </Button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card rounded-lg border p-6">
            <div className="text-2xl font-bold">{subscriptions.length}</div>
            <div className="text-sm text-muted-foreground">Total Subscriptions</div>
          </div>
          <div className="bg-card rounded-lg border p-6">
            <div className="text-2xl font-bold text-green-600">{activeCount}</div>
            <div className="text-sm text-muted-foreground">Active Subscribers</div>
          </div>
          <div className="bg-card rounded-lg border p-6">
            <div className="text-2xl font-bold text-red-600">{unsubscribedCount}</div>
            <div className="text-sm text-muted-foreground">Unsubscribed</div>
          </div>
        </div>

        {/* Search */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Subscribers Table */}
        <div className="bg-card rounded-lg border overflow-hidden">
          {filteredSubscriptions.length === 0 ? (
            <div className="p-12 text-center">
              <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">No Subscribers</h3>
              <p className="text-muted-foreground">
                {searchQuery ? 'No subscribers match your search.' : 'Newsletter subscribers will appear here.'}
              </p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="text-left p-4 font-semibold">Email</th>
                  <th className="text-left p-4 font-semibold">Subscribed Date</th>
                  <th className="text-left p-4 font-semibold">Status</th>
                  <th className="text-left p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubscriptions.map((sub) => (
                  <tr key={sub.id} className="border-b hover:bg-muted/30">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <a href={`mailto:${sub.email}`} className="hover:text-primary">
                          {sub.email}
                        </a>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {new Date(sub.subscribed_at).toLocaleDateString()} at{' '}
                      {new Date(sub.subscribed_at).toLocaleTimeString()}
                    </td>
                    <td className="p-4">
                      <Badge className={sub.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {sub.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      {sub.status === 'active' ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateStatus(sub.id, 'unsubscribed')}
                        >
                          Unsubscribe
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => updateStatus(sub.id, 'active')}
                        >
                          Reactivate
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="text-sm text-muted-foreground">
          Showing {filteredSubscriptions.length} of {subscriptions.length} subscriptions
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminNewsletter;
