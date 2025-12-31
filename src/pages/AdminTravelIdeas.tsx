import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { PackageForm } from '@/components/admin/PackageForm';
import { supabase, TravelIdea } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { LoadingScreen } from '@/components/ui/loading';
import { Plus, Edit, Trash2, Search, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AdminTravelIdeas = () => {
  const { toast } = useToast();
  const [travelIdeas, setTravelIdeas] = useState<TravelIdea[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingIdea, setEditingIdea] = useState<TravelIdea | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchTravelIdeas();
  }, []);

  const fetchTravelIdeas = async () => {
    try {
      const { data, error } = await supabase
        .from('travel_ideas')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTravelIdeas(data || []);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (idea: TravelIdea) => {
    setEditingIdea(idea);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const { error} = await supabase
        .from('travel_ideas')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Travel Idea deleted successfully',
      });

      fetchTravelIdeas();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleSuccess = () => {
    setDialogOpen(false);
    setEditingIdea(null);
    fetchTravelIdeas();
  };

  const filteredIdeas = travelIdeas.filter(idea =>
    idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    idea.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
    idea.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <AdminLayout>
        <LoadingScreen message="Loading travel ideas..." fullScreen={false} />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold">Travel Ideas</h1>
            <p className="text-muted-foreground">Manage specialized travel experiences</p>
          </div>
          <Button
            onClick={() => {
              setEditingIdea(null);
              setDialogOpen(true);
            }}
            variant="primary"
            size="lg"
            className="gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New Travel Idea
          </Button>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search travel ideas by title, destination, or category..."
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{travelIdeas.length}</div>
              <div className="text-sm text-muted-foreground">Total Travel Ideas</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                {new Set(travelIdeas.map(p => p.destination)).size}
              </div>
              <div className="text-sm text-muted-foreground">Destinations</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                {new Set(travelIdeas.map(p => p.category)).size}
              </div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                ${Math.round(travelIdeas.reduce((sum, p) => sum + p.price, 0) / travelIdeas.length || 0)}
              </div>
              <div className="text-sm text-muted-foreground">Avg. Price</div>
            </CardContent>
          </Card>
        </div>

        {/* Travel Ideas List */}
        <div className="space-y-4">
          {filteredIdeas.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <p className="text-muted-foreground">
                  {searchQuery ? 'No travel ideas match your search' : 'No travel ideas yet. Add your first travel idea!'}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredIdeas.map((idea) => (
              <Card key={idea.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex gap-6">
                    {/* Image */}
                    <img
                      src={idea.image}
                      alt={idea.title}
                      className="w-48 h-32 object-cover rounded-lg flex-shrink-0"
                    />

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display text-xl font-bold mb-1 truncate">
                            {idea.title}
                          </h3>
                          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-2">
                            <span className="inline-flex items-center gap-1 bg-muted px-2 py-0.5 rounded">
                              {idea.destination}
                            </span>
                            <span className="inline-flex items-center gap-1 bg-muted px-2 py-0.5 rounded">
                              {idea.category}
                            </span>
                            <span className="inline-flex items-center gap-1 bg-muted px-2 py-0.5 rounded">
                              {idea.difficulty}
                            </span>
                            <span className="inline-flex items-center gap-1 bg-muted px-2 py-0.5 rounded">
                              {idea.duration} days
                            </span>
                            <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2 py-0.5 rounded font-semibold">
                              ${idea.price}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 flex-shrink-0">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(`/travel-ideas/${idea.slug}`, '_blank')}
                            className="gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            Preview
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(idea)}
                            className="gap-2"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(idea.id, idea.title)}
                            className="gap-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </Button>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {idea.description}
                      </p>

                      {/* Details */}
                      <div className="grid grid-cols-3 gap-4 text-xs text-muted-foreground">
                        <div>
                          <span className="font-semibold">Included:</span>{' '}
                          {Array.isArray(idea.included) ? idea.included.length : 0} items
                        </div>
                        <div>
                          <span className="font-semibold">Excluded:</span>{' '}
                          {Array.isArray(idea.excluded) ? idea.excluded.length : 0} items
                        </div>
                        <div>
                          <span className="font-semibold">Itinerary:</span>{' '}
                          {Array.isArray(idea.itinerary) ? idea.itinerary.length : 0} days
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={(open) => {
        setDialogOpen(open);
        if (!open) setEditingIdea(null);
      }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingIdea ? 'Edit Travel Idea' : 'Add New Travel Idea'}
            </DialogTitle>
          </DialogHeader>
          <PackageForm
            package={editingIdea || undefined}
            tableName="travel_ideas"
            onSuccess={handleSuccess}
            onCancel={() => {
              setDialogOpen(false);
              setEditingIdea(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminTravelIdeas;
