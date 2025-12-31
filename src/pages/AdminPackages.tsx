import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { PackageForm } from '@/components/admin/PackageForm';
import { supabase, Package } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { LoadingScreen } from '@/components/ui/loading';
import { Plus, Edit, Trash2, Search, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AdminPackages = () => {
  const { toast } = useToast();
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPackages(data || []);
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

  const handleEdit = (pkg: Package) => {
    setEditingPackage(pkg);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const { error } = await supabase
        .from('packages')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Package deleted successfully',
      });

      fetchPackages();
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
    setEditingPackage(null);
    fetchPackages();
  };

  const filteredPackages = packages.filter(pkg =>
    pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pkg.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pkg.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <AdminLayout>
        <LoadingScreen message="Loading packages..." fullScreen={false} />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold">Packages</h1>
            <p className="text-muted-foreground">Manage your tour packages</p>
          </div>
          <Button
            onClick={() => {
              setEditingPackage(null);
              setDialogOpen(true);
            }}
            variant="primary"
            size="lg"
            className="gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New Package
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
                placeholder="Search packages by title, destination, or category..."
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{packages.length}</div>
              <div className="text-sm text-muted-foreground">Total Packages</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                {new Set(packages.map(p => p.destination)).size}
              </div>
              <div className="text-sm text-muted-foreground">Destinations</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                {new Set(packages.map(p => p.category)).size}
              </div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                ${Math.round(packages.reduce((sum, p) => sum + p.price, 0) / packages.length || 0)}
              </div>
              <div className="text-sm text-muted-foreground">Avg. Price</div>
            </CardContent>
          </Card>
        </div>

        {/* Packages List */}
        <div className="space-y-4">
          {filteredPackages.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <p className="text-muted-foreground">
                  {searchQuery ? 'No packages match your search' : 'No packages yet. Add your first package!'}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredPackages.map((pkg) => (
              <Card key={pkg.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex gap-6">
                    {/* Image */}
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-48 h-32 object-cover rounded-lg flex-shrink-0"
                    />

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display text-xl font-bold mb-1 truncate">
                            {pkg.title}
                          </h3>
                          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-2">
                            <span className="inline-flex items-center gap-1 bg-muted px-2 py-0.5 rounded">
                              {pkg.destination}
                            </span>
                            <span className="inline-flex items-center gap-1 bg-muted px-2 py-0.5 rounded">
                              {pkg.category}
                            </span>
                            <span className="inline-flex items-center gap-1 bg-muted px-2 py-0.5 rounded">
                              {pkg.difficulty}
                            </span>
                            <span className="inline-flex items-center gap-1 bg-muted px-2 py-0.5 rounded">
                              {pkg.duration} days
                            </span>
                            <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2 py-0.5 rounded font-semibold">
                              ${pkg.price}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 flex-shrink-0">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(`/tours/${pkg.slug}`, '_blank')}
                            className="gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            Preview
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(pkg)}
                            className="gap-2"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(pkg.id, pkg.title)}
                            className="gap-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </Button>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {pkg.description}
                      </p>

                      {/* Details */}
                      <div className="grid grid-cols-3 gap-4 text-xs text-muted-foreground">
                        <div>
                          <span className="font-semibold">Included:</span>{' '}
                          {Array.isArray(pkg.included) ? pkg.included.length : 0} items
                        </div>
                        <div>
                          <span className="font-semibold">Excluded:</span>{' '}
                          {Array.isArray(pkg.excluded) ? pkg.excluded.length : 0} items
                        </div>
                        <div>
                          <span className="font-semibold">Itinerary:</span>{' '}
                          {Array.isArray(pkg.itinerary) ? pkg.itinerary.length : 0} days
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
        if (!open) setEditingPackage(null);
      }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPackage ? 'Edit Package' : 'Add New Package'}
            </DialogTitle>
          </DialogHeader>
          <PackageForm
            package={editingPackage || undefined}
            onSuccess={handleSuccess}
            onCancel={() => {
              setDialogOpen(false);
              setEditingPackage(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminPackages;
