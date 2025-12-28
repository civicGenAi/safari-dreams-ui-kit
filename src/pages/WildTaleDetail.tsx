import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { NewsletterSection } from '@/components/NewsletterSection';
import { mockBlogPosts } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';

const WildTaleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = mockBlogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 lg:px-8 py-24 text-center">
          <h1 className="text-4xl font-display font-bold mb-4">Story Not Found</h1>
          <p className="text-muted-foreground mb-8">The story you're looking for doesn't exist.</p>
          <Link to="/wild-tales">
            <Button variant="primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Wild Tales
            </Button>
          </Link>
        </div>
        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  const relatedPosts = mockBlogPosts
    .filter((p) => p.id !== post.id && p.tags.some((tag) => post.tags.includes(tag)))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <div className="relative h-[500px] md:h-[600px]">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/30" />

        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 lg:px-8 pb-16">
            <Link to="/wild-tales" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Wild Tales
            </Link>

            <Badge className="mb-4 bg-secondary text-secondary-foreground">{post.category}</Badge>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <article className="prose prose-lg max-w-none">
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  {post.excerpt}
                </p>

                <div className="space-y-6 text-foreground">
                  {post.content.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="leading-relaxed">{paragraph}</p>
                  ))}
                </div>

                {/* Tags */}
                <div className="mt-12 pt-8 border-t border-border">
                  <h3 className="font-heading font-semibold mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-sm">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Share */}
                <div className="mt-8 pt-8 border-t border-border">
                  <h3 className="font-heading font-semibold mb-4">Share this story</h3>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Facebook className="w-4 h-4" />
                      Facebook
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Twitter className="w-4 h-4" />
                      Twitter
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </article>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Author */}
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <h3 className="font-heading font-bold text-lg mb-4">About the Author</h3>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl flex-shrink-0">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{post.author}</h4>
                      <p className="text-sm text-muted-foreground">
                        Wildlife expert and conservation advocate with years of experience in African safaris.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <div className="bg-card rounded-2xl p-6 border border-border">
                    <h3 className="font-heading font-bold text-lg mb-4">Related Stories</h3>
                    <div className="space-y-4">
                      {relatedPosts.map((relatedPost) => (
                        <Link
                          key={relatedPost.id}
                          to={`/wild-tales/${relatedPost.slug}`}
                          className="group block"
                        >
                          <div className="flex gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                            <img
                              src={relatedPost.image}
                              alt={relatedPost.title}
                              className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors mb-1">
                                {relatedPost.title}
                              </h4>
                              <div className="text-xs text-muted-foreground">
                                {new Date(relatedPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <NewsletterSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default WildTaleDetail;
