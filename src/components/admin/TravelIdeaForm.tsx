import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { supabase, TravelIdea } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, Image as ImageIcon, Plus, Trash2, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface TravelIdeaFormProps {
  travelIdea?: TravelIdea;
  onSuccess: () => void;
  onCancel: () => void;
}

const TRAVEL_IDEA_CATEGORIES = [
  'Migration Safaris',
  'Romantic Holidays',
  'Safari Beach Holidays',
  'Adventure Seekers',
  'Luxury Tours',
  'Gorilla and Chimp Trekking',
  'Cross Border Safaris',
  'Day Tours',
  'Pilgrimage Tours'
];

export const TravelIdeaForm = ({ travelIdea: editIdea, onSuccess, onCancel }: TravelIdeaFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const getInitialFormData = () => {
    if (editIdea) {
      return {
        title: editIdea.title,
        slug: editIdea.slug,
        description: editIdea.description,
        price: editIdea.price.toString(),
        duration: editIdea.duration.toString(),
        category: editIdea.category,
        category_type: editIdea.category_type || '',
        difficulty: editIdea.difficulty,
      };
    }
    return {
      title: '',
      slug: '',
      description: '',
      price: '',
      duration: '',
      category: 'Migration Safaris' as const,
      category_type: '',
      difficulty: 'Easy' as 'Easy' | 'Moderate' | 'Challenging',
    };
  };

  const [formData, setFormData] = useState(getInitialFormData());
  const [uploadedImages, setUploadedImages] = useState<string[]>(() => {
    if (editIdea) {
      if (editIdea.images && Array.isArray(editIdea.images) && editIdea.images.length > 0) {
        return editIdea.images;
      }
      return editIdea.image ? [editIdea.image] : [];
    }
    return [];
  });

  const [includedItems, setIncludedItems] = useState<string[]>(() => {
    if (editIdea) return Array.isArray(editIdea.included) ? editIdea.included : [];
    return [];
  });

  const [excludedItems, setExcludedItems] = useState<string[]>(() => {
    if (editIdea) return Array.isArray(editIdea.excluded) ? editIdea.excluded : [];
    return [];
  });

  const [itineraryDays, setItineraryDays] = useState<Array<{ day: number; title: string; description: string; activities?: string[]; images?: string[] }>>(() => {
    if (editIdea) {
      const itinerary = Array.isArray(editIdea.itinerary) && editIdea.itinerary.length > 0
        ? editIdea.itinerary.map(day => ({
            ...day,
            activities: Array.isArray(day.activities) ? day.activities : [],
            images: Array.isArray(day.images) ? day.images : []
          }))
        : [];
      return itinerary.length > 0 ? itinerary : [{ day: 1, title: '', description: '', activities: [], images: [] }];
    }
    return [{ day: 1, title: '', description: '', activities: [], images: [] }];
  });

  const [newIncluded, setNewIncluded] = useState('');
  const [newExcluded, setNewExcluded] = useState('');

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      title: value,
      slug: generateSlug(value)
    }));
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `travel-ideas/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      setUploadedImages(prev => [...prev, publicUrl]);

      toast({
        title: 'Success',
        description: 'Image uploaded successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false
  });

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const addIncludedItem = () => {
    if (newIncluded.trim()) {
      setIncludedItems(prev => [...prev, newIncluded.trim()]);
      setNewIncluded('');
    }
  };

  const addExcludedItem = () => {
    if (newExcluded.trim()) {
      setExcludedItems(prev => [...prev, newExcluded.trim()]);
      setNewExcluded('');
    }
  };

  const removeIncludedItem = (index: number) => {
    setIncludedItems(prev => prev.filter((_, i) => i !== index));
  };

  const removeExcludedItem = (index: number) => {
    setExcludedItems(prev => prev.filter((_, i) => i !== index));
  };

  const addItineraryDay = () => {
    setItineraryDays(prev => [...prev, {
      day: prev.length + 1,
      title: '',
      description: '',
      activities: [],
      images: []
    }]);
  };

  const updateItineraryDay = (index: number, field: string, value: any) => {
    setItineraryDays(prev => prev.map((day, i) =>
      i === index ? { ...day, [field]: value } : day
    ));
  };

  const removeItineraryDay = (index: number) => {
    setItineraryDays(prev => prev.filter((_, i) => i !== index).map((day, i) => ({
      ...day,
      day: i + 1
    })));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (uploadedImages.length === 0) {
        throw new Error('Please upload at least one image');
      }

      const validItinerary = itineraryDays.filter(day => day.title.trim() && day.description.trim());

      const ideaData = {
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        price: parseFloat(formData.price),
        duration: parseInt(formData.duration),
        image: uploadedImages[0],
        images: uploadedImages,
        destination: 'Tanzania',
        category: formData.category,
        category_type: formData.category_type || null,
        difficulty: formData.difficulty,
        included: includedItems.filter(item => item.trim()),
        excluded: excludedItems.filter(item => item.trim()),
        itinerary: validItinerary,
      };

      if (editIdea) {
        const { error } = await supabase
          .from('travel_ideas')
          .update(ideaData)
          .eq('id', editIdea.id);

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Travel Idea updated successfully',
        });
      } else {
        const { error } = await supabase
          .from('travel_ideas')
          .insert([ideaData]);

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Travel Idea created successfully',
        });
      }

      onSuccess();
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

  const steps = [
    { number: 1, title: 'Basic Info', description: 'Title, category, pricing' },
    { number: 2, title: 'Images', description: 'Upload photos' },
    { number: 3, title: 'Inclusions', description: 'What\'s included/excluded' },
    { number: 4, title: 'Itinerary', description: 'Day-by-day plan' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                currentStep >= step.number ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
              }`}>
                {currentStep > step.number ? <Check className="w-5 h-5" /> : step.number}
              </div>
              <div className="text-xs font-medium mt-2 text-center">
                <div>{step.title}</div>
                <div className="text-muted-foreground">{step.description}</div>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={`h-1 flex-1 mx-2 transition-colors ${
                currentStep > step.number ? 'bg-primary' : 'bg-muted'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Basic Info */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Enter the main details for this travel idea</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g., 7-Day Serengeti Migration Safari"
                required
              />
            </div>

            <div>
              <Label htmlFor="slug">URL Slug *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="e.g., 7-day-serengeti-migration-safari"
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Travel Idea Category *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value as any }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {TRAVEL_IDEA_CATEGORIES.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="category_type">Experience Type (Optional)</Label>
              <Input
                id="category_type"
                value={formData.category_type}
                onChange={(e) => setFormData(prev => ({ ...prev, category_type: e.target.value }))}
                placeholder="e.g., Wildlife Safari, Cultural Tour, Beach Holiday"
              />
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe this travel idea..."
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price (USD) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="e.g., 2500"
                  required
                />
              </div>

              <div>
                <Label htmlFor="duration">Duration (Days) *</Label>
                <Input
                  id="duration"
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  placeholder="e.g., 7"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="difficulty">Difficulty Level *</Label>
              <Select value={formData.difficulty} onValueChange={(value) => setFormData(prev => ({ ...prev, difficulty: value as any }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Moderate">Moderate</SelectItem>
                  <SelectItem value="Challenging">Challenging</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Images */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Images</CardTitle>
            <CardDescription>Upload photos for this travel idea</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary'
            }`}>
              <input {...getInputProps()} />
              <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                {isDragActive ? 'Drop image here' : 'Drag & drop an image, or click to select'}
              </p>
            </div>

            {uploadedImages.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {uploadedImages.map((url, index) => (
                  <div key={index} className="relative group">
                    <img src={url} alt={`Upload ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-destructive text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    {index === 0 && (
                      <div className="absolute bottom-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
                        Main Image
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 3: Inclusions */}
      {currentStep === 3 && (
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Included</CardTitle>
              <CardDescription>What's included in the package</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newIncluded}
                  onChange={(e) => setNewIncluded(e.target.value)}
                  placeholder="Add included item..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addIncludedItem())}
                />
                <Button type="button" onClick={addIncludedItem} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {includedItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                    <span className="text-sm">{item}</span>
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeIncludedItem(index)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Excluded</CardTitle>
              <CardDescription>What's not included in the package</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newExcluded}
                  onChange={(e) => setNewExcluded(e.target.value)}
                  placeholder="Add excluded item..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addExcludedItem())}
                />
                <Button type="button" onClick={addExcludedItem} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {excludedItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                    <span className="text-sm">{item}</span>
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeExcludedItem(index)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 4: Itinerary */}
      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Itinerary</CardTitle>
            <CardDescription>Day-by-day breakdown</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {itineraryDays.map((day, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Day {day.day}</CardTitle>
                    {itineraryDays.length > 1 && (
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeItineraryDay(index)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={day.title}
                      onChange={(e) => updateItineraryDay(index, 'title', e.target.value)}
                      placeholder="e.g., Arrival in Arusha"
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={day.description}
                      onChange={(e) => updateItineraryDay(index, 'description', e.target.value)}
                      placeholder="Describe the day's activities..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button type="button" onClick={addItineraryDay} variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Day
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6 border-t">
        <div>
          {currentStep > 1 && (
            <Button type="button" variant="outline" onClick={() => setCurrentStep(prev => prev - 1)}>
              Previous
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          {currentStep < 4 ? (
            <Button type="button" onClick={() => setCurrentStep(prev => prev + 1)}>
              Next
            </Button>
          ) : (
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : editIdea ? 'Update Travel Idea' : 'Create Travel Idea'}
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};
