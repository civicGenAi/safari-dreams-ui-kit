import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { supabase, Package, Article, TravelIdea, BookingRequest, ContactSubmission, NewsletterSubscription } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingScreen } from '@/components/ui/loading';
import { Package as PackageIcon, TrendingUp, MapPin, Tag, DollarSign, Calendar, FileText, Eye, FileCog, Lightbulb, Mail, MessageSquare, Users, ExternalLink } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [travelIdeas, setTravelIdeas] = useState<TravelIdea[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [newsletter, setNewsletter] = useState<NewsletterSubscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [
        packagesResult,
        travelIdeasResult,
        articlesResult,
        bookingsResult,
        contactsResult,
        newsletterResult
      ] = await Promise.all([
        supabase.from('packages').select('*').order('created_at', { ascending: false }),
        supabase.from('travel_ideas').select('*').order('created_at', { ascending: false }),
        supabase.from('articles').select('*').order('created_at', { ascending: false }),
        supabase.from('booking_requests').select('*').order('submitted_at', { ascending: false }),
        supabase.from('contact_submissions').select('*').order('submitted_at', { ascending: false }),
        supabase.from('newsletter_subscriptions').select('*').order('subscribed_at', { ascending: false }),
      ]);

      if (packagesResult.error) throw packagesResult.error;
      if (travelIdeasResult.error) throw travelIdeasResult.error;
      if (articlesResult.error) throw articlesResult.error;

      setPackages(packagesResult.data || []);
      setTravelIdeas(travelIdeasResult.data || []);
      setArticles(articlesResult.data || []);
      setBookings(bookingsResult.data || []);
      setContacts(contactsResult.data || []);
      setNewsletter(newsletterResult.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Booking statistics
  const newBookings = bookings.filter(b => b.status === 'new').length;
  const contactedBookings = bookings.filter(b => b.status === 'contacted').length;
  const quotedBookings = bookings.filter(b => b.status === 'quoted').length;
  const bookedCount = bookings.filter(b => b.status === 'booked').length;

  // Contact statistics
  const newContacts = contacts.filter(c => c.status === 'new').length;
  const readContacts = contacts.filter(c => c.status === 'read').length;

  // Newsletter statistics
  const activeSubscribers = newsletter.filter(n => n.status === 'active').length;

  const stats = {
    totalPackages: packages.length,
    totalTravelIdeas: travelIdeas.length,
    destinations: new Set(packages.map(p => p.destination)).size,
    categories: new Set(packages.map(p => p.category)).size,
    avgPrice: Math.round(packages.reduce((sum, p) => sum + p.price, 0) / packages.length || 0),
    totalRevenue: packages.reduce((sum, p) => sum + p.price, 0),
    avgDuration: Math.round(packages.reduce((sum, p) => sum + p.duration, 0) / packages.length || 0),
    totalArticles: articles.length,
    publishedArticles: articles.filter(a => a.status === 'published').length,
    draftArticles: articles.filter(a => a.status === 'draft').length,
    articleCategories: new Set(articles.map(a => a.category)).size,
    totalBookings: bookings.length,
    newBookings,
    bookedCount,
    totalContacts: contacts.length,
    newContacts,
    totalSubscribers: newsletter.length,
    activeSubscribers,
  };

  const destinationBreakdown = packages.reduce((acc, pkg) => {
    acc[pkg.destination] = (acc[pkg.destination] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryBreakdown = packages.reduce((acc, pkg) => {
    acc[pkg.category] = (acc[pkg.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const recentPackages = packages.slice(0, 5);

  // Chart data preparation
  const bookingStatusData = [
    { name: 'New', value: newBookings, color: '#3b82f6' },
    { name: 'Contacted', value: contactedBookings, color: '#f59e0b' },
    { name: 'Quoted', value: quotedBookings, color: '#8b5cf6' },
    { name: 'Booked', value: bookedCount, color: '#10b981' },
  ].filter(item => item.value > 0);

  const destinationChartData = Object.entries(destinationBreakdown)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, value]) => ({ name, value }));

  const categoryChartData = Object.entries(categoryBreakdown)
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({ name, value }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  if (loading) {
    return (
      <AdminLayout>
        <LoadingScreen message="Loading dashboard..." fullScreen={false} />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-display font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your tour packages and blog content</p>
        </div>

        {/* Quick Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Booking Requests</CardTitle>
              <Calendar className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{stats.totalBookings}</div>
              <div className="flex items-center gap-2 mt-2 text-xs">
                <span className="bg-red-100 text-red-700 px-2 py-1 rounded">{stats.newBookings} new</span>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded">{stats.bookedCount} booked</span>
              </div>
              <Link to="/admin/bookings" className="text-xs text-blue-600 hover:underline mt-2 inline-flex items-center gap-1">
                View all <ExternalLink className="w-3 h-3" />
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-white border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contact Messages</CardTitle>
              <MessageSquare className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.totalContacts}</div>
              <div className="flex items-center gap-2 mt-2 text-xs">
                <span className="bg-red-100 text-red-700 px-2 py-1 rounded">{stats.newContacts} new</span>
              </div>
              <Link to="/admin/contacts" className="text-xs text-green-600 hover:underline mt-2 inline-flex items-center gap-1">
                View all <ExternalLink className="w-3 h-3" />
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Newsletter</CardTitle>
              <Mail className="h-5 w-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">{stats.activeSubscribers}</div>
              <p className="text-xs text-muted-foreground mt-2">Active subscribers</p>
              <Link to="/admin/newsletter" className="text-xs text-purple-600 hover:underline mt-2 inline-flex items-center gap-1">
                View all <ExternalLink className="w-3 h-3" />
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-white border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Packages</CardTitle>
              <PackageIcon className="h-5 w-5 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">{stats.totalPackages}</div>
              <p className="text-xs text-muted-foreground mt-2">Active tours</p>
              <Link to="/admin/packages" className="text-xs text-orange-600 hover:underline mt-2 inline-flex items-center gap-1">
                Manage <ExternalLink className="w-3 h-3" />
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Content Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Travel Ideas</CardTitle>
              <Lightbulb className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalTravelIdeas}</div>
              <p className="text-xs text-muted-foreground">Specialized experiences</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Destinations</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.destinations}</div>
              <p className="text-xs text-muted-foreground">Countries covered</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Price</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.avgPrice}</div>
              <p className="text-xs text-muted-foreground">Per person</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published Articles</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.publishedArticles}</div>
              <p className="text-xs text-muted-foreground">{stats.draftArticles} drafts</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Booking Status Chart */}
          {bookingStatusData.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Booking Pipeline</CardTitle>
                <CardDescription>Current status of all booking requests</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={bookingStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {bookingStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}

          {/* Top Destinations Chart */}
          {destinationChartData.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Top Destinations</CardTitle>
                <CardDescription>Most popular tour destinations</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={destinationChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#0088FE" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recently Added Packages</CardTitle>
            <CardDescription>Latest packages in the system</CardDescription>
          </CardHeader>
          <CardContent>
            {recentPackages.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No packages yet</p>
            ) : (
              <div className="space-y-4">
                {recentPackages.map((pkg) => (
                  <div key={pkg.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold truncate">{pkg.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <span>{pkg.destination}</span>
                        <span>•</span>
                        <span>{pkg.category}</span>
                        <span>•</span>
                        <span>{pkg.duration} days</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-bold text-primary">${pkg.price}</div>
                      <div className="text-xs text-muted-foreground">per person</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;

