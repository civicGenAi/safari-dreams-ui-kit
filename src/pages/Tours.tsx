import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { supabase, Package } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Clock,
  Users,
  Star,
  ArrowRight,
  Heart,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';

const Tours = () => {
  const [showFilters, setShowFilters] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [durationRange, setDurationRange] = useState([1, 15]);
  const [sortBy, setSortBy] = useState('popular');
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

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
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  // Extract unique values for filters
  const categories = Array.from(new Set(packages.map((t) => t.category)));
  const destinations = Array.from(new Set(packages.map((t) => t.destination)));
  const difficulties = Array.from(new Set(packages.map((t) => t.difficulty)));

  // Filter tours
  let filteredTours = packages.filter((pkg) => {
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(pkg.category);
    const matchesDestination =
      selectedDestinations.length === 0 || selectedDestinations.includes(pkg.destination);
    const matchesDifficulty =
      selectedDifficulty.length === 0 || selectedDifficulty.includes(pkg.difficulty);
    const matchesPrice = pkg.price >= priceRange[0] && pkg.price <= priceRange[1];
    const matchesDuration =
      pkg.duration >= durationRange[0] && pkg.duration <= durationRange[1];

    return (
      matchesCategory &&
      matchesDestination &&
      matchesDifficulty &&
      matchesPrice &&
      matchesDuration
    );
  });

  // Sort tours
  filteredTours.sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'duration':
        return a.duration - b.duration;
      default: // popular
        return 0;
    }
  });

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const toggleDestination = (destination: string) => {
    setSelectedDestinations((prev) =>
      prev.includes(destination)
        ? prev.filter((d) => d !== destination)
        : [...prev, destination]
    );
  };

  const toggleDifficulty = (difficulty: string) => {
    setSelectedDifficulty((prev) =>
      prev.includes(difficulty)
        ? prev.filter((d) => d !== difficulty)
        : [...prev, difficulty]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedDestinations([]);
    setSelectedDifficulty([]);
    setPriceRange([0, 5000]);
    setDurationRange([1, 15]);
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedDestinations.length > 0 ||
    selectedDifficulty.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 5000 ||
    durationRange[0] > 1 ||
    durationRange[1] < 15;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <div className="pt-24 pb-12 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Explore All <span className="text-gradient-gold">Safari Tours</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discover our complete collection of carefully crafted safari experiences. From
            wildlife adventures to mountain treks, find your perfect journey.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-24">
              <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
                {/* Filters Header */}
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-semibold text-lg flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5" />
                    Filters
                  </h3>
                  {hasActiveFilters && (
                    <button
                      onClick={clearAllFilters}
                      className="text-sm text-primary hover:underline"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {/* Category Filter */}
                <div>
                  <h4 className="font-heading font-medium mb-3">Category</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label
                        key={category}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Checkbox
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => toggleCategory(category)}
                        />
                        <span className="text-sm">{category}</span>
                        <span className="text-xs text-muted-foreground ml-auto">
                          ({packages.filter((t) => t.category === category).length})
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Destination Filter */}
                <div className="pt-6 border-t border-border">
                  <h4 className="font-heading font-medium mb-3">Destination</h4>
                  <div className="space-y-2">
                    {destinations.map((destination) => (
                      <label
                        key={destination}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Checkbox
                          checked={selectedDestinations.includes(destination)}
                          onCheckedChange={() => toggleDestination(destination)}
                        />
                        <span className="text-sm">{destination}</span>
                        <span className="text-xs text-muted-foreground ml-auto">
                          ({packages.filter((t) => t.destination === destination).length})
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="pt-6 border-t border-border">
                  <h4 className="font-heading font-medium mb-3">Price Range</h4>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={5000}
                    min={0}
                    step={100}
                    className="mb-2"
                  />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                {/* Duration */}
                <div className="pt-6 border-t border-border">
                  <h4 className="font-heading font-medium mb-3">Duration (days)</h4>
                  <Slider
                    value={durationRange}
                    onValueChange={setDurationRange}
                    max={15}
                    min={1}
                    step={1}
                    className="mb-2"
                  />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{durationRange[0]} day{durationRange[0] > 1 ? 's' : ''}</span>
                    <span>{durationRange[1]} days</span>
                  </div>
                </div>

                {/* Difficulty */}
                <div className="pt-6 border-t border-border">
                  <h4 className="font-heading font-medium mb-3">Difficulty</h4>
                  <div className="space-y-2">
                    {difficulties.map((difficulty) => (
                      <label
                        key={difficulty}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Checkbox
                          checked={selectedDifficulty.includes(difficulty)}
                          onCheckedChange={() => toggleDifficulty(difficulty)}
                        />
                        <span className="text-sm">{difficulty}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tours Grid */}
          <div className="flex-1">
            {/* Sort and Results Count */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden px-4 py-2 rounded-lg border border-border hover:bg-muted"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                </button>
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    {filteredTours.length}
                  </span>{' '}
                  tours found
                </p>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="duration">Shortest Duration</option>
              </select>
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {selectedCategories.map((cat) => (
                  <Badge key={cat} variant="secondary" className="gap-1">
                    {cat}
                    <button onClick={() => toggleCategory(cat)}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
                {selectedDestinations.map((dest) => (
                  <Badge key={dest} variant="secondary" className="gap-1">
                    {dest}
                    <button onClick={() => toggleDestination(dest)}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
                {selectedDifficulty.map((diff) => (
                  <Badge key={diff} variant="secondary" className="gap-1">
                    {diff}
                    <button onClick={() => toggleDifficulty(diff)}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            {/* Tours Grid */}
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              </div>
            ) : filteredTours.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg mb-4">
                  No tours match your current filters
                </p>
                <Button onClick={clearAllFilters} variant="outline">
                  Clear all filters
                </Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTours.map((pkg) => (
                  <article
                    key={pkg.id}
                    className="group bg-card rounded-2xl overflow-hidden shadow-md card-hover border border-border"
                  >
                    {/* Image */}
                    <Link to={`/tours/${pkg.slug}`} className="block relative h-56 img-zoom">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-card opacity-60" />

                      {/* Difficulty Badge */}
                      <div className="absolute top-3 left-3 bg-sunset text-white px-2 py-1 rounded-full text-xs font-heading font-semibold uppercase">
                        {pkg.difficulty}
                      </div>

                      {/* Price */}
                      <div className="absolute top-3 right-3 glass text-primary-foreground px-3 py-1.5 rounded-lg">
                        <div className="flex items-baseline gap-1">
                          <span className="font-display text-lg font-bold">
                            ${pkg.price}
                          </span>
                        </div>
                      </div>

                      {/* Favorite */}
                      <button className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:text-sunset transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>

                      {/* Category */}
                      <div className="absolute bottom-3 left-3 glass-dark text-primary-foreground px-2 py-1 rounded-full text-xs font-heading uppercase">
                        {pkg.category}
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="p-5">
                      <span className="text-secondary font-heading text-sm uppercase tracking-wider">
                        {pkg.destination}
                      </span>

                      <Link
                        to={`/tours/${pkg.slug}`}
                        className="block mt-2 mb-3"
                      >
                        <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {pkg.title}
                        </h3>
                      </Link>

                      {/* Meta Info */}
                      <div className="flex items-center gap-3 text-muted-foreground text-sm mb-3">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{pkg.duration}D</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-secondary text-secondary" />
                          <span className="font-heading font-semibold">4.8</span>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <p className="text-sm text-muted-foreground">/person</p>
                        <Link to={`/tours/${pkg.slug}`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-primary gap-1 group-hover:gap-2 transition-all"
                          >
                            Details
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Tours;
