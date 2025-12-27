import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { mockBlogPosts } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, User, Calendar, ArrowRight } from 'lucide-react';

const TravelIdeas = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', ...Array.from(new Set(mockBlogPosts.map(p => p.category)))];

  const filteredPosts = selectedCategory === 'All'
    ? mockBlogPosts
    : mockBlogPosts.filter(p => p.category === selectedCategory);

  const featuredPost = mockBlogPosts.find(p => p.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16">
        {/* Hero */}
        <div className="container mx-auto px-4 lg:px-8 mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Travel Ideas & <span className="text-gradient-gold">Inspiration</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Expert tips, destination guides, and stories from the wild to help you plan your perfect safari adventure.
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="container mx-auto px-4 lg:px-8 mb-12">
            <div className="relative h-[500px] rounded-3xl overflow-hidden group">
              <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <Badge className="mb-4">{featuredPost.category}</Badge>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-white/90 text-lg mb-6 max-w-2xl">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-6 text-white/80 text-sm mb-6">
                  <div className="flex items-center gap-2"><User className="w-4 h-4" /> {featuredPost.author}</div>
                  <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {new Date(featuredPost.date).toLocaleDateString()}</div>
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {featuredPost.readTime}</div>
                </div>
                <Link to={`/travel-ideas/${featuredPost.slug}`}>
                  <Button variant="gold">Read Article <ArrowRight className="w-4 h-4 ml-2" /></Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="container mx-auto px-4 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-heading text-sm transition-all ${
                  selectedCategory === cat ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
                }`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map(post => (
              <article key={post.id} className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lift transition-all">
                <Link to={`/travel-ideas/${post.slug}`} className="block relative h-56 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                  <Badge className="absolute top-3 left-3">{post.category}</Badge>
                </Link>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <Link to={`/travel-ideas/${post.slug}`}>
                    <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{post.author}</span>
                    <Link to={`/travel-ideas/${post.slug}`} className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read more <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default TravelIdeas;
