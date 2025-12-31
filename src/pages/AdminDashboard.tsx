import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { supabase, Package, Article, TravelIdea } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingScreen } from '@/components/ui/loading';
import { Package as PackageIcon, TrendingUp, MapPin, Tag, DollarSign, Calendar, FileText, Eye, FileCog, Lightbulb } from 'lucide-react';

const AdminDashboard = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [travelIdeas, setTravelIdeas] = useState<TravelIdea[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [packagesResult, travelIdeasResult, articlesResult] = await Promise.all([
        supabase.from('packages').select('*').order('created_at', { ascending: false }),
        supabase.from('travel_ideas').select('*').order('created_at', { ascending: false }),
        supabase.from('articles').select('*').order('created_at', { ascending: false }),
      ]);

      if (packagesResult.error) throw packagesResult.error;
      if (travelIdeasResult.error) throw travelIdeasResult.error;
      if (articlesResult.error) throw articlesResult.error;

      setPackages(packagesResult.data || []);
      setTravelIdeas(travelIdeasResult.data || []);
      setArticles(articlesResult.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

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

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Packages</CardTitle>
              <PackageIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPackages}</div>
              <p className="text-xs text-muted-foreground">Active tour packages</p>
            </CardContent>
          </Card>

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
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <Tag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.categories}</div>
              <p className="text-xs text-muted-foreground">Tour categories</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Price</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.avgPrice}</div>
              <p className="text-xs text-muted-foreground">Per person</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Combined package value</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Duration</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgDuration} days</div>
              <p className="text-xs text-muted-foreground">Average tour length</p>
            </CardContent>
          </Card>

          {/* Article Stats */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalArticles}</div>
              <p className="text-xs text-muted-foreground">Blog articles</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.publishedArticles}</div>
              <p className="text-xs text-muted-foreground">Live articles</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Drafts</CardTitle>
              <FileCog className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.draftArticles}</div>
              <p className="text-xs text-muted-foreground">Unpublished drafts</p>
            </CardContent>
          </Card>
        </div>

        {/* Breakdowns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Destinations */}
          <Card>
            <CardHeader>
              <CardTitle>Packages by Destination</CardTitle>
              <CardDescription>Distribution across countries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(destinationBreakdown)
                  .sort((a, b) => b[1] - a[1])
                  .map(([destination, count]) => (
                    <div key={destination} className="flex items-center">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{destination}</span>
                          <span className="text-sm text-muted-foreground">{count} packages</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${(count / stats.totalPackages) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Packages by Category</CardTitle>
              <CardDescription>Tour type distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(categoryBreakdown)
                  .sort((a, b) => b[1] - a[1])
                  .map(([category, count]) => (
                    <div key={category} className="flex items-center">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{category}</span>
                          <span className="text-sm text-muted-foreground">{count} packages</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-secondary h-2 rounded-full"
                            style={{ width: `${(count / stats.totalPackages) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Packages */}
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

