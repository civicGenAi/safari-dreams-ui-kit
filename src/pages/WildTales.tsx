import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { mockBlogPosts } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Clock, User, Calendar, ArrowRight, Search, TrendingUp, BookOpen, Heart } from 'lucide-react';

const WildTales = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  // Extract all unique tags
  const allTags = ['All', ...Array.from(new Set(mockBlogPosts.flatMap(p => p.tags)))];

  // Filter posts based on search and tag
  const filteredPosts = mockBlogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'All' || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const featuredPost = mockBlogPosts.find(p => p.featured);
  const recentPosts = mockBlogPosts.slice(0, 3);
  const popularTags = ['Safari', 'Wildlife', 'Tanzania', 'Great Migration', 'Trekking'];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-background" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6 animate-fade-in">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-sm font-heading font-medium text-primary">Stories from the Wild</span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-up">
              Wild <span className="text-gradient-gold">Tales</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Adventures, wildlife encounters, and insider stories from the heart of Africa.
              Discover the untold tales of safari life, conservation heroes, and breathtaking journeys.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search stories, destinations, wildlife..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 text-lg rounded-2xl border-2 focus:border-primary"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <div className="text-center">
                <div className="text-3xl font-display font-bold text-primary mb-1">150+</div>
                <div className="text-sm text-muted-foreground">Stories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-display font-bold text-primary mb-1">50K+</div>
                <div className="text-sm text-muted-foreground">Readers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-display font-bold text-primary mb-1">Weekly</div>
                <div className="text-sm text-muted-foreground">Updates</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Story */}
      {featuredPost && (
        <div className="container mx-auto px-4 lg:px-8 mb-16">
          <div className="relative rounded-3xl overflow-hidden group shadow-2xl">
            <div className="absolute inset-0">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-transparent" />
            </div>

            <div className="relative z-10 p-8 md:p-12 lg:p-16 min-h-[500px] flex flex-col justify-end">
              <Badge className="mb-4 w-fit bg-secondary text-secondary-foreground">
                <TrendingUp className="w-3 h-3 mr-1" />
                Featured Story
              </Badge>

              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-3xl">
                {featuredPost.title}
              </h2>

              <p className="text-white/90 text-lg mb-6 max-w-2xl leading-relaxed">
                {featuredPost.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm mb-6">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{featuredPost.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{featuredPost.readTime}</span>
                </div>
              </div>

              <Link to={`/wild-tales/${featuredPost.slug}`}>
                <Button variant="gold" size="lg" className="group">
                  Read Full Story
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 lg:px-8 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Blog Posts */}
          <div className="lg:col-span-2">
            {/* Tag Filter */}
            <div className="mb-8">
              <h3 className="text-sm font-heading font-semibold mb-4 text-muted-foreground uppercase tracking-wider">
                Filter by Topic
              </h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedTag === tag
                        ? 'bg-primary text-primary-foreground shadow-md scale-105'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:scale-105'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Blog Posts Grid */}
            {filteredPosts.length === 0 ? (
              <div className="text-center py-16 bg-muted/30 rounded-2xl">
                <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground text-lg mb-2">No stories found</p>
                <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="space-y-8">
                {filteredPosts.map((post, index) => (
                  <article
                    key={post.id}
                    className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lift transition-all duration-300 animate-fade-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="grid md:grid-cols-5 gap-6">
                      {/* Image */}
                      <Link
                        to={`/wild-tales/${post.slug}`}
                        className="md:col-span-2 relative h-64 md:h-auto overflow-hidden"
                      >
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>

                      {/* Content */}
                      <div className="md:col-span-3 p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <Badge variant="secondary">{post.category}</Badge>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                            </div>
                          </div>

                          <Link to={`/wild-tales/${post.slug}`}>
                            <h3 className="font-display text-2xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                          </Link>

                          <p className="text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                            {post.excerpt}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 3).map(tag => (
                              <span
                                key={tag}
                                className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                              {post.author.charAt(0)}
                            </div>
                            <div>
                              <div className="text-sm font-medium">{post.author}</div>
                              <div className="text-xs text-muted-foreground">{post.readTime}</div>
                            </div>
                          </div>

                          <Link to={`/wild-tales/${post.slug}`}>
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
            {filteredPosts.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Stories
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20">
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="w-5 h-5 text-primary" />
                  <h3 className="font-heading font-semibold">Never Miss a Story</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Get weekly safari stories, wildlife updates, and travel tips delivered to your inbox.
                </p>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="mb-3"
                />
                <Button variant="primary" className="w-full">
                  Subscribe
                </Button>
              </div>

              {/* Recent Posts */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Recent Stories
                </h3>
                <div className="space-y-4">
                  {recentPosts.map(post => (
                    <Link
                      key={post.id}
                      to={`/wild-tales/${post.slug}`}
                      className="flex gap-3 group"
                    >
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors mb-1">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="font-heading font-semibold mb-4">Popular Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className="px-3 py-1.5 rounded-full text-xs font-medium bg-muted hover:bg-primary hover:text-primary-foreground transition-all"
                    >
                      #{tag}
                    </button>
                  ))}
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
