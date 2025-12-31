import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Article, supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Clock,
  Tag,
  Star,
  FileText,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const AdminArticles = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setArticles(data || []);

      // Extract unique categories
      const uniqueCategories = Array.from(
        new Set(data?.map(article => article.category) || [])
      );
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error loading articles:', error);
      toast({
        title: 'Error',
        description: 'Failed to load articles',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Article Deleted',
        description: `"${title}" has been deleted`,
      });

      loadArticles();
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete article',
        variant: 'destructive',
      });
    }
  };

  // Filter articles
  const filteredArticles = articles.filter(article => {
    // Search filter
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter
    const matchesStatus =
      statusFilter === 'all' || article.status === statusFilter;

    // Category filter
    const matchesCategory =
      categoryFilter === 'all' || article.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold">Wild Tales Articles</h1>
            <p className="text-muted-foreground">
              Manage your blog articles and stories
            </p>
          </div>

          <Button onClick={() => navigate('/admin/articles/new')}>
            <Plus className="w-4 h-4 mr-2" />
            New Article
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Articles</p>
                  <p className="text-2xl font-bold">{articles.length}</p>
                </div>
                <FileText className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Published</p>
                  <p className="text-2xl font-bold">
                    {articles.filter(a => a.status === 'published').length}
                  </p>
                </div>
                <Eye className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Drafts</p>
                  <p className="text-2xl font-bold">
                    {articles.filter(a => a.status === 'draft').length}
                  </p>
                </div>
                <FileText className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Featured</p>
                  <p className="text-2xl font-bold">
                    {articles.filter(a => a.is_featured).length}
                  </p>
                </div>
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'draft' | 'published')}
                className="px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>

              {/* Category Filter */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Articles List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-muted-foreground">Loading articles...</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery || statusFilter !== 'all' || categoryFilter !== 'all'
                  ? 'Try adjusting your filters'
                  : 'Get started by creating your first article'}
              </p>
              {!searchQuery && statusFilter === 'all' && categoryFilter === 'all' && (
                <Button onClick={() => navigate('/admin/articles/new')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Article
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    {/* Featured Image */}
                    {article.featured_image && (
                      <div className="flex-shrink-0">
                        <img
                          src={article.featured_image}
                          alt={article.title}
                          className="w-48 h-32 object-cover rounded-lg"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-heading font-bold">
                              {article.title}
                            </h3>
                            {article.is_featured && (
                              <Star className="w-4 h-4 text-yellow-600 fill-yellow-600" />
                            )}
                          </div>

                          <p className="text-muted-foreground line-clamp-2 mb-3">
                            {article.excerpt}
                          </p>

                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Tag className="w-4 h-4" />
                              {article.category}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(article.created_at)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {article.read_time} min read
                            </div>
                            <div className="flex items-center gap-1">
                              By {article.author_name}
                            </div>
                          </div>

                          {article.tags && article.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {article.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <Badge
                            variant={article.status === 'published' ? 'default' : 'secondary'}
                          >
                            {article.status === 'published' ? 'Published' : 'Draft'}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/admin/articles/edit/${article.id}`)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>

                      {article.status === 'published' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(`/wild-tales/${article.slug}`, '_blank')}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      )}

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(article.id, article.title)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Results Count */}
        {!loading && filteredArticles.length > 0 && (
          <div className="text-center text-sm text-muted-foreground">
            Showing {filteredArticles.length} of {articles.length} articles
          </div>
        )}
      </div>
    </div>
  );
};
