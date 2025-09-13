import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, X, Plus, ImageIcon, DollarSign, Ruler, Clock, Palette } from 'lucide-react';
import { ArtworkSubmission } from '@/types/artisan';
import { useArtisan } from '@/hooks/useArtisan';

interface ShareYourArtProps {
  onSubmit?: (artwork: Omit<ArtworkSubmission, 'id' | 'artisanId' | 'status'>) => void;
}

export const ShareYourArt: React.FC<ShareYourArtProps> = ({ onSubmit }) => {
  const { submitArtwork, loading } = useArtisan();
  const [artworkData, setArtworkData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    materials: [''],
    dimensions: '',
    timeToCreate: '',
    images: [] as string[]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const artworkCategories = [
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
    'Sculpture',
    'Other'
  ];

  const handleInputChange = (field: string, value: string) => {
    setArtworkData(prev => ({ ...prev, [field]: value }));
  };

  const handleMaterialChange = (index: number, value: string) => {
    const newMaterials = [...artworkData.materials];
    newMaterials[index] = value;
    setArtworkData(prev => ({ ...prev, materials: newMaterials }));
  };

  const addMaterial = () => {
    setArtworkData(prev => ({ ...prev, materials: [...prev.materials, ''] }));
  };

  const removeMaterial = (index: number) => {
    if (artworkData.materials.length > 1) {
      const newMaterials = artworkData.materials.filter((_, i) => i !== index);
      setArtworkData(prev => ({ ...prev, materials: newMaterials }));
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // In a real app, you would upload to a server and get URLs
      // For demo, we'll create placeholder URLs
      const newImages = Array.from(files).map((file, index) => 
        `https://images.unsplash.com/photo-${Date.now() + index}?w=400&h=400&fit=crop`
      );
      setArtworkData(prev => ({ 
        ...prev, 
        images: [...prev.images, ...newImages].slice(0, 5) // Max 5 images
      }));
    }
  };

  const removeImage = (index: number) => {
    setArtworkData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submission = {
        title: artworkData.title,
        description: artworkData.description,
        category: artworkData.category,
        price: artworkData.price ? parseFloat(artworkData.price) : undefined,
        materials: artworkData.materials.filter(m => m.trim()),
        dimensions: artworkData.dimensions,
        timeToCreate: artworkData.timeToCreate,
        images: artworkData.images
      };

      // Submit to Supabase
      await submitArtwork(submission);
      
      if (onSubmit) {
        onSubmit(submission);
      }

      // Reset form
      setArtworkData({
        title: '',
        description: '',
        category: '',
        price: '',
        materials: [''],
        dimensions: '',
        timeToCreate: '',
        images: []
      });

      alert('Artwork submitted successfully! It will be reviewed and published soon.');
      
      // Refresh the page to show the new artwork in the gallery
      window.location.reload();
    } catch (error) {
      console.error('Submission error:', error);
      alert('Error submitting artwork. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Palette className="h-6 w-6 text-blue-600" />
            Share Your Art
            <Badge variant="secondary" className="ml-auto">
              New Feature
            </Badge>
          </CardTitle>
          <p className="text-gray-600">
            Upload your latest artwork and share your creative journey with the world
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Artwork Title *</Label>
              <Input
                id="title"
                value={artworkData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Give your artwork a captivating title"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={artworkData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Tell the story behind your artwork, your inspiration, and techniques used..."
                rows={4}
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label>Category *</Label>
              <Select
                value={artworkData.category}
                onValueChange={(value) => handleInputChange('category', value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select artwork category" />
                </SelectTrigger>
                <SelectContent>
                  {artworkCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Images Upload */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Artwork Images (Max 5)
              </Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                  disabled={artworkData.images.length >= 5}
                />
                <label
                  htmlFor="image-upload"
                  className={`cursor-pointer flex flex-col items-center gap-2 ${
                    artworkData.images.length >= 5 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Upload className="h-8 w-8 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {artworkData.images.length >= 5 
                      ? 'Maximum 5 images reached' 
                      : 'Click to upload images or drag and drop'
                    }
                  </span>
                </label>
              </div>

              {/* Image Preview */}
              {artworkData.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {artworkData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Artwork ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Materials */}
            <div className="space-y-2">
              <Label>Materials Used</Label>
              {artworkData.materials.map((material, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={material}
                    onChange={(e) => handleMaterialChange(index, e.target.value)}
                    placeholder="e.g., Acrylic paint, Canvas, Wood"
                    className="flex-1"
                  />
                  {artworkData.materials.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeMaterial(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addMaterial}
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Material
              </Button>
            </div>

            {/* Price, Dimensions, Time */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Price (₹)
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={artworkData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="Optional"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dimensions" className="flex items-center gap-2">
                  <Ruler className="h-4 w-4" />
                  Dimensions
                </Label>
                <Input
                  id="dimensions"
                  value={artworkData.dimensions}
                  onChange={(e) => handleInputChange('dimensions', e.target.value)}
                  placeholder="e.g., 24x18 inches"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeToCreate" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Time to Create
                </Label>
                <Input
                  id="timeToCreate"
                  value={artworkData.timeToCreate}
                  onChange={(e) => handleInputChange('timeToCreate', e.target.value)}
                  placeholder="e.g., 2 weeks"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting || !artworkData.title || !artworkData.description || !artworkData.category}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting Artwork...
                </div>
              ) : (
                'Share Your Art'
              )}
            </Button>

            <p className="text-sm text-gray-500 text-center">
              Your artwork will be reviewed and published within 24-48 hours.
            </p>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};
