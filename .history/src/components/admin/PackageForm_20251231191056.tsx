import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { supabase, Package } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, Image as ImageIcon, Plus, Trash2, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PackageFormProps {
  package?: Package;
  tableName?: 'packages' | 'travel_ideas';
  onSuccess: () => void;
  onCancel: () => void;
}

export const PackageForm = ({ package: editPackage, tableName = 'packages', onSuccess, onCancel }: PackageFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Get stored form data or use editPackage data
  const getInitialFormData = () => {
    if (editPackage) {
      return {
        title: editPackage.title,
        slug: editPackage.slug,
        description: editPackage.description,
        price: editPackage.price.toString(),
        duration: editPackage.duration.toString(),
        destination: editPackage.destination,
        category: editPackage.category,
        difficulty: editPackage.difficulty,
      };
    }
    const stored = localStorage.getItem('packageFormData');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {}
    }
    return {
      title: '',
      slug: '',
      description: '',
      price: '',
      duration: '',
      destination: '',
      category: '',
      difficulty: 'Easy' as 'Easy' | 'Moderate' | 'Challenging',
    };
  };

  const [formData, setFormData] = useState(getInitialFormData());

  const [uploadedImages, setUploadedImages] = useState<string[]>(() => {
    if (editPackage) {
      if (editPackage.images && Array.isArray(editPackage.images) && editPackage.images.length > 0) {
        return editPackage.images;
      }
      return editPackage.image ? [editPackage.image] : [];
    }
    const stored = localStorage.getItem('packageFormImages');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {}
    }
    return [];
  });

  const [includedItems, setIncludedItems] = useState<string[]>(() => {
    if (editPackage) return Array.isArray(editPackage.included) ? editPackage.included : [];
    const stored = localStorage.getItem('packageFormIncluded');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {}
    }
    return [];
  });

  const [excludedItems, setExcludedItems] = useState<string[]>(() => {
    if (editPackage) return Array.isArray(editPackage.excluded) ? editPackage.excluded : [];
    const stored = localStorage.getItem('packageFormExcluded');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {}
    }
    return [];
  });

  const [itineraryDays, setItineraryDays] = useState<Array<{ day: number; title: string; description: string; activities?: string[]; images?: string[] }>>(() => {
    if (editPackage) {
      const itinerary = Array.isArray(editPackage.itinerary) && editPackage.itinerary.length > 0
        ? editPackage.itinerary.map(day => ({
            ...day,
            activities: day.activities || [],
            images: day.images || []
          }))
        : [{ day: 1, title: '', description: '', activities: [], images: [] }];
      return itinerary;
    }
    const stored = localStorage.getItem('packageFormItinerary');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.length > 0 ? parsed : [{ day: 1, title: '', description: '', activities: [], images: [] }];
      } catch {}
    }
    return [{ day: 1, title: '', description: '', activities: [], images: [] }];
  });

  // Save form data to localStorage (only for new packages)
  useEffect(() => {
    if (!editPackage) {
      localStorage.setItem('packageFormData', JSON.stringify(formData));
      localStorage.setItem('packageFormImages', JSON.stringify(uploadedImages));
      localStorage.setItem('packageFormIncluded', JSON.stringify(includedItems));
      localStorage.setItem('packageFormExcluded', JSON.stringify(excludedItems));
      localStorage.setItem('packageFormItinerary', JSON.stringify(itineraryDays));
    }
  }, [formData, uploadedImages, includedItems, excludedItems, itineraryDays, editPackage]);

  // Clear localStorage on successful submission
  const clearFormStorage = () => {
    localStorage.removeItem('packageFormData');
    localStorage.removeItem('packageFormImages');
    localStorage.removeItem('packageFormIncluded');
    localStorage.removeItem('packageFormExcluded');
    localStorage.removeItem('packageFormItinerary');
  };

  // Auto-generate slug from title
  const handleTitleChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      title: value,
      slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    }));
  };

  // Image upload with Supabase Storage
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setLoading(true);
    try {
      const uploadPromises = acceptedFiles.map(async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `packages/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('package-images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('package-images')
          .getPublicUrl(filePath);

        return publicUrl;
      });

      const urls = await Promise.all(uploadPromises);
      setUploadedImages(prev => [...prev, ...urls]);

      toast({
        title: 'Success',
        description: `${urls.length} image(s) uploaded successfully`,
      });
    } catch (error: any) {
      toast({
        title: 'Upload Error',
        description: error.message || 'Failed to upload images',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    },
    multiple: true
  });

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const addIncludedItem = () => {
    setIncludedItems([...includedItems, '']);
  };

  const addExcludedItem = () => {
    setExcludedItems([...excludedItems, '']);
  };

  const addItineraryDay = () => {
    setItineraryDays([
      ...itineraryDays,
      { day: itineraryDays.length + 1, title: '', description: '', activities: [], images: [] }
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Only allow submission on step 4
    if (currentStep !== 4) {
      return;
    }

    // Validation
    if (!formData.title.trim()) {
      toast({
        title: 'Error',
        description: 'Package title is required',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.destination) {
      toast({
        title: 'Error',
        description: 'Please select a destination',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.category) {
      toast({
        title: 'Error',
        description: 'Please select a category',
        variant: 'destructive',
      });
      return;
    }

    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      toast({
        title: 'Error',
        description: 'Please enter a valid price greater than 0',
        variant: 'destructive',
      });
      return;
    }

    const duration = parseInt(formData.duration);
    if (isNaN(duration) || duration <= 0) {
      toast({
        title: 'Error',
        description: 'Please enter a valid duration greater than 0',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.description.trim()) {
      toast({
        title: 'Error',
        description: 'Package description is required',
        variant: 'destructive',
      });
      return;
    }

    if (uploadedImages.length === 0) {
      toast({
        title: 'Error',
        description: 'Please upload at least one image',
        variant: 'destructive',
      });
      setCurrentStep(2);
      return;
    }

    // Validate itinerary
    const validItinerary = itineraryDays.filter(day => day.title.trim() && day.description.trim());
    if (validItinerary.length === 0) {
      toast({
        title: 'Error',
        description: 'Please add at least one day to the itinerary with title and description',
        variant: 'destructive',
      });
      setCurrentStep(4);
      return;
    }

    setLoading(true);

    try {
      const packageData = {
        title: formData.title.trim(),
        slug: formData.slug,
        description: formData.description.trim(),
        price: price,
        duration: duration,
        image: uploadedImages[0], // Primary image
        images: uploadedImages, // All images
        destination: formData.destination,
        category: formData.category,
        difficulty: formData.difficulty,
        included: includedItems.filter(item => item.trim()),
        excluded: excludedItems.filter(item => item.trim()),
        itinerary: validItinerary, // Use validated itinerary
      };

      if (editPackage) {
        const { error } = await supabase
          .from(tableName)
          .update(packageData)
          .eq('id', editPackage.id);

        if (error) throw error;

        const itemType = tableName === 'travel_ideas' ? 'Travel Idea' : 'Package';
        toast({
          title: 'Success',
          description: `${itemType} updated successfully`,
        });
      } else {
        const { error } = await supabase
          .from(tableName)
          .insert([packageData]);

        if (error) throw error;

        const itemType = tableName === 'travel_ideas' ? 'Travel Idea' : 'Package';
        toast({
          title: 'Success',
          description: `${itemType} created successfully`,
        });
        clearFormStorage(); // Clear saved form data on successful creation
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
    { number: 1, title: 'Basic Info', description: 'Title, destination, pricing' },
    { number: 2, title: 'Images', description: 'Upload package photos' },
    { number: 3, title: 'Inclusions', description: "What's included/excluded" },
    { number: 4, title: 'Itinerary', description: 'Day-by-day schedule' },
  ];

  // Check if there's saved draft data
  const hasDraft = !editPackage && localStorage.getItem('packageFormData');

  // Prevent Enter key from submitting form on steps 1-3
  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && currentStep !== 4 && (e.target as HTMLElement).tagName !== 'TEXTAREA') {
      e.preventDefault();
    }
  };

  return (
    <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="space-y-6">
      {/* Draft notification */}
      {hasDraft && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
              ℹ️
            </div>
            <div>
              <p className="font-semibold text-blue-900">Draft Restored</p>
              <p className="text-sm text-blue-700">Your previous work has been automatically restored. Continue where you left off or start fresh.</p>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              clearFormStorage();
              window.location.reload();
            }}
            className="flex-shrink-0"
          >
            Clear Draft
          </Button>
        </div>
      )}

      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  currentStep > step.number
                    ? 'bg-green-500 text-white'
                    : currentStep === step.number
                    ? 'bg-primary text-white'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {currentStep > step.number ? <Check className="w-5 h-5" /> : step.number}
              </div>
              <div className="mt-2 text-center">
                <div className="text-xs font-semibold">{step.title}</div>
                <div className="text-xs text-muted-foreground">{step.description}</div>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-1 flex-1 mx-2 ${
                  currentStep > step.number ? 'bg-green-500' : 'bg-muted'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Basic Info */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Essential details about your package</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Package Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g., 5-Day Serengeti Safari Adventure"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  URL: /tours/{formData.slug || 'auto-generated'}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination">Destination *</Label>
                <Select value={formData.destination} onValueChange={(value) => setFormData(prev => ({ ...prev, destination: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tanzania">🇹🇿 Tanzania</SelectItem>
                    <SelectItem value="Kenya">🇰🇪 Kenya</SelectItem>
                    <SelectItem value="Rwanda">🇷🇼 Rwanda</SelectItem>
                    <SelectItem value="Uganda">🇺🇬 Uganda</SelectItem>
                    <SelectItem value="South Africa">🇿🇦 South Africa</SelectItem>
                    <SelectItem value="Namibia">🇳🇦 Namibia</SelectItem>
                    <SelectItem value="Botswana">🇧🇼 Botswana</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Safari">🦁 Safari</SelectItem>
                    <SelectItem value="Trekking">🥾 Trekking</SelectItem>
                    <SelectItem value="Wildlife">🦒 Wildlife</SelectItem>
                    <SelectItem value="Beach">🏖️ Beach</SelectItem>
                    <SelectItem value="Luxury">💎 Luxury</SelectItem>
                    <SelectItem value="Adventure">⛰️ Adventure</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty Level *</Label>
                <Select value={formData.difficulty} onValueChange={(value) => setFormData(prev => ({ ...prev, difficulty: value as any }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Easy">😊 Easy - Suitable for all</SelectItem>
                    <SelectItem value="Moderate">😅 Moderate - Some fitness required</SelectItem>
                    <SelectItem value="Challenging">💪 Challenging - Good fitness needed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price per Person (USD) *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="1500"
                  min="0"
                  step="1"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration (Days) *</Label>
                <Input
                  id="duration"
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  placeholder="5"
                  min="1"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                placeholder="Describe what makes this package special..."
                required
              />
              <p className="text-xs text-muted-foreground">
                Tip: Mention highlights, unique experiences, and what travelers will love
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Images */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Package Images</CardTitle>
            <CardDescription>Upload high-quality photos (PNG, JPG, WebP)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Dropzone */}
            <div
              {...getRootProps()}
              className={`
                border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all
                ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary'}
              `}
            >
              <input {...getInputProps()} />
              <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              {isDragActive ? (
                <p className="text-primary font-semibold">Drop images here...</p>
              ) : (
                <div>
                  <p className="font-semibold mb-2">Drag & drop images here</p>
                  <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
                  <Button type="button" variant="outline" size="sm">
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Choose Files
                  </Button>
                </div>
              )}
            </div>

            {/* Uploaded Images */}
            {uploadedImages.length > 0 && (
              <div>
                <Label>Uploaded Images ({uploadedImages.length})</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                  {uploadedImages.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                      {index === 0 && (
                        <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
                          Primary
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  First image will be used as the main package image
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 3: Inclusions */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>What's Included & Excluded</CardTitle>
            <CardDescription>List what's covered and not covered in the package price</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <Label>Included in Package</Label>
                <Button type="button" onClick={addIncludedItem} variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Item
                </Button>
              </div>
              <div className="space-y-2">
                {includedItems.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={item}
                      onChange={(e) => {
                        const newItems = [...includedItems];
                        newItems[index] = e.target.value;
                        setIncludedItems(newItems);
                      }}
                      placeholder="e.g., Park entrance fees"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setIncludedItems(includedItems.filter((_, i) => i !== index))}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                {includedItems.length === 0 && (
                  <p className="text-sm text-muted-foreground">No items added yet. Click "Add Item" to start.</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <Label>Not Included</Label>
                <Button type="button" onClick={addExcludedItem} variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Item
                </Button>
              </div>
              <div className="space-y-2">
                {excludedItems.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={item}
                      onChange={(e) => {
                        const newItems = [...excludedItems];
                        newItems[index] = e.target.value;
                        setExcludedItems(newItems);
                      }}
                      placeholder="e.g., International flights"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setExcludedItems(excludedItems.filter((_, i) => i !== index))}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                {excludedItems.length === 0 && (
                  <p className="text-sm text-muted-foreground">No items added yet. Click "Add Item" to start.</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Itinerary */}
      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Day-by-Day Itinerary</CardTitle>
            <CardDescription>Describe what happens each day of the tour</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button type="button" onClick={addItineraryDay} variant="outline" size="sm" className="mb-4">
              <Plus className="w-4 h-4 mr-1" />
              Add Day
            </Button>

            {itineraryDays.map((day, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Day {day.day}</CardTitle>
                    {itineraryDays.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setItineraryDays(itineraryDays.filter((_, i) => i !== index))}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label>Day Title *</Label>
                    <Input
                      value={day.title}
                      onChange={(e) => {
                        const newDays = [...itineraryDays];
                        newDays[index].title = e.target.value;
                        setItineraryDays(newDays);
                      }}
                      placeholder="e.g., Arrival in Arusha"
                    />
                  </div>
                  <div>
                    <Label>Description *</Label>
                    <Textarea
                      value={day.description}
                      onChange={(e) => {
                        const newDays = [...itineraryDays];
                        newDays[index].description = e.target.value;
                        setItineraryDays(newDays);
                      }}
                      rows={3}
                      placeholder="Describe the day's activities..."
                    />
                  </div>

                  {/* Activities List */}
                  <div>
                    <Label>Activities</Label>
                    <div className="space-y-2">
                      {(day.activities || []).map((activity, actIndex) => (
                        <div key={actIndex} className="flex gap-2">
                          <Input
                            value={activity}
                            onChange={(e) => {
                              const newDays = [...itineraryDays];
                              if (!newDays[index].activities) newDays[index].activities = [];
                              newDays[index].activities![actIndex] = e.target.value;
                              setItineraryDays(newDays);
                            }}
                            placeholder="e.g., Airport pickup & transfer"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const newDays = [...itineraryDays];
                              newDays[index].activities = newDays[index].activities?.filter((_, i) => i !== actIndex) || [];
                              setItineraryDays(newDays);
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newDays = [...itineraryDays];
                          if (!newDays[index].activities) newDays[index].activities = [];
                          newDays[index].activities!.push('');
                          setItineraryDays(newDays);
                        }}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Activity
                      </Button>
                    </div>
                  </div>

                  {/* Day Images Upload */}
                  <div>
                    <Label>Day Images (Max 2)</Label>
                    <div className="space-y-2">
                      {(day.images || []).map((img, imgIndex) => (
                        <div key={imgIndex} className="flex gap-2 items-center">
                          <img src={img} alt={`Day ${day.day} image ${imgIndex + 1}`} className="w-20 h-20 object-cover rounded" />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const newDays = [...itineraryDays];
                              newDays[index].images = newDays[index].images?.filter((_, i) => i !== imgIndex) || [];
                              setItineraryDays(newDays);
                            }}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      {(!day.images || day.images.length < 2) && (
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;

                              setLoading(true);
                              try {
                                const fileExt = file.name.split('.').pop();
                                const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
                                const filePath = `itinerary/${fileName}`;

                                const { error: uploadError } = await supabase.storage
                                  .from('package-images')
                                  .upload(filePath, file);

                                if (uploadError) throw uploadError;

                                const { data: { publicUrl } } = supabase.storage
                                  .from('package-images')
                                  .getPublicUrl(filePath);

                                const newDays = [...itineraryDays];
                                if (!newDays[index].images) newDays[index].images = [];
                                newDays[index].images!.push(publicUrl);
                                setItineraryDays(newDays);

                                toast({
                                  title: 'Success',
                                  description: 'Image uploaded successfully',
                                });
                              } catch (error: any) {
                                toast({
                                  title: 'Upload Error',
                                  description: error.message,
                                  variant: 'destructive',
                                });
                              } finally {
                                setLoading(false);
                              }
                            }}
                            className="text-sm"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t">
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>

        <div className="flex gap-2">
          {currentStep > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Previous
            </Button>
          )}

          {currentStep < 4 ? (
            <Button
              type="button"
              variant="primary"
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              Next Step
            </Button>
          ) : (
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Saving...' : editPackage ? 'Update Package' : 'Create Package'}
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};
