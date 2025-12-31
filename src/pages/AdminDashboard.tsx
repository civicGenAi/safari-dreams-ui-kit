import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, Package } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, LogOut, X } from 'lucide-react';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const { toast } = useToast();
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    price: '',
    duration: '',
    image: '',
    destination: '',
    category: '',
    difficulty: 'Easy' as 'Easy' | 'Moderate' | 'Challenging',
    included: '',
    excluded: '',
    itinerary: '',
  });

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

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      description: '',
      price: '',
      duration: '',
      image: '',
      destination: '',
      category: '',
      difficulty: 'Easy',
      included: '',
      excluded: '',
      itinerary: '',
    });
    setEditingPackage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const packageData = {
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        price: parseFloat(formData.price),
        duration: parseInt(formData.duration),
        image: formData.image,
        destination: formData.destination,
        category: formData.category,
        difficulty: formData.difficulty,
        included: formData.included ? formData.included.split('\n').filter(i => i.trim()) : [],
        excluded: formData.excluded ? formData.excluded.split('\n').filter(i => i.trim()) : [],
        itinerary: formData.itinerary ? JSON.parse(formData.itinerary) : [],
      };

      if (editingPackage) {
        const { error } = await supabase
          .from('packages')
          .update(packageData)
          .eq('id', editingPackage.id);

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Package updated successfully',
        });
      } else {
        const { error } = await supabase
          .from('packages')
          .insert([packageData]);

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Package created successfully',
        });
      }

      setDialogOpen(false);
      resetForm();
      fetchPackages();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (pkg: Package) => {
    setEditingPackage(pkg);
    setFormData({
      title: pkg.title,
      slug: pkg.slug,
      description: pkg.description,
      price: pkg.price.toString(),
      duration: pkg.duration.toString(),
      image: pkg.image,
      destination: pkg.destination,
      category: pkg.category,
      difficulty: pkg.difficulty,
      included: Array.isArray(pkg.included) ? pkg.included.join('\n') : '',
      excluded: Array.isArray(pkg.excluded) ? pkg.excluded.join('\n') : '',
      itinerary: JSON.stringify(pkg.itinerary, null, 2),
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this package?')) return;

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

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-3xl font-bold">Manage Packages</h2>
          <Dialog open={dialogOpen} onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button variant="primary" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Package
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingPackage ? 'Edit Package' : 'Add New Package'}
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug *</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => handleInputChange('slug', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (days) *</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={formData.duration}
                      onChange={(e) => handleInputChange('duration', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination *</Label>
                    <Select value={formData.destination} onValueChange={(value) => handleInputChange('destination', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select destination" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tanzania">Tanzania</SelectItem>
                        <SelectItem value="Kenya">Kenya</SelectItem>
                        <SelectItem value="Rwanda">Rwanda</SelectItem>
                        <SelectItem value="Uganda">Uganda</SelectItem>
                        <SelectItem value="South Africa">South Africa</SelectItem>
                        <SelectItem value="Namibia">Namibia</SelectItem>
                        <SelectItem value="Botswana">Botswana</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Safari">Safari</SelectItem>
                        <SelectItem value="Trekking">Trekking</SelectItem>
                        <SelectItem value="Wildlife">Wildlife</SelectItem>
                        <SelectItem value="Beach">Beach</SelectItem>
                        <SelectItem value="Luxury">Luxury</SelectItem>
                        <SelectItem value="Adventure">Adventure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty *</Label>
                    <Select value={formData.difficulty} onValueChange={(value) => handleInputChange('difficulty', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Moderate">Moderate</SelectItem>
                        <SelectItem value="Challenging">Challenging</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Image URL *</Label>
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) => handleInputChange('image', e.target.value)}
                      placeholder="/src/assets/..."
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="included">Included (one per line)</Label>
                  <Textarea
                    id="included"
                    value={formData.included}
                    onChange={(e) => handleInputChange('included', e.target.value)}
                    rows={5}
                    placeholder="Park fees&#10;Accommodation&#10;Meals"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excluded">Excluded (one per line)</Label>
                  <Textarea
                    id="excluded"
                    value={formData.excluded}
                    onChange={(e) => handleInputChange('excluded', e.target.value)}
                    rows={5}
                    placeholder="International flights&#10;Tips&#10;Personal items"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="itinerary">Itinerary (JSON format)</Label>
                  <Textarea
                    id="itinerary"
                    value={formData.itinerary}
                    onChange={(e) => handleInputChange('itinerary', e.target.value)}
                    rows={8}
                    placeholder='[{"day": 1, "title": "Arrival", "description": "..."}]'
                  />
                </div>

                <div className="flex gap-3 justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setDialogOpen(false);
                      resetForm();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary">
                    {editingPackage ? 'Update Package' : 'Create Package'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6">
          {packages.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl">
              <p className="text-muted-foreground">No packages yet. Add your first package!</p>
            </div>
          ) : (
            packages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-2xl shadow-sm p-6 flex gap-6">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-48 h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-display text-xl font-bold mb-1">{pkg.title}</h3>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>{pkg.destination}</span>
                        <span>•</span>
                        <span>{pkg.category}</span>
                        <span>•</span>
                        <span>{pkg.duration} days</span>
                        <span>•</span>
                        <span>${pkg.price}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
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
                        onClick={() => handleDelete(pkg.id)}
                        className="gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{pkg.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
