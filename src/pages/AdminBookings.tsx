import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { supabase, BookingRequest } from '@/lib/supabase';
import { LoadingScreen } from '@/components/ui/loading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Mail, Phone, MapPin, Eye, Check, X } from 'lucide-react';

const AdminBookings = () => {
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<BookingRequest | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('booking_requests')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: BookingRequest['status']) => {
    try {
      const { error } = await supabase
        .from('booking_requests')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      fetchBookings();
      if (selectedBooking?.id === id) {
        setSelectedBooking({ ...selectedBooking, status });
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusColor = (status: BookingRequest['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'quoted': return 'bg-purple-100 text-purple-800';
      case 'booked': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <LoadingScreen message="Loading bookings..." fullScreen={false} />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-display font-bold">Booking Requests</h1>
          <p className="text-muted-foreground">Manage customer quote and booking requests</p>
        </div>

        <div className="grid gap-6">
          {bookings.length === 0 ? (
            <div className="bg-card rounded-lg border p-12 text-center">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">No Booking Requests</h3>
              <p className="text-muted-foreground">
                Booking requests will appear here when customers request quotes.
              </p>
            </div>
          ) : (
            bookings.map((booking) => (
              <div key={booking.id} className="bg-card rounded-lg border p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-heading font-semibold text-lg">
                      {booking.first_name} {booking.last_name}
                    </h3>
                    {booking.package_title && (
                      <p className="text-sm text-primary font-medium">{booking.package_title}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(booking.submitted_at).toLocaleString()}
                    </p>
                  </div>
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status}
                  </Badge>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <a href={`mailto:${booking.email}`} className="hover:text-primary">
                      {booking.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <a href={`tel:${booking.phone}`} className="hover:text-primary">
                      {booking.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    {booking.destination}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    {booking.start_date} to {booking.end_date}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    {booking.adults} adults, {booking.children} children
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedBooking(booking)}
                    className="gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </Button>
                  {booking.status === 'new' && (
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => updateStatus(booking.id, 'contacted')}
                      className="gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Mark Contacted
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Detail Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedBooking(null)}>
            <div className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="font-display text-2xl font-bold">
                    {selectedBooking.first_name} {selectedBooking.last_name}
                  </h2>
                  {selectedBooking.package_title && (
                    <p className="text-primary font-medium">{selectedBooking.package_title}</p>
                  )}
                </div>
                <button onClick={() => setSelectedBooking(null)} className="p-2 hover:bg-muted rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Contact Information</h3>
                  <p><strong>Email:</strong> {selectedBooking.email}</p>
                  <p><strong>Phone:</strong> {selectedBooking.phone}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Trip Details</h3>
                  <p><strong>Destination:</strong> {selectedBooking.destination}</p>
                  <p><strong>Travel Style:</strong> {selectedBooking.travel_style}</p>
                  <p><strong>Dates:</strong> {selectedBooking.start_date} to {selectedBooking.end_date}</p>
                  <p><strong>Travelers:</strong> {selectedBooking.adults} adults, {selectedBooking.children} children</p>
                  <p><strong>Accommodation:</strong> {selectedBooking.accommodation}</p>
                  {selectedBooking.budget && <p><strong>Budget:</strong> {selectedBooking.budget}</p>}
                </div>

                {selectedBooking.special_requirements && (
                  <div>
                    <h3 className="font-semibold mb-2">Special Requirements</h3>
                    <p className="whitespace-pre-wrap">{selectedBooking.special_requirements}</p>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold mb-2">Update Status</h3>
                  <div className="flex flex-wrap gap-2">
                    {['new', 'contacted', 'quoted', 'booked', 'cancelled'].map((status) => (
                      <Button
                        key={status}
                        size="sm"
                        variant={selectedBooking.status === status ? 'default' : 'outline'}
                        onClick={() => updateStatus(selectedBooking.id, status as BookingRequest['status'])}
                      >
                        {status}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminBookings;
