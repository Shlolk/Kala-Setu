import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArtworkCard } from './ArtworkCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  SlidersHorizontal,
  Palette,
  ShoppingBag,
  Loader2
} from 'lucide-react';
import { ArtworkSubmission } from '@/types/artisan';
import { supabase } from '@/integrations/supabase/client';

interface ArtworkMarketplaceProps {
  title?: string;
  showFilters?: boolean;
}

export const ArtworkMarketplace: React.FC<ArtworkMarketplaceProps> = ({ 
  title = "Art Marketplace", 
  showFilters = true 
}) => {
  const [artworks, setArtworks] = useState<ArtworkSubmission[]>([]);
  const [filteredArtworks, setFilteredArtworks] = useState<ArtworkSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = [
    'Traditional Painting',
    'Wood Carving',
    'Pottery & Ceramics',
    'Textile & Weaving',
    'Jewelry Making',
    'Metal Craft',
    'Stone Carving',
    'Leather Work',
    'Paper Craft',
    'Glass Art',
    'Sculpture'
  ];

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-1000', label: '₹0 - ₹1,000' },
    { value: '1000-5000', label: '₹1,000 - ₹5,000' },
    { value: '5000-10000', label: '₹5,000 - ₹10,000' },
    { value: '10000+', label: '₹10,000+' }
  ];

  useEffect(() => {
    fetchApprovedArtworks();
  }, []);

  useEffect(() => {
    filterAndSortArtworks();
  }, [artworks, searchQuery, selectedCategory, priceRange, sortBy]);

  const fetchApprovedArtworks = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('artwork_submissions')
        .select(`
          *,
          artisan_profiles (
            name,
            location
          )
        `)
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedArtworks = data?.map(item => ({
        id: item.id,
        artisanId: item.artisan_id || '',
        title: item.title,
        description: item.description,
        category: item.category,
        price: item.price || 0,
        materials: item.materials || [],
        dimensions: item.dimensions || '',
        timeToCreate: item.time_to_create || '',
        images: item.images || [],
        status: item.status as 'pending' | 'approved' | 'rejected',
        artisanName: item.artisan_profiles?.name || 'Unknown Artisan',
        artisanLocation: item.artisan_profiles?.location || ''
      })) || [];

      setArtworks(formattedArtworks);
    } catch (error) {
      console.error('Error fetching artworks:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortArtworks = () => {
    let filtered = [...artworks];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(artwork =>
        artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artwork.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artwork.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artwork.artisanName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(artwork => artwork.category === selectedCategory);
    }

    // Price filter
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(p => p.replace('+', ''));
      filtered = filtered.filter(artwork => {
        if (!artwork.price) return false;
        if (priceRange === '10000+') return artwork.price >= 10000;
        return artwork.price >= parseInt(min) && artwork.price <= parseInt(max);
      });
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (a.price || 0) - (b.price || 0);
        case 'price-high':
          return (b.price || 0) - (a.price || 0);
        case 'name':
          return a.title.localeCompare(b.title);
        case 'newest':
        default:
          return 0; // Already sorted by created_at desc
      }
    });

    setFilteredArtworks(filtered);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-gray-600">Loading artworks...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
          <Palette className="h-8 w-8 text-primary" />
          {title}
        </h1>
        <p className="text-gray-600 mb-4">
          Discover and purchase unique handcrafted artworks from talented artisans
        </p>
        <Badge variant="outline" className="text-primary border-primary">
          <ShoppingBag className="h-3 w-3 mr-1" />
          {filteredArtworks.length} artworks available
        </Badge>
      </motion.div>

      {/* Filters */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm border"
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search artworks, artists, or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Price Range */}
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                {priceRanges.map(range => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setPriceRange('all');
                setSortBy('newest');
              }}
            >
              Clear Filters
            </Button>
          </div>
        </motion.div>
      )}

      {/* Results */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {filteredArtworks.length === 0 ? (
          <div className="text-center py-12">
            <Palette className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No artworks found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or browse all categories
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setPriceRange('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1 max-w-4xl mx-auto'
          }`}>
            {filteredArtworks.map((artwork, index) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                index={index}
                showActions={true}
                showPurchase={true}
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};
