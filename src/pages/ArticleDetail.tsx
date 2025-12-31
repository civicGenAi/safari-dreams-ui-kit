import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Article, supabase } from '@/lib/supabase';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, User, ArrowLeft, ArrowRight, Tag } from 'lucide-react';

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      loadArticle();
    }
  }, [slug]);

  const loadArticle = async () => {
    setLoading(true);

    try {
      // Load main article
      const { data: articleData, error: articleError } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (articleError) throw articleError;

      setArticle(articleData);

      // Load related articles (same category OR matching tags)
      if (articleData) {
        const { data: relatedData, error: relatedError } = await supabase
          .from('articles')
          .select('*')
          .eq('status', 'published')
          .neq('id', articleData.id)
          .or(`category.eq.${articleData.category}`)
          .limit(3);

        if (!relatedError && relatedData) {
          setRelatedArticles(relatedData);
        }
      }
    } catch (error) {
      console.error('Error loading article:', error);
      navigate('/wild-tales');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-muted rounded w-3/4" />
            <div className="h-96 bg-muted rounded" />
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded" />
              <div className="h-4 bg-muted rounded" />
              <div className="h-4 bg-muted rounded w-5/6" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <Button onClick={() => navigate('/wild-tales')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Wild Tales
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/wild-tales')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Wild Tales
          </Button>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Badge className="bg-primary text-primary-foreground">
              {article.category}
            </Badge>
            {article.is_featured && (
              <Badge variant="gold">Featured</Badge>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span className="font-medium">{article.author_name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{formatDate(article.published_date || article.created_at)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{article.read_time} min read</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {article.featured_image && (
          <div className="mb-12 rounded-2xl overflow-hidden">
            <img
              src={article.featured_image}
              alt={article.title}
              className="w-full h-[500px] object-cover"
            />
          </div>
        )}

        {/* Article Content */}
        <div
          className="prose prose-lg prose-headings:font-display prose-headings:font-bold prose-h2:text-3xl prose-h3:text-2xl prose-p:text-muted-foreground prose-p:leading-relaxed prose-strong:text-foreground prose-strong:font-semibold prose-ul:text-muted-foreground prose-li:text-muted-foreground max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mb-12 pb-12 border-b">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-5 h-5 text-primary" />
              <h3 className="font-heading font-semibold text-lg">Tags</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Author Bio */}
        <div className="mb-12 p-6 bg-muted/50 rounded-xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl">
              {article.author_name.charAt(0)}
            </div>
            <div>
              <h4 className="font-heading font-semibold text-lg mb-1">
                {article.author_name}
              </h4>
              <p className="text-sm text-muted-foreground">
                Sharing stories and insights from the heart of Africa's wilderness
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="bg-muted/30 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-display font-bold mb-8">Related Stories</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedArticles.map(relatedArticle => (
                <Link
                  key={relatedArticle.id}
                  to={`/wild-tales/${relatedArticle.slug}`}
                  className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {relatedArticle.featured_image && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={relatedArticle.featured_image}
                        alt={relatedArticle.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-primary text-primary-foreground">
                          {relatedArticle.category}
                        </Badge>
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    <h3 className="text-xl font-heading font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {relatedArticle.title}
                    </h3>

                    <p className="text-muted-foreground line-clamp-2 mb-4 text-sm">
                      {relatedArticle.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{formatDate(relatedArticle.published_date || relatedArticle.created_at)}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {relatedArticle.read_time} min
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button onClick={() => navigate('/wild-tales')} variant="outline" size="lg">
                View All Stories
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      )}

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ArticleDetail;
