import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { supabase, BookingRequest, ContactSubmission, NewsletterSubscription } from '@/lib/supabase';
import { LoadingScreen } from '@/components/ui/loading';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  TrendingUp, TrendingDown, DollarSign, Users, Calendar,
  Mail, MessageSquare, Package, ArrowUp, ArrowDown, Activity
} from 'lucide-react';
import { format, subDays, startOfMonth, endOfMonth, eachDayOfInterval, parseISO } from 'date-fns';

const AdminAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [newsletters, setNewsletters] = useState<NewsletterSubscription[]>([]);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [bookingsRes, contactsRes, newslettersRes] = await Promise.all([
        supabase.from('booking_requests').select('*').order('submitted_at', { ascending: false }),
        supabase.from('contact_submissions').select('*').order('submitted_at', { ascending: false }),
        supabase.from('newsletter_subscriptions').select('*').order('subscribed_at', { ascending: false })
      ]);

      setBookings(bookingsRes.data || []);
      setContacts(contactsRes.data || []);
      setNewsletters(newslettersRes.data || []);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate date range
  const getDateRange = () => {
    const now = new Date();
    switch (timeRange) {
      case '7d': return subDays(now, 7);
      case '30d': return subDays(now, 30);
      case '90d': return subDays(now, 90);
      default: return new Date(2020, 0, 1);
    }
  };

  const startDate = getDateRange();

  // Filter data by time range
  const filteredBookings = bookings.filter(b => new Date(b.submitted_at) >= startDate);
  const filteredContacts = contacts.filter(c => new Date(c.submitted_at) >= startDate);
  const filteredNewsletters = newsletters.filter(n => new Date(n.subscribed_at) >= startDate);

  // Calculate revenue metrics
  const budgetMap: { [key: string]: number } = {
    'under-2000': 1500,
    '2000-4000': 3000,
    '4000-6000': 5000,
    '6000-10000': 8000,
    'over-10000': 12000
  };

  const totalPotentialRevenue = filteredBookings.reduce((sum, booking) => {
    const avgBudget = budgetMap[booking.budget || ''] || 0;
    return sum + (avgBudget * (booking.adults + booking.children * 0.5));
  }, 0);

  const bookedRevenue = filteredBookings
    .filter(b => b.status === 'booked')
    .reduce((sum, booking) => {
      const avgBudget = budgetMap[booking.budget || ''] || 0;
      return sum + (avgBudget * (booking.adults + booking.children * 0.5));
    }, 0);

  const quotedRevenue = filteredBookings
    .filter(b => b.status === 'quoted')
    .reduce((sum, booking) => {
      const avgBudget = budgetMap[booking.budget || ''] || 0;
      return sum + (avgBudget * (booking.adults + booking.children * 0.5));
    }, 0);

  // Calculate conversion rate
  const conversionRate = filteredBookings.length > 0
    ? ((filteredBookings.filter(b => b.status === 'booked').length / filteredBookings.length) * 100).toFixed(1)
    : '0';

  // Get trends (compare with previous period)
  const previousStartDate = timeRange === '7d' ? subDays(startDate, 7) :
    timeRange === '30d' ? subDays(startDate, 30) :
    timeRange === '90d' ? subDays(startDate, 90) :
    subDays(startDate, 365);

  const previousBookings = bookings.filter(b => {
    const date = new Date(b.submitted_at);
    return date >= previousStartDate && date < startDate;
  });

  const previousNewsletters = newsletters.filter(n => {
    const date = new Date(n.subscribed_at);
    return date >= previousStartDate && date < startDate;
  });

  const bookingsTrend = previousBookings.length > 0
    ? ((filteredBookings.length - previousBookings.length) / previousBookings.length * 100)
    : 100;

  const newsletterTrend = previousNewsletters.length > 0
    ? ((filteredNewsletters.length - previousNewsletters.length) / previousNewsletters.length * 100)
    : 100;

  // Bookings by status
  const bookingsByStatus = [
    { name: 'New', value: filteredBookings.filter(b => b.status === 'new').length, color: '#3b82f6' },
    { name: 'Contacted', value: filteredBookings.filter(b => b.status === 'contacted').length, color: '#f59e0b' },
    { name: 'Quoted', value: filteredBookings.filter(b => b.status === 'quoted').length, color: '#8b5cf6' },
    { name: 'Booked', value: filteredBookings.filter(b => b.status === 'booked').length, color: '#10b981' },
    { name: 'Cancelled', value: filteredBookings.filter(b => b.status === 'cancelled').length, color: '#ef4444' }
  ].filter(item => item.value > 0);

  // Popular destinations
  const destinationCounts = filteredBookings.reduce((acc, booking) => {
    acc[booking.destination] = (acc[booking.destination] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const popularDestinations = Object.entries(destinationCounts)
    .map(([name, bookings]) => ({ name, bookings }))
    .sort((a, b) => b.bookings - a.bookings)
    .slice(0, 5);

  // Bookings over time (last 30 days)
  const last30Days = eachDayOfInterval({
    start: subDays(new Date(), 29),
    end: new Date()
  });

  const bookingsOverTime = last30Days.map(day => {
    const dayStr = format(day, 'yyyy-MM-dd');
    const dayBookings = bookings.filter(b =>
      format(new Date(b.submitted_at), 'yyyy-MM-dd') === dayStr
    );
    const dayNewsletter = newsletters.filter(n =>
      format(new Date(n.subscribed_at), 'yyyy-MM-dd') === dayStr
    );
    const dayContacts = contacts.filter(c =>
      format(new Date(c.submitted_at), 'yyyy-MM-dd') === dayStr
    );

    return {
      date: format(day, 'MMM dd'),
      bookings: dayBookings.length,
      newsletter: dayNewsletter.length,
      contacts: dayContacts.length
    };
  });

  // Revenue by month (last 6 months)
  const revenueByMonth = Array.from({ length: 6 }, (_, i) => {
    const date = subDays(new Date(), i * 30);
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);

    const monthBookings = bookings.filter(b => {
      const bookingDate = new Date(b.submitted_at);
      return bookingDate >= monthStart && bookingDate <= monthEnd && b.status === 'booked';
    });

    const revenue = monthBookings.reduce((sum, booking) => {
      const avgBudget = budgetMap[booking.budget || ''] || 0;
      return sum + (avgBudget * (booking.adults + booking.children * 0.5));
    }, 0);

    return {
      month: format(date, 'MMM yyyy'),
      revenue: revenue / 1000, // in thousands
      bookings: monthBookings.length
    };
  }).reverse();

  if (loading) {
    return (
      <AdminLayout>
        <LoadingScreen message="Loading analytics..." fullScreen={false} />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold">Analytics & Insights</h1>
            <p className="text-muted-foreground">Comprehensive business metrics and performance analysis</p>
          </div>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-4 py-2 border rounded-lg bg-white"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="all">All Time</option>
          </select>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ${bookedRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                ${quotedRevenue.toLocaleString()} in quoted deals
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Booking Requests</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredBookings.length}</div>
              <div className="flex items-center text-xs mt-1">
                {bookingsTrend >= 0 ? (
                  <ArrowUp className="w-3 h-3 text-green-600 mr-1" />
                ) : (
                  <ArrowDown className="w-3 h-3 text-red-600 mr-1" />
                )}
                <span className={bookingsTrend >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {Math.abs(bookingsTrend).toFixed(1)}%
                </span>
                <span className="text-muted-foreground ml-1">vs previous period</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <Activity className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{conversionRate}%</div>
              <p className="text-xs text-muted-foreground mt-1">
                {filteredBookings.filter(b => b.status === 'booked').length} booked bookings
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Newsletter Subscribers</CardTitle>
              <Mail className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredNewsletters.length}</div>
              <div className="flex items-center text-xs mt-1">
                {newsletterTrend >= 0 ? (
                  <ArrowUp className="w-3 h-3 text-green-600 mr-1" />
                ) : (
                  <ArrowDown className="w-3 h-3 text-red-600 mr-1" />
                )}
                <span className={newsletterTrend >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {Math.abs(newsletterTrend).toFixed(1)}%
                </span>
                <span className="text-muted-foreground ml-1">vs previous period</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Monthly revenue from booked trips (in thousands)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueByMonth}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value: any) => `$${value}k`} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10b981"
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Booking Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Booking Status Distribution</CardTitle>
              <CardDescription>Current status of all booking requests</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={bookingsByStatus}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {bookingsByStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Activity Over Time */}
          <Card>
            <CardHeader>
              <CardTitle>Activity Over Time</CardTitle>
              <CardDescription>Daily bookings, contacts, and newsletter signups</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={bookingsOverTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="bookings" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="newsletter" stroke="#f59e0b" strokeWidth={2} />
                  <Line type="monotone" dataKey="contacts" stroke="#8b5cf6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Popular Destinations */}
          <Card>
            <CardHeader>
              <CardTitle>Popular Destinations</CardTitle>
              <CardDescription>Most requested destinations</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={popularDestinations} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="bookings" fill="#3b82f6" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Average Booking Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                ${filteredBookings.length > 0 ? (totalPotentialRevenue / filteredBookings.length).toFixed(0) : 0}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Per booking request</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Contact Inquiries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{filteredContacts.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {filteredContacts.filter(c => c.status === 'responded').length} responded
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Total Travelers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {filteredBookings.reduce((sum, b) => sum + b.adults + b.children, 0)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {filteredBookings.reduce((sum, b) => sum + b.adults, 0)} adults, {' '}
                {filteredBookings.reduce((sum, b) => sum + b.children, 0)} children
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Financial Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Financial Overview</CardTitle>
            <CardDescription>Revenue breakdown and potential earnings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Booked Revenue</p>
                <p className="text-2xl font-bold text-green-600">${bookedRevenue.toLocaleString()}</p>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-600"
                    style={{ width: `${(bookedRevenue / totalPotentialRevenue) * 100}%` }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Quoted Revenue</p>
                <p className="text-2xl font-bold text-purple-600">${quotedRevenue.toLocaleString()}</p>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-600"
                    style={{ width: `${(quotedRevenue / totalPotentialRevenue) * 100}%` }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Potential Revenue</p>
                <p className="text-2xl font-bold text-blue-600">${totalPotentialRevenue.toLocaleString()}</p>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600" style={{ width: '100%' }} />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Win Rate</p>
                <p className="text-2xl font-bold text-primary">{conversionRate}%</p>
                <p className="text-xs text-muted-foreground">
                  {filteredBookings.filter(b => b.status === 'booked').length} / {filteredBookings.length} converted
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminAnalytics;
