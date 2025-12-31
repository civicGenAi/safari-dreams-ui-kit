import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { Article, supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Clock, User, Calendar, ArrowRight, Search, TrendingUp, BookOpen, Heart } from 'lucide-react';

const WildTales = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [displayedArticles, setDisplayedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState<string[]>([]);
  const [articlesPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadArticles();
  }, []);

  useEffect(() => {
    filterAndPaginateArticles();
  }, [articles, searchQuery, selectedCategory, currentPage]);

  const loadArticles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .order('published_date', { ascending: false });

      if (error) throw error;

      setArticles(data || []);

      const uniqueCategories = Array.from(
        new Set(data?.map(article => article.category) || [])
      );
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndPaginateArticles = () => {
    let filtered = [...articles];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        article =>
          article.title.toLowerCase().includes(query) ||
          article.content.toLowerCase().includes(query) ||
          article.excerpt.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    const totalToShow = currentPage * articlesPerPage;
    setDisplayedArticles(filtered.slice(0, totalToShow));
  };

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setCurrentPage(prev => prev + 1);
      setLoadingMore(false);
    }, 300);
  };

  const getTotalFiltered = () => {
    let filtered = [...articles];
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        article =>
          article.title.toLowerCase().includes(query) ||
          article.content.toLowerCase().includes(query) ||
          article.excerpt.toLowerCase().includes(query)
      );
    }
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }
    return filtered.length;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const hasMore = displayedArticles.length < getTotalFiltered();
  const featuredArticle = articles.find(a => a.is_featured) || articles[0];
  const recentArticles = articles.slice(0, 3);
  const allCategories = ['All', ...categories];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[500px] md:h-[600px]">
        <img
          src="/header_bg_wildbeest.jpg"
          alt="Wild Tales"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/60 to-charcoal/80" />

        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-5xl mx-auto text-center">
              <p className="text-2xl md:text-3xl lg:text-4xl text-white/95 mb-12 leading-relaxed font-light">
                Adventures, wildlife encounters, and insider stories from the heart of Africa
              </p>

              {/* Stats - Circular with Rope Style */}
              <div className="flex items-center justify-center gap-8 md:gap-12">
                <div className="relative">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/10 backdrop-blur-md border-4 border-dashed border-white/40 flex flex-col items-center justify-center shadow-2xl">
                    <div className="text-4xl md:text-5xl font-display font-bold text-white mb-1">150+</div>
                    <div className="text-sm text-white/90">Stories</div>
                  </div>
                </div>
                <div className="relative">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/10 backdrop-blur-md border-4 border-dashed border-white/40 flex flex-col items-center justify-center shadow-2xl">
                    <div className="text-4xl md:text-5xl font-display font-bold text-white mb-1">50K+</div>
                    <div className="text-sm text-white/90">Readers</div>
                  </div>
                </div>
                <div className="relative">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/10 backdrop-blur-md border-4 border-dashed border-white/40 flex flex-col items-center justify-center shadow-2xl">
                    <div className="text-4xl md:text-5xl font-display font-bold text-white mb-1">Weekly</div>
                    <div className="text-sm text-white/90">Updates</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar Section */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search stories, destinations, wildlife..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg rounded-2xl border-2 focus:border-primary shadow-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Story */}
      {!loading && featuredArticle && (
        <div className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">Featured Story</h2>
              <p className="text-muted-foreground">Our most popular tale this week</p>
            </div>
            <div className="relative rounded-3xl overflow-hidden group shadow-2xl">
              <div className="absolute inset-0">
                <img
                  src={featuredArticle.featured_image || '/header_bg_wildbeest.jpg'}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/30" />
              </div>

              <div className="relative z-10 p-8 md:p-12 lg:p-16 min-h-[500px] flex flex-col justify-end">
                <Badge className="mb-4 w-fit bg-secondary text-secondary-foreground shadow-lg">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Featured Story
                </Badge>

                <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-3xl">
                  {featuredArticle.title}
                </h3>

                <p className="text-white/90 text-lg mb-6 max-w-2xl leading-relaxed">
                  {featuredArticle.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm mb-6">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{featuredArticle.author_name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(featuredArticle.published_date || featuredArticle.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{featuredArticle.read_time} min read</span>
                  </div>
                </div>

                <Link to={`/wild-tales/${featuredArticle.slug}`}>
                  <Button variant="gold" size="lg" className="group shadow-2xl">
                    Read Full Story
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content - Blog Posts */}
            <div className="lg:col-span-2">
              {/* Category Filter */}
              <div className="mb-10">
                <h3 className="font-display text-2xl font-bold mb-6">
                  Filter by Topic
                </h3>
                <div className="flex flex-wrap gap-3">
                  {allCategories.map(category => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setCurrentPage(1);
                      }}
                      className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm ${
                        selectedCategory === category
                          ? 'bg-primary text-primary-foreground shadow-md scale-105'
                          : 'bg-card border border-border text-foreground hover:bg-muted hover:scale-105'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

            {/* Blog Posts Grid */}
            {loading ? (
              <div className="space-y-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-card rounded-2xl overflow-hidden border border-border animate-pulse">
                    <div className="grid md:grid-cols-5 gap-6">
                      <div className="md:col-span-2 h-64 bg-muted" />
                      <div className="md:col-span-3 p-6 space-y-4">
                        <div className="h-6 bg-muted rounded w-3/4" />
                        <div className="space-y-2">
                          <div className="h-4 bg-muted rounded" />
                          <div className="h-4 bg-muted rounded" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : displayedArticles.length === 0 ? (
              <div className="text-center py-16 bg-muted/30 rounded-2xl">
                <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground text-lg mb-2">No stories found</p>
                <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="space-y-8">
                {displayedArticles.map((article, index) => (
                  <article
                    key={article.id}
                    className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lift transition-all duration-300 animate-fade-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="grid md:grid-cols-5 gap-6">
                      {/* Image */}
                      <Link
                        to={`/wild-tales/${article.slug}`}
                        className="md:col-span-2 relative h-64 md:h-auto overflow-hidden"
                      >
                        <img
                          src={article.featured_image || '/header_bg_wildbeest.jpg'}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>

                      {/* Content */}
                      <div className="md:col-span-3 p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <Badge variant="secondary">{article.category}</Badge>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              <span>{new Date(article.published_date || article.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                            </div>
                          </div>

                          <Link to={`/wild-tales/${article.slug}`}>
                            <h3 className="font-display text-2xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                              {article.title}
                            </h3>
                          </Link>

                          <p className="text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                            {article.excerpt}
                          </p>

                          {/* Tags */}
                          {article.tags && article.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {article.tags.slice(0, 3).map(tag => (
                                <span
                                  key={tag}
                                  className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                              {article.author_name.charAt(0)}
                            </div>
                            <div>
                              <div className="text-sm font-medium">{article.author_name}</div>
                              <div className="text-xs text-muted-foreground">{article.read_time} min read</div>
                            </div>
                          </div>

                          <Link to={`/wild-tales/${article.slug}`}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-primary gap-1 group-hover:gap-2 transition-all"
                            >
                              Read more
                              <ArrowRight className="w-4 h-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Load More Button */}
            {!loading && hasMore && (
              <div className="text-center mt-12">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                >
                  {loadingMore ? 'Loading...' : 'Load More Stories'}
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  Showing {displayedArticles.length} of {getTotalFiltered()} articles
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-6 border-2 border-primary/30 shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="w-5 h-5 text-primary" />
                  <h3 className="font-heading font-bold text-lg">Never Miss a Story</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Get weekly safari stories, wildlife updates, and travel tips delivered to your inbox.
                </p>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="mb-3"
                />
                <Button variant="primary" className="w-full shadow-md">
                  Subscribe
                </Button>
              </div>

              {/* Recent Posts */}
              <div className="bg-card rounded-2xl p-6 border border-border shadow-md">
                <h3 className="font-heading font-bold text-lg mb-5 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Recent Stories
                </h3>
                <div className="space-y-4">
                  {recentArticles.map(article => (
                    <Link
                      key={article.id}
                      to={`/wild-tales/${article.slug}`}
                      className="flex gap-3 group pb-4 border-b border-border last:border-0 last:pb-0"
                    >
                      <img
                        src={article.featured_image || '/header_bg_wildbeest.jpg'}
                        alt={article.title}
                        className="w-20 h-20 rounded-xl object-cover flex-shrink-0 shadow-sm"
                      />
                      <div className="flex-1 min-w-0 overflow-hidden">
                        <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors mb-2 break-words">
                          {article.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{new Date(article.published_date || article.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Popular Topics */}
              <div className="bg-card rounded-2xl p-6 border border-border shadow-md">
                <h3 className="font-heading font-bold text-lg mb-4">Popular Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.slice(0, 5).map(category => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setCurrentPage(1);
                      }}
                      className="px-4 py-2 rounded-full text-xs font-semibold bg-muted hover:bg-primary hover:text-primary-foreground transition-all shadow-sm"
                    >
                      #{category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default WildTales;
