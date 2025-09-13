import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  DollarSign, 
  Ruler, 
  Clock, 
  Palette,
  Eye,
  Heart,
  Share2,
  ShoppingCart,
  Star
} from 'lucide-react';
import { ArtworkSubmission } from '@/types/artisan';
import { useCart } from '@/hooks/useCart';

interface ArtworkCardProps {
  artwork: ArtworkSubmission;
  index?: number;
  showActions?: boolean;
  showPurchase?: boolean;
}

export const ArtworkCard: React.FC<ArtworkCardProps> = ({ 
  artwork, 
  index = 0, 
  showActions = true,
  showPurchase = true 
}) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (artwork.price && artwork.status === 'approved') {
      addItem({
        id: artwork.id,
        name: artwork.title,
        description: artwork.description,
        price: artwork.price,
        image: artwork.images?.[0] || '',
        category: artwork.category,
        seller: artwork.artisanName || 'Artisan',
        inStock: true,
        stockQuantity: 1,
        rating: 4.8,
        reviewCount: 0,
        variants: {
          color: 'Original',
          size: artwork.dimensions || 'Standard'
        }
      });
      
      // Show success notification
      const event = new CustomEvent('showToast', {
        detail: {
          title: 'Added to Cart!',
          description: `${artwork.title} has been added to your cart.`,
          type: 'success'
        }
      });
      window.dispatchEvent(event);
    }
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatPrice = (price?: number) => {
    if (!price) return 'Price on request';
    return `₹${price.toLocaleString('en-IN')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
        {/* Image Gallery */}
        {artwork.images && artwork.images.length > 0 && (
          <div className="relative h-64 overflow-hidden">
            <img
              src={artwork.images[0]}
              alt={artwork.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {artwork.images.length > 1 && (
              <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
                +{artwork.images.length - 1} more
              </div>
            )}
            <div className="absolute top-2 left-2">
              <Badge className={getStatusColor(artwork.status)}>
                {artwork.status.charAt(0).toUpperCase() + artwork.status.slice(1)}
              </Badge>
            </div>
          </div>
        )}

        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-bold text-gray-900 line-clamp-2">
              {artwork.title}
            </CardTitle>
            {artwork.price && (
              <div className="text-right">
                <p className="text-lg font-bold text-primary">
                  {formatPrice(artwork.price)}
                </p>
              </div>
            )}
          </div>
          
          {/* Artisan Info */}
          {artwork.artisanName && (
            <div className="flex items-center gap-2 mt-2 mb-3">
              <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-semibold flex items-center justify-center">
                {artwork.artisanName.charAt(0).toUpperCase()}
              </div>
              <div className="text-sm">
                <p className="font-medium text-gray-700">by {artwork.artisanName}</p>
                {artwork.artisanLocation && (
                  <p className="text-gray-500 text-xs">{artwork.artisanLocation}</p>
                )}
              </div>
            </div>
          )}
          
          <CardDescription className="text-gray-600 line-clamp-3">
            {artwork.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Category */}
          <div className="flex items-center gap-2">
            <Palette className="h-4 w-4 text-primary" />
            <Badge variant="outline" className="text-primary border-primary">
              {artwork.category}
            </Badge>
          </div>

          {/* Materials */}
          {artwork.materials && artwork.materials.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Materials:</p>
              <div className="flex flex-wrap gap-1">
                {artwork.materials.slice(0, 3).map((material, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {material}
                  </Badge>
                ))}
                {artwork.materials.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{artwork.materials.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            {artwork.dimensions && (
              <div className="flex items-center gap-2">
                <Ruler className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">{artwork.dimensions}</span>
              </div>
            )}
            {artwork.timeToCreate && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">{artwork.timeToCreate}</span>
              </div>
            )}
          </div>

          {/* Actions */}
          {showActions && (
            <div className="space-y-3 pt-4 border-t">
              {/* Purchase Section - Only for approved artworks with price */}
              {showPurchase && artwork.status === 'approved' && artwork.price && (
                <div className="flex gap-2">
                  <Button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              )}
              
              {/* Regular Actions */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Rating Section */}
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>4.8</span>
                  <span className="text-gray-400">(12 reviews)</span>
                </div>
                {artwork.status === 'approved' && (
                  <Badge className="bg-green-100 text-green-800 text-xs">
                    Available
                  </Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
