import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { supabase, ContactSubmission } from '@/lib/supabase';
import { LoadingScreen } from '@/components/ui/loading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MessageSquare, Eye, Check, X } from 'lucide-react';

const AdminContacts = () => {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (error) throw error;
      setContacts(data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: ContactSubmission['status']) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      fetchContacts();
      if (selectedContact?.id === id) {
        setSelectedContact({ ...selectedContact, status });
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusColor = (status: ContactSubmission['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'read': return 'bg-yellow-100 text-yellow-800';
      case 'responded': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <LoadingScreen message="Loading messages..." fullScreen={false} />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-display font-bold">Contact Messages</h1>
          <p className="text-muted-foreground">Customer inquiries and messages</p>
        </div>

        <div className="grid gap-4">
          {contacts.length === 0 ? (
            <div className="bg-card rounded-lg border p-12 text-center">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">No Messages</h3>
              <p className="text-muted-foreground">
                Contact form submissions will appear here.
              </p>
            </div>
          ) : (
            <div className="bg-card rounded-lg border overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted/50 border-b">
                  <tr>
                    <th className="text-left p-4 font-semibold">Name</th>
                    <th className="text-left p-4 font-semibold">Subject</th>
                    <th className="text-left p-4 font-semibold">Date</th>
                    <th className="text-left p-4 font-semibold">Status</th>
                    <th className="text-left p-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact.id} className="border-b hover:bg-muted/30">
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{contact.name}</div>
                          <div className="text-sm text-muted-foreground">{contact.email}</div>
                        </div>
                      </td>
                      <td className="p-4">{contact.subject}</td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {new Date(contact.submitted_at).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <Badge className={getStatusColor(contact.status)}>
                          {contact.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedContact(contact);
                              if (contact.status === 'new') {
                                updateStatus(contact.id, 'read');
                              }
                            }}
                            className="gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </Button>
                          <a href={`mailto:${contact.email}`}>
                            <Button size="sm" variant="default" className="gap-2">
                              <Mail className="w-4 h-4" />
                              Reply
                            </Button>
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Detail Modal */}
        {selectedContact && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedContact(null)}>
            <div className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="font-display text-2xl font-bold">{selectedContact.name}</h2>
                  <p className="text-muted-foreground">{selectedContact.subject}</p>
                </div>
                <button onClick={() => setSelectedContact(null)} className="p-2 hover:bg-muted rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Contact Information</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <a href={`mailto:${selectedContact.email}`} className="hover:text-primary">
                      {selectedContact.email}
                    </a>
                  </div>
                  {selectedContact.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <a href={`tel:${selectedContact.phone}`} className="hover:text-primary">
                        {selectedContact.phone}
                      </a>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Message</h3>
                  <p className="whitespace-pre-wrap bg-muted/30 p-4 rounded-lg">{selectedContact.message}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Update Status</h3>
                  <div className="flex gap-2">
                    {['new', 'read', 'responded'].map((status) => (
                      <Button
                        key={status}
                        size="sm"
                        variant={selectedContact.status === status ? 'default' : 'outline'}
                        onClick={() => updateStatus(selectedContact.id, status as ContactSubmission['status'])}
                      >
                        {status}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <a href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`}>
                    <Button variant="primary" className="w-full gap-2">
                      <Mail className="w-4 h-4" />
                      Send Reply Email
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminContacts;
